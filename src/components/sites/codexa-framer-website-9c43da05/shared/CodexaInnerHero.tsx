import styles from "./CodexaInnerHero.module.css";

export function CodexaInnerHero({
  eyebrow,
  title,
  description,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  compact?: boolean;
}) {
  return (
    <section className={`${styles.hero} ${compact ? styles.compact : ""}`}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.copy}>
        <p className={styles.eyebrow}>
          <span aria-hidden="true" />
          {eyebrow}
        </p>
        <h1>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
}
