"use client";

import { File, House, Search } from "lucide-react";
import { useState, type ReactNode } from "react";

import { CodexaButton } from "../shared/CodexaButton";
import { CODEXA_ROUTES } from "../shared/codexaSiteConfig";
import styles from "./ProductFeaturesHero.module.css";

const tabs = ["Workflow", "Triggers", "Action"] as const;
type EditorTab = (typeof tabs)[number];

const codeLines: Record<EditorTab, readonly ReactNode[]> = {
  Workflow: [
    <><span className={styles.codeComment}>{"// workflows/onboarding.js"}</span></>,
    <><span className={styles.codeAccent}>workflow</span>(<span className={styles.codeString}>&quot;onboarding&quot;</span>, {"{"}</>,
    <>  trigger: <span className={styles.codeAccent}>schedule</span>.every(<span className={styles.codeString}>&quot;15m&quot;</span>),</>,
    <>  action: <span className={styles.codeAccent}>onboardUsers</span>,</>,
    <>{"}"});</>,
  ],
  Triggers: [
    <><span className={styles.codeComment}>{"// triggers/onboarding.js"}</span></>,
    <><span className={styles.codeAccent}>export const</span> onboarding = schedule.every(<span className={styles.codeString}>&quot;15m&quot;</span>);</>,
    <></>,
    <><span className={styles.codeComment}>{"// Runs automatically in production"}</span></>,
    <>onboarding.on(<span className={styles.codeString}>&quot;ready&quot;</span>, <span className={styles.codeAccent}>execute</span>);</>,
  ],
  Action: [
    <><span className={styles.codeComment}>{"// workflows/onboarding.js"}</span></>,
    <><span className={styles.codeAccent}>import</span> {"{ "}<span className={styles.codeAccent}>schedule</span>, db, mail, ai, logger {" } "}<span className={styles.codeAccent}>from</span> <span className={styles.codeString}>&quot;@flowline/core&quot;</span>;</>,
    <></>,
    <><span className={styles.codeComment}>{"// Run "}</span><span className={styles.codeAccent}>every</span><span className={styles.codeComment}> 15 minutes</span></>,
    <>schedule.every(<span className={styles.codeString}>&quot;15m&quot;</span>, <span className={styles.codeAccent}>async</span> () ={">"} {"{"}</>,
    <>  <span className={styles.codeAccent}>try</span> {"{"}</>,
    <>    <span className={styles.codeAccent}>logger.info</span>(<span className={styles.codeString}>&quot;Checking for new signups...&quot;</span>);</>,
    <></>,
    <>    <span className={styles.codeAccent}>const</span> users = <span className={styles.codeAccent}>await db.users.find</span>({"{ welcomed: false }"});</>,
    <></>,
    <>    <span className={styles.codeAccent}>if</span> (!users.length) {"{"}</>,
    <>      logger.debug(<span className={styles.codeString}>&quot;No new users to onboard.&quot;</span>);</>,
    <>      <span className={styles.codeAccent}>return</span>;</>,
    <>    {"}"}</>,
  ],
};

export function ProductFeaturesHero() {
  const [activeTab, setActiveTab] = useState<EditorTab>("Action");

  return (
    <section className={styles.productHero}>
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className={styles.heroGlow} aria-hidden="true" />

      <div className={styles.heroCopy}>
        <h1>Everything you need<br />to build with AI</h1>
        <p>
          Write workflow logic in code and let Codexa automate,<br />
          schedule, and optimize everything.
        </p>
        <CodexaButton href={CODEXA_ROUTES.sales}>Get started free</CodexaButton>
      </div>

      <div className={styles.editorShell}>
        <aside className={styles.editorRail} aria-label="Editor navigation">
          <House aria-hidden="true" />
          <File aria-hidden="true" />
          <Search aria-hidden="true" />
        </aside>

        <aside className={styles.fileTree} aria-label="Workflow files">
          <strong>Workflows</strong>
          <span>cleanup.js</span>
          <span className={styles.activeFile}>onboarding.js</span>
          <span>nightly-sync.js</span>
        </aside>

        <div className={styles.editorPane}>
          <div className={styles.editorTabs} role="tablist" aria-label="Workflow editor views">
            {tabs.map((tab) => (
              <button
                aria-selected={activeTab === tab}
                className={activeTab === tab ? styles.activeTab : undefined}
                key={tab}
                onClick={() => setActiveTab(tab)}
                role="tab"
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>

          <div
            className={styles.codePane}
            key={activeTab}
            role="tabpanel"
            aria-label={`${activeTab} code`}
          >
            {codeLines[activeTab].map((line, index) => (
              <div className={styles.codeLine} key={`${activeTab}-${index}`}>
                <span className={styles.lineNumber}>{index + 1}</span>
                <code>{line}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
