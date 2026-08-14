import type { Metadata } from "next";
import { CTA } from "@/components/site/cta";
import { Button, Display, Dot, Eyebrow, Lead, Section } from "@/components/site/primitives";
import { IntegrationsExplorer } from "@/components/integrations/integrations-explorer";

export const metadata: Metadata = {
  title: "Integrations — QuantSentry",
  description:
    "Connect QuantSentry to prime brokers, OMS/EMS platforms, market data providers, warehouses and fund accounting systems — 47 connectors and counting.",
};

export default function IntegrationsPage() {
  return (
    <>
      <Section bordered={false} className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Eyebrow>Integrations</Eyebrow>
        <Display as="h1" size="lg" className="mt-4 max-w-[20ch]">
          Plugs into what your desk already runs
        </Display>
        <Lead className="mt-4">
          Atlas reads directly from your prime broker and OMS — no file drops, no manual
          uploads. New connectors ship most weeks.
        </Lead>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
          <Dot />
          <span className="text-body-sm text-muted-foreground">47 connectors and counting</span>
        </div>
      </Section>

      <Section>
        <IntegrationsExplorer />
      </Section>

      <Section>
        <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center md:px-16">
          <Display as="h2" size="md" className="mx-auto max-w-[24ch]">
            Don&apos;t see yours?
          </Display>
          <Lead className="mx-auto mt-4 text-center">
            Every connector runs on the same REST API and webhook layer we expose to
            customers. If your broker, OMS or warehouse isn&apos;t listed, we typically ship a
            new read-only connector in under two weeks.
          </Lead>
          <Button href="/contact-us" className="mt-6">
            Request a connector
          </Button>
        </div>
      </Section>

      <CTA
        eyebrow="Ready to connect"
        title="Get your first book mapped this week"
        body="Point Atlas at a prime broker and an OMS. Most desks are live within five business days."
      />
    </>
  );
}
