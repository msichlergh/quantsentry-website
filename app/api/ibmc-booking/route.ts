// IBMC booking step for the /demo2 wizard (form-linked CRM scheduling, API
// delivery). The browser never sees the booking token: /api/ibmc-lead sealed
// it into an HttpOnly cookie, and this route opens it and calls IBMC.
//
//   POST { action: "slots", receiptId }               -> SlotsView
//   POST { action: "book", receiptId, slot }          -> BookView
//
// Gates: JSON only, same origin, per-IP budget, a live sealed session for the
// same receipt. Answers carry only the fields the time picker needs, and are
// never cached. Nothing here logs the token, the booking url or the cookie.
//
// Status mapping for the browser:
//   expired           no session, wrong receipt, or IBMC 404: the 24h receipt
//                     is gone; the visitor waits for our reply instead
//   slot_unavailable  someone took the time: reload slots and pick again
//   booked            the only status that confirms a reservation
import { originAllowed } from "@/lib/ibmc-origin";
import {
  BOOKING_COOKIE,
  clearSessionCookie,
  openSession,
  parseSlot,
  readCookie,
  requestBooking,
  safeBook,
  safeSlots,
} from "@/lib/ibmc-booking";
import { RULES, rateLimit, rateLimitHeaders, rateLimitKey } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!/^application\/(\w+\+)?json\b/i.test(contentType.trim())) {
    return json({ status: "invalid_request" }, 415);
  }
  if (!originAllowed(request)) return json({ status: "forbidden" }, 403);

  const limit = await rateLimit(rateLimitKey(request, "ibmc-booking:ip"), RULES.slotsPerIp);
  if (!limit.ok) {
    return json({ status: "rate_limited" }, 429, { "Retry-After": String(limit.retryAfter) });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ status: "invalid_request" }, 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return json({ status: "invalid_request" }, 400);

  const session = openSession(
    readCookie(request.headers.get("cookie"), BOOKING_COOKIE),
    process.env.IBMC_FORM_SECRET || "",
  );
  if (!session) return json({ status: "expired" }, 404, { "Set-Cookie": clearSessionCookie() });
  // The cookie belongs to one receipt. A page still holding an older receipt
  // (another tab, "Send another") must not drive this one, nor wipe it.
  if (body.receiptId !== session.receiptId) return json({ status: "expired" }, 404);

  const action = body.action;
  try {
    if (action === "slots") {
      const reply = await requestBooking(session, { action: "slots" });
      if (reply.httpStatus === 404) return expired();
      if (reply.httpStatus >= 400) return json({ status: "error" }, 502);
      const view = safeSlots(reply.data);
      // "booked" can arrive here after a "confirming" hold: the receipt is used
      // up, so the token goes, as it does on a booked "book" answer.
      return json({ ...view }, 200, {
        ...rateLimitHeaders(limit),
        ...(view.status === "booked" ? { "Set-Cookie": clearSessionCookie() } : {}),
      });
    }

    if (action === "book") {
      const slot = parseSlot(body.slot);
      if (!slot) return json({ status: "invalid_request" }, 400);
      const reply = await requestBooking(session, { action: "book", slot });
      if (reply.httpStatus === 404) return expired();
      if (reply.httpStatus >= 400) return json({ status: "error" }, 502);
      const view = safeBook(reply.data, slot);
      // Booked: the receipt is used up, so the token goes too.
      return json({ ...view }, 200, {
        ...rateLimitHeaders(limit),
        ...(view.status === "booked" ? { "Set-Cookie": clearSessionCookie() } : {}),
      });
    }
  } catch (err) {
    console.error("[ibmc-booking] request failed:", err instanceof Error ? err.name : "unknown");
    return json({ status: "error" }, 502);
  }

  return json({ status: "invalid_request" }, 400);
}

const expired = () => json({ status: "expired" }, 404, { "Set-Cookie": clearSessionCookie() });

const json = (data: Record<string, unknown>, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...extra },
  });
