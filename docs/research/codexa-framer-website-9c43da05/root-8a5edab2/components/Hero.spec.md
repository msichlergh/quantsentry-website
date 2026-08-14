# Hero Specification

## Overview
- Target: `src/components/sites/codexa-framer-website-9c43da05/root-8a5edab2/CodexaHero.tsx`
- Screenshot: `docs/design-references/codexa-framer-website-9c43da05/root-8a5edab2/codexa-hero-desktop.png`
- Interaction model: static + entrance motion + looping trust strip.

## Structure and computed styles
- Section id `home`; desktop height 1220.055px, padding `0 40px`, centered column, z-index 5.
- Inner: max-width 1200px, padding `130px 32px 32px`, gap 48px, centered column.
- Copy block width 1056px; H1 max-width 600px, 64px/67.2px, weight 500, centered white.
- Subtitle max-width 450px, 18px/26px, `#969696`, centered.
- CTA 156.39x42px, white background, 50px radius.
- Teal radial glow sits behind the real code image; image asset `hero-code-window.png`, rendered 1096x638px desktop with `object-fit: cover`.
- Trust row height 55px with uppercase 12px mono label and muted monochrome logos.

## Content
- H1 “Everything you need to build with AI”.
- Subtitle “Write workflow logic in code and let Codexa automate, schedule, and optimize everything.”
- CTA “Get started free”. Trust label “TRUSTED BY INDUSTRY LEADERS WORLDWIDE”.

## Responsive
- 768: H1 48/50.4px width 600; hero image fluid; section about 1000px.
- 390: outer padding 28px, H1 width 319px and 3 lines; image cropped/scaled to viewport; trust logos remain one horizontal row.

