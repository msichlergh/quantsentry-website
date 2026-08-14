import { CheckIcon } from "./check-icon";
import { comparisonGroups, type ComparisonCell } from "./pricing-data";

const columns: { key: "desk" | "platform" | "enterprise"; label: string }[] = [
  { key: "desk", label: "Desk" },
  { key: "platform", label: "Platform" },
  { key: "enterprise", label: "Enterprise" },
];

function CellValue({ value }: { value: ComparisonCell }) {
  if (value === true) {
    return <CheckIcon className="mx-auto size-4 text-accent" />;
  }
  if (value === false) {
    return (
      <span aria-hidden="true" className="text-faint-foreground">
        &ndash;
      </span>
    );
  }
  return <span className="text-body-sm text-muted-foreground">{value}</span>;
}

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <caption className="sr-only">
          Feature comparison across Desk, Platform and Enterprise plans
        </caption>
        <thead>
          <tr className="border-b border-border bg-surface">
            <th
              scope="col"
              className="sticky left-0 z-10 min-w-[220px] bg-surface px-4 py-3 text-label font-mono uppercase tracking-[0.06em] text-subtle-foreground"
            >
              Feature
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="min-w-[140px] px-4 py-3 text-center text-body-sm font-semibold text-foreground"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        {comparisonGroups.map((group) => (
          <tbody key={group.category} className="border-b border-border last:border-b-0">
            <tr className="border-b border-border bg-surface-raised">
              <td
                colSpan={4}
                className="sticky left-0 z-10 bg-surface-raised px-4 py-2 text-left text-caption font-mono uppercase tracking-[0.06em] text-subtle-foreground"
              >
                {group.category}
              </td>
            </tr>
            {group.rows.map((row) => (
              <tr key={row.label} className="border-b border-border last:border-b-0">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-surface px-4 py-3 text-left text-body-sm font-normal text-foreground"
                >
                  {row.label}
                </th>
                <td className="px-4 py-3 text-center">
                  <CellValue value={row.desk} />
                </td>
                <td className="px-4 py-3 text-center">
                  <CellValue value={row.platform} />
                </td>
                <td className="px-4 py-3 text-center">
                  <CellValue value={row.enterprise} />
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
