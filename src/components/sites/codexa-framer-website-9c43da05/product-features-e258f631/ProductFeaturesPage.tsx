import { CodexaFaqs } from "../root-8a5edab2/CodexaFaqs";
import { CodexaFeatureTabs } from "../root-8a5edab2/CodexaFeatureTabs";
import { ProductCapabilities } from "./ProductCapabilities";
import { ProductFeaturesHero } from "./ProductFeaturesHero";
import {
  MonitoringVisual,
  ThroughputVisual,
  WorkflowVisual,
} from "./ProductFeatureVisuals";

import styles from "./ProductFeaturesPage.module.css";

const featureRows = [
  {
    title: "Build and run workflows with clean, testable code",
    paragraphs: [
      "Codexa lets you define tasks, triggers, and data pipelines using simple, version-controlled functions.",
      "Teams collaborate in real time, deploy changes safely, and keep a clear audit trail across every step.",
      "The result: fewer manual processes, faster resolution, and reliable automation from day one.",
    ],
    visual: WorkflowVisual,
  },
  {
    title: "Monitor system performance instantly",
    paragraphs: [
      "Track throughput, latency, completion rates, and error-free executions as your workflows run.",
      "Codexa surfaces bottlenecks early, highlights unusual behavior, and keeps your operations healthy — no extra setup needed.",
      "Every metric updates in real time, giving developers and operators a shared source of truth for diagnosing issues quickly. No dashboards to manually stitch together — it all works out of the box.",
    ],
    visual: MonitoringVisual,
  },
  {
    title: "Automate with tools that scale as you grow",
    paragraphs: [
      "Codexa includes built-in automation primitives such as multi-step workflows, real-time tracking, and intelligent error handling.",
      "Engineers stay in control while routine tasks execute reliably in the background — freeing your team to focus on what matters.",
      "Each workflow is versioned, testable, and safe to deploy, ensuring smooth collaboration between operators and developers.",
    ],
    visual: ThroughputVisual,
  },
] as const;

export function ProductFeaturesPage() {
  return (
    <>
      <ProductFeaturesHero />
      <section className={styles.featureGrid} aria-label="Codexa features">
        {featureRows.map(({ title, paragraphs, visual: Visual }, index) => (
          <Fragment key={title}>
            <div className={`${styles.featureCell} ${index === 1 ? styles.secondVisual : ""}`}>
              <Visual />
            </div>
            <article className={`${styles.copyCell} ${index === 1 ? styles.secondCopy : ""}`}>
              <h2>{title}</h2>
              {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </article>
          </Fragment>
        ))}
      </section>
      <CodexaFeatureTabs />
      <ProductCapabilities />
      <CodexaFaqs />
    </>
  );
}
import { Fragment } from "react";
