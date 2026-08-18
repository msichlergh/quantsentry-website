import {
  ChartNoAxesCombined,
  RefreshCcw,
  ShieldCheck,
  SquareTerminal,
  type LucideIcon,
} from "lucide-react";

import { CodexaEyebrow } from "../shared/CodexaEyebrow";
import { CodexaAsciiBrain } from "./CodexaAsciiBrain";
import styles from "./CodexaBenefits.module.css";

type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const leftBenefits: readonly Benefit[] = [
  {
    title: "Clean, powerful APIs",
    description:
      "Integrate your systems instantly with well-documented, developer-first API endpoints.",
    icon: SquareTerminal,
  },
  {
    title: "AI-enhanced insights",
    description:
      "Analyze performance, detect issues, and optimize reliability with intelligent, real-time metrics.",
    icon: ChartNoAxesCombined,
  },
];

const rightBenefits: readonly Benefit[] = [
  {
    title: "Automation tools built in",
    description:
      "Create workflows, triggers, and background jobs without external services or extra infrastructure.",
    icon: RefreshCcw,
  },
  {
    title: "Enterprise-level control",
    description:
      "Manage roles, permissions, compliance, and security — all handled automatically at scale.",
    icon: ShieldCheck,
  },
];

function BenefitCard({ benefit }: { benefit: Benefit }) {
  const Icon = benefit.icon;

  return (
    <article className={styles.card}>
      <Icon aria-hidden="true" className={styles.icon} strokeWidth={1.45} />
      <div>
        <h3>{benefit.title}</h3>
        <p>{benefit.description}</p>
      </div>
    </article>
  );
}

export function CodexaBenefits() {
  return (
    <section className={styles.section} aria-labelledby="codexa-benefits-title">
      <div className={styles.inner}>
        <header className={`${styles.intro} codexa-reveal`}>
          <CodexaEyebrow>THE SOLUTION</CodexaEyebrow>
          <h2 id="codexa-benefits-title">
            A unified platform built for scalable development
          </h2>
          <p className={styles.subtitle}>
            Codexa brings workflows, automation, API integration, and AI-driven
            insights into one cohesive system.
          </p>
        </header>

        <div className={`${styles.matrix} codexa-reveal codexa-reveal--delay-1`}>
          <div className={styles.column}>
            {leftBenefits.map((benefit) => (
              <BenefitCard key={benefit.title} benefit={benefit} />
            ))}
          </div>

          <div className={styles.brain} aria-hidden="true">
            <CodexaAsciiBrain />
          </div>

          <div className={styles.column}>
            {rightBenefits.map((benefit) => (
              <BenefitCard key={benefit.title} benefit={benefit} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
