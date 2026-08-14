# Design Tokens — dark warm-neutral design language

Sampled via `getComputedStyle()` across the reference page at 1440px. These are the
generic design parameters (palette ramp, type scale, radii, spacing rhythm) — the
foundation QuantSentry's own site is built on. Wired into `src/app/globals.css`.

## Palette

The whole system is a warm-neutral (stone) ramp on true black, with exactly one
high-chroma accent. No second hue anywhere.

| Token | Value | Role |
| --- | --- | --- |
| `--background` | `#000000` | Page base |
| `--surface-raised` | `#141210` | Header bar, raised strips |
| `--surface` / `--card` | `#1C1917` | Cards, panels, inputs |
| `--surface-hover` | `#292524` | Hover fill, secondary button, borders |
| `--foreground` | `#FAFAF9` | Primary text, headings |
| `--muted-foreground` | `#A6A09B` | Body copy, descriptions |
| `--subtle-foreground` | `#79716B` | Meta text, nav inactive |
| `--faint-foreground` | `#57534E` | Disabled, faint labels |
| `--accent` | `#10EC90` | Single accent — status dots, highlights, active state |
| `--border` | `#292524` | Hairlines, dividers, card edges |

Contrast: `#FAFAF9` on `#000000` ≈ 20:1; `#A6A09B` on `#000000` ≈ 9.2:1;
`#79716B` on `#000000` ≈ 4.9:1 — all pass WCAG AA for their sizes.

## Typography

Two families plus a display face:

- **Display** — Cabinet Grotesk 700 (Fontshare, free licence). Used only for hero and
  major section headlines. Falls back to Geist until the woff2 is added to `public/fonts`.
- **Body** — Geist 400/500/600 (Google Fonts, OFL). All UI and prose.
- **Label** — Geist Mono 400/500. Eyebrow labels, badges, stat captions, code.

Scale (all values measured, not estimated):

| Token | Size / line-height | Tracking | Weight | Family |
| --- | --- | --- | --- | --- |
| `text-display-xl` | 72 / 64 | -2.16px | 700 | Display |
| `text-display-lg` | 60 / 52 | -1.5px | 700 | Display |
| `text-display-md` | 48 / 40 | -0.96px | 700 | Display |
| `text-heading-lg` | 32 / 34 | -0.32px | 600 | Body |
| `text-heading-md` | 18 / 24 | normal | 600 | Body |
| `text-heading-sm` | 16 / 20 | normal | 600 | Body |
| `text-body` | 16 / 24 | normal | 400 | Body |
| `text-body-sm` | 14 / 20 | normal | 400–500 | Body |
| `text-caption` | 12 / 16 | normal | 400–500 | Body |
| `text-label` | 11 / 15 | normal | 500 | Mono |

Note the tight display leading — line-height sits *below* font size on all three display
steps (72/64, 60/52, 48/40). That negative leading plus heavy negative tracking is what
gives the headlines their density. It is the single most characteristic parameter here.

## Structure

- Content column: max-width ~1200px, gutters 24px desktop / 16px mobile
- Radii: 8px (inputs, small chips), 12px (cards), 999px (pills, badges)
- Hairline borders at `1px solid #292524` — used heavily as section dividers and a
  faint full-height column grid
- Vertical section rhythm: ~96–128px desktop, ~64px mobile

## Fonts to install

| Family | Source | Licence | Status |
| --- | --- | --- | --- |
| Geist | `next/font/google` | OFL | Wired |
| Geist Mono | `next/font/google` | OFL | Wired |
| Cabinet Grotesk | fontshare.com | Free (ITF FFL) | Download woff2 → `public/fonts`, switch to `next/font/local` |
