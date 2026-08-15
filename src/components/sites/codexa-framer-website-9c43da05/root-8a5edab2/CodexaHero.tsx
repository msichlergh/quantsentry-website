import Image from "next/image";

import styles from "./CodexaHero.module.css";

const assetRoot =
  "/sites/codexa-framer-website-9c43da05/root-8a5edab2/images";

const trustedLogos = [
  { src: `${assetRoot}/testimonial-logo-01.png`, width: 124, height: 16 },
  { src: `${assetRoot}/testimonial-logo-02.png`, width: 146, height: 18 },
  { src: `${assetRoot}/testimonial-logo-03.png`, width: 83, height: 20 },
  { src: `${assetRoot}/testimonial-logo-04.png`, width: 95, height: 26 },
  { src: `${assetRoot}/testimonial-logo-05.png`, width: 113, height: 24 },
] as const;

function TrustedLogoSet() {
  return (
    <div className={styles.logoSet} aria-hidden="true">
      {trustedLogos.map((logo) => (
        <Image
          key={logo.src}
          src={logo.src}
          alt=""
          width={logo.width}
          height={logo.height}
          unoptimized
        />
      ))}
    </div>
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
            href="/company/sales"
          >
            <span className={styles.buttonTrack}>
              <span>Get started free</span>
              <span aria-hidden="true">Get started free</span>
            </span>
          </a>
        </div>

        <div className={`${styles.dashboard} ${styles.revealDashboard}`}>
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.lowerGlow} aria-hidden="true">
            <span />
            <span />
          </div>
          <div className={styles.dashboardFrame}>
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
        </div>

        <div className={styles.trustRow}>
          <p>Trusted by industry leaders worldwide</p>
          <div className={styles.marquee}>
            <div className={styles.marqueeTrack} data-codexa-marquee>
              <TrustedLogoSet />
              <TrustedLogoSet />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
