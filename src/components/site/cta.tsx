import { Button, Display, Eyebrow, Lead, Section } from "./primitives";

export function CTA({
  eyebrow = "Get started",
  title = "See your whole book in one place",
  body = "Connect a prime broker and an OMS. Atlas maps your exposure in under an hour — no data team required.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-16 text-center md:px-16 md:py-20">
        {/* Faint accent bloom behind the copy */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]"
        />
        <div className="relative flex flex-col items-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Display as="h2" size="md" className="mt-4">
            {title}
          </Display>
          <Lead className="mt-4 text-center">{body}</Lead>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact-us">Book a walkthrough</Button>
            <Button href="/integrations" variant="secondary">
              Browse integrations
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
