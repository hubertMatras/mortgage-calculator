import type { Result } from "../types";

const apiBase = import.meta.env.VITE_API_URL as string ?? '/api';

export async function calculateMortgage(params: {
  principal: number;
  annual_rate: number;
  years: number;
}): Promise<Result> {
  const res = await fetch(`${apiBase}/calculate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return (await res.json()) as Result;
}
