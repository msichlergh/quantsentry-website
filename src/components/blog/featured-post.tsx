import Link from "next/link";
import { formatDate, type Post } from "@/lib/blog-data";
import { Badge, Eyebrow } from "@/components/site/primitives";
import { PostPattern } from "./post-pattern";

export function FeaturedPost({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-200 hover:border-[#3a3532] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:grid-cols-2"
    >
      <div className="h-56 border-b border-border md:h-full md:border-b-0 md:border-r">
        <PostPattern slug={post.slug} />
      </div>
      <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
        <Eyebrow>Latest</Eyebrow>
        <div className="flex items-center gap-2">
          <Badge tone="accent">{post.category}</Badge>
          <span className="text-caption text-faint-foreground">
            {post.readingMinutes} min read
          </span>
        </div>
        <h2 className="text-heading-lg text-foreground transition-colors group-hover:text-accent">
          {post.title}
        </h2>
        <p className="text-body text-muted-foreground">{post.excerpt}</p>
        <div className="flex items-center gap-2 text-caption text-subtle-foreground">
          <span>{post.author.name}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>
      </div>
    </Link>
  );
}
