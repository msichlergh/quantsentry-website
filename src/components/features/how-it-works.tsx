import { Display, Eyebrow, Section } from "@/components/site/primitives";

type Step = {
  title: string;
  body: string;
};

export function HowItWorks({
  eyebrow = "How it works",
  title,
  steps,
}: {
  eyebrow?: string;
  title: string;
  steps: [Step, Step, Step];
}) {
  return (
    <Section>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Display as="h2" size="md" className="mt-4 max-w-[36ch]">
        {title}
      </Display>

      <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
        {steps.map((step, index) => (
          <li key={step.title} className="border-t border-border pt-6">
            <span className="font-mono text-heading-lg text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-heading-sm text-foreground">{step.title}</h3>
            <p className="mt-2 text-body-sm text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
