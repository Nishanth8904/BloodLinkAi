# ai/main.py
import os
import hashlib
import random
from datetime import datetime
from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# -----------------------
# App definition
# -----------------------
app = FastAPI(title="BloodLinkAI Service", version="1.0.0")

# -----------------------
# CORS configuration via environment
# Example:
# export ALLOWED_ORIGINS="https://yourfrontend.netlify.app,https://abcd-1234.ngrok-free.dev"
# -----------------------
_raw = os.getenv("ALLOWED_ORIGINS", "")
if _raw.strip() == "":
    # ⚠️ Fallback for development ONLY
    ALLOWED_ORIGINS = ["*"]
else:
    ALLOWED_ORIGINS = [u.strip() for u in _raw.split(",") if u.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------
# Utility Functions
# -----------------------
def seed_from_id(donor_id) -> int:
    """Create a stable seed from donor_id (works for strings and numbers)."""
    return int(hashlib.sha256(str(donor_id).encode("utf-8")).hexdigest(), 16) % (2 ** 32)

def rarity_weight(bg: str) -> float:
    table = {
        "O+": 0.3, "A+": 0.35, "B+": 0.35, "AB+": 0.6,
        "O-": 0.7, "A-": 0.6, "B-": 0.6, "AB-": 0.9,
    }
    return table.get((bg or "").upper(), 0.4)

# -----------------------
# Base Endpoints
# -----------------------
@app.get("/")
async def root():
    return {"message": "BloodLinkAI Service", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat() + "Z"}

# -----------------------
# Predict Endpoint
# -----------------------
@app.post("/predict")
async def predict(data: dict):
    donor_id = data.get("donorId")
    blood_group = data.get("bloodGroup")
    units = data.get("units", 1)

    seed = seed_from_id(donor_id or "anonymous")
    rng = random.Random(seed)

    days_since = rng.randint(10, 160)
    streak = rng.randint(0, 5)

    score = 0.55
    score += 0.25 if (days_since > 90) else 0.0
    score += 0.10 if (streak >= 2) else 0.0
    score += 0.05 if (rarity_weight(blood_group) >= 0.6) else 0.0
    score -= 0.10 if (units >= 3) else 0.0
    score += 0.10
    score += rng.normalvariate(0, 0.08)

    prob = max(0.0, min(1.0, score))
    return {"donorId": donor_id, "availabilityscore": round(prob, 4)}

# -----------------------
# Dashboard API (Front-end expects these)
# -----------------------

# Donor model for /api/donors
class Donor(BaseModel):
    donorId: str
    name: str
    bloodGroup: str
    last_donation_days: int
    available: bool
    units_can_give: int
    rating: float

@app.get("/api/stats")
async def api_stats():
    """ Stats used by dashboard UI """
    return {
        "totalDonors": 3,
        "availableNow": 2,
        "requestsToday": 1,
        "lastUpdated": datetime.utcnow().isoformat() + "Z"
    }

@app.get("/api/donors", response_model=List[Donor])
async def api_donors():
    """ Sample donor list — replace with DB later """
    sample = [
        {"donorId": "d1", "name": "Alice",   "bloodGroup": "O-",  "last_donation_days": 120, "available": True,  "units_can_give": 2, "rating": 4.8},
        {"donorId": "d2", "name": "Bob",     "bloodGroup": "A+",  "last_donation_days": 40,  "available": True,  "units_can_give": 1, "rating": 4.2},
        {"donorId": "d3", "name": "Charlie", "bloodGroup": "AB+", "last_donation_days": 200, "available": False, "units_can_give": 3, "rating": 4.9},
    ]
    return sample

# -----------------------
# Run with python main.py
# -----------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)