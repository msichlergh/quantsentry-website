import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Page content column. Matches the 1200px measure used across the design system. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1200px] px-4 md:px-6", className)}
      {...props}
    />
  );
}

/** Mono eyebrow label. 11/15 500, wide tracking, muted. */
export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "font-mono text-label tracking-[0.08em] uppercase text-subtle-foreground",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Display headline. The negative leading + tight tracking is the signature of
 * this design language — see docs/research/design-system/DESIGN_TOKENS.md.
 */
export function Display({
  as: Tag = "h2",
  size = "lg",
  className,
  ...props
}: ComponentProps<"h2"> & { as?: "h1" | "h2" | "h3"; size?: "xl" | "lg" | "md" }) {
  return (
    <Tag
      className={cn(
        "font-heading text-balance text-foreground",
        size === "xl" && "text-[44px]/[42px] tracking-[-1.2px] md:text-display-xl",
        size === "lg" && "text-[36px]/[36px] tracking-[-1px] md:text-display-lg",
        size === "md" && "text-[30px]/[32px] tracking-[-0.8px] md:text-display-md",
        className,
      )}
      {...props}
    />
  );
}

export function Lead({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("max-w-[52ch] text-body text-muted-foreground", className)}
      {...props}
    />
  );
}

/** Section wrapper with the standard vertical rhythm and optional top hairline. */
export function Section({
  bordered = true,
  className,
  children,
  ...props
}: ComponentProps<"section"> & { bordered?: boolean }) {
  return (
    <section
      className={cn(
        "py-16 md:py-24",
        bordered && "border-t border-border",
        className,
      )}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  href?: string;
  children: ReactNode;
  className?: string;
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50";

const buttonVariants = {
  primary: "bg-foreground text-primary-foreground hover:bg-muted-foreground",
  secondary:
    "bg-surface-hover text-foreground hover:bg-[#332e2c] border border-border",
  ghost: "text-muted-foreground hover:text-foreground",
} as const;

const buttonSizes = {
  sm: "h-8 px-3 text-caption",
  md: "h-10 px-4 text-body-sm",
} as const;

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...props
}: ButtonProps & Omit<ComponentProps<"button">, "children" | "className">) {
  const classes = cn(
    buttonBase,
    buttonVariants[variant],
    buttonSizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

/** Panel surface used for cards, stat tiles and feature blocks. */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-[#3a3532]",
        className,
      )}
      {...props}
    />
  );
}

/** Pill badge. Used for "New", statuses, and category tags. */
export function Badge({
  tone = "neutral",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: "neutral" | "accent" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-label tracking-[0.06em] uppercase",
        tone === "neutral" &&
          "border-border bg-surface text-subtle-foreground",
        tone === "accent" &&
          "border-accent/25 bg-accent/10 text-accent",
        className,
      )}
      {...props}
    />
  );
}

/** Small live status dot in the accent colour. */
export function Dot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("size-1.5 rounded-full bg-accent", className)}
    />
  );
}
