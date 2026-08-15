# Codexa Motion and Pricing Fidelity QA

## Comparison target

- Source visual truth: `https://codexa.framer.website/#home`
- User-reported implementation state: `.context/attachments/C2JKGD/image.png`
- Live-source evidence:
  - `docs/design-references/codexa-how-live-integration-hover-final.png`
  - `docs/design-references/codexa-how-live-workflow-hover-final.png`
  - `docs/design-references/codexa-how-live-analytics-hover-final.png`
- Final implementation evidence:
  - `docs/design-references/codexa-how-local-integration-hover-final.png`
  - `docs/design-references/codexa-how-local-workflow-hover-final.png`
  - `docs/design-references/codexa-how-local-analytics-hover-final.png`
- Viewport: `2000 x 1065` CSS pixels, device scale factor `1`.
- Image dimensions: source and implementation captures are both `2000 x 1065` pixels, so no density normalization was required.
- State: desktop, dark theme, each How It Works card hovered after its 700ms transition settled.

## Full-view comparison

The source and implementation preserve the same 1200px section frame, three-column structure, card boundaries, typography hierarchy, copy, dark palette, and teal active states. The implementation now contains the source interaction affordances that were missing in the user-reported screenshot.

## Focused comparison

The three card regions were cropped and compared side by side in `.context/codexa-how-all-hover-comparison.png`. Focused comparison was necessary because the cursor movement, active-check transfer, logo carousel state, and chart tooltip are too small to assess reliably in a full-page capture.

## Fidelity surfaces

- Fonts and typography: heading, card title, body, and mono metadata hierarchy match the source closely; wrapping is unchanged between hover states.
- Spacing and layout rhythm: the card grid, 352px visual columns, separators, captions, cursor destinations, and chart tooltip remain aligned with the source.
- Colors and visual tokens: teal active checks, muted inactive checks, dark borders, chart stroke, tooltip, and pulse colors match the existing Codexa palette.
- Image quality and asset fidelity: the integration rail now uses the seven downloaded source PNG logos rather than text glyph approximations. Cursor icons use the existing icon library and render sharply at `19 x 22` pixels.
- Copy and content: headings, steps, status rows, metric, descriptions, integration state label, and tooltip copy match the source.

## Comparison history

1. Initial finding: the user-reported state had no meaningful internal card motion; the integration label was permanently visible and workflow/chart cursors were absent. Result: blocked.
   - Fix: added source-matched hover variants for all three cards and a continuous reduced-motion-safe metric pulse.
2. Follow-up finding: the analytics cursor inherited the chart SVG sizing rule and rendered at chart scale. Result: blocked.
   - Fix: scoped the chart sizing rule to the chart graphic and retained explicit cursor dimensions.
3. Follow-up finding: the integration rail still used text glyphs and its active logo did not remain centered while transitioning. Result: blocked.
   - Fix: replaced glyphs with the source PNG logos, centered the 468px rail, moved the previous logo into the active slot, and matched the source tooltip treatment.
4. Final comparison: all three hover states visually and behaviorally match the source with no actionable P0, P1, or P2 findings.

## Interaction and responsive verification

- Integration hover: rail advances, Slack becomes centered, and `INTEGRATING…` fades in.
- Workflow hover: cursor moves to the first row and the active check transfers from row two to row one.
- Analytics hover: cursor moves to the graph point and the teal `128 runs/min` tooltip appears.
- Mobile viewport `390 x 844`: document client width and scroll width remain equal; no horizontal overflow.
- Reduced motion: decorative pulse animations are absent and transitions resolve immediately.
- Browser console: zero application errors; one benign Next.js development CSS-preload warning.

## Follow-up polish

- P3: the source eyebrow uses a small pill treatment while the existing clone uses plain mono text. This predates and does not affect the repaired card interactions.

final result: passed

## About principles spacing and route-completeness audit

**Findings**

- [P2, resolved] The Mission, Vision, and Progress cards were 368px tall instead of the source 240px and used undersized titles, number badges, and body copy. The desktop cards now match the source geometry and type scale; the mobile stack matches the source 200px-per-card rhythm.
- [Status] The local clone currently mirrors 16 of the 23 routes listed by the source sitemap. The careers index and six careers detail routes are not implemented. The latest visual fixes are local and uncommitted, so they are not production-live.

