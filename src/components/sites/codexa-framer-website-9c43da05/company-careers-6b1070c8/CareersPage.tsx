import { CareersCulture } from "./CareersCulture";
import { CareersHero } from "./CareersHero";
import { CareersIntroduction } from "./CareersIntroduction";
import { CareersOpenings } from "./CareersOpenings";
import styles from "./CareersPage.module.css";

export function CareersPage() {
  return (
    <div className={styles.page}>
      <CareersHero />
      <CareersIntroduction />
      <CareersCulture />
      <CareersOpenings />
    </div>
  );
}
