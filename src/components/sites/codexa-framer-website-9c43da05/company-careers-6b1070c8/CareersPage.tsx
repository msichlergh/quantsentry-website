import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { codexaCareerOpenings } from "../shared/codexaCareerData";

import styles from "./CareersPage.module.css";

const cultureValues = [
  {
    title: "Ownership mindset",
    copy: "Everyone takes responsibility for what they build.",
    icon: OwnershipIcon,
  },
  {
    title: "Clear communication",
    copy: "We value clarity, feedback, and open conversations.",
    icon: CommunicationIcon,
  },
  {
    title: "Craft over speed",
    copy: "Quality and long-term thinking guide our decisions.",
    icon: CraftIcon,
  },
  {
    title: "Build together",
    copy: "We collaborate closely across roles and disciplines.",
    icon: TogetherIcon,
  },
  {
    title: "Learn continuously",
    copy: "Growth comes from curiosity and constant learning.",
    icon: LearningIcon,
  },
  {
    title: "Real-world impact",
    copy: "Our work solves real problems for real teams.",
    icon: ImpactIcon,
  },
] as const;

function OwnershipIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M 16 13.091 C 14.833 13.755 11.6 14.789 8 13.195 C 6.5 12.364 2.8 11.097 0 13.091 M 0 20 L 0 1.064 C 2.8 -0.929 6.5 0.337 8 1.168 C 11.6 2.762 14.833 1.728 16 1.064 L 16 13.023"
        transform="translate(4 1.933)"
      />
    </svg>
  );
}

function CommunicationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M 4 4 L 14 4 M 4 8 L 8 8 M 0 17.793 L 0 2 C 0 0.895 0.895 0 2 0 L 16 0 C 17.105 0 18 0.895 18 2 L 18 12 C 18 13.105 17.105 14 16 14 L 5.414 14 C 5.149 14 4.895 14.105 4.707 14.293 L 0.854 18.146 C 0.539 18.461 0 18.238 0 17.793 Z"
        transform="translate(3 3)"
      />
    </svg>
  );
}

function CraftIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M 9 17.097 L 18 17.097 M 13.52 0.617 L 0.993 13.124 L 0 17.097 L 3.973 16.104 L 16.5 3.597 C 17.323 2.774 17.323 1.44 16.5 0.617 C 15.677 -0.206 14.343 -0.206 13.52 0.617 Z"
        transform="translate(3 3.903)"
      />
    </svg>
  );
}

function TogetherIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M 0 18 L 0 14 C 0 12.895 0.895 12 2 12 L 12 12 C 13.105 12 14 12.895 14 14 L 14 18 M 14 0 C 14.86 0.22 15.623 0.721 16.168 1.422 C 16.712 2.124 17.008 2.987 17.008 3.875 C 17.008 4.763 16.712 5.626 16.168 6.328 C 15.623 7.029 14.86 7.53 14 7.75 M 17 12 L 18 12 C 19.105 12 20 12.895 20 14 L 20 18 M 11 4 C 11 6.209 9.209 8 7 8 C 4.791 8 3 6.209 3 4 C 3 1.791 4.791 0 7 0 C 9.209 0 11 1.791 11 4 Z"
        transform="translate(2 3)"
      />
    </svg>
  );
}

function LearningIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M 10 2 C 6 -0.667 4 -0.667 0 2 L 0 18 C 4 15.5 6 15.5 10 18 M 10 2 L 10 18 M 10 2 C 14 -0.667 16 -0.667 20 2 L 20 18 C 16 15.5 14 15.5 10 18"
        transform="translate(2 3)"
      />
    </svg>
  );
}

function ImpactIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M 0.111 11.12 L 8.451 0 L 7.451 8 L 15.277 8 C 15.743 8 15.998 8.544 15.699 8.902 L 6.451 20 L 7.451 12 L 0.551 12 C 0.098 12 -0.161 11.483 0.111 11.12 Z"
        transform="translate(4.549 2)"
      />
    </svg>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className={styles.eyebrow}>
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

function ButtonLabel({ children }: { children: string }) {
  return (
    <span className={styles.buttonTrack}>
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

export function CareersPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="careers-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <Eyebrow>Careers</Eyebrow>
          <h1 id="careers-title">Careers at Codexa</h1>
          <p>
            At Codexa, we’re building tools that empower businesses to work
            smarter, stay organized, and grow faster.
          </p>
        </div>
      </section>

      <section className={styles.join} aria-labelledby="join-title">
        <div className={styles.joinIntro}>
          <h2 id="join-title">
            Join a team building scalable, thoughtful digital products.
          </h2>
          <div className={styles.joinCopy}>
            <p>
              At Codexa, we build tools that help teams move faster, work
              smarter, and stay focused. Our platform is designed for clarity,
              performance, and scale — without unnecessary complexity.
            </p>
            <p>
              We believe great products are created by people who care about
              quality, ownership, and continuous improvement. Every
              contribution matters, and every team member helps shape what we
              build next.
            </p>
          </div>
          <a className={styles.button} href="#openings">
            <ButtonLabel>See Open Positions</ButtonLabel>
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className={styles.culture} aria-labelledby="culture-title">
        <header className={styles.cultureHeader}>
          <Eyebrow>Our culture</Eyebrow>
          <h2 id="culture-title">
            A team built on trust, ownership, and continuous improvement.
          </h2>
        </header>
        <div className={styles.cultureGrid}>
          {cultureValues.map(({ title, copy, icon: Icon }) => (
            <article className={styles.cultureCard} key={title}>
              <Icon />
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.openings} id="openings" aria-labelledby="openings-title">
        <header className={styles.openingsHeader}>
          <Eyebrow>Current openings</Eyebrow>
          <h2 id="openings-title">Explore opportunities and join our team</h2>
          <p>Open roles across design, engineering, and product teams.</p>
        </header>
        <div className={`${styles.openingsList} codexa-reveal`}>
          {codexaCareerOpenings.map((opening) => (
            <article className={styles.job} key={opening.slug}>
              <div className={styles.jobContent}>
                <p className={styles.jobMeta}>
                  <span>{opening.location}</span>
                  <span aria-hidden="true">-</span>
                  <span>{opening.schedule}</span>
                </p>
                <h3>{opening.title}</h3>
                <p className={styles.jobSummary}>{opening.summary}</p>
              </div>
              <Link
                className={styles.button}
                href={`/codexa/company/careers/${opening.slug}`}
              >
                <ButtonLabel>Apply now</ButtonLabel>
                <ArrowRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
