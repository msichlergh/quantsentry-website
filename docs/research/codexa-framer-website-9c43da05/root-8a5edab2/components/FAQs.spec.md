# FAQs Specification

## Overview
- Target: `src/components/sites/codexa-framer-website-9c43da05/root-8a5edab2/CodexaFaqs.tsx`
- Screenshot: `docs/design-references/codexa-framer-website-9c43da05/root-8a5edab2/codexa-faqs-default-desktop.png`
- Interaction model: independent click-driven disclosures.

## Structure and computed styles
- Default desktop section 640px; outer padding `0 40px`; inner max-width 1200px, padding-bottom 128px.
- Two 600px columns. Left intro and support CTA; right has eight 80px collapsed rows.
- H2 52/57.2px; question H3 18/25.2px; answers 15px/23px gray.
- Row uses 24px horizontal inset, 1px white/6% bottom border, 32px initial clickable height plus spacing; teal plus icon at right.
- White support button 141x42px with 50px radius.

## Behaviors/content
- Rows start collapsed and expand independently; multiple can remain open.
- Typical answer adds 56.4px; the long “replace tools” answer adds 79.6px.
- Animate grid-template-rows/opacity over 300ms ease.
- Include all eight exact questions and answers from `extracts/codexa-content.json`.

## Responsive
- At 768/390 intro stacks above accordion. H2 40/44px; questions 16/22.4px; width 592px tablet and 271px mobile inside 28px outer padding.

