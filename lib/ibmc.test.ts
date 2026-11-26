import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { signIbmc, submitToIbmc, type IbmcPayload } from "@/lib/ibmc";

const FORM_URL = "https://crm.example.test/api/webhooks/forms/ws/form";
const SECRET = "test-secret";
const EVENT_ID = "0b6f4b8e-3c2a-4d1e-9f00-1234567890ab";
const PAYLOAD: IbmcPayload = { full_name: "Test Wizard", email: "test@example.com", pageUrl: "https://x.test/demo2" };
const TOKEN = "tok_abcdefghijklmnopqrstuvwxyz";

const reply = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.stubEnv("IBMC_FORM_URL", FORM_URL);
  vi.stubEnv("IBMC_FORM_SECRET", SECRET);
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("submitToIbmc receipts", () => {
  it("reads an immediate accepted receipt with no booking", async () => {
    fetchMock.mockResolvedValue(reply(200, { ok: true, result: "accepted", dealId: "d1", submissionId: "r-1" }));
    const res = await submitToIbmc(PAYLOAD, EVENT_ID);
    expect(res.ok).toBe(true);
    expect(res.booking).toBeNull();
    expect(res.receiptId).toBe("r-1");
  });

  it("reads a pending receipt with API delivery", async () => {
    fetchMock.mockResolvedValue(
      reply(200, {
        ok: true,
        result: "pending_booking",
        dealId: null,
        submissionId: "r-2",
        booking: { status: "pending", deliveryMethod: "api", url: `https://crm.example.test/form-booking#${TOKEN}` },
      }),
    );
    const res = await submitToIbmc(PAYLOAD, EVENT_ID);
    expect(res.booking).toEqual({
      status: "pending",
      deliveryMethod: "api",
      url: `https://crm.example.test/form-booking#${TOKEN}`,
    });
    expect(res.receiptId).toBe("r-2");
  });

  it("treats any other delivery method as the hosted page", async () => {
    fetchMock.mockResolvedValue(
      reply(200, {
        ok: true,
        submissionId: "r-3",
        booking: { status: "pending", deliveryMethod: "hosted", url: `https://crm.example.test/form-booking#${TOKEN}` },
      }),
    );
    expect((await submitToIbmc(PAYLOAD, EVENT_ID)).booking?.deliveryMethod).toBe("hosted");
  });

  it("drops a booking url on another host", async () => {
    fetchMock.mockResolvedValue(
      reply(200, { ok: true, booking: { status: "pending", deliveryMethod: "api", url: `https://evil.test/#${TOKEN}` } }),
    );
    expect((await submitToIbmc(PAYLOAD, EVENT_ID)).booking).toBeNull();
  });
});

describe("submitToIbmc retry", () => {
  it("retries a network failure with the same event id and body, and a fresh signature", async () => {
    const now = vi.spyOn(Date, "now");
    now.mockReturnValueOnce(1_800_000_000_000).mockReturnValue(1_800_000_007_000);
    fetchMock
      .mockRejectedValueOnce(new TypeError("fetch failed"))
      .mockResolvedValueOnce(reply(200, { ok: true, submissionId: "r-4" }));

    const res = await submitToIbmc(PAYLOAD, EVENT_ID);
    expect(res.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const [first, second] = fetchMock.mock.calls.map(([, init]) => init as RequestInit);
    const h1 = first.headers as Record<string, string>;
    const h2 = second.headers as Record<string, string>;
    expect(second.body).toBe(first.body);
    expect(h2["x-ibmc-webhook-id"]).toBe(EVENT_ID);
    expect(h1["x-ibmc-webhook-timestamp"]).toBe("1800000000");
    expect(h2["x-ibmc-webhook-timestamp"]).toBe("1800000007");
    expect(h2["x-ibmc-webhook-signature"]).not.toBe(h1["x-ibmc-webhook-signature"]);
    expect(h2["x-ibmc-webhook-signature"]).toBe(signIbmc(SECRET, 1800000007, EVENT_ID, String(second.body)));
    expect(h2["x-ibmc-webhook-signature"]).toMatch(/^[0-9a-f]{64}$/);
  });

  it("retries a 5xx once", async () => {
    fetchMock.mockResolvedValueOnce(reply(503, {})).mockResolvedValueOnce(reply(200, { ok: true }));
    expect((await submitToIbmc(PAYLOAD, EVENT_ID)).ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("does not retry a 4xx refusal", async () => {
    fetchMock.mockResolvedValue(reply(422, { code: "invalid_signature" }));
    const res = await submitToIbmc(PAYLOAD, EVENT_ID);
    expect(res.ok).toBe(false);
    expect(res.reason).toBe("invalid_signature");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe("booking domain", () => {
  it("accepts a booking url on the calendar's booking domain", async () => {
    fetchMock.mockResolvedValue(
      reply(200, {
        ok: true,
        submissionId: "r-5",
        booking: { status: "pending", deliveryMethod: "api", url: `https://app.quanttechnology.com/form-booking#${TOKEN}` },
      }),
    );
    expect((await submitToIbmc(PAYLOAD, EVENT_ID)).booking?.url).toBe(
      `https://app.quanttechnology.com/form-booking#${TOKEN}`,
    );
  });
});
