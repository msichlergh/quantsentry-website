import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Badge, Eyebrow, Display } from "@/components/site/primitives";
import { CTA } from "@/components/site/cta";
import { PostPattern } from "@/components/blog/post-pattern";
import { PostBody } from "@/components/blog/post-body";
import { AuthorCard } from "@/components/blog/author-card";
import { PostNav } from "@/components/blog/post-nav";
import {
  formatDate,
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
} from "@/lib/blog-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found — QuantSentry" };
  }

  return {
    title: `${post.title} — QuantSentry`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = getAdjacentPosts(post.slug);

  return (
    <>
      <article>
        <Container className="pt-16 pb-10 md:pt-24 md:pb-12">
          <Eyebrow>{post.category}</Eyebrow>
          <Display as="h1" size="md" className="mt-4 max-w-[24ch]">
            {post.title}
          </Display>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-body-sm text-subtle-foreground">
            <span className="text-foreground">{post.author.name}</span>
            <span aria-hidden>·</span>
            <span>{post.author.role}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <span aria-hidden>·</span>
            <Badge>{post.readingMinutes} min read</Badge>
          </div>
        </Container>

        <Container className="pb-16 md:pb-20">
          <div className="h-64 overflow-hidden rounded-2xl border border-border md:h-80">
            <PostPattern slug={post.slug} />
          </div>
        </Container>

        <Container className="pb-16 md:pb-20">
          <PostBody blocks={post.body} />
        </Container>

        <Container className="pb-16 md:pb-20">
          <AuthorCard author={post.author} />
        </Container>

        <Container className="pb-20 md:pb-28">
          <PostNav previous={previous} next={next} />
        </Container>
      </article>

      <CTA
        eyebrow="Get started"
        title="See your whole book in one place"
        body="Connect a prime broker and an OMS. Atlas maps your exposure in under an hour — no data team required."
      />
    </>
  );
}
