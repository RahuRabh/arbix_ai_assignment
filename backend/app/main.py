from datetime import datetime, timezone
from uuid import uuid4

from fastapi import FastAPI

from app.models import ScoreRequest
from app.scoring import calculate_score
from app.logging_config import logger

app = FastAPI(
    title="Arbix AI Scoring Service",
    version="1.0.0"
)

@app.get("/")
def health():
    return {"status": "healthy"}

@app.post("/score")
def score(payload: ScoreRequest):
    request_id = str(uuid4())

    score_value, reasons = calculate_score(payload)

    response = {
        "request_id": request_id,
        "score": score_value,
        "reason_codes": reasons,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }

    logger.info(
        {
            "request_id": request_id,
            "land_area_acres": payload.land_area_acres,
            "crop_type": payload.crop_type,
            "annual_income_band": payload.annual_income_band.value,
            "score": score_value,
            "reason_codes": reasons,
        }
    )

    return response