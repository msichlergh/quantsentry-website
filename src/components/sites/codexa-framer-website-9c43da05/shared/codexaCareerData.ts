export type CodexaCareerSection = {
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

export type CodexaCareerOpening = {
  slug: string;
  location: "REMOTE" | "ONSITE";
  schedule: "FULL TIME" | "HALF TIME";
  title: string;
  summary: string;
  sections: readonly CodexaCareerSection[];
  emphasis: readonly string[];
  repeatSections?: boolean;
};

export const codexaCareerOpenings: readonly CodexaCareerOpening[] = [
  {
    slug: "product-designer",
    location: "REMOTE",
    schedule: "FULL TIME",
    title: "Product Designer",
    summary:
      "Design clear, elegant, and scalable product experiences for the Codexa platform.",
    emphasis: ["Product Designer", "portfolio", "CV", "Dribbble / Behance profile"],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "We’re looking for a Product Designer to shape how users experience Codexa. You’ll work closely with product managers and engineers to design intuitive, user-centered interfaces for complex workflows.",
          "If you enjoy simplifying systems, crafting clean UI, and thinking in scalable design systems, you’ll feel right at home.",
        ],
      },
      {
        heading: "What You’ll Do",
        bullets: [
          "Design end-to-end product experiences from concept to launch",
          "Create wireframes, flows, and high-fidelity UI designs",
          "Collaborate with engineers to ensure designs are implemented accurately",
          "Contribute to and evolve Codexa’s design system",
          "Improve usability through thoughtful layout, spacing, and interaction design",
          "Validate ideas through feedback, iteration, and testing",
        ],
      },
      {
        heading: "What We’re Looking For",
        bullets: [
          "3+ years of experience in product or UI/UX design",
          "Strong portfolio showcasing SaaS or dashboard-style products",
          "Proficiency with Figma and modern design workflows",
          "Solid understanding of UX principles and design systems",
          "Ability to think both visually and strategically",
          "Clear communication and collaboration skills",
        ],
      },
      {
        heading: "Nice to Have",
        bullets: [
          "Experience designing developer tools or B2B products",
          "Familiarity with accessibility standards",
          "Basic understanding of frontend development",
          "Experience working with design systems at scale",
        ],
      },
      {
        heading: "About Codexa",
        paragraphs: [
          "Codexa is a modern platform focused on building scalable, high-quality digital products. We combine clean design, strong systems, and thoughtful execution to help teams move faster without sacrificing quality.",
        ],
      },
      {
        heading: "How to Apply",
        paragraphs: [
          "Send us your portfolio, CV, or Dribbble / Behance profile, along with a short introduction. We’d love to see how you think and design.",
        ],
      },
    ],
  },
  {
    slug: "backend-engineer",
    location: "REMOTE",
    schedule: "FULL TIME",
    title: "Backend Engineer",
    summary:
      "Build scalable, secure, and high-performance backend systems for Codexa.",
    emphasis: ["Backend Engineer", "CV", "GitHub profile"],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "We’re looking for a Backend Engineer to power the core infrastructure behind Codexa. You’ll work closely with frontend and product teams to design reliable APIs, handle complex data flows, and ensure platform stability at scale.",
          "If you enjoy building solid systems that quietly do their job really well, this role is for you.",
        ],
      },
      {
        heading: "What You’ll Do",
        bullets: [
          "Design, build, and maintain scalable backend services and APIs",
          "Collaborate with frontend engineers to support product features",
          "Work with databases, authentication, and permission systems",
          "Ensure security, performance, and reliability across the platform",
          "Write clean, well-structured, and maintainable code",
          "Monitor and debug production systems when needed",
        ],
      },
      {
        heading: "What We’re Looking For",
        bullets: [
          "4+ years of backend development experience",
          "Strong knowledge of Node.js, REST APIs, and backend architecture",
          "Experience with relational and/or NoSQL databases",
          "Understanding of authentication, authorization, and security best practices",
          "Ability to work independently and as part of a remote team",
          "Strong problem-solving and communication skills",
        ],
      },
      {
        heading: "Nice to Have",
        bullets: [
          "Experience with cloud platforms (AWS, GCP, or similar)",
          "Familiarity with Docker and containerized environments",
          "Experience with GraphQL",
          "Background in SaaS or B2B platforms",
        ],
      },
      {
        heading: "About Codexa",
        paragraphs: [
          "Codexa is a modern platform built to support fast-moving product teams. We focus on performance, clarity, and scalable systems that grow with our users.",
        ],
      },
      {
        heading: "How to Apply",
        paragraphs: [
          "Send us your CV, GitHub profile, or relevant project links, along with a short introduction. We’re excited to learn how you build.",
        ],
      },
    ],
  },
  {
    slug: "product-manager",
    location: "REMOTE",
    schedule: "FULL TIME",
    title: "Product Manager",
    summary: "Own product direction and help shape the future of Codexa.",
    emphasis: ["Product Manager", "CV or LinkedIn profile"],
    repeatSections: true,
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "We’re looking for a Product Manager to guide the direction of Codexa. You’ll work at the intersection of design, engineering, and business to define priorities, ship impactful features, and ensure we’re building the right things.",
          "If you enjoy turning strategy into clear execution, this role is for you.",
        ],
      },
      {
        heading: "What You’ll Do",
        bullets: [
          "Define product vision, roadmap, and feature priorities",
          "Translate business goals into clear product requirements",
          "Work closely with design and engineering teams from ideation to release",
          "Gather feedback from users and stakeholders to inform decisions",
          "Track progress, measure impact, and iterate based on results",
          "Ensure alignment across teams and timelines",
        ],
      },
      {
        heading: "What We’re Looking For",
        bullets: [
          "3+ years of experience in product management",
          "Experience working on SaaS or B2B platforms",
          "Strong communication and stakeholder management skills",
          "Ability to balance user needs with business goals",
          "Structured, analytical, and outcome-focused mindset",
        ],
      },
      {
        heading: "Nice to Have",
        bullets: [
          "Technical background or experience working closely with engineers",
          "Experience with analytics and experimentation",
          "Familiarity with agile or lean product processes",
        ],
      },
      {
        heading: "About Codexa",
        paragraphs: [
          "Codexa helps teams design and build scalable digital products with clarity and speed. We focus on strong systems, clean execution, and thoughtful product decisions.",
        ],
      },
      {
        heading: "How to Apply",
        paragraphs: [
          "Send us your CV or LinkedIn profile, along with a short introduction. We’d love to hear how you approach product thinking.",
        ],
      },
    ],
  },
  {
    slug: "devops-engineer",
    location: "REMOTE",
    schedule: "HALF TIME",
    title: "DevOps Engineer",
    summary:
      "Build and maintain reliable infrastructure that powers Codexa at scale.",
    emphasis: ["DevOps Engineer", "CV or LinkedIn profile"],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "We’re looking for a DevOps Engineer to keep Codexa fast, secure, and reliable. You’ll be responsible for infrastructure, deployment pipelines, and system stability across environments.",
          "If you enjoy automation, scalability, and clean infrastructure, you’ll fit right in.",
        ],
      },
      {
        heading: "What You’ll Do",
        bullets: [
          "Design and maintain cloud infrastructure for production systems",
          "Build and manage CI/CD pipelines",
          "Monitor performance, uptime, and system health",
          "Improve security, scalability, and deployment workflows",
          "Collaborate with engineering teams to support product releases",
          "Troubleshoot infrastructure and production issues",
        ],
      },
      {
        heading: "What We’re Looking For",
        bullets: [
          "4+ years of experience in DevOps or infrastructure roles",
          "Experience with cloud platforms (AWS, GCP, or similar)",
          "Knowledge of CI/CD, containers, and infrastructure automation",
          "Strong understanding of security and reliability best practices",
          "Ability to work independently in a remote environment",
        ],
      },
      {
        heading: "Nice to Have",
        bullets: [
          "Experience with Docker and Kubernetes",
          "Infrastructure-as-code (Terraform, Pulumi)",
          "Familiarity with monitoring tools and logging systems",
          "Experience supporting SaaS platforms",
        ],
      },
      {
        heading: "About Codexa",
        paragraphs: [
          "Codexa is built on strong systems and scalable infrastructure. We focus on reliability, performance, and clean execution across the platform.",
        ],
      },
      {
        heading: "How to Apply",
        paragraphs: [
          "Send us your CV or LinkedIn profile, along with a short introduction. We’d love to hear how you keep systems running smoothly.",
        ],
      },
    ],
  },
  {
    slug: "qa-engineer",
    location: "REMOTE",
    schedule: "FULL TIME",
    title: "QA Engineer",
    summary:
      "Ensure Codexa delivers a reliable, polished, and bug-free product experience.",
    emphasis: ["QA Engineer", "CV or LinkedIn profile"],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "We’re looking for a QA Engineer to maintain the quality and reliability of Codexa. You’ll work closely with product and engineering teams to identify issues early and ensure every release meets our standards.",
          "If you have an eye for detail and enjoy improving product quality, this role is for you.",
        ],
      },
      {
        heading: "What You’ll Do",
        bullets: [
          "Test new features and product updates across platforms",
          "Identify, document, and track bugs and edge cases",
          "Collaborate with engineers to reproduce and resolve issues",
          "Create and maintain test cases and quality checklists",
          "Ensure consistency, usability, and performance across releases",
          "Support release validation before launches",
        ],
      },
      {
        heading: "What We’re Looking For",
        bullets: [
          "3+ years of experience in QA or software testing",
          "Strong understanding of testing processes and methodologies",
          "Experience testing SaaS or web-based applications",
          "Attention to detail and strong problem-solving skills",
          "Ability to communicate clearly with technical teams",
        ],
      },
      {
        heading: "Nice to Have",
        bullets: [
          "Experience with automated testing tools",
          "Familiarity with CI/CD pipelines",
          "Basic understanding of frontend or backend development",
          "Experience working in agile teams",
        ],
      },
      {
        heading: "About Codexa",
        paragraphs: [
          "Codexa focuses on building reliable, scalable products without unnecessary complexity. Quality is a core part of how we build and ship.",
        ],
      },
      {
        heading: "How to Apply",
        paragraphs: [
          "Send us your CV or LinkedIn profile, along with a short introduction. We’d love to see how you think about quality.",
        ],
      },
    ],
  },
  {
    slug: "data-analyst",
    location: "ONSITE",
    schedule: "FULL TIME",
    title: "Data Analyst",
    summary:
      "Turn product and customer data into clear insights that drive Codexa forward.",
    emphasis: ["Data Analyst", "CV or LinkedIn profile"],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "We’re looking for a Data Analyst to help Codexa make smarter, data-driven decisions. You’ll work with product, growth, and engineering teams to analyze usage patterns, uncover insights, and support strategic planning.",
          "If you enjoy turning raw data into meaningful stories, this role is for you.",
        ],
      },
      {
        heading: "What You’ll Do",
        bullets: [
          "Analyze product, user, and business data",
          "Build dashboards and reports to track key metrics",
          "Identify trends, opportunities, and areas for improvement",
          "Work closely with product teams to support decision-making",
          "Ensure data accuracy and consistency across sources",
          "Present insights in a clear, actionable way",
        ],
      },
      {
        heading: "What We’re Looking For",
        bullets: [
          "3+ years of experience in data analysis or analytics roles",
          "Strong SQL skills and experience with analytics tools",
          "Experience working with SaaS or product data",
          "Ability to translate data into clear insights",
          "Strong communication and problem-solving skills",
        ],
      },
      {
        heading: "Nice to Have",
        bullets: [
          "Experience with BI tools (Looker, Tableau, Power BI)",
          "Familiarity with product analytics platforms",
          "Basic understanding of statistics or experimentation",
        ],
      },
      {
        heading: "About Codexa",
        paragraphs: [
          "Codexa helps teams build better products through clarity, structure, and insight. Data plays a key role in how we prioritize and improve the platform.",
        ],
      },
      {
        heading: "How to Apply",
        paragraphs: [
          "Send us your CV or LinkedIn profile, along with a short introduction. We’d love to see how you think with data.",
        ],
      },
    ],
  },
] as const;

export function getCodexaCareerOpening(slug: string) {
  return codexaCareerOpenings.find((opening) => opening.slug === slug);
}
