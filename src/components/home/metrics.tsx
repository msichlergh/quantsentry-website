import { Section } from "@/components/site/primitives";

type Metric = {
  value: string;
  label: string;
};

const metrics: Metric[] = [
  { value: "12,000+", label: "positions reconciled nightly" },
  { value: "14", label: "venues normalized into one ledger" },
  { value: "<4 min", label: "average reconciliation time" },
  { value: "99.98%", label: "platform uptime, trailing 12mo" },
];

export function Metrics() {
  return (
    <Section>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex flex-col-reverse gap-2">
            <dt className="font-mono text-label tracking-[0.04em] text-subtle-foreground uppercase">
              {metric.label}
            </dt>
            <dd className="font-heading text-heading-lg text-foreground md:text-display-md">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
