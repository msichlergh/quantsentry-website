import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { codexaCareerOpenings } from "../shared/codexaCareerData";
import { CareersButtonLabel, CareersEyebrow } from "./CareersUi";
import styles from "./CareersOpenings.module.css";
import uiStyles from "./CareersUi.module.css";

export function CareersOpenings() {
  return (
    <section className={styles.openings} id="openings" aria-labelledby="openings-title">
      <header className={styles.openingsHeader}>
        <CareersEyebrow>Current openings</CareersEyebrow>
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
              className={`${uiStyles.button} ${styles.button}`}
              href={`/codexa/company/careers/${opening.slug}`}
            >
              <CareersButtonLabel>Apply now</CareersButtonLabel>
              <ArrowRight aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
