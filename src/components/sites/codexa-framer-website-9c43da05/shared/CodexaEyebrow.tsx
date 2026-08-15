import styles from "./CodexaEyebrow.module.css";

export function CodexaEyebrow({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <p className={`${styles.eyebrow} ${className ?? ""}`}>
      <span className={styles.dot} aria-hidden="true" />
      {children}
    </p>
  );
}
