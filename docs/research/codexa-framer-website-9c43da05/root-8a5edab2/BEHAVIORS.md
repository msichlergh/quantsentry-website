# Codexa Behaviors

## Global

- Source root has class `lenis`; scrolling is smoothed, without scroll snap.
- Navigation is fixed at `top: 0`, `height: 72px`, `z-index: 10`, `background: rgb(9, 9, 11)`, `backdrop-filter: blur(10px)`. Its computed style does not change between scrollY 0 and 400.
- Section content reveals with transform/opacity motion as it enters the viewport. Clone with a 500ms ease-out fade-up and disable under `prefers-reduced-motion`.
- Desktop headings: H1 64/67.2px; section H2 52/57.2px; feature H3 44/48.4px. At 768px and 390px: H1 48/50.4px, H2 40/44px, feature H3 34/37.4px.

## Navigation and buttons

- Desktop nav link color changes `rgb(150, 150, 150)` to white on hover.
- “Company” is hover/click affordance; the captured home page did not expose a populated dropdown in the DOM.
- White pill buttons are 42px high, `border-radius: 50px`, with two vertically stacked labels clipped inside; hover translates the label stack by one line.
- Mobile/tablet navigation contains only the Codexa logo; no hamburger is present.

## Feature tabs

- Interaction model: click-driven.
- `Developer Experience`: title “Production-first behavior, without compromises”.
- `Layout Stability`: title “Built to handle real data and real edge cases”.
- `Production Ready`: title “Designed to scale with your product”.
- State swap uses an opacity/translate transition; section height stays 898.406px on desktop.

## Pricing

- Interaction model: click-driven segmented toggle.
- Monthly prices: `$49`, `$79`, `$129`.
- Yearly prices: `$35`, `$65`, `$115`; “20% OFF” sits beside YEARLY.
- Toggle changes values in place in roughly 350ms; card layout and section height stay fixed.

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

