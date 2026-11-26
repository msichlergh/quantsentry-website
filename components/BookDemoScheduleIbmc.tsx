"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Icon } from "@/components/BookDemoWizard";
import type { Slot, SlotsView } from "@/lib/ibmc-booking";
import { localTimezone, slotDayKey, slotLabel, tzOffsetLabel } from "@/lib/lead-client";

// /demo2 time picker for IBMC's booking API. Shown after the wizard is
// accepted with `booking.mode: "api"`. Talks only to /api/ibmc-booking, which
// holds the booking token server side: this page knows the receipt id, the
// open slots and nothing else. Same month-and-times layout as the GHL picker
// on /demo, in the browser's own time zone.

type Phase = "loading" | "ready" | "error" | "confirming";

// IBMC can answer a booking with "confirming": the time is held while the
// host calendar confirms it. Its guide says to check the slots again; the
// slots answer then says "confirming" until it turns "booked", or "available"
// again if the hold did not stick. Poll for a while, then hand over.
const CONFIRM_POLL_MS = 5_000;
const CONFIRM_POLLS = 12;
const PENDING = new Set(["confirming", "booked"]);

async function callBooking(body: Record<string, unknown>) {
  const res = await fetch("/api/ibmc-booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  return { http: res.status, data };
}

const isoOf = (s: Slot) => new Date(s.startTime * 1000).toISOString();

export function BookDemoScheduleIbmc({
  receiptId,
  onBooked,
  onExpired,
  onSkip,
  onConfirming,
}: {
  receiptId: string;
  onBooked: (startIso: string, timezone: string) => void;
  /**
   * IBMC holds a time but has not confirmed it yet (booked false), or the
   * receipt is already booked from elsewhere (booked true). startIso is null
   * when the time is not known.
   */
  onConfirming: (startIso: string | null, timezone: string, booked: boolean) => void;
  /** The 24h receipt is gone. The visitor gets the usual confirmation. */
  onExpired: () => void;
  /** "Not now": the usual confirmation, we reply within 24 hours. */
  onSkip: () => void;
}) {
  const zone = useMemo(() => localTimezone(), []);
  const [phase, setPhase] = useState<Phase>("loading");
  const [view, setView] = useState<SlotsView | null>(null);
  const [month, setMonth] = useState<Date | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [picked, setPicked] = useState<Slot | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  // The time IBMC is confirming. Kept apart from `picked`, which the
  // calendar can clear.
  const [holding, setHolding] = useState<Slot | null>(null);
  // Polling stops when the picker goes away.
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const load = useCallback(async () => {
    setPhase("loading");
    try {
      const { http, data } = await callBooking({ action: "slots", receiptId });
      if (http === 404) return onExpired();
      if (http !== 200) {
        setPhase("error");
        return;
      }
      const v = data as unknown as SlotsView;
      // This receipt already holds a time (a lost reply, a second tab).
      if (PENDING.has(v.status)) return onConfirming(null, zone, v.status === "booked");
      setView(v);
      setPhase("ready");
      // Open on the month of the first free time.
      setMonth((m) => {
        if (m || !v.slots.length) return m;
        const first = new Date(v.slots[0].startTime * 1000);
        return new Date(first.getFullYear(), first.getMonth(), 1);
      });
    } catch {
      setPhase("error");
    }
  }, [receiptId, onExpired, onConfirming, zone]);

  useEffect(() => {
    // Fetching on mount is the point of this effect; the state it sets comes
    // back from the network, not from render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const byDay = useMemo(() => {
    const map = new Map<string, Slot[]>();
    for (const s of view?.slots || []) {
      const k = slotDayKey(new Date(s.startTime * 1000));
      const list = map.get(k);
      if (list) list.push(s);
      else map.set(k, [s]);
    }
    return map;
  }, [view]);

  const confirm = async () => {
    if (!picked || busy) return;
    setBusy(true);
    setNotice(null);
    try {
      const { http, data } = await callBooking({ action: "book", receiptId, slot: picked });
      if (http === 404) return onExpired();
      if (data.status === "booked") return onBooked(isoOf(picked), zone);
      if (data.status === "confirming") return await waitForConfirmation(picked);
      // Anything else is not a reservation. Check the slots again
      // before the visitor tries another time.
      setPicked(null);
      setNotice(
        data.status === "slot_unavailable"
          ? "That time was just taken. Please pick another."
          : "That time is not confirmed. Please pick a time again.",
      );
      await load();
    } catch {
      // The reply was lost, not necessarily the booking: IBMC may have booked
      // it. Don't say it failed, or the visitor books a second time.
      setNotice("We lost the connection before that time was confirmed. Check your email for an invite before picking another time.");
      await load();
    } finally {
      setBusy(false);
    }
  };

  const waitForConfirmation = async (slot: Slot) => {
    setPhase("confirming");
    setHolding(slot);
    for (let i = 0; i < CONFIRM_POLLS; i++) {
      await new Promise((r) => setTimeout(r, CONFIRM_POLL_MS));
      if (!alive.current) return;
      try {
        const { http, data } = await callBooking({ action: "slots", receiptId });
        if (http === 404) return onExpired();
        if (data.status === "booked") return onBooked(isoOf(slot), zone);
        if (data.status === "available") {
          // The hold did not stick: back to the picker with fresh times.
          setPicked(null);
          setHolding(null);
          setNotice("That time could not be confirmed. Please pick another.");
          setView(data as unknown as SlotsView);
          setPhase("ready");
          return;
        }
      } catch {
        // A lost poll is not an answer; keep checking.
      }
    }
    // Still confirming: the time is held. Say so, and let email take over.
    onConfirming(isoOf(slot), zone, false);
  };

  const minutes = view?.durationMinutes;
  const today = new Date();
  const shown = month || new Date(today.getFullYear(), today.getMonth(), 1);
  const daysInMonth = new Date(shown.getFullYear(), shown.getMonth() + 1, 0).getDate();
  const firstDow = (new Date(shown.getFullYear(), shown.getMonth(), 1).getDay() + 6) % 7;
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const keyFor = (d: number) => slotDayKey(new Date(shown.getFullYear(), shown.getMonth(), d));
  const times = day ? byDay.get(day) || [] : [];
  const moveMonth = (delta: number) => {
    if (phase === "confirming") return;
    const m = new Date(shown.getFullYear(), shown.getMonth() + delta, 1);
    if (m < new Date(today.getFullYear(), today.getMonth(), 1)) return;
    setMonth(m);
    setDay(null);
    setPicked(null);
  };

  const empty = phase === "ready" && (!view?.slots.length || view.status !== "available");

  return (
    <div className="bd-wiz">
      <div className="bd-cal-duration">
        <div className="bd-cal-dur-ico">
          <Icon name="check" size={16} stroke={1.75} />
        </div>
        <div className="bd-cal-dur-t">
          Request received. Pick a time{minutes ? ` for your ${minutes} minute call` : ""}.
        </div>
        <div className="bd-cal-dur-tz">{tzOffsetLabel(zone)}</div>
      </div>

      <div className="bd-cal-body bd-cal-split">
        <div className="bd-cal-left">
          <div className="bd-cal-monthnav">
            <button type="button" className="bd-cal-navbtn" onClick={() => moveMonth(-1)} aria-label="Previous month">
              ‹
            </button>
            <div className="bd-cal-monthlbl">
              {shown.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
            </div>
            <button type="button" className="bd-cal-navbtn" onClick={() => moveMonth(1)} aria-label="Next month">
              ›
            </button>
          </div>
          <div className="bd-cal-dow">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <div key={i} className="bd-cal-dowcell">
                {d}
              </div>
            ))}
          </div>
          <div className="bd-cal-days">
            {cells.map((d, i) => {
              if (d === null) return <div key={i} className="bd-cal-day is-empty" />;
              const k = keyFor(d);
              const avail = byDay.has(k);
              const cls = ["bd-cal-day", avail ? "is-avail" : "is-un", day === k ? "is-sel" : ""]
                .filter(Boolean)
                .join(" ");
              return (
                <button
                  key={i}
                  type="button"
                  className={cls}
                  disabled={!avail || phase === "confirming"}
                  onClick={() => {
                    setDay(k);
                    setPicked(null);
                  }}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bd-cal-right">
          <div className="bd-cal-right-in">
            {phase === "confirming" ? (
              <div className="bd-cal-note" role="status" aria-live="polite">
                Confirming {holding ? slotLabel(isoOf(holding), zone) : "your time"}… This can take a moment.
              </div>
            ) : phase === "loading" ? (
              <div className="bd-cal-note">Loading available times…</div>
            ) : phase === "error" ? (
              <div className="bd-cal-note">
                We could not load available times.{" "}
                <button type="button" className="bd-btn-link" onClick={load}>
                  Try again
                </button>
              </div>
            ) : empty ? (
              <div className="bd-cal-note">No times are open right now. We will reply within 24 hours.</div>
            ) : !day ? (
              <div className="bd-cal-note bd-cal-note-quiet">Pick a day to see available times.</div>
            ) : !times.length ? (
              // A reload after a taken slot can empty the chosen day.
              <div className="bd-cal-note">No times are left on that day. Please pick another day.</div>
            ) : (
              <>
                <div className="bd-cal-times-head">
                  {new Date(times[0].startTime * 1000).toLocaleDateString("en-GB", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="bd-cal-times-list">
                  {times.map((s) => (
                    <button
                      key={s.startTime}
                      type="button"
                      className={`bd-cal-time ${picked?.startTime === s.startTime ? "is-sel" : ""}`}
                      onClick={() => setPicked(s)}
                    >
                      {slotLabel(isoOf(s), zone)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {view?.recordingEnabled && phase === "ready" && !empty && (
        <p className="bd-fine" style={{ padding: "0 32px" }}>
          This call will be recorded.
        </p>
      )}
      {notice && (
        <div className="bd-form-error" role="alert">
          {notice}
        </div>
      )}

      <div className="bd-cal-foot bd-wiz-foot">
        <button type="button" className="bd-wiz-back" onClick={onSkip} disabled={phase === "confirming"}>
          Not now
        </button>
        <button type="button" className="btn solid" disabled={!picked || busy} onClick={confirm}>
          <span>{phase === "confirming" ? "Confirming…" : busy ? "Booking…" : "Confirm booking"}</span>
        </button>
      </div>
    </div>
  );
}
