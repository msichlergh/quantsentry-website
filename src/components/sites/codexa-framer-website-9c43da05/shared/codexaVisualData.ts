/**
 * Copy shared by the decorative feature illustrations on the homepage
 * (root-8a5edab2/CodexaFeatureVisuals) and on /product/features
 * (product-features-e258f631/ProductFeatureVisuals).
 *
 * The two pages render these with different markup and animation — the homepage
 * panels swap state on hover, the product page ones are static — so only the
 * content lives here, not the rendering.
 */

/** Workflow status rows. `hover` is the state the homepage panel animates to. */
export const codexaWorkflowRows: readonly {
  label: string;
  active: boolean;
  hover: boolean;
}[] = [
  { label: "Workflow sync", active: true, hover: true },
  { label: "Automation enabled", active: true, hover: true },
  { label: "Error handling", active: false, hover: false },
  { label: "API integration", active: false, hover: true },
  { label: "Rate limits", active: false, hover: true },
];

export const codexaReleaseColumns = ["PLANNED", "TESTING", "RELEASED"] as const;

export const codexaThroughputStages = [
  "Ingest",
  "Process",
  "Execute",
  "Recover",
] as const;

export const codexaThroughputMetric = {
  label: "System throughput",
  value: "248",
  hoverValue: "280",
  change: "+14%",
  hoverChange: "+22%",
} as const;
