import Link from "next/link";
import { Card, Display, Eyebrow, Section } from "@/components/site/primitives";

export type ProductKey = "atlas" | "query" | "sentinel";

const PRODUCTS: Record<
  ProductKey,
  { label: string; href: string; tag: string; description: string }
> = {
  atlas: {
    label: "Atlas",
    href: "/features/atlas",
    tag: "Exposure graph",
    description:
      "One unified exposure map across every book, venue and account — reconciled and live.",
  },
  query: {
    label: "Query",
    href: "/features/query",
    tag: "Risk query layer",
    description:
      "Ask risk questions in plain language and get an answer with the positions cited.",
  },
  sentinel: {
    label: "Sentinel",
    href: "/features/sentinel",
    tag: "Drift detection",
    description:
      "Continuous drift and anomaly detection on live strategies, before the P&L moves.",
  },
};

export function CrossLinks({ current }: { current: ProductKey }) {
  const others = (Object.keys(PRODUCTS) as ProductKey[]).filter(
    (key) => key !== current,
  );

  return (
    <Section>
      <Eyebrow>Also part of QuantSentry</Eyebrow>
      <Display as="h2" size="md" className="mt-4 max-w-[36ch]">
        The rest of the platform
      </Display>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {others.map((key) => {
          const product = PRODUCTS[key];
          return (
            <Link key={key} href={product.href} className="group block">
              <Card className="h-full group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-accent">
                <span className="font-mono text-label uppercase tracking-[0.08em] text-subtle-foreground">
                  {product.tag}
                </span>
                <h3 className="mt-3 text-heading-lg text-foreground">
                  {product.label}
                </h3>
                <p className="mt-2 max-w-[42ch] text-body-sm text-muted-foreground">
                  {product.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-accent">
                  Explore {product.label}
                  <span aria-hidden>&rarr;</span>
                </span>
              </Card>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
