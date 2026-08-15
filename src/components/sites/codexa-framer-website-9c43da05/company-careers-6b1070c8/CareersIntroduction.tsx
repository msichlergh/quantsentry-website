import { ArrowRight } from "lucide-react";

import { CareersButtonLabel } from "./CareersUi";
import styles from "./CareersIntroduction.module.css";
import uiStyles from "./CareersUi.module.css";

export function CareersIntroduction() {
  return (
    <section className={styles.section} aria-labelledby="join-title">
      <div className={styles.inner}>
        <h2 id="join-title">
          Join a team building scalable, thoughtful digital products.
        </h2>
        <div className={styles.copy}>
          <p>
            At Codexa, we build tools that help teams move faster, work
            smarter, and stay focused. Our platform is designed for clarity,
            performance, and scale — without unnecessary complexity.
          </p>
          <p>
            We believe great products are created by people who care about
            quality, ownership, and continuous improvement. Every contribution
            matters, and every team member helps shape what we build next.
          </p>
        </div>
        <a className={`${uiStyles.button} ${styles.button}`} href="#openings">
          <CareersButtonLabel>See Open Positions</CareersButtonLabel>
          <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
