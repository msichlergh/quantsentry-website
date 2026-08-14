import type { Metadata } from "next";

import { CompanySalesPage } from "@/components/sites/codexa-framer-website-9c43da05/company-sales-d727dfd8/CompanySalesPage";
import { CodexaSiteFrame } from "@/components/sites/codexa-framer-website-9c43da05/shared/CodexaSiteFrame";

export const metadata: Metadata = {
  title: "Contact Sales – Codexa",
  description: "Contact Codexa sales for product demos and pricing guidance.",
};

export default function SalesPage() {
  return (
    <CodexaSiteFrame>
      <CompanySalesPage />
    </CodexaSiteFrame>
  );
}
