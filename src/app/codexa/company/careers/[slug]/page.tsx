import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CodexaCareerDetailPage } from "@/components/sites/codexa-framer-website-9c43da05/shared/CodexaCareerDetailPage";
import {
  codexaCareerOpenings,
  getCodexaCareerOpening,
} from "@/components/sites/codexa-framer-website-9c43da05/shared/codexaCareerData";
import { CodexaSiteFrame } from "@/components/sites/codexa-framer-website-9c43da05/shared/CodexaSiteFrame";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return codexaCareerOpenings.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const opening = getCodexaCareerOpening(slug);

  if (!opening) {
    notFound();
  }

  return {
    title: `${opening.title} - Codexa`,
    description: opening.summary,
  };
}

export default async function CodexaCareerDetailRoute({ params }: PageProps) {
  const { slug } = await params;
  const opening = getCodexaCareerOpening(slug);

  if (!opening) {
    notFound();
  }

  return (
    <CodexaSiteFrame>
      <CodexaCareerDetailPage opening={opening} />
    </CodexaSiteFrame>
  );
}
