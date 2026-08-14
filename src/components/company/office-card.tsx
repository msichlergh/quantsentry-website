import { Card } from "@/components/site/primitives";

export function OfficeCard({
  city,
  lines,
}: {
  city: string;
  lines: string[];
}) {
  return (
    <Card className="hover:border-border">
      <p className="text-heading-sm text-foreground">{city}</p>
      <address className="mt-2 not-italic text-body-sm text-muted-foreground">
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </address>
    </Card>
  );
}
