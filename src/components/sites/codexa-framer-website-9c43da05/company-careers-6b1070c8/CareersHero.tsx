import { CareersEyebrow } from "./CareersUi";
import styles from "./CareersHero.module.css";

export function CareersHero() {
  return (
    <section className={styles.hero} aria-labelledby="careers-title">
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.copy}>
        <CareersEyebrow>Careers</CareersEyebrow>
        <h1 id="careers-title">Careers at Codexa</h1>
        <p>
          At Codexa, we’re building tools that empower businesses to work
          smarter, stay organized, and grow faster.
        </p>
      </div>
    </section>
  );
}
