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

const companyMenuGroups = [
  {
    title: "Company",
    links: [
      {
        label: "About Codexa",
        description: "Our story, values, and vision",
        href: "/codexa/company/about#about",
        icon: Building2,
      },
      {
        label: "Careers",
        description: "Open roles and opportunities at Codexa",
        href: "/codexa/company/careers",
        icon: UsersRound,
      },
      {
        label: "Support",
        description: "Help, guidance, and product assistance",
        href: "/codexa/company/support#support",
        icon: MessageCircle,
      },
      {
        label: "Sales",
        description: "Talk to our team about your needs",
        href: "/codexa/company/sales#sales",
        icon: Phone,
      },
    ],
  },
  {
    title: "Product",
    links: [
      {
        label: "Features",
        description: "Explore Codexa’s core capabilities",
        href: "/codexa/product/features#features",
        icon: Sparkles,
      },
      {
        label: "Changelog",
        description: "See what’s new and improved",
        href: "/codexa/product/changelog#changelog",
        icon: History,
      },
      {
        label: "FAQs",
        description: "Quick answers about the product",
        href: "/codexa/product/faqs#faqs",
        icon: CircleHelp,
      },
      {
        label: "Blog",
        description: "Updates, insights, and product thinking",
        href: "/codexa/company/blog#blog",
        icon: MessageSquareText,
      },
    ],
  },
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
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);

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
          {navigationLinks.map((link) => (
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
          <span />
        </button>
      </nav>

      {companyMenuOpen ? (
        <div className={styles.companyMenu}>
          <div className={styles.companyMenuInner}>
            <Link
              className={styles.hiringColumn}
              href="/codexa/company/careers"
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
              {companyMenuGroups.map((group) => (
                <div className={styles.companyMenuGroup} key={group.title}>
                  <p className={styles.menuHeading}>{group.title}</p>
                  <div className={styles.companyMenuLinks}>
                    {group.links.map((item) => {
                      const Icon = item.icon;

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
