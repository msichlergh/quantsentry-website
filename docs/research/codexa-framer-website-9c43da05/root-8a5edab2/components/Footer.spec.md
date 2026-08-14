# Footer Specification

## Overview
- Target: `src/components/sites/codexa-framer-website-9c43da05/root-8a5edab2/CodexaFooter.tsx`
- Screenshot: `docs/design-references/codexa-framer-website-9c43da05/root-8a5edab2/codexa-footer-desktop.png`
- Interaction model: form + link/button hover.

## Structure and computed styles
- Footer desktop height 760.797px, background `rgb(9,9,11)`.
- Top CTA block in 1200px container: 279px high, centered, teal radial glow; eyebrow 15px; H2 64/67.2px, max-width 800px; CTA 218x42px.
- Lower block 1200x287px. Newsletter column width 470px; email control 360x42px; submit 99x42px.
- Center 64x64 Codexa mark. Right area three columns (Product, Company, Legal), 125px each.
- Bottom bar 49px, 1px hairline top border, 12px mono uppercase copyright and creator link.

## Content
- “12K+ teams trust Codexa”; “Automate more. Ship faster.”; “Explore the Template”.
- Newsletter, all Product/Company/Legal link labels, copyright and creator text are verbatim from `extracts/codexa-content.json`.
- Form is demo-only: prevent submit and keep UI responsive.

## Responsive
- At 768/390 CTA H2 48/50.4px. Newsletter, centered mark, and link groups stack.
- Link groups remain a three-column row at mobile; copyright and creator link center below.
- Outer padding 28px.
