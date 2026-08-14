type Stat = {
  value: string;
  label: string;
};

export function StatBand({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-surface px-6 py-8 text-center">
          <dd className="font-heading text-heading-lg text-foreground md:text-display-md">
            {stat.value}
          </dd>
          <dt className="mt-2 text-caption text-muted-foreground">
            {stat.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
