# Features Specification

## Overview
- Target: `src/components/sites/codexa-framer-website-9c43da05/root-8a5edab2/CodexaFeatures.tsx`
- Screenshot: `docs/design-references/codexa-framer-website-9c43da05/root-8a5edab2/codexa-features-desktop.png`
- Interaction model: static + reveal; mockups have time-driven decorative motion only.

## Structure and computed styles
- Desktop section height 1896.406px, padding `0 40px`; inner max-width 1200px, padding `64px 0 128px`, gap 48px.
- Intro H2 52/57.2px, 650px max.
- Three feature rows are 1200x500px with two 600px columns and 1px white/6% dividers.
- Copy block inset 32px; H3 44/48.4px, max-width 440px; body 15px; checklist uses 23px rows with 10px teal dots.
- Mockups are CSS-built: status list, release pipeline, and throughput chart. Surfaces `#0f0f11`; teal `#00c3c9`; gray `#969696`; 10–12px radii.

## Content
- Intro: `FEATURES`; “Build real products with powerful developer tooling”.
- Row 1: “Build automation with clean code” with five workflow statuses and three bullets.
- Row 2: “Track system metrics instantly” with pipeline labels PLANNED/TESTING/RELEASED.
- Row 3: “Automate and stabilize your pipelines” with `248`, `+14%`, throughput bars.
- Use all verbatim text from `extracts/codexa-content.json`.

## Responsive
- At 768/390 each 500px row becomes stacked mockup + copy; alternate visual order matches the screenshots.
- H3 34/37.4px; widths 440px at tablet and 319px mobile; outer padding 28px.

