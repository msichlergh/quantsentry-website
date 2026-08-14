"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { Display, Eyebrow, Section } from "@/components/site/primitives";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "What data sources does QuantSentry connect to?",
    answer:
      "Atlas ingests directly from prime brokers (Goldman, Morgan Stanley, Interactive Brokers and others), OMS platforms, custodians and most major market data vendors. New integrations typically ship in two to three weeks.",
  },
  {
    question: "How is this different from our OMS's built-in risk module?",
    answer:
      "Your OMS sees one book. Atlas sees all of them — across every prime broker and account — reconciled into a single exposure ledger, so cross-book concentration and correlated drawdowns are visible before they compound.",
  },
  {
    question: "Can Query answer questions about historical positions, not just live ones?",
    answer:
      "Yes. Query runs against both the live exposure ledger and the historical position archive, so you can ask about today's delta or last quarter's drawdown in the same interface.",
  },
  {
    question: "How fast does Sentinel detect anomalies?",
    answer:
      "Sentinel re-evaluates every live strategy against its baseline on a rolling basis, with most drift alerts firing within two minutes of the underlying position change.",
  },
  {
    question: "Is our position data ever used to train models or shared across clients?",
    answer:
      "No. Each desk's data sits in an isolated environment. Nothing is pooled, shared or used to train models across clients.",
  },
  {
    question: "What does onboarding look like?",
    answer:
      "Most desks connect their first prime broker and OMS feed within a day and see a populated exposure map inside a week. A dedicated integration engineer runs the process end to end.",
  },
];

function FaqRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const baseId = useId();
  const buttonId = `${baseId}-button`;
  const panelId = `${baseId}-panel`;

  return (
    <div className="border-b border-border">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="text-heading-sm font-heading text-foreground">
            {item.question}
          </span>
          <ChevronDown
            aria-hidden
            className="size-5 shrink-0 text-subtle-foreground transition-transform duration-200 group-aria-expanded:rotate-180"
          />
        </button>
      </h3>
      <div
        data-open={isOpen}
        className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none data-[open=true]:grid-rows-[1fr]"
      >
        <div className="overflow-hidden">
          <p
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className="max-w-[65ch] pb-5 text-body-sm text-muted-foreground"
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    faqItems[0]?.question ?? null,
  );

  return (
    <Section>
      <div className="max-w-[52ch]">
        <Eyebrow>FAQ</Eyebrow>
        <Display as="h2" size="md" className="mt-4">
          Questions desks ask before they connect a feed
        </Display>
      </div>

      <div className="mt-10 border-t border-border">
        {faqItems.map((item) => (
          <FaqRow
            key={item.question}
            item={item}
            isOpen={openQuestion === item.question}
            onToggle={() =>
              setOpenQuestion(
                openQuestion === item.question ? null : item.question,
              )
            }
          />
        ))}
      </div>
    </Section>
  );
}
