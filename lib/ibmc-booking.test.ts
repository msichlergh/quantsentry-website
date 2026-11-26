import { afterEach, describe, expect, it, vi } from "vitest";

import {
  openSession,
  parseSlot,
  readCookie,
  requestBooking,
  safeSlots,
  sealSession,
  sessionFromReceipt,
  type BookingSession,
} from "@/lib/ibmc-booking";

const SECRET = "test-secret";
const TOKEN = "tok_abcdefghijklmnopqrstuvwxyz";
const URL_ = `https://crm.example.test/form-booking#${TOKEN}`;
const NOW = 1_800_000_000_000;

const session = (over: Partial<BookingSession> = {}): BookingSession => ({
  receiptId: "r-1",
  origin: "https://crm.example.test",
  token: TOKEN,
  expiresAt: NOW + 1000,
  ...over,
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("sessionFromReceipt", () => {
  it("builds a session for API delivery", () => {
    const s = sessionFromReceipt({ status: "pending", deliveryMethod: "api", url: URL_ }, "r-1", NOW);
    expect(s).toEqual({ receiptId: "r-1", origin: "https://crm.example.test", token: TOKEN, expiresAt: NOW + 86_400_000 });
  });

  it("returns null for hosted delivery, a missing booking or a missing receipt id", () => {
    expect(sessionFromReceipt({ status: "pending", deliveryMethod: "hosted", url: URL_ }, "r-1")).toBeNull();
    expect(sessionFromReceipt(null, "r-1")).toBeNull();
    expect(sessionFromReceipt({ status: "pending", deliveryMethod: "api", url: URL_ }, null)).toBeNull();
    expect(
      sessionFromReceipt({ status: "pending", deliveryMethod: "api", url: "https://crm.example.test/x" }, "r-1"),
    ).toBeNull();
  });
});

describe("sealed session cookie", () => {
  it("round-trips and hides the token", () => {
    const sealed = sealSession(session(), SECRET);
    expect(sealed).not.toContain(TOKEN);
    expect(openSession(sealed, SECRET, NOW)).toEqual(session());
  });

  it("rejects a tampered value, the wrong secret and an expired receipt", () => {
    const sealed = sealSession(session(), SECRET);
    const [iv, tag, body] = sealed.split(".");
    const flipped = `${iv}.${tag}.${body.slice(0, -2)}${body.endsWith("AA") ? "BB" : "AA"}`;
    expect(openSession(flipped, SECRET, NOW)).toBeNull();
    expect(openSession(sealed, "other-secret", NOW)).toBeNull();
    expect(openSession(sealed, SECRET, NOW + 1000)).toBeNull();
    expect(openSession("garbage", SECRET, NOW)).toBeNull();
    expect(openSession(null, SECRET, NOW)).toBeNull();
  });

  it("reads the cookie out of a Cookie header", () => {
    expect(readCookie("a=1; ibmc_booking=abc.def.ghi; b=2")).toBe("abc.def.ghi");
    expect(readCookie("a=1")).toBeNull();
    expect(readCookie(null)).toBeNull();
  });
});

describe("requestBooking", () => {
  it("posts the token and API delivery to /api/forms/booking on the booking origin", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ status: "available", slots: [] })));
    vi.stubGlobal("fetch", fetchMock);

    const reply = await requestBooking(session(), { action: "slots" });
    expect(reply).toEqual({ httpStatus: 200, data: { status: "available", slots: [] } });

    const [endpoint, init] = fetchMock.mock.calls[0] as [URL, RequestInit];
    expect(String(endpoint)).toBe("https://crm.example.test/api/forms/booking");
    expect(init.redirect).toBe("error");
    expect(init.cache).toBe("no-store");
    expect(JSON.parse(String(init.body))).toEqual({ action: "slots", token: TOKEN, deliveryMethod: "api" });
  });
});

describe("safeSlots", () => {
  it("keeps only the picker fields and well-formed slots", () => {
    const view = safeSlots({
      status: "available",
      title: "Demo",
      durationMinutes: 30,
      recordingEnabled: true,
      hostEmail: "someone@example.test",
      token: TOKEN,
      slots: [
        { startTime: 1795698000, endTime: 1795699800, hostId: "h1" },
        { startTime: "1795698300", endTime: 1795700100 },
        { startTime: 1795700100, endTime: 1795698000 },
      ],
    });
    expect(view).toEqual({
      status: "available",
      title: "Demo",
      durationMinutes: 30,
      recordingEnabled: true,
      slots: [{ startTime: 1795698000, endTime: 1795699800 }],
    });
  });

  it("parses only whole Unix-second slots from the browser", () => {
    expect(parseSlot({ startTime: 10, endTime: 20 })).toEqual({ startTime: 10, endTime: 20 });
    expect(parseSlot({ startTime: 10.5, endTime: 20 })).toBeNull();
    expect(parseSlot({ startTime: 20, endTime: 10 })).toBeNull();
    expect(parseSlot("x")).toBeNull();
  });
});
