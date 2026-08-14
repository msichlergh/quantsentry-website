"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/blog-data";
import { PostCard } from "./post-card";

const ALL_LABEL = "All";

export function BlogExplorer({
  posts,
  categories,
}: {
  posts: Post[];
  categories: readonly string[];
}) {
  const [active, setActive] = useState<string>(ALL_LABEL);

  const filtered =
    active === ALL_LABEL ? posts : posts.filter((post) => post.category === active);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter posts by category"
        className="flex flex-wrap gap-2"
      >
        {[ALL_LABEL, ...categories].map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(category)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-body-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                isActive
                  ? "border-accent/25 bg-accent/10 text-accent"
                  : "border-border bg-surface text-muted-foreground hover:text-foreground",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-body-sm text-subtle-foreground">
          No posts in this category yet.
        </p>
      )}
    </div>
  );
}
