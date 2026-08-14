import { Button, Container, Display, Eyebrow, Lead } from "@/components/site/primitives";

type Node = {
  id: string;
  cx: number;
  cy: number;
  r?: number;
  label?: string;
  tone?: "feed" | "core" | "product";
};

/**
 * Three source clusters (prime brokers, OMS/EMS, market data) converge on a live
 * core, which fans out to the three products. Node positions are hand-placed rather
 * than generated so the composition stays balanced at every breakpoint.
 */
const nodes: Node[] = [
  // Prime broker cluster
  { id: "pb-1", cx: 46, cy: 40, r: 4, tone: "feed" },
  { id: "pb-2", cx: 22, cy: 66, r: 3, tone: "feed" },
  { id: "pb-3", cx: 58, cy: 78, r: 5, tone: "feed" },
  { id: "pb-hub", cx: 92, cy: 62, r: 7, tone: "feed", label: "Prime brokers" },
  // OMS cluster
  { id: "oms-1", cx: 20, cy: 168, r: 3, tone: "feed" },
  { id: "oms-2", cx: 50, cy: 150, r: 5, tone: "feed" },
  { id: "oms-3", cx: 44, cy: 194, r: 4, tone: "feed" },
  { id: "oms-hub", cx: 92, cy: 172, r: 7, tone: "feed", label: "OMS / EMS" },
  // Market data cluster
  { id: "md-1", cx: 30, cy: 268, r: 4, tone: "feed" },
  { id: "md-2", cx: 60, cy: 292, r: 3, tone: "feed" },
  { id: "md-3", cx: 26, cy: 312, r: 5, tone: "feed" },
  { id: "md-hub", cx: 92, cy: 286, r: 7, tone: "feed", label: "Market data" },
  // Live core
  { id: "core", cx: 232, cy: 174, r: 11, tone: "core" },
  // Products
  { id: "atlas", cx: 388, cy: 84, r: 7, tone: "product", label: "Atlas" },
  { id: "query", cx: 412, cy: 174, r: 7, tone: "product", label: "Query" },
  { id: "sentinel", cx: 388, cy: 264, r: 7, tone: "product", label: "Sentinel" },
];

const edges: [string, string][] = [
  ["pb-1", "pb-hub"],
  ["pb-2", "pb-hub"],
  ["pb-3", "pb-hub"],
  ["oms-1", "oms-hub"],
  ["oms-2", "oms-hub"],
  ["oms-3", "oms-hub"],
  ["md-1", "md-hub"],
  ["md-2", "md-hub"],
  ["md-3", "md-hub"],
  ["pb-hub", "core"],
  ["oms-hub", "core"],
  ["md-hub", "core"],
  ["core", "atlas"],
  ["core", "query"],
  ["core", "sentinel"],
];

/** Trunk edges (cluster hub → core → product) read brighter than leaf edges. */
const trunkEdges = new Set([
  "pb-hub-core",
  "oms-hub-core",
  "md-hub-core",
  "core-atlas",
  "core-query",
  "core-sentinel",
]);

const nodeById = new Map(nodes.map((node) => [node.id, node]));

function findNode(id: string): Node {
  const node = nodeById.get(id);
  if (!node) {
    throw new Error(`Unknown node id: ${id}`);
  }
  return node;
}

function ExposureGraph() {
  return (
    <svg
      viewBox="0 0 470 352"
      fill="none"
      aria-hidden
      className="h-auto w-full max-w-[470px]"
    >
      <defs>
        <radialGradient id="core-bloom">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Faint bloom behind the live core */}
      <circle cx="232" cy="174" r="120" fill="url(#core-bloom)" />

      {edges.map(([fromId, toId]) => {
        const from = findNode(fromId);
        const to = findNode(toId);
        const isTrunk = trunkEdges.has(`${fromId}-${toId}`);
        return (
          <line
            key={`${fromId}-${toId}`}
            x1={from.cx}
            y1={from.cy}
            x2={to.cx}
            y2={to.cy}
            stroke={
              isTrunk ? "var(--color-subtle-foreground)" : "var(--color-border)"
            }
            strokeWidth={isTrunk ? 1.25 : 1}
            strokeOpacity={isTrunk ? 0.7 : 1}
          />
        );
      })}

      {nodes.map((node) => {
        if (node.tone === "core") {
          return (
            <g key={node.id}>
              <circle
                cx={node.cx}
                cy={node.cy}
                r="30"
                className="origin-center fill-accent/10 [transform-box:fill-box] motion-safe:animate-[pulse-ring_2.6s_ease-out_infinite]"
              />
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                className="origin-center fill-accent [transform-box:fill-box] motion-safe:animate-[pulse-node_2.6s_ease-in-out_infinite]"
              />
            </g>
          );
        }

        const isProduct = node.tone === "product";
        return (
          <g key={node.id}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              className={
                isProduct
                  ? "fill-surface stroke-subtle-foreground"
                  : "fill-surface-hover stroke-faint-foreground"
              }
              strokeWidth="1.5"
            />
            {node.label && (
              <text
                x={isProduct ? node.cx + 14 : node.cx - 14}
                y={node.cy + 3.5}
                textAnchor={isProduct ? "start" : "end"}
                className="fill-faint-foreground font-mono text-[9px] tracking-[0.06em] uppercase"
              >
                {node.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function Hero() {
  return (
    <section className="pt-16 pb-16 md:pt-24 md:pb-24">
      <Container className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-center md:gap-10">
        <div>
          <Eyebrow>Risk infrastructure for systematic desks</Eyebrow>
          <Display as="h1" size="xl" className="mt-4">
            Every position, every venue, one exposure map.
          </Display>
          <Lead className="mt-6">
            QuantSentry unifies prime broker, OMS and market data feeds into a
            single risk surface — so your desk sees drift before it becomes a
            drawdown.
          </Lead>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact-us">Book a walkthrough</Button>
            <Button href="/features/atlas" variant="secondary">
              See how Atlas works
            </Button>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <ExposureGraph />
        </div>
      </Container>
    </section>
  );
}
