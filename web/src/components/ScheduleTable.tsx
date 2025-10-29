import React from "react";
import type { Row } from "../types";

type Props = { rows: Row[]; limit?: number };

export default function ScheduleTable({ rows, limit = 120 }: Props) {
  return (
    <>
      <div className="overflow-auto max-h-80 border rounded-2xl bg-white/60">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-white/80 backdrop-blur">
            <tr>
              <th className="p-2 text-left">Month</th>
              <th className="p-2 text-right">Payment</th>
              <th className="p-2 text-right">Principal</th>
              <th className="p-2 text-right">Interest</th>
              <th className="p-2 text-right">Balance</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, limit).map((row) => (
              <tr key={row.month} className="odd:bg-white even:bg-white/70">
                <td className="p-2">{row.month}</td>
                <td className="p-2 text-right">
                  £{row.payment.toLocaleString()}
                </td>
                <td className="p-2 text-right">
                  £{row.principal.toLocaleString()}
                </td>
                <td className="p-2 text-right">
                  £{row.interest.toLocaleString()}
                </td>
                <td className="p-2 text-right">
                  £{row.balance.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 text-center">
        Showing first {limit} months for brevity.
      </p>
    </>
  );
}
