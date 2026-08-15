import { CodexaFaqs } from "../root-8a5edab2/CodexaFaqs";
import { CodexaFeatureTabs } from "../root-8a5edab2/CodexaFeatureTabs";
import { CodexaSiteFrame } from "../shared/CodexaSiteFrame";
import { ProductFeaturesHero } from "./ProductFeaturesHero";

import styles from "./ProductFeaturesPage.module.css";

const workflowStates = [
  ["Workflow sync", true],
  ["Automation enabled", true],
  ["Error handling", false],
  ["API integration", false],
  ["Rate limits", false],
] as const;

const capabilities = [
  {
    icon: "layers",
    title: "Unified developer workflow",
    description: "Bring tasks, triggers, APIs, and monitoring into one clean system.",
  },
  {
    icon: "bolt",
    title: "Faster feature delivery",
    description: "Ship automation updates instantly using simple Python functions.",
  },
  {
    icon: "target",
    title: "Smarter decisions",
    description: "Real-time metrics reveal bottlenecks, performance issues.",
  },
  {
    icon: "shield",
    title: "Infrastructure handled for you",
    description: "Scaling, reliability, logging, and runtime orchestration — all built-in.",
  },
  {
    icon: "users",
    title: "Effortless collaboration",
    description: "Share workflows and pipelines without configuration overhead.",
  },
  {
    icon: "flag",
    title: "Ready for real-world scale",
    description: "Run from prototype-level tasks to thousands of concurrent workflows.",
  },
] as const;

function CapabilityIcon({ icon }: { icon: (typeof capabilities)[number]["icon"] }) {
  if (icon === "bolt") {
    return <path d="m13.2 2.5-8.1 11h6.2l-.5 8 8.1-11h-6.2l.5-8Z" />;
  }

  if (icon === "target") {
    return <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 1.8v2.4M12 19.8v2.4M1.8 12h2.4M19.8 12h2.4" /></>;
  }

  if (icon === "shield") {
    return <><path d="M12 2.8 20 6v5.8c0 4.9-3.2 8-8 9.4-4.8-1.4-8-4.5-8-9.4V6l8-3.2Z" /><path d="m8.7 12 2.1 2.1 4.7-4.7" /></>;
  }

  if (icon === "users") {
    return <><circle cx="9" cy="8" r="3" /><path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19M16 5.5a3 3 0 0 1 0 5.8M17 13a4.5 4.5 0 0 1 3.5 4.4V19" /></>;
  }

  if (icon === "flag") {
    return <><path d="M5 21V3" /><path d="M5 4h12l-2 4 2 4H5" /></>;
  }

  return <><path d="m12 3-8 4 8 4 8-4-8-4Z" /><path d="m4 12 8 4 8-4M4 17l8 4 8-4" /></>;
}

function WorkflowVisual() {
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

function MonitoringVisual() {
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

function ThroughputVisual() {
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

export function ProductFeaturesPage() {
  return (
    <CodexaSiteFrame>
      <ProductFeaturesHero />

      <section className={styles.featureGrid} aria-label="Codexa features">
        <div className={styles.featureCell}><WorkflowVisual /></div>
        <article className={styles.copyCell}>
          <h2>Build and run workflows with clean, testable code</h2>
          <p>Codexa lets you define tasks, triggers, and data pipelines using simple, version-controlled functions.</p>
          <p>Teams collaborate in real time, deploy changes safely, and keep a clear audit trail across every step.</p>
          <p>The result: fewer manual processes, faster resolution, and reliable automation from day one.</p>
        </article>

        <div className={`${styles.featureCell} ${styles.secondVisual}`}><MonitoringVisual /></div>
        <article className={`${styles.copyCell} ${styles.secondCopy}`}>
          <h2>Monitor system performance instantly</h2>
          <p>Track throughput, latency, completion rates, and error-free executions as your workflows run.</p>
          <p>Codexa surfaces bottlenecks early, highlights unusual behavior, and keeps your operations healthy — no extra setup needed.</p>
          <p>Every metric updates in real time, giving developers and operators a shared source of truth for diagnosing issues quickly. No dashboards to manually stitch together — it all works out of the box.</p>
        </article>

        <div className={styles.featureCell}><ThroughputVisual /></div>
        <article className={styles.copyCell}>
          <h2>Automate with tools that scale as you grow</h2>
          <p>Codexa includes built-in automation primitives such as multi-step workflows, real-time tracking, and intelligent error handling.</p>
          <p>Engineers stay in control while routine tasks execute reliably in the background — freeing your team to focus on what matters.</p>
          <p>Each workflow is versioned, testable, and safe to deploy, ensuring smooth collaboration between operators and developers.</p>
        </article>
      </section>

      <CodexaFeatureTabs />

      <section className={styles.capabilities}>
        <header className={styles.capabilityHeader}>
          <p className={styles.eyebrow}><span aria-hidden="true" />Benefits</p>
          <h2>Build with clarity.<br />Scale with confidence.</h2>
          <p>Codexa gives teams the tools to automate workflows, ship faster, and operate with complete visibility.</p>
        </header>
        <div className={styles.capabilityGrid}>
          {capabilities.map((capability) => (
            <article key={capability.title}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><CapabilityIcon icon={capability.icon} /></svg>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </section>

      <CodexaFaqs />
    </CodexaSiteFrame>
  );
}
