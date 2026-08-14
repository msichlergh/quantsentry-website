import { Dot } from "@/components/site/primitives";

const envelopeUpper = [
  [0, 160], [80, 150], [160, 158], [240, 145], [320, 150], [400, 141], [480, 148], [560, 140], [620, 145],
];
const envelopeLower = [
  [0, 205], [80, 210], [160, 202], [240, 212], [320, 206], [400, 214], [480, 208], [560, 216], [620, 212],
];
const realised = [
  [0, 182], [80, 179], [160, 184], [240, 177], [320, 181], [360, 176], [400, 172],
  [440, 152], [480, 112], [520, 82], [560, 60], [600, 46], [620, 40],
];

function toPath(points: number[][]) {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
}

const envelopeFill = `${toPath([...envelopeUpper, ...[...envelopeLower].reverse()])} Z`;

const divergence = { x: 452, y: 128 };

export function SentinelSparklineVisual() {
  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-6 md:p-8">
      <div className="flex items-center justify-between">
        <span className="font-mono text-label uppercase tracking-[0.08em] text-subtle-foreground">
          Strategy — EM rates carry v3
        </span>
        <span className="flex items-center gap-1.5 font-mono text-label text-accent">
          <Dot />
          Drift flagged
        </span>
      </div>

      <svg
        viewBox="0 0 620 260"
        role="img"
        aria-label="Sparkline of realised strategy performance breaking out of its shaded backtest envelope, with the divergence point marked"
        className="mt-6 h-auto w-full"
      >
        <line x1={0} y1={230} x2={620} y2={230} className="stroke-border" strokeWidth={1} />

        <path d={envelopeFill} className="fill-muted-foreground/10" />
        <path d={toPath(envelopeUpper)} className="stroke-border" strokeWidth={1} fill="none" />
        <path d={toPath(envelopeLower)} className="stroke-border" strokeWidth={1} fill="none" />

        <path
          d={toPath(realised)}
          className="stroke-accent"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <line
          x1={divergence.x}
          y1={20}
          x2={divergence.x}
          y2={230}
          className="stroke-accent/40"
          strokeWidth={1}
          strokeDasharray="3 4"
        />
        <circle cx={divergence.x} cy={divergence.y} r={5} className="fill-accent" />

        <text
          x={divergence.x + 12}
          y={28}
          className="fill-foreground font-mono text-[11px]"
        >
          Day 47 — vol +2.4σ
        </text>
      </svg>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-caption text-subtle-foreground">
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-1.5 rounded-full bg-muted-foreground/50" />
          Backtest envelope
        </span>
        <span className="flex items-center gap-1.5">
          <Dot />
          Realised performance
        </span>
      </div>
    </div>
  );
}
