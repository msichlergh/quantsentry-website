import { CodexaEyebrow } from "../shared/CodexaEyebrow";

import {
  ReleaseVisual,
  ThroughputVisual,
  WorkflowVisual,
} from "./CodexaFeatureVisuals";
import styles from "./CodexaFeatures.module.css";

const features = [
  {
    title: "Build automation with clean code",
    description:
      "Define workflows, manage execution, and control system behavior using readable functions.",
    bullets: [
      "Define automation using simple, explicit logic",
      "Process data reliably across different execution states",
      "Scale workflows without breaking existing behavior",
    ],
  },
  {
    title: "Track system metrics instantly",
    description:
      "Observe how your workflows perform in production with clear metrics, live signals.",
    bullets: [
      "Monitor execution rates and queue performance",
      "Detect errors and retries as they happen",
      "Make informed decisions using live operational data",
    ],
  },
  {
    title: "Automate and stabilize your pipelines",
    description:
      "Turn real-time system signals into reliable automation. Define clear execution logic, handle failures.",
    bullets: [
      "Run custom logic with simple Python decorators",
      "Process batches and handle data programmatically",
      "Scale workflows as your project grows",
    ],
  },
] as const;

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.checkList}>
      {items.map((item) => (
        <li key={item}>
          <span className={styles.check} aria-hidden="true">
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FeatureCopy({ feature }: { feature: (typeof features)[number] }) {
  return (
    <div className={styles.copyPanel}>
      <div className={styles.copyInner}>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
        <CheckList items={feature.bullets} />
      </div>
    </div>
  );
}

export function CodexaFeatures() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.inner}>
        <header className={`${styles.intro} codexa-reveal`}>
          <CodexaEyebrow>Features</CodexaEyebrow>
          <h2>Build real products with powerful developer tooling</h2>
        </header>

        <div className={styles.rows}>
          <article className={`${styles.row} codexa-reveal`}>
            <WorkflowVisual />
            <FeatureCopy feature={features[0]} />
          </article>
          <article className={`${styles.row} ${styles.reverse} codexa-reveal`}>
            <FeatureCopy feature={features[1]} />
            <ReleaseVisual />
          </article>
          <article className={`${styles.row} codexa-reveal`}>
            <ThroughputVisual />
            <FeatureCopy feature={features[2]} />
          </article>
        </div>
      </div>
    </section>
  );
}
