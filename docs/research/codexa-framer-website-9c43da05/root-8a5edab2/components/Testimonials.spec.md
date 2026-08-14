# Testimonials Specification

## Overview
- Target: `src/components/sites/codexa-framer-website-9c43da05/root-8a5edab2/CodexaTestimonials.tsx`
- Screenshot: `docs/design-references/codexa-framer-website-9c43da05/root-8a5edab2/codexa-testimonials-desktop.png`
- Interaction model: static + reveal + looping trust strip.

## Structure and computed styles
- Desktop section 920.625px; inner max-width 1200px, padding `64px 0 128px`, gap 48px.
- Intro H2 52/57.2px centered.
- Cards form 3 columns x 2 rows; each 352x164px; gap 48px horizontally and 48px vertically.
- Card copy 15px/23px gray; five teal stars; author row has 45x45 circular real image, 12px mono uppercase name and muted role.
- Bottom trust strip is 1200x110px with 13px heading and horizontally moving monochrome logos.

## Content/assets
- Six quotes and authors: Sarah Lewis, James Parker, Anika Reddy, David Kim, Laura Martinez, Omar Ali.
- Use the six downloaded `testimonial-*.png` assets and verbatim quote/role text from `extracts/codexa-content.json`.

## Responsive
- Tablet/mobile cards stack to one column. H2 40/44px. Full-width cards with 28px outer padding.
- The trust strip remains a single clipped horizontal marquee.

