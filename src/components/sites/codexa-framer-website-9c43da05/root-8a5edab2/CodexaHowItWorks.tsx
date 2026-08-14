import styles from "./CodexaHowItWorks.module.css";

const statusRows = [
  ["Flow engine", "84% in progress"],
  ["Integration layer", "Synced recently"],
  ["Automation scheduler", "Next cycle in 1h"],
  ["Action queue", "120 items remaining"],
  ["System health", "No issues detected"],
] as const;

function IntegrationVisual() {
  return (
    <div className={`${styles.visual} ${styles.integrationVisual}`}>
      <div className={`${styles.orbit} ${styles.orbitOuter}`} />
      <div className={`${styles.orbit} ${styles.orbitMiddle}`} />
      <div className={`${styles.orbit} ${styles.orbitInner}`} />
      <div className={styles.toolRail} aria-hidden="true">
        <span className={styles.mutedTool}>Z</span>
        <span className={styles.tool}>✣</span>
        <span className={`${styles.tool} ${styles.primaryTool}`}>◉</span>
        <span className={styles.tool}>S</span>
        <span className={styles.mutedTool}>N</span>
      </div>
      <span className={styles.integrationLabel}>INTEGRATING…</span>
    </div>
  );
}

function StatusVisual() {
  return (
    <div className={`${styles.visual} ${styles.statusVisual}`}>
      <div className={styles.statusList}>
        {statusRows.map(([title, detail], index) => (
          <div className={styles.statusRow} key={title}>
            <div>
              <p>{title}</p>
              <span>{detail}</span>
            </div>
            <span
              className={`${styles.statusCheck} ${
                index === 1 ? styles.statusCheckActive : ""
              }`}
              aria-hidden="true"
            >
              ✓
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  return (
    <div className={`${styles.visual} ${styles.analyticsVisual}`}>
      <div className={styles.metric}>
        <span className={styles.metricDot} />
        <strong>128</strong>
        <span>Active Workflows</span>
      </div>
      <div className={styles.chart}>
        <svg
          aria-hidden="true"
          viewBox="0 0 352 190"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="codexa-chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8b8d8e" stopOpacity="0.2" />
              <stop offset="1" stopColor="#8b8d8e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className={styles.chartArea}
            d="M0 95 C34 93 47 127 75 112 C97 101 97 26 125 27 C150 27 153 51 183 48 C211 45 211 143 244 140 C277 137 279 76 310 79 C332 82 337 153 352 181 L352 190 L0 190 Z"
          />
          <path
            className={styles.chartLine}
            d="M0 95 C34 93 47 127 75 112 C97 101 97 26 125 27 C150 27 153 51 183 48 C211 45 211 143 244 140 C277 137 279 76 310 79 C332 82 337 153 352 181"
          />
        </svg>
        <span className={styles.chartPulse} />
        <span className={styles.chartReading}>128 runs/min</span>
      </div>
    </div>
  );
}

type StepCardProps = {
  step: string;
  title: string;
  description: string;
  visual: React.ReactNode;
};

function StepCard({ step, title, description, visual }: StepCardProps) {
  return (
    <article className={styles.card}>
      {visual}
      <div className={styles.caption}>
        <span className={styles.stepLabel}>{step}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export function CodexaHowItWorks() {
  return (
    <section className={styles.section} aria-labelledby="codexa-how-title">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p>HOW IT WORKS</p>
          <h2 id="codexa-how-title">
            From setup to automation in 3 simple steps
          </h2>
        </header>

        <div className={styles.grid}>
          <StepCard
            step="STEP 1"
            title="Connect your existing tools"
            description="We integrate with your stack instantly, without complex setup."
            visual={<IntegrationVisual />}
          />
          <StepCard
            step="STEP 2"
            title="Automate your daily workflows"
            description="Create streamlined processes that remove repetitive tasks."
            visual={<StatusVisual />}
          />
          <StepCard
            step="STEP 3"
            title="Track everything in real time"
            description="Monitor performance, spot bottlenecks early, and optimize operations."
            visual={<AnalyticsVisual />}
          />
        </div>
      </div>
    </section>
  );
}
