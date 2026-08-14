const WIDTH = 560;
const CENTER = 130;

function wavePath(phase: number, amplitude: number) {
  const points = Array.from({ length: 15 }, (_, i) => {
    const x = (i / 14) * WIDTH;
    const y = CENTER + Math.sin(x / 70 + phase) * amplitude;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return points.join(" ");
}

const bootstrapPaths = [0, 0.6, 1.2, 1.8, 2.4].map((phase) => wavePath(phase, 12 + phase * 2));

export function SentinelEnvelopeDiagram() {
  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-6 md:p-8">
      <span className="font-mono text-label uppercase tracking-[0.08em] text-subtle-foreground">
        Envelope construction
      </span>

      <svg
        viewBox={`0 0 ${WIDTH} 260`}
        role="img"
        aria-label="Backtest envelope built from resampled bootstrap paths, shown as one and two standard deviation bands"
        className="mt-6 h-auto w-full"
      >
        <rect x={0} y={CENTER - 34} width={WIDTH} height={68} className="fill-muted-foreground/5" />
        <rect x={0} y={CENTER - 18} width={WIDTH} height={36} className="fill-accent/10" />

        <line x1={0} y1={CENTER - 34} x2={WIDTH} y2={CENTER - 34} className="stroke-border" strokeWidth={1} strokeDasharray="3 4" />
        <line x1={0} y1={CENTER + 34} x2={WIDTH} y2={CENTER + 34} className="stroke-border" strokeWidth={1} strokeDasharray="3 4" />
        <line x1={0} y1={CENTER - 18} x2={WIDTH} y2={CENTER - 18} className="stroke-accent/30" strokeWidth={1} />
        <line x1={0} y1={CENTER + 18} x2={WIDTH} y2={CENTER + 18} className="stroke-accent/30" strokeWidth={1} />

        {bootstrapPaths.map((d, i) => (
          <path key={i} d={d} className="stroke-muted-foreground/25" strokeWidth={1} fill="none" />
        ))}

        <text x={8} y={CENTER - 22} className="fill-accent font-mono text-[10px]">±1σ</text>
        <text x={8} y={CENTER - 38} className="fill-subtle-foreground font-mono text-[10px]">±2σ</text>
      </svg>

      <p className="mt-4 text-caption text-subtle-foreground">
        Rebuilt nightly from 2,000 bootstrap resamples of each strategy&apos;s backtest.
      </p>
    </div>
  );
}
