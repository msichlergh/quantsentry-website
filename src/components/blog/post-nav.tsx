import Link from "next/link";
import type { Post } from "@/lib/blog-data";

function NavLink({
  post,
  direction,
}: {
  post: Post;
  direction: "previous" | "next";
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col gap-2 rounded-xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-[#3a3532] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        direction === "next" ? "text-right md:items-end" : ""
      }`}
    >
      <span className="font-mono text-label uppercase tracking-[0.08em] text-faint-foreground">
        {direction === "previous" ? "Previous" : "Next"}
      </span>
      <span className="text-body-sm font-medium text-foreground transition-colors group-hover:text-accent">
        {post.title}
      </span>
    </Link>
  );
}

export function PostNav({
  previous,
  next,
}: {
  previous: Post | undefined;
  next: Post | undefined;
}) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="More posts" className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>{previous && <NavLink post={previous} direction="previous" />}</div>
      <div>{next && <NavLink post={next} direction="next" />}</div>
    </nav>
  );
}
