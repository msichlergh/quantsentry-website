import { Card } from "@/components/site/primitives";

type Person = {
  name: string;
  role: string;
  background: string;
};

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("");
}

export function PersonCard({ name, role, background }: Person) {
  return (
    <Card>
      <div
        aria-hidden
        className="flex size-12 items-center justify-center rounded-full border border-border bg-surface-hover font-mono text-label text-muted-foreground"
      >
        {initialsOf(name)}
      </div>
      <p className="mt-4 text-heading-sm text-foreground">{name}</p>
      <p className="mt-1 text-caption text-accent">{role}</p>
      <p className="mt-3 text-body-sm text-muted-foreground">{background}</p>
    </Card>
  );
}
