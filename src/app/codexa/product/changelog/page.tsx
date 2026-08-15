import type { Metadata } from "next";

import { ProductChangelogPage } from "@/components/sites/codexa-framer-website-9c43da05/product-changelog-5d6f02e0/ProductChangelogPage";
import { CodexaSiteFrame } from "@/components/sites/codexa-framer-website-9c43da05/shared/CodexaSiteFrame";

export const metadata: Metadata = {
  title: "Changelog | Codexa",
  description: "Product updates and improvements from Codexa.",
};

export default function CodexaChangelogRoute() {
  return (
    <CodexaSiteFrame>
      <ProductChangelogPage />
    </CodexaSiteFrame>
  );
}
