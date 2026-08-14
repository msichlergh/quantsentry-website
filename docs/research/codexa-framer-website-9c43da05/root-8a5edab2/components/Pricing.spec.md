# Pricing Specification

## Overview
- Target: `src/components/sites/codexa-framer-website-9c43da05/root-8a5edab2/CodexaPricing.tsx`
- Screenshot: `docs/design-references/codexa-framer-website-9c43da05/root-8a5edab2/codexa-pricing-desktop.png`
- Interaction model: monthly/yearly click toggle.

## Structure and computed styles
- Desktop section 1100.227px; container max-width 1200px, padding `64px 0 128px`, gap 48px.
- Header H2 52/57.2px. Segmented control 13px/18.2px mono; active white; discount accent.
- Three cards in 400px columns, 517–575px high, 32px inset, hairline grid borders.
- Plan title 24/28.8px; price approximately 44px; body/list 15px; CTA 42px, 50px radius and full inner width.
- Pro CTA white; Starter/Ultimate dark. `POPULAR` is teal.
- Reassurance row height 129px; four equal columns with small outline icons and 16px/22.4px labels.

## States and content
- Monthly: Starter `$49`, Pro `$79`, Ultimate `$129`.
- Yearly: Starter `$35`, Pro `$65`, Ultimate `$115`; source initially renders monthly after hard reload.
- Plan descriptions, features, and reassurance labels are verbatim in `extracts/codexa-content.json`.
- Value transition about 350ms; section dimensions do not change.

## Responsive
- At 768/390 cards stack full-width. H2 40/44px; plan H3 20/24px; outer padding 28px.
- Reassurance becomes a 2x2 grid.

