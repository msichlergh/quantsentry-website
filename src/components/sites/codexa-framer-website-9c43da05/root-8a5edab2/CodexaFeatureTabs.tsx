"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { CodexaButton } from "../shared/CodexaButton";
import { CodexaEyebrow } from "../shared/CodexaEyebrow";
import { CODEXA_ROUTES } from "../shared/codexaSiteConfig";
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

const codeSnippets = [
  `import { useEffect, useState } from "react";

export function FeatureFlag() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnabled(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!enabled) return null;

  return <div>Feature enabled</div>;
}`,
  `type Item = {
  id: number;
  title: string;
};

export function ItemList({ items }: { items: Item[] }) {
  if (!items.length) {
    return <span>No items found</span>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}`,
  `import { useEffect, useState } from "react";

export function DevModeIndicator() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {active ? "Dev mode active" : "Initializing..."}
    </div>
  );
}`,
] as const;

function Arrow({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d={direction === "previous" ? "m12.5 5-5 5 5 5" : "m7.5 5 5 5-5 5"} />
    </svg>
  );
}

export function CodexaFeatureTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [typedCode, setTypedCode] = useState({ tabIndex: -1, code: "" });
  const sectionRef = useRef<HTMLElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const codeViewportRef = useRef<HTMLDivElement | null>(null);
  const activeTab = tabs[activeIndex];
  const displayedCode = typedCode.tabIndex === activeIndex ? typedCode.code : "";

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const fallbackId = globalThis.setTimeout(() => setHasEnteredView(true), 0);
      return () => globalThis.clearTimeout(fallbackId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }

        setHasEnteredView(true);
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.08,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasEnteredView) {
      return;
    }

    const snippet = codeSnippets[activeIndex];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      const reducedMotionId = window.setTimeout(() => {
        setTypedCode({ tabIndex: activeIndex, code: snippet });
      }, 0);
      return () => window.clearTimeout(reducedMotionId);
    }

    let characterIndex = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const startId = window.setTimeout(() => {
      intervalId = setInterval(() => {
        characterIndex += 1;
        setTypedCode({
          tabIndex: activeIndex,
          code: snippet.slice(0, characterIndex),
        });

        if (characterIndex >= snippet.length && intervalId) {
          clearInterval(intervalId);
        }
      }, 30);
    }, 90);

    return () => {
      window.clearTimeout(startId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [activeIndex, hasEnteredView]);

  useEffect(() => {
    const viewport = codeViewportRef.current;
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, [displayedCode]);

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
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <header className={`${styles.intro} codexa-reveal`}>
          <CodexaEyebrow>Behind the scenes</CodexaEyebrow>
          <h2>The decisions that keep Codexa reliable</h2>
        </header>

        <div className={`${styles.experience} codexa-reveal codexa-reveal--delay-1`}>
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
            <span>
              {activeIndex + 1}/{tabs.length}
            </span>
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
            <figure className={styles.codeFigure}>
              <div className={styles.codeViewport} ref={codeViewportRef}>
                <pre className={styles.code}>
                  <code>{displayedCode}</code>
                </pre>
              </div>
            </figure>

            <div className={styles.copy} key={`copy-${activeIndex}`}>
              <h3>{activeTab.title}</h3>
              <p>{activeTab.description}</p>
              <CodexaButton href={CODEXA_ROUTES.sales}>Get Started</CodexaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
