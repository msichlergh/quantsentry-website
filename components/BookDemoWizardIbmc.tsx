"use client";

import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { readAttribution, type Attribution } from "@/components/BookDemoContactIbmc";
import { BookDemoScheduleIbmc } from "@/components/BookDemoScheduleIbmc";
import {
  BD_INTENTS,
  BD_RISK_TODAY,
  BD_ROLES,
  BD_STEPS,
  BD_TIMELINES,
  BdChoice,
  BdDialPicker,
  BdField,
  BookDemoAssurance,
  BookDemoConfirm,
  EMPTY_FORM,
  Icon,
  bdStepErrors,
  type StepId,
} from "@/components/BookDemoWizard";
import { DIAL_CODES } from "@/lib/dial-codes";
import { detectCountry, tzOffsetLabel, type LeadForm } from "@/lib/lead-client";

// /demo2 copy of the demo wizard that posts to the IBMC test route
// (/api/ibmc-lead, `kind: "wizard"`) instead of /api/lead. Same markup and
// classes as BookDemoWizard, which stays untouched for /demo. Differences:
//   - four steps, sent from "Prepare". Then, by what IBMC's receipt says:
//     API delivery -> our own time picker (BookDemoScheduleIbmc); hosted ->
//     "Choose a time" opens IBMC's page; no booking -> the usual confirmation
//   - each answer goes to its own IBMC form field, not a single message
//   - no analytics and no Turnstile, as in BookDemoContactIbmc

const STEPS = BD_STEPS.filter((s) => s.id !== "schedule");
const NO_SLOT = { startIso: null, requireSlot: false };

// The wizard's own rules plus one the route needs: IBMC stores the phone as
// one international number, so a dial code is required and the whole number
// must fit in 15 digits (E.164). /demo sends the national part alone and
// does not need this.
function stepErrors(id: StepId, form: LeadForm): Record<string, string> {
  const e = bdStepErrors(id, form, NO_SLOT);
  if (id === "contact" && !e.phone) {
    const digits = `${form.dial}${form.phone}`.replace(/\D/g, "");
    if (!form.dial) e.phone = "Pick your country code";
    else if (digits.length > 15) e.phone = "That number is too long";
  }
  return e;
}

// Which step holds each field the route can reject.
const STEP_OF: Record<string, StepId> = {
  intent: "intent",
  website: "business",
  firstName: "contact",
  lastName: "contact",
  email: "contact",
  phone: "contact",
};

// What the lead route answered, as far as the page needs to know.
type Accepted = { kind: "api"; receiptId: string } | { kind: "hosted"; url: string } | { kind: "plain" };

