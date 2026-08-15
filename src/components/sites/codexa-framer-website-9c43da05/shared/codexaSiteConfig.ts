export const CODEXA_ROUTES = {
  home: "/codexa",
  features: "/codexa/product/features",
  pricing: "/codexa/product/pricing",
  changelog: "/codexa/product/changelog",
  faqs: "/codexa/product/faqs",
  about: "/codexa/company/about",
  blog: "/codexa/company/blog",
  careers: "/codexa/company/careers",
  support: "/codexa/company/support",
  sales: "/codexa/company/sales",
  terms: "/codexa/legal/terms-and-conditions",
  privacy: "/codexa/legal/privacy-policy",
  cookies: "/codexa/legal/cookie-policy",
  notFound: "/codexa/404",
} as const;

export type CodexaMenuIcon =
  | "about"
  | "blog"
  | "careers"
  | "changelog"
  | "faqs"
  | "features"
  | "sales"
  | "support";

export const codexaPrimaryNavigation = [
  { label: "Features", href: CODEXA_ROUTES.features, expandable: false },
  { label: "Pricing", href: CODEXA_ROUTES.pricing, expandable: false },
  { label: "Changelog", href: CODEXA_ROUTES.changelog, expandable: false },
  { label: "Company", href: CODEXA_ROUTES.about, expandable: true },
  { label: "FAQs", href: CODEXA_ROUTES.faqs, expandable: false },
] as const;

export const codexaCompanyMenuGroups: readonly {
  title: string;
  links: readonly {
    label: string;
    description: string;
    href: string;
    icon: CodexaMenuIcon;
  }[];
}[] = [
  {
    title: "Company",
    links: [
      {
        label: "About Codexa",
        description: "Our story, values, and vision",
        href: `${CODEXA_ROUTES.about}#about`,
        icon: "about",
      },
      {
        label: "Careers",
        description: "Open roles and opportunities at Codexa",
        href: CODEXA_ROUTES.careers,
        icon: "careers",
      },
      {
        label: "Support",
        description: "Help, guidance, and product assistance",
        href: `${CODEXA_ROUTES.support}#support`,
        icon: "support",
      },
      {
        label: "Sales",
        description: "Talk to our team about your needs",
        href: `${CODEXA_ROUTES.sales}#sales`,
        icon: "sales",
      },
    ],
  },
  {
    title: "Product",
    links: [
      {
        label: "Features",
        description: "Explore Codexa’s core capabilities",
        href: `${CODEXA_ROUTES.features}#features`,
        icon: "features",
      },
      {
        label: "Changelog",
        description: "See what’s new and improved",
        href: `${CODEXA_ROUTES.changelog}#changelog`,
        icon: "changelog",
      },
      {
        label: "FAQs",
        description: "Quick answers about the product",
        href: `${CODEXA_ROUTES.faqs}#faqs`,
        icon: "faqs",
      },
      {
        label: "Blog",
        description: "Updates, insights, and product thinking",
        href: `${CODEXA_ROUTES.blog}#blog`,
        icon: "blog",
      },
    ],
  },
];

export const codexaFooterGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: CODEXA_ROUTES.features },
      { label: "Pricing", href: CODEXA_ROUTES.pricing },
      { label: "Changelog", href: CODEXA_ROUTES.changelog },
      { label: "FAQs", href: CODEXA_ROUTES.faqs },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: CODEXA_ROUTES.about },
      { label: "Blog", href: CODEXA_ROUTES.blog },
      { label: "Support", href: CODEXA_ROUTES.support },
      { label: "Sales", href: CODEXA_ROUTES.sales },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: CODEXA_ROUTES.terms },
      { label: "Privacy", href: CODEXA_ROUTES.privacy },
      { label: "Cookies", href: CODEXA_ROUTES.cookies },
      { label: "404", href: CODEXA_ROUTES.notFound },
    ],
  },
] as const;
