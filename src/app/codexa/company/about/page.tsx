import type { Metadata } from "next";

import { CompanyAboutPage } from "@/components/sites/codexa-framer-website-9c43da05/company-about-2cf5ac6f/CompanyAboutPage";
import { CodexaSiteFrame } from "@/components/sites/codexa-framer-website-9c43da05/shared/CodexaSiteFrame";

export const metadata: Metadata = {
  title: "About – Codexa",
  description:
    "Meet the team making engineering workflows and automation feel effortless.",
};

export default function AboutPage() {
  return (
    <CodexaSiteFrame>
      <CompanyAboutPage />
    </CodexaSiteFrame>
  );
}
