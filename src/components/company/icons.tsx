import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type IconProps = ComponentProps<"svg">;

const iconBase = "size-5";

/** Shared wrapper — accent-tinted tile behind an inline SVG glyph. */
export function IconTile({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex size-9 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ScaleIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={cn(iconBase, className)}
      {...props}
    >
      <path
        d="M10 2.5v15M4 5.5h12M6.5 5.5 3 12.5a3.5 3.5 0 0 0 7 0L6.5 5.5ZM13.5 5.5 10 12.5a3.5 3.5 0 0 0 7 0l-3.5-7Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TargetIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={cn(iconBase, className)}
      {...props}
    >
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="10" cy="10" r="0.75" fill="currentColor" />
    </svg>
  );
}

export function ShieldIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={cn(iconBase, className)}
      {...props}
    >
      <path
        d="M10 2.5 16 5v5.2c0 4-2.7 6.9-6 7.8-3.3-.9-6-3.8-6-7.8V5l6-2.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M7.3 10.1 9.2 12l3.6-4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HandshakeIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={cn(iconBase, className)}
      {...props}
    >
      <path
        d="M2.5 8.5 5 6l3 2 3-2 2.2 1.7"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 8.5 6 12l1.5-1.2M17.5 8.5 14 12l-1.5-1.2M8 10l1.6 1.6a1.4 1.4 0 0 0 2-2L10 8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GlobeIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={cn(iconBase, className)}
      {...props}
    >
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M3 10h14M10 3c1.8 2 2.8 4.4 2.8 7s-1 5-2.8 7c-1.8-2-2.8-4.4-2.8-7S8.2 5 10 3Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

export function UsersIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={cn(iconBase, className)}
      {...props}
    >
      <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M2.5 16c.4-2.8 2.2-4.5 4.5-4.5s4.1 1.7 4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="14" cy="7" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M12.6 11.7c1.9.3 3.2 1.8 3.6 4.3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BoltIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={cn(iconBase, className)}
      {...props}
    >
      <path
        d="M11 2.5 4.5 11h4l-.8 6.5L15.5 9h-4l.5-6.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeartIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={cn(iconBase, className)}
      {...props}
    >
      <path
        d="M10 17s-6.2-3.9-6.2-8.6A3.6 3.6 0 0 1 10 6.2 3.6 3.6 0 0 1 16.2 8.4C16.2 13.1 10 17 10 17Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BookIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={cn(iconBase, className)}
      {...props}
    >
      <path
        d="M3 4.5c1.4-.7 3.7-.9 5.5.3v10c-1.8-1.2-4.1-1-5.5-.3v-10ZM17 4.5c-1.4-.7-3.7-.9-5.5.3v10c1.8-1.2 4.1-1 5.5-.3v-10Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlaneIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={cn(iconBase, className)}
      {...props}
    >
      <path
        d="M11.5 2.5 17.5 8.5 11.9 9.9 15 16 12.7 16.6 9.5 11 6.2 13.6 5.6 16 4 16.4 4.4 14.4 3.4 11.1 5.8 9.8 2.5 8.6 3.1 6.3 9.2 7.5 11.5 2.5Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={cn("size-4", className)}
      {...props}
    >
      <path
        d="m7.5 4.5 6 5.5-6 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
