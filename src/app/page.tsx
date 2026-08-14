import type { Metadata } from "next";
import { CTA } from "@/components/site/cta";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { ProblemSolution } from "@/components/home/problem-solution";
import { ProductTrio } from "@/components/home/product-trio";
import { Metrics } from "@/components/home/metrics";
import { Testimonial } from "@/components/home/testimonial";
import { Faq } from "@/components/home/faq";

export const metadata: Metadata = {
  title: "QuantSentry — Risk infrastructure for systematic trading desks",
  description:
    "QuantSentry unifies prime broker, OMS and market data feeds into one exposure map. Atlas reconciles positions, Query answers risk questions in plain language, and Sentinel catches drift before it becomes a drawdown.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProblemSolution />
      <ProductTrio />
      <Metrics />
      <Testimonial />
      <Faq />
      <CTA />
    </>
  );
}
