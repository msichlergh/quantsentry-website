import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Prominent callout marking legal content as an unreviewed placeholder.
 * Must stay visible at the top of every legal page until real counsel-
 * reviewed copy replaces it.
 */
export function DraftNotice({ className }: { className?: string }) {
  return (
    <div
      role="note"
      aria-label="Draft disclaimer"
      className={cn(
        "flex gap-3 rounded-xl border border-border bg-surface-raised p-4 md:p-5",
        className,
      )}
    >
      <AlertTriangle
        aria-hidden
        className="mt-0.5 size-5 shrink-0 text-subtle-foreground"
      />
      <p className="text-body-sm text-muted-foreground">
        <span className="font-medium text-foreground">
          Draft template — not legal advice.
        </span>{" "}
        This page is placeholder copy for a template site. It has not been
        reviewed by counsel and must not be relied on as a finished legal
        document. Replace this content and have it reviewed by a qualified
        lawyer in each relevant jurisdiction before this site goes live.
      </p>
    </div>
  );
}
