"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Icon } from "@/components/BookDemoWizard";
import type { Slot, SlotsView } from "@/lib/ibmc-booking";
import { localTimezone, slotDayKey, slotLabel, tzOffsetLabel } from "@/lib/lead-client";

// /demo2 time picker for IBMC's booking API. Shown after the wizard is
// accepted with `booking.mode: "api"`. Talks only to /api/ibmc-booking, which
// holds the booking token server side: this page knows the receipt id, the
// open slots and nothing else. Same month-and-times layout as the GHL picker
// on /demo, in the browser's own time zone.

type Phase = "loading" | "ready" | "error";

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
}: {
  receiptId: string;
  onBooked: (startIso: string, timezone: string) => void;
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
  }, [receiptId, onExpired]);

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
      // Anything but booked is not a reservation. Check the slots again
      // before the visitor tries another time.
      setPicked(null);
      setNotice(
        data.status === "slot_unavailable"
          ? "That time was just taken. Please pick another."
          : "That time is not confirmed. Please pick a time again.",
      );
      await load();
    } catch {
      setNotice("We could not book that time. Please try again.");
      await load();
    } finally {
      setBusy(false);
    }
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
                  disabled={!avail}
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
            {phase === "loading" ? (
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
        <button type="button" className="bd-wiz-back" onClick={onSkip}>
          Not now
        </button>
        <button type="button" className="btn solid" disabled={!picked || busy} onClick={confirm}>
          <span>{busy ? "Booking…" : "Confirm booking"}</span>
        </button>
      </div>
    </div>
  );
}
