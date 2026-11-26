// IBMC test intake. Only /demo2 posts here: the contact form, and the demo
// wizard with `kind: "wizard"`.
//
// Same gate order as app/api/lead/route.ts, kept in its own file so the
// production lead route is not touched by this test:
//
//   1. Content-Type   JSON only, closes the cross-origin form-post hole
//   2. Origin/Referer same-origin, preview and local only
//   3. Rate limit/IP
//   4. JSON parse
//   5. Bot heuristics honeypot + render timestamp (silent 200)
//   6. Field validation
//   7. Rate limit/email
//   8. Sign and forward to IBMC
//
// No fallback: when IBMC refuses, the visitor sees an error and the log says
// why. This page exists to find out whether the integration works.
//
// When IBMC accepts with a booking link, the validated url goes back to the
// browser as `bookingUrl` so the visitor can pick a time on IBMC's hosted page.
// It carries a secret token: the log only says booking=<status>, a short
// lowercase word, or booking=- when there is no booking link.
import { randomUUID } from "node:crypto";

import { SITE_URL } from "@/app/_seo/site";
import {
  missingIbmcConfig,
  submitToIbmc,
  type IbmcAttribution,
  type IbmcPayload,
} from "@/lib/ibmc";
import { fingerprint, looksAutomated } from "@/lib/lead";
import {
  RULES,
  rateLimit,
  rateLimitHeaders,
  rateLimitKey,
  type RateLimitResult,
} from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

const ATTRIBUTION_KEYS = [
  "gclid",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "utmTerm",
  "utmContent",
  "landingPage",
  "referrer",
  "firstSeenAt",
] as const;

export async function POST(request: Request) {
  // --- 1. Content type ----------------------------------------------------
  const contentType = request.headers.get("content-type") || "";
  if (!/^application\/(\w+\+)?json\b/i.test(contentType.trim())) {
    return json({ ok: false, code: "UNSUPPORTED_MEDIA_TYPE", error: "Expected application/json" }, 415);
  }

  // --- 2. Origin ----------------------------------------------------------
  if (!originAllowed(request)) {
    return json({ ok: false, code: "FORBIDDEN", error: "Request origin not allowed" }, 403);
  }

  // --- 3. Per-IP budget ---------------------------------------------------
  const ipLimit = await rateLimit(rateLimitKey(request, "ibmc:ip"), RULES.leadPerIp);
  if (!ipLimit.ok) return tooMany(ipLimit);

  // --- 4. Body ------------------------------------------------------------
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, code: "MALFORMED_JSON", error: "Malformed request" }, 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json({ ok: false, code: "MALFORMED_JSON", error: "Malformed request" }, 400);
  }

  // --- 5. Bot heuristics --------------------------------------------------
  const automated = looksAutomated(body);
  if (automated) {
    console.log("[ibmc] dropped:", automated);
    return json({ ok: true, delivered: false, dropped: true }, 200, rateLimitHeaders(ipLimit));
  }

  // --- 6. Validation ------------------------------------------------------
  // Two forms post here: the contact form (no `kind`) and the demo wizard
  // (`kind: "wizard"`). Each is validated on its own rules.
  const { fields, errors } = body.kind === "wizard" ? parseWizard(body) : parseContact(body);
  const email = fields.email;
  if (Object.keys(errors).length) {
    return json(
      { ok: false, code: "VALIDATION_ERROR", error: "Please check the highlighted fields.", errors },
      422,
      rateLimitHeaders(ipLimit),
    );
  }

  // --- 7. Per-email budget ------------------------------------------------
  const emailLimit = await rateLimit(`ibmc:email:${fingerprint(email)}`, RULES.leadPerEmail);
  if (!emailLimit.ok) return tooMany(emailLimit);

  // --- 8. Forward ---------------------------------------------------------
  const missing = missingIbmcConfig();
  if (missing.length) {
    console.error("[ibmc] not configured, missing:", missing.join(", "));
    return json(
      { ok: false, code: "NOT_CONFIGURED", error: "This form is not connected yet." },
      503,
    );
  }

  // The browser mints one id per submission and reuses it when the visitor
  // retries the same answers, so IBMC can de-duplicate. Anything that is not a
  // lowercase UUID is replaced rather than forwarded.
  const submissionId = str(body.submissionId, 36).toLowerCase();
  const eventId = UUID_RE.test(submissionId) ? submissionId : randomUUID();

  try {
    // Key order is fixed so a retry of the same answers is byte-identical.
    const result = await submitToIbmc(
      {
        ...fields,
        pageUrl: pageUrl(request),
        attribution: attribution(body.attribution),
      },
      eventId,
    );
    if (!result.ok) {
      console.error("[ibmc] rejected:", result.status, result.reason || "no reason", `event ${eventId}`);
      return json(
        {
          ok: false,
          code: "IBMC_REJECTED",
          error: "We could not send that just now. Please try again in a moment.",
        },
        502,
      );
    }
    console.log(
      "[ibmc] accepted:",
      result.status,
      `event ${eventId}`,
      result.summary || "",
      // Status only, never the url. Shows what IBMC sends on de-duplicated retries.
      `booking=${result.booking ? result.booking.status : "-"}`,
    );
    return json(
      {
        ok: true,
        delivered: true,
        ...(result.booking ? { bookingUrl: result.booking.url } : {}),
      },
      200,
      rateLimitHeaders(ipLimit),
    );
  } catch (err) {
    console.error("[ibmc] request failed:", err instanceof Error ? err.message : String(err));
    return json(
      {
        ok: false,
        code: "IBMC_UNAVAILABLE",
        error: "We could not send that just now. Please try again in a moment.",
      },
      502,
    );
  }
}

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

