import { Dot } from "@/components/site/primitives";

const TAU = Math.PI * 2;

function clusterPoints(
  cx: number,
  cy: number,
  count: number,
  rx: number,
  ry: number,
  rotation: number,
) {
  return Array.from({ length: count }, (_, i) => {
    const angle = rotation + (i / count) * TAU;
    return { x: cx + Math.cos(angle) * rx, y: cy + Math.sin(angle) * ry };
  });
}

type Cluster = {
  key: string;
  label: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  count: number;
  rotation: number;
  accent: boolean;
};

const clusters: Cluster[] = [
  { key: "emfx", label: "EM FX book", cx: 150, cy: 130, rx: 64, ry: 48, count: 6, rotation: 0.3, accent: true },
  { key: "rates", label: "Rates", cx: 478, cy: 96, rx: 54, ry: 40, count: 5, rotation: 0.9, accent: false },
  { key: "credit", label: "Credit", cx: 138, cy: 306, rx: 50, ry: 38, count: 5, rotation: 1.4, accent: false },
  { key: "equities", label: "Equities", cx: 466, cy: 302, rx: 46, ry: 36, count: 4, rotation: 0.6, accent: false },
];

const hub = { x: 312, y: 202 };

export function AtlasGraphVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-raised p-6 md:p-8">
      <div className="flex items-center justify-between">
        <span className="font-mono text-label uppercase tracking-[0.08em] text-subtle-foreground">
          Live exposure graph
        </span>
        <span className="flex items-center gap-1.5 font-mono text-label text-subtle-foreground">
          <Dot />
          4,218 positions
        </span>
      </div>

      <svg
        viewBox="0 0 620 400"
        role="img"
        aria-label="Force-directed graph of reconciled positions clustered by book, with the EM FX book highlighted"
        className="mt-6 h-auto w-full"
      >
        {/* hub -> cluster spokes */}
        {clusters.map((cluster) => (
          <line
            key={`hub-${cluster.key}`}
            x1={hub.x}
            y1={hub.y}
            x2={cluster.cx}
            y2={cluster.cy}
            className="stroke-border"
            strokeWidth={1}
            strokeDasharray="3 4"
          />
        ))}

        <circle cx={hub.x} cy={hub.y} r={6} className="fill-surface-hover stroke-border" strokeWidth={1} />

        {clusters.map((cluster) => {
          const points = clusterPoints(
            cluster.cx,
            cluster.cy,
            cluster.count,
            cluster.rx,
            cluster.ry,
            cluster.rotation,
          );

          return (
            <g key={cluster.key}>
              {points.map((point, i) => {
                const next = points[(i + 1) % points.length];
                return (
                  <line
                    key={`loop-${cluster.key}-${i}`}
                    x1={point.x}
                    y1={point.y}
                    x2={next.x}
                    y2={next.y}
                    className={cluster.accent ? "stroke-accent/30" : "stroke-border"}
                    strokeWidth={1}
                  />
                );
              })}

              {points.map((point, i) => (
                <line
                  key={`spoke-${cluster.key}-${i}`}
                  x1={cluster.cx}
                  y1={cluster.cy}
                  x2={point.x}
                  y2={point.y}
                  className={cluster.accent ? "stroke-accent/50" : "stroke-border"}
                  strokeWidth={1}
                />
              ))}

              <circle
                cx={cluster.cx}
                cy={cluster.cy}
                r={8}
                className={cluster.accent ? "fill-accent" : "fill-surface-hover stroke-border"}
                strokeWidth={cluster.accent ? 0 : 1}
              />

              {points.map((point, i) => (
                <circle
                  key={`node-${cluster.key}-${i}`}
                  cx={point.x}
                  cy={point.y}
                  r={4}
                  className={cluster.accent ? "fill-accent/80" : "fill-muted-foreground"}
                />
              ))}

              <text
                x={cluster.cx}
                y={cluster.cy - cluster.ry - 14}
                textAnchor="middle"
                className={
                  cluster.accent
                    ? "fill-accent font-mono text-[11px] font-medium"
                    : "fill-subtle-foreground font-mono text-[11px]"
                }
              >
                {cluster.label}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="mt-6 flex items-center gap-2 text-caption text-subtle-foreground">
        <Dot />
        EM FX book — highlighted for a concentration review
      </p>
    </div>
  );
}
