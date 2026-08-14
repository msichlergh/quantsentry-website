import type { ReactNode } from "react";
import { Card, Display, Eyebrow, Section } from "@/components/site/primitives";

export type Capability = {
  icon: ReactNode;
  title: string;
  body: string;
};

export function CapabilityGrid({
  eyebrow = "Capabilities",
  title,
  items,
}: {
  eyebrow?: string;
  title: string;
  items: [Capability, Capability, Capability, Capability, Capability, Capability];
}) {
  return (
    <Section>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Display as="h2" size="md" className="mt-4 max-w-[36ch]">
        {title}
      </Display>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title}>
            <span className="inline-flex size-9 items-center justify-center rounded-lg bg-surface-hover text-accent">
              {item.icon}
            </span>
            <h3 className="mt-4 text-heading-sm text-foreground">{item.title}</h3>
            <p className="mt-2 text-body-sm text-muted-foreground">{item.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
