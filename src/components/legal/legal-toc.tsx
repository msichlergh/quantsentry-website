"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TocSection = {
  id: string;
  title: string;
};

/**
 * Table of contents for long-form legal pages.
 *
 * Renders a native `<details>` summary on mobile and a sticky nav on desktop,
 * both built from the same link list so the page works identically with or
 * without JavaScript. Active-section highlighting is a progressive
 * enhancement on top of that: it starts pointed at the first section and
 * only updates once the IntersectionObserver has something to report.
 */
export function LegalToc({ sections }: { sections: TocSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    if (sections.length === 0) return;

    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-110px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  return (
    <>
      <details className="mb-10 rounded-xl border border-border bg-surface p-4 md:hidden">
        <summary className="cursor-pointer font-mono text-label uppercase tracking-[0.08em] text-subtle-foreground">
          On this page
        </summary>
        <TocList sections={sections} activeId={activeId} className="mt-4" />
      </details>

      <nav
        aria-label="Table of contents"
        className="sticky top-24 hidden self-start md:block"
      >
        <p className="font-mono text-label uppercase tracking-[0.08em] text-subtle-foreground">
          On this page
        </p>
        <TocList sections={sections} activeId={activeId} className="mt-4" />
      </nav>
    </>
  );
}

function TocList({
  sections,
  activeId,
  className,
}: {
  sections: TocSection[];
  activeId: string;
  className?: string;
}) {
  return (
    <ol className={cn("space-y-1 text-body-sm", className)}>
      {sections.map((section) => {
        const isActive = section.id === activeId;
        return (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "block border-l-2 border-transparent py-1 pl-3 transition-colors duration-150",
                isActive
                  ? "border-accent text-foreground"
                  : "text-subtle-foreground hover:border-border hover:text-foreground",
              )}
            >
              {section.title}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
