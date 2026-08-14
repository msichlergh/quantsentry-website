import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { CodexaSiteFrame } from "../shared/CodexaSiteFrame";

import styles from "./CodexaNotFoundPage.module.css";

export function CodexaNotFoundPage() {
  return (
    <CodexaSiteFrame showFooter={false}>
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.backdropNumber} aria-hidden="true">
            404
          </div>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" />
              404 ERROR
            </p>
            <h1>Page not found</h1>
            <p className={styles.description}>
              Sorry, the page you are looking for does not exist or has been
              moved.
            </p>
            <Link className={styles.button} href="/codexa">
              Back to home
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>
        <div className={styles.spacer} aria-hidden="true" />
      </div>
    </CodexaSiteFrame>
  );
}
