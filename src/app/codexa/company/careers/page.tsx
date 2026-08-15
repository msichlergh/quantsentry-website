import type { Metadata } from "next";

import { CareersPage } from "@/components/sites/codexa-framer-website-9c43da05/company-careers-6b1070c8/CareersPage";
import { CodexaSiteFrame } from "@/components/sites/codexa-framer-website-9c43da05/shared/CodexaSiteFrame";

export const metadata: Metadata = {
  title: "Careers at Codexa",
  description:
    "At Codexa, we’re building tools that empower businesses to work smarter, stay organized, and grow faster.",
};

export default function CodexaCareersRoute() {
  return (
    <CodexaSiteFrame>
      <CareersPage />
    </CodexaSiteFrame>
  );
}
