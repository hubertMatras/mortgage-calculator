import type { Result } from "../types";

type Props = { result: Result };

export default function Results({ result }: Props) {
  return (
    <div className="text-center space-y-1">
      <p className="text-lg">
        Monthly payment:{" "}
        <strong>
          £
          {result.monthly_payment.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </strong>
      </p>
      <p className="text-sm text-gray-600">
        Total interest: £{result.total_interest.toLocaleString()} • Total paid:
        £{result.total_paid.toLocaleString()} • Months: {result.months}
      </p>
    </div>
  );
}
