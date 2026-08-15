"use client";

import { ArrowRight, Zap } from "lucide-react";
import Image from "next/image";
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

export function CodexaFooter() {
  function preventDemoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.cta}>
        <div className={styles.ctaGrid} aria-hidden="true" />
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.ctaWhiteGlowWide} aria-hidden="true" />
        <div className={styles.ctaWhiteGlowTight} aria-hidden="true" />
        <div className={styles.ctaWhiteRule} aria-hidden="true" />
        <div className={`${styles.ctaInner} codexa-reveal`}>
          <p className={styles.trustLine}>
            <span aria-label="5 out of 5 stars">★★★★★</span>
            12K+ teams trust Codexa
          </p>
          <h2>
            Automate more.
            <br />
            Ship faster.
          </h2>
          <a
            className={styles.ctaButton}
            href="https://buy.polar.sh/polar_cl_lvmZA1kYEOINNnx4bkeyZxW1ajP5d6vUQusL108riZ7"
          >
            <span className={styles.buttonLabel}>
              <span>Explore the Template</span>
              <span aria-hidden="true">Explore the Template</span>
            </span>
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className={`${styles.lower} codexa-reveal`}>
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

        <a className={styles.mark} href="#home" aria-label="Back to top">
          <Image
            src="/sites/codexa-framer-website-9c43da05/root-8a5edab2/images/codexa-mark.png"
            width={64}
            height={64}
            alt=""
          />
        </a>

        <nav className={styles.links} aria-label="Footer navigation">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.links.map((link) => (
                  <li key={link}>
                    <a href={linkTargets[link]}>
                      <span className={styles.linkTrack} aria-hidden="true">
                        <span>{link}</span>
                        <span>{link}</span>
                      </span>
                      <span className={styles.srOnly}>{link}</span>
                    </a>
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
          <Zap aria-hidden="true" className={styles.creditIcon} />
        </p>
      </div>
    </footer>
  );
}