function BookDemoWizardIbmc({ onDone }: { onDone: (accepted: Accepted) => void }) {
  const [form, setForm] = useState<LeadForm>(EMPTY_FORM);
  const [i, setI] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const step = STEPS[i];
  const last = i === STEPS.length - 1;

  const dropErr = (k: string) =>
    setErrors((e) => {
      if (e[k] === undefined) return e;
      const rest = { ...e };
      delete rest[k];
      return rest;
    });
  const upd = (k: keyof LeadForm) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    dropErr(k);
  };
  const set = (k: keyof LeadForm) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    dropErr(k);
  };

  useEffect(() => {
    let live = true;
    detectCountry().then((cc) => {
      if (live && cc && DIAL_CODES[cc]) {
        setForm((f) => (f.dial ? f : { ...f, country: cc, dial: DIAL_CODES[cc] }));
      }
    });
    return () => {
      live = false;
    };
  }, []);

  const next = () => {
    const e = stepErrors(step.id, form);
    setErrors(e);
    if (Object.keys(e).length) return;
    setI((n) => Math.min(n + 1, STEPS.length - 1));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    // Every step, not just this one: someone can reach the end and then go
    // back and empty a field.
    const all = STEPS.reduce<Record<string, string>>(
      (acc, s) => ({ ...acc, ...stepErrors(s.id, form) }),
      {},
    );
    if (Object.keys(all).length) {
      setErrors(all);
      setI(STEPS.findIndex((s) => Object.keys(stepErrors(s.id, form)).length));
      return;
    }

    setBusy(true);
    setError(null);
    const answers = {
      businessType: form.intent,
      website: form.website,
      riskHandling: form.stage,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      role: form.role,
      phone: `${form.dial}${form.phone}`,
      telegram: form.telegram,
      notes: form.notes,
      timeline: form.timeline,
    };
    const key = JSON.stringify(answers);
    if (attempt.current?.key !== key) attempt.current = { id: crypto.randomUUID(), key };
    try {
      const res = await fetch("/api/ibmc-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "wizard",
          ...answers,
          company_confirm: form.company_confirm || "",
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
        booking?: { mode?: unknown; receiptId?: unknown };
      } | null;
      if (!res.ok || !data?.ok) {
        const fieldErrors = data?.errors || {};
        setErrors(fieldErrors);
        setError(data?.error || "Something went wrong. Please try again.");
        // Back to the first step with a field error, so it is on screen.
        const at = STEPS.findIndex((s) => Object.keys(fieldErrors).some((k) => STEP_OF[k] === s.id));
        if (at >= 0) setI(at);
        setBusy(false);
        return;
      }
      attempt.current = null;
      // API booking: the token stays server side, the page only gets the
      // receipt id. Hosted booking: the route already checked host and scheme;
      // this keeps a javascript: url out of location.assign regardless.
      const link = data.bookingUrl;
      const receiptId = data.booking?.mode === "api" ? data.booking.receiptId : null;
      if (typeof receiptId === "string" && receiptId) onDone({ kind: "api", receiptId });
      else if (typeof link === "string" && link.startsWith("https://")) onDone({ kind: "hosted", url: link });
      else onDone({ kind: "plain" });
    } catch {
      setError("Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  // Enter advances rather than submitting a half-filled form from step one.
  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !last && (e.target as HTMLElement).tagName !== "TEXTAREA") {
      e.preventDefault();
      next();
    }
  };

  return (
    <form className="bd-wiz" onSubmit={submit} onKeyDown={onKeyDown}>
      <div className="bd-wiz-head">
        <div className="bd-wiz-meta">
          <span className="bd-wiz-count">
            Step {i + 1} of {STEPS.length}
          </span>
          <span className="bd-wiz-now">{step.label}</span>
        </div>
        <div className="bd-prog-bar" aria-hidden="true">
          <i style={{ width: `${Math.round(((i + 1) / STEPS.length) * 100)}%` }} />
        </div>
      </div>

      <div className="bd-fields">
        {/* Honeypot. Hidden from sight and from the a11y tree, never
            focusable, and always empty from a real submission. */}
        <div className="bd-hp" aria-hidden="true">
          <label>
            Company confirm
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.company_confirm}
              onChange={upd("company_confirm")}
            />
          </label>
        </div>

        <h3 className="bd-wiz-title">{step.title}</h3>

        {step.id === "intent" && (
          <div className={`bd-field ${errors.intent ? "has-err" : ""}`}>
            <div className="bd-chips bd-chips-lg">
              {BD_INTENTS.map((o) => (
                <button
                  key={o.v}
                  type="button"
                  className={`bd-chip ${form.intent === o.v ? "is-on" : ""}`}
                  aria-pressed={form.intent === o.v}
                  onClick={() => {
                    setForm((f) => ({ ...f, intent: o.v }));
                    setErrors({});
                    // One tap is the whole step.
                    setTimeout(() => setI(1), 160);
                  }}
                >
                  <span className="bd-chip-ic">
                    <Icon name={o.i} size={16} />
                  </span>
                  {o.v}
                </button>
              ))}
            </div>
            {errors.intent && <small className="bd-field-err">{errors.intent}</small>}
          </div>
        )}

        {step.id === "business" && (
          <>
            <BdField label="Website" error={errors.website}>
              <input
                type="url"
                name="url"
                value={form.website}
                onChange={upd("website")}
                autoComplete="url"
                spellCheck={false}
                autoCapitalize="off"
                inputMode="url"
                placeholder="yourfirm.com"
                autoFocus
                aria-invalid={Boolean(errors.website)}
              />
            </BdField>
            <BdChoice
              label="How risk is handled today"
              options={BD_RISK_TODAY}
              value={form.stage}
              onPick={set("stage")}
            />
          </>
        )}

        {step.id === "contact" && (
          <>
            <div className="bd-fields-row-2">
              <BdField label="First name" error={errors.firstName}>
                <input
                  type="text"
                  name="fname"
                  value={form.firstName}
                  onChange={upd("firstName")}
                  autoComplete="given-name"
                  autoCapitalize="words"
                  enterKeyHint="next"
                  placeholder="Jana"
                  autoFocus
                  aria-invalid={Boolean(errors.firstName)}
                />
              </BdField>
              <BdField label="Last name" error={errors.lastName}>
                <input
                  type="text"
                  name="lname"
                  value={form.lastName}
                  onChange={upd("lastName")}
                  autoComplete="family-name"
                  autoCapitalize="words"
                  enterKeyHint="next"
                  placeholder="Fischer"
                  aria-invalid={Boolean(errors.lastName)}
                />
              </BdField>
            </div>

            <BdField label="Work email" error={errors.email}>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={upd("email")}
                autoComplete="email"
                inputMode="email"
                spellCheck={false}
                autoCapitalize="off"
                enterKeyHint="next"
                placeholder="you@yourfirm.com"
                aria-invalid={Boolean(errors.email)}
              />
            </BdField>

            <BdChoice label="Your role" options={BD_ROLES} value={form.role} onPick={set("role")} />

            <div className="bd-fields-row-2">
              <div className={`bd-field ${errors.phone ? "has-err" : ""}`}>
                <span>Phone</span>
                <div className="bd-phone">
                  <BdDialPicker
                    country={form.country}
                    dial={form.dial}
                    onPick={(cc) => {
                      setForm((f) => ({ ...f, country: cc, dial: DIAL_CODES[cc] || "" }));
                      dropErr("phone");
                    }}
                  />
                  <input
                    type="tel"
                    name="tel"
                    value={form.phone}
                    onChange={(e) => {
                      // A pasted international number swaps the country.
                      // Longest code first, so +1 cannot shadow a longer one.
                      const v = e.target.value;
                      dropErr("phone");
                      const m = v.replace(/[\s()-]/g, "").match(/^\+(\d{1,4})/);
                      if (m) {
                        const hit = Object.entries(DIAL_CODES)
                          .filter(([, d]) => m[1].startsWith(d.slice(1)))
                          .sort((a, b) => b[1].length - a[1].length)[0];
                        if (hit) {
                          setForm((f) => ({
                            ...f,
                            country: hit[0],
                            dial: hit[1],
                            phone: v.replace(/^\s*\+\d+/, "").trimStart(),
                          }));
                          return;
                        }
                      }
                      setForm((f) => ({ ...f, phone: v.replace(/[^\d\s()+.-]/g, "") }));
                    }}
                    autoComplete="tel-national"
                    inputMode="tel"
                    placeholder="Phone number"
                    aria-invalid={Boolean(errors.phone)}
                  />
                </div>
                {errors.phone && <small className="bd-field-err">{errors.phone}</small>}
              </div>
              <BdField label="Telegram" hint="(optional)">
                <input
                  type="text"
                  value={form.telegram}
                  onChange={upd("telegram")}
                  autoCapitalize="off"
                  spellCheck={false}
                  placeholder="@username"
                />
              </BdField>
            </div>
          </>
        )}

        {step.id === "prepare" && (
          <>
            <BdField label="What is important to cover" hint="(optional)">
              <textarea
                value={form.notes}
                onChange={upd("notes")}
                rows={3}
                autoFocus
                placeholder="e.g. A pattern you suspect but cannot prove, or the platforms we should connect first."
              />
            </BdField>
            <BdChoice
              label="When you would like to move"
              options={BD_TIMELINES}
              value={form.timeline}
              onPick={set("timeline")}
            />
          </>
        )}

        {last && <p className="bd-fine">Your details are used to prepare the call.</p>}
      </div>

      {error && (
        <div className="bd-form-error" role="alert">
          {error}
        </div>
      )}

      <div className="bd-cal-foot bd-wiz-foot">
        {i > 0 && (
          <button type="button" className="bd-wiz-back" onClick={() => setI((n) => n - 1)}>
            <Icon name="arrow" size={13} style={{ transform: "rotate(180deg)" }} /> Back
          </button>
        )}
        {/* Distinct keys, so React replaces the node between steps rather than
            turning the Continue button into a submit mid-click. */}
        {last ? (
          <button key="submit" type="submit" className="btn solid" disabled={busy}>
            <span>{busy ? "Sending…" : "Send request"}</span>
          </button>
        ) : (
          <button key="continue" type="button" className="btn solid" onClick={next}>
            <span>Continue</span> <Icon name="arrow" size={13} />
          </button>
        )}
      </div>
    </form>
  );
}

