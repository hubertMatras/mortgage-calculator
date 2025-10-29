import React from "react";

type Props = {
  principal: number;
  setPrincipal: (v: number) => void;
  annualRate: number;
  setAnnualRate: (v: number) => void;
  years: number;
  setYears: (v: number) => void;
  onCalculate: () => void;
  loading?: boolean;
};

export default function CalculatorForm({
  principal,
  setPrincipal,
  annualRate,
  setAnnualRate,
  years,
  setYears,
  onCalculate,
  loading,
}: Props) {
  return (
    <>
      <div className="space-y-4">
        <label className="block">
          <span className="block text-sm text-gray-700 mb-1">
            Principal (£)
          </span>
          <input
            id="principal"
            className="w-full rounded-2xl border-2 border-purple-900 bg-white/60 p-3 focus:outline-none focus:ring-2 focus:ring-violet-900"
            type="number"
            min={1}
            step={1000}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
          />
        </label>

        <label className="block">
          <span className="block text-sm text-gray-700 mb-1">
            Annual Rate (%)
          </span>
          <input
            id="rate"
            className="w-full rounded-2xl border-2 border-purple-900 bg-white/60 p-3 focus:outline-none focus:ring-2 focus:ring-violet-900"
            type="number"
            min={0}
            step={0.01}
            value={annualRate}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
          />
        </label>

        <label className="block">
          <span className="block text-sm text-gray-700 mb-1">Term (years)</span>
          <input
            id="years"
            className="w-full rounded-2xl border-2 border-purple-900 bg-white/60 p-3 focus:outline-none focus:ring-2 focus:ring-violet-900"
            type="number"
            min={1}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={onCalculate}
          className="px-6 py-2 rounded-xl border-2 border-purple-900 bg-white/60 shadow-sm font-medium hover:translate-y-px active:translate-y-0 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Calculating..." : "Calculate"}
        </button>
      </div>
    </>
  );
}
