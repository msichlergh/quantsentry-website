export type Tier = {
  name: string;
  positioning: string;
  monthlyPrice: number | null;
  priceNote: string;
  ctaLabel: string;
  ctaHref: string;
  featured: boolean;
  features: string[];
};

export const tiers: Tier[] = [
  {
    name: "Desk",
    positioning: "For a single book that needs a real-time exposure map.",
    monthlyPrice: 2400,
    priceNote: "per book, billed to your desk",
    ctaLabel: "Start with Desk",
    ctaHref: "/contact-us",
    featured: false,
    features: [
      "Atlas exposure map for one book",
      "Up to 2 prime broker connections",
      "1 OMS/EMS connection",
      "Query — 200 risk questions / month",
      "Daily position & P&L reconciliation",
      "Standard market data feeds",
      "Email support, next-business-day SLA",
    ],
  },
  {
    name: "Platform",
    positioning: "For multi-book funds that need one view across strategies.",
    monthlyPrice: 7500,
    priceNote: "per firm, up to 8 books",
    ctaLabel: "Start with Platform",
    ctaHref: "/contact-us",
    featured: true,
    features: [
      "Atlas exposure map across all books",
      "Up to 8 prime broker connections",
      "Unlimited OMS/EMS connections",
      "Query — unlimited risk questions",
      "Sentinel drift & anomaly detection",
      "Custom risk factor models",
      "Intraday reconciliation & alerting",
      "Priority support, 4-hour SLA",
    ],
  },
  {
    name: "Enterprise",
    positioning: "For platforms and allocators running dozens of strategies.",
    monthlyPrice: null,
    priceNote: "scoped to books, venues and data volume",
    ctaLabel: "Talk to sales",
    ctaHref: "/contact-us",
    featured: false,
    features: [
      "Everything in Platform, unlimited books",
      "Unlimited prime broker & OMS connections",
      "Dedicated data pipeline & onboarding team",
      "Custom risk models & scenario libraries",
      "SSO/SAML, SCIM and audit-grade logging",
      "Dedicated Slack channel + 1-hour SLA",
      "Named solutions architect",
    ],
  },
];

export type ComparisonCell = boolean | string;

export type ComparisonRow = {
  label: string;
  desk: ComparisonCell;
  platform: ComparisonCell;
  enterprise: ComparisonCell;
};

export type ComparisonGroup = {
  category: string;
  rows: ComparisonRow[];
};

export const comparisonGroups: ComparisonGroup[] = [
  {
    category: "Data & coverage",
    rows: [
      { label: "Prime broker connections", desk: "Up to 2", platform: "Up to 8", enterprise: "Unlimited" },
      { label: "OMS/EMS connections", desk: "1", platform: "Unlimited", enterprise: "Unlimited" },
      { label: "Live market data feeds", desk: "Standard", platform: "Standard + premium", enterprise: "Any licensed feed" },
      { label: "Historical data lookback", desk: "2 years", platform: "7 years", enterprise: "Unlimited" },
      { label: "Custom data connectors", desk: false, platform: "1 included", enterprise: "Unlimited" },
    ],
  },
  {
    category: "Risk & analytics",
    rows: [
      { label: "Atlas exposure mapping", desk: true, platform: true, enterprise: true },
      { label: "Query natural-language risk questions", desk: "200 / month", platform: "Unlimited", enterprise: "Unlimited" },
      { label: "Sentinel drift & anomaly detection", desk: false, platform: true, enterprise: true },
      { label: "Custom risk factor models", desk: false, platform: true, enterprise: true },
      { label: "Stress testing & scenario libraries", desk: false, platform: "Standard library", enterprise: "Custom library" },
      { label: "REST API & webhooks", desk: false, platform: true, enterprise: true },
    ],
  },
  {
    category: "Security & support",
    rows: [
      { label: "SSO / SAML", desk: false, platform: true, enterprise: true },
      { label: "Audit log retention", desk: "90 days", platform: "1 year", enterprise: "7 years" },
      { label: "Support SLA", desk: "Next business day", platform: "4 hours", enterprise: "1 hour" },
    ],
  },
];

export const includedInEveryPlan: { title: string; body: string }[] = [
  {
    title: "SOC 2 Type II infrastructure",
    body: "Every environment runs on the same audited, encrypted-at-rest infrastructure — no tier gates security.",
  },
  {
    title: "Read-only broker connections",
    body: "We never place or route orders. Connections are read-only against your prime broker and OMS.",
  },
  {
    title: "Guided onboarding",
    body: "A solutions engineer maps your first book and validates positions against your broker statement.",
  },
  {
    title: "No seat limits",
    body: "Invite your whole risk, PM and ops team at every tier — we price on books, not logins.",
  },
];

export const pricingFaqs: { question: string; answer: string }[] = [
  {
    question: "How is a \"book\" defined for pricing?",
    answer:
      "A book is any strategy or sub-portfolio you want mapped and monitored independently — typically one PM's book or one fund vehicle. Desk covers one book; Platform covers up to eight.",
  },
  {
    question: "What happens if we exceed our Query limit on Desk?",
    answer:
      "We notify you at 80% usage. You can purchase a Query top-up block or upgrade to Platform for unlimited queries — nothing is throttled mid-month without warning.",
  },
  {
    question: "Do you require a long-term contract?",
    answer:
      "Desk and Platform are month-to-month after an initial 3-month onboarding term. Enterprise agreements are typically annual with volume-based pricing.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "Most desks are live within 5 business days of connecting a prime broker and OMS. Enterprise rollouts across multiple books typically take 2–4 weeks.",
  },
  {
    question: "Can we start on Desk and move to Platform later?",
    answer:
      "Yes — upgrades take effect on your next billing cycle and carry over your existing connections, saved queries and alert configuration with no re-onboarding.",
  },
  {
    question: "Is there a discount for annual billing?",
    answer:
      "Annual billing is roughly two months free versus paying monthly — the toggle above shows the exact annual rate for each tier.",
  },
];
