"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button, Container } from "./primitives";
import { Logo } from "./logo";
import { mainNav } from "./nav-data";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={cn("size-3.5", className)}>
      <path
        d="m4 6 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        scrolled
          ? "border-border bg-surface-raised/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => setOpen(null)}
        >
          {mainNav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpen(item.label)}
              >
                <button
                  type="button"
                  aria-expanded={open === item.label}
                  onClick={() =>
                    setOpen(open === item.label ? null : item.label)
                  }
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md px-3 py-2 text-body-sm transition-colors",
                    open === item.label
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "transition-transform duration-200",
                      open === item.label && "rotate-180",
                    )}
                  />
                </button>

                {open === item.label && (
                  <div className="absolute left-0 top-full w-[340px] pt-2">
                    <div className="rounded-xl border border-border bg-surface p-2 shadow-2xl shadow-black/60">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(null)}
                          className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-hover"
                        >
                          <span className="block text-body-sm font-medium text-foreground">
                            {child.label}
                          </span>
                          <span className="mt-0.5 block text-caption text-subtle-foreground">
                            {child.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href ?? "/"}
                className="rounded-md px-3 py-2 text-body-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button href="/contact-us" variant="ghost" size="sm">
            Talk to us
          </Button>
          <Button href="/contact-us" size="sm">
            Get started
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-md text-foreground md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-5">
            {mobileOpen ? (
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3.5 7h17M3.5 12h17M3.5 17h17"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </Container>

      {mobileOpen && (
        <div className="border-t border-border bg-surface-raised md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) =>
              item.children ? (
                <div key={item.label} className="py-2">
                  <p className="px-3 pb-1 font-mono text-label uppercase tracking-[0.08em] text-faint-foreground">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-md px-3 py-2 text-body-sm text-muted-foreground hover:text-foreground"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href ?? "/"}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2.5 text-body-sm text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
              <Button href="/contact-us" variant="secondary">
                Talk to us
              </Button>
              <Button href="/contact-us">Get started</Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
