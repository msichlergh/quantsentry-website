"use client";

import { useState } from "react";

import styles from "./CodexaFaqs.module.css";

const faqs = [
  {
    question: "What is Codexa?",
    answer:
      "Codexa is a developer-first automation platform for building workflows, background jobs, and event-driven pipelines with clean, readable code.",
  },
  {
    question: "Who is Codexa built for?",
    answer:
      "Codexa is designed for developers, technical teams, and startups who want to automate processes without complex infrastructure setup.",
  },
  {
    question: "Do I need prior ML or AI experience?",
    answer:
      "No. Codexa includes optional AI-powered insights, but core workflows run on simple Python functions and API calls.",
  },
  {
    question: "What types of workflows can I build?",
    answer:
      "Anything from scheduled batch jobs to file processing, webhook triggers, real-time data pipelines, or internal automation.",
  },
  {
    question: "Is Codexa cloud-hosted or self-hosted?",
    answer:
      "Codexa provides both options. You can use our managed cloud or deploy the runtime inside your own infrastructure.",
  },
  {
    question: "Does Codexa scale with my project?",
    answer:
      "Yes. Codexa automatically handles concurrency, retries, and workload scaling as your workloads grow.",
  },
  {
    question: "Does Codexa replace my existing dev tools?",
    answer:
      "No. Codexa complements your existing stack — it doesn’t replace your codebase, APIs, or infrastructure. You simply automate the parts that slow you down.",
  },
  {
    question: "Is Codexa suitable for both small and large teams?",
    answer:
      "Yes. Solo developers can automate daily tasks quickly, while larger teams benefit from shared workflows, permissions, and scalable execution.",
  },
] as const;

export function CodexaFaqs() {
  const [openItems, setOpenItems] = useState<ReadonlySet<number>>(new Set());

  function toggleItem(index: number) {
    setOpenItems((current) => {
      const next = new Set(current);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  }

  return (
    <section className={styles.section} id="faqs">
      <div className={styles.frame}>
        <div className={styles.left}>
          <header className={`${styles.intro} codexa-reveal`}>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" />
              FAQs
            </p>
            <h2>Got questions? We’ve got answers.</h2>
            <p>Here’s everything you need to know before getting started.</p>
          </header>

          <aside className={styles.support}>
            <h3>Still have questions?</h3>
            <p>Contact us and we’ll help you out.</p>
            <a
              className="codexa-button"
              href="/codexa/product/faqs"
            >
              <span className="codexa-button__track" aria-hidden="true">
                <span>View all FAQs</span>
                <span>View all FAQs</span>
              </span>
              <span className={styles.srOnly}>View all FAQs</span>
            </a>
          </aside>
        </div>

        <div className={styles.accordion}>
          {faqs.map((faq, index) => {
            const isOpen = openItems.has(index);
            const answerId = `codexa-faq-answer-${index}`;
            const buttonId = `codexa-faq-button-${index}`;

            return (
              <article className={styles.faqRow} data-open={isOpen} key={faq.question}>
                <h3>
                  <button
                    aria-controls={answerId}
                    aria-expanded={isOpen}
                    id={buttonId}
                    onClick={() => toggleItem(index)}
                    type="button"
                  >
                    <span>{faq.question}</span>
                    <span className={styles.plus} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  aria-hidden={!isOpen}
                  aria-labelledby={buttonId}
                  className={styles.answer}
                  id={answerId}
                  role="region"
                >
                  <p>{faq.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
