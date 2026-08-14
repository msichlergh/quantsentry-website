import type { Metadata } from "next";
import { Display, Eyebrow, Lead, Section } from "@/components/site/primitives";
import { CTA } from "@/components/site/cta";
import { FeatureCard } from "@/components/company/feature-card";
import { RolesList } from "@/components/company/roles-list";
import {
  BookIcon,
  GlobeIcon,
  HeartIcon,
  IconTile,
  PlaneIcon,
  ScaleIcon,
  UsersIcon,
} from "@/components/company/icons";

export const metadata: Metadata = {
  title: "Careers | QuantSentry",
  description:
    "Open roles at QuantSentry across engineering, research, go-to-market, and operations. Small teams, direct ownership, hubs in London and New York.",
};

const howWeWork = [
  {
    title: "Remote-friendly",
    body: "Most roles can be done from anywhere in the UK, EU, or US time zones. We hire for output, not desk time.",
  },
  {
    title: "London and New York hubs",
    body: "Two physical offices for the teams who want one — client-facing and research roles lean toward hub presence.",
  },
  {
    title: "Small teams",
    body: "Squads of three to five own a product surface end to end. No layer of middle management between you and the decision.",
  },
  {
    title: "Direct ownership",
    body: "You ship to production in your first two weeks. Code review exists to catch bugs, not to gatekeep who gets to deploy.",
  },
];

const benefits = [
  {
    icon: <ScaleIcon />,
    title: "Meaningful equity",
    body: "Every full-time hire gets equity from day one, priced transparently against our latest round.",
  },
  {
    icon: <HeartIcon />,
    title: "Private health cover",
    body: "Full medical, dental, and vision for you and your dependents, in the UK and US.",
  },
  {
    icon: <PlaneIcon />,
    title: "Flexible PTO",
    body: "No fixed accrual, no carry-over math. Take the time, tell your team, come back rested.",
  },
  {
    icon: <GlobeIcon />,
    title: "Hub travel budget",
    body: "Remote employees get funded trips to London or New York for team weeks, twice a year.",
  },
  {
    icon: <BookIcon />,
    title: "Learning budget",
    body: "An annual allowance for courses, books, and conferences — no approval chain required under the cap.",
  },
  {
    icon: <UsersIcon />,
    title: "Parental leave",
    body: "18 weeks paid leave for all parents, regardless of how you became one.",
  },
];

const hiringStages = [
  {
    step: "01",
    title: "Intro call",
    body: "30 minutes with a hiring manager to talk through the role, your background, and what you're looking for next.",
  },
  {
    step: "02",
    title: "Technical or case study",
    body: "A focused exercise close to real work — a reconciliation edge case, a research problem, a mock client call.",
  },
  {
    step: "03",
    title: "Team interviews",
    body: "Two to three conversations with people you'd work with directly, not a panel of strangers.",
  },
  {
    step: "04",
    title: "Offer and references",
    body: "We move fast once we're convinced — most candidates hear back within a week of the final interview.",
  },
];

export default function CareersPage() {
  return (
    <>
      <Section bordered={false} className="pt-20 md:pt-28">
        <Eyebrow>Careers</Eyebrow>
        <Display as="h1" size="lg" className="mt-4 max-w-[20ch]">
          Build the risk layer serious desks run on
        </Display>
        <Lead className="mt-5">
          We&apos;re a 40-person team split between London and New York, and
          we&apos;re hiring across engineering, research, go-to-market, and
          operations.
        </Lead>
      </Section>

      <Section>
        <Eyebrow>How we work</Eyebrow>
        <Display as="h2" size="md" className="mt-3 max-w-[20ch]">
          Structure without the layers
        </Display>
        <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
          {howWeWork.map((point) => (
            <div key={point.title} className="border-t border-border pt-5">
              <dt className="text-heading-sm text-foreground">
                {point.title}
              </dt>
              <dd className="mt-2 text-body-sm text-muted-foreground">
                {point.body}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <Eyebrow>Benefits</Eyebrow>
        <Display as="h2" size="md" className="mt-3 max-w-[20ch]">
          What you get, beyond the work
        </Display>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <FeatureCard
              key={benefit.title}
              icon={<IconTile>{benefit.icon}</IconTile>}
              title={benefit.title}
              body={benefit.body}
            />
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Open roles</Eyebrow>
        <Display as="h2" size="md" className="mt-3 max-w-[20ch]">
          Nine roles, four departments
        </Display>
        <div className="mt-10">
          <RolesList />
        </div>
      </Section>

      <Section>
        <Eyebrow>Hiring process</Eyebrow>
        <Display as="h2" size="md" className="mt-3 max-w-[20ch]">
          Four stages, no surprises
        </Display>
        <ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {hiringStages.map((stage) => (
            <li key={stage.step}>
              <span className="font-mono text-label text-accent">
                {stage.step}
              </span>
              <p className="mt-2 text-heading-sm text-foreground">
                {stage.title}
              </p>
              <p className="mt-2 text-body-sm text-muted-foreground">
                {stage.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <CTA
        eyebrow="Careers"
        title="Don't see the right role?"
        body="We're growing across every department. Send us a note and tell us where you'd fit — we read every message."
      />
    </>
  );
}
