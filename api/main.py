from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import MortgageInput, MortgageResult
from calculations import monthly_payment, amortization_schedule

app = FastAPI(title="Mortgage API", root_path="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/calculate", response_model=MortgageResult)
def calculate(data: MortgageInput):
    pmt = monthly_payment(data.principal, data.annual_rate, data.years)
    schedule = amortization_schedule(data.principal, data.annual_rate, data.years)
    total_interest = round(sum(m["interest"] for m in schedule), 2)
    total_paid = round(sum(m["payment"] for m in schedule), 2)
    return {
        "monthly_payment": round(pmt, 2),
        "total_interest": total_interest,
        "total_paid": total_paid,
        "months": data.years * 12,
        "schedule": schedule,
    }