// Shown when IBMC returns a booking link. IBMC's booking page sends
// frame-ancestors 'none', so it cannot be framed in the card; the visitor
// opens it instead. The url carries a secret token in its fragment: held in
// state only, never logged or tracked, and opened from a button rather than an
// href so click-tracking tags never see it.
function BookDemoChooseTime({ url, onReset }: { url: string; onReset: () => void }) {
  return (
    <div className="bd-confirm">
      <div className="bd-confirm-ico">
        <Icon name="check" size={28} stroke={2} />
      </div>
      <h3 className="bd-confirm-h">Request received.</h3>
      <p className="bd-confirm-p">
        Choose a time for your twenty minute call, or wait for our reply within 24 hours.
      </p>
      <div className="bd-confirm-actions">
        <button type="button" className="btn solid" onClick={() => window.location.assign(url)}>
          <span>Choose a time</span>
        </button>
        <button type="button" className="bd-btn-link" onClick={onReset}>
          Send another
        </button>
      </div>
    </div>
  );
}

type Sent =
  | Accepted
  | { kind: "booked"; startIso: string; timezone: string }
  | { kind: "confirming"; startIso: string | null; timezone: string };

// IBMC holds the time but its host calendar has not confirmed it yet. Not a
// booking, so it must not say "You are booked".
function BookDemoConfirmingIbmc({
  startIso,
  timezone,
  onReset,
}: {
  startIso: string | null;
  timezone: string;
  onReset: () => void;
}) {
  let when = "";
  if (startIso) {
    try {
      when = new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: timezone || undefined,
      }).format(new Date(startIso));
    } catch {
      when = new Date(startIso).toLocaleString("en-GB");
    }
  }
  return (
    <div className="bd-confirm">
      <div className="bd-confirm-ico">
        <Icon name="clock" size={28} stroke={2} />
      </div>
      <h3 className="bd-confirm-h">Almost done.</h3>
      <p className="bd-confirm-p">
        {when ? (
          <>
            We are confirming <strong>{when}</strong>
            {timezone ? ` (${tzOffsetLabel(timezone)})` : ""}. You will get an email once it is confirmed.
          </>
        ) : (
          <>We are confirming your time. You will get an email once it is confirmed.</>
        )}
      </p>
      <div className="bd-confirm-actions">
        <button type="button" className="bd-btn-link" onClick={onReset}>
          Send another
        </button>
      </div>
    </div>
  );
}

