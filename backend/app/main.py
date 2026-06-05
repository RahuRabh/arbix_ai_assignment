from datetime import datetime, timezone
from uuid import uuid4

from fastapi import FastAPI

from app.models import ScoreRequest
from app.scoring import calculate_score

app = FastAPI(
    title="Arbix AI Scoring Service",
    version="1.0.0"
)


@app.post("/score")
def score(payload: ScoreRequest):
    score_value, reasons = calculate_score(payload)

    return {
        "request_id": str(uuid4()),
        "score": score_value,
        "reason_codes": reasons,
        "timestamp": datetime.now(
            timezone.utc
        ).isoformat()
    }