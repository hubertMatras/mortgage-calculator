from typing import List, Dict
from math import pow

def monthly_payment(principal: float, annual_rate: float, years: int) -> float:
    r = annual_rate / 12.0 / 100.0
    m = years * 12
    if r == 0:
        return principal / m
    return principal * (r * pow(1 + r, m)) / (pow(1 + r, m) - 1)

def amortization_schedule(principal: float, annual_rate: float, years: int) -> List[Dict]:
    pmt = monthly_payment(principal, annual_rate, years)
    r = annual_rate / 12.0 / 100.0
    balance = principal
    schedule = []
    for i in range(1, years * 12 + 1):
        interest = balance * r if r > 0 else 0
        principal_paid = pmt - interest
        balance = max(0.0, balance - principal_paid)
        schedule.append({
            "month": i,
            "payment": round(pmt, 2),
            "principal": round(principal_paid, 2),
            "interest": round(interest, 2),
            "balance": round(balance, 2)
        })
    return schedule