**Comparison evidence**

- Source visual truth: `.context/attachments/0lzXUm/image.png` and `docs/design-references/about-principles-source-final-2048.png`.
- Before/after implementation: `docs/design-references/about-principles-local-before-2048.png` and `docs/design-references/about-principles-local-final-2048.png`.
- Comparison viewport: `2048 x 900` CSS pixels at device scale factor `1`. The source reserves 15px for its scrollbar while the local browser uses an overlay scrollbar; comparison therefore uses the shared 1200px content frame and relative card measurements.
- Desktop runtime measurements: principles grid `1198 x 240px`; each card approximately `399.33 x 240px`; padding `24px`; title gap `12px`; number badge `32 x 32px`; title `24/28.8px`; copy `16/23.2px`.
- Mobile runtime measurements at `390 x 844`: section height `600px`; three `200px` cards; padding `16px`; number badge `32px`; title `20/24px`; copy `15/21.75px`; client width equals scroll width.

**Required fidelity surfaces**

- Fonts and typography: Geist headings and copy, with Geist Mono for the numbered badges, match the measured source sizes and line heights.
- Spacing and layout rhythm: fixed 240px desktop grid, evenly divided cards, source padding, and the normalized 200px mobile card rhythm are restored.
- Colors and visual tokens: titles use white, body copy uses `#969696`, teal badges use the source translucent fill and `#00c3c9` text, and structural rules use `#262626`.
- Image quality and asset fidelity: this region contains no bitmap imagery; existing source-native iconography and assets elsewhere remain unchanged.
- Copy and content: Mission, Vision, and Progress copy remains identical to the source.

**Interaction and responsive checks**

- The cards require no interactive state; desktop and mobile layout paths were both rendered and measured.
- Browser console: zero application errors after a clean local navigation.
- Repository validation: `npm run check` and `git diff --check` pass.

**Open Questions**

- The seven missing careers routes require a separate implementation pass before the clone can claim full source-route parity.

**Implementation Checklist**

- [x] Match desktop card height, padding, borders, badge size, typography, and body-copy rhythm.
- [x] Match the source mobile card stack and verify there is no horizontal overflow.
- [x] Audit every current source sitemap URL against its `/codexa` local counterpart.

**Follow-up Polish**

- No remaining P0, P1, or P2 issues in the requested principles region.

final result: passed

## FAQ boundary, workflow cursor, and numeric typography

- User references: `.context/attachments/Wyrqno/image.png`, `.context/attachments/YQFYqc/image.png`, and `.context/attachments/Bmcjup/image.png`; live source: `https://codexa.framer.website/#home`.
- FAQ evidence at `1602 x 1000`: `docs/design-references/faq-top-line-source-final-1602.png` and `docs/design-references/faq-top-line-local-final-1602.png`. The implementation now has the missing full-width one-pixel `#262626` rule at the FAQ section boundary while retaining the inner column and gutter rules.
- Cursor evidence: `docs/design-references/how-grid-source-final-1602.png` and `docs/design-references/how-cursor-local-final2-1602.png`. Runtime inspection confirms the source cursor geometry exactly: a `17 x 17px` SVG, `0 0 16.861 16.861` view box, `#0f0f11` fill, white stroke, and `1.5px` rounded stroke.
- Prominent Codexa values (`248`, `128`, and plan prices) use the source display face, Geist at `44px/500`; status percentages, step labels, and operational readings remain Geist Mono as on the live source. The serif percentage-card reference is not part of the Codexa source and was not applied globally.
- Mobile viewport: `390 x 844`; client width equals scroll width at `390px`, the FAQ rule remains one pixel, and the canvas resolves to `#09090b`.
- Browser console: zero application errors.

final result: passed

## Step spacing, section grids, testimonial tones, and footer interactions

