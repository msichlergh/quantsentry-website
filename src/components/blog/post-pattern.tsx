import { cn } from "@/lib/utils";

/**
 * Deterministic cover art for a post, derived entirely from its slug — no
 * raster images. Same slug always renders the same pattern. Colour is limited
 * to existing design tokens (accent + the neutral surface/border ramp); only
 * the geometry (angles, counts, positions) varies per post.
 */

const VIEW_W = 640;
const VIEW_H = 360;

/** djb2 string hash, kept in unsigned 32-bit range. */
function hashSlug(slug: string): number {
  let hash = 5381;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 33) ^ slug.charCodeAt(i);
  }
  return hash >>> 0;
}

/** mulberry32 — small deterministic PRNG seeded from the slug hash. */
function createRng(seed: number) {
  let a = seed;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LINE_TONES = [
  "stroke-border",
  "stroke-surface-hover",
  "stroke-accent/25",
] as const;

const DOT_TONES = ["fill-accent/40", "fill-subtle-foreground/50"] as const;

export function PostPattern({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const rng = createRng(hashSlug(slug));

  const angle = Math.floor(rng() * 60) - 30;
  const lineCount = 5 + Math.floor(rng() * 5);
  const lineSpacing = VIEW_W / lineCount;

  const dotCount = 8 + Math.floor(rng() * 10);
  const dots = Array.from({ length: dotCount }, () => ({
    cx: rng() * VIEW_W,
    cy: rng() * VIEW_H,
    r: 2 + rng() * 4,
    tone: DOT_TONES[Math.floor(rng() * DOT_TONES.length)],
  }));

  const blobCx = rng() * VIEW_W;
  const blobCy = rng() * VIEW_H;
  const blobR = 90 + rng() * 90;

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
    >
      <rect width={VIEW_W} height={VIEW_H} className="fill-surface-raised" />
      <circle
        cx={blobCx}
        cy={blobCy}
        r={blobR}
        className="fill-accent/10"
      />
      <g
        style={{ transformOrigin: `${VIEW_W / 2}px ${VIEW_H / 2}px` }}
        transform={`rotate(${angle})`}
      >
        {Array.from({ length: lineCount + 4 }, (_, i) => {
          const x = -VIEW_H + i * lineSpacing;
          return (
            <line
              key={i}
              x1={x}
              y1={-VIEW_H}
              x2={x}
              y2={VIEW_H * 2}
              strokeWidth={1}
              className={LINE_TONES[i % LINE_TONES.length]}
            />
          );
        })}
      </g>
      {dots.map((dot, i) => (
        <circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          className={dot.tone}
        />
      ))}
      <rect
        width={VIEW_W}
        height={VIEW_H}
        className="fill-none stroke-border"
        strokeWidth={1}
      />
    </svg>
  );
}
