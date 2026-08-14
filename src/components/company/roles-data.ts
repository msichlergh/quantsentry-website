export type Role = {
  title: string;
  department: "Engineering" | "Research" | "Go-to-market" | "Operations";
  location: string;
  type: string;
};

export const roles: Role[] = [
  {
    title: "Senior Backend Engineer, Reconciliation Engine",
    department: "Engineering",
    location: "London",
    type: "Full-time",
  },
  {
    title: "Frontend Engineer, Atlas",
    department: "Engineering",
    location: "New York",
    type: "Full-time",
  },
  {
    title: "Site Reliability Engineer",
    department: "Engineering",
    location: "Remote (EU)",
    type: "Full-time",
  },
  {
    title: "Quantitative Researcher, Risk Models",
    department: "Research",
    location: "New York",
    type: "Full-time",
  },
  {
    title: "Data Engineer, Market Data",
    department: "Research",
    location: "London",
    type: "Full-time",
  },
  {
    title: "Enterprise Account Executive",
    department: "Go-to-market",
    location: "New York",
    type: "Full-time",
  },
  {
    title: "Solutions Engineer",
    department: "Go-to-market",
    location: "London",
    type: "Full-time",
  },
  {
    title: "Client Operations Analyst",
    department: "Operations",
    location: "London",
    type: "Full-time",
  },
  {
    title: "Compliance & Risk Ops Manager",
    department: "Operations",
    location: "New York",
    type: "Full-time",
  },
];

export const departments = [
  "All",
  "Engineering",
  "Research",
  "Go-to-market",
  "Operations",
] as const;

export type Department = (typeof departments)[number];
