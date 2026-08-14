export type Subprocessor = {
  name: string;
  purpose: string;
  region: string;
};

/** Real `<table>` markup (not divs) so assistive tech gets correct row/column semantics. */
export function SubprocessorTable({ rows }: { rows: Subprocessor[] }) {
  return (
    <table>
      <caption className="sr-only">
        Subprocessors used to help provide the QuantSentry service
      </caption>
      <thead>
        <tr>
          <th scope="col">Subprocessor</th>
          <th scope="col">Purpose</th>
          <th scope="col">Region</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <th scope="row">{row.name}</th>
            <td>{row.purpose}</td>
            <td>{row.region}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
