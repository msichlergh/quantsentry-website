import { Container } from "@/components/site/primitives";

const desks = [
  "MERIDIAN CAPITAL",
  "NORTHFIELD QUANT",
  "VESTRA SYSTEMATIC",
  "ARCLIGHT MACRO",
  "COVE RIDGE PARTNERS",
  "HALLMARK ALPHA",
];

export function TrustStrip() {
  return (
    <section className="border-t border-border py-12 md:py-14">
      <Container>
        <p className="text-center font-mono text-label tracking-[0.08em] text-faint-foreground uppercase">
          Trusted by 40+ systematic desks
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {desks.map((desk) => (
            <li
              key={desk}
              className="font-mono text-body-sm tracking-[0.04em] text-faint-foreground"
            >
              {desk}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
