import type { Metadata } from "next";
import { CTA } from "@/components/site/cta";
import { Display, Eyebrow, Lead, Section } from "@/components/site/primitives";
import { ComparisonTable } from "@/components/pricing/comparison-table";
import { FaqAccordion } from "@/components/pricing/faq-accordion";
import { PricingTiers } from "@/components/pricing/pricing-tiers";
import { includedInEveryPlan } from "@/components/pricing/pricing-data";

export const metadata: Metadata = {
  title: "Pricing — QuantSentry",
  description:
    "Desk, Platform and Enterprise pricing for QuantSentry's exposure mapping, plain-language risk queries and strategy drift detection.",
};

export default function PricingPage() {
  return (
    <>
      <Section bordered={false} className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Eyebrow>Pricing</Eyebrow>
        <Display as="h1" size="lg" className="mt-4 max-w-[16ch]">
          Priced on books, not seats
        </Display>
        <Lead className="mt-4">
          Every tier ships the full Atlas exposure map. Platform and Enterprise add Sentinel
          drift detection, unlimited Query and the connections a multi-book desk needs.
        </Lead>
      </Section>

      <Section bordered={false} className="pt-0">
        <PricingTiers />
      </Section>

      <Section>
        <Eyebrow>Compare plans</Eyebrow>
        <Display as="h2" size="md" className="mt-4 max-w-[24ch]">
          Every feature, side by side
        </Display>
        <div className="mt-8">
          <ComparisonTable />
        </div>
      </Section>

      <Section>
        <Eyebrow>Every plan includes</Eyebrow>
        <Display as="h2" size="md" className="mt-4 max-w-[24ch]">
          The baseline, not the upsell
        </Display>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {includedInEveryPlan.map((item) => (
            <div key={item.title}>
              <h3 className="text-heading-sm font-heading text-foreground">{item.title}</h3>
              <p className="mt-2 text-body-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>FAQ</Eyebrow>
        <Display as="h2" size="md" className="mt-4 max-w-[24ch]">
          Pricing questions, answered
        </Display>
        <div className="mt-8">
          <FaqAccordion />
        </div>
      </Section>

      <CTA
        eyebrow="Still deciding"
        title="Talk to someone who's mapped a book like yours"
        body="A solutions engineer will size the right tier for your desk in one call — no procurement dance required."
      />
    </>
  );
}
