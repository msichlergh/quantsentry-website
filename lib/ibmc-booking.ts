import "server-only";

import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

import type { IbmcBooking } from "@/lib/ibmc";

// IBMC form-linked scheduling, server side. Test integration behind /demo2.
//
// When an accepted form receipt carries `booking.deliveryMethod: "api"`, the
// website shows its own time picker. The booking url's fragment is a secret
// token that must stay on the website server, and Vercel functions keep no
// memory between requests, so the token travels between requests sealed in an
// HttpOnly cookie:
//
//   - AES-256-GCM, key derived from IBMC_FORM_SECRET, so it can't be read or
//     forged in the browser, and browser JS or tag managers can't see it at all
//   - scoped to the receipt: the browser must name the same receipt id
//   - expires with the receipt, 24 hours after the form was accepted
//   - Path=/api/ibmc-booking, so it is only ever sent to the booking route
//
// IBMC booking API: POST <booking origin>/api/forms/booking with JSON
// `{ action, token, deliveryMethod: "api", slot? }`. Observed answers:
//   slots  200 { status: "available", title, durationMinutes, recordingEnabled,
//                slots: [{ startTime, endTime }] }        (Unix seconds)
//   book   200 { status: "booked" | "slot_unavailable", ... }
//   any    404 { status: "unavailable" }   receipt expired or token unknown
//          400 { status: "invalid_request" }
// Only "booked" confirms a reservation.

export const BOOKING_COOKIE = "ibmc_booking";
export const BOOKING_COOKIE_PATH = "/api/ibmc-booking";
const RECEIPT_TTL_MS = 24 * 60 * 60 * 1000;
const TIMEOUT_MS = 8_000;
const MAX_SLOTS = 500;

export type BookingSession = {
  /** IBMC's receipt id for the accepted submission. Not a secret. */
  receiptId: string;
  /** Origin of the booking url, where the booking API lives. */
  origin: string;
  /** The token from the booking url's fragment. Secret. */
  token: string;
  /** Epoch ms after which the receipt is treated as expired. */
  expiresAt: number;
};

export type Slot = { startTime: number; endTime: number };

export type SlotsView = {
  status: string;
  title?: string;
  durationMinutes?: number;
  recordingEnabled: boolean;
  slots: Slot[];
};

export type BookView = { status: string; startTime?: number; endTime?: number };

export type BookingReply = { httpStatus: number; data: Record<string, unknown> };

/**
 * The session for an accepted receipt, or null when the receipt has no booking
 * or IBMC wants its hosted page instead of the API.
 */
export function sessionFromReceipt(
  booking: IbmcBooking | null,
  receiptId: string | null,
  now = Date.now(),
): BookingSession | null {
  if (!booking || booking.deliveryMethod !== "api" || !receiptId) return null;
  let url: URL;
  try {
    url = new URL(booking.url);
  } catch {
    return null;
  }
  const token = url.hash.slice(1);
  if (!token) return null;
  return { receiptId, origin: url.origin, token, expiresAt: now + RECEIPT_TTL_MS };
}

// --- Sealing ----------------------------------------------------------------

function key(secret: string): Buffer {
  // A separate key from the signing use of the same credential.
  return createHash("sha256").update(`ibmc-booking-cookie:v1:${secret}`).digest();
}

export function sealSession(session: BookingSession, secret: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(secret), iv);
  const plain = Buffer.from(JSON.stringify(session), "utf8");
  const sealed = Buffer.concat([cipher.update(plain), cipher.final()]);
  return [iv, cipher.getAuthTag(), sealed].map((b) => b.toString("base64url")).join(".");
}

