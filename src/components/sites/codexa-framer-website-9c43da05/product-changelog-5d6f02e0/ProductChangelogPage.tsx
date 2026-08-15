import { CodexaInnerHero } from "../shared/CodexaInnerHero";
import { codexaChangelogEntries } from "../shared/codexaChangelogData";

import styles from "./ProductChangelogPage.module.css";

function ChangeList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className={styles.changeList}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export function ProductChangelogPage() {
  return (
    <>
      <CodexaInnerHero
        eyebrow="Changelog"
        title="Product updates and improvements"
        description="Stay up to date with the latest enhancements across automation, performance, and developer workflows."
      />

      <section className={styles.changelog} aria-label="Product changelog">
        {codexaChangelogEntries.map((update) => (
          <article className={styles.update} key={update.version}>
            <header className={styles.metadata}>
              <p className={styles.version}>{update.version}</p>
              <h2>{update.title}</h2>
              <p className={styles.subtitle}>{update.subtitle}</p>
              <time dateTime={update.dateTime}>
                <span aria-hidden="true" />
                {update.date}
              </time>
            </header>

            <div className={styles.details}>
              <div className={styles.updateVisual}>
                <span>{update.month}</span>
              </div>
              <p className={styles.overview}>{update.overview}</p>
              <ChangeList title="Added" items={update.added} />
              <ChangeList title="Improved" items={update.improved} />
              <ChangeList title="Fixed" items={update.fixed} />
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
