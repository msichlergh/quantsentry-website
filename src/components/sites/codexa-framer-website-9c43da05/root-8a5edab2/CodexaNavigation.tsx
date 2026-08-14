"use client";

import Link from "next/link";
import { useState } from "react";

import { CodexaLogo } from "../shared/CodexaLogo";

import styles from "./CodexaNavigation.module.css";

const navigationLinks = [
  { label: "Features", href: "/codexa/product/features", expandable: false },
  { label: "Pricing", href: "/codexa/product/pricing", expandable: false },
  {
    label: "Changelog",
    href: "/codexa/product/changelog",
    expandable: false,
  },
  {
    label: "Company",
    href: "/codexa/company/about",
    expandable: true,
  },
  { label: "FAQs", href: "/codexa/product/faqs", expandable: false },
] as const;

function AnimatedLabel({ children }: { children: string }) {
  return (
    <span className={styles.actionTrack} aria-hidden="true">
      <span>{children}</span>
      <span>{children}</span>
    </span>
  );
}

export function CodexaNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.shell}>
      <nav className={styles.inner} aria-label="Main navigation">
        <Link className={styles.brand} href="/codexa" aria-label="Codexa home">
          <CodexaLogo />
        </Link>

        <div className={styles.links}>
          {navigationLinks.map((link) => (
            <Link className={styles.link} href={link.href} key={link.label}>
              {link.label}
              {link.expandable ? (
                <svg
                  aria-hidden="true"
                  className={styles.chevron}
                  viewBox="0 0 12 12"
                >
                  <path d="m3.75 4.75 2.25 2.5 2.25-2.5" />
                </svg>
              ) : null}
            </Link>
          ))}
        </div>

        <div className={styles.actions}>
          <Link
            className={`${styles.action} ${styles.secondary}`}
            href="/codexa/company/support"
          >
            <span className={styles.srOnly}>Contact</span>
            <AnimatedLabel>Contact</AnimatedLabel>
          </Link>
          <Link
            className={`${styles.action} ${styles.primary}`}
            href="/codexa/company/sales"
          >
            <span className={styles.srOnly}>Get Started</span>
            <AnimatedLabel>Get Started</AnimatedLabel>
          </Link>
        </div>

        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className={styles.menuButton}
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
        </button>
      </nav>
      {menuOpen ? (
        <nav className={styles.mobileMenu} aria-label="Mobile navigation">
          {navigationLinks.map((link) => (
            <Link href={link.href} key={link.label} onClick={() => setMenuOpen(false)}>
              {link.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
          <div>
            <Link href="/codexa/company/support" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
            <Link href="/codexa/company/sales" onClick={() => setMenuOpen(false)}>
              Get Started
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
