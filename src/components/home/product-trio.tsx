import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge, Display, Eyebrow, Lead, Section } from "@/components/site/primitives";

const visualOrderClass: Record<"left" | "right", string> = {
  left: "md:flex-row-reverse",
  right: "md:flex-row",
};

const atlasNodes = [
  { cx: 40, cy: 30 },
  { cx: 110, cy: 20 },
  { cx: 180, cy: 45 },
  { cx: 30, cy: 100 },
  { cx: 95, cy: 90, core: true },
  { cx: 165, cy: 110 },
  { cx: 60, cy: 160 },
  { cx: 140, cy: 165 },
];

const atlasEdges: [number, number][] = [
  [0, 4],
  [1, 4],
  [2, 4],
  [3, 4],
  [4, 5],
  [4, 6],
  [4, 7],
  [5, 7],
];

function AtlasVisual() {
  return (
    <svg viewBox="0 0 210 190" fill="none" aria-hidden className="h-auto w-full max-w-[340px]">
      {atlasEdges.map(([fromIndex, toIndex]) => {
        const from = atlasNodes[fromIndex];
        const to = atlasNodes[toIndex];
        return (
          <line
            key={`${fromIndex}-${toIndex}`}
            x1={from.cx}
            y1={from.cy}
            x2={to.cx}
            y2={to.cy}
            stroke="var(--color-border)"
            strokeWidth="1.5"
          />
        );
      })}
      {atlasNodes.map((node) => {
        if (node.core) {
          return (
            <circle
              key={`node-${node.cx}-${node.cy}`}
              cx={node.cx}
              cy={node.cy}
              r="8"
              className="fill-accent"
            />
          );
        }
        return (
          <circle
            key={`node-${node.cx}-${node.cy}`}
            cx={node.cx}
            cy={node.cy}
            r="5"
            className="fill-surface-hover stroke-faint-foreground"
            strokeWidth="1.5"
          />
        );
      })}
    </svg>
  );
}

function QueryVisual() {
  return (
    <div className="w-full max-w-[380px] rounded-xl border border-border bg-surface-raised p-4">
      <div className="flex justify-end">
        <p className="max-w-[80%] rounded-lg rounded-tr-sm bg-surface-hover px-3 py-2 text-body-sm text-foreground">
          What&apos;s our net delta to EUR/USD across all books?
        </p>
      </div>
      <div className="mt-3 rounded-lg rounded-tl-sm border border-border bg-surface px-3 py-3">
        <p className="text-body-sm text-foreground">
          Net short <span className="font-mono text-accent">$4.2M</span> delta-equivalent, across 3 books.
        </p>
        <div className="mt-3 space-y-1.5 border-t border-border pt-3">
          <p className="font-mono text-caption text-subtle-foreground">SOURCED FROM</p>
          <p className="font-mono text-caption text-muted-foreground">macro-vol · book 14 · position #8842</p>
          <p className="font-mono text-caption text-muted-foreground">rates-arb · book 03 · position #2217</p>
        </div>
      </div>
    </div>
  );
}

const sparklinePoints = "0,58 30,52 60,55 90,40 120,44 150,30 180,34 210,20 240,26 270,14";

function SentinelVisual() {
  return (
    <div className="w-full max-w-[380px] rounded-xl border border-border bg-surface-raised p-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-caption text-subtle-foreground">MACRO-VOL · REALIZED VS EXPECTED</p>
        <Badge tone="accent">Drift flagged</Badge>
      </div>
      <svg viewBox="0 0 270 70" fill="none" aria-hidden className="mt-4 h-auto w-full">
        <polyline
          points={sparklinePoints}
          fill="none"
          stroke="var(--color-faint-foreground)"
          strokeWidth="1.5"
        />
        <line x1="228" y1="6" x2="228" y2="64" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="228" cy="23" r="4" className="fill-accent" />
      </svg>
      <p className="mt-2 font-mono text-caption text-muted-foreground">
        14:32 UTC — realized vol diverged 2.4σ from trailing baseline
      </p>
    </div>
  );
}

type Product = {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  visual: "left" | "right";
  Visual: () => ReactNode;
};

const products: Product[] = [
  {
    eyebrow: "Atlas",
    title: "One map for every book, venue and account",
    body: "Atlas ingests position and cash data from your prime brokers, OMS and custodians and reconciles it into a single exposure ledger — 12,000 positions reconciled nightly across 14 venues, typically inside four minutes.",
    href: "/features/atlas",
    cta: "Explore Atlas",
    visual: "right",
    Visual: AtlasVisual,
  },
  {
    eyebrow: "Query",
    title: "Ask a risk question, get a sourced answer",
    body: "Query parses plain-language questions against live exposure data and cites the exact positions behind every number — no waiting on a risk analyst to run a report.",
    href: "/features/query",
    cta: "Explore Query",
    visual: "left",
    Visual: QueryVisual,
  },
  {
    eyebrow: "Sentinel",
    title: "Catch drift while it's still small",
    body: "Sentinel compares every live strategy against its own trailing baseline, minute by minute, and raises an alert the moment realized risk diverges from expected — before it shows up in the P&L report.",
    href: "/features/sentinel",
    cta: "Explore Sentinel",
    visual: "right",
    Visual: SentinelVisual,
  },
];

export function ProductTrio() {
  return (
    <Section>
      <div className="flex flex-col gap-16 md:gap-24">
        {products.map((product) => (
          <div
            key={product.eyebrow}
            className={cn("flex flex-col gap-10 md:items-center md:gap-16", visualOrderClass[product.visual])}
          >
            <div className="md:w-1/2">
              <Eyebrow>{product.eyebrow}</Eyebrow>
              <Display as="h3" size="md" className="mt-4">
                {product.title}
              </Display>
              <Lead className="mt-4">{product.body}</Lead>
              <Link
                href={product.href}
                className="mt-6 inline-flex items-center gap-1.5 rounded-md text-body-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {product.cta}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
            <div className="flex justify-center md:w-1/2">
              <product.Visual />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
