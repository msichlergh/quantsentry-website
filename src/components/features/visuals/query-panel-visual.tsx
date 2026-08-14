import { Badge, Dot } from "@/components/site/primitives";

const sources = [
  {
    instrument: "MXN 2Y NDF",
    venue: "Prime broker — Citi",
    qty: "-220,000,000",
    time: "14:02:07",
  },
  {
    instrument: "TRY carry basket",
    venue: "Prime broker — Morgan Stanley",
    qty: "+85,000,000",
    time: "14:01:44",
  },
  {
    instrument: "ZAR/USD 3M fwd",
    venue: "Custody — State Street",
    qty: "-60,000,000",
    time: "13:58:12",
  },
];

export function QueryPanelVisual() {
  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-6 md:p-8">
      <div className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3">
        <span aria-hidden className="font-mono text-body-sm text-accent">
          &gt;
        </span>
        <p className="font-mono text-body-sm text-foreground">
          What&apos;s my net EM FX exposure if the carry book halves?
        </p>
        <span
          aria-hidden
          className="ml-auto h-4 w-px shrink-0 bg-accent"
        />
      </div>

      <div className="mt-4 rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-label uppercase tracking-[0.08em] text-subtle-foreground">
            Answer
          </span>
          <Badge tone="accent">-38% vs current</Badge>
        </div>

        <p className="mt-3 font-heading text-[34px]/[36px] tracking-[-0.6px] text-foreground">
          -$482M
        </p>
        <p className="mt-1 text-body-sm text-muted-foreground">
          Net EM FX delta under a 50% carry book reduction, marked to last close.
        </p>

        <div className="mt-5 border-t border-border pt-4">
          <span className="font-mono text-label uppercase tracking-[0.08em] text-subtle-foreground">
            Sources — 3 positions
          </span>

          <ul className="mt-3 flex flex-col">
            {sources.map((source) => (
              <li
                key={source.instrument}
                className="flex items-center justify-between gap-3 border-b border-border py-2.5 last:border-0"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <Dot className="shrink-0" />
                  <span className="min-w-0">
                    <span className="block truncate text-body-sm text-foreground">
                      {source.instrument}
                    </span>
                    <span className="block truncate text-caption text-faint-foreground">
                      {source.venue} · {source.time}
                    </span>
                  </span>
                </span>
                <span className="shrink-0 font-mono text-body-sm text-muted-foreground">
                  {source.qty}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
