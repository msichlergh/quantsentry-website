import { CodexaFaqs } from "../root-8a5edab2/CodexaFaqs";
import { CodexaPricing } from "../root-8a5edab2/CodexaPricing";
import { CodexaInnerHero } from "../shared/CodexaInnerHero";
import { ArrowIcon, CheckIcon } from "../shared/icons";

import styles from "./ProductPricingPage.module.css";

type ComparisonValue = string | boolean;

const comparisonRows: readonly [string, ComparisonValue, ComparisonValue, ComparisonValue][] = [
  ["Workflows Included", "5", "50", "Unlimited"],
  ["Team Members", "2", "10", "Unlimited"],
  ["Execution Speed", "Standard", "Priority", "High-priority"],
  ["Dashboard Capabilities", "Basic", "Editable", "Custom"],
  ["Integration Slots", "3", "15", "Unlimited"],
  ["Audit Log Retention", "14 days", "60 days", "365 days"],
  ["Automated AI Insights", false, true, true],
  ["Workflow Versioning", false, true, true],
  ["Advanced Diagnostics", false, true, true],
  ["SSO / SCIM", false, "Add-on", true],
  ["Scheduled Executions", "Hourly", "Custom Intervals", "Event-driven"],
  ["Real-time Monitoring", "Basic", "Detailed", "Full telemetry"],
  ["Private Workspace", false, "Add-on", true],
  ["Guided Onboarding", false, "Add-on", true],
];

function ComparisonValueCell({ value }: { value: ComparisonValue }) {
  if (typeof value === "boolean") {
    return (
      <span className={`${styles.status} ${value ? styles.included : styles.excluded}`}>
        {value ? <CheckIcon /> : <span aria-hidden="true">×</span>}
        <span className={styles.srOnly}>{value ? "Included" : "Not included"}</span>
      </span>
    );
  }

  return <span>{value}</span>;
}

export function ProductPricingPage() {
  return (
    <>
      <CodexaInnerHero
        eyebrow="Pricing"
        title="Simple plans, built for every team"
        description="Select the plan that matches your environment — from lightweight setups to full enterprise scale."
      />

      <div className={styles.pricingArea}>
        <CodexaPricing />
      </div>

      <section className={styles.comparison} aria-label="Plan comparison">
        <div className={styles.tableScroll}>
          <div className={styles.table} role="table" aria-label="Compare Codexa plans">
            <div className={styles.tableHeader} role="row">
              <span role="columnheader" />
              <span role="columnheader">Starter</span>
              <span role="columnheader">Pro</span>
              <span role="columnheader">Ultimate</span>
            </div>
            {comparisonRows.map(([feature, starter, pro, ultimate]) => (
              <div className={styles.tableRow} role="row" key={feature}>
                <strong role="rowheader">{feature}</strong>
                <span role="cell"><ComparisonValueCell value={starter} /></span>
                <span role="cell"><ComparisonValueCell value={pro} /></span>
                <span role="cell"><ComparisonValueCell value={ultimate} /></span>
              </div>
            ))}
            <div className={styles.customPlan}>
              <div>
                <h2>Need a custom plan?</h2>
                <p>We can tailor limits, workflows, and infrastructure to match your team&apos;s requirements.</p>
              </div>
              <a href="/codexa/company/sales">
                Contact Sales
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      <CodexaFaqs />
    </>
  );
}
