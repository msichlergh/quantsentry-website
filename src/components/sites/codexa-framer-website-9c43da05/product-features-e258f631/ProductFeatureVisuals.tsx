import styles from "./ProductFeaturesPage.module.css";

const workflowStates = [
  ["Workflow sync", true],
  ["Automation enabled", true],
  ["Error handling", false],
  ["API integration", false],
  ["Rate limits", false],
] as const;

export function WorkflowVisual() {
  return (
    <div className={styles.workflowVisual} aria-label="Workflow status dashboard illustration">
      {workflowStates.map(([label, active]) => (
        <div className={styles.workflowRow} key={label}>
          <span>{label}</span>
          <span className={active ? styles.active : styles.inactive}>
            <i aria-hidden="true" />
            {active ? "Active" : "Inactive"}
          </span>
        </div>
      ))}
    </div>
  );
}

export function MonitoringVisual() {
  return (
    <div className={styles.monitoringVisual} aria-label="Workflow release monitoring illustration">
      <div className={styles.releaseLabels}>
        <span>PLANNED</span><span>TESTING</span><span>RELEASED</span>
      </div>
      <div className={styles.releaseFlow}>
        <span className={styles.releaseNode} />
        <span className={styles.releaseNode} />
        <span className={styles.releaseNode} />
      </div>
      <div className={styles.releaseCards}>
        <span>Performance metrics</span>
        <span>Release Bento</span>
        <span>Execution retries</span>
        <span>Core Dashboard v3</span>
      </div>
    </div>
  );
}

export function ThroughputVisual() {
  return (
    <div className={styles.throughputVisual} aria-label="System throughput illustration">
      <div className={styles.throughputValue}><i aria-hidden="true" />248 <span>+14%</span></div>
      <p>System throughput</p>
      <div className={styles.bars}>
        {["Ingest", "Process", "Execute", "Recover"].map((label, index) => (
          <div className={styles.bar} data-index={index} key={label}>
            <i aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
