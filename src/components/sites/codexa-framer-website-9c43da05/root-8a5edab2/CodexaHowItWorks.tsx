import type { ReactNode } from "react";

import { CodexaEyebrow } from "../shared/CodexaEyebrow";
import {
  AnalyticsVisual,
  IntegrationVisual,
  StatusVisual,
} from "./CodexaHowItWorksVisuals";
import styles from "./CodexaHowItWorks.module.css";

type StepCardProps = {
  step: string;
  title: string;
  description: string;
  visual: ReactNode;
};

function StepCard({ step, title, description, visual }: StepCardProps) {
  return (
    <article className={styles.card} data-codexa-auto-motion>
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
        <header className={`${styles.intro} codexa-reveal`}>
          <CodexaEyebrow>HOW IT WORKS</CodexaEyebrow>
          <h2 id="codexa-how-title">From setup to automation in 3 simple steps</h2>
        </header>
        <div className={`${styles.grid} codexa-reveal codexa-reveal--delay-1`}>
          <StepCard step="STEP 1" title="Connect your existing tools" description="We integrate with your stack instantly, without complex setup." visual={<IntegrationVisual />} />
          <StepCard step="STEP 2" title="Automate your daily workflows" description="Create streamlined processes that remove repetitive tasks." visual={<StatusVisual />} />
          <StepCard step="STEP 3" title="Track everything in real time" description="Monitor performance, spot bottlenecks early, and optimize operations." visual={<AnalyticsVisual />} />
        </div>
      </div>
    </section>
  );
}
