import type { Metadata } from "next";

import { CodexaNotFoundPage } from "@/components/sites/codexa-framer-website-9c43da05/404-316556f0/CodexaNotFoundPage";

export const metadata: Metadata = {
  title: "Page Not Found – Codexa",
};

export default function NotFound() {
  return <CodexaNotFoundPage />;
}
