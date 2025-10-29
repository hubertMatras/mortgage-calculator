import { useState, useEffect } from "react";
import type { Result } from "./types";
import { calculateMortgage } from "./lib/api";
import { CalculatorForm, Results, ScheduleTable } from './components';

export default function App() {
  const [principal, setPrincipal] = useState<number>(300000);
  const [annualRate, setAnnualRate] = useState<number>(6.0);
  const [years, setYears] = useState<number>(30);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<Result | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  async function handleCalculate() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await calculateMortgage({
        principal,
        annual_rate: annualRate,
        years,
      });
      setResult(data);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 grid place-items-center p-6 relative overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
        }}
      />
      
      <div className="w-full max-w-2xl bg-violet-400 border-4 border-purple-900 rounded-4xl p-8 shadow-sm relative z-10">
        <h1 className="text-2xl font-semibold text-center mb-8">
          Mortgage Calculator
        </h1>

        <CalculatorForm
          principal={principal}
          setPrincipal={setPrincipal}
          annualRate={annualRate}
          setAnnualRate={setAnnualRate}
          years={years}
          setYears={setYears}
          onCalculate={handleCalculate}
          loading={loading}
        />

        {error && <p className="mt-4 text-center text-red-600">{error}</p>}

        {result && (
          <div className="mt-8 space-y-4">
            <Results result={result} />
            <ScheduleTable rows={result.schedule} limit={120} />
          </div>
        )}
      </div>
    </div>
  );
}
