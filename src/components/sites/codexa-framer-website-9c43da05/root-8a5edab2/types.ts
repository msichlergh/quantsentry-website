export type CodexaFeature = {
  title: string;
  description: string;
  bullets: readonly string[];
};

export type CodexaTab = {
  label: string;
  title: string;
  description: string;
  code: string;
};

export type CodexaPlan = {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  cta: string;
  featured?: boolean;
  features: readonly string[];
};

export type CodexaTestimonial = {
  quote: string;
  name: string;
  role: string;
  image: string;
};

export type CodexaFaq = {
  question: string;
  answer: string;
};

