export type Category =
  | "Prime brokers"
  | "OMS & EMS"
  | "Market data"
  | "Warehouses"
  | "Accounting";

export type Integration = {
  name: string;
  category: Category;
  description: string;
};

export const categories: readonly ("All" | Category)[] = [
  "All",
  "Prime brokers",
  "OMS & EMS",
  "Market data",
  "Warehouses",
  "Accounting",
];

export const integrations: Integration[] = [
  // Prime brokers
  {
    name: "Meridian Prime",
    category: "Prime brokers",
    description: "Multi-currency margin, positions and financing feeds via FIX drop copy.",
  },
  {
    name: "Ashford Global Markets",
    category: "Prime brokers",
    description: "Equity and futures prime brokerage with daily statement reconciliation.",
  },
  {
    name: "Solstice Capital Services",
    category: "Prime brokers",
    description: "Cross-asset margin and collateral reporting for multi-strategy funds.",
  },
  {
    name: "Northbridge Prime Services",
    category: "Prime brokers",
    description: "Securities lending and short-locate data alongside real-time positions.",
  },
  {
    name: "Cascade Execution Partners",
    category: "Prime brokers",
    description: "Intraday exposure and financing rate feeds for fixed income desks.",
  },
  {
    name: "Vantage Point Prime",
    category: "Prime brokers",
    description: "Read-only account aggregation across sub-accounts and share classes.",
  },
  // OMS & EMS
  {
    name: "Fulcrum OMS",
    category: "OMS & EMS",
    description: "Order and execution feed with allocation-level detail for multi-book funds.",
  },
  {
    name: "Ironclad EMS",
    category: "OMS & EMS",
    description: "Real-time fill and working-order sync for equities and listed derivatives.",
  },
  {
    name: "Latitude Trading Systems",
    category: "OMS & EMS",
    description: "FIX-based order flow ingestion with strategy and trader tagging preserved.",
  },
  {
    name: "Beacon Order Management",
    category: "OMS & EMS",
    description: "Compliance-flagged order history streamed for pre- and post-trade checks.",
  },
  {
    name: "Trellis EMS",
    category: "OMS & EMS",
    description: "Multi-venue execution data normalized into a single fill blotter.",
  },
  {
    name: "Corsair Execution",
    category: "OMS & EMS",
    description: "Algo execution metadata and slippage stats for TCA-linked risk checks.",
  },
  // Market data
  {
    name: "Pulsewire Market Data",
    category: "Market data",
    description: "Consolidated tape and reference pricing across global equity venues.",
  },
  {
    name: "Levant Data Systems",
    category: "Market data",
    description: "Fixed income evaluated pricing and curve data for daily marks.",
  },
  {
    name: "ClearTick Market Feeds",
    category: "Market data",
    description: "Low-latency futures and options quotes for intraday exposure marking.",
  },
  {
    name: "Horizon Reference Data",
    category: "Market data",
    description: "Corporate actions, security master and identifier cross-reference feeds.",
  },
  {
    name: "Nimbus Real-Time Data",
    category: "Market data",
    description: "Streaming FX and crypto pricing for cross-asset exposure calculations.",
  },
  {
    name: "Anchor Point Data",
    category: "Market data",
    description: "End-of-day settlement prices and volatility surfaces for options books.",
  },
  // Warehouses
  {
    name: "Snowflake",
    category: "Warehouses",
    description: "Sync exposure snapshots and risk metrics into your existing Snowflake schema.",
  },
  {
    name: "BigQuery",
    category: "Warehouses",
    description: "Stream Atlas outputs to BigQuery for custom dashboards and ad hoc SQL.",
  },
  {
    name: "Databricks",
    category: "Warehouses",
    description: "Push normalized position and risk tables to Delta Lake for research use.",
  },
  {
    name: "Amazon Redshift",
    category: "Warehouses",
    description: "Nightly batch export of positions, exposures and audit events.",
  },
  {
    name: "Azure Synapse",
    category: "Warehouses",
    description: "Incremental sync of risk factor exposures for enterprise reporting stacks.",
  },
  {
    name: "ClickHouse Cloud",
    category: "Warehouses",
    description: "High-frequency exposure time series for teams running their own analytics.",
  },
  // Accounting
  {
    name: "Paragon Fund Accounting",
    category: "Accounting",
    description: "Reconcile Atlas positions against NAV strikes and fund-level P&L.",
  },
  {
    name: "Trireme NAV Services",
    category: "Accounting",
    description: "Daily NAV and shadow accounting cross-checks against broker statements.",
  },
  {
    name: "Cornerstone Books",
    category: "Accounting",
    description: "General ledger sync for management fee and expense allocation reporting.",
  },
  {
    name: "Ashworth Fund Administration",
    category: "Accounting",
    description: "Investor-level allocation data reconciled against firm-wide exposure.",
  },
  {
    name: "Silverline Fund Ops",
    category: "Accounting",
    description: "Automated break detection between admin records and live positions.",
  },
  {
    name: "Keystone NAV Services",
    category: "Accounting",
    description: "Month-end close support with position and valuation cross-referencing.",
  },
];
