import Image from "next/image";
import Link from "next/link";

import { CodexaInnerHero } from "../shared/CodexaInnerHero";

import styles from "./CompanyBlogPage.module.css";

const assetRoot =
  "/sites/codexa-framer-website-9c43da05/company-blog-555d6169/images";

const featured = {
  title: "Why Every Team Needs Automated Workflows to Scale Efficiently",
  description:
    "Automation is no longer a luxury — it’s the backbone of every modern, fast-moving engineering team.",
  image: "blog-automation-team.jpg",
  slug: "why-every-team-needs-automated-workflows-to-scale-efficiently",
};

const posts = [
  {
    label: "Automation",
    title: "Why Every Fast-Growing Company Needs an Automation Layer",
    image: "blog-automation-layer.jpg",
    slug: "why-every-fast-growing-company-needs-an-automation-layer",
  },
  {
    label: "Engineering",
    title: "The Hidden Cost of Fragmented Systems",
    image: "blog-fragmented-systems.jpg",
    slug: "the-hidden-cost-of-fragmented-systems",
  },
  {
    label: "Automation",
    title: "How Real-Time Monitoring Prevents Silent Workflow Failures",
    image: "blog-monitoring.jpg",
    slug: "how-real-time-monitoring-prevents-silent-workflow-failures",
  },
  {
    label: "Product",
    title: "Codexa’s Automation Engine Is Getting Smarter",
    image: "blog-engine-upgrade.jpg",
    slug: "codexa-automation-engine-upgrade",
  },
  {
    label: "Product",
    title: "Why Data Dashboards Are Essential for SaaS Growth",
    image: "blog-dashboards.jpg",
    slug: "why-data-dashboards-are-essential-for-saas-growth",
  },
  {
    label: "Tutorials",
    title: "How to Improve Collaboration Across Remote SaaS Teams",
    image: "blog-collaboration.jpg",
    slug: "remote-saas-team-collaboration",
  },
] as const;

export function CompanyBlogPage() {
  return (
    <>
      <CodexaInnerHero
        eyebrow="Blog"
        title="Insights, guides, and updates for modern builders"
        description="Stay ahead with deep-dive articles on automation, AI workflows, developer tooling, and updates."
      />

      <section className={styles.blogArea} aria-label="Latest articles">
        <Link
          className={styles.featured}
          href={`/codexa/company/blog/${featured.slug}`}
        >
          <div className={styles.featuredImage}>
            <Image
              alt="Blue abstract light arc"
              fill
              priority
              sizes="(max-width: 768px) calc(100vw - 56px), 568px"
              src={`${assetRoot}/${featured.image}`}
            />
          </div>
          <div className={styles.featuredCopy}>
            <div>
              <p className={styles.mustRead}>Must read</p>
              <h2>{featured.title}</h2>
              <p className={styles.description}>{featured.description}</p>
            </div>
            <div className={styles.authorRow}>
              <Image
                alt="Aiden Hale"
                height={44}
                src={`${assetRoot}/author-aiden.png`}
                width={44}
              />
              <div>
                <p>Aiden Hale</p>
                <span>Automation Architect</span>
              </div>
              <span className={styles.tag}>Product</span>
            </div>
          </div>
        </Link>

        <div className={styles.grid}>
          {posts.map((post) => (
            <Link
              className={styles.card}
              href={`/codexa/company/blog/${post.slug}`}
              key={post.slug}
            >
              <div className={styles.cardImage}>
                <Image
                  alt=""
                  fill
                  sizes="(max-width: 768px) calc(100vw - 56px), 368px"
                  src={`${assetRoot}/${post.image}`}
                />
              </div>
              <div className={styles.cardCopy}>
                <p className={styles.tag}>{post.label}</p>
                <h2>{post.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
