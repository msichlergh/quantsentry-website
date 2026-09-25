# QuantSentry — Brand Book & Guidelines

**Version 1.0 · September 2026**
The single source of truth for how QuantSentry looks, sounds, and shows up. Every colour, font, and token here is mirrored from the live site (`app/globals.css`, `app/_seo/site.ts`) — this document reflects what is actually built, not an aspiration.

Parent company: **Quant Technology Group (QTG)**.

---

## 1. Brand Foundation

### 1.1 What we are
QuantSentry is the **data intelligence layer for trading businesses** — network-based AI risk and business intelligence that turns disconnected data into profitable action.

### 1.2 Positioning statement
> For modern trading businesses drowning in disconnected data, QuantSentry connects your systems, detects coordinated abuse, and answers business questions with cited evidence — so you decide what to do next, faster.

### 1.3 Mission
Take a trading business from **disconnected data to profitable action**: bring the data together, surface the risks and opportunities inside it, and give a clear, evidence-backed answer to "what do I do next?"

### 1.4 The one-liner (use verbatim in metadata)
> Network based AI risk and business intelligence for modern trading businesses.

### 1.5 Brand pillars
1. **Connected** — one platform over data that used to live in ten places. The network is the moat (Sentry Risk Network).
2. **Evidence, not opinion** — every claim, alert, and answer comes with reviewable proof and cited sources.
3. **Clarity over cleverness** — plain language, clear next actions. We reduce cognitive load, we don't add to it.
4. **Vigilant** — "Sentry." Always-on monitoring. We watch so the team doesn't have to.

### 1.6 Personality
Precise · calm · technical · trustworthy. A sharp analyst, not a hype machine. Confident without swagger; we let the evidence carry the weight.

### 1.7 Product & entity names (spell them exactly)
| Name | What it is | Notes |
|---|---|---|
| **QuantSentry** | The company / platform | One word, camelCase `QuantSentry`. Never "Quant Sentry" or "Quantsentry". |
| **Argus AI** (or **Argus**) | The AI intelligence engine | Named after the many-eyed watchman. "Ask Argus." |
| **Sentry Risk Network** | The opt-in cross-member risk signal network | The "network" in the positioning. |
| **Platform** · **Managed Desk** · **Network** | The three product tiers | Capitalised as product names. |
| **Quant Technology Group / QTG** | Parent company | Use full name on first mention. |

---

## 2. Logo & Mark

### 2.1 The mark
The QuantSentry mark is a **cluster of six three-pronged nodes** in a teal gradient — a visual metaphor for connected data points forming a network. A single node, rotated 30°, is used as the favicon/app-icon.

**Primary asset:** `public/images/quantsentry-icon-teal-cluster.png`
**App/favicon:** `app/icon.svg` (single node on `#070b0c` rounded-square, radius 22%)
**Alt cluster:** `public/images/quantsentry-icon-teal-coil-v2.png`

### 2.2 The lockup
Horizontal lockup = **mark + wordmark**, defined in `components/BrandLockup.tsx`:
- Mark sits left, sized to `1.08em` of the wordmark, vertically centred, `5px` gap.
- Wordmark: **"Quant" (weight 450) + "Sentry" (weight 550)** set solid, no space, in **DM Sans**.
- Wordmark fill is a subtle top-down gradient (`#fff → #f3f8f7 → #dce6e5`) — reads as near-white on dark.
- On hover, the mark performs a single 360° orbit (`mark-orbit`, 1.05s) — respects `prefers-reduced-motion`.

### 2.3 Wordmark weight logic
"**Quant**" is lighter than "**Sentry**" on purpose — the emphasis lands on *Sentry* (the watch/guard), reinforcing the vigilance pillar. Keep this contrast in any recreation.

### 2.4 Clear space & minimum size
- **Clear space:** minimum one node-width of empty space on all sides.
- **Minimum size:** mark 16px; full lockup 120px wide. Below that, use the mark alone.

### 2.5 Logo don'ts
- Don't recolour the mark outside the teal family (`#48c7c3 / #5dd3ce / #56c995`).
- Don't add a space, hyphen, or line break inside "QuantSentry."
- Don't equalise the two wordmark weights.
- Don't place the mark on a light or busy background without the dark chip behind it.
- Don't stretch, rotate (beyond the built-in hover orbit), or add drop shadows/outlines.
- Don't reconstruct the wordmark in a different typeface.

### 2.6 Parent-company lockup
QTG has its own white lockup: `public/images/qtg-lockup-white.webp`. Use it in "part of Quant Technology Group" contexts (footer, company page) — never merged into the QuantSentry lockup.

---

## 3. Colour

Dark-first is the brand. The default surface is near-black; teal is the single accent that carries interaction and identity. All values are the live `:root` tokens.

### 3.1 Surfaces (dark)
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#080a0b` | Page background (the brand's base) |
| `--panel` | `#101416` | Cards, raised surfaces |
| `--panel2` | `#0c0f11` | Deep panel / footer |
| `--raise` | `#181d1f` | Elevated elements |
| `--soft` | `#161b1d` | Section dividers, hairline fills |

