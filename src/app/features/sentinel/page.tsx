import type { Metadata } from "next";
import { CTA } from "@/components/site/cta";
import { FeatureHero } from "@/components/features/feature-hero";
import { HowItWorks } from "@/components/features/how-it-works";
import { CapabilityGrid, type Capability } from "@/components/features/capability-grid";
import { DeepDive } from "@/components/features/deep-dive";
import { CrossLinks } from "@/components/features/cross-links";
import { SentinelSparklineVisual } from "@/components/features/visuals/sentinel-sparkline-visual";
import { SentinelEnvelopeDiagram } from "@/components/features/visuals/sentinel-envelope-diagram";
import {
  BandsIcon,
  BellEarlyIcon,
  RouteIcon,
  ScoreIcon,
  SlidersIcon,
  TargetIcon,
} from "@/components/features/icons";

export const metadata: Metadata = {
  title: "Sentinel — Strategy Drift Detection | QuantSentry",
  description:
    "Sentinel continuously compares realised strategy behaviour against its backtest envelope and flags divergence before it shows up in P&L.",
};

const capabilities: [Capability, Capability, Capability, Capability, Capability, Capability] = [
  {
    icon: <BandsIcon />,
    title: "Multi-metric envelopes",
    body: "Track drift across return, volatility, turnover and factor loadings — not just P&L.",
  },
  {
    icon: <SlidersIcon />,
    title: "Configurable sensitivity",
    body: "Set band width per strategy so a systematic vol desk isn't held to a discretionary macro book's tolerance.",
  },
  {
    icon: <TargetIcon />,
    title: "Root-cause attribution",
    body: "See which factor or position is driving a divergence, not just that one exists.",
  },
  {
    icon: <BellEarlyIcon />,
    title: "Early warning, not autopsy",
    body: "Flags typically fire days before drift shows up in realised P&L.",
  },
  {
    icon: <ScoreIcon />,
    title: "Strategy health scoring",
    body: "Every live strategy gets a rolling score so you can rank risk across the whole shop.",
  },
  {
    icon: <RouteIcon />,
    title: "Alert routing",
    body: "Route flags to the desk, PM or risk committee based on severity and strategy tier.",
  },
];

export default function SentinelPage() {
  return (
    <>
      <FeatureHero
        eyebrow="Sentinel — drift detection"
        title="Catch the drift before the P&L does."
        lead="Sentinel continuously compares realised strategy behaviour against its backtest envelope — volatility, turnover, factor loadings — and flags divergence the moment it starts, not after month-end."
        primaryCta={{ label: "Book a walkthrough", href: "/contact-us" }}
        secondaryCta={{ label: "See integrations", href: "/integrations" }}
        visual={<SentinelSparklineVisual />}
      />

      <HowItWorks
        title="Continuous comparison, not a monthly review"
        steps={[
          {
            title: "Baseline",
            body: "Sentinel ingests each strategy's backtest and builds an envelope across return, volatility, turnover and factor exposure.",
          },
          {
            title: "Monitor",
            body: "Live P&L and position data is compared against the envelope on every close, tick or custom interval.",
          },
          {
            title: "Flag",
            body: "The moment realised behaviour steps outside its band, Sentinel raises an alert with the exact metric and magnitude of drift.",
          },
        ]}
      />

      <CapabilityGrid title="Drift detection built for live books" items={capabilities} />

      <DeepDive
        eyebrow="How the envelope is built"
        title="A statistically honest band, not a fixed threshold"
        body="Each strategy's envelope is rebuilt from thousands of bootstrap resamples of its backtest, not a single historical path. That gives Sentinel a ±1σ and ±2σ band that reflects the strategy's actual variance — so alerts fire on genuine behavioural drift, not routine noise."
        bullets={[
          "Envelope rebuilt nightly as new backtest and live data arrives",
          "±1σ band tuned per strategy tier; ±2σ breach escalates automatically",
          "Realised path re-scored against the envelope on every interval, not just at close",
        ]}
        diagram={<SentinelEnvelopeDiagram />}
      />

      <CrossLinks current="sentinel" />

      <CTA
        eyebrow="Get started"
        title="Put your live strategies on watch"
        body="Connect a strategy's backtest and live feed. Sentinel builds its first envelope the same day."
      />
    </>
  );
}
