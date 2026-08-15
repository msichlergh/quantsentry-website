import Link from "next/link";

import styles from "./CodexaButton.module.css";

export function CodexaButton({
  children,
  className,
  href,
  variant = "light",
}: {
  children: string;
  className?: string;
  href: string;
  variant?: "light" | "dark";
}) {
  return (
    <Link
      aria-label={children}
      className={`${styles.button} ${
        variant === "dark" ? styles.dark : ""
      } ${className ?? ""}`}
      href={href}
    >
      <span className={styles.track} aria-hidden="true">
        <span>{children}</span>
        <span>{children}</span>
      </span>
    </Link>
  );
}
