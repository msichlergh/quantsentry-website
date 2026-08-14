import { Display, Eyebrow, Section } from "@/components/site/primitives";

type Step = {
  number: string;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Fragmented feeds",
    body: "Positions live in six systems that don't talk. Reconciliation eats the morning before risk even opens.",
  },
  {
    number: "02",
    title: "Unified ingestion",
    body: "Atlas normalizes prime broker, OMS and custodian feeds nightly and intraday into one exposure ledger.",
  },
  {
    number: "03",
    title: "Continuous coverage",
    body: "Sentinel watches every book against its own baseline from open to close, and flags drift before P&L does.",
  },
];

export function ProblemSolution() {
  return (
    <Section>
      <div className="max-w-[52ch]">
        <Eyebrow>How it fits together</Eyebrow>
        <Display as="h2" size="md" className="mt-4">
          From six disconnected feeds to one exposure ledger
        </Display>
      </div>

      <ol className="mt-12 grid gap-10 border-t border-border pt-6 md:grid-cols-3 md:gap-8">
        {steps.map((step) => (
          <li key={step.number}>
            <span className="font-mono text-label tracking-[0.06em] text-subtle-foreground">
              {step.number}
            </span>
            <h3 className="mt-3 text-heading-sm font-heading text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-body-sm text-muted-foreground">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
