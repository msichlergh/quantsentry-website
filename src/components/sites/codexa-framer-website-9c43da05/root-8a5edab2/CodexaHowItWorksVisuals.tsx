import Image from "next/image";

import styles from "./CodexaHowItWorks.module.css";

const assetRoot = "/sites/codexa-framer-website-9c43da05/root-8a5edab2/images";
const integrationLogos = Array.from({ length: 7 }, (_, index) => `${assetRoot}/trusted-logo-0${index + 1}.png`);
const statusRows = [
  ["Flow engine", "84% in progress"],
  ["Integration layer", "Synced recently"],
  ["Automation scheduler", "Next cycle in 1h"],
  ["Action queue", "120 items remaining"],
  ["System health", "No issues detected"],
] as const;

function CursorIcon({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 16.861 16.861">
      <path d="M2.134.234C1.947.166 1.756.098 1.595.056 1.443.016 1.148-.049.832.06.47.186.186.47.06.832c-.109.316-.044.611-.004.763.042.161.11.352.178.539l4.774 13.3c.084.233.164.457.243.63.067.146.22.465.551.645.362.197.799.203 1.166.015.336-.171.497-.486.567-.63.084-.171.171-.392.26-.624l2.149-5.526 5.526-2.149c.232-.089.453-.176.624-.259.144-.071.459-.232.63-.568.188-.367.182-.804-.015-1.166-.18-.331-.499-.484-.645-.551-.173-.079-.397-.159-.63-.243Z" fill="#0f0f11" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

export function IntegrationVisual() {
  return (
    <div className={`${styles.visual} ${styles.integrationVisual}`}>
      <div className={`${styles.orbit} ${styles.orbitOuter}`} />
      <div className={`${styles.orbit} ${styles.orbitMiddle}`} />
      <div className={`${styles.orbit} ${styles.orbitInner}`} />
      <div className={styles.toolRail} aria-hidden="true">
        {integrationLogos.map((src, index) => (
          <span className={`${index === 2 || index === 4 ? styles.tool : styles.mutedTool} ${index === 2 ? styles.previousPrimaryTool : ""} ${index === 3 ? styles.primaryTool : ""}`} key={src}>
            <Image src={src} alt="" width={96} height={96} />
          </span>
        ))}
      </div>
      <span className={styles.integrationLabel}>INTEGRATING…</span>
    </div>
  );
}

export function StatusVisual() {
  return (
    <div className={`${styles.visual} ${styles.statusVisual}`}>
      <div className={styles.statusList}>
        {statusRows.map(([title, detail], index) => (
          <div className={styles.statusRow} key={title}>
            <div><p>{title}</p><span>{detail}</span></div>
            <span className={`${styles.statusCheck} ${index === 1 ? styles.statusCheckActive : ""}`} aria-hidden="true">✓</span>
          </div>
        ))}
      </div>
      <CursorIcon className={styles.workflowCursor} />
    </div>
  );
}

export function AnalyticsVisual() {
  return (
    <div className={`${styles.visual} ${styles.analyticsVisual}`}>
      <div className={styles.metric}>
        <span className={styles.metricDot} /><strong>128</strong><span>Active Workflows</span>
      </div>
      <div className={styles.chart}>
        <svg aria-hidden="true" className={styles.chartGraphic} viewBox="0 0 352 190" preserveAspectRatio="none">
          <defs><linearGradient id="codexa-chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8b8d8e" stopOpacity="0.2" /><stop offset="1" stopColor="#8b8d8e" stopOpacity="0" /></linearGradient></defs>
          <path className={styles.chartArea} d="M0 95 C34 93 47 127 75 112 C97 101 97 26 125 27 C150 27 153 51 183 48 C211 45 211 143 244 140 C277 137 279 76 310 79 C332 82 337 153 352 181 L352 190 L0 190 Z" />
          <path className={styles.chartLine} d="M0 95 C34 93 47 127 75 112 C97 101 97 26 125 27 C150 27 153 51 183 48 C211 45 211 143 244 140 C277 137 279 76 310 79 C332 82 337 153 352 181" />
        </svg>
        <span className={styles.chartPulse} />
        <span className={styles.chartReading}>128 runs/min</span>
        <CursorIcon className={styles.analyticsCursor} />
      </div>
    </div>
  );
}
