"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { categories, integrations } from "./integrations-data";
import { IntegrationCard } from "./integration-card";

type CategoryFilter = (typeof categories)[number];

const activeFilterClass = "border-accent/40 bg-accent/10 text-accent";
const inactiveFilterClass =
  "border-border bg-surface text-muted-foreground hover:border-[#3a3532] hover:text-foreground";

function filterButtonClass(isActive: boolean) {
  if (isActive) return activeFilterClass;
  return inactiveFilterClass;
}

export function IntegrationsExplorer() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");

  const visible =
    activeCategory === "All"
      ? integrations
      : integrations.filter((integration) => integration.category === activeCategory);

  return (
    <div>
      <div role="group" aria-label="Filter integrations by category" className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-body-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                filterButtonClass(isActive),
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-caption text-subtle-foreground" aria-live="polite">
        Showing {visible.length} of {integrations.length} connectors
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((integration) => (
          <IntegrationCard key={integration.name} integration={integration} />
        ))}
      </div>
    </div>
  );
}
