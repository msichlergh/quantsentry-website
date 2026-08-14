import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type IconProps = ComponentProps<"svg">;

const base = "size-5";

function Svg({ className, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn(base, className)}
      {...props}
    >
      {children}
    </svg>
  );
}

/** Atlas — cross-custodian netting */
export function NetworkIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="17" r="2" />
      <circle cx="19" cy="17" r="2" />
      <path d="M12 7v4M12 11 6.3 15.4M12 11l5.7 4.4" />
    </Svg>
  );
}

/** Atlas — break detection */
export function AlertDiamondIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 20.5 12 12 20.5 3.5 12 12 3.5Z" />
      <path d="M12 9v4" />
      <circle cx="12" cy="15.75" r="0.75" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/** Atlas — live graph, not a snapshot */
export function PulseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 12h4l2 7 4-14 2 7h6" />
    </Svg>
  );
}

/** Atlas — custom clustering */
export function LayersIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
      <path d="m4 12 8 4.5 8-4.5" />
      <path d="m4 16.5 8 4.5 8-4.5" />
    </Svg>
  );
}

/** Atlas — concentration alerts */
export function GaugeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 15a8 8 0 1 1 16 0" />
      <path d="M12 15 15.5 9" />
      <path d="M4 15h1.5M18.5 15H20M6 8.5l1 1M18 8.5l-1 1" />
    </Svg>
  );
}

/** Atlas — audit trail */
export function HistoryIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 8a8 8 0 1 1 1.5 9.5" />
      <path d="M4 4v4h4" />
      <path d="M12 8v4.5l3 2" />
    </Svg>
  );
}

/** Query — plain-language input */
export function TerminalIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="m7.5 10 3 2.5-3 2.5M13 15h4" />
    </Svg>
  );
}

/** Query — source citations */
export function LinkDocIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 4.5H6a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 6 19.5h12a1.5 1.5 0 0 0 1.5-1.5v-2" />
      <path d="M8.5 15.5 19 5M19 5h-5M19 5v5" />
    </Svg>
  );
}

/** Query — scenario stress */
export function BoltChartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 19V9M9.5 19V5M15 19v-7M20 19v-3" />
      <path d="M18 3 15 8h3l-3 5" />
    </Svg>
  );
}

/** Query — saved queries */
export function BookmarkIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.5 4.5h11a1 1 0 0 1 1 1V20l-6.5-4-6.5 4V5.5a1 1 0 0 1 1-1Z" />
    </Svg>
  );
}

/** Query — explainable math */
export function SigmaIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M17 5H7l5.5 7L7 19h10" />
    </Svg>
  );
}

/** Query — Slack & terminal delivery */
export function SendIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m4 12 16-7.5-6 16-2.8-6.7L4 12Z" />
      <path d="M13.2 13.8 20 4.5" />
    </Svg>
  );
}

/** Sentinel — multi-metric envelopes */
export function BandsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 8c4-2.5 14-2.5 18 0" />
      <path d="M3 16c4 2.5 14 2.5 18 0" />
      <path d="M4 8v8M20 8v8" />
    </Svg>
  );
}

/** Sentinel — configurable sensitivity */
export function SlidersIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 5v6M5 15v4M12 5v3M12 12v7M19 5v10M19 19v0" />
      <circle cx="5" cy="13" r="2" />
      <circle cx="12" cy="9.5" r="2" />
      <circle cx="19" cy="17" r="2" />
    </Svg>
  );
}

/** Sentinel — root-cause attribution */
export function TargetIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </Svg>
  );
}

/** Sentinel — early warning */
export function BellEarlyIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 17v-5a6 6 0 1 1 12 0v5l1.5 2.5h-15L6 17Z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </Svg>
  );
}

/** Sentinel — strategy health scoring */
export function ScoreIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.5 2.3 2.3 4.7-5.6" />
    </Svg>
  );
}

/** Sentinel — alert routing */
export function RouteIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="5.5" cy="6" r="2" />
      <circle cx="18.5" cy="18" r="2" />
      <path d="M5.5 8v3a3 3 0 0 0 3 3h7a3 3 0 0 1 3 3" />
    </Svg>
  );
}