type Fields = Omit<IbmcPayload, "pageUrl" | "attribution">;
type Parsed = { fields: Fields; errors: Record<string, string> };

// Contact form: name, email, message, optional company. Key order is fixed so
// a retry of the same answers serialises to the same bytes.
function parseContact(body: Record<string, unknown>): Parsed {
  const name = str(body.name, 120);
  const email = str(body.email, 254).toLowerCase();
  const company = str(body.company, 200);
  const message = str(body.message, 5000);
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Enter your name";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid work email";
  if (!message) errors.message = "Tell us what it is about";
  return {
    fields: { full_name: name, email, message, ...(company ? { company } : {}) },
    errors,
  };
}

// Demo wizard: the rules the wizard checks in the browser (stepErrors in
// components/BookDemoWizardIbmc.tsx), checked again here. Empty
// optional answers are left out. `source` is fixed here, never read from the
// body.
function parseWizard(body: Record<string, unknown>): Parsed {
  const firstName = str(body.firstName, 60);
  const lastName = str(body.lastName, 60);
  const email = str(body.email, 254).toLowerCase();
  const phone = normalisePhone(str(body.phone, 40));
  const website = normaliseWebsite(str(body.website, 200));
  const businessType = str(body.businessType, 60);
  const errors: Record<string, string> = {};
  if (!businessType) errors.intent = "Pick the one that fits best";
  if (firstName.length < 2) errors.firstName = "Enter your first name";
  if (lastName.length < 2) errors.lastName = "Enter your last name";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid work email";
  if (!phone) errors.phone = "Enter your phone number";
  if (!website) errors.website = "That does not look like a website";

  const optional: [keyof Fields, string][] = [
    ["message", str(body.notes, 5000)],
    ["risk_handling", str(body.riskHandling, 60)],
    ["role", str(body.role, 60)],
    ["timeline", str(body.timeline, 60)],
    ["telegram", str(body.telegram, 64)],
  ];
  const fields: Fields = {
    full_name: `${firstName} ${lastName}`,
    email,
    phone,
    company_website: website,
    business_type: businessType,
  };
  for (const [key, value] of optional) if (value) Object.assign(fields, { [key]: value });
  fields.source = "demo_wizard";
  return { fields, errors };
}

// "+49 151 234-5678" -> "+491512345678". A leading + and 6 to 15 digits, or "".
function normalisePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!raw.startsWith("+") || digits.length < 6 || digits.length > 15) return "";
  return `+${digits}`;
}

// The IBMC field is a URL type, so the scheme is added when the visitor left it
// out. Same host rule as bdUrlOk in the wizard: a dotted name with a real TLD.
function normaliseWebsite(raw: string): string {
  if (!raw || /\s/.test(raw)) return "";
  try {
    const u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(u.hostname)) return "";
    if (!/^[a-z]{2,}$/i.test(u.hostname.split(".").pop() || "")) return "";
    if (u.username || u.password) return "";
    return u.href;
  } catch {
    return "";
  }
}

// Origin + path of the page that sent the form. IBMC strips the query anyway;
// dropping it here keeps tracking parameters out of the stored URL.
function pageUrl(request: Request): string {
  const referer = request.headers.get("referer");
  if (referer) {
    try {
      const u = new URL(referer);
      return `${u.origin}${u.pathname}`;
    } catch {
      /* fall through */
    }
  }
  return `${SITE_URL}/demo2`;
}

// Only the recognised keys, only short strings. IBMC does not reject a
// malformed block, but there is no reason to forward junk.
function attribution(raw: unknown): IbmcAttribution | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const src = raw as Record<string, unknown>;
  const out: IbmcAttribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = str(src[key], 500);
    if (value) out[key] = value;
  }
  return Object.keys(out).length ? out : undefined;
}

// --- Origin ---------------------------------------------------------------
// Copy of the check in app/api/lead/route.ts, duplicated on purpose so this
// test route does not require refactoring the production one.

const ALLOWED_HOSTS = new Set(
  [SITE_URL, process.env.NEXT_PUBLIC_SITE_URL]
    .filter((v): v is string => Boolean(v))
    .flatMap((value) => {
      try {
        const host = new URL(value).host;
        return host.startsWith("www.") ? [host, host.slice(4)] : [host, `www.${host}`];
      } catch {
        return [];
      }
    }),
);

function originAllowed(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const candidate = origin || referer;
  if (!candidate || candidate === "null") return !origin && !referer;

  let host: string;
  try {
    host = new URL(candidate).host;
  } catch {
    return false;
  }

  const self = request.headers.get("host");
  if (self && host === self) return true;
  if (ALLOWED_HOSTS.has(host)) return true;

  const hostname = host.split(":")[0];
  if (hostname === "vercel.app" || hostname.endsWith(".vercel.app")) return true;
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") return true;
  return false;
}

function tooMany(limit: RateLimitResult) {
  return json(
    {
      ok: false,
      code: "RATE_LIMITED",
      error: "Too many requests. Please wait a moment and try again.",
      retryAfter: limit.retryAfter,
    },
    429,
    { "Retry-After": String(limit.retryAfter), ...rateLimitHeaders(limit) },
  );
}

const json = (data: Record<string, unknown>, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...extra },
  });
