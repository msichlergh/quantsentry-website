export const insightCategories = [
  "Company News",
  "Industry Insights",
  "Product Updates",
  "Event Recaps",
] as const;

export type InsightCategory = (typeof insightCategories)[number];

export type InsightAuthor = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedIn: string;
};

export type InsightSection = {
  heading: string;
  paragraphs: readonly string[];
  /** Rendered as a bulleted list after the paragraphs. */
  list?: readonly string[];
  /** A pull quote closing the section. */
  quote?: { text: string; name: string; role: string };
};

export type InsightArticle = {
  slug: string;
  title: string;
  summary: string;
  category: InsightCategory;
  publishedAt: string;
  publishedLabel: string;
  readTime: string;
  authorSlug: string;
  /**
   * Set only on editions adapted from another site's post. Articles that
   * quantsentry.com owns (the canonical version lives here) carry none.
   */
  sourceUrl?: string;
  /**
   * Absolute canonical URL when another site owns the article. The page stays
   * readable here but points search engines at the original and is left out
   * of the sitemap.
   */
  canonicalUrl?: string;
  sections: readonly InsightSection[];
  takeaway: string;
};

export const insightAuthors = [
  {
    slug: "akash-thakrar",
    name: "Akash Thakrar",
    role: "Head of Corporate Development",
    bio: "Akash helps trading firms use risk and business data to make better decisions.",
    image: "/images/team/Akash-Thakrar.webp",
    linkedIn: "https://www.linkedin.com/in/akashthakrar/",
  },
  {
    slug: "leonard-breitkopf",
    name: "Leonard Breitkopf",
    role: "Chief Technology Officer",
    bio: "Leonard leads platform engineering across Quant Technology Group, with a focus on reliable systems for growing trading businesses.",
    image: "/images/team/Leonard-Breitkopf.webp",
    linkedIn: "https://www.linkedin.com/in/leonardbreitkopf/?skipRedirect=true",
  },
  {
    slug: "milos-mosovsky",
    name: "Milos Mosovsky",
    role: "Head of R&D",
    bio: "Milos leads the AI research behind QuantSentry, from finding trading patterns to presenting clear evidence.",
    image: "/images/team/Milos-Mosovsky.webp",
    linkedIn: "https://www.linkedin.com/in/mosovsky/",
  },
  {
    slug: "markus-sichler",
    name: "Markus Sichler",
    role: "Co-Founder",
    bio: "Markus helps shape the technology, risk, and infrastructure that Quant Technology Group builds for modern prop firms and brokers.",
    image: "/images/team/Markus-Sichler.webp",
    linkedIn: "https://www.linkedin.com/in/msichler/",
  },
] as const satisfies readonly InsightAuthor[];

