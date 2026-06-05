from enum import Enum

from pydantic import BaseModel, Field, field_validator


class IncomeBand(str, Enum):
    BELOW_2L = "<2L"
    BETWEEN_2_5L = "2-5L"
    BETWEEN_5_10L = "5-10L"
    ABOVE_10L = ">10L"


class ScoreRequest(BaseModel):
    land_area_acres: float = Field(..., gt=0)
    crop_type: str
    repayment_history_score: float = Field(..., ge=0, le=100)
    annual_income_band: IncomeBand

    @field_validator("crop_type")
    @classmethod
    def validate_crop_type(cls, value):
        if not value.strip():
            raise ValueError("crop_type cannot be empty")
        return value