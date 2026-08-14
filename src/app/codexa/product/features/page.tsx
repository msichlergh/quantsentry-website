import type { Metadata } from "next";

import { ProductFeaturesPage } from "@/components/sites/codexa-framer-website-9c43da05/product-features-e258f631/ProductFeaturesPage";

export const metadata: Metadata = {
  title: "Features | Codexa",
  description: "Everything you need to automate with confidence.",
};

export default function CodexaFeaturesRoute() {
  return <ProductFeaturesPage />;
}
