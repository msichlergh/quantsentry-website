import { Badge } from "@/components/site/primitives";

function ChevronDown() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4 text-faint-foreground">
      <path
        d="m4 6 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const sources = ["Prime brokers", "OMS blotters", "Fund custodians"];

export function AtlasPipelineDiagram() {
  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-6 md:p-8">
      <span className="font-mono text-label uppercase tracking-[0.08em] text-subtle-foreground">
        Reconciliation pipeline
      </span>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {sources.map((source) => (
          <div
            key={source}
            className="rounded-lg border border-border bg-surface px-3 py-3 text-center text-caption text-muted-foreground"
          >
            {source}
          </div>
        ))}
      </div>

      <div className="flex justify-center py-2">
        <ChevronDown />
      </div>

      <div className="rounded-lg border border-accent/30 bg-surface px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-body-sm font-medium text-foreground">
            Reconciliation engine
          </span>
          <Badge tone="accent">1 break flagged</Badge>
        </div>
        <p className="mt-1 text-caption text-subtle-foreground">
          Matched by CUSIP/ISIN, account and strategy tag — inside a 0.5bp tolerance
        </p>
      </div>

      <div className="flex justify-center py-2">
        <ChevronDown />
      </div>

      <div className="rounded-lg border border-border bg-surface px-4 py-3 text-center">
        <span className="text-body-sm font-medium text-foreground">
          Live exposure graph
        </span>
      </div>
    </div>
  );
}
