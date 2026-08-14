import type { Metadata } from "next";
import { CTA } from "@/components/site/cta";
import { FeatureHero } from "@/components/features/feature-hero";
import { HowItWorks } from "@/components/features/how-it-works";
import { CapabilityGrid, type Capability } from "@/components/features/capability-grid";
import { DeepDive } from "@/components/features/deep-dive";
import { CrossLinks } from "@/components/features/cross-links";
import { QueryPanelVisual } from "@/components/features/visuals/query-panel-visual";
import { QueryTraceDiagram } from "@/components/features/visuals/query-trace-diagram";
import {
  BoltChartIcon,
  BookmarkIcon,
  LinkDocIcon,
  SendIcon,
  SigmaIcon,
  TerminalIcon,
} from "@/components/features/icons";

export const metadata: Metadata = {
  title: "Query — Risk Query Layer | QuantSentry",
  description:
    "Ask risk questions in plain language and get an answer with the underlying positions cited. Query is a deterministic query layer over the Atlas exposure graph.",
};

const capabilities: [Capability, Capability, Capability, Capability, Capability, Capability] = [
  {
    icon: <TerminalIcon />,
    title: "Plain-language input",
    body: "No query language to learn. Ask the way you'd ask your risk analyst.",
  },
  {
    icon: <LinkDocIcon />,
    title: "Source citations",
    body: "Every answer links back to the positions, venues and timestamps it was computed from.",
  },
  {
    icon: <BoltChartIcon />,
    title: "Scenario stress",
    body: "Run what-if scenarios — halve a book, shock a factor, widen a spread — without a model change request.",
  },
  {
    icon: <BookmarkIcon />,
    title: "Saved queries",
    body: "Turn a recurring question into a one-click check your whole desk can run.",
  },
  {
    icon: <SigmaIcon />,
    title: "Explainable math",
    body: "See the calculation path, not just the output — Query shows its work.",
  },
  {
    icon: <SendIcon />,
    title: "Slack & terminal delivery",
    body: "Push answers to Slack, a terminal alias, or the API — wherever your desk already looks.",
  },
];

export default function QueryPage() {
  return (
    <>
      <FeatureHero
        eyebrow="Query — risk query layer"
        title="Ask your book a question. Get an answer with receipts."
        lead="Query sits on top of the Atlas exposure graph. Ask what's my net EM FX exposure if the carry book halves and get a figure, a delta, and the exact positions behind it — not a chat transcript."
        primaryCta={{ label: "Book a walkthrough", href: "/contact-us" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
        visual={<QueryPanelVisual />}
      />

      <HowItWorks
        title="From plain English to a cited answer"
        steps={[
          {
            title: "Ask",
            body: "Type a question in plain English — position, scenario, exposure or limit check.",
          },
          {
            title: "Resolve",
            body: "Query parses it against the Atlas graph schema — books, instruments, factors — and runs the calculation live.",
          },
          {
            title: "Cite",
            body: "The answer returns with the exact positions, prices and timestamps used, ranked by contribution.",
          },
        ]}
      />

      <CapabilityGrid title="A query layer, not a chatbot" items={capabilities} />

      <DeepDive
        eyebrow="Not a chatbot"
        title="Deterministic computation over the exposure graph"
        body="Query doesn't generate an answer from a language model — it parses your question into a structured query, runs it against the live Atlas graph, and returns a computed result. The same question asked twice returns the same number, with the same positions cited, every time."
        bullets={[
          "Every figure is computed, never generated — no hallucinated numbers",
          "Answers are reproducible: re-run any query against its exact source snapshot",
          "Full calculation trace available for every response, not just the headline figure",
        ]}
        diagram={<QueryTraceDiagram />}
        reverse
      />

      <CrossLinks current="query" />

      <CTA
        eyebrow="Get started"
        title="Ask your first question in minutes"
        body="Query works the moment Atlas is connected. No new schema to learn, no model to fine-tune."
      />
    </>
  );
}
