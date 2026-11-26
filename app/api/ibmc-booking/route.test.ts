import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/ibmc-booking/route";
import { sealSession } from "@/lib/ibmc-booking";

const SECRET = "test-secret";
const TOKEN = "tok_abcdefghijklmnopqrstuvwxyz";
const SLOT = { startTime: 1795698000, endTime: 1795699800 };

let fetchMock: ReturnType<typeof vi.fn>;

const cookie = (over: Record<string, unknown> = {}) =>
  `ibmc_booking=${sealSession(
    {
      receiptId: "r-1",
      origin: "https://crm.example.test",
      token: TOKEN,
      expiresAt: Date.now() + 60_000,
      ...over,
    },
    SECRET,
  )}`;

const call = (body: Record<string, unknown>, cookieHeader: string | null = cookie()) =>
  POST(
    new Request("http://localhost:3000/api/ibmc-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        Host: "localhost:3000",
        // A fresh IP per call keeps the in-memory rate limit out of the way.
        "x-forwarded-for": `10.0.0.${Math.floor(Math.random() * 250) + 1}`,
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      body: JSON.stringify(body),
    }),
  );

const ibmc = (status: number, body: unknown) => new Response(JSON.stringify(body), { status });

beforeEach(() => {
  vi.stubEnv("IBMC_FORM_SECRET", SECRET);
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("POST /api/ibmc-booking", () => {
  it("returns safe slot fields only, never the token", async () => {
    fetchMock.mockResolvedValue(
      ibmc(200, { status: "available", durationMinutes: 30, recordingEnabled: true, slots: [SLOT], hostEmail: "x@y.z" }),
    );
    const res = await call({ action: "slots", receiptId: "r-1" });
    const text = await res.text();
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(JSON.parse(text)).toEqual({ status: "available", durationMinutes: 30, recordingEnabled: true, slots: [SLOT] });
    expect(text).not.toContain(TOKEN);
  });

  it("answers expired with no session, the wrong receipt, or an expired receipt", async () => {
    expect((await call({ action: "slots", receiptId: "r-1" }, null)).status).toBe(404);
    expect((await call({ action: "slots", receiptId: "r-2" })).status).toBe(404);
    expect((await call({ action: "slots", receiptId: "r-1" }, cookie({ expiresAt: Date.now() - 1 }))).status).toBe(404);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("maps IBMC's 404 to expired and clears the cookie", async () => {
    fetchMock.mockResolvedValue(ibmc(404, { status: "unavailable" }));
    const res = await call({ action: "slots", receiptId: "r-1" });
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ status: "expired" });
    expect(res.headers.get("set-cookie")).toMatch(/^ibmc_booking=;.*Max-Age=0/);
  });

  it("reports an occupied slot without ending the session", async () => {
    fetchMock.mockResolvedValue(ibmc(200, { status: "slot_unavailable" }));
    const res = await call({ action: "book", receiptId: "r-1", slot: SLOT });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: "slot_unavailable" });
    expect(res.headers.get("set-cookie")).toBeNull();
    expect(JSON.parse(String((fetchMock.mock.calls[0][1] as RequestInit).body))).toEqual({
      action: "book",
      slot: SLOT,
      token: TOKEN,
      deliveryMethod: "api",
    });
  });

  it("confirms a booking with the chosen slot and clears the cookie", async () => {
    fetchMock.mockResolvedValue(ibmc(200, { status: "booked", meetingUrl: "https://meet.example.test/secret" }));
    const res = await call({ action: "book", receiptId: "r-1", slot: SLOT });
    expect(await res.json()).toEqual({ status: "booked", ...SLOT });
    expect(res.headers.get("set-cookie")).toMatch(/Max-Age=0/);
  });

  it("rejects a malformed slot and an unknown action before calling IBMC", async () => {
    expect((await call({ action: "book", receiptId: "r-1", slot: { startTime: "x" } })).status).toBe(400);
    expect((await call({ action: "cancel", receiptId: "r-1" })).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("POST /api/ibmc-booking receipt scoping", () => {
  it("does not clear the live session when an older receipt calls", async () => {
    const res = await call({ action: "slots", receiptId: "r-old" });
    expect(res.status).toBe(404);
    expect(res.headers.get("set-cookie")).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
