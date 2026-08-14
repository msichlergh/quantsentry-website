import Link from "next/link";
import { formatDate, type Post } from "@/lib/blog-data";
import { Badge } from "@/components/site/primitives";
import { PostPattern } from "./post-pattern";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors duration-200 hover:border-[#3a3532] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="h-40 overflow-hidden border-b border-border">
        <PostPattern slug={post.slug} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2">
          <Badge>{post.category}</Badge>
          <span className="text-caption text-faint-foreground">
            {post.readingMinutes} min read
          </span>
        </div>
        <h3 className="text-heading-sm text-foreground transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="line-clamp-3 text-body-sm text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2 text-caption text-subtle-foreground">
          <span>{post.author.name}</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>
      </div>
    </Link>
  );
}
