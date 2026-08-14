import type { Metadata } from "next";
import { CTA } from "@/components/site/cta";
import { FeatureHero } from "@/components/features/feature-hero";
import { HowItWorks } from "@/components/features/how-it-works";
import { CapabilityGrid, type Capability } from "@/components/features/capability-grid";
import { DeepDive } from "@/components/features/deep-dive";
import { CrossLinks } from "@/components/features/cross-links";
import { AtlasGraphVisual } from "@/components/features/visuals/atlas-graph-visual";
import { AtlasPipelineDiagram } from "@/components/features/visuals/atlas-pipeline-diagram";
import {
  AlertDiamondIcon,
  GaugeIcon,
  HistoryIcon,
  LayersIcon,
  NetworkIcon,
  PulseIcon,
} from "@/components/features/icons";

export const metadata: Metadata = {
  title: "Atlas — Unified Exposure Graph | QuantSentry",
  description:
    "Atlas reconciles positions from prime brokers, OMS and custodians into a single live exposure graph — one map of every book, venue and account.",
};

const capabilities: [Capability, Capability, Capability, Capability, Capability, Capability] = [
  {
    icon: <NetworkIcon />,
    title: "Cross-custodian netting",
    body: "See net exposure per issuer across every custodian instantly — not from an end-of-day file drop.",
  },
  {
    icon: <AlertDiamondIcon />,
    title: "Break detection",
    body: "Flags position and cash breaks the moment a reconciled feed disagrees with your OMS blotter.",
  },
  {
    icon: <PulseIcon />,
    title: "Live graph, not a snapshot",
    body: "Every fill updates the graph within seconds. No overnight batch, no stale spreadsheet.",
  },
  {
    icon: <LayersIcon />,
    title: "Custom clustering",
    body: "Group nodes by book, strategy, counterparty or any tag your desk already uses.",
  },
  {
    icon: <GaugeIcon />,
    title: "Concentration alerts",
    body: "Set thresholds per issuer, sector or counterparty and get flagged before a position becomes a headline.",
  },
  {
    icon: <HistoryIcon />,
    title: "Audit trail",
    body: "Every reconciliation and override is timestamped and attributable, ready for your next audit.",
  },
];

export default function AtlasPage() {
  return (
    <>
      <FeatureHero
        eyebrow="Atlas — exposure graph"
        title="One exposure map. Every book, venue and account."
        lead="Atlas reconciles positions from your prime brokers, OMS and custodians into a single live graph — so netting, breaks and concentration show up in seconds, not end-of-day."
        primaryCta={{ label: "Book a walkthrough", href: "/contact-us" }}
        secondaryCta={{ label: "See integrations", href: "/integrations" }}
        visual={<AtlasGraphVisual />}
      />

      <HowItWorks
        title="From scattered feeds to one reconciled graph"
        steps={[
          {
            title: "Connect",
            body: "Pull positions from prime brokers, OMS platforms and fund administrators via SFTP, API or FIX drop copy.",
          },
          {
            title: "Reconcile",
            body: "Atlas matches every position across sources by CUSIP/ISIN, account and strategy tag, and flags breaks over your tolerance.",
          },
          {
            title: "Map",
            body: "Each reconciled position becomes a node in a live graph, clustered by book, venue, counterparty or custom tag.",
          },
        ]}
      />

      <CapabilityGrid title="Built for desks that stopped trusting spreadsheets" items={capabilities} />

      <DeepDive
        eyebrow="How reconciliation works"
        title="Matching logic your risk team can actually audit"
        body="Atlas matches each source record on instrument identifier, account and strategy tag, inside a configurable tolerance band. Anything that doesn't match within tolerance is surfaced as a break with both source records attached — never silently netted away."
        bullets={[
          "0.5bp default tolerance, adjustable per book or instrument class",
          "Breaks routed to the desk that owns the position, with source diff attached",
          "Every match and override is versioned for downstream audit",
        ]}
        diagram={<AtlasPipelineDiagram />}
      />

      <CrossLinks current="atlas" />

      <CTA
        eyebrow="Get started"
        title="See your whole book in one place"
        body="Connect a prime broker and an OMS. Atlas maps your exposure in under an hour — no data team required."
      />
    </>
  );
}
