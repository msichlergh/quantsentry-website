import Image from "next/image";
import { Activity, ShieldCheck, Sparkles, Workflow } from "lucide-react";

import { CodexaEyebrow } from "../shared/CodexaEyebrow";
import { CodexaInnerHero } from "../shared/CodexaInnerHero";
import { CodexaLogo } from "../shared/CodexaLogo";

import styles from "./CompanyAboutPage.module.css";

const principles = [
  {
    title: "Mission",
    copy: "Our mission is to turn scattered tasks into one seamless workflow. By simplifying triggers, processes, and automation, we help teams stay focused.",
  },
  {
    title: "Vision",
    copy: "We envision a future where every team can automate, track, and operate with confidence using one streamlined system — no switching tabs.",
  },
  {
    title: "Progress",
    copy: "We build tools that reduce noise, not add it. Every decision is shaped by three principles: clarity in how teams work, trust in the systems they use.",
  },
] as const;

const capabilities = [
  {
    title: "Real-time visibility",
    copy: "Understand what’s happening across your operations instantly with live insights.",
    icon: Activity,
  },
  {
    title: "Smarter automation",
    copy: "Automate repetitive logic and reduce manual steps, so your team stays focused on impact.",
    icon: Sparkles,
  },
  {
    title: "Streamlined workflows",
    copy: "Connect tasks, triggers, and automation into one flow — no more juggling scattered tools.",
    icon: Workflow,
  },
  {
    title: "Reliable performance",
    copy: "Built to scale with your organization — stable, predictable, and resilient from day one.",
    icon: ShieldCheck,
  },
] as const;

const team = [
  ["Liam Carter", "Co Founder / CEO", "team-liam-carter.png"],
  ["Aria Mendes", "Co-Founder / CFO", "team-aria-mendes.png"],
  ["Noah Alvarez", "Automation Architect", "team-noah-alvarez.png"],
  ["Evelyn Brooks", "Product Designer", "team-evelyn-brooks.png"],
  ["Ryan Keller", "Backend Engineer", "team-ryan-keller.png"],
  ["Harun Ishikawa", "AI Systems Engineer", "team-harun-ishikawa.png"],
  ["Emilia Vargas", "Product Designer", "team-emilia-vargas.png"],
  ["James Parker", "CEO / Founder", "team-james-parker.png"],
] as const;

const assetRoot =
  "/sites/codexa-framer-website-9c43da05/company-about-2cf5ac6f/images";

export function CompanyAboutPage() {
  return (
    <>
      <CodexaInnerHero
        eyebrow="About us"
        title="We’re here to make engineering feel effortless"
        description="Clear workflows, simple automation, and a smoother path from idea to shipped product."
      />

      <section className={styles.principles} aria-label="Our principles">
        {principles.map((principle, index) => (
          <article className={styles.principle} key={principle.title}>
            <div className={styles.principleTitle}>
              <span>{index + 1}</span>
              <h2>{principle.title}</h2>
            </div>
            <p>{principle.copy}</p>
          </article>
        ))}
      </section>

      <section className={styles.impact} aria-labelledby="impact-title">
        <div className={`${styles.impactCell} ${styles.impactLead}`}>
          <div>
            <h2 id="impact-title">Where smart automation starts</h2>
            <p>
              A clean foundation that reduces noise and keeps your workflows
              running smoothly.
            </p>
          </div>
          <CodexaLogo />
        </div>
        {capabilities.map(({ title, copy, icon: Icon }) => (
          <article className={styles.impactCell} key={title}>
            <Icon aria-hidden="true" />
            <div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.team} aria-labelledby="team-title">
        <div className={styles.teamHeading}>
          <CodexaEyebrow className={styles.eyebrow}>Our team</CodexaEyebrow>
          <h2 id="team-title">Meet the people behind</h2>
          <p>
            A small, focused team building tools that help modern engineering
            teams move with clarity, speed, and confidence.
          </p>
        </div>
        <div className={styles.teamGrid}>
          {team.map(([name, role, image]) => (
            <article className={styles.person} key={name}>
              <Image
                alt={name}
                height={277}
                src={`${assetRoot}/${image}`}
                width={277}
              />
              <h3>{name}</h3>
              <p>{role}</p>
              <span aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
