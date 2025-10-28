import { useState } from "react";

type Row = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

type Result = {
  monthly_payment: number;
  total_interest: number;
  total_paid: number;
  months: number;
  schedule: Row[];
};

const apiBase = import.meta.env.VITE_API_URL as string;

export default function App() {
  const [principal, setPrincipal] = useState<number>(300000);
  const [annualRate, setAnnualRate] = useState<number>(6.0);
  const [years, setYears] = useState<number>(30);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<Result | null>(null);

  async function calculate() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`${apiBase}/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          principal,
          annual_rate: annualRate,
          years,
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = (await res.json()) as Result;
      setResult(data);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Mortgage Calculator</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <label className="space-y-1">
          <span className="text-sm text-gray-600">Principal (£)</span>
          <input
            className="w-full border rounded-xl p-3"
            type="number"
            min={1}
            step={1000}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-gray-600">Annual Rate (%)</span>
          <input
            className="w-full border rounded-xl p-3"
            type="number"
            min={0}
            step={0.01}
            value={annualRate}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-gray-600">Term (years)</span>
          <input
            className="w-full border rounded-xl p-3"
            type="number"
            min={1}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </label>
      </div>

      <button
        onClick={calculate}
        className="px-5 py-3 rounded-2xl shadow font-medium border disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Calculating..." : "Calculate"}
      </button>

      {error && <p className="text-red-600">{error}</p>}

      {result && (
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-lg">
              Monthly payment:{" "}
              <strong>
                £{result.monthly_payment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </strong>
            </p>
            <p className="text-sm text-gray-600">
              Total interest: £{result.total_interest.toLocaleString()} | Total paid: £
              {result.total_paid.toLocaleString()} | Months: {result.months}
            </p>
          </div>

          <div className="overflow-auto max-h-96 border rounded-xl">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th className="p-2 text-left">Month</th>
                  <th className="p-2 text-right">Payment</th>
                  <th className="p-2 text-right">Principal</th>
                  <th className="p-2 text-right">Interest</th>
                  <th className="p-2 text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.slice(0, 120).map((row) => (
                  <tr key={row.month} className="odd:bg-gray-50">
                    <td className="p-2">{row.month}</td>
                    <td className="p-2 text-right">£{row.payment.toLocaleString()}</td>
                    <td className="p-2 text-right">£{row.principal.toLocaleString()}</td>
                    <td className="p-2 text-right">£{row.interest.toLocaleString()}</td>
                    <td className="p-2 text-right">£{row.balance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500">Showing first 120 months for brevity.</p>
        </div>
      )}
    </div>
  );
}