export function BookDemoBookingIbmc() {
  const [sent, setSent] = useState<Sent | null>(null);
  const reset = () => setSent(null);
  const plain = useCallback(() => setSent({ kind: "plain" }), []);
  const confirming = useCallback(
    (startIso: string | null, timezone: string) => setSent({ kind: "confirming", startIso, timezone }),
    [],
  );

  return (
    <div className="bd-focus-inner">
      <div className="bd-booking">
        <div className="bd-cal">
          {!sent ? (
            <BookDemoWizardIbmc onDone={setSent} />
          ) : sent.kind === "api" ? (
            <BookDemoScheduleIbmc
              receiptId={sent.receiptId}
              onBooked={(startIso, timezone) => setSent({ kind: "booked", startIso, timezone })}
              onExpired={plain}
              onSkip={plain}
              onConfirming={confirming}
            />
          ) : sent.kind === "confirming" ? (
            <BookDemoConfirmingIbmc startIso={sent.startIso} timezone={sent.timezone} onReset={reset} />
          ) : sent.kind === "hosted" ? (
            <BookDemoChooseTime url={sent.url} onReset={reset} />
          ) : (
            <BookDemoConfirm
              picked={{
                ok: true,
                delivered: true,
                booked: sent.kind === "booked",
                startIso: sent.kind === "booked" ? sent.startIso : null,
                timezone: sent.kind === "booked" ? sent.timezone : "",
              }}
              onReset={reset}
            />
          )}
        </div>
      </div>
      {!sent && <BookDemoAssurance />}
    </div>
  );
}