- User references: `.context/attachments/u6yX6p/image.png`, `PjQ04K/image.png`, `s6kCVr/image.png`, `5XZ6rU/image.png`, `YuDBau/image.png`, `RnBRQv/image.png`, `Ldlj5M/image.png`, `9Hrlfa/image.png`, and `23seM2/image.png`; live source: `https://codexa.framer.website/#home`.
- Same-viewport comparison evidence at `1602 x 1000`: `docs/design-references/how-grid-source-final-1602.png` and `how-grid-local-final-1602.png`; `comparison-grid-source-final-1602.png` and `comparison-grid-local-final-1602.png`; `testimonials-background-source-final-1602.png` and `testimonials-background-local-final-1602.png`; `footer-gradient-lines-source-final-1602.png` and `footer-gradient-lines-local-final-1602.png`.
- The three-step section now matches the source geometry: three 400px columns, 24px card insets, 336px visual stages, and a measured 432px heading-to-step-label gap in both source and local renders.
- The comparison row now uses the source `180px / 420px / 420px / 180px` grid with full-width `#262626` top and bottom rules, panel-edge verticals, and a single center divider.
- Testimonial cards now alternate the measured source colors in sequence: `#09090b`, `#0f0f11`, `#09090b`, `#0f0f11`, `#09090b`, `#0f0f11`; the missing grid bottom rule is restored.
- The FAQ structure now uses the source right-column bottom rule without a duplicate full-width frame border.
- The footer CTA uses the measured grid mask and layered teal/white glow stack. Heading, trust line, button, lower columns, and rule intersections align with the live reference.
- Footer logo hover reaches the source transform `matrix(-0.95, 0, 0, -0.95, 0, 0)`. Footer links use the source two-line vertical rollover, moving the muted label by `-18px` and revealing the white duplicate.
- The footer bottom rule now spans the full 1200px content width. At `390 x 844`, client width and scroll width both remain `390px`.
- Browser console: zero application errors after clean navigation. `npm run check` and `git diff --check` both pass.

final result: passed

## Detailed hero, testimonial, and footer comparison

- Source evidence: `docs/design-references/detail-source-hero-2048.png`, `detail-source-testimonials-2048.png`, and `detail-source-footer-2048.png`.
- Final implementation evidence: `docs/design-references/detail-local-hero-2048-verified.png`, `detail-local-testimonials-2048-final-settled.png`, and `detail-local-footer-2048-verified-settled.png`.
- Shared viewport: `2048 x 1100` CSS pixels. The source element captures are 2033px wide because its scrollbar consumes 15px; the implementation captures are 2048px wide and preserve the same centered 1200px content frame.
- Hero: replaced the synthetic CSS grid with the exact 79px source texture, restored its overlay blend and radial mask, and reproduced the stacked teal/white dashboard glow layers and top highlight.
- Testimonials: restored the exact 400px three-column grid, 211.609px rows, single-pixel dividers, 24px card padding, 48px trust-strip separation, and mobile top boundary. No doubled rules or overlap remain.
- Footer: applied the same source grid texture with the footer-specific radial mask, restored both teal bloom layers and the white boundary highlight, allowed the glow to bleed across the CTA boundary, and used the source Codexa mark.
- Mobile viewport `390 x 844`: client width and scroll width both remain `390px`; the hero trust marquee, testimonial stack, CTA glow, link grid, and footer mark remain contained.
- Interaction and motion: reveal transitions settle to the measured source positions, marquees continue linearly, and CTA labels retain their vertical hover motion. Reduced-motion fallbacks remain available.
- Browser console: zero application errors; only Next.js development-only preload warnings were observed.
- Repository checks: lint, TypeScript, production build, route probes, and whitespace validation pass.
- Final visual review found no actionable P0, P1, or P2 discrepancies in these sections.

final result: passed

## Full homepage section audit

- Source: `https://codexa.framer.website/#home`; implementation: `http://localhost:3001/`.
- Desktop evidence covers hero, benefits, feature cards, How It Works, feature tabs, comparison, pricing, testimonials, FAQ, and CTA/footer in `docs/design-references/audit-home-source-*.png` and `docs/design-references/audit-home-local-final-*.png` at the same `1794px` viewport.
- Combined desktop review: `.context/audit-home-final-contact.png`.
- Mobile evidence covers the same responsive composition in `docs/design-references/audit-mobile-source-*.png` and the final local captures, including `audit-mobile-local-01-hero-final.png`, `audit-mobile-local-05-tabs-final.png`, and `audit-mobile-local-10-footer-final.png` at `390px`.
- Corrected the shared canvas, single-pixel horizontal and vertical rules, gutter strength, eyebrow pills, exact source trust wordmarks, hero wrapping, button label motion, mobile navigation, feature hover states, How It Works desktop/mobile motion, feature-tab geometry and typewriter, pricing heading wrap, testimonial marquee, FAQ disclosure, and footer CTA width.
- Interaction verification covers nav open/close, hover cards, tab switching/typewriter, pricing cadence, FAQ disclosure, marquees, CTA label motion, mobile auto-motion, and reduced-motion fallbacks.
- Responsive verification: document width equals viewport width at `390px` and `1794px`; no horizontal overflow.
- Browser console: zero application errors. The remaining warning is Next.js development-only CSS preload noise.
- Repository checks: lint, typecheck, production build, and whitespace validation pass.
- Final visual review found no actionable P0, P1, or P2 discrepancies.

