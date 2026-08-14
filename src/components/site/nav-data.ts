export type NavChild = {
  label: string;
  href: string;
  description: string;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

export const productNav: NavChild[] = [
  {
    label: "Atlas",
    href: "/features/atlas",
    description: "One exposure map across every book, venue and account.",
  },
  {
    label: "Query",
    href: "/features/query",
    description: "Ask risk questions in plain language, get sourced answers.",
  },
  {
    label: "Sentinel",
    href: "/features/sentinel",
    description: "Continuous drift and anomaly detection on live strategies.",
  },
];

export const resourcesNav: NavChild[] = [
  {
    label: "Integrations",
    href: "/integrations",
    description: "Prime brokers, OMS, market data and warehouses.",
  },
  {
    label: "Changelog",
    href: "/changelog",
    description: "What shipped, every week.",
  },
  {
    label: "Blog",
    href: "/blog",
    description: "Notes on risk tooling and market structure.",
  },
  {
    label: "Careers",
    href: "/careers",
    description: "Open roles across engineering and research.",
  },
];

export const mainNav: NavItem[] = [
  { label: "Product", children: productNav },
  { label: "Resources", children: resourcesNav },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about-us" },
];

export const footerNav: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Atlas", href: "/features/atlas" },
      { label: "Query", href: "/features/query" },
      { label: "Sentinel", href: "/features/sentinel" },
      { label: "Integrations", href: "/integrations" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about-us" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact-us" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Changelog", href: "/changelog" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms of service", href: "/terms-of-service" },
    ],
  },
];
