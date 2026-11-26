import "server-only";

import { createHmac } from "node:crypto";

// IBMC CRM form ingestion. Test integration behind /demo2 only.
//
// Each IBMC form is a signed endpoint that accepts server-to-server calls:
// with no allowed origins configured, any request carrying an Origin header is
// refused. So the browser posts to /api/ibmc-lead and this module signs and
// forwards. A server-side fetch sends no Origin header.
//
// Webhook contract v1 (confirmed by IBMC):
//   x-ibmc-webhook-version    "v1"
//   x-ibmc-webhook-timestamp  Unix seconds, must be within five minutes
//   x-ibmc-webhook-id         lowercase UUID, reused on retries of the same
//                             submission so IBMC de-duplicates instead of
//                             creating a second lead
//   x-ibmc-webhook-signature  HMAC-SHA256 with the form credential over
//                             `v1.<timestamp>.<eventId>.<raw body bytes>`,
//                             64 lowercase hex chars, no `v1=` prefix
//
// Booking: when the IBMC form has booking on, an accepted response carries
// `{ booking: { status, url } }`. The visitor opens that url on IBMC's hosted
// page to pick a time. The url holds an opaque token in its fragment, so it is
// never logged, and it is only passed on when it is https on the same host as
// IBMC_FORM_URL.

const HEADER = {
  version: "x-ibmc-webhook-version",
  timestamp: "x-ibmc-webhook-timestamp",
  eventId: "x-ibmc-webhook-id",
  signature: "x-ibmc-webhook-signature",
} as const;

const VERSION = "v1";
const TIMEOUT_MS = 8_000;

export type IbmcAttribution = Partial<
  Record<
    | "gclid"
    | "utmSource"
    | "utmMedium"
    | "utmCampaign"
    | "utmTerm"
    | "utmContent"
    | "landingPage"
    | "referrer"
    | "firstSeenAt",
    string
  >
>;

// Keys match the field keys on the IBMC form ("Fields & Mappings"). The wizard
// keys (phone onwards) are optional fields on v2 of the form; the contact form
// sends only full_name, email, message and company.
export type IbmcPayload = {
  full_name: string;
  email: string;
  message?: string;
  company?: string;
  phone?: string;
  company_website?: string;
  business_type?: string;
  risk_handling?: string;
  role?: string;
  timeline?: string;
  telegram?: string;
  source?: string;
  pageUrl: string;
  attribution?: IbmcAttribution;
};

export type IbmcResult = {
  ok: boolean;
  status: number;
  /** Machine-readable reason from IBMC when it refused. Never contains PII. */
  reason: string | null;
  /** Short, log-safe view of a successful response (keys + flags only). */
  summary: string | null;
  /**
   * Hosted booking link from an accepted response, already validated. The url
   * carries a secret token in its fragment: never log it.
   */
  booking: IbmcBooking | null;
};

export type IbmcBooking = { status: string; url: string };

const BOOKING_URL_MAX = 2048;
const BOOKING_STATUS_RE = /^[a-z_]{1,32}$/;

/**
 * The booking link from an accepted response, or null. Accepts any status (a
 * de-duplicated retry may not say "pending"), but only an https url on the same
 * host as the form's ingestion URL, so a bad response cannot send the visitor
 * anywhere else.
 */
function readBooking(data: unknown, formUrl: string): IbmcBooking | null {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const booking = (data as Record<string, unknown>).booking;
  if (!booking || typeof booking !== "object" || Array.isArray(booking)) return null;
  const { url, status } = booking as Record<string, unknown>;
  if (typeof url !== "string" || url.length > BOOKING_URL_MAX) return null;

  let parsed: URL;
  let formHost: string;
  try {
    parsed = new URL(url);
    formHost = new URL(formUrl).host;
  } catch {
    return null;
  }
  if (parsed.protocol !== "https:") return null;
  if (parsed.host !== formHost) return null;
  if (parsed.username || parsed.password) return null;

  return {
    status: typeof status === "string" && BOOKING_STATUS_RE.test(status) ? status : "unknown",
    url: parsed.href,
  };
}

/** Env var NAMES that are missing. Never values. */
export function missingIbmcConfig(): string[] {
  const missing: string[] = [];
  if (!process.env.IBMC_FORM_URL) missing.push("IBMC_FORM_URL");
  if (!process.env.IBMC_FORM_SECRET) missing.push("IBMC_FORM_SECRET");
  return missing;
}

export function signIbmc(secret: string, timestamp: number, eventId: string, body: string): string {
  return createHmac("sha256", secret).update(`${VERSION}.${timestamp}.${eventId}.${body}`).digest("hex");
}

/**
 * Sign and POST one submission. `eventId` must be a lowercase UUID chosen by
 * the caller: the same submission retried must carry the same id and the same
 * payload, which then serialises to the same bytes.
 */
export async function submitToIbmc(payload: IbmcPayload, eventId: string): Promise<IbmcResult> {
  const url = process.env.IBMC_FORM_URL || "";
  const secret = process.env.IBMC_FORM_SECRET || "";
  // Serialised once: the signature covers these exact bytes.
  const body = JSON.stringify(payload);
  const timestamp = Math.floor(Date.now() / 1000);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      [HEADER.version]: VERSION,
      [HEADER.timestamp]: String(timestamp),
      [HEADER.eventId]: eventId,
      [HEADER.signature]: signIbmc(secret, timestamp, eventId, body),
    },
    body,
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);
  return {
    ok: res.ok,
    status: res.status,
    reason: res.ok ? null : readReason(data),
    summary: res.ok ? summarise(data) : null,
    booking: res.ok ? readBooking(data, url) : null,
  };
}

// The error shape is not documented. Pull a short code-like value from the
// usual places and nothing else: an error body may echo the submission back.
function readReason(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const raw = d.code ?? d.error ?? d.reason;
  const value =
    typeof raw === "string"
      ? raw
      : raw && typeof raw === "object" && typeof (raw as { code?: unknown }).code === "string"
        ? (raw as { code: string }).code
        : null;
  return value ? value.slice(0, 120) : null;
}

// Enough to tell a fresh lead from a de-duplicated retry in the log, without
// writing answers: every top-level key, plus the value only for booleans and
// short strings under keys that are about the submission, not the person.
const SAFE_VALUE_KEYS = new Set([
  "ok",
  "status",
  "duplicate",
  "deduplicated",
  "replayed",
  "idempotent",
  "accepted",
  "submissionId",
  "id",
]);

const SAFE_STRING_RE = /^[\w.:-]{1,64}$/;

function summarise(data: unknown): string | null {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  return Object.entries(data as Record<string, unknown>)
    .map(([k, v]) => {
      if (!SAFE_VALUE_KEYS.has(k)) return k;
      if (typeof v === "boolean" || typeof v === "number") return `${k}=${v}`;
      // Token-like strings only, so a url (and its fragment) never prints,
      // even under an allowlisted key.
      if (typeof v === "string" && SAFE_STRING_RE.test(v)) return `${k}=${v}`;
      return k;
    })
    .join(" ");
}
