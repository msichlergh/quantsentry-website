# Codexa component and stylesheet architecture

This document is the implementation contract for the Codexa website. It keeps
the reverse-engineered visual result intact while making page ownership and
future changes predictable.

## Route ownership

Every `src/app/codexa/**/page.tsx` implementation route owns exactly one
`CodexaSiteFrame`. Public Codexa URLs are rooted at `/`; the internal
`/codexa` namespace is hidden by rewrites and permanently redirects legacy
links to their clean canonical paths. Page components render page content only
and must not mount navigation, motion setup, the footer, or another site frame.

- Use `variant="home"` only for the Codexa landing page. It provides the
  continuous 1200px side rails used by the home design.
- Use the default `constrained` frame for product, company, content, career,
  legal, and 404 routes.
- Set `showFooter={false}` only for the dedicated 404 experience.
- Route files own metadata and static-parameter generation. Visual components
  do not.

## Shared site layer

The `shared/` directory contains code that has genuine cross-page ownership:

- `CodexaSiteFrame` owns the site shell.
- `codexaSiteConfig` is the single source for stable paths, primary
  navigation, the company menu, and footer groups.
- `CodexaButton`, `CodexaEyebrow`, and `CodexaFormField` own repeated UI
  patterns and their styles.
- `CodexaDemoForm` is the smallest client boundary required by the static demo
  forms.
- Shared content data, such as changelog entries, career openings, and the
  feature-illustration copy in `codexaVisualData`, remains separate from its
  renderer.

The homepage and `/product/features` render visually different illustrations
from the same underlying copy. Share the *data* between them; do not merge the
renderers behind a variant flag, as their markup and animation genuinely differ
in the source design.

Do not move a section-specific visual into `shared/` merely because it looks
similar. Promote it only when two or more pages use the same semantics and
interaction.

## Page components

Large pages are compositions of named sections. A section owns its markup,
visual illustration, animation hook, and colocated CSS module. The page entry
component should primarily order those sections and pass data.

The Careers page is the reference structure:

- `CareersPage` composes the page.
- `CareersHero`, `CareersIntroduction`, `CareersCulture`, and
  `CareersOpenings` own their sections.
- `CareersUi` owns the page-specific eyebrow and animated button label.
- Each section imports its own CSS module; `CareersPage.module.css` contains
  only page-level framing.

Feature diagrams remain code-native components beside the section that owns
them. This preserves animation and responsive behavior without introducing
opaque image assets.

## Styling layers

Styles have four layers and should not cross responsibilities:

1. `src/app/globals.css` is deliberately minimal. It wires Tailwind's
   `--font-*` and `--color-background`/`--color-foreground` theme variables for
   the handful of layout utilities the root layout uses. The site itself is not
   styled with Tailwind — do not grow this file.
2. `src/app/codexa/codexa.css` contains Codexa-scoped tokens, global reset
   boundaries, shared motion hooks, the home rails, logo, marquee behavior, and
   the `.codexa-sr-only` visually-hidden utility.
3. Shared primitive CSS modules contain the complete state styling for a
   reusable control or pattern.
4. Section CSS modules contain layout, typography exceptions, diagrams,
   responsive behavior, and section-specific animation.

All general colors, borders, widths, gutters, radii, and common motion timings
must use the `--codexa-*` tokens defined on `.codexa-page`. Literal color values
are reserved for intentionally unique illustration details or opacity variants
that are not semantic site tokens.

Do not add unscoped global selectors. Codexa global rules must begin with
`.codexa-page` or `.codexa-*`. Every route renders `CodexaSiteFrame`, so `html`
and `body` rules need no `:has()` guard.

### One stylesheet per component

A CSS module is owned by exactly one component file and named after it. When a
module grows past roughly 400 lines, check whether its consumers already use
disjoint class sets — if they do, that is a real seam and the module should be
split to match. `product-features-e258f631` and the homepage feature section are
the reference: each `*.tsx` has a `*.module.css` of the same name.

The one sanctioned exception is a class that belongs to the *parent's* layout
but is applied by the child, such as `visualPanel` in `CodexaFeatures.module.css`
(selected by `.reverse .visualPanel`). Import the parent module under a second
name rather than duplicating the rule.

Size alone is not a reason to split. `CodexaHowItWorks.module.css` is large and
must stay whole: its three illustrations are animated entirely by the parent
card's state (`.card:hover .workflowCursor`, `.card:global(.is-automated)
.chartPulse`, and nine more like them). A descendant selector cannot span two
CSS modules, so splitting it would break the hover choreography. Always check
for cross-cutting selectors before splitting, not just line count.

### Breakpoints

The responsive scale is `900px` (navigation and wide-layout collapse), `768px`
(tablet/mobile stacking) and `430px` (phone). Three source-measured exceptions
exist and are intentional: `650px` in the hero, `480px` in the homepage
features/tabs/FAQ sections, and `390px` in the comparison table. Do not add a
new breakpoint without a measured reason; do not "tidy" the existing exceptions
into the standard scale, as that changes rendering on real phone widths.

Note that a `max-width:` *declaration* constraining a text column is not a
breakpoint. Only `@media` queries are.

## Server and client boundaries

Components are server components by default. Add `"use client"` only to the
smallest component that directly needs browser state, effects, observers, or
event handling.

Current intentional client islands are navigation interaction, motion and
intersection setup, accordion/tab interaction, and `CodexaDemoForm`. A page,
footer, support form, or sales form must not become a client component merely
to contain one of those islands.

## Content and links

- Add or change stable internal paths in `codexaSiteConfig` before using them
  in navigation or the footer.
- Use `next/link` for internal page navigation.
- Keep dates and repeated content in typed data modules rather than branching
  on display strings in JSX.
- New-page navigation relies on Next.js scroll restoration; hash links use
  section IDs and the global navigation-height offset.

## Change checklist

Before publishing a Codexa change:

1. Run `npm run lint` and `npm run typecheck` during implementation.
2. Run `npm run check` before committing.
3. Request every concrete Codexa route locally and confirm a successful
   response, one site shell, and expected page markers.
4. Check desktop and mobile rendering in the in-app browser when it is
   available, including hover, focus, reduced motion, navigation, forms, and
   route scroll position.
5. After merge, verify the deployment separately from GitHub merge status and
   probe the public routes again.
