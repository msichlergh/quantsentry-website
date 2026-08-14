/**
 * Blog content source. Plain typed data — no MDX, no CMS. The post template
 * (src/app/blog/[slug]/page.tsx) renders `body` from the typed block array below.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[]; ordered?: boolean };

export type Author = {
  name: string;
  role: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  publishedAt: string;
  author: Author;
  body: Block[];
};

export const categories = [
  "Engineering",
  "Risk",
  "Market structure",
  "Product",
] as const;

export const posts: Post[] = [
  {
    slug: "reconciling-exposure-across-three-prime-brokers",
    title: "Reconciling exposure across three prime brokers without losing your afternoon",
    excerpt:
      "Every desk running multi-PB has the same script running in someone's head at 4pm: pull three CSVs, normalize the symbology, pray the breaks are rounding errors. Here's what we learned building the reconciliation layer under Atlas.",
    category: "Engineering",
    readingMinutes: 9,
    publishedAt: "2026-07-28",
    author: { name: "Devon Ashcroft", role: "Founding Engineer" },
    body: [
      {
        type: "p",
        text: "The first time we sat with a multi-PB desk, the risk lead had a spreadsheet open with three tabs, each a different broker's end-of-day position file, and a fourth tab of VLOOKUPs trying to make them agree. The reconciliation wasn't the hard part conceptually — it was hard because it was manual, brittle, and ran once a day when the book turned over four times.",
      },
      {
        type: "p",
        text: "That's the pattern we kept finding: reconciliation isn't a data problem, it's a cadence problem. Everyone can write a script that diffs two position files. Almost nobody has one that stays correct as the universe of instruments, corporate actions, and broker-specific quirks grows underneath it.",
      },
      {
        type: "h2",
        text: "Symbology is where it actually breaks",
      },
      {
        type: "p",
        text: "Prime brokers do not agree on how to name things. One sends CUSIPs, another sends a broker-internal security ID that only resolves through their own reference data API, a third sends a ticker plus exchange code that changes silently after a listing migration. We spent the first six weeks of building Atlas's reconciliation engine not on the diffing logic but on a resolution layer that maps every incoming identifier to a single internal instrument key, with a confidence score and an audit trail for every mapping decision.",
      },
      {
        type: "p",
        text: "The confidence score matters more than it sounds like it should. A fuzzy match on a corporate bond CUSIP that turned out to be a follow-on issuance is a very different kind of wrong than a currency mismatch on an FX forward. We surface both as breaks, but we rank them differently, because a desk's risk officer needs to triage forty breaks in under ten minutes, not read forty equally-weighted diff rows.",
      },
      {
        type: "h2",
        text: "Timing skew is the second-order problem",
      },
      {
        type: "p",
        text: "Even with perfect symbology, positions taken at slightly different cutoffs will disagree. A prime broker's EOD snapshot at 4:15pm ET and your OMS's internal book at 4:00pm ET will differ by whatever traded in that window. This is not a bug in either system — it's two clocks measuring the same thing at different instants. The naive fix is to widen the reconciliation window until the noise goes away, but that just hides real breaks inside timing noise.",
      },
      {
        type: "p",
        text: "What worked for us was tagging every position delta with the trade events that could explain it — a fill, a corporate action, an FX rate refresh — before it ever reaches a human. If a $2M delta on a single name lines up exactly with three fills logged in the OMS between the two snapshot times, that's not a break, that's just two clocks. What's left after that filtering is the set of breaks that actually deserve attention.",
      },
      {
        type: "quote",
        text: "We went from a 45-minute manual reconciliation across three PBs to a live view that flags real breaks within minutes of the position update landing. The team stopped dreading the 4pm scramble.",
        attribution: "Head of Operations, multi-strategy fund (early Atlas design partner)",
      },
      {
        type: "h2",
        text: "What we'd tell a team building this in-house",
      },
      {
        type: "list",
        items: [
          "Build the instrument resolution layer first. Everything downstream depends on it, and it's the part people underestimate.",
          "Treat timing skew as a first-class concept, not an edge case you patch later — it's most of your false positives.",
          "Rank breaks by dollar impact and by how unusual the mapping confidence is, not just by absolute value.",
          "Keep a full audit trail of every automated mapping decision. When compliance asks why a position was auto-resolved, you need the answer in seconds.",
        ],
      },
      {
        type: "p",
        text: "None of this is exotic engineering. It's patient, unglamorous work on data plumbing that most teams don't have the bandwidth to do properly because it isn't the thing that makes money. That's exactly why we built it as infrastructure instead of a one-off script — the problem is the same shape at every multi-PB desk we've talked to.",
      },
    ],
  },
  {
    slug: "why-backtest-envelopes-drift-from-live-pnl",
    title: "Why your backtest envelope drifts from live P&L",
    excerpt:
      "A strategy that backtested inside a tight Sharpe band can wander outside it in production without anything being 'wrong.' The gap usually isn't alpha decay — it's a handful of measurable assumptions quietly breaking.",
    category: "Risk",
    readingMinutes: 11,
    publishedAt: "2026-07-14",
    author: { name: "Elena Marsh", role: "Head of Risk Engineering" },
    body: [
      {
        type: "p",
        text: "'The backtest said this strategy should run at a 1.8 Sharpe with a 6% max drawdown. Three months live, we're at 1.1 and we touched 9%.' We hear a version of this sentence constantly, and the instinct is almost always to blame the alpha — the signal decayed, the edge got arbitraged away, the regime changed. Sometimes that's true. Far more often, the backtest envelope was never actually measuring what the trader thought it was measuring.",
      },
      {
        type: "h2",
        text: "Fill assumptions are the biggest single gap",
      },
      {
        type: "p",
        text: "Most backtests fill at the observed price, sometimes with a flat slippage haircut applied uniformly across the book. Live fills depend on your queue position, the venue's matching logic, how much of the order rests versus sweeps, and how correlated your fills are with the rest of the market moving against you in the same instant. A strategy that trades small size in liquid large caps will barely notice this. A strategy that trades meaningful size in the top of book of a mid-cap name will see a completely different P&L distribution live than in a backtest that assumed uniform fill quality.",
      },
      {
        type: "p",
        text: "The fix isn't a better slippage constant — it's modeling fill quality as a function of the same state variables that determine it in production: spread at time of order, queue depth, your own participation rate. When we rebuilt strategy monitoring for Sentinel, the single highest-leverage change was decomposing realized versus backtested P&L into a signal component and an execution component, because teams kept debugging the wrong half of the gap.",
      },
      {
        type: "h2",
        text: "Survivorship creeps in through universe construction",
      },
      {
        type: "p",
        text: "Even teams that are careful about survivorship bias in price data are often less careful about it in universe construction. If your backtest universe is 'S&P 500 constituents as of today,' you've implicitly removed every name that was delisted, acquired, or dropped from the index for underperforming — which means you've removed a disproportionate share of the worst outcomes. Point-in-time universe construction is more work and it changes the tails of your distribution, which is exactly where drawdown risk lives.",
      },
      {
        type: "h2",
        text: "Regime coverage is a sampling problem, not a modeling problem",
      },
      {
        type: "p",
        text: "A five-year backtest window sounds long until you count how many genuinely distinct volatility regimes it actually contains. If your backtest period happened to avoid a sustained low-liquidity stretch, your envelope has no data to tell you what the strategy does when spreads triple and depth evaporates — it will simply extrapolate from regimes it has seen, confidently and incorrectly.",
      },
      {
        type: "list",
        items: [
          "Decompose live-vs-backtest P&L gaps into signal error and execution error before diagnosing either.",
          "Build universes point-in-time, including names that were later delisted or acquired.",
          "Explicitly label the volatility regimes your backtest window covers, and flag which ones it doesn't.",
          "Re-estimate your fill model quarterly against realized fills, not once at strategy launch.",
          "Track envelope drift as a monitored metric, not something you notice only after a drawdown.",
        ],
      },
      {
        type: "h2",
        text: "What 'drift' should actually trigger",
      },
      {
        type: "p",
        text: "The useful question isn't 'is live P&L inside the backtest envelope this week.' Weekly noise will trip that constantly and desensitize everyone to the alert. The useful question is whether the rolling realized distribution is statistically distinguishable from the backtested one over a window long enough to matter — and whether the gap, if real, traces to execution, to a regime the backtest never saw, or to the signal itself degrading. Those three causes call for three completely different responses: fix the fill model, widen the backtest window, or retire the strategy.",
      },
      {
        type: "quote",
        text: "The moment we started attributing the gap instead of just measuring it, half our 'alpha decay' conversations turned into execution conversations. That's a much cheaper problem to fix.",
        attribution: "Portfolio manager, systematic equity fund",
      },
      {
        type: "p",
        text: "This is the problem Sentinel exists to solve continuously rather than as a quarterly post-mortem exercise: watch the live distribution against the backtested one, attribute the gap, and tell the desk which of the three conversations they're actually having before the drawdown forces the question.",
      },
    ],
  },
  {
    slug: "building-a-query-layer-over-an-exposure-graph",
    title: "Building a query layer over an exposure graph",
    excerpt:
      "'What's our net delta to regional banks if rates move 50bps?' is a question a risk officer should be able to ask in plain language and trust the answer. Getting there meant treating exposure as a graph, not a spreadsheet.",
    category: "Engineering",
    readingMinutes: 10,
    publishedAt: "2026-06-30",
    author: { name: "Priya Raman", role: "Product Engineer, Query" },
    body: [
      {
        type: "p",
        text: "Query started from a complaint, not a feature request. A risk officer at a design partner fund told us: 'I know the answer to most of my questions exists somewhere in our stack. It's in the OMS, or the PB statement, or a script someone wrote eighteen months ago. Finding it takes longer than the question deserves.' That gap — between a question a human can ask in one sentence and the ten minutes of pivot tables required to answer it — is what we set out to close.",
      },
      {
        type: "h2",
        text: "Exposure is naturally a graph, not a table",
      },
      {
        type: "p",
        text: "The first design mistake we avoided, mostly by having tried it and thrown it away, was treating positions as flat rows in a table and bolting natural language on top as a translation layer into SQL. That works for simple questions and falls apart the moment someone asks something that requires traversing relationships: instrument to issuer, issuer to sector, sector to macro factor, position to strategy to fund. Those are edges, and the questions people actually ask are graph traversals wearing plain language as a disguise.",
      },
      {
        type: "p",
        text: "So Atlas's exposure map is built as a graph from the start — positions, instruments, issuers, sectors, factors, and strategies as nodes, with typed, weighted edges between them. 'Net delta to regional banks' is a traversal from a sector node through issuer nodes to positions, aggregated by delta. 'Which strategies would move together in a rates shock' is a traversal through factor exposure edges. The graph structure is what makes both questions the same kind of operation instead of two bespoke reports.",
      },
      {
        type: "h2",
        text: "Plain language has to compile to something inspectable",
      },
      {
        type: "p",
        text: "The part we were most stubborn about: Query never lets a language model just assert a number. Every question compiles to an explicit, typed traversal over the graph — which nodes, which edges, which aggregation — and that traversal is what actually runs and produces the answer. The model's job is translating intent into that traversal and then explaining the result in plain language, not doing arithmetic itself. A risk officer can click through and see exactly which positions fed the number, because in this domain 'trust me' is not an acceptable answer, and it shouldn't be.",
      },
      {
        type: "quote",
        text: "The thing that got Query approved for our desk wasn't that it was fast. It was that every answer showed its work down to the position level. Compliance signed off in one meeting.",
        attribution: "CRO, multi-strategy fund",
      },
      {
        type: "h2",
        text: "Ambiguity has to fail loudly",
      },
      {
        type: "p",
        text: "'Our exposure to tech' is ambiguous — GICS sector, a custom factor tilt, or a manually curated basket someone built in a spreadsheet three years ago? Silently picking one of those interpretations is worse than not answering, because a confidently wrong number is more dangerous than an unanswered question in a risk context. When a question is underspecified, Query surfaces the candidate interpretations and asks, rather than guessing. This slows down the easy 80% of questions slightly. It's non-negotiable for the other 20%.",
      },
      {
        type: "h2",
        text: "What's next",
      },
      {
        type: "p",
        text: "The current frontier for us is conditional queries — 'what would happen to' rather than 'what is' — which means the traversal has to run against a perturbed graph rather than the live one. That's a harder engineering problem than it sounds: the perturbation has to respect the same factor and correlation structure the risk team already trusts elsewhere in Atlas, or the two tools will disagree with each other, which is worse than either being wrong alone.",
      },
      {
        type: "list",
        items: [
          "Model exposure as a typed graph of positions, instruments, issuers, sectors, and factors.",
          "Compile natural language to an explicit, inspectable traversal — never let a model assert a number directly.",
          "Surface ambiguity as clarifying questions instead of picking an interpretation silently.",
          "Keep every answer's provenance clickable down to the position level.",
        ],
      },
    ],
  },
  {
    slug: "t1-settlement-what-actually-breaks-in-the-back-office",
    title: "T+1 settlement: what actually breaks in the back office",
    excerpt:
      "The move to T+1 compressed a full day out of the settlement cycle. Most of the pain didn't land on trading — it landed on the affirmation, FX funding, and exception-handling workflows nobody had budgeted extra time for.",
    category: "Market structure",
    readingMinutes: 7,
    publishedAt: "2026-06-16",
    author: { name: "Marcus Webb", role: "Infrastructure Lead" },
    body: [
      {
        type: "p",
        text: "T+1 didn't change what needs to happen between a trade and settlement. It changed how much time you have to do it, and for a lot of desks that turned latent inefficiencies into hard deadlines. The trades that used to clear affirmation with hours to spare now clear it with minutes, if at all.",
      },
      {
        type: "h2",
        text: "FX funding is the sharpest edge",
      },
      {
        type: "p",
        text: "A US desk trading through a non-US custodian on behalf of an offshore vehicle now has to source same-day FX funding on a compressed timeline, often against a cutoff that lands before the desk has full visibility into the day's final fills. Under T+2 there was slack to true up funding the next morning. Under T+1, a funding shortfall discovered late in the day is a real operational escalation, not a paperwork nuisance.",
      },
      {
        type: "h2",
        text: "Affirmation windows didn't move, trading did",
      },
      {
        type: "p",
        text: "The affirmation cutoff is still effectively the same wall-clock time it always was. What changed is that a much larger share of the day's trading now happens before that cutoff has any slack left in it. Manual allocation and affirmation processes that comfortably cleared under T+2 are now running against the clock, and the exceptions — a broken allocation, a mismatched settlement instruction — have far less runway to get resolved by a human before they become a fail.",
      },
      {
        type: "list",
        items: [
          "Same-day FX funding cutoffs now sit closer to, or before, full visibility into final fills.",
          "Allocation and affirmation exceptions have materially less time to resolve manually.",
          "Cross-border desks feel this disproportionately versus purely domestic US equity flow.",
          "Fail rates rise fastest for desks still reconciling positions in batch rather than continuously.",
        ],
      },
      {
        type: "h2",
        text: "The fix is upstream, not at settlement",
      },
      {
        type: "p",
        text: "Teams that handled the transition cleanly weren't the ones who found a faster settlement process — they were the ones who moved position reconciliation earlier in the day, so allocation breaks surfaced hours before the affirmation cutoff instead of at it. That's an argument for continuous reconciliation over batch, not because batch reconciliation is wrong in principle, but because a compressed settlement cycle removes the slack that used to make batch timing forgivable.",
      },
      {
        type: "quote",
        text: "We didn't fix T+1 by working faster at 6pm. We fixed it by knowing our breaks at 11am instead of finding out at 6pm.",
        attribution: "COO, cross-border long/short fund",
      },
    ],
  },
  {
    slug: "separating-noise-from-regime-change-in-strategy-drift",
    title: "Strategy drift detection: separating noise from regime change",
    excerpt:
      "Every strategy's live P&L wanders from its historical profile constantly. Most of that wandering is noise. The engineering problem is building a detector sensitive enough to catch real drift without paging the desk every Tuesday.",
    category: "Risk",
    readingMinutes: 8,
    publishedAt: "2026-06-02",
    author: { name: "Elena Marsh", role: "Head of Risk Engineering" },
    body: [
      {
        type: "p",
        text: "A drift detector that fires too often gets ignored. A drift detector that fires too rarely misses the drawdown it was built to catch. There is no threshold that solves this — the fix is structural, not a tuning knob on a z-score.",
      },
      {
        type: "h2",
        text: "Multiple timescales, not one",
      },
      {
        type: "p",
        text: "A single rolling-window comparison can't distinguish a strategy that's temporarily choppy from one that's genuinely changed behavior, because both look like elevated variance on any single timescale. Sentinel runs the comparison at several timescales simultaneously — intraday, multi-day, multi-week — and treats agreement across timescales as the actual signal. A spike that shows up on the intraday window and nowhere else is almost always noise. Drift that's visible on the multi-week window is almost never noise.",
      },
      {
        type: "h2",
        text: "Factor exposure drift versus P&L drift",
      },
      {
        type: "p",
        text: "P&L drift is the lagging indicator. By the time realized P&L has visibly diverged from its historical distribution, the underlying change has usually been building for a while. Factor exposure drift — a market-neutral book quietly accumulating a sector tilt, a pairs strategy's legs decorrelating — is the leading indicator, and it's detectable before it shows up in the P&L tape at all. This is why Sentinel watches exposure composition, not just returns.",
      },
      {
        type: "list",
        items: [
          "Compare against the strategy's own history at multiple timescales, not one window.",
          "Require agreement across timescales before treating a signal as real drift.",
          "Watch factor exposure composition as a leading indicator, P&L as a lagging one.",
          "Route alerts by what changed — exposure, correlation, or execution — not a single generic threshold breach.",
        ],
      },
      {
        type: "quote",
        text: "The alerts that mattered weren't the P&L ones. By the time P&L moved, we already knew — the exposure alert had fired two days earlier.",
        attribution: "Quant PM, market-neutral fund",
      },
    ],
  },
  {
    slug: "field-guide-to-prime-broker-margin-methodologies",
    title: "A field guide to prime broker margin methodologies",
    excerpt:
      "SPAN, TIMS, and proprietary risk-based margin engines don't just produce different numbers for the same book — they respond differently to the same market move. Knowing which one you're under changes how you should size.",
    category: "Market structure",
    readingMinutes: 6,
    publishedAt: "2026-05-19",
    author: { name: "Marcus Webb", role: "Infrastructure Lead" },
    body: [
      {
        type: "p",
        text: "Two funds with structurally identical books, at two different prime brokers, can see meaningfully different margin calls on the same volatility spike — not because either broker made an error, but because the underlying margin methodology weighs risk differently by construction.",
      },
      {
        type: "h2",
        text: "Portfolio margin isn't one thing",
      },
      {
        type: "p",
        text: "Most brokers market some form of 'portfolio margin,' but the scenario grids, correlation assumptions, and stress moves underneath that label vary meaningfully. A methodology that stresses correlated moves conservatively will call more margin on a concentrated sector book during a sector-wide selloff than one that treats each position more independently, even holding the raw position list constant.",
      },
      {
        type: "list",
        items: [
          "Know your broker's stress scenario set, not just whether they call it 'portfolio margin.'",
          "Concentrated single-sector books are the most methodology-sensitive — model both worst cases.",
          "Cross-margining rules between correlated instruments differ enough between brokers to matter at scale.",
          "Multi-PB desks should size against the more conservative broker's methodology, not the average.",
        ],
      },
      {
        type: "p",
        text: "This is one of the quieter reasons multi-PB reconciliation matters beyond position accuracy — knowing your true aggregate margin exposure requires understanding how each broker would actually price a stress move against your book, not just what they're charging you today.",
      },
    ],
  },
  {
    slug: "position-reconciliation-post-mortem-a-40m-phantom-short",
    title: "Position reconciliation post-mortem: a $40M phantom short",
    excerpt:
      "A corporate action, a stale mapping table, and eleven days of a position that didn't exist. What the incident actually was, why the usual checks didn't catch it, and what we changed in Atlas afterward.",
    category: "Engineering",
    readingMinutes: 8,
    publishedAt: "2026-05-05",
    author: { name: "Devon Ashcroft", role: "Founding Engineer" },
    body: [
      {
        type: "p",
        text: "This is a post-mortem of an incident from an early design partner engagement, shared with their permission because the failure mode is common enough that it's worth other teams reading before they hit it themselves. The short version: a stock split wasn't propagated through a broker's legacy position feed for eleven days, and during that window our reconciliation engine reported a clean book against a position that was off by a factor tied to the split ratio — roughly $40M notional on paper that didn't exist.",
      },
      {
        type: "h2",
        text: "What actually happened",
      },
      {
        type: "p",
        text: "The issuer executed a 3-for-1 split. The prime broker's primary feed updated share counts correctly same-day. A secondary, lower-frequency feed we used as a cross-check for that broker — kept specifically to catch feed errors — had a caching layer that held the pre-split share count for eleven days before its next full refresh. Our reconciliation logic compared the two feeds, saw them disagree, and applied a confidence-weighted resolution that favored the primary feed, correctly, on every other check that day. It also, incorrectly, used the stale secondary feed's unadjusted share count when computing the split ratio adjustment for a handful of downstream aggregate exposure calculations that touched both feeds.",
      },
      {
        type: "p",
        text: "The net effect was a position that was individually correct in the primary book, correct in the secondary book once you accounted for the split, but wrong in one specific cross-feed aggregate calculation that assumed both feeds were split-adjusted at the same time. That calculation fed a sector exposure rollup. The rollup was the thing that was wrong — a phantom net short in the issuer's sector that didn't correspond to any actual position.",
      },
      {
        type: "h2",
        text: "Why the usual checks didn't catch it",
      },
      {
        type: "p",
        text: "Our break detection was watching for feed disagreement, and it correctly found none once the primary feed was trusted. It was not watching for a scenario where two feeds each individually reconcile against their own history but produce an inconsistent joint calculation. That's a narrower and uglier failure mode, because every individual check was passing.",
      },
      {
        type: "list",
        items: [
          "Corporate action propagation delay across secondary/cross-check feeds, not just primary feeds.",
          "Aggregate calculations that join multiple feeds need their own consistency checks, independent of each source feed's individual health.",
          "A confidence-weighted resolution can be locally correct and globally wrong if it doesn't propagate consistently downstream.",
          "Eleven days is a long time for a $40M discrepancy to sit undetected in a sector rollup nobody was staring at directly.",
        ],
      },
      {
        type: "h2",
        text: "What changed in Atlas afterward",
      },
      {
        type: "p",
        text: "We added a class of checks specifically for joint-feed consistency — verifying that any calculation touching more than one data source uses corporate-action-adjusted figures from the same point in time across all of them, not just that each source is individually current. We also added a corporate action reconciliation pass that runs independently of position reconciliation, specifically to catch split, spin-off, and merger adjustments that propagate at different speeds across a client's connected feeds. Neither check existed before this incident. Both now run on every connected book, every day.",
      },
      {
        type: "quote",
        text: "The scary part wasn't the size of the number. It was that every individual system said everything was fine. That's the incident that changes how careful you are for good.",
        attribution: "Devon Ashcroft, Founding Engineer",
      },
    ],
  },
  {
    slug: "designing-atlas-one-exposure-map-every-venue",
    title: "Designing Atlas: one exposure map, every venue",
    excerpt:
      "The original design brief for Atlas was one sentence: a risk officer should never have to open a second system to know what the fund actually owns. Here's how that constraint shaped the architecture.",
    category: "Product",
    readingMinutes: 7,
    publishedAt: "2026-04-21",
    author: { name: "Priya Raman", role: "Product Engineer, Query" },
    body: [
      {
        type: "p",
        text: "Most exposure tools we looked at before building Atlas were, structurally, single-broker or single-venue tools with multi-broker support bolted on as a reporting feature — you'd get a combined PDF at end of day, not a live combined view. We wanted the opposite: a system where 'combined' is the native state and any single-venue view is a filter on top of it, not the other way around.",
      },
      {
        type: "h2",
        text: "One instrument model, everywhere",
      },
      {
        type: "p",
        text: "The architectural decision that made everything else possible was refusing to let any connector own its own instrument identity. Every prime broker, OMS, and market data feed we connect maps into a single internal instrument model before anything touches the exposure map. This is the same resolution problem we've written about in reconciliation — it's the same engine, because exposure aggregation and reconciliation are, underneath, the same operation: taking disagreeing sources and producing one trustworthy answer.",
      },
      {
        type: "h2",
        text: "Live, not end-of-day",
      },
      {
        type: "p",
        text: "A risk officer's actual question is rarely 'what did we own at market close yesterday' — it's 'what do we own right now, and what changed in the last hour.' That requirement pushed the whole system toward streaming position updates rather than batch ingestion, which is a meaningfully harder engineering problem but the only one that answers the question people are actually asking.",
      },
      {
        type: "list",
        items: [
          "Combined multi-venue exposure is the default state, not a bolted-on report.",
          "Every connector maps into one internal instrument model before touching the exposure map.",
          "Position updates stream continuously rather than batching to end-of-day.",
          "Query and Sentinel are both built on top of the same graph, not separate data stores — so the three products never disagree with each other.",
        ],
      },
      {
        type: "p",
        text: "That last point is the one we protect most stubbornly in code review. It would be easy to let Query maintain its own cached view for speed, or let Sentinel snapshot exposure independently for its drift comparisons. We don't, because the moment two products in the same suite can disagree about what the fund owns, the whole platform's credibility is gone, no matter how fast either individual product is.",
      },
    ],
  },
];

/** Formats an ISO date string as e.g. "Jul 28, 2026" for display. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function comparePublishedAtDesc(a: Post, b: Post): number {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  return [...posts].sort(comparePublishedAtDesc);
}

/** The most recently published post — used as the featured post on /blog. */
export function getFeaturedPost(): Post {
  return getAllPosts()[0];
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/**
 * Chronological (oldest-first) prev/next neighbours for a post, wrapping the
 * newest-first list used everywhere else in the UI.
 */
export function getAdjacentPosts(slug: string): {
  previous: Post | undefined;
  next: Post | undefined;
} {
  const ordered = getAllPosts();
  const index = ordered.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: ordered[index + 1],
    next: index > 0 ? ordered[index - 1] : undefined,
  };
}
