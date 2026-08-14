import { Section } from "@/components/site/primitives";

export function Testimonial() {
  return (
    <Section>
      <figure className="mx-auto max-w-[720px] text-center">
        <blockquote>
          <p className="font-heading text-heading-lg text-balance text-foreground md:text-display-md">
            &ldquo;QuantSentry cut our morning reconciliation from ninety
            minutes to four. That&apos;s ninety minutes our risk desk now
            spends on positions, not spreadsheets.&rdquo;
          </p>
        </blockquote>
        <figcaption className="mt-8 flex items-center justify-center gap-3">
          <span
            aria-hidden
            className="flex size-10 items-center justify-center rounded-full border border-border font-mono text-caption text-muted-foreground"
          >
            RH
          </span>
          <span className="text-left text-body-sm text-muted-foreground">
            <span className="block font-medium text-foreground">
              R. Halvorsen
            </span>
            Head of Risk, Meridian Capital
          </span>
        </figcaption>
      </figure>
    </Section>
  );
}
