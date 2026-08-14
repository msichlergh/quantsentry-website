import Link from "next/link";
import { cn } from "@/lib/utils";

/** QuantSentry mark: a shield outline with a rising signal step inside. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("size-6", className)}
    >
      <path
        d="M12 1.75 3.75 4.9v6.3c0 5.02 3.35 9.4 8.25 11.05 4.9-1.65 8.25-6.03 8.25-11.05V4.9L12 1.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7.75 14.25 10.5 11l2 2.25 3.75-4.75"
        stroke="#10EC90"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 text-foreground transition-opacity hover:opacity-80",
        className,
      )}
    >
      <LogoMark />
      <span className="font-heading text-[19px] font-bold tracking-[-0.4px]">
        QuantSentry
      </span>
    </Link>
  );
}
