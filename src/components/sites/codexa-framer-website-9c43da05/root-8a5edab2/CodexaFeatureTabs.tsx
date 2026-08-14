"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import styles from "./CodexaFeatureTabs.module.css";

const tabs = [
  {
    label: "Developer Experience",
    title: "Production-first behavior, without compromises",
    description:
      "Every component is built with predictable, production-first behavior in mind. The structure stays clean and readable as projects grow, without relying on visual tricks or artificial demo states. What you see is what actually ships.",
  },
  {
    label: "Layout Stability",
    title: "Built to handle real data and real edge cases",
    description:
      "Layouts handle long content and edge cases by default, without overlapping elements, jumping states, or fragile interactions. Everything is designed to work with real data from day one — not idealized placeholders.",
  },
  {
    label: "Production Ready",
    title: "Designed to scale with your product",
    description:
      "Components are structured for reuse and easy extension, without assumptions about perfect input or happy paths. The system is built to evolve naturally as the product grows, not to be rewritten later.",
  },
] as const;

function CodeSnippet({ index }: { index: number }) {
  if (index === 1) {
    return (
      <pre className={styles.code}>
        <code>
          <span className={styles.keyword}>type</span>{" "}
          <span className={styles.type}>PanelProps</span> = {"{"}
          {"\n  "}title: <span className={styles.type}>string</span>;
          {"\n  "}items: <span className={styles.type}>readonly Item[]</span>;
          {"\n"}{"}"};
          {"\n\n"}
          <span className={styles.keyword}>export function</span>{" "}
          <span className={styles.function}>StablePanel</span>({"{"} title, items {"}"}: PanelProps) {"{"}
          {"\n  "}<span className={styles.keyword}>return</span> (
          {"\n    "}&lt;section className=<span className={styles.string}>&quot;panel&quot;</span>&gt;
          {"\n      "}&lt;h2&gt;{"{"}title{"}"}&lt;/h2&gt;
          {"\n      "}&lt;div className=<span className={styles.string}>&quot;content&quot;</span>&gt;
          {"\n        "}{"{"}items.map(renderItem){"}"}
          {"\n      "}&lt;/div&gt;
          {"\n    "}&lt;/section&gt;
          {"\n  "});
          {"\n"}{"}"}
        </code>
      </pre>
    );
  }

  if (index === 2) {
    return (
      <pre className={styles.code}>
        <code>
          <span className={styles.keyword}>import</span> {"{"} cache {"}"}{" "}
          <span className={styles.keyword}>from</span>{" "}
          <span className={styles.string}>&quot;react&quot;</span>;
          {"\n\n"}
          <span className={styles.keyword}>const</span>{" "}
          <span className={styles.function}>getRelease</span> = cache(
          {"\n  "}<span className={styles.keyword}>async</span> (id: <span className={styles.type}>string</span>) ={">"} api.release(id)
          {"\n"});
          {"\n\n"}
          <span className={styles.keyword}>export async function</span>{" "}
          <span className={styles.function}>Dashboard</span>({"{"} id {"}"}) {"{"}
          {"\n  "}<span className={styles.keyword}>const</span> release = <span className={styles.keyword}>await</span> getRelease(id);
          {"\n\n  "}<span className={styles.keyword}>return</span> &lt;Release data={"{"}release{"}"} /&gt;;
          {"\n"}{"}"}
        </code>
      </pre>
    );
  }

  return (
    <pre className={styles.code}>
      <code>
        <span className={styles.keyword}>import</span> {"{"} useEffect, useState {"}"}{" "}
        <span className={styles.keyword}>from</span>{" "}
        <span className={styles.string}>&quot;react&quot;</span>;
        {"\n\n"}
        <span className={styles.keyword}>export function</span>{" "}
        <span className={styles.function}>DeveloperIndicator</span>() {"{"}
        {"\n  "}<span className={styles.keyword}>const</span> [active, setActive] = useState(<span className={styles.literal}>false</span>);
        {"\n\n  "}useEffect(() ={">"} {"{"}
        {"\n    "}<span className={styles.keyword}>const</span> stop = runtime.subscribe(setActive);
        {"\n    "}<span className={styles.keyword}>return</span> stop;
        {"\n  "}{"}"}, []);
        {"\n\n  "}<span className={styles.keyword}>return</span> &lt;Status active={"{"}active{"}"} /&gt;;
        {"\n"}{"}"}
      </code>
    </pre>
  );
}

function Arrow({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d={direction === "previous" ? "m12.5 5-5 5 5 5" : "m7.5 5 5 5-5 5"} />
    </svg>
  );
}

export function CodexaFeatureTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeTab = tabs[activeIndex];

  function move(direction: -1 | 1) {
    setActiveIndex((current) => (current + direction + tabs.length) % tabs.length);
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex === undefined) {
      return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={`${styles.intro} codexa-reveal`}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            Behind the scenes
          </p>
          <h2>The decisions that keep Codexa reliable</h2>
        </header>

        <div className={styles.experience}>
          <div className={styles.tabBar} role="tablist" aria-label="Reliability features">
            {tabs.map((tab, index) => (
              <button
                aria-controls="codexa-feature-panel"
                aria-selected={index === activeIndex}
                className={styles.tab}
                id={`codexa-feature-tab-${index}`}
                key={tab.label}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                role="tab"
                tabIndex={index === activeIndex ? 0 : -1}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={styles.mobileControls}>
            <button
              aria-label="Previous feature"
              onClick={() => move(-1)}
              type="button"
            >
              <Arrow direction="previous" />
            </button>
            <span>{activeTab.label}</span>
            <button aria-label="Next feature" onClick={() => move(1)} type="button">
              <Arrow direction="next" />
            </button>
          </div>

          <div
            aria-labelledby={`codexa-feature-tab-${activeIndex}`}
            className={styles.panel}
            id="codexa-feature-panel"
            role="tabpanel"
          >
            <figure className={styles.codeFigure} key={`code-${activeIndex}`}>
              <CodeSnippet index={activeIndex} />
            </figure>

            <div className={styles.copy} key={`copy-${activeIndex}`}>
              <h3>{activeTab.title}</h3>
              <p>{activeTab.description}</p>
              <a className="codexa-button" href="/codexa/company/sales">
                <span className="codexa-button__track" aria-hidden="true">
                  <span>Get Started</span>
                  <span>Get Started</span>
                </span>
                <span className={styles.srOnly}>Get Started</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
