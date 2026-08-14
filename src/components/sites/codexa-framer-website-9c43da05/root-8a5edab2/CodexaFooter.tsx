"use client";

import { ArrowRight } from "lucide-react";
import type { FormEvent } from "react";

import styles from "./CodexaFooter.module.css";

const footerGroups = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Changelog", "FAQs"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Support", "Sales"],
  },
  {
    title: "Legal",
    links: ["Terms", "Privacy", "Cookies", "404"],
  },
] as const;

const linkTargets: Record<string, string> = {
  Features: "/codexa/product/features",
  Pricing: "/codexa/product/pricing",
  Changelog: "/codexa/product/changelog",
  FAQs: "/codexa/product/faqs",
  About: "/codexa/company/about",
  Blog: "/codexa/company/blog",
  Support: "/codexa/company/support",
  Sales: "/codexa/company/sales",
  Terms: "/codexa/legal/terms-and-conditions",
  Privacy: "/codexa/legal/privacy-policy",
  Cookies: "/codexa/legal/cookie-policy",
  "404": "/codexa/404",
};

function CodexaLogo({ className }: { className?: string }) {
  return (
    <svg
      aria-label="Codexa"
      className={className}
      role="img"
      viewBox="0 0 64 64"
    >
      <circle cx="32" cy="32" r="31" fill="currentColor" />
      <path
        d="M7 36.6h21.5L15.2 50.8a27 27 0 0 0 18 7.2c13.5 0 24.7-9.9 26.8-22.7H39.1l12.8-13.6A26.9 26.9 0 0 0 33.2 14C19.8 14 8.8 23.7 7 36.6Z"
        fill="#09090b"
      />
    </svg>
  );
}

export function CodexaFooter() {
  function preventDemoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.cta}>
        <div className={styles.ctaGrid} aria-hidden="true" />
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.ctaInner}>
          <p className={styles.trustLine}>
            <span aria-label="5 out of 5 stars">★★★★★</span>
            12K+ teams trust Codexa
          </p>
          <h2>Automate more. Ship faster.</h2>
          <a
            className={styles.ctaButton}
            href="https://buy.polar.sh/polar_cl_lvmZA1kYEOINNnx4bkeyZxW1ajP5d6vUQusL108riZ7"
          >
            Explore the Template
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className={styles.lower}>
        <div className={styles.newsletter}>
          <h3>Stay in the loop</h3>
          <p>
            Get insights on automated workflows, AI features, and product
            updates.
          </p>
          <form onSubmit={preventDemoSubmit}>
            <label className={styles.srOnly} htmlFor="codexa-footer-email">
              Email address
            </label>
            <input
              id="codexa-footer-email"
              type="email"
              placeholder="Enter your email"
            />
            <button type="submit">
              Submit
              <ArrowRight aria-hidden="true" />
            </button>
          </form>
        </div>

        <div className={styles.mark}>
          <CodexaLogo />
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.links.map((link) => (
                  <li key={link}>
                    <a href={linkTargets[link]}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={styles.bottomBar}>
        <p>©2026 CODEXA. ALL RIGHTS RESERVED.</p>
        <p>
          CREATED BY <a href="https://x.com/kadircalik">KADIR CALIK</a>
        </p>
      </div>
    </footer>
  );
}
