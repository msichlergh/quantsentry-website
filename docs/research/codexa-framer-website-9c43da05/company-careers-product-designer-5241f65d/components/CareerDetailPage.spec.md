# CodexaCareerDetailPage Specification

## Overview

- Shared target files: `src/components/sites/codexa-framer-website-9c43da05/shared/CodexaCareerDetailPage.tsx` and `.module.css`.
- Route: `src/app/codexa/company/careers/[slug]/page.tsx` using `generateStaticParams`.
- Source screenshots: desktop and mobile captures in every careers detail design-reference root.
- Interaction model: static article with hover/focus CTA.

## Desktop geometry at 1440px

- Main frame x 113, width 1200px. Job page content ends at y 1710px for Product Designer.
- Main container padding top 100px.
- Hero: 1200x202px, padding 24px, centered, gap 16px. Metadata `13/18.2px` Geist Mono; title width 650px, `52/57.2px`, 500; summary width 440px, `16/23.2px`, `#969696`.
- Article well: x 313, width 800px; padding `24px 24px 128px`; left/right/bottom rules `#262626`. Inner content x 337, width 700px.
- Section heading: `32/35.2px`, weight 500, white. First heading has no top margin; later headings use `40px 0 0`.
- Paragraph: `16/23.2px`, `#969696`, margin-top 20px. Preserve intentional inline emphasis with `<strong>`.
- Lists: margin-top 32px; items `16/23.2px`, muted, 21px text inset.
- Apply CTA: 146x42px, 24px horizontal padding, white pill, margin-top 24px.
- Product Designer article well height 1409px. Other roles follow their content height. Product Manager visibly repeats the six article sections and therefore is taller.

## Mobile/tablet geometry

- Breakpoint: `max-width: 768px`; use 12px outer gutters.
- Main padding top 100px. Hero 184px; title `40/44px`; summary `15/21.75px`; hero horizontal padding 24px.
- Article well width equals available frame, padding `24px 24px 80px`; inner content width is available width minus 48px.
- Headings remain `32/35.2px`; paragraphs/lists become `15/21.75px`.
- No horizontal overflow at 390px or 768px.

## Content and variants

- Render the exact metadata, title, summary, paragraphs, and bullets from `shared/codexaCareerData.ts`.
- Product Manager must render its six content sections twice because that duplication is visibly present on the live source at desktop and mobile. The second pass repeats the Overview paragraphs without repeating the `Overview` heading, then repeats the remaining five headings normally.
- Preserve source paragraph breaks and list order.
- Apply link target: `/codexa/company/support`.

## Visual tokens

- Canvas `#09090b`; rules `#262626`; text `#fff`; muted copy `#969696`; metadata accent `#00c3c9`.
- Reuse the global Codexa button text-track animation and existing shared site frame/footer/navigation.
- No new assets or dependencies.

## Verification

- Verify all six generated routes, unknown slug 404 behavior, metadata, 1440/768/390 layouts, Product Manager duplicate source behavior, button hover/focus, and full production build.
