import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container, Eyebrow, Lead } from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "Page not found — QuantSentry",
  description: "The page you’re looking for doesn’t exist or has moved.",
};

const helpfulLinks = [
  { label: "Product", href: "/features/atlas" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Changelog", href: "/changelog" },
];

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <Eyebrow>Error 404</Eyebrow>

      {/* Large numeral is decorative; the h1 below carries the accessible name. */}
      <p
        aria-hidden
        className="mt-4 font-heading text-[96px]/[88px] tracking-[-2.4px] text-foreground md:text-[128px]/[112px] md:tracking-[-3px]"
      >
        404
      </p>
      <h1 className="mt-2 font-heading text-heading-lg text-foreground">
        Page not found
      </h1>

      <Lead className="mt-4 max-w-[46ch] text-center">
        The page you&apos;re looking for doesn&apos;t exist, has moved, or
        the link is out of date.
      </Lead>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Back to homepage</Button>
        <Button href="/contact-us" variant="secondary">
          Contact us
        </Button>
      </div>

      <nav aria-label="Helpful links" className="mt-16 border-t border-border pt-8">
        <p className="font-mono text-label uppercase tracking-[0.08em] text-subtle-foreground">
          Or try one of these
        </p>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {helpfulLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-body-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
