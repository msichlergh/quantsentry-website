import type { ReactNode } from "react";

import styles from "./CodexaLegalPage.module.css";

export type CodexaLegalSection = {
  title: string;
  content: ReactNode;
};

type LegalPageVariant = "terms" | "privacy" | "cookies";

export function CodexaLegalPage({
  title,
  intro,
  sections,
  variant,
}: {
  title: string;
  intro: ReactNode;
  sections: CodexaLegalSection[];
  variant: LegalPageVariant;
}) {
  return (
    <article className={`${styles.page} ${styles[variant]}`}>
        <header className={styles.header}>
          <h1>{title}</h1>
          <p>Last Updated: October 2025</p>
        </header>

        <div className={styles.content}>
          <div className={styles.readingColumn}>
            <div className={styles.intro}>{intro}</div>
            <div className={styles.sections}>
              {sections.map((section) => (
                <section className={styles.section} key={section.title}>
                  <h2>{section.title}</h2>
                  <div className={styles.sectionContent}>{section.content}</div>
                </section>
              ))}
            </div>
          </div>
        </div>
    </article>
  );
}
