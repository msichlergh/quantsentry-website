import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Display, Eyebrow, Section } from "@/components/site/primitives";

export function DeepDive({
  eyebrow,
  title,
  body,
  bullets,
  diagram,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  diagram: ReactNode;
  reverse?: boolean;
}) {
  return (
    <Section>
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className={cn(reverse && "md:order-2")}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Display as="h2" size="md" className="mt-4 max-w-[34ch]">
            {title}
          </Display>
          <p className="mt-5 max-w-[52ch] text-body text-muted-foreground">{body}</p>

          {bullets ? (
            <ul className="mt-6 flex flex-col gap-3">
              {bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 text-body-sm text-muted-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className={cn(reverse && "md:order-1")}>{diagram}</div>
      </div>
    </Section>
  );
}
