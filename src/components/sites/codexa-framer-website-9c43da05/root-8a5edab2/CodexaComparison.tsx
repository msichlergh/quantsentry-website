import { Check, X } from "lucide-react";

import { CodexaEyebrow } from "../shared/CodexaEyebrow";
import styles from "./CodexaComparison.module.css";

const otherTools = [
  "Slow onboarding, manual configuration",
  "Separate tools for automation, logs, monitoring",
  "Limited or no automation support",
  "Blind spots, delayed detection",
  "Extra cost, complex setup",
] as const;

const codexaAdvantages = [
  "Ready-to-use APIs with instant setup",
  "Everything unified in one platform",
  "Event-driven workflows built in",
  "Real-time insights and AI-assisted diagnostics",
  "Security and scaling integrated by default",
] as const;

function CodexaLogo() {
  return (
    <span className={styles.logo} aria-label="Codexa">
      <svg aria-hidden="true" viewBox="0 0 28 28">
        <circle cx="14" cy="14" r="12" fill="currentColor" />
        <path
          d="M4.3 15.8h8.1l-5.1 5.4c2 1.9 4.4 2.8 7.2 2.8 5.3 0 9.6-3.8 10.5-8.8h-8l5-5.3a10.4 10.4 0 0 0-7.5-3.1c-5.2 0-9.5 3.9-10.2 9Z"
          fill="#060708"
        />
      </svg>
      <span>Codexa</span>
    </span>
  );
}

type ComparisonColumnProps = {
  title: React.ReactNode;
  items: readonly string[];
  positive?: boolean;
};

function ComparisonColumn({
  title,
  items,
  positive = false,
}: ComparisonColumnProps) {
  return (
    <div className={`${styles.column} ${positive ? styles.codexaColumn : ""}`}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <span
              className={`${styles.marker} ${positive ? styles.check : styles.x}`}
              aria-hidden="true"
            >
              {positive ? <Check /> : <X />}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CodexaComparison() {
  return (
    <section className={styles.section} aria-labelledby="codexa-comparison-title">
      <div className={styles.inner}>
        <header className={`${styles.intro} codexa-reveal`}>
          <CodexaEyebrow>WHY TEAMS CHOOSE US</CodexaEyebrow>
          <h2 id="codexa-comparison-title">
            Your all-in-one platform for workflows
          </h2>
        </header>

        <div className={`${styles.panel} codexa-reveal codexa-reveal--delay-1`}>
          <ComparisonColumn title="Other Tools" items={otherTools} />
          <ComparisonColumn
            title={<CodexaLogo />}
            items={codexaAdvantages}
            positive
          />
        </div>
      </div>
    </section>
  );
}
