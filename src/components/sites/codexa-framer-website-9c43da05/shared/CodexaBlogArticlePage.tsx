import Image from "next/image";
import Link from "next/link";

import type { CodexaBlogArticle } from "./codexaBlogData";
import { codexaBlogArticles } from "./codexaBlogData";
import { CodexaSiteFrame } from "./CodexaSiteFrame";
import styles from "./CodexaBlogArticlePage.module.css";

export function CodexaBlogArticlePage({
  article,
}: {
  article: CodexaBlogArticle;
}) {
  const relatedArticles = codexaBlogArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .slice(0, 3);

  return (
    <CodexaSiteFrame>
      <article>
        <header className={styles.header}>
          <p className={styles.category}>{article.category}</p>
          <h1>{article.title}</h1>
          <p className={styles.excerpt}>{article.excerpt}</p>
          <p className={styles.meta}>
            10 MINS READ&nbsp;&nbsp;|&nbsp;&nbsp;PUBLISHED DEC 23, 2024
          </p>
        </header>

        <div className={styles.heroImage}>
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>

        <div className={styles.articleGrid}>
          <div className={styles.content}>
            {article.sections.map((section, sectionIndex) => (
              <section
                className={section.blocks ? styles.blockSection : undefined}
                key={`${section.heading ?? "introduction"}-${sectionIndex}`}
              >
                {section.heading ? <h2>{section.heading}</h2> : null}
                {section.blocks?.map((block, blockIndex) => {
                  if (block.type === "quote") {
                    return (
                      <blockquote key={`quote-${blockIndex}`}>
                        {block.lines.map((line) => <p key={line}>{line}</p>)}
                      </blockquote>
                    );
                  }
                  if (block.type === "list") {
                    return (
                      <ul key={`list-${blockIndex}`}>
                        {block.items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    );
                  }
                  return <p key={`paragraph-${blockIndex}`}>{block.text}</p>;
                }) ?? section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {!section.blocks && section.quoteLines ? (
                  <blockquote>
                    {section.quoteLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </blockquote>
                ) : null}
                {!section.blocks && section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <aside className={styles.sidebar}>
            <p className={styles.sidebarLabel}>Written by</p>
            <div className={styles.author}>
              <Image
                src={article.authorImage}
                alt={article.author}
                width={48}
                height={48}
              />
              <div>
                <p>{article.author}</p>
                <span>{article.authorRole}</span>
              </div>
            </div>
            <div className={styles.share}>
              <p>Share this article</p>
              <span>Share this post with your team or anyone who&apos;d benefit from these insights.</span>
              <div>
                <a href="https://x.com/intent/post" aria-label="Share on X">X</a>
                <a href="https://www.linkedin.com/sharing/share-offsite/" aria-label="Share on LinkedIn">in</a>
                <a href={`mailto:?subject=${encodeURIComponent(article.title)}`} aria-label="Share by email">@</a>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <section className={styles.moreArticles}>
        <div className={styles.moreHeading}>
          <h2>More articles</h2>
        </div>
        <div className={styles.cardGrid}>
          {relatedArticles.map((related) => (
            <Link
              className={styles.card}
              href={`/codexa/company/blog/${related.slug}`}
              key={related.slug}
            >
              <div className={styles.cardImage}>
                <Image
                  src={related.image}
                  alt={related.imageAlt}
                  fill
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className={styles.cardBody}>
                <p>{related.category}</p>
                <h3>{related.title}</h3>
                <span>Read article →</span>
              </div>
            </Link>
          ))}
        </div>
        <Link className={styles.loadMore} href="/codexa/company/blog">
          Load More
        </Link>
      </section>
    </CodexaSiteFrame>
  );
}
