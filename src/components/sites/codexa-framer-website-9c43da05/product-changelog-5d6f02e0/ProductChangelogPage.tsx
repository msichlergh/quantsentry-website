import { CodexaInnerHero } from "../shared/CodexaInnerHero";
import { CodexaSiteFrame } from "../shared/CodexaSiteFrame";

import styles from "./ProductChangelogPage.module.css";

const updates = [
  {
    version: "v1.0.3",
    title: "UI/UX Platform Improvements",
    subtitle: "A smoother, cleaner, and more responsive product experience.",
    date: "Jan 1, 2026",
    month: "January Update",
    overview: "This month we focused heavily on polishing the user interface and making sure Codexa feels fast, modern, and intuitive across all devices.",
    added: ["Dark-mode graph animations for insights pages.", "New onboarding flow with guided setup."],
    improved: ["Overall dashboard load performance.", "Mobile responsiveness for workflow editor pages."],
    fixed: ["Visual alignment issues on pricing and settings pages."],
  },
  {
    version: "v1.0.2",
    title: "Monitoring & Insights Refresh",
    subtitle: "More visibility, deeper logs, and better real-time tracking.",
    date: "Dec 1, 2025",
    month: "December Update",
    overview: "Codexa’s monitoring suite gets a serious upgrade, giving engineering teams more transparency into system behavior and workflow health.",
    added: ["Real-time execution heatmaps in dashboards.", "Failure root-cause insights with recommended fixes."],
    improved: ["Log ingestion speed improved by 25%.", "Reduced noise in system alerts with smarter grouping."],
    fixed: ["Delay in event counters when viewing historical logs."],
  },
  {
    version: "v1.0.1",
    title: "API Experience Update",
    subtitle: "Cleaner endpoints, stronger validation, and smoother integration.",
    date: "Nov 1, 2025",
    month: "November Update",
    overview: "This update focuses on refining the Codexa API for developers. We introduced better error messaging, stricter schema validation, and improved documentation.",
    added: ["New /analytics/summary endpoint.", "Schema validator with human-readable error output."],
    improved: ["Faster response times for analytics endpoints.", "More consistent error codes across the API."],
    fixed: ["Incorrect rate-limit headers on authenticated requests."],
  },
  {
    version: "v1.0.0",
    title: "Workflow Engine Upgrade",
    subtitle: "Faster task execution and more reliable automation pipelines.",
    date: "Oct 1, 2025",
    month: "October Update",
    overview: "Codexa’s workflow engine has been upgraded with major performance gains. Task orchestration is now significantly faster, more predictable, and highly optimized for large-scale operations.",
    added: ["Parallel Task Runner: Execute multiple workflow branches at the same time.", "Smart Retries: Automatic retry logic for network-dependent tasks."],
    improved: ["Workflow latency reduced by up to 40%.", "More stable long-running processes on large datasets."],
    fixed: ["Occasional stuck triggers during high load."],
  },
] as const;

function ChangeList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className={styles.changeList}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export function ProductChangelogPage() {
  return (
    <CodexaSiteFrame>
      <CodexaInnerHero
        eyebrow="Changelog"
        title="Product updates and improvements"
        description="Stay up to date with the latest enhancements across automation, performance, and developer workflows."
      />

      <section className={styles.changelog} aria-label="Product changelog">
        {updates.map((update) => (
          <article className={styles.update} key={update.version}>
            <header className={styles.metadata}>
              <p className={styles.version}>{update.version}</p>
              <h2>{update.title}</h2>
              <p className={styles.subtitle}>{update.subtitle}</p>
              <time dateTime={update.date === "Jan 1, 2026" ? "2026-01-01" : update.date === "Dec 1, 2025" ? "2025-12-01" : update.date === "Nov 1, 2025" ? "2025-11-01" : "2025-10-01"}>
                <span aria-hidden="true" />
                {update.date}
              </time>
            </header>

            <div className={styles.details}>
              <div className={styles.updateVisual}>
                <span>{update.month}</span>
              </div>
              <p className={styles.overview}>{update.overview}</p>
              <ChangeList title="Added" items={update.added} />
              <ChangeList title="Improved" items={update.improved} />
              <ChangeList title="Fixed" items={update.fixed} />
            </div>
          </article>
        ))}
      </section>
    </CodexaSiteFrame>
  );
}
