"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { pricingFaqs } from "./pricing-data";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function FaqAccordion() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <div className="divide-y divide-border rounded-xl border border-border">
      {pricingFaqs.map((faq) => {
        const id = slugify(faq.question);
        const panelId = `faq-panel-${id}`;
        const buttonId = `faq-button-${id}`;
        const isOpen = openQuestion === id;

        return (
          <div key={id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenQuestion(isOpen ? null : id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-body-sm font-medium text-foreground transition-colors duration-150 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
              >
                <span>{faq.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 text-subtle-foreground transition-transform duration-200 motion-reduce:transition-none",
                    isOpen && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
                isOpen && "grid-rows-[1fr]",
                !isOpen && "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-body-sm text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
