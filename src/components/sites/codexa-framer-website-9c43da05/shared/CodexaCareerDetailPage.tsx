import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { CodexaCareerOpening } from "./codexaCareerData";
import styles from "./CodexaCareerDetailPage.module.css";

function renderWithEmphasis(
  text: string,
  emphasis: readonly string[],
) {
  if (emphasis.length === 0) {
    return text;
  }

  const escapedPhrases = emphasis
    .map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .sort((first, second) => second.length - first.length);
  const emphasizedPhrases = new Set(emphasis);
  const parts = text.split(new RegExp(`(${escapedPhrases.join("|")})`, "g"));

  return parts.map((part, index) =>
    emphasizedPhrases.has(part) ? (
      <strong key={`${part}-${index}`}>{part}</strong>
    ) : (
      part
    ),
  );
}

export function CodexaCareerDetailPage({
  opening,
}: {
  opening: CodexaCareerOpening;
}) {
  const sectionPasses = opening.repeatSections ? [0, 1] : [0];

  return (
    <main className={styles.page}>
      <header
        className={`${styles.hero} ${
          opening.compactDesktopHero ? styles.compactDesktopHero : ""
        } ${
          opening.tallMobileHero ? styles.tallMobileHero : ""
        }`}
      >
        <p className={styles.metadata}>
          <span>{opening.location}</span>
          <span aria-hidden="true">-</span>
          <span>{opening.schedule}</span>
        </p>
        <h1>{opening.title}</h1>
        <p className={styles.summary}>{opening.summary}</p>
      </header>

      <article className={styles.article}>
        <div className={styles.content}>
          {sectionPasses.map((pass) =>
            opening.sections.map((section, sectionIndex) => (
              <section
                className={`${styles.section} ${
                  pass > 0 && sectionIndex === 0
                    ? styles.repeatedOverview
                    : ""
                }`}
                key={`${pass}-${section.heading}-${sectionIndex}`}
              >
                {pass === 0 || sectionIndex > 0 ? (
                  <h2>{section.heading}</h2>
                ) : null}
                {section.paragraphs?.map((paragraph, paragraphIndex) => (
                  <p key={`${paragraphIndex}-${paragraph}`}>
                    {renderWithEmphasis(paragraph, opening.emphasis)}
                  </p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li key={`${bulletIndex}-${bullet}`}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            )),
          )}

          <Link className={styles.applyButton} href="/codexa/company/support">
            <span className={styles.buttonLabel}>
              <span>Apply now</span>
              <span aria-hidden="true">Apply now</span>
            </span>
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </article>
    </main>
  );
}
