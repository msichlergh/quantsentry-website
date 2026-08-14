"use client";

import { useState } from "react";
import { Badge, Button, Card } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { CheckIcon } from "./check-icon";
import { tiers } from "./pricing-data";

type Billing = "monthly" | "annual";

const billingOptions: { value: Billing; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual — 2 months free" },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function priceForBilling(monthlyPrice: number, billing: Billing) {
  if (billing === "monthly") return monthlyPrice;
  return Math.round((monthlyPrice * 10) / 12);
}

const activeToggleClass = "bg-surface-hover text-foreground";
const inactiveToggleClass = "text-muted-foreground hover:text-foreground";

function toggleOptionClass(isActive: boolean) {
  if (isActive) return activeToggleClass;
  return inactiveToggleClass;
}

export function PricingTiers() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <div>
      <div
        role="group"
        aria-label="Billing period"
        className="inline-flex rounded-lg border border-border bg-surface p-1"
      >
        {billingOptions.map((option) => {
          const isActive = option.value === billing;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setBilling(option.value)}
              className={cn(
                "rounded-md px-4 py-2 text-body-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                toggleOptionClass(isActive),
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={cn(
              "flex flex-col p-8",
              tier.featured && "border-accent/40 md:-translate-y-2 md:shadow-[0_0_0_1px_rgba(16,236,144,0.15)]",
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-heading-md font-heading text-foreground">{tier.name}</h3>
              {tier.featured && <Badge tone="accent">Most common</Badge>}
            </div>

            <p className="mt-2 text-body-sm text-muted-foreground">{tier.positioning}</p>

            <div className="mt-6">
              {tier.monthlyPrice === null ? (
                <p className="font-heading text-heading-lg text-foreground">Custom</p>
              ) : (
                <p className="flex items-baseline gap-1">
                  <span className="font-heading text-heading-lg text-foreground">
                    {currency.format(priceForBilling(tier.monthlyPrice, billing))}
                  </span>
                  <span className="text-body-sm text-subtle-foreground">/mo</span>
                </p>
              )}
              <p className="mt-1 text-caption text-subtle-foreground">{tier.priceNote}</p>
            </div>

            <Button
              href={tier.ctaHref}
              variant={tier.featured ? "primary" : "secondary"}
              className="mt-6 w-full"
            >
              {tier.ctaLabel}
            </Button>

            <ul className="mt-8 flex flex-col gap-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-body-sm text-muted-foreground">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
