import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CodexaBlogArticlePage } from "@/components/sites/codexa-framer-website-9c43da05/shared/CodexaBlogArticlePage";
import { CodexaSiteFrame } from "@/components/sites/codexa-framer-website-9c43da05/shared/CodexaSiteFrame";
import {
  codexaBlogArticles,
  getCodexaBlogArticle,
} from "@/components/sites/codexa-framer-website-9c43da05/shared/codexaBlogData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return codexaBlogArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getCodexaBlogArticle(slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} — Codexa`,
    description: article.excerpt,
  };
}

export default async function CodexaBlogArticleRoute({ params }: PageProps) {
  const { slug } = await params;
  const article = getCodexaBlogArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <CodexaSiteFrame>
      <CodexaBlogArticlePage article={article} />
    </CodexaSiteFrame>
  );
}