### 3.2 Lines
| Token | Hex | Use |
|---|---|---|
| `--line` | `#202628` | Primary borders |
| `--hair` | `#272e30` | Hairline borders, pills, ghost buttons |

### 3.3 Ink (text)
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#f7fbfa` | Headings, primary text |
| `--ink2` | `#d4dada` | Body / lede |
| `--ink3` | `#99a3a4` | Secondary paragraph text |
| `--ink4` | `#747f80` | Eyebrows, captions, muted labels |

### 3.4 Accents
| Token | Hex | Meaning | Use |
|---|---|---|---|
| `--cy` **Sentry Teal** | `#48c7c3` | The brand. Primary accent. | Links, primary buttons, focus rings, active states, the mark |
| `--grn` Signal Green | `#56c995` | Positive / confirmed / healthy | Success states, "confirmed" evidence, positive deltas |
| `--amb` Alert Amber | `#d6a94e` | Attention / review needed | Badges, warnings, "needs review" |
| `--red` Risk Red | `#ff6b6b` | Risk / error / breach | Errors, critical alerts, negative deltas |

> **Mark gradient teal** is a slightly brighter `#5dd3ce` (used inside the icon). Sentry Teal `#48c7c3` is the correct value for everything else.

### 3.5 Usage rules
- **60/30/10**: ~60% dark surfaces, ~30% ink, ~10% teal accent. Teal is a scalpel, not a paint roller — one clear accent per view.
- Primary button = teal vertical gradient (`#48c7c3 → #42bdb9 → #249f9d`) with a light top-gloss highlight; text is dark (`#062426`), never white.
- Ghost button = transparent with `--hair` border; border turns teal on hover.
- Semantic colours (green/amber/red) are **functional only** — never decorative. If it's green, it means "good/confirmed."
- Focus ring is always `2px solid --cy`, `3px` offset. Never remove it.

### 3.6 Accessibility
Body text (`--ink3` on `--bg`) and above clears WCAG AA. Do not put `--ink4` on `--panel` for anything users must read — reserve it for uppercase mono labels at large tracking only. Never rely on colour alone to signal state (pair amber/red/green with an icon or label).

---

## 4. Typography

Three typefaces, three jobs. Never introduce a fourth.

| Face | Role | Where |
|---|---|---|
| **DM Sans** | The wordmark only | `QuantSentry` lockup (`--font-dm-sans`, weight ~550) |
| **General Sans** | Everything — headings & body | Weights 400 / 500 / 600 / 700, self-hosted `woff2` |
| **IBM Plex Mono** | Labels, eyebrows, data, table headers | Weights 400 / 500 |

### 4.1 Type scale (from `globals.css`)
| Element | Size | Weight | Tracking | Notes |
|---|---|---|---|---|
| `h1` | `clamp(32px, 4.2vw, 54px)` | 500 | `-0.03em` | `max-width: 34ch`, balanced |
| `h2` | `clamp(24px, 2.8vw, 36px)` | 500 | `-0.03em` | `max-width: 36ch` |
| `h3` | `17px` | 500 | `-0.015em` | line-height 1.3 |
| `.lede` | `clamp(15px, 1.3vw, 17.5px)` | 400 | — | `--ink2`, `max-width: 66ch` |
| `p` (body) | `15px` | 400 | — | `--ink3`, line-height 1.6 |
| `.stat` | `38px` | 500 | `-0.035em` | Big numbers |
| `.eyebrow` / `.mono` | `10px` | 400/500 | `0.15–0.18em` | **UPPERCASE**, IBM Plex Mono, `--ink4` |

### 4.2 Rules
- Headings are **medium weight (500), not bold**, with tight negative tracking. This is the house look — restrained, not shouty.
- `font-variant-numeric: tabular-nums` is global — numbers align in tables and stats. Keep it.
- Eyebrows/labels/table headers = IBM Plex Mono, uppercase, wide tracking, muted ink. This mono/label treatment is a signature — use it to frame sections.
- Measure: headings ≤ 36ch, body/lede ≤ 66ch. Don't run text full-bleed.
- Emphasis colour inside headings uses `.c` (teal) on the key phrase — e.g. "Give Argus a Goal. **Track the Result.**"

---

## 5. Voice & Tone

### 5.1 The voice in one line
**Clear, concrete, evidence-led.** We explain what the product does in plain words and back every claim with proof. No hype, no jargon salad.

### 5.2 How we sound
- **Plain and direct.** Short sentences. "Find toxic flow, latency abuse and bonus fraud across brokerage accounts, with evidence your team can review." Not "leverage next-gen synergies."
- **Verb-first and action-oriented.** *Connect. Detect. Find. Ask. Track. Review. Decide.*
- **Specific over vague.** Name the risk (toxic flow, chargeback rings, mule networks, front-running), name the number (100 confirmed abuse cases), name the source.
- **Evidence framing.** "…with evidence your team can review." "…before approving a payout." We consistently tie capability to a reviewable artefact and a decision.
- **Calm authority.** We state what's true. We don't oversell or fear-monger — even when the topic is fraud.

