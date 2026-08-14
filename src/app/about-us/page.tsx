import type { Metadata } from "next";
import {
  Display,
  Eyebrow,
  Lead,
  Section,
} from "@/components/site/primitives";
import { CTA } from "@/components/site/cta";
import { FeatureCard } from "@/components/company/feature-card";
import { PersonCard } from "@/components/company/person-card";
import { StatBand } from "@/components/company/stat-band";
import {
  HandshakeIcon,
  IconTile,
  ScaleIcon,
  ShieldIcon,
  TargetIcon,
} from "@/components/company/icons";

export const metadata: Metadata = {
  title: "About | QuantSentry",
  description:
    "QuantSentry builds risk infrastructure for systematic trading desks. Founded in 2021, we're a Series A team of 40 in London and New York.",
};

const stats = [
  { value: "2021", label: "Founded" },
  { value: "~40", label: "People" },
  { value: "60+", label: "Desks served" },
  { value: "2.4M", label: "Positions reconciled nightly" },
];

const values = [
  {
    icon: <ScaleIcon />,
    title: "Precision over noise",
    body: "A risk number is only useful if it's right. We'd rather ship a narrower feature that's correct than a broad one that's approximately correct.",
  },
  {
    icon: <TargetIcon />,
    title: "Own the outcome",
    body: "Engineers talk to desks. Researchers read support tickets. Nobody hides behind a ticket queue when a client's exposure map looks wrong.",
  },
  {
    icon: <ShieldIcon />,
    title: "Boring is a feature",
    body: "Risk tooling that surprises you has failed. We optimize for predictable, auditable, explainable — excitement belongs in the strategies, not the plumbing.",
  },
  {
    icon: <HandshakeIcon />,
    title: "Built with practitioners",
    body: "Every product decision gets pressure-tested by people who've run a book. We design with desks, not just for them.",
  },
];

const leadership = [
  {
    name: "Elena Vasquez",
    role: "Co-founder & CEO",
    background:
      "Ran risk technology for a multi-strategy fund's equities book before founding QuantSentry in 2021.",
  },
  {
    name: "Marcus Kwon",
    role: "Co-founder & CTO",
    background:
      "Built reconciliation and position-keeping systems at a top-five prime broker for eight years.",
  },
  {
    name: "Priya Chandrasekaran",
    role: "Head of Research",
    background:
      "Quantitative researcher focused on drift detection; previously built anomaly models for a macro fund.",
  },
  {
    name: "Tom Reilly",
    role: "Head of Engineering",
    background:
      "Led platform engineering teams building market data infrastructure at scale before joining QuantSentry.",
  },
  {
    name: "Sarah Lindqvist",
    role: "Head of Client Success",
    background:
      "Spent six years on the client side reconciling exposure across prime brokers by hand — now fixes it for others.",
  },
  {
    name: "David Okafor",
    role: "Head of Compliance & Risk",
    background:
      "Former risk officer with a background in regulatory reporting for hedge funds and asset managers.",
  },
];

const investors = [
  "Anchorage Peak Ventures",
  "Northlight Capital",
  "Fen River Partners",
  "Cascade Point Capital",
];

export default function AboutUsPage() {
  return (
    <>
      <Section bordered={false} className="pt-20 md:pt-28">
        <Eyebrow>About QuantSentry</Eyebrow>
        <Display as="h1" size="lg" className="mt-4 max-w-[18ch]">
          Risk infrastructure for systematic trading desks
        </Display>
        <Lead className="mt-5">
          We build the reconciliation and monitoring layer that sits between
          your prime brokers, your OMS, and the number you actually trust.
        </Lead>
      </Section>

      <Section>
        <div className="max-w-[65ch] space-y-5 text-body text-muted-foreground">
          <p>
            QuantSentry started with a spreadsheet problem. Our founders were
            running risk on a multi-strategy equities book, pulling position
            files from four prime brokers every morning and reconciling them
            by hand against the OMS. Most days it took twenty minutes. On the
            days it mattered — a corporate action, a late broker feed, a
            fat-fingered trade — it took two hours, and the exposure number
            you were staring at during that window was wrong.
          </p>
          <p>
            That gap is structural, not a tooling accident. Prime brokers
            report positions in their own formats, on their own clocks, with
            their own conventions for corporate actions and currency
            conversion. An OMS has its own view of the book. Nobody upstream
            is incentivized to make reconciliation easy, so desks build
            brittle internal scripts, or they don&apos;t reconcile at all and
            trust that the numbers roughly agree.
          </p>
          <p>
            We built Atlas to collapse that gap to minutes, Query so anyone
            on the desk can ask what changed without filing a ticket, and
            Sentinel to catch the drift between what a strategy is supposed
            to do and what it&apos;s actually doing. The goal isn&apos;t a dashboard —
            it&apos;s a number you stop double-checking.
          </p>
        </div>
      </Section>

      <Section>
        <StatBand stats={stats} />
      </Section>

      <Section>
        <Eyebrow>What we optimize for</Eyebrow>
        <Display as="h2" size="md" className="mt-3 max-w-[20ch]">
          Four things we won&apos;t compromise on
        </Display>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <FeatureCard
              key={value.title}
              icon={<IconTile>{value.icon}</IconTile>}
              title={value.title}
              body={value.body}
            />
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Leadership</Eyebrow>
        <Display as="h2" size="md" className="mt-3 max-w-[20ch]">
          People who&apos;ve sat on the desk
        </Display>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((person) => (
            <PersonCard key={person.name} {...person} />
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Backed by</Eyebrow>
        <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
          {investors.map((investor) => (
            <span
              key={investor}
              className="font-heading text-heading-md text-faint-foreground"
            >
              {investor}
            </span>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
