import {
  ChartNoAxesCombined,
  RefreshCcw,
  ShieldCheck,
  SquareTerminal,
  type LucideIcon,
} from "lucide-react";

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

const asciiCharacters = "@$%#&*+=:;?MWNXKZ";

function createAsciiBrain() {
  const rows: string[] = [];
  const width = 78;
  const height = 58;

  for (let row = 0; row < height; row += 1) {
    const progress = row / (height - 1);
    let halfWidth: number;

    if (progress < 0.14) {
      halfWidth = 0.36 + progress * 3.15;
    } else if (progress < 0.58) {
      halfWidth = 0.82 + Math.sin(progress * 14) * 0.035;
    } else if (progress < 0.82) {
      halfWidth = 0.84 - (progress - 0.58) * 0.92;
    } else {
      halfWidth = 0.62 - (progress - 0.82) * 1.78;
    }

    const y = progress * 2 - 1;
    let line = "";

    for (let column = 0; column < width; column += 1) {
      const x = (column / (width - 1)) * 2 - 1;
      const centerGap = 0.035 + Math.sin(row * 0.72) * 0.012;
      const edgeNoise =
        Math.sin(row * 1.9 + column * 0.17) * 0.018 +
        Math.cos(row * 0.63 - column * 0.41) * 0.012;
      const curvedEdge = halfWidth * Math.sqrt(Math.max(0, 1 - y * y * 0.28));
      const inside = Math.abs(x) < curvedEdge + edgeNoise;
      const divided = Math.abs(x) < centerGap;

      if (!inside || divided) {
        line += " ";
        continue;
      }

      const hash = Math.abs((row * 47 + column * 29 + row * column * 7) % 97);
      const fissure = hash % 19 === 0 || (row + column * 3) % 31 === 0;
      line += fissure ? " " : asciiCharacters[hash % asciiCharacters.length];
    }

    rows.push(line.replace(/\s+$/, ""));
  }

  return rows.join("\n");
}

const asciiBrain = createAsciiBrain();

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
        <header className={styles.intro}>
          <p className={styles.eyebrow}>THE SOLUTION</p>
          <h2 id="codexa-benefits-title">
            A unified platform built for scalable development
          </h2>
          <p className={styles.subtitle}>
            Codexa brings workflows, automation, API integration, and AI-driven
            insights into one cohesive system.
          </p>
        </header>

        <div className={styles.matrix}>
          <div className={styles.column}>
            {leftBenefits.map((benefit) => (
              <BenefitCard key={benefit.title} benefit={benefit} />
            ))}
          </div>

          <div className={styles.brain} aria-hidden="true">
            <div className={styles.glow} />
            <pre>{asciiBrain}</pre>
            <span className={styles.brainLabel}>codexa://intelligence</span>
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