final result: passed

## Footer frame continuity and grid comparison

- Source visual truth: `.context/attachments/yz7zFb/image.png` and live source capture `docs/design-references/footer-lines-grid-source-1602.png`.
- Implementation evidence: `docs/design-references/footer-lines-grid-local-final-1602.png` and `footer-lines-grid-local-final-mobile.png`.
- Desktop viewport: `1602 x 837` CSS pixels at device scale factor `1`. The source capture is `1587 x 738` because its scrollbar consumes 15px; the implementation was normalized by cropping 7px/8px side gutters and its 24px bottom spacer to the same `1587 x 738` comparison area.
- Full-view comparison: `.context/footer-lines-grid-final-comparison.png`, source on the left and implementation on the right. The outer frame rules now continue from the FAQ through the CTA, lower footer, and copyright bar.
- Focused detail: the source texture uses the supplied 79px raster asset rendered at a 75px repeat size. The implementation now matches the source `50% 0` footer positioning, masked 20% overlay compositing, stacking context, and radial fade instead of flattening the image and blend treatment onto one layer.
- Typography, layout rhythm, colors, source asset quality, and copy remain unchanged; the correction is limited to frame continuity and background texture compositing.
- Comparison history: the initial capture showed both side rules terminating at the end of the main content and an effectively invisible footer grid. The first fix extended the frame and separated the masked wrapper from the texture; the final fix matched the source 75px positioning and `z-index: 0` CTA stacking context, making the subtle grid visible.
- Mobile viewport: `390 x 844`; document client and scroll widths are both `390px`, desktop frame rules are intentionally hidden, and the CTA grid remains visible without overflow.
- Browser console: zero application errors. Lint, TypeScript, production build, route probe, and whitespace validation pass.
- Final visual review found no actionable P0, P1, or P2 discrepancies.

final result: passed

## Canvas gutter comparison

- Source evidence: `docs/design-references/codexa-gutters-live-capabilities-final.png`.
- Final implementation evidence: `docs/design-references/codexa-gutters-local-capabilities-final.png`.
- Shared viewport and state: `1794 x 897`, capability section with `Enterprise-level control` visible.
- Combined side-by-side review: `.context/codexa-gutters-capabilities-final-comparison.png`.
- Source gutter rule pixels measure `rgb(23 23 24)` to `rgb(24 24 25)` over the `rgb(9 9 11)` canvas; the implementation now measures `rgb(23 23 25)` over the same canvas.
- The frame rules are real foreground borders, so opaque section surfaces no longer conceal or weaken them.
- Homepage section surfaces and the brain panel now inherit the neutral page canvas instead of the darker blue-black fallback.
- Mobile viewport `390 x 844`: client width and scroll width both remain `390px`; desktop gutter rules are omitted.
- Browser console: zero errors after a clean navigation.
- Final visual review found no actionable P0, P1, or P2 discrepancies in the gutter treatment.

final result: passed

## Product Features hero comparison

- Source evidence: `docs/design-references/codexa-product-features-original-reference.png`, normalized to `1794 x 897` from the user-supplied `3589 x 1909` browser capture after removing its 116px browser-chrome region.
- Final implementation evidence: `docs/design-references/codexa-product-features-local-hero-final.png` at the same `1794 x 897` CSS-pixel viewport and device scale factor `1`.
- Full side-by-side review: `.context/codexa-product-features-hero-final-comparison.png`.
- Focused 1200px content comparison: `.context/codexa-product-features-hero-focused-final.png`.
- The generic inner-page banner was replaced with the original centered AI headline, supporting copy, white CTA, teal grid/glow, and source-sized workflow editor.
- The editor now includes the icon rail, file tree, Workflow/Triggers/Action tabs, active underline, line numbers, and syntax-highlighted code from the supplied original.
- Comparison history: the first pass corrected the missing composition; the second pass aligned the 1200px frame, editor top edge, title scale, glow, and viewport scrollbar behavior to the reference.
- Interaction check: all three editor tabs update their active state and code panel; the CTA retains the Codexa sliding-label hover treatment.
- Mobile viewport `390 x 844`: client width and scroll width are both `390px`; the editor condenses without document overflow.
- Reduced motion: editor-panel animation and tab transitions resolve at `0.01ms`.
- Browser console: zero application errors; one benign Next.js development warning.
- Final visual review found no actionable P0, P1, or P2 discrepancies.

