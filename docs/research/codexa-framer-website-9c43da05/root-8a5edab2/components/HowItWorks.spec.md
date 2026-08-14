# How It Works Specification

## Overview
- Target: `src/components/sites/codexa-framer-website-9c43da05/root-8a5edab2/CodexaHowItWorks.tsx`
- Screenshot: `docs/design-references/codexa-framer-website-9c43da05/root-8a5edab2/codexa-how-it-works-desktop.png`
- Interaction model: time-driven decorative status motion.

## Structure and computed styles
- Desktop section height 913.016px, padding `0 40px`; container max-width 1200px, padding `64px 0 128px`, gap 48px.
- H2 52/57.2px centered. Card grid is 3 columns, 352px card width with 48px gaps.
- Visual area is 352x336–378px; caption area 109px.
- Step labels 13px/18.2px mono with accent wash; titles 20px/26px; body 15px/23px.
- Build three CSS visuals: integration orbit, five-row system status list, line chart with `128 runs/min` and `128 Active Workflows`.

## Content
- Eyebrow `HOW IT WORKS`; H2 “From setup to automation in 3 simple steps”.
- Steps: Connect your existing tools; Automate your daily workflows; Track everything in real time.
- Status rows and all descriptions are verbatim in `extracts/codexa-content.json`.

## Responsive
- Desktop cards are one row. Tablet/mobile stack vertically and retain visual-first card order.
- Narrow H2 40/44px; cards full-width, outer padding 28px.