/** The session in a cookie value, or null if it is missing, tampered or expired. */
export function openSession(value: string | null | undefined, secret: string, now = Date.now()): BookingSession | null {
  if (!value || !secret) return null;
  const parts = value.split(".");
  if (parts.length !== 3) return null;
  try {
    const [iv, tag, sealed] = parts.map((p) => Buffer.from(p, "base64url"));
    if (iv.length !== 12 || tag.length !== 16) return null;
    const decipher = createDecipheriv("aes-256-gcm", key(secret), iv);
    decipher.setAuthTag(tag);
    const plain = Buffer.concat([decipher.update(sealed), decipher.final()]).toString("utf8");
    const s = JSON.parse(plain) as Partial<BookingSession>;
    if (
      typeof s.receiptId !== "string" ||
      typeof s.origin !== "string" ||
      typeof s.token !== "string" ||
      typeof s.expiresAt !== "number"
    ) {
      return null;
    }
    if (s.expiresAt <= now) return null;
    return s as BookingSession;
  } catch {
    return null;
  }
}

export function sessionCookie(value: string, maxAgeSeconds: number): string {
  return [
    `${BOOKING_COOKIE}=${value}`,
    `Path=${BOOKING_COOKIE_PATH}`,
    `Max-Age=${Math.max(0, Math.floor(maxAgeSeconds))}`,
    "HttpOnly",
    "Secure",
    "SameSite=Strict",
  ].join("; ");
}

export const clearSessionCookie = () => sessionCookie("", 0);

export function readCookie(header: string | null, name = BOOKING_COOKIE): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i > 0 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return null;
}

// --- IBMC booking API ---------------------------------------------------------

/** One call to IBMC's booking API. The token is added here and never returned. */
export async function requestBooking(
  session: BookingSession,
  request: { action: "slots" } | { action: "book"; slot: Slot },
): Promise<BookingReply> {
  const endpoint = new URL("/api/forms/booking", session.origin);
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    body: JSON.stringify({ ...request, token: session.token, deliveryMethod: "api" }),
  });
  const data = await res.json().catch(() => null);
  return {
    httpStatus: res.status,
    data: data && typeof data === "object" && !Array.isArray(data) ? (data as Record<string, unknown>) : {},
  };
}

const STATUS_RE = /^[a-z_]{1,40}$/;
const status = (v: unknown, fallback: string) => (typeof v === "string" && STATUS_RE.test(v) ? v : fallback);
const seconds = (v: unknown) => (typeof v === "number" && Number.isInteger(v) && v > 0 ? v : null);

/** Only what the time picker needs. Nothing else from IBMC reaches the browser. */
export function safeSlots(data: Record<string, unknown>): SlotsView {
  const slots: Slot[] = [];
  if (Array.isArray(data.slots)) {
    for (const raw of data.slots.slice(0, MAX_SLOTS)) {
      if (!raw || typeof raw !== "object") continue;
      const startTime = seconds((raw as Record<string, unknown>).startTime);
      const endTime = seconds((raw as Record<string, unknown>).endTime);
      if (startTime && endTime && endTime > startTime) slots.push({ startTime, endTime });
    }
  }
  const out: SlotsView = {
    status: status(data.status, "unknown"),
    recordingEnabled: data.recordingEnabled === true,
    slots,
  };
  if (typeof data.title === "string") out.title = data.title.slice(0, 120);
  const minutes = data.durationMinutes;
  if (typeof minutes === "number" && Number.isInteger(minutes) && minutes > 0 && minutes <= 1440) {
    out.durationMinutes = minutes;
  }
  return out;
}

export function safeBook(data: Record<string, unknown>, slot: Slot): BookView {
  const s = status(data.status, "unknown");
  // Echo the slot the visitor chose, not whatever came back, and only on booked.
  return s === "booked" ? { status: s, startTime: slot.startTime, endTime: slot.endTime } : { status: s };
}

/** A slot from the browser: two whole Unix-second values, end after start. */
export function parseSlot(raw: unknown): Slot | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const startTime = seconds((raw as Record<string, unknown>).startTime);
  const endTime = seconds((raw as Record<string, unknown>).endTime);
  if (!startTime || !endTime || endTime <= startTime) return null;
  return { startTime, endTime };
}