final result: passed

## Features interaction comparison

- Live-source evidence:
  - `docs/design-references/codexa-features-live-workflow-hover-final.png`
  - `docs/design-references/codexa-features-live-release-hover-final.png`
  - `docs/design-references/codexa-features-live-throughput-hover-final.png`
- Final implementation evidence:
  - `docs/design-references/codexa-features-local-workflow-hover-final.png`
  - `docs/design-references/codexa-features-local-release-hover-final.png`
  - `docs/design-references/codexa-features-local-throughput-hover-final.png`
- Combined side-by-side review: `.context/codexa-features-all-hover-comparison.png`.
- Viewport and state: `1821 x 1344` CSS pixels, dark theme, each feature visual hovered after its transition settled.
- Workflow result: API integration and rate limits move upward and become active while error handling moves to the final row.
- Release result: Performance metrics and its cursor advance 80px into the testing column; the cursor scales to the source hover size.
- Throughput result: metric changes from `248 / +14%` to `280 / +22%`, all dots become active, and the four bar heights settle at the source values.
- Final visual review found no actionable P0, P1, or P2 discrepancies.

## Pricing, FAQ, and footer comparison

- Live-source and final implementation captures are paired for the top pricing state, reassurance/table boundary, FAQ, and footer:
  - `docs/design-references/codexa-pricing-live-top-pro-hover-final.png`
  - `docs/design-references/codexa-pricing-local-top-pro-hover-final.png`
  - `docs/design-references/codexa-pricing-live-table-final.png`
  - `docs/design-references/codexa-pricing-local-table-final.png`
  - `docs/design-references/codexa-pricing-live-faq-final.png`
  - `docs/design-references/codexa-pricing-local-faq-final.png`
  - `docs/design-references/codexa-pricing-live-footer-final.png`
  - `docs/design-references/codexa-pricing-local-footer-final.png`
- Combined side-by-side review: `.context/codexa-pricing-all-comparison.png`.
- Canvas-color evidence at `1821 x 1000`:
  - `docs/design-references/codexa-canvas-live-faq-final.png`
  - `docs/design-references/codexa-canvas-local-faq-final.png`
  - `.context/codexa-canvas-faq-final-comparison.png`
- The full page canvas and section backgrounds now use the source `#09090b`, eliminating the purple tint from both the side gutters and general page surfaces.
- Pricing cards, reassurance cells, table header, rows, custom-plan block, FAQ, CTA, lower footer grid, and copyright bar align with the source section positions at the shared viewport.
- Pricing and footer CTA labels now slide vertically and white buttons use the source hover fill.
- Final visual review found no actionable P0, P1, or P2 discrepancies.

final result: passed

## Navigation logo and horizontal-rule comparison

- Source visual truth: `.context/attachments/KOQsTJ/image.png`, `.context/attachments/qimy0w/image.png`, and live captures `docs/design-references/logo-hover-source-rest.png`, `logo-hover-source-800.png`, and `horizontal-lines-source-1602.png`.
- Implementation evidence: `docs/design-references/logo-hover-local-rest.png`, `logo-hover-local-active.png`, `horizontal-lines-local-final2-1602.png`, and `horizontal-lines-local-final-mobile.png`.
- Desktop viewport: `1602 x 1000` CSS pixels at device scale factor `1`; the 15px source scrollbar difference was normalized by cropping 7px/8px from the implementation before comparison.
- Full-view evidence: `.context/horizontal-lines-final-comparison.png`, source left and implementation right. The desktop trust marquee and its hero boundary are restored, and the benefit matrix now draws uninterrupted top and bottom rules above all three columns.
- Focused interaction evidence: `.context/logo-hover-final-comparison.png`, with source rest/hover on the left and implementation rest/hover on the right. The logo mark reaches the measured `rotate(180deg) scale(.95)` state and reverses on pointer exit; keyboard focus uses the same state.
- Fonts/typography, section spacing, colors, real logo and trust assets, and page copy remain source-aligned; no raster or code-drawn substitutes were introduced.
- Comparison history: the initial implementation hid the desktop trust marquee, omitted its section boundary, allowed the center brain panel to cover the matrix inset rule, and left the logo static. The final implementation restores the marquee, uses foreground one-pixel rules, and adds the measured logo transform with a reduced-motion fallback.
- Mobile viewport: `390 x 844`; scroll width equals client width, the boundary rule follows the 28px mobile frame, and stacked benefit cards retain their separators.
- Browser console: zero application errors. Lint, TypeScript, production build, route probe, and whitespace validation pass.
- Final visual review found no actionable P0, P1, or P2 discrepancies.

