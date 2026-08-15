import type { ReactNode } from "react";

import { CodexaFooter } from "../root-8a5edab2/CodexaFooter";
import { CodexaMotion } from "../root-8a5edab2/CodexaMotion";
import { CodexaNavigation } from "../root-8a5edab2/CodexaNavigation";

import styles from "./CodexaSiteFrame.module.css";

export function CodexaSiteFrame({
  children,
  variant = "constrained",
  showFooter = true,
}: {
  children: ReactNode;
  variant?: "constrained" | "home";
  showFooter?: boolean;
}) {
  return (
    <div className="codexa-page" id="home">
      <CodexaMotion />
      <CodexaNavigation />
      <div
        className={variant === "home" ? `${styles.home} codexa-home-main` : styles.main}
      >
        {children}
      </div>
      {showFooter ? <CodexaFooter /> : null}
    </div>
  );
}
