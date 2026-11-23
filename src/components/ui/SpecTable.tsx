import type { SpecRow } from '../../types/content';

export function SpecTable({ caption, rows }: { caption: string; rows: readonly SpecRow[] }) {
  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-surface-alt">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold text-primary">
              Parameter
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-primary">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-border align-top">
              <th scope="row" className="w-2/5 px-4 py-3 font-semibold text-text-primary">
                {row.label}
              </th>
              <td className="px-4 py-3 tabular-nums text-text-primary">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
