import {
  codexaReleaseColumns,
  codexaThroughputMetric,
  codexaThroughputStages,
  codexaWorkflowRows,
} from "../shared/codexaVisualData";

// `visualPanel` is the row-level frame the feature section lays out
// (`.reverse .visualPanel`), so it stays in the section's own stylesheet.
import section from "./CodexaFeatures.module.css";
import styles from "./CodexaFeatureVisuals.module.css";

const statusLabel = (active: boolean) => (active ? "Active" : "Inactive");

export function WorkflowVisual() {
  return (
    <div className={`${section.visualPanel} ${styles.workflowVisual}`}>
      <div className={styles.statusList}>
        {codexaWorkflowRows.map(({ label, active, hover }) => (
          <div className={styles.statusRow} key={label}>
            <span>{label}</span>
            <span className={`${styles.statusValue} ${styles.defaultStatus}`}>
              <span className={`${styles.statusDot} ${active ? styles.active : ""}`} aria-hidden="true" />
              {statusLabel(active)}
            </span>
            <span className={`${styles.statusValue} ${styles.hoverStatus}`}>
              <span className={`${styles.statusDot} ${hover ? styles.active : ""}`} aria-hidden="true" />
              {statusLabel(hover)}
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
    <div className={`${section.visualPanel} ${styles.releaseVisual}`}>
      <div className={styles.releaseBoard}>
        <div className={styles.releaseLabels}>
          {codexaReleaseColumns.map((column) => (
            <span key={column}>{column}</span>
          ))}
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
  const { label, value, hoverValue, change, hoverChange } = codexaThroughputMetric;

  return (
    <div className={`${section.visualPanel} ${styles.throughputVisual}`}>
      <div className={styles.throughputCard}>
        <div className={styles.metricLine}>
          <span className={styles.metricDot} aria-hidden="true" />
          <span className={styles.metricValue}><strong>{value}</strong><strong>{hoverValue}</strong></span>
          <span className={styles.change}><span>{change}</span><span>{hoverChange}</span></span>
        </div>
        <span className={styles.metricLabel}>{label}</span>
        <div className={styles.bars}>
          {codexaThroughputStages.map((stage) => (
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