final result: passed

## Hero lower gradient and structural-rule contrast

- User references: `.context/attachments/oeLKWx/image.png` and `.context/attachments/ZnKU8X/image.png`; live-source evidence: `docs/design-references/horizontal-lines-source-1602.png`.
- Final implementation evidence: `docs/design-references/hero-lower-gradient-lines-local-final-1602.png` at the same `1602 x 1000` desktop viewport and `hero-lower-gradient-lines-local-final-mobile.png` at `390 x 844`.
- Full-view side-by-side review: `.context/hero-lower-gradient-lines-final-comparison.png`, source left and implementation right.
- The missing hero fade is restored from the source geometry: two teal 592.445px circles, positioned at 9.09% and 37.05% of the dashboard width, blurred 100px at 70% opacity behind the dashboard and trust strip.
- The inconsistent line brightness came from aligned frame layers showing through the translucent fixed navigation. The home frame is now one continuous `#262626` rule, the navigation uses the source opaque `#09090b` canvas, and the benefit matrix, brain dividers, hero boundary, shared frame, and footer frame use the same neutral one-pixel rule.
- Desktop computed-style verification confirms the navigation, page frame, matrix top/bottom rules, and brain dividers all resolve to `rgb(38, 38, 38)` without duplicate layers.
- Mobile client and scroll widths both equal `390px`; the desktop outer frame is intentionally hidden and no horizontal overflow is present.
- Browser console: zero application errors after a clean navigation. The remaining warning is Next.js development-only preload noise.

final result: passed

## Feature-tab viewport-triggered typewriter

- User reference: `.context/attachments/Ck2zEK/image.png`; live source: `https://codexa.framer.website/#home`.
- Source evidence: `docs/design-references/feature-typewriter-source-entry-1440.png`; final implementation evidence: `docs/design-references/feature-typewriter-local-entry-1440.png`.
- Combined mid-animation review: `.context/feature-typewriter-entry-final-comparison.png`, source left and implementation right, at a shared `1440 x 900` viewport.
- Clean-load behavior before the fix: the local snippet contained all 340 characters before the section was scrolled into view, so the typewriter completed offscreen. The source code length continued changing after viewport entry without a click.
- Final clean-load behavior: the local snippet contains zero characters while offscreen, begins typing on first viewport entry, and continues changing without any click.
- Tab interaction remains intact: selecting Layout Stability clears the old snippet, sets `aria-selected="true"`, and restarts typing for that tab.
- Browser console: zero application errors after a clean navigation.

final result: passed

## Dashboard depth, trust-logo alpha, and animated ASCII brain

