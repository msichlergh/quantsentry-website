import Link from "next/link";
import { Container, Dot } from "./primitives";
import { Logo } from "./logo";
import { footerNav } from "./nav-data";

const social = [
  { label: "X", href: "https://x.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[34ch] text-body-sm text-subtle-foreground">
              Risk infrastructure for systematic trading desks.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.08em] text-subtle-foreground">
              <Dot />
              All systems operational
            </p>
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <p className="font-mono text-label uppercase tracking-[0.08em] text-faint-foreground">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-faint-foreground">
            © {new Date().getFullYear()} QuantSentry. All rights reserved.
          </p>
          <div className="flex gap-5">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                rel="noreferrer noopener"
                target="_blank"
                className="text-caption text-subtle-foreground transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
