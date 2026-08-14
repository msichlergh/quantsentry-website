import type { Metadata } from "next";

import { CompanySupportPage } from "@/components/sites/codexa-framer-website-9c43da05/company-support-c9e8a2d7/CompanySupportPage";
import { CodexaSiteFrame } from "@/components/sites/codexa-framer-website-9c43da05/shared/CodexaSiteFrame";

export const metadata: Metadata = {
  title: "Contact Support – Codexa",
  description: "Contact Codexa support for product and technical assistance.",
};

export default function SupportPage() {
  return (
    <CodexaSiteFrame>
      <CompanySupportPage />
    </CodexaSiteFrame>
  );
}
