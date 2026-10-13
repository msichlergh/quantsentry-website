import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Fonts and images for the generated social cards.
 *
 * These are read once at module scope: they never depend on request data, so
 * the OG routes stay statically optimised.
 *
 * The `.ttf` files are the repo's own `public/fonts/general-sans-*.woff2`
 * re-flavoured to TrueType. Satori — the renderer behind `next/og` — cannot
 * decode woff2, and falling back to `system-ui` would let the build host's
 * installed fonts decide whether `é` / `č` / `ž` render or come out as tofu.
 * Embedding an explicit face removes that variable. Coverage is 384 glyphs
 * (Latin + Latin Extended-A + the typographic punctuation the copy uses).
 *
 * 500 is the site's heading weight (`h1,h2,h3` in `globals.css`). Satori snaps
 * an unregistered weight to the nearest registered face, so the headline only
 * renders at 500 — rather than being rounded up to 600 — because this face is
 * embedded alongside the other two.
 */

const OG_DIR = join(process.cwd(), "app", "_og");

export const generalSans400 = await readFile(join(OG_DIR, "general-sans-400.ttf"));
export const generalSans500 = await readFile(join(OG_DIR, "general-sans-500.ttf"));
export const generalSans600 = await readFile(join(OG_DIR, "general-sans-600.ttf"));

/**
 * The wordmark face. `.brand-wordmark` in `globals.css` is DM Sans, not General
 * Sans, at the two off-steps 450 and 550 — so the card's lockup only matches the
 * header's if those exact instances ship with it. Both are pinned from the same
 * variable DM Sans `next/font` serves on the site (`app/layout.tsx`).
 */
const dmSans450 = await readFile(join(OG_DIR, "dm-sans-450.ttf"));
const dmSans550 = await readFile(join(OG_DIR, "dm-sans-550.ttf"));

export const ogFonts = [
  { name: "General Sans", data: generalSans400, style: "normal" as const, weight: 400 as const },
  { name: "General Sans", data: generalSans500, style: "normal" as const, weight: 500 as const },
  { name: "General Sans", data: generalSans600, style: "normal" as const, weight: 600 as const },
  { name: "DM Sans", data: dmSans450, style: "normal" as const, weight: 400 as const },
  { name: "DM Sans", data: dmSans550, style: "normal" as const, weight: 500 as const },
];

const markData = await readFile(
  join(process.cwd(), "public", "images", "quantsentry-icon-teal-cluster.png"),
  "base64",
);

/** The QuantSentry brand mark, inlined so the card needs no network fetch. */
export const brandMarkSrc = `data:image/png;base64,${markData}`;

/**
 * The hero's pixel field, baked to a transparent PNG.
 *
 * `PixelBlast` is WebGL; satori renders static markup, so the card cannot run
 * it. This frame was captured from the component itself at card size with the
 * same props the hero uses (`components/HeroPixelBlast.tsx`), then shaped in
 * alpha: faint behind the left-aligned copy, strongest top-right, clear of the
 * footer row.
 */
const pixelFieldData = await readFile(join(OG_DIR, "pixel-field.png"), "base64");

export const pixelFieldSrc = `data:image/png;base64,${pixelFieldData}`;

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";
