import type { Metadata } from "next";

import { ProductFaqsPage } from "@/components/sites/codexa-framer-website-9c43da05/product-faqs-fe66c163/ProductFaqsPage";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Codexa",
  description: "Find clear answers about Codexa, its plans, and its workflows.",
};

export default function CodexaFaqsRoute() {
  return <ProductFaqsPage />;
}
