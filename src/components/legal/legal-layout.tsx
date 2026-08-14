import type { ReactNode } from "react";
import { Card, Display, Eyebrow, Section } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { DraftNotice } from "./draft-notice";
import { LegalToc } from "./legal-toc";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalLayoutProps = {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  summary: ReactNode;
  sections: LegalSection[];
};

const proseClassName = cn(
  "mt-4 space-y-4 text-body text-muted-foreground",
  "[&_p]:leading-relaxed",
  "[&_h3]:mt-8 [&_h3]:scroll-mt-28 [&_h3]:font-heading [&_h3]:text-heading-md [&_h3]:text-foreground",
  "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
  "[&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
  "[&_li]:pl-1",
  "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4",
  "[&_a:hover]:text-foreground",
  "[&_strong]:font-medium [&_strong]:text-foreground",
  "[&_table]:mt-2 [&_table]:w-full [&_table]:border-collapse [&_table]:text-body-sm",
  "[&_th]:border [&_th]:border-border [&_th]:bg-surface [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-medium [&_th]:text-foreground",
  "[&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:align-top",
);

/**
 * Shared two-column layout for long-form legal prose: sticky TOC on the
 * left (collapsed into a details/summary on mobile), content column capped
 * at a comfortable reading measure on the right.
 */
export function LegalLayout({
  eyebrow,
  title,
  lastUpdated,
  summary,
  sections,
}: LegalLayoutProps) {
  const tocSections = sections.map(({ id, title }) => ({ id, title }));

  return (
    <>
      <Section bordered={false} className="pb-0 pt-16 md:pt-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display as="h1" size="lg" className="mt-4 max-w-[22ch]">
          {title}
        </Display>
        <p className="mt-4 font-mono text-label uppercase tracking-[0.08em] text-subtle-foreground">
          Last updated {lastUpdated}
        </p>
        <DraftNotice className="mt-8" />
      </Section>

      <Section className="pt-12 md:pt-16">
        <div className="grid gap-10 md:grid-cols-[220px_1fr] md:gap-16">
          <LegalToc sections={tocSections} />

          <div className="min-w-0 max-w-[68ch]">
            <Card className="mb-10 bg-surface-raised">
              <p className="text-body-sm text-muted-foreground">{summary}</p>
            </Card>

            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className={cn(
                  "scroll-mt-28",
                  index > 0 && "mt-12 border-t border-border pt-12",
                )}
              >
                <h2 className="font-heading text-heading-lg text-foreground">
                  {section.title}
                </h2>
                <div className={proseClassName}>{section.content}</div>
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
