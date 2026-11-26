"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

// /demo2 copy of BookDemoContact that posts to the IBMC test route
// (/api/ibmc-lead) instead of /api/lead. Same markup and classes, so it looks
// identical. Sending is gated by CONNECTED below. Two deliberate differences:
//   - no trackLeadSubmit: test submissions must not land in the GA/GTM funnel
//   - no Turnstile: the test route does not verify it
// BookDemoContact itself is untouched.

// Sending switch. IBMC workspace intake is on, so the form sends. Set to false
// to show the form without sending (IBMC drops every submission while intake
// is off). Needs IBMC_FORM_URL / IBMC_FORM_SECRET set, or the route answers 503.
const CONNECTED = true;

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export type Attribution = Record<string, string>;

const UTM_KEYS: Record<string, string> = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_term: "utmTerm",
  utm_content: "utmContent",
  gclid: "gclid",
};

export function readAttribution(): Attribution {
  const out: Attribution = {
    landingPage: `${window.location.origin}${window.location.pathname}`,
    firstSeenAt: new Date().toISOString(),
  };
  if (document.referrer) out.referrer = document.referrer;
  const params = new URLSearchParams(window.location.search);
  for (const [param, key] of Object.entries(UTM_KEYS)) {
    const value = params.get(param);
    if (value) out[key] = value;
  }
  return out;
}

export function BookDemoContactIbmc() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // IBMC's hosted booking link, when the form has booking on. It carries a
  // secret token in its fragment: held in state only, never stored, logged or
  // tracked, and opened from a button rather than an href so click-tracking
  // tags never see it.
  const [bookingUrl, setBookingUrl] = useState<string | null>(null);
  // Stamped on mount: the route's sub-2s timing check measures from when a
  // human could first see the form.
  const renderedAt = useRef(0);
  const attribution = useRef<Attribution>({});
  // One id per submission. Retrying the same answers after a failure reuses
  // it so IBMC de-duplicates; changed answers are a new submission.
  const attempt = useRef<{ id: string; key: string } | null>(null);
  useEffect(() => {
    if (!renderedAt.current) renderedAt.current = Date.now();
    attribution.current = readAttribution();
  }, []);

  const dropErr = (k: string) =>
    setErrors((e) => {
      if (e[k] === undefined) return e;
      const rest = { ...e };
      delete rest[k];
      return rest;
    });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy || !CONNECTED) return;
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Enter your name";
    if (!emailOk(email)) next.email = "Enter a valid work email";
    if (!message.trim()) next.message = "Tell us what it is about";
    setErrors(next);
    if (Object.keys(next).length) return;

    setBusy(true);
    setError(null);
    const key = JSON.stringify({ name, email, company, message });
    if (attempt.current?.key !== key) attempt.current = { id: crypto.randomUUID(), key };
    try {
      const res = await fetch("/api/ibmc-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          company_confirm: honeypot || "",
          ts: renderedAt.current,
          attribution: attribution.current,
          submissionId: attempt.current.id,
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        errors?: Record<string, string>;
        bookingUrl?: unknown;
      } | null;
      if (!res.ok || !data?.ok) {
        setErrors(data?.errors || {});
        setError(data?.error || "Something went wrong. Please try again.");
        setBusy(false);
        return;
      }
      attempt.current = null;
      // The route already checked host and scheme; this keeps a javascript:
      // url out of location.assign regardless.
      const link = data.bookingUrl;
      setBookingUrl(typeof link === "string" && link.startsWith("https://") ? link : null);
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <div className="bd-contact-done" role="status">
        <h3>Message received.</h3>
        {bookingUrl ? (
          <>
            <p>Choose a time for a call, or wait for our reply within 24 hours.</p>
            <button
              type="button"
              className="btn solid"
              onClick={() => window.location.assign(bookingUrl)}
            >
              <span>Choose a time</span>
            </button>
          </>
        ) : (
          <p>We reply within 24 hours.</p>
        )}
        <button
          type="button"
          className="bd-btn-link"
          onClick={() => {
            setSent(false);
            setBusy(false);
            setMessage("");
            setBookingUrl(null);
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="bd-contact" onSubmit={submit}>
      {/* Honeypot: out of sight, out of the a11y tree, not focusable. */}
      <div className="bd-hp" aria-hidden="true">
        <label>
          Company confirm
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div className="bd-fields-row-2">
        <label className={`bd-field ${errors.name ? "has-err" : ""}`}>
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              dropErr("name");
            }}
            autoComplete="name"
            autoCapitalize="words"
            placeholder="Jana Fischer"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <small className="bd-field-err">{errors.name}</small>}
        </label>
        <label className={`bd-field ${errors.email ? "has-err" : ""}`}>
          <span>Work email</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              dropErr("email");
            }}
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            autoCapitalize="off"
            placeholder="you@yourfirm.com"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <small className="bd-field-err">{errors.email}</small>}
        </label>
      </div>

      <label className="bd-field">
        <span>
          Company or website <em>(optional)</em>
        </span>
        <input
          type="text"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          autoComplete="organization"
          spellCheck={false}
          placeholder="yourfirm.com"
        />
      </label>

      <label className={`bd-field ${errors.message ? "has-err" : ""}`}>
        <span>Message</span>
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            dropErr("message");
          }}
          rows={4}
          placeholder="e.g. A question on pricing, a partnership idea, or a futures book you would like covered."
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <small className="bd-field-err">{errors.message}</small>}
      </label>

      {error && (
        <div className="bd-form-error bd-form-error-flush" role="alert">
          {error}
        </div>
      )}

      <div className="bd-contact-foot">
        {CONNECTED ? (
          <p className="bd-fine">Your details are used to reply and to arrange a call, nothing else.</p>
        ) : (
          <p className="bd-fine">
            Not connected yet. To reach us, use the form on the <Link href="/demo">demo page</Link>.
          </p>
        )}
        <button type="submit" className="btn solid" disabled={busy || !CONNECTED}>
          <span>{busy ? "Sending…" : "Send message"}</span>
        </button>
      </div>
    </form>
  );
}
