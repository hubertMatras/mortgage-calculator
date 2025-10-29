export type Row = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

export type Result = {
  monthly_payment: number;
  total_interest: number;
  total_paid: number;
  months: number;
  schedule: Row[];
};
