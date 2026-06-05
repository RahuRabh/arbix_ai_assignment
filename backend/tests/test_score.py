from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_score_success():
    response = client.post(
        "/score",
        json={
            "land_area_acres": 5,
            "crop_type": "Rice",
            "repayment_history_score": 85,
            "annual_income_band": "5-10L",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert "request_id" in data
    assert "score" in data
    assert "reason_codes" in data
    assert len(data["reason_codes"]) == 3


def test_invalid_repayment_score():
    response = client.post(
        "/score",
        json={
            "land_area_acres": 5,
            "crop_type": "Rice",
            "repayment_history_score": 150,
            "annual_income_band": "5-10L",
        },
    )

    assert response.status_code == 422