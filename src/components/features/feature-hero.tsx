import type { ReactNode } from "react";
import { Button, Container, Display, Eyebrow, Lead } from "@/components/site/primitives";

type FeatureCta = {
  label: string;
  href: string;
};

export function FeatureHero({
  eyebrow,
  title,
  lead,
  primaryCta,
  secondaryCta,
  visual,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: FeatureCta;
  secondaryCta: FeatureCta;
  visual: ReactNode;
}) {
  return (
    <section className="pt-14 pb-16 md:pt-20 md:pb-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Display as="h1" size="lg" className="mt-4">
            {title}
          </Display>
          <Lead className="mt-5">{lead}</Lead>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            <Button href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </Button>
          </div>
        </div>

        <div>{visual}</div>
      </Container>
    </section>
  );
}
