import type { Metadata } from "next";
import { Display, Eyebrow, Lead, Section } from "@/components/site/primitives";
import { ContactForm } from "@/components/company/contact-form";
import { OfficeCard } from "@/components/company/office-card";

export const metadata: Metadata = {
  title: "Contact | QuantSentry",
  description:
    "Talk to QuantSentry about Atlas, Query, or Sentinel. Offices in London and New York, or reach the team directly by email.",
};

const offices = [
  {
    city: "London",
    lines: ["27 Ropemaker Street", "London EC2Y 9AY", "United Kingdom"],
  },
  {
    city: "New York",
    lines: ["228 Park Avenue South", "New York, NY 10003", "United States"],
  },
];

const emails = [
  { label: "General", address: "hello@quantsentry.com" },
  { label: "Sales", address: "sales@quantsentry.com" },
  { label: "Support", address: "support@quantsentry.com" },
];

const faqs = [
  {
    question: "How long does a typical integration take?",
    answer:
      "Most desks are mapped in Atlas within a week — a prime broker feed and OMS connection are usually enough to get a first exposure view.",
  },
  {
    question: "Do you work with funds below $500M AUM?",
    answer:
      "Yes. Pricing scales with desk size and position count, not AUM — talk to us about the right tier for your book.",
  },
  {
    question: "Is QuantSentry SOC 2 compliant?",
    answer:
      "We're SOC 2 Type II audited annually. Our security overview and latest report are available under NDA — ask in your first call.",
  },
  {
    question: "Can I try Atlas before committing?",
    answer:
      "We run a paid pilot with a subset of your book, typically two to four weeks, before any full-desk rollout.",
  },
];

export default function ContactUsPage() {
  return (
    <>
      <Section bordered={false} className="pt-20 md:pt-28">
        <Eyebrow>Contact</Eyebrow>
        <Display as="h1" size="lg" className="mt-4 max-w-[18ch]">
          Talk to the team
        </Display>
        <Lead className="mt-5">
          Tell us about your desk and what you&apos;re reconciling by hand
          today. We&apos;ll get back to you from an @quantsentry.com address
          within one business day.
        </Lead>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-heading-lg text-foreground">
              Send us a message
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div>
            <h2 className="text-heading-lg text-foreground">Offices</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {offices.map((office) => (
                <OfficeCard key={office.city} {...office} />
              ))}
            </div>

            <h3 className="mt-10 text-heading-sm text-foreground">
              Email us directly
            </h3>
            <ul className="mt-4 space-y-2">
              {emails.map((email) => (
                <li key={email.address} className="flex items-baseline gap-2">
                  <span className="text-caption uppercase tracking-[0.06em] text-subtle-foreground">
                    {email.label}
                  </span>
                  <a
                    href={`mailto:${email.address}`}
                    className="text-body-sm text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {email.address}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-body-sm text-muted-foreground">
              Expected response time: within one business day, faster for
              existing clients through the support desk.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <Eyebrow>FAQ</Eyebrow>
        <Display as="h2" size="md" className="mt-3 max-w-[20ch]">
          Common questions
        </Display>
        <dl className="mt-10 divide-y divide-border border-t border-border">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <dt className="text-heading-sm text-foreground">
                {faq.question}
              </dt>
              <dd className="mt-2 max-w-[65ch] text-body-sm text-muted-foreground">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
