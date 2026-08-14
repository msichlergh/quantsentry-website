import type { Metadata } from "next";
import { Container, Display, Eyebrow, Lead } from "@/components/site/primitives";
import { CTA } from "@/components/site/cta";
import { FeaturedPost } from "@/components/blog/featured-post";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { categories, getAllPosts, getFeaturedPost } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog — QuantSentry",
  description:
    "Notes on risk tooling and market structure from the team building Atlas, Query and Sentinel.",
};

export default function BlogPage() {
  const featured = getFeaturedPost();
  const rest = getAllPosts().filter((post) => post.slug !== featured.slug);

  return (
    <>
      <Container className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Eyebrow>Blog</Eyebrow>
        <Display as="h1" size="lg" className="mt-4">
          Notes on risk tooling and market structure
        </Display>
        <Lead className="mt-4">
          Engineering write-ups, reconciliation post-mortems, and product
          notes from the team building risk infrastructure for systematic
          trading desks.
        </Lead>
      </Container>

      <Container className="pb-16 md:pb-20">
        <FeaturedPost post={featured} />
      </Container>

      <Container className="pb-20 md:pb-28">
        <BlogExplorer posts={rest} categories={categories} />
      </Container>

      <CTA
        eyebrow="Get started"
        title="See your whole book in one place"
        body="Connect a prime broker and an OMS. Atlas maps your exposure in under an hour — no data team required."
      />
    </>
  );
}
