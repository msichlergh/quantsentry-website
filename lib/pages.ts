// `label` is the short page name used for breadcrumbs (visible and in
// BreadcrumbList JSON-LD). `title` is the search-result title and carries the
// query the page targets, so it is too long to double as a breadcrumb.
export const pages = {
  "argus": {
    "label": "Argus AI",
    "title": "Argus AI: AI Analyst for Trading Businesses | QuantSentry",
    "description": "Ask questions, monitor your business and research the market using connected company data and cited public sources."
  },
  "company": {
    "label": "Company",
    "title": "Company | QuantSentry",
    "description": "Learn about QuantSentry, the connected data and risk platform from Quant Technology Group."
  },
  "compare": {
    "label": "Trading Risk Comparison",
    "title": "Prop Firm Risk Tools Compared | QuantSentry",
    "description": "Compare common trading risk tools, from basic rule checks to coordinated abuse detection."
  },
  "custom-bi": {
    "label": "Business Intelligence",
    "title": "Prop Firm Analytics & Business Intelligence | QuantSentry",
    "description": "Connect supported business data in read-only mode and see your most important numbers in one place with Argus AI."
  },
  "demo": {
    "label": "Book a Demo",
    "title": "Book a Demo | QuantSentry",
    "description": "See how QuantSentry can connect your data, answer business questions and find risks and opportunities."
  },
  "diagnostic": {
    "label": "Risk Blind Spot Finder",
    "title": "Risk Blind Spot Finder | QuantSentry",
    "description": "Answer six questions about your risk process and receive a clear summary of possible gaps."
  },
  "index": {
    "label": "Home",
    "title": "QuantSentry | Risk & Data Intelligence for Prop Firms",
    "description": "Bring your business data together. Use Argus AI to find risks and opportunities, get clear answers and decide what to do next."
  },
  "industries-brokerages": {
    "label": "Brokerages",
    "title": "Broker Risk Management & Toxic Flow Detection | QuantSentry",
    "description": "Find toxic flow, latency abuse and bonus fraud across brokerage accounts, with evidence your team can review."
  },
  "industries-funds": {
    "label": "Funds and Asset Managers",
    "title": "Funds and Asset Managers | QuantSentry",
    "description": "Find allocation issues, front-running patterns and mandate breaches in executed trades."
  },
  "industries-payments": {
    "label": "Payments and Fintech",
    "title": "Payments and Fintech | QuantSentry",
    "description": "Find linked identities, chargeback rings and mule networks behind suspicious transactions."
  },
  "industries-prop-trading": {
    "label": "Prop Trading",
    "title": "Trading Abuse Detection for Prop Firms | QuantSentry",
    "description": "Detect coordinated trading abuse and review clear evidence before approving a payout."
  },
  "industries": {
    "label": "Industries",
    "title": "Industries | QuantSentry",
    "description": "Prop trading is live. Coverage for brokerages, funds and payments businesses is coming soon."
  },
  "industry-intelligence": {
    "label": "Industry Intelligence",
    "title": "Industry Intelligence | QuantSentry",
    "description": "Track competitor rules, pricing, payout terms and product changes with sources collected by Argus AI."
  },
  "integrations": {
    "label": "Integrations",
    "title": "Integrations | QuantSentry",
    "description": "Connect QuantSentry to the trading platforms, payment systems, identity tools, support channels and acquisition sources your team already uses."
  },
  "managed-desk": {
    "label": "Managed Risk Service",
    "title": "Managed Risk Service for Prop Firms | QuantSentry",
    "description": "Add a named risk analyst who reviews your queue in QuantSentry and sends clear recommendations with supporting evidence."
  },
  "network": {
    "label": "Sentry Risk Network",
    "title": "Sentry Risk Network for Prop Firm Fraud | QuantSentry",
    "description": "Check opt-in risk signals from other members without sharing names, trades or customer records."
  },
  "platform": {
    "label": "Platform",
    "title": "Prop Firm Risk Management Software | QuantSentry",
    "description": "Connect business data, detect trading abuse, build dashboards and use Argus AI from one platform."
  },
  "pricing": {
    "label": "Pricing",
    "title": "Pricing: Prop Firm Risk Software from €750/mo | QuantSentry",
    "description": "Three plans: Network, Platform and Risk Desk. Platform pricing scales with monthly active trading accounts, and annual billing saves 20%."
  },
  "proof": {
    "label": "Success Stories",
    "title": "Prop Firm Abuse Case Study: 100 Cases Found | QuantSentry",
    "description": "See how QuantSentry found and documented 100 confirmed abuse cases in one anonymised customer account set."
  },
  "roadmap": {
    "label": "Roadmap",
    "title": "Roadmap | QuantSentry",
    "description": "See what is live today, what is coming next and what the QuantSentry team is exploring."
  }
} as const;

export type PageSlug = keyof typeof pages;
