import type { CodexaAccordionItem } from "../shared/CodexaAccordion";
import { CodexaAccordion } from "../shared/CodexaAccordion";
import { CodexaInnerHero } from "../shared/CodexaInnerHero";
import { CodexaSiteFrame } from "../shared/CodexaSiteFrame";

import styles from "./ProductFaqsPage.module.css";

const groups: readonly {
  title: string;
  description: string;
  id: string;
  items: readonly CodexaAccordionItem[];
}[] = [
  {
    title: "General Questions",
    description: "Learn more about Codexa, how the platform operates behind the scenes, and how it helps teams automate.",
    id: "general",
    items: [
      { question: "What is Codexa?", answer: "Codexa is a developer-first automation platform for building workflows, background jobs, and event-driven pipelines with clean, readable code." },
      { question: "Who is Codexa built for?", answer: "Codexa is designed for developers, technical teams, and startups who want to automate processes without complex infrastructure setup." },
      { question: "Do I need prior ML or AI experience?", answer: "No. Codexa includes optional AI-powered insights, but core workflows run on simple Python functions and API calls." },
      { question: "What types of workflows can I build?", answer: "Anything from scheduled batch jobs to file processing, webhook triggers, real-time data pipelines, or internal automation." },
      { question: "Is Codexa cloud-hosted or self-hosted?", answer: "Codexa provides both options. You can use our managed cloud or deploy the runtime inside your own infrastructure." },
      { question: "Does Codexa scale with my project?", answer: "Yes. Codexa automatically handles concurrency, retries, and workload scaling as your workloads grow." },
      { question: "Does Codexa replace my existing dev tools?", answer: "No. Codexa complements your existing stack — it doesn’t replace your codebase, APIs, or infrastructure. You simply automate the parts that slow you down." },
      { question: "Is Codexa suitable for both small and large teams?", answer: "Yes. Solo developers can automate daily tasks quickly, while larger teams benefit from shared workflows, permissions, and scalable execution." },
    ],
  },
  {
    title: "Setup & Installation",
    description: "Everything you need to get Codexa installed, configured, and running smoothly.",
    id: "setup",
    items: [
      { question: "How do I install Codexa?", answer: "Install the Python SDK (pip install codexa) or download the desktop app for macOS/Windows to manage workflows visually." },
      { question: "What are the system requirements?", answer: "Codexa supports macOS 13+, Windows 11+, and modern Linux distributions for CLI/SDK usage." },
      { question: "How do I deploy workflows to production?", answer: "Push workflows to the Codexa cloud or deploy the runtime to your own servers using Docker." },
      { question: "Can I connect external APIs or databases?", answer: "Yes — Codexa workflows can use any Python library to access APIs, storage, or databases." },
      { question: "Does Codexa require Docker?", answer: "Not required, but recommended for self-hosting or isolated environment setup." },
      { question: "Is version control supported?", answer: "Yes, Codexa is fully Git-friendly. Your workflows remain plain Python files in your repository." },
    ],
  },
  {
    title: "Workflows & Automation",
    description: "Understand how to build, run, and optimize workflows using Codexa’s automation engine.",
    id: "workflows",
    items: [
      { question: "How do workflows run inside Codexa?", answer: "Workflows are Python functions decorated with @workflow.task() and executed through Codexa’s event-driven runtime." },
      { question: "Can I trigger workflows from external systems?", answer: "Yes. You can trigger tasks via API calls, webhooks, schedules, or custom events." },
      { question: "Does Codexa support batch processing?", answer: "Absolutely. Batch workloads, loops, and file-based processing are first-class features." },
      { question: "Can I monitor my workflows in real time?", answer: "Yes — throughput, latency, success rate, retries, and errors are tracked automatically inside the dashboard." },
      { question: "How does Codexa handle errors?", answer: "Codexa provides intelligent diagnostics, automatic retries, and structured error logs to help you fix issues faster." },
      { question: "Can workflows communicate with each other?", answer: "Yes. You can chain tasks, share data between functions, or orchestrate multi-step pipelines." },
    ],
  },
  {
    title: "Billing & Plans",
    description: "Find answers about pricing, subscriptions, upgrades, and payment options.",
    id: "billing",
    items: [
      { question: "Do you offer a free plan?", answer: "Yes — the free tier includes workflow execution limits suitable for testing and small projects." },
      { question: "How is usage calculated?", answer: "Pricing is based on workflow runs, compute time, and team seats depending on your chosen plan." },
      { question: "Do I need to pay for additional projects?", answer: "No. All paid plans include unlimited projects unless otherwise specified." },
      { question: "Can I upgrade or downgrade anytime?", answer: "Yes. Plan changes apply instantly and prorated billing is handled automatically." },
      { question: "Do you offer refunds?", answer: "Annual plans come with a 30-day money-back guarantee. Monthly plans are non-refundable after usage." },
      { question: "Do you support team billing?", answer: "Yes — you can add multiple members, assign roles, and manage seat-based billing from the dashboard." },
    ],
  },
];

export function ProductFaqsPage() {
  return (
    <CodexaSiteFrame>
      <CodexaInnerHero
        compact
        eyebrow="FAQs"
        title="Frequently Asked Questions"
        description="Find clear answers about our design process, pricing, & creative collaboration approach."
      />

      <section className={styles.groups} aria-label="Frequently asked questions">
        {groups.map((group) => (
          <article
            className={`${styles.group} ${group.items.length === 8 ? styles.groupEight : styles.groupSix}`}
            key={group.id}
          >
            <header>
              <h2>{group.title}</h2>
              <p>{group.description}</p>
            </header>
            <div className={styles.groupAccordion}>
              <CodexaAccordion idPrefix={`codexa-${group.id}`} items={group.items} />
            </div>
          </article>
        ))}
      </section>
    </CodexaSiteFrame>
  );
}
