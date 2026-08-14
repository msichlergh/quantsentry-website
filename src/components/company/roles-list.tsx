"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/site/primitives";
import { departments, roles, type Department } from "./roles-data";
import { ChevronRightIcon } from "./icons";

const filterButtonBase =
  "rounded-full border px-3.5 py-1.5 text-caption font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const filterButtonActive = "border-accent/30 bg-accent/10 text-accent";
const filterButtonInactive =
  "border-border bg-surface text-muted-foreground hover:text-foreground";

export function RolesList() {
  const [selected, setSelected] = useState<Department>("All");

  const visibleRoles =
    selected === "All"
      ? roles
      : roles.filter((role) => role.department === selected);

  const groups = departments
    .filter((department) => department !== "All")
    .map((department) => ({
      department,
      roles: visibleRoles.filter((role) => role.department === department),
    }))
    .filter((group) => group.roles.length > 0);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter open roles by department"
        className="flex flex-wrap gap-2"
      >
        {departments.map((department) => {
          const isActive = department === selected;
          return (
            <button
              key={department}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelected(department)}
              className={cn(
                filterButtonBase,
                isActive && filterButtonActive,
                !isActive && filterButtonInactive,
              )}
            >
              {department}
            </button>
          );
        })}
      </div>

      <div className="mt-8 space-y-10">
        {groups.map((group) => (
          <div key={group.department}>
            <h3 className="text-heading-sm text-foreground">
              {group.department}
            </h3>
            <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-surface">
              {group.roles.map((role) => (
                <li key={role.title}>
                  <Link
                    href="/contact-us"
                    className="flex items-center justify-between gap-4 px-5 py-4 transition-colors duration-150 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                  >
                    <div>
                      <p className="text-body-sm font-medium text-foreground">
                        {role.title}
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <Badge>{role.location}</Badge>
                        <span className="text-caption text-subtle-foreground">
                          {role.type}
                        </span>
                      </div>
                    </div>
                    <ChevronRightIcon className="shrink-0 text-faint-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {groups.length === 0 && (
          <p className="text-body-sm text-muted-foreground">
            No open roles in this department right now — check back soon or
            reach out anyway.
          </p>
        )}
      </div>
    </div>
  );
}
