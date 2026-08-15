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
- Shared content data, such as changelog entries and career openings, remains
  separate from its renderer.

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

Styles have three layers and should not cross responsibilities:

1. `src/app/codexa/codexa.css` contains Codexa-scoped tokens, global reset
   boundaries, shared motion hooks, the home rails, logo, and marquee behavior.
2. Shared primitive CSS modules contain the complete state styling for a
   reusable control or pattern.
3. Section CSS modules contain layout, typography exceptions, diagrams,
   responsive behavior, and section-specific animation.

All general colors, borders, widths, gutters, radii, and common motion timings
must use the `--codexa-*` tokens defined on `.codexa-page`. Literal color values
are reserved for intentionally unique illustration details or opacity variants
that are not semantic site tokens.

Do not add unscoped global selectors. Codexa global rules must begin with
`.codexa-page`, `.codexa-*`, or use the existing `:has(.codexa-page)` shell
boundary.

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
