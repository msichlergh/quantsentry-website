import type { Metadata } from "next";
import { Container, Badge, Display, Eyebrow, Lead } from "@/components/site/primitives";
import { CTA } from "@/components/site/cta";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Changelog — QuantSentry",
  description: "What shipped across Atlas, Query and Sentinel, every week.",
};

type ChangeType = "New" | "Improved" | "Fixed";

type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  type: ChangeType;
  points: string[];
};

const entries: ChangelogEntry[] = [
  {
    version: "v2.14.0",
    date: "2026-08-11",
    title: "Query: conditional exposure scenarios",
    type: "New",
    points: [
      "Ask 'what happens to net delta if rates move 50bps' and get a traversal over a perturbed exposure graph, not just the live one.",
      "Perturbations respect the same factor and correlation structure used elsewhere in Atlas.",
      "Every scenario answer is clickable down to the position level, same as live queries.",
    ],
  },
  {
    version: "v2.13.2",
    date: "2026-08-04",
    title: "Reconciliation break ranking",
    type: "Improved",
    points: [
      "Breaks are now ranked by dollar impact and mapping confidence, not just absolute value.",
      "Timing-skew false positives reduced by cross-referencing OMS fill events before flagging a delta.",
    ],
  },
  {
    version: "v2.13.1",
    date: "2026-07-29",
    title: "Corporate action feed lag",
    type: "Fixed",
    points: [
      "Fixed a caching issue where a secondary cross-check feed could hold a pre-split share count for up to 24 hours after a corporate action.",
      "Added an independent corporate-action reconciliation pass that runs daily across all connected feeds.",
    ],
  },
  {
    version: "v2.13.0",
    date: "2026-07-21",
    title: "Sentinel: multi-timescale drift detection",
    type: "New",
    points: [
      "Drift is now compared across intraday, multi-day and multi-week windows simultaneously.",
      "Alerts require agreement across timescales before firing, cutting single-window noise alerts significantly.",
      "Factor exposure composition is tracked as a leading indicator alongside realized P&L.",
    ],
  },
  {
    version: "v2.12.3",
    date: "2026-07-14",
    title: "Atlas margin view",
    type: "Improved",
    points: [
      "Margin estimates now show the underlying stress scenario set per connected prime broker.",
      "Multi-PB desks can size against the most conservative connected broker's methodology directly in the UI.",
    ],
  },
  {
    version: "v2.12.2",
    date: "2026-07-07",
    title: "FX funding cutoff alerts",
    type: "New",
    points: [
      "Atlas now surfaces same-day FX funding shortfalls against each custodian's cutoff, ahead of settlement.",
      "Alert routing configurable per fund entity for cross-border books.",
    ],
  },
  {
    version: "v2.12.1",
    date: "2026-06-30",
    title: "Query response latency",
    type: "Improved",
    points: [
      "Median response time for graph traversals reduced by caching instrument resolution results per session.",
      "Ambiguous-question clarification prompts now render inline instead of as a follow-up round trip.",
    ],
  },
  {
    version: "v2.12.0",
    date: "2026-06-23",
    title: "Joint-feed consistency checks",
    type: "New",
    points: [
      "New check class verifies that any calculation touching more than one data source uses corporate-action-adjusted figures from the same point in time.",
      "Runs automatically on every connected book, every day, independent of standard position reconciliation.",
    ],
  },
  {
    version: "v2.11.4",
    date: "2026-06-16",
    title: "Sector rollup accuracy",
    type: "Fixed",
    points: [
      "Fixed an aggregate exposure calculation that could disagree with position-level data during a split-adjustment window.",
      "Added an automated regression test covering the exact incident pattern.",
    ],
  },
  {
    version: "v2.11.3",
    date: "2026-06-09",
    title: "Instrument resolution audit trail",
    type: "Improved",
    points: [
      "Every automated symbology mapping decision now carries a full audit trail, exportable for compliance review.",
      "Confidence scoring surfaced directly on each resolved instrument in the exposure map.",
    ],
  },
];

const typeBadgeTone: Record<ChangeType, "accent" | "neutral"> = {
  New: "accent",
  Improved: "neutral",
  Fixed: "neutral",
};

export default function ChangelogPage() {
  return (
    <>
      <Container className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Eyebrow>Changelog</Eyebrow>
        <Display as="h1" size="lg" className="mt-4">
          What shipped, every week
        </Display>
        <Lead className="mt-4">
          A running record of what changed across Atlas, Query and Sentinel —
          new capabilities, improvements to existing ones, and fixes.
        </Lead>
      </Container>

      <Container className="pb-20 md:pb-28">
        <ol className="relative flex flex-col gap-10">
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[5px] w-px bg-border"
          />
          {entries.map((entry, i) => (
            <li key={entry.version} className="relative pl-10">
              <span
                aria-hidden
                className={cn(
                  "absolute top-1.5 left-0 size-[11px] rounded-full ring-4 ring-background",
                  i === 0 ? "bg-accent" : "bg-faint-foreground",
                )}
              />
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone={typeBadgeTone[entry.type]}>{entry.type}</Badge>
                <span className="font-mono text-label tracking-[0.06em] text-subtle-foreground">
                  {entry.version}
                </span>
                <time
                  dateTime={entry.date}
                  className="text-caption text-faint-foreground"
                >
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
              </div>
              <h2 className="mt-3 text-heading-sm text-foreground">
                {entry.title}
              </h2>
              <ul className="mt-3 flex flex-col gap-2">
                {entry.points.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className="flex gap-3 text-body-sm text-muted-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1 shrink-0 rounded-full bg-subtle-foreground"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>

      <CTA
        eyebrow="Get started"
        title="See your whole book in one place"
        body="Connect a prime broker and an OMS. Atlas maps your exposure in under an hour — no data team required."
      />
    </>
  );
}