export const insightArticles = [
  {
    slug: "why-prop-firms-need-dedicated-risk-management",
    title: "Why Prop Firms Need Dedicated Risk Management",
    summary:
      "How dedicated risk management helps prop firms protect payouts and make faster, more consistent decisions.",
    category: "Industry Insights",
    publishedAt: "2026-06-05",
    publishedLabel: "5 Jun 2026",
    readTime: "6 min read",
    authorSlug: "akash-thakrar",
    sections: [
      {
        heading: "Risk Is More Than a Fraud Filter",
        paragraphs: [
          "For years, risk management at retail prop firms was treated as a defensive afterthought, a way to catch the obvious cheaters before they drained the payout pool. In 2026 that framing is no longer enough. The firms scaling fastest now treat risk as their most valuable source of business and data intelligence.",
        ],
      },
      {
        heading: "The 2026 Shift: From Fraud Detection to Business Intelligence",
        paragraphs: [
          "The retail prop industry professionalised faster than its tooling did. Account volumes grew, challenge models multiplied and payout structures became more complex, while most firms still ran risk on spreadsheets and a part-time analyst. The result was predictable: enforcement drifted, investigations became firefighting, and decisions were made on gut feel rather than data.",
          "What changed in 2026 is the realisation that the data used to catch abuse is the richest dataset a prop firm owns. Every evaluation, every trade and every payout request is a signal, not only about fraud but about which products convert, which trader cohorts stay, where margin leaks, and which rules quietly push good traders away. Risk stopped being a cost centre and became the firm's analytics backbone.",
        ],
        quote: {
          name: "Akash Thakrar",
          role: "Head of Corporate Development, QuantSentry",
          text: "The firms winning in 2026 don't ask whether they caught the cheaters. They ask what their data is telling them about the business. Fraud detection is table stakes. The real edge is turning every risk signal into a decision about your model, for the trader and the operator.",
        },
      },
      {
        heading: "The Hidden Data Inside Your Prop Firm",
        paragraphs: [
          "Most operators are sitting on answers they have never queried. The data exists, but it is trapped in disconnected platforms, bridges and payment logs. A dedicated risk function brings it together and surfaces what was previously invisible:",
        ],
        list: [
          "Coordinated behaviour across accounts, such as copy trading, hedging rings and multi-accounting, that no single-account view can reveal.",
          "Which challenge types and price points produce profitable, long-lasting traders, and which produce one-and-done churn.",
          "Where payout leakage starts, and which rule thresholds quietly cost margin or drive good traders away.",
          "Early signs of platform abuse, latency arbitrage and feed exploitation before they reach the balance sheet.",
        ],
      },
      {
        heading: "Optimising for Both Sides: Trader and Operator",
        paragraphs: [
          "Done well, intelligence-led risk management is not adversarial to traders. It improves their experience. When a firm understands its data, it can price challenges fairly, reward genuine skill, resolve disputes with evidence instead of suspicion, and release legitimate payouts faster. Honest traders stop being punished for the behaviour of bad actors.",
          "For the operator, the same engine protects capital, sharpens the product roadmap, and makes the business model defensible to partners and regulators. One dataset serves both sides of the relationship.",
        ],
      },
      {
        heading: "Why a Dedicated Function, Not a Part-Time Task",
        paragraphs: [
          "Risk reviewed when there is time scales with headcount and breaks the moment volume spikes. A dedicated function, backed by the right infrastructure, scales with the firm instead of against it: consistent enforcement, prioritised investigations, and a continuous feedback loop from data back into the business model. It is the difference between reacting to last month's losses and shaping next quarter's strategy.",
        ],
      },
      {
        heading: "How QuantSentry Brings It Together",
        paragraphs: [
          "QuantSentry was built for this reality: one platform that combines fraud detection, business intelligence and data analysis across the data a prop firm already holds.",
        ],
        list: [
          "Fraud and abuse detection: network-based detection of copy trading, hedging schemes and multi-accounting, flagged before payouts are released.",
          "Business intelligence: evaluations, trades, payouts and cohorts in one live view of what is driving, or draining, the business.",
          "Deep data analysis: hidden patterns and relationships across accounts and platforms, turned into decisions your team can act on.",
          "Evidence your team can stand behind: alerts prioritised by risk, with full trade context and Evidence Kits for terms enforcement and disputes.",
        ],
      },
    ],
    takeaway:
      "Dedicated risk management is no longer just a fraud shield. It is the intelligence layer of a prop firm. Operators who treat their risk data as a business asset will out-perform those who treat it as a cost.",
  },
  {
    slug: "quantsentry-generally-available",
    title: "QuantSentry Is Now Available",
    summary:
      "Live risk detection and connected evidence for prop firms, with every final decision kept under human control.",
    category: "Product Updates",
    publishedAt: "2026-02-10",
    publishedLabel: "10 Feb 2026",
    readTime: "4 min read",
    authorSlug: "milos-mosovsky",
    sections: [
      {
        heading: "QuantSentry Is Generally Available",
        paragraphs: [
          "Dubai, 10 February 2026. Quant Technology Group today announced the general availability of QuantSentry, a risk management platform built for proprietary trading firms of every size, from early-stage operators to global market leaders.",
          "QuantSentry replaces manual oversight and fragmented legacy tooling with an automated risk engine that detects coordinated trading abuse, applies risk rules consistently, and protects firm capital as operations scale.",
        ],
      },
      {
        heading: "Built for the Reality of Modern Prop Firms",
        paragraphs: [
          "Modern prop firms operate in an environment legacy risk systems were never designed for. As firms grow from hundreds to thousands of active accounts, enforcement becomes inconsistent, reviews slow down, and investigations turn into manual firefighting. The result is payout leakage and shrinking margins.",
          "QuantSentry closes this gap with a cloud-based architecture that keeps detection consistent as account volume grows, helping firms protect margins while reducing operational drag.",
        ],
        quote: {
          name: "Akash Thakrar",
          role: "Head of Corporate Development, QuantSentry",
          text: "Legacy risk tooling was never designed for the scale and complexity of modern prop firm operations. QuantSentry applies network-based analysis to enforce risk rules consistently as firms grow.",
        },
      },
      {
        heading: "Operational and Financial Impact",
        paragraphs: [
          "QuantSentry is built to deliver measurable results across operations, risk and finance from the first day:",
        ],
        list: [
          "More accurate payouts, by validating trader behaviour before funds are released.",
          "Abusive trading, including copy trading, hedging schemes and multi-accounting, identified before fraudulent payouts go out.",
          "Shorter investigations, through alerts prioritised by risk.",
          "Leaner risk teams that keep control and compliance as volume grows.",
        ],
      },
      {
        heading: "Core Capabilities",
        paragraphs: [
          "By automating detection and evidence gathering, firms can scale with confidence while keeping strong risk governance. Every final decision stays with the firm's own team.",
        ],
        list: [
          "Scalable risk infrastructure: a cloud platform that grows from early-stage operations to thousands of active accounts with consistent enforcement.",
          "Abuse detection: network analysis and machine-learning models identify coordinated abuse such as copy trading, hedging schemes and multi-accounting before payouts occur.",
          "Investigations and audit readiness: alerts prioritised by risk, full trade context, a complete audit trail and PDF Evidence Kits for terms enforcement and reporting.",
          "Integration: read-only connections to major trading platforms and bridges, so firms can start without migration risk.",
        ],
      },
      {
        heading: "Plans and Pricing",
        paragraphs: [
          "QuantSentry launched in four tiers, from Starter to Enterprise. Pricing has since moved to three plans priced on active accounts: Network, Platform and the Managed Risk Service. Current prices are on the QuantSentry pricing page.",
        ],
      },
      {
        heading: "About Quant Technology Group",
        paragraphs: [
          "Quant Technology Group builds trading and risk infrastructure for proprietary trading firms and financial institutions. QuantSentry is its flagship risk platform for modern proprietary trading operations.",
        ],
      },
    ],
    takeaway:
      "QuantSentry replaces manual oversight with automated, network-aware detection, protecting payout integrity and capital as firms grow from their first hundred accounts to tens of thousands.",
  },
  {
    slug: "modern-risk-infrastructure-prop-firms",
    title: "What Modern Risk Management Looks Like for Prop Firms",
    summary:
      "A practical approach to live rule checks, risk monitoring, pattern detection and clear evidence.",
    category: "Industry Insights",
    publishedAt: "2026-03-31",
    publishedLabel: "31 Mar 2026",
    readTime: "5 min read",
    authorSlug: "leonard-breitkopf",
    sections: [
      {
        heading: "Where the Money Lives",
        paragraphs: [
          "Risk is where a prop firm's money is won or lost, and it is the function most often run on the least infrastructure. A spreadsheet, a couple of analysts and a lot of after-the-fact review works until it doesn't, and when it stops working, it stops working expensively. Modern risk infrastructure is what lets a firm enforce its rules consistently at any scale.",
        ],
      },
      {
        heading: "The Manual Wall",
        paragraphs: [
          "Manual review has a hard ceiling. An analyst can keep a few hundred accounts in mind and spot the obvious problems. At a few thousand, the obvious problems hide in the volume. At tens of thousands, review becomes sampling, and sampling means the breach you didn't look at is the one that pays out.",
          "Hiring more analysts pushes the wall back a little but never removes it. The model grows with headcount; trader volume does not wait for hiring.",
        ],
      },
      {
        heading: "The Four Layers of Real Risk Infrastructure",
        paragraphs: [
          "A risk system that scales is built in layers, each handling what the one above cannot:",
        ],
        list: [
          "Rule enforcement: drawdown limits, profit targets, time-of-day constraints and consistency rules applied to every account automatically, not checked by hand afterwards.",
          "Exposure and positions: live aggregate exposure, overnight risk and concentration, so the firm knows its real position before the market moves.",
          "Behavioural detection: network-level patterns such as copy trading, hedging rings, multi-accounting, and latency or feed abuse that no single-account view can catch.",
          "Evidence and audit: every flag backed by full trade context and exportable evidence for terms enforcement, disputes and reporting.",
        ],
      },
      {
        heading: "Why Real Time Matters",
        paragraphs: [
          "Modern risk infrastructure works in the same timeframe as the trading it watches. Risk reviewed at month-end tells you what you already lost. Risk evaluated as trades happen lets you act before a fraudulent payout is released or a breach compounds. Moving from retrospective to real time is the biggest single difference between a firm that absorbs losses and one that prevents them.",
        ],
        quote: {
          name: "Leonard Breitkopf",
          role: "Chief Technology Officer, Quant Technology Group",
          text: "The mistake firms make is treating risk as a report they read later. Modern risk infrastructure is a system that runs in the moment, enforcing rules as trades land and surfacing patterns as they form. You can't prevent what you only see at month-end.",
        },
      },
      {
        heading: "The Role of AI: Support, Not Replacement",
        paragraphs: [
          "AI belongs in risk infrastructure, in a specific role: handling the scale and surfacing the signal, not making the final call. Pattern detection across tens of thousands of accounts is beyond human capacity, and that is where models earn their place.",
          "The decision to enforce, withhold a payout or ban an account carries consequences and accountability, and that judgement should stay with a risk professional. The right design uses AI to prioritise and gather evidence, and leaves the verdict to a person.",
        ],
      },
      {
        heading: "Evidence, Not Suspicion",
        paragraphs: [
          "A risk decision a firm cannot defend is a liability, even when it is correct. Modern infrastructure treats evidence as a first-class output: every flag arrives with the trade history, the rule involved and the context that explains it, ready to support terms enforcement, settle a dispute or answer a regulator.",
          "This is what lets a firm act decisively and fairly at the same time. Honest traders are cleared with evidence, bad actors are removed with evidence, and the firm can stand behind every call.",
        ],
      },
    ],
    takeaway:
      "Manual review does not scale, and the answer is not more analysts. It is layered infrastructure running in real time: automatic rule enforcement, live exposure, behavioural detection and audit-ready evidence, with AI handling the scale and people making the decisions.",
  },
  {
    slug: "ai-agents-reduce-support-workload",
    title: "How AI Agents Can Reduce Support Workload for Trading Businesses",
    summary:
      "Where AI can reduce repetitive support work, and where a person must stay involved.",
    category: "Industry Insights",
    publishedAt: "2026-04-14",
    publishedLabel: "14 Apr 2026",
    readTime: "5 min read",
    authorSlug: "milos-mosovsky",
    sections: [
      {
        heading: "Beyond Chatbot Theatre",
        paragraphs: [
          "Most AI-for-support pitches are a chat widget on a help page that deflects a few FAQs and frustrates everyone else. That is not where the value is. In a trading business, support is buried in repetitive, context-heavy work, and that is exactly the work well-built AI agents can take off the team, if they are connected to the right data.",
          "The difference between a chatbot and an agent is access and action. A chatbot answers from a script. An agent reads the trader's actual account state, understands the question in that context, and either resolves it or hands it to a person with everything already gathered. For a prop firm or broker drowning in tickets, only the second is worth deploying.",
        ],
      },
      {
        heading: "Where Agents Actually Help",
        paragraphs: [
          "The best targets are tickets that are high in volume, low in judgement, and answerable from data the firm already holds:",
        ],
        list: [
          "Account and status questions, such as where a payout is, whether a trader passed, or why an account was flagged, answered instantly from live account state instead of a 24-hour ticket cycle.",
          "KYC and onboarding follow-up: chasing missing documents, explaining rejections and guiding resubmission without an operator on every case.",
          "Ticket triage and routing: every ticket classified, enriched with account context, and routed to the right queue or resolved.",
          "Answers grounded in the firm's own policies, so rule explanations come from real terms rather than a generic model's guess.",
        ],
      },
      {
        heading: "Why Context Is Everything",
        paragraphs: [
          "An agent is only as useful as the context it can see. A generic model with no access to the trader's account is a liability, because it will confidently invent an answer. An agent connected to the firm's systems knows whether this trader passed, which rule they breached and where their payout sits. That grounding is what turns AI support from a risk into a real reduction in workload.",
        ],
        quote: {
          name: "Milos Mosovsky",
          role: "Head of R&D, Quant Technology Group",
          text: "The teams that get value from AI agents aren't the ones with the fanciest model. They're the ones who gave the agent real context and a narrow, well-defined job. An agent that can see the account and knows when to stop and ask a human beats a clever one that guesses every time.",
        },
      },
      {
        heading: "Keeping Judgement in the Loop",
        paragraphs: [
          "The goal is not to remove operators. It is to stop spending them on work that needs no judgement. Anything involving money, disputes or risk should go to a person with the context already assembled. The agent handles the volume and the gathering; the operator makes the call.",
        ],
      },
      {
        heading: "How to Deploy Without Regret",
        paragraphs: [
          "Start narrow. Pick one high-volume, low-risk ticket type, ground the agent in real account data and real policies, and measure deflection and accuracy before widening the scope. Keep a clean handoff to people with full context, and make every agent action auditable.",
          "Expand one category at a time as trust builds. Firms that try to automate everything on day one usually walk it back; the ones that compound wins do it one well-scoped job at a time.",
        ],
      },
    ],
    takeaway:
      "AI agents reduce support workload when they are grounded in real account context, scoped to high-volume, low-judgement work, and built to hand off cleanly to people for anything involving money or risk.",
  },
  {
    slug: "outgrowing-fragmented-infrastructure",
    title: "Why Disconnected Tools Slow Trading Businesses",
    summary:
      "Disconnected CRM, payout and risk tools create more manual work as a trading business grows.",
    category: "Industry Insights",
    publishedAt: "2026-04-28",
    publishedLabel: "28 Apr 2026",
    readTime: "5 min read",
    authorSlug: "leonard-breitkopf",
    sections: [
      {
        heading: "The Accidental Stack",
        paragraphs: [
          "Almost no trading business sets out to build a fragmented stack. It happens one reasonable decision at a time: a CRM here, a payments tool there, a risk spreadsheet a contractor wrote two years ago. Each choice made sense on its own. Together they become the biggest thing holding the firm back.",
          "A growing prop firm or broker typically runs five to ten disconnected systems: a CRM for onboarding, a separate tool for challenges and evaluations, a payment provider, a bridge to the trading platform, a reporting layer built from exports, and almost always a wall of spreadsheets covering what nothing else does. None of them were designed to talk to each other, so the firm's own people become the integration layer.",
          "At a few hundred accounts, a capable operations team can move data between systems by hand and keep the picture roughly right. The problem is that this model grows with headcount and breaks as volume rises. The cost never shows up as a line item. It shows up as slowness, errors and risk you cannot see.",
        ],
      },
      {
        heading: "The Silent Tax",
        paragraphs: [
          "Fragmentation charges interest every day, in four ways:",
        ],
        list: [
          "Time: operators spend hours reconciling exports and re-keying data between systems that should share it automatically.",
          "Errors: every manual handoff is a chance for a payout to reach the wrong account, a rule to be applied inconsistently, or a number to drift.",
          "Blind spots: risk lives in one system, payments in another and behaviour in a third. The signal that matters is the one no single tool can see.",
          "Speed: every new product, region or platform means another integration to build by hand, so the business moves at the pace of its slowest connection.",
        ],
        quote: {
          name: "Leonard Breitkopf",
          role: "Chief Technology Officer, Quant Technology Group",
          text: "The firms that plateau aren't short on ambition or capital. They're spending it servicing the gaps between their tools instead of growing. Fragmentation is a tax you pay in headcount, and it gets more expensive exactly when you can least afford it, during growth.",
        },
      },
      {
        heading: "Where It Breaks",
        paragraphs: [
          "There is a predictable ceiling. Somewhere between a few thousand and tens of thousands of accounts, the manual model stops bending and starts breaking. Support backlogs grow faster than the team can hire. Payout review becomes a bottleneck. Risk decisions lag the trading that triggered them. Month-end reporting takes a week because the numbers are assembled by hand from systems that disagree.",
          "The tell is when the answer to why something is slow is always that someone has to move it from one system to another. That is the sound of infrastructure that has been outgrown.",
        ],
      },
      {
        heading: "What Consolidation Actually Looks Like",
        paragraphs: [
          "Consolidation does not mean buying one large suite and replacing everything over a weekend. Done well, it is the deliberate replacement of hand-built connections with one source of truth that every function reads from. In practice that means:",
        ],
        list: [
          "One source of truth: trader, account and transaction data live in one place, not duplicated across systems that quietly disagree.",
          "Workflows, not exports: onboarding, challenges, payouts and support run as connected workflows on shared data instead of files passed between tools.",
          "Risk in the loop: risk reads the same live data as operations, so exposure and abuse are visible when they happen, not at month-end.",
          "Built to extend: new platforms, regions and products plug into the core instead of creating another custom integration to maintain.",
        ],
      },
      {
        heading: "One Core That Compounds",
        paragraphs: [
          "The deeper payoff of consolidation is not just fewer tools. Every part of the business starts making the others smarter. When risk, payouts, CRM and reporting share one core, a signal caught in one place is useful everywhere. The data stops being something you assemble and becomes something you act on.",
        ],
      },
    ],
    takeaway:
      "Fragmented infrastructure is a tax that grows with the business and comes due during scaling. The fix is not another point tool but one connected core where data lives once and every function works from it.",
  },
  {
    slug: "monevis-technology-assets",
    title: "QTG Acquires Monevis Technology Assets",
    summary:
      "The acquisition brings proven trading analysis, risk technology and an experienced engineering team into the group.",
    category: "Company News",
    publishedAt: "2025-10-01",
    publishedLabel: "1 Oct 2025",
    readTime: "5 min read",
    authorSlug: "markus-sichler",
    sourceUrl:
      "https://quanttechnology.com/insights/quant-technology-group-acquires-monevis-technology-assets",
    // Group corporate news: quanttechnology.com owns this one.
    canonicalUrl:
      "https://quanttechnology.com/insights/quant-technology-group-acquires-monevis-technology-assets",
    sections: [
      {
        heading: "Technology and Expertise Join the Group",
        paragraphs: [
          "The transaction brings tested technology for finding trading patterns and managing risk into Quant Technology Group.",
          "The team that built the technology also joins the group, helping QuantSentry turn research into working product features faster.",
        ],
      },
      {
        heading: "A Stronger Product Roadmap",
        paragraphs: [
          "The acquired technology supports today’s risk products and can help QuantSentry serve more markets over time.",
          "It also strengthens research across identity matching, pattern detection and evidence generation.",
        ],
      },
    ],
    takeaway:
      "QTG added proven risk technology and the people who built it, strengthening QuantSentry’s long-term product roadmap.",
  },
  {
    slug: "ifx-expo-dubai-2026",
    title: "iFX EXPO Dubai 2026",
    summary:
      "Three days of conversations about prop trading technology, risk management and moving between platforms.",
    category: "Event Recaps",
    publishedAt: "2026-02-12",
    publishedLabel: "10–12 Feb 2026",
    readTime: "4 min read",
    authorSlug: "markus-sichler",
    sourceUrl: "https://quanttechnology.com/events",
    sections: [
      {
        heading: "Risk Became a Main Topic",
        paragraphs: [
          "Teams asked practical questions about payout reviews, coordinated trading and connecting data across platforms without creating another separate system.",
          "The strongest discussions focused on how evidence should move from detection to the person making the decision.",
        ],
      },
      {
        heading: "What we brought back",
        paragraphs: [
          "The event reinforced the need for quick integrations and clear investigation views that work for both risk specialists and business leaders.",
          "Those conversations continue to shape QuantSentry’s connector roadmap and the way evidence is presented across the platform.",
        ],
      },
    ],
    takeaway:
      "Trading firms want live risk signals, clear evidence and a simple path from detection to a human decision.",
  },
] as const satisfies readonly InsightArticle[];

export function getInsightAuthor(slug: string) {
  return insightAuthors.find((author) => author.slug === slug);
}

export function getInsightArticle(slug: string): InsightArticle | undefined {
  return insightArticles.find((article) => article.slug === slug);
}

export function getArticlesByAuthor(authorSlug: string): InsightArticle[] {
  return insightArticles
    .filter((article) => article.authorSlug === authorSlug)
    .toSorted((left, right) => right.publishedAt.localeCompare(left.publishedAt));
}
