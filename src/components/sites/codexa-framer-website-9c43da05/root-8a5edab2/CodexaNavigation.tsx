"use client";

import {
  Building2,
  CircleHelp,
  History,
  MessageCircle,
  MessageSquareText,
  Phone,
  Sparkles,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { CodexaLogo } from "../shared/CodexaLogo";
import {
  CODEXA_ROUTES,
  codexaCompanyMenuGroups,
  codexaPrimaryNavigation,
  type CodexaMenuIcon,
} from "../shared/codexaSiteConfig";

import styles from "./CodexaNavigation.module.css";

const menuIcons: Record<CodexaMenuIcon, typeof Building2> = {
  about: Building2,
  blog: MessageSquareText,
  careers: UsersRound,
  changelog: History,
  faqs: CircleHelp,
  features: Sparkles,
  sales: Phone,
  support: MessageCircle,
};

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
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);

  // Stop the page behind the mobile menu from scrolling while it is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <header
      className={styles.shell}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setCompanyMenuOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setCompanyMenuOpen(false);
        }
      }}
      onMouseLeave={() => setCompanyMenuOpen(false)}
    >
      <nav className={styles.inner} aria-label="Main navigation">
        <Link
          className={styles.brand}
          href="/"
          aria-label="Codexa home"
          onMouseEnter={() => setCompanyMenuOpen(false)}
        >
          <CodexaLogo />
        </Link>

        <div className={styles.links}>
          {codexaPrimaryNavigation.map((link) => (
            <Link
              aria-expanded={link.expandable ? companyMenuOpen : undefined}
              aria-haspopup={link.expandable ? "true" : undefined}
              className={`${styles.link} ${
                link.expandable && companyMenuOpen ? styles.linkOpen : ""
              }`}
              href={link.href}
              key={link.label}
              onFocus={() => setCompanyMenuOpen(link.expandable)}
              onMouseEnter={() => setCompanyMenuOpen(link.expandable)}
            >
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

        <div
          className={styles.actions}
          onMouseEnter={() => setCompanyMenuOpen(false)}
        >
          <Link
            className={`${styles.action} ${styles.secondary}`}
            href={CODEXA_ROUTES.support}
          >
            <span className="codexa-sr-only">Contact</span>
            <AnimatedLabel>Contact</AnimatedLabel>
          </Link>
          <Link
            className={`${styles.action} ${styles.primary}`}
            href={CODEXA_ROUTES.sales}
          >
            <span className="codexa-sr-only">Get Started</span>
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
          <span />
        </button>
      </nav>

      {companyMenuOpen ? (
        <div className={styles.companyMenu}>
          <div className={styles.companyMenuInner}>
            <Link
              className={styles.hiringColumn}
              href={CODEXA_ROUTES.careers}
            >
              <span className={styles.menuHeading}>Join Codexa</span>
              <span className={styles.hiringCard}>
                <Image
                  alt=""
                  fill
                  priority
                  sizes="315px"
                  src="/sites/codexa-framer-website-9c43da05/root-8a5edab2/images/codexa-hiring-card.jpg"
                />
                <span className={styles.hiringCopy}>
                  <strong>We’re hiring</strong>
                  <span>
                    Help build modern, scalable products used by teams worldwide.
                  </span>
                </span>
              </span>
            </Link>

            <div className={styles.companyMenuGroups}>
              {codexaCompanyMenuGroups.map((group) => (
                <div className={styles.companyMenuGroup} key={group.title}>
                  <p className={styles.menuHeading}>{group.title}</p>
                  <div className={styles.companyMenuLinks}>
                    {group.links.map((item) => {
                      const Icon = menuIcons[item.icon];

                      return (
                        <Link
                          className={styles.companyMenuLink}
                          href={item.href}
                          key={item.label}
                        >
                          <span className={styles.companyMenuIcon}>
                            <Icon aria-hidden="true" />
                          </span>
                          <span>
                            <strong>{item.label}</strong>
                            <small>{item.description}</small>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {menuOpen ? (
        <nav className={styles.mobileMenu} aria-label="Mobile navigation">
          {codexaPrimaryNavigation.map((link) => (
            <Link href={link.href} key={link.label} onClick={() => setMenuOpen(false)}>
              {link.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
          <div>
            <Link href={CODEXA_ROUTES.support} onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
            <Link href={CODEXA_ROUTES.sales} onClick={() => setMenuOpen(false)}>
              Get Started
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
