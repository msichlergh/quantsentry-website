import {
  codexaReleaseColumns,
  codexaThroughputMetric,
  codexaThroughputStages,
  codexaWorkflowRows,
} from "../shared/codexaVisualData";

import styles from "./ProductFeatureVisuals.module.css";

export function WorkflowVisual() {
  return (
    <div className={styles.workflowVisual} aria-label="Workflow status dashboard illustration">
      {codexaWorkflowRows.map(({ label, active }) => (
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
        {codexaReleaseColumns.map((column) => (
          <span key={column}>{column}</span>
        ))}
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
  const { label, value, change } = codexaThroughputMetric;

  return (
    <div className={styles.throughputVisual} aria-label="System throughput illustration">
      <div className={styles.throughputValue}><i aria-hidden="true" />{value} <span>{change}</span></div>
      <p>{label}</p>
      <div className={styles.bars}>
        {codexaThroughputStages.map((stage, index) => (
          <div className={styles.bar} data-index={index} key={stage}>
            <i aria-hidden="true" />
            <span>{stage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
