const trace = [
  {
    step: "Parse",
    detail: "Question mapped to book, factor and scenario schema",
    duration: "11ms",
  },
  {
    step: "Resolve",
    detail: "Scenario applied against the live Atlas exposure graph",
    duration: "38ms",
  },
  {
    step: "Compute",
    detail: "Net delta recalculated across 3,140 matching positions",
    duration: "24ms",
  },
  {
    step: "Cite",
    detail: "Contributing positions ranked and attached to the answer",
    duration: "7ms",
  },
];

export function QueryTraceDiagram() {
  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-6 md:p-8">
      <div className="flex items-center justify-between">
        <span className="font-mono text-label uppercase tracking-[0.08em] text-subtle-foreground">
          Execution trace
        </span>
        <span className="font-mono text-label text-accent">80ms total</span>
      </div>

      <ol className="mt-5 flex flex-col">
        {trace.map((item, index) => (
          <li
            key={item.step}
            className="flex items-start gap-4 border-b border-border py-3 last:border-0"
          >
            <span className="font-mono text-label text-faint-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-body-sm font-medium text-foreground">
                {item.step}
              </span>
              <span className="block text-caption text-subtle-foreground">
                {item.detail}
              </span>
            </span>
            <span className="shrink-0 font-mono text-caption text-muted-foreground">
              {item.duration}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
