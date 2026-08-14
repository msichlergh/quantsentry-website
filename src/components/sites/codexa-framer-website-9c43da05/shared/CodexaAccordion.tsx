"use client";

import { useState } from "react";

import styles from "./CodexaAccordion.module.css";

export type CodexaAccordionItem = {
  question: string;
  answer: string;
};

export function CodexaAccordion({
  items,
  idPrefix,
}: {
  items: readonly CodexaAccordionItem[];
  idPrefix: string;
}) {
  const [openItems, setOpenItems] = useState<ReadonlySet<number>>(new Set());

  function toggle(index: number) {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const open = openItems.has(index);
        const answerId = `${idPrefix}-answer-${index}`;
        return (
          <article className={styles.row} data-open={open} key={item.question}>
            <h3>
              <button
                aria-controls={answerId}
                aria-expanded={open}
                onClick={() => toggle(index)}
                type="button"
              >
                <span>{item.question}</span>
                <span className={styles.plus} aria-hidden="true" />
              </button>
            </h3>
            <div className={styles.answer} id={answerId}>
              <p>{item.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
