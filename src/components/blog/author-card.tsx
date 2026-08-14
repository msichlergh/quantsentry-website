import type { Author } from "@/lib/blog-data";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-6">
      <div
        aria-hidden
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-hover font-mono text-label text-foreground"
      >
        {initials(author.name)}
      </div>
      <div>
        <p className="text-body-sm font-medium text-foreground">{author.name}</p>
        <p className="text-caption text-subtle-foreground">{author.role}</p>
      </div>
    </div>
  );
}
