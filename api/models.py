from pydantic import BaseModel, Field, conint, confloat

class MortgageInput(BaseModel):
    principal: confloat(gt=0) = Field(..., description="Loan amount")
    annual_rate: confloat(ge=0) = Field(..., description="APR as percent, e.g. 6.5")
    years: conint(gt=0) = Field(..., description="Loan term in years")
    extra_payment: confloat(ge=0) = 0.0  # optional, can be ignored initially

class MortgageResult(BaseModel):
    monthly_payment: float
    total_interest: float
    total_paid: float
    months: int
    schedule: list