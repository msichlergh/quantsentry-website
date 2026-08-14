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

function WorkflowVisual() {
  const statuses = [
    ["Workflow sync", "Active"],
    ["Automation enabled", "Active"],
    ["Error handling", "Inactive"],
    ["API integration", "Inactive"],
    ["Rate limits", "Inactive"],
  ] as const;

  return (
    <div className={`${styles.visualPanel} ${styles.workflowVisual}`}>
      <div className={styles.statusList}>
        {statuses.map(([label, status]) => (
          <div className={styles.statusRow} key={label}>
            <span>{label}</span>
            <span className={styles.statusValue}>
              <span
                className={`${styles.statusDot} ${
                  status === "Active" ? styles.active : ""
                }`}
                aria-hidden="true"
              />
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cursor() {
  return (
    <svg className={styles.cursor} viewBox="0 0 20 24" aria-hidden="true">
      <path d="M2.2 1.8 17.6 12l-7.2 1.2-3.3 7.2L2.2 1.8Z" />
    </svg>
  );
}

function ReleaseVisual() {
  return (
    <div className={`${styles.visualPanel} ${styles.releaseVisual}`}>
      <div className={styles.releaseBoard}>
        <div className={styles.releaseLabels}>
          <span>PLANNED</span>
          <span>TESTING</span>
          <span>RELEASED</span>
        </div>
        <div className={styles.releaseGuides} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={`${styles.releaseCard} ${styles.releaseBento}`}>
          Release Bento
        </div>
        <div className={`${styles.releaseCard} ${styles.performance}`}>
          Performance metrics
          <Cursor />
        </div>
        <div className={`${styles.releaseCard} ${styles.retries}`}>
          Execution retries
        </div>
        <div className={`${styles.releaseCard} ${styles.dashboard}`}>
          Core Dashboard v3
        </div>
      </div>
    </div>
  );
}

function ThroughputVisual() {
  const stages = ["Ingest", "Process", "Execute", "Recover"] as const;

  return (
    <div className={`${styles.visualPanel} ${styles.throughputVisual}`}>
      <div className={styles.throughputCard}>
        <div className={styles.metricLine}>
          <span className={styles.metricDot} aria-hidden="true" />
          <strong>248</strong>
          <span className={styles.change}>+14%</span>
        </div>
        <span className={styles.metricLabel}>System throughput</span>
        <div className={styles.bars}>
          {stages.map((stage) => (
            <div className={styles.bar} key={stage}>
              <span className={styles.barDot} aria-hidden="true" />
              <span className={styles.barFill} aria-hidden="true" />
              <span className={styles.barLabel}>{stage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CodexaFeatures() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.inner}>
        <header className={`${styles.intro} codexa-reveal`}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            Features
          </p>
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