### 5.3 Tone by context
| Context | Tone |
|---|---|
| Hero / headlines | Confident, benefit-led, one teal-highlighted phrase |
| Product/feature copy | Concrete, capability + evidence + decision |
| Insights / thought leadership | Analytical, useful, no clickbait |
| Errors / risk alerts | Factual, calm, tells the user the next action |
| Legal / compliance | Precise, unembellished |

### 5.4 Voice do / don't
| Do | Don't |
|---|---|
| "Ask questions, monitor your business, research the market." | "Revolutionary AI-powered synergy platform." |
| "See clear evidence before approving a payout." | "Never worry about fraud again!" |
| "Prop trading is live. Coverage for brokerages is coming soon." | Imply everything ships today. |
| Cite the source / show the proof. | Assert without backing — *data, not stories.* |
| Sentence case in UI and most headings. | SHOUTING CAPS outside mono labels. |

### 5.5 Grammar & mechanics
- **British English** (`en-GB`) — "anonymised", "recognise", "colour". `HTML_LANG = "en-GB"`.
- Product names always exact-case (§1.7). "Argus," not "the Argus."
- Numerals for data ("6 questions", "100 cases"), words for small counts in prose where it reads cleaner.
- Oxford comma optional but be consistent within a piece; the site currently runs list-comma style ("risk, pricing, payout terms and product changes").
- Sentence case for headings and buttons. Mono eyebrows are the only uppercase.

### 5.6 Boilerplate (approved)
- **Short:** Network based AI risk and business intelligence for modern trading businesses.
- **Descriptive:** QuantSentry connects your business data, uses Argus AI to find risks and opportunities, and gives clear answers so you can decide what to do next.
- **Company:** QuantSentry is the connected data and risk platform from Quant Technology Group.

---

## 6. UI & Component Language

The design system that makes screens feel like QuantSentry. All tokens are live in `globals.css`.

### 6.1 Signatures
- **Gradient-border panels** (`.panel`): a 1px gradient border wrapping a dark inner card with a soft top-to-bottom gradient fill. Accent variants `.panel.cy / .grn / .amb` tint the border for state.
- **Pills** (`.pill`): rounded-full, hairline border, mono/small text — for tags, statuses, nav.
- **Radii:** buttons/pills fully round (`999px`); cards `14px`; inner cards `13px`; small tiles `11px`.
- **Dotted field** (`.dots`): faint radial dot-grid, masked to fade — background texture for hero/feature zones. The "connected data" motif.
- **Marquee** logo strip: partner/platform logos, greyscale (`brightness(0) invert(1)`), `0.62` opacity, brighten on hover.
- **Floating nav pill** (`.navpill`): rounded, blurred, semi-transparent header that tightens and gains a teal border on scroll (`.stuck`).

### 6.2 Buttons
- **Solid** (`.btn.solid`): teal gradient, dark text, glossy top highlight. One per view — the primary action.
- **Ghost** (`.btn.ghost`): transparent, hairline border → teal on hover. Secondary actions.
- Height `40px`, `18px` side padding, `14px` medium text.

### 6.3 Spacing & layout
- Max content width `--max: 1200px`; `.wrap` adds `24px` gutters.
- Sections: `82px` vertical padding, `1px --soft` top border. Hero: `74px 0 64px`, no top border, radial teal glow top-right.
- Grid gap `18px`; card padding `22–24px`.

### 6.4 Motion
- Fast, eased, purposeful: `0.16–0.4s`, cubic-bezier `(.22,1,.36,1)`. Fades rise `8px`.
- The mark's hover orbit is the one signature flourish. Everything else is subtle.
- **Always** honour `prefers-reduced-motion` — the codebase already does; keep it.

### 6.5 Data visualisation
- Use the semantic palette: teal = neutral/brand series, green = positive, amber = attention, red = negative/risk.
- Tabular figures on; align decimals. Muted `--ink4` mono for axis/labels.
- See the `dataviz` skill before building any chart — swap its placeholder palette for the tokens above.

---

## 7. Quick Reference

**Colours**
`bg #080a0b` · `panel #101416` · `ink #f7fbfa` · `ink2 #d4dada` · `ink3 #99a3a4` · `ink4 #747f80`
`teal #48c7c3` · `green #56c995` · `amber #d6a94e` · `red #ff6b6b` · `line #202628` · `hair #272e30`

**Type** — Wordmark: DM Sans · UI/body: General Sans · Labels/data: IBM Plex Mono
Headings weight 500, tracking −0.03em, sentence case. Eyebrows: mono, uppercase, +0.15em.

**Name** — `QuantSentry` (one word) · `Argus AI` · `Sentry Risk Network` · `Quant Technology Group`

**Voice** — Clear, concrete, evidence-led. British English. Verb-first. Cite the proof. No hype.

**Logo** — Teal node-cluster mark + gradient wordmark ("Quant" 450 / "Sentry" 550). Teal family only. Never split the word.

---

*Maintained alongside the codebase. When a token changes in `app/globals.css` or `app/_seo/site.ts`, update this file so it stays the source of truth.*
