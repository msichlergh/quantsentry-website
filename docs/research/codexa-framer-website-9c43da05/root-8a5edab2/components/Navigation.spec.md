# Navigation Specification

## Overview
- Target: `src/components/sites/codexa-framer-website-9c43da05/root-8a5edab2/CodexaNavigation.tsx`
- Screenshot: `docs/design-references/codexa-framer-website-9c43da05/root-8a5edab2/codexa-navigation-desktop.png`
- Interaction model: fixed + hover.

## Structure and computed styles
- Fixed page-level wrapper: top 0, width 100%, height 72px, z-index 10.
- Nav background `rgb(9,9,11)`, backdrop blur 10px; desktop padding `0 40px`.
- Inner container width/max-width 1200px, height 72px, padding 24px, row layout, centered, 12px gap.
- Logo is 113x32px: 24px raster mark plus “Codexa” at 24px.
- Center links use Geist 15px/18px, weight 400, color `rgb(150,150,150)`; hover white.
- Contact and Get Started are 36px-high pills; primary is white with dark text.

## Content and states
- Logo `Codexa`; links `Features`, `Pricing`, `Changelog`, `Company`, `FAQs`; actions `Contact`, `Get Started`.
- Link hover: secondary gray to white. CTA hover: duplicate label translates upward inside clipped pill.
- ScrollY 0 and 400 states are identical.

## Responsive
- Desktop 1440: full layout centered in 1200px.
- Tablet 768 and mobile 390: only logo at x=28; nav remains 72px; all links/actions hidden; no menu trigger.

