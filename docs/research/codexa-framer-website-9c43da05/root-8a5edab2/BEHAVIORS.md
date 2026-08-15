# Codexa Behaviors

## Global

- Source root has class `lenis`; scrolling is smoothed, without scroll snap.
- Navigation is fixed at `top: 0`, `height: 72px`, `z-index: 10`, `background: rgb(9, 9, 11)`, `backdrop-filter: blur(10px)`. Its computed style does not change between scrollY 0 and 400.
- Desktop structural rules use one foreground `#262626` line. The fixed navigation is opaque so the continuous page-frame rule cannot show through and double the apparent brightness.
- The solution-section brain uses an 80 by 55 source mask and refreshes its weighted ASCII field every 100ms. A sharp layer and a synchronized 30px-blurred layer share the same frame; reduced motion keeps one static frame.
- Section content reveals once as it enters the viewport. The source starts at `opacity: 0` and `translateY(40px)`, settles over roughly 700ms with `cubic-bezier(.2, .8, .2, 1)`, and staggers adjacent heading/content groups by about 100ms. Motion is disabled under `prefers-reduced-motion`.
- The three “How it works” diagrams use hover-driven variants on desktop: the integration logo rail advances and reveals its status label, the workflow cursor moves from the second row to the first and transfers the active check state, and the analytics cursor moves to the chart point while revealing its tooltip. On touch-sized viewports the same variants cycle automatically every 1.8 seconds. Small status dots pulse continuously.
- The three feature visuals also use hover-driven variants. Workflow rows reorder so API integration and rate limits become active; the release card and cursor advance one column; system throughput changes from `248 / +14%` to `280 / +22%`, activates all status dots, and animates all four bar heights.
- Desktop headings: H1 64/67.2px; section H2 52/57.2px; feature H3 44/48.4px. At 768px and 390px: H1 48/50.4px, H2 40/44px, feature H3 34/37.4px.

## Navigation and buttons

- The Codexa navigation mark rotates 180 degrees and scales to 95% over roughly 260ms on hover or keyboard focus, then reverses when the interaction ends.
- Desktop nav link color changes `rgb(150, 150, 150)` to white on hover.
- “Company” is hover/click affordance; the captured home page did not expose a populated dropdown in the DOM.
- White pill buttons are 42px high, `border-radius: 50px`, with two vertically stacked labels clipped inside; hover translates the label stack by one line.
- Pricing and footer CTA buttons use the same clipped two-label motion. Dark pricing buttons transition from `#0f0f11` to `#1e1e20`; white buttons settle at `#bdbdbd` on hover.
- Marquees move linearly and continuously, pause when the document is not active, and become static under reduced motion.
- Mobile/tablet navigation pairs the Codexa logo with a three-line hamburger. The button opens a full-width menu containing Features, Pricing, Changelog, Company, FAQs, Contact, and Get Started, then changes to a close icon while expanded.

## Feature tabs

- Interaction model: click-driven.
- The initial Developer Experience typewriter starts once when the feature-tab section first enters the viewport; it does not run offscreen during initial page load.
- `Developer Experience`: title “Production-first behavior, without compromises”.
- `Layout Stability`: title “Built to handle real data and real edge cases”.
- `Production Ready`: title “Designed to scale with your product”.
- Each tab restarts a source-matched code typewriter and automatically follows the newest code line; reduced-motion mode renders the full snippet immediately.
- Desktop uses a 68px horizontal tab bar above the code/copy panel. Mobile uses code, circular previous/next controls with a `1/3` counter, then copy and CTA; the section height stays stable while switching.

## Pricing

- Interaction model: click-driven segmented toggle.
- Monthly prices: `$49`, `$79`, `$129`.
- Yearly prices: `$35`, `$65`, `$115`; “20% OFF” sits beside YEARLY.
- Toggle changes values in place in roughly 350ms; card layout and section height stay fixed.
- On the pricing detail route, the pricing cards begin 70.2px below the section start, the comparison table begins flush with its 1100.453px section, and the custom-plan row follows the 846px comparison table.

## Footer

- The CTA is 450px high and the `Automate more. / Ship faster.` heading wraps to two centered lines at desktop sizes.
- Hero and footer CTA backgrounds repeat the source 79px grid texture at 20% opacity with `overlay` blending. The hero uses a 50% by 35% radial mask centered at 40.6%; the footer uses a 50% by 62% radial mask centered at 66.4%.
- The dashboard and footer boundary glows each combine two blurred teal ellipses with a narrow white highlight rather than a single gradient layer.
- Behind the hero dashboard, two 592.445px teal circles begin at 9.09% and 37.05% of the dashboard width with 100px blur and 70% opacity; their lower bleed supplies the subtle trust-row gradient.
- The hero dashboard uses a 1100px outer shell, a 1098px `#0f0f11` inset frame, and a 1096px image with 14px, 11px, and 10px radii respectively. Its source shadow is an inset highlight plus eight progressively softer depth layers under a 1200px perspective.
- Trust-strip wordmarks are true-alpha PNGs; their dark extraction backgrounds must not be reintroduced by image optimization.
- The lower footer grid is 238px high, followed by a 48.8px copyright bar and a 24px spacer.

## FAQs

- Interaction model: click-driven independent disclosure rows.
- Default rows are collapsed. Each click toggles only that row; multiple rows can stay open.
- Most answers add about 56.4px; the longer “replace tools” answer adds about 79.6px.
- Answer copy is present in the DOM and revealed with height/opacity motion.

## Responsive

- At 768px, scroll height is 12,629px; at 390px it is 13,498px.
- Desktop multi-column structures stack. Cards become full-width. Pricing plans stack.
- The feature-tab code panel is followed by copy; comparison stacks; FAQ intro precedes the accordion.
- Floating Framer “Get Template” and “Made in Framer” controls are editor/template chrome and are excluded from the clone.
- The hero trust-logo marquee is present at desktop and mobile sizes; its bottom rule forms the visible boundary between the hero and solution sections.
