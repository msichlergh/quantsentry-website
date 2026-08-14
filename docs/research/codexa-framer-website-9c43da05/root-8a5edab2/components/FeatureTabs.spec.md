# Feature Tabs Specification

## Overview
- Target: `src/components/sites/codexa-framer-website-9c43da05/root-8a5edab2/CodexaFeatureTabs.tsx`
- Screenshot: `docs/design-references/codexa-framer-website-9c43da05/root-8a5edab2/codexa-feature-tabs-desktop.png`
- Interaction model: click-driven tabs.

## Structure and computed styles
- Desktop section 898.406px; container max-width 1200px, padding `64px 0 128px`, gap 48px.
- Tab bar is 1200x68px; centered labels 15px/18px, gray inactive, white active, accent underline.
- Content is a 1200x434px split panel: code figure roughly 643x370px spilling 118px left; copy block 429px.
- State title 32/38.4px, body 15px/23px, white CTA 127x42px.
- Code uses Geist Mono 14–16px on `#0f0f11` with teal syntax accents.

## States
- Developer Experience: “Production-first behavior, without compromises” + captured production-first paragraph.
- Layout Stability: “Built to handle real data and real edge cases” + captured layout paragraph.
- Production Ready: “Designed to scale with your product” + captured reuse/extension paragraph.
- Click swaps code, title, and paragraph with 350ms opacity/translate; height stays fixed.

## Responsive
- At 768/390, H2 is 40/44px; code then copy stack; tab labels are replaced/supplemented by 44px previous/next arrow controls.
- Outer padding 28px and content width 100%.
