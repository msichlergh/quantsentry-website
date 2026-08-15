import type { Metadata } from "next";

import { CodexaBenefits } from "@/components/sites/codexa-framer-website-9c43da05/root-8a5edab2/CodexaBenefits";
import { CodexaComparison } from "@/components/sites/codexa-framer-website-9c43da05/root-8a5edab2/CodexaComparison";
import { CodexaFaqs } from "@/components/sites/codexa-framer-website-9c43da05/root-8a5edab2/CodexaFaqs";
import { CodexaFeatures } from "@/components/sites/codexa-framer-website-9c43da05/root-8a5edab2/CodexaFeatures";
import { CodexaFeatureTabs } from "@/components/sites/codexa-framer-website-9c43da05/root-8a5edab2/CodexaFeatureTabs";
import { CodexaHero } from "@/components/sites/codexa-framer-website-9c43da05/root-8a5edab2/CodexaHero";
import { CodexaHowItWorks } from "@/components/sites/codexa-framer-website-9c43da05/root-8a5edab2/CodexaHowItWorks";
import { CodexaPricing } from "@/components/sites/codexa-framer-website-9c43da05/root-8a5edab2/CodexaPricing";
import { CodexaTestimonials } from "@/components/sites/codexa-framer-website-9c43da05/root-8a5edab2/CodexaTestimonials";
import { CodexaSiteFrame } from "@/components/sites/codexa-framer-website-9c43da05/shared/CodexaSiteFrame";

export const metadata: Metadata = {
  title: "Codexa – Premium Developer Automation Template",
  description:
    "Write workflow logic in code and let Codexa automate, schedule, and optimize everything.",
};

export default function CodexaPage() {
  return (
    <CodexaSiteFrame variant="home">
      <CodexaHero />
      <CodexaBenefits />
      <CodexaFeatures />
      <CodexaHowItWorks />
      <CodexaFeatureTabs />
      <CodexaComparison />
      <CodexaPricing />
      <CodexaTestimonials />
      <CodexaFaqs />
    </CodexaSiteFrame>
  );
}
