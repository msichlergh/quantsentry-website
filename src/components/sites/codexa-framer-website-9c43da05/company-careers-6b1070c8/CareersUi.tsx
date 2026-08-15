import styles from "./CareersUi.module.css";

export function CareersEyebrow({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <p className={`${styles.eyebrow} ${className ?? ""}`}>
      <span aria-hidden="true" />
      {children}
    </p>
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
