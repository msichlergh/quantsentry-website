import type { Metadata } from "next";

import { ProductPricingPage } from "@/components/sites/codexa-framer-website-9c43da05/product-pricing-6a709283/ProductPricingPage";
import { CodexaSiteFrame } from "@/components/sites/codexa-framer-website-9c43da05/shared/CodexaSiteFrame";

export const metadata: Metadata = {
  title: "Pricing | Codexa",
  description: "Simple plans, built for every team.",
};

export default function CodexaPricingRoute() {
  return (
    <CodexaSiteFrame>
      <ProductPricingPage />
    </CodexaSiteFrame>
  );
}
