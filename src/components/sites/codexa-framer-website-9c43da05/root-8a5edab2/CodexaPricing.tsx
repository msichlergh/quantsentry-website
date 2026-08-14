"use client";

import { useState, type SVGProps } from "react";

import { ArrowIcon, CheckIcon } from "../shared/icons";
import type { CodexaPlan } from "./types";

import styles from "./CodexaPricing.module.css";

const plans = [
  {
    name: "Starter",
    description: "For small teams exploring the platform and workflows.",
    monthlyPrice: 49,
    yearlyPrice: 35,
    cta: "Try Starter",
    features: [
      "Full access to beginner modules",
      "Core API access",
      "Workflow automation basics",
      "Shared dev environment",
      "Standard monitoring",
      "Essential support",
    ],
  },
  {
    name: "Pro",
    description: "For growing teams needing more power and flexibility.",
    monthlyPrice: 79,
    yearlyPrice: 65,
    cta: "Try Pro",
    featured: true,
    features: [
      "Everything in Starter, plus:",
      "Advanced automation tools",
      "Real-time logs & insights",
      "Secure staging environments",
      "Team collaboration features",
      "Priority support",
    ],
  },
  {
    name: "Ultimate",
    description: "For scaling teams that require enterprise-grade stability.",
    monthlyPrice: 129,
    yearlyPrice: 115,
    cta: "Try Ultimate",
    features: [
      "Everything in Pro, plus:",
      "High-performance API limits",
      "Dedicated onboarding",
      "Advanced security controls",
      "Private team environments",
      "Lifetime priority support",
    ],
  },
] satisfies readonly CodexaPlan[];

const reassuranceItems = [
  { label: "Secure Payment Processing", icon: "shield" },
  { label: "Instant Access After Purchase", icon: "bolt" },
  { label: "Cancel Anytime, Hassle-Free", icon: "refresh" },
  { label: "Lifetime Product Updates", icon: "infinity" },
] as const;

type ReassuranceIconProps = SVGProps<SVGSVGElement> & {
  icon: (typeof reassuranceItems)[number]["icon"];
};

function ReassuranceIcon({ icon, ...props }: ReassuranceIconProps) {
  if (icon === "shield") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
        <path d="M12 2.8 20 6v5.8c0 4.9-3.2 8-8 9.4-4.8-1.4-8-4.5-8-9.4V6l8-3.2Z" stroke="currentColor" strokeWidth="1.2" />
        <path d="m8.7 12 2.1 2.1 4.7-4.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "bolt") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
        <path d="m13.2 2.5-8.1 11h6.2l-.5 8 8.1-11h-6.2l.5-8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "refresh") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
        <path d="M19.6 8.2A8 8 0 0 0 5.4 6L3.5 8.2M4.4 15.8A8 8 0 0 0 18.6 18l1.9-2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M3.5 3.8v4.4h4.4M20.5 20.2v-4.4h-4.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M9.2 8.2 6.7 5.7a4.2 4.2 0 1 0-5.9 5.9 4.2 4.2 0 0 0 5.9 0L12 6.3l5.3 5.3a4.2 4.2 0 1 0 0-5.9 4.2 4.2 0 0 0-5.9 0l-5.3 5.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" transform="translate(2.6 3.1) scale(.78)" />
    </svg>
  );
}

export function CodexaPricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            Pricing
          </p>
          <h2>Simple plans, built for every team</h2>
        </header>

        <div className={styles.pricingBody}>
          <div className={styles.billingToggle} aria-label="Billing period">
            <button
              className={!yearly ? styles.activeBilling : undefined}
              type="button"
              aria-pressed={!yearly}
              onClick={() => setYearly(false)}
            >
              Monthly
            </button>
            <button
              className={`${styles.switch} ${yearly ? styles.switchYearly : ""}`}
              type="button"
              aria-label={`Switch to ${yearly ? "monthly" : "yearly"} billing`}
              aria-pressed={yearly}
              onClick={() => setYearly((current) => !current)}
            >
              <span />
            </button>
            <button
              className={yearly ? styles.activeBilling : undefined}
              type="button"
              aria-pressed={yearly}
              onClick={() => setYearly(true)}
            >
              Yearly
            </button>
            <span className={styles.discount}>20% off</span>
          </div>

          <div className={styles.cardGrid}>
            {plans.map((plan) => {
              const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;

              return (
                <article
                  className={`${styles.card} ${plan.featured ? styles.featuredCard : ""}`}
                  key={plan.name}
                >
                  <div className={styles.planIntro}>
                    <div className={styles.planTitleRow}>
                      <h3>{plan.name}</h3>
                      {plan.featured ? <span>Popular</span> : null}
                    </div>
                    <p className={styles.description}>{plan.description}</p>
                    <p className={styles.price} aria-live="polite">
                      <span
                        className={styles.priceValue}
                        key={`${plan.name}-${yearly ? "yearly" : "monthly"}`}
                      >
                        ${price}
                      </span>
                      <span>/month</span>
                    </p>
                    <a
                      className={`${styles.cta} ${plan.featured ? styles.featuredCta : ""}`}
                      href="/codexa/company/sales"
                    >
                      <span>{plan.cta}</span>
                      <ArrowIcon />
                    </a>
                  </div>

                  <ul className={styles.featureList}>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <span className={styles.check}>
                          <CheckIcon />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className={styles.reassuranceGrid}>
            {reassuranceItems.map((item) => (
              <div className={styles.reassuranceItem} key={item.label}>
                <ReassuranceIcon icon={item.icon} />
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
