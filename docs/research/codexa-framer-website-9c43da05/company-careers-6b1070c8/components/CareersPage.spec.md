# CareersPage Specification

## Overview

- Target files: `src/components/sites/codexa-framer-website-9c43da05/company-careers-6b1070c8/CareersPage.tsx` and `.module.css`.
- Route: `src/app/codexa/company/careers/page.tsx`.
- Screenshots: `source-desktop-1440-settled.png` and `source-mobile-390.png` in this page's design-reference root.
- Interaction model: document scroll, viewport-triggered openings reveal, hover/focus buttons.

## Desktop geometry at 1440px

- Browser content width is 1425px because the source reserves a 15px scrollbar. Shared content frame: x 113, width 1200px.
- Hero: 1200x384; padding `130px 24px 64px`; heading width 650px; title `52/57.2px`, 500; copy width 450px, `18/26.1px`, `#969696`.
- Join section: 1200x448 including 128px bottom gap. Intro is 1200x320, two 600px cells. Left/right padding 32px. Title `44/48.4px`; copy `16/23.2px`.
- Culture: 1200x934, padding `64px 0 128px`, gap 48px. Header 214px. Title width 650px, `52/57.2px`, centered.
- Culture grid: 1200x480, three 400px columns and two 240px rows. Cards use 24px padding, structural rules `#262626`, 36px source SVG icons, title `20/26px`, copy `16/23.2px`.
- Openings: 1200x1062. Left/right columns are 600px. Left headline padding 24px; title `52/57.2px`. Each desktop row is 165px or 189px based on summary wrapping, with 24px padding and a bottom `#262626` rule.
- Job row content width 301px; metadata `13/18.2px` Geist Mono teal; job title `24/28.8px`; summary `16/23.2px`; CTA 179x42.

## Mobile/tablet geometry

- Breakpoint: `max-width: 768px`.
- Use 12px page gutters and 16px internal horizontal padding.
- Hero: 345px at phone, 323px at 768px; title `40/44px`; copy `16/22.4px`.
- Join intro: stacked; phone height 496px before the 80px section gap. Title `34/37.4px`; copy `15/21.75px`.
- Culture section: phone 1162px; 2-column grid, six 240px cards, 16px padding. Headline `40/44px`; card titles `18/23.4px`; copy `15/21.75px`.
- Openings heading: phone 295px and 251px at tablet. Each job card is 222px, padding `24px 16px`; CTA moves below content and is 146x42.
- The source's scrollbar consumes 15px. Normalize layout against available content width; do not create overflow in the local overlay-scrollbar browser.

## Visual tokens and assets

- Canvas `#09090b`; structural rules `#262626`; white text `#fff`; muted text `#969696`; accent `#00c3c9`.
- Eyebrow pills reuse the established `.codexa-eyebrow-pill` source pattern.
- Hero uses a subtle 75px grid and right-bottom teal radial bloom, fading before the join-section rule.
- Culture icons must use the six extracted source paths in `culture-icon-symbols.json`, not placeholder symbols.
- No raster assets or new dependencies.

## Content

- Heading: `Careers at Codexa`.
- Description: `At Codexa, we’re building tools that empower businesses to work smarter, stay organized, and grow faster.`
- Join title: `Join a team building scalable, thoughtful digital products.`
- Join copy is verbatim in `source-dom.json`.
- Culture headline: `A team built on trust, ownership, and continuous improvement.`
- Culture cards: Ownership mindset, Clear communication, Craft over speed, Build together, Learn continuously, Real-world impact, with verbatim source summaries.
- Openings heading: `Explore opportunities and join our team`; subhead: `Open roles across design, engineering, and product teams.`
- Job content and local slugs come from `shared/codexaCareerData.ts`.

## Accessibility and verification

- Use semantic headings, articles, and a named culture list.
- All icons are decorative.
- Link focus-visible must expose the same state as hover.
- Verify 1440, 768, and 390 layouts, anchor scrolling, all six job links, reduced motion, and zero horizontal overflow.

