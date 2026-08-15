import styles from "./CodexaFeatures.module.css";

export function WorkflowVisual() {
  const statuses = [
    ["Workflow sync", "Active", "Active"],
    ["Automation enabled", "Active", "Active"],
    ["Error handling", "Inactive", "Inactive"],
    ["API integration", "Inactive", "Active"],
    ["Rate limits", "Inactive", "Active"],
  ] as const;

  return (
    <div className={`${styles.visualPanel} ${styles.workflowVisual}`}>
      <div className={styles.statusList}>
        {statuses.map(([label, status, hoverStatus]) => (
          <div className={styles.statusRow} key={label}>
            <span>{label}</span>
            <span className={`${styles.statusValue} ${styles.defaultStatus}`}>
              <span className={`${styles.statusDot} ${status === "Active" ? styles.active : ""}`} aria-hidden="true" />
              {status}
            </span>
            <span className={`${styles.statusValue} ${styles.hoverStatus}`}>
              <span className={`${styles.statusDot} ${hoverStatus === "Active" ? styles.active : ""}`} aria-hidden="true" />
              {hoverStatus}
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

export function ReleaseVisual() {
  return (
    <div className={`${styles.visualPanel} ${styles.releaseVisual}`}>
      <div className={styles.releaseBoard}>
        <div className={styles.releaseLabels}>
          <span>PLANNED</span><span>TESTING</span><span>RELEASED</span>
        </div>
        <div className={styles.releaseGuides} aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
        <div className={`${styles.releaseCard} ${styles.releaseBento}`}>Release Bento</div>
        <div className={`${styles.releaseCard} ${styles.performance}`}>Performance metrics<Cursor /></div>
        <div className={`${styles.releaseCard} ${styles.retries}`}>Execution retries</div>
        <div className={`${styles.releaseCard} ${styles.dashboard}`}>Core Dashboard v3</div>
      </div>
    </div>
  );
}

export function ThroughputVisual() {
  const stages = ["Ingest", "Process", "Execute", "Recover"] as const;

  return (
    <div className={`${styles.visualPanel} ${styles.throughputVisual}`}>
      <div className={styles.throughputCard}>
        <div className={styles.metricLine}>
          <span className={styles.metricDot} aria-hidden="true" />
          <span className={styles.metricValue}><strong>248</strong><strong>280</strong></span>
          <span className={styles.change}><span>+14%</span><span>+22%</span></span>
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
