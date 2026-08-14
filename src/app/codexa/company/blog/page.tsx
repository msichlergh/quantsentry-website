import type { Metadata } from "next";

import { CompanyBlogPage } from "@/components/sites/codexa-framer-website-9c43da05/company-blog-555d6169/CompanyBlogPage";
import { CodexaSiteFrame } from "@/components/sites/codexa-framer-website-9c43da05/shared/CodexaSiteFrame";

export const metadata: Metadata = {
  title: "Blog – Codexa",
  description:
    "Insights, guides, and updates on automation, AI workflows, and developer tooling.",
};

export default function BlogPage() {
  return (
    <CodexaSiteFrame>
      <CompanyBlogPage />
    </CodexaSiteFrame>
  );
}
