import styles from "./ProductCapabilities.module.css";

const capabilities = [
  { icon: "layers", title: "Unified developer workflow", description: "Bring tasks, triggers, APIs, and monitoring into one clean system." },
  { icon: "bolt", title: "Faster feature delivery", description: "Ship automation updates instantly using simple Python functions." },
  { icon: "target", title: "Smarter decisions", description: "Real-time metrics reveal bottlenecks, performance issues." },
  { icon: "shield", title: "Infrastructure handled for you", description: "Scaling, reliability, logging, and runtime orchestration — all built-in." },
  { icon: "users", title: "Effortless collaboration", description: "Share workflows and pipelines without configuration overhead." },
  { icon: "flag", title: "Ready for real-world scale", description: "Run from prototype-level tasks to thousands of concurrent workflows." },
] as const;

function CapabilityIcon({ icon }: { icon: (typeof capabilities)[number]["icon"] }) {
  if (icon === "bolt") return <path d="m13.2 2.5-8.1 11h6.2l-.5 8 8.1-11h-6.2l.5-8Z" />;
  if (icon === "target") return <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 1.8v2.4M12 19.8v2.4M1.8 12h2.4M19.8 12h2.4" /></>;
  if (icon === "shield") return <><path d="M12 2.8 20 6v5.8c0 4.9-3.2 8-8 9.4-4.8-1.4-8-4.5-8-9.4V6l8-3.2Z" /><path d="m8.7 12 2.1 2.1 4.7-4.7" /></>;
  if (icon === "users") return <><circle cx="9" cy="8" r="3" /><path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19M16 5.5a3 3 0 0 1 0 5.8M17 13a4.5 4.5 0 0 1 3.5 4.4V19" /></>;
  if (icon === "flag") return <><path d="M5 21V3" /><path d="M5 4h12l-2 4 2 4H5" /></>;
  return <><path d="m12 3-8 4 8 4 8-4-8-4Z" /><path d="m4 12 8 4 8-4M4 17l8 4 8-4" /></>;
}

export function ProductCapabilities() {
  return (
    <section className={styles.capabilities}>
      <header className={styles.capabilityHeader}>
        <p className={styles.eyebrow}><span aria-hidden="true" />Benefits</p>
        <h2>Build with clarity.<br />Scale with confidence.</h2>
        <p>Codexa gives teams the tools to automate workflows, ship faster, and operate with complete visibility.</p>
      </header>
      <div className={styles.capabilityGrid}>
        {capabilities.map((capability) => (
          <article key={capability.title}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><CapabilityIcon icon={capability.icon} /></svg>
            <h3>{capability.title}</h3>
            <p>{capability.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
