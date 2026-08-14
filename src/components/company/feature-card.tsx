import type { ReactNode } from "react";
import { Card } from "@/components/site/primitives";

export function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Card>
      {icon}
      <p className="mt-4 text-heading-sm text-foreground">{title}</p>
      <p className="mt-2 text-body-sm text-muted-foreground">{body}</p>
    </Card>
  );
}
