import Image from "next/image";

import styles from "./CodexaHero.module.css";

const assetRoot =
  "/sites/codexa-framer-website-9c43da05/root-8a5edab2/images";

const trustedLogos = Array.from(
  { length: 7 },
  (_, index) => `${assetRoot}/trusted-logo-${String(index + 1).padStart(2, "0")}.png`,
);

function TrustedLogoSet() {
  return (
    <ul className={styles.logoSet} aria-hidden="true">
      {trustedLogos.map((src) => (
        <li className={styles.logoItem} key={src}>
          <Image src={src} alt="" width={96} height={96} />
        </li>
      ))}
    </ul>
  );
}

export function CodexaHero() {
  return (
    <section id="home" className={styles.section}>
      <div className={styles.inner}>
        <div className={`${styles.heading} ${styles.reveal}`}>
          <div className={styles.copy}>
            <h1>Everything you need to build with AI</h1>
            <p>
              Write workflow logic in code and let Codexa automate, schedule,
              and optimize everything.
            </p>
          </div>

          <a
            className={styles.button}
            href="/codexa/company/sales"
          >
            <span className={styles.buttonTrack}>
              <span>Get started free</span>
              <span aria-hidden="true">Get started free</span>
            </span>
          </a>
        </div>

        <div className={`${styles.dashboard} ${styles.revealDashboard}`}>
          <div className={styles.glow} aria-hidden="true" />
          <Image
            className={styles.dashboardImage}
            src={`${assetRoot}/hero-code-window.png`}
            alt="Codexa workflow editor showing an automated onboarding workflow"
            width={2048}
            height={1193}
            sizes="(max-width: 900px) calc(100vw - 56px), 1096px"
            priority
          />
        </div>

        <div className={`${styles.trustRow} ${styles.revealTrust}`}>
          <p>Trusted by industry leaders worldwide</p>
          <div className={styles.marquee}>
            <div className={styles.marqueeTrack}>
              <TrustedLogoSet />
              <TrustedLogoSet />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
