from app.models import ScoreRequest


def calculate_score(payload: ScoreRequest):
    score = 50
    reasons = []

    if payload.repayment_history_score >= 80:
        score += 25
        reasons.append("good_repayment")
    elif payload.repayment_history_score < 40:
        score -= 15
        reasons.append("poor_repayment")
    else:
        reasons.append("average_repayment")

    if payload.land_area_acres < 5:
        reasons.append("small_landholding")
    else:
        score += 10
        reasons.append("large_landholding")

    income_scores = {
        "<2L": -5,
        "2-5L": 5,
        "5-10L": 10,
        ">10L": 15,
    }

    score += income_scores[payload.annual_income_band.value]

    income_reason = {
        "<2L": "low_income_band",
        "2-5L": "mid_income_band",
        "5-10L": "upper_mid_income_band",
        ">10L": "high_income_band",
    }

    reasons.append(
        income_reason[payload.annual_income_band.value]
    )

    score = max(0, min(score, 100))

    while len(reasons) < 3:
        reasons.append("neutral_factor")

    return score, reasons[:3]