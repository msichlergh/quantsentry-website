import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/ibmc-lead/route";
import { openSession, readCookie } from "@/lib/ibmc-booking";

const FORM_URL = "https://crm.example.test/api/webhooks/forms/ws/form";
const SECRET = "test-secret";
const TOKEN = "tok_abcdefghijklmnopqrstuvwxyz";

let fetchMock: ReturnType<typeof vi.fn>;
let ip = 0;

const submit = () =>
  POST(
    new Request("http://localhost:3000/api/ibmc-lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        Host: "localhost:3000",
        "x-forwarded-for": `10.1.0.${++ip}`,
      },
      body: JSON.stringify({
        kind: "wizard",
        businessType: "Prop Trading Firm",
        website: "example.com",
        firstName: "Test",
        lastName: "Wizard",
        email: `test${ip}@example.com`,
        phone: "+447700900123",
        company_confirm: "",
        ts: Date.now() - 10_000,
      }),
    }),
  );

const receipt = (booking?: Record<string, unknown>) =>
  new Response(
    JSON.stringify({
      ok: true,
      result: booking ? "pending_booking" : "accepted",
      dealId: booking ? null : "d-1",
      submissionId: "r-1",
      ...(booking ? { booking } : {}),
    }),
    { status: 200 },
  );

beforeEach(() => {
  vi.stubEnv("IBMC_FORM_URL", FORM_URL);
  vi.stubEnv("IBMC_FORM_SECRET", SECRET);
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/ibmc-lead booking hand-off", () => {
  it("API delivery: seals the token in an HttpOnly cookie and returns only the receipt id", async () => {
    fetchMock.mockResolvedValue(
      receipt({ status: "pending", deliveryMethod: "api", url: `https://crm.example.test/form-booking#${TOKEN}` }),
    );
    const res = await submit();
    const text = await res.text();
    expect(JSON.parse(text)).toEqual({ ok: true, delivered: true, booking: { mode: "api", receiptId: "r-1" } });
    expect(text).not.toContain(TOKEN);

    const setCookie = res.headers.get("set-cookie") || "";
    expect(setCookie).toMatch(/HttpOnly/);
    expect(setCookie).toMatch(/Path=\/api\/ibmc-booking/);
    expect(setCookie).toMatch(/SameSite=Strict/);
    expect(setCookie).not.toContain(TOKEN);
    const session = openSession(readCookie(setCookie.split(";")[0]), SECRET);
    expect(session).toMatchObject({ receiptId: "r-1", origin: "https://crm.example.test", token: TOKEN });
  });

  it("hosted delivery: hands the page the booking link and sets no cookie", async () => {
    fetchMock.mockResolvedValue(
      receipt({ status: "pending", deliveryMethod: "hosted", url: `https://crm.example.test/form-booking#${TOKEN}` }),
    );
    const res = await submit();
    expect(await res.json()).toEqual({
      ok: true,
      delivered: true,
      bookingUrl: `https://crm.example.test/form-booking#${TOKEN}`,
    });
    expect(res.headers.get("set-cookie")).toBeNull();
  });

  it("no booking: the usual confirmation", async () => {
    fetchMock.mockResolvedValue(receipt());
    const res = await submit();
    expect(await res.json()).toEqual({ ok: true, delivered: true });
    expect(res.headers.get("set-cookie")).toBeNull();
  });
});
