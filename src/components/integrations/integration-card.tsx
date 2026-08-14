import { Card } from "@/components/site/primitives";
import type { Integration } from "./integrations-data";

function monogram(name: string) {
  const words = name.split(" ").filter(Boolean);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

export function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <Card className="flex flex-col gap-4 p-5">
      <div
        aria-hidden="true"
        className="flex size-10 items-center justify-center rounded-lg bg-surface-hover font-heading text-body-sm text-foreground"
      >
        {monogram(integration.name)}
      </div>
      <div>
        <h3 className="text-heading-sm font-heading text-foreground">{integration.name}</h3>
        <p className="mt-0.5 text-caption font-mono uppercase tracking-[0.06em] text-subtle-foreground">
          {integration.category}
        </p>
      </div>
      <p className="text-body-sm text-muted-foreground">{integration.description}</p>
    </Card>
  );
}