- User references: `.context/attachments/uJz3Ss/image.png` and `.context/attachments/wYDCs9/image.png`; live source: `https://codexa.framer.website/#home`.
- Full-section evidence: `docs/design-references/brain-frame-logos-source-1602.png` and `brain-frame-logos-local-final-1602.png` at `1602 x 1000`; combined review: `.context/brain-frame-logos-final-comparison.png`.
- Focused brain evidence: `docs/design-references/ascii-brain-source-final-432.png` and `ascii-brain-local-final-432.png`; combined review: `.context/ascii-brain-final-comparison.png`.
- Dashboard geometry now matches the live source: 1100px outer shell, 1098px inset frame, 1096px image, nested 14px/11px/10px radii, `#09090b` and `#0f0f11` shell colors, 1200px perspective, inset highlight, and the measured eight-layer depth shadow.
- All five trust wordmarks were converted from dark-background RGB captures to true-alpha PNGs and are served unoptimized, so the teal bloom remains visible continuously behind every logo.
- The static brain raster was replaced with the source mechanism: an 80 by 55 source mask, two synchronized 4455-character layers, the measured weighted 69-character palette, a sharp foreground, a 30px blurred glow, 16px Geist Mono type scaled to 50%, and a 100ms refresh cadence.
- Runtime timing verification observed frame changes at approximately 100ms intervals and confirmed both layers always contain the same frame.
- Reduced motion keeps the brain static. At `390 x 844`, the desktop brain remains intentionally hidden and client width equals scroll width at `390px`.
- Browser console: zero application errors after a clean navigation.
- Repository validation: `npm run check` and `git diff --check` both pass.

final result: passed

## Footer rule colors and Company mega-menu

**Findings**

- [P2, resolved] Footer dividers used one flattened gray value. The live source uses translucent white at 15% for the newsletter, logo, and link-column boundaries, then solid `#262626` for the outer frame and copyright boundary. The implementation now uses the same two-level rule system without overlapping borders.
- [P1, resolved] The desktop Company mega-menu was absent. The implementation now exposes the full menu on Company hover and keyboard focus, preserves it while the pointer moves through menu links, and closes it on pointer exit or Escape.

**Comparison evidence**

- Source visual truth: `.context/attachments/k9iFWZ/image.png`, `.context/attachments/xg8ZSk/image.png`, `docs/design-references/footer-line-colors-source-final-2048x536.png`, and `docs/design-references/company-mega-menu-source-final-2048.png`.
- Rendered implementation: `docs/design-references/footer-line-colors-local-final-2048x536.png` and `docs/design-references/company-mega-menu-local-final-2048.png`.
- Footer comparison viewport: `2048 x 536` CSS pixels at device scale factor `1`; both PNGs are `2048 x 536`. The source reserves 15px for its scrollbar while the local browser uses an overlay scrollbar, so judgment used the shared 1200px content frame and computed border styles.
- Mega-menu comparison viewport: `2048 x 900` CSS pixels at device scale factor `1`; both PNGs are `2048 x 900`. State: dark theme, `/company/about`, Company navigation item hovered, menu fully open.
- Full-view evidence: the menu source/local pair verifies the 1200px frame, 362px panel, 315px hiring card, column rhythm, typography, copy, and page overlay relationship.
- Focused evidence: the footer source/local pair and runtime style inspection verify `rgba(255, 255, 255, 0.15)` internal rules and solid `rgb(38, 38, 38)` structural rules.

**Required fidelity surfaces**

- Fonts and typography: menu headings use Geist at `20px/26px`; link titles and descriptions use the source `15px/18px` hierarchy and wrapping.
- Spacing and layout rhythm: the menu is `1200 x 362px`, uses `24px 24px 48px` padding, a 48px primary gap, and 24px between link groups; the footer retains its measured 470/260/470 tracks.
- Colors and visual tokens: `#09090b` canvas, `#0f0f11` icon surfaces, `#1e1e20` active Company pill, 15% white internal rules, and `#262626` structural rules match live computed styles.
- Image quality and asset fidelity: the hiring card uses the original Framer-hosted `512 x 288` JPEG with source-equivalent cover cropping; the Codexa mark remains the original extracted asset.
- Copy and content: hiring, Company, Product, descriptions, and footer copy match the live source.

**Interaction and responsive checks**

- Hovering from Company into About Codexa keeps `aria-expanded="true"`; leaving the header closes the panel; Escape and focus departure also close it.
- At `390 x 844`, the desktop mega-menu remains hidden, client width equals scroll width at `390px`, and mobile footer separators retain the 15% source rule without a duplicate bottom edge.
- Browser console: zero application errors.
- Repository validation: `npm run check` and `git diff --check` pass; the local server returns HTTP 200.

**Open Questions**

- None.

**Implementation Checklist**

- [x] Restore source footer rule opacity hierarchy.
- [x] Add the complete Company mega-menu and source hiring image.
- [x] Verify hover, focus, Escape, pointer exit, desktop rendering, and mobile overflow.

**Follow-up Polish**

- No remaining P0, P1, or P2 issues in the requested regions.

final result: passed
