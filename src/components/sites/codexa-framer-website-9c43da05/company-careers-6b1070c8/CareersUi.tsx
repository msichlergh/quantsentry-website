import { CodexaEyebrow } from "../shared/CodexaEyebrow";

import styles from "./CareersUi.module.css";

/** The careers pages use the standard site eyebrow with their own spacing. */
export function CareersEyebrow({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <CodexaEyebrow className={`${styles.eyebrow} ${className ?? ""}`}>
      {children}
    </CodexaEyebrow>
  );
}

export function CareersButtonLabel({ children }: { children: string }) {
  return (
    <span className={styles.buttonTrack}>
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}
