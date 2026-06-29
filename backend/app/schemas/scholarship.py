"""
Pydantic schemas for scholarships, requirements, and matching results.
"""
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.scholarship import DegreeLevel, DocumentType, FundingType


class ScholarshipRequirementOut(BaseModel):
    model_config = ConfigDict(from_attributes=True, use_enum_values=True)

    id: int
    document_type: DocumentType
    is_mandatory: bool
    notes: str | None = None


class ScholarshipBase(BaseModel):
    name: str = Field(max_length=200)
    country: str = Field(max_length=100)
    funding_type: FundingType
    degree_level: DegreeLevel
    min_cgpa: float = Field(ge=0, le=10, default=0)
    ielts_requirement: float | None = Field(default=None, ge=0, le=9)
    toefl_requirement: int | None = Field(default=None, ge=0, le=120)
    gre_requirement: int | None = Field(default=None, ge=0, le=340)
    requires_research: bool = False
    requires_work_experience: bool = False
    min_work_experience_years: float = 0
    deadline: date | None = None
    benefits: str
    description: str
    official_link: str | None = None
    max_budget_usd: float | None = None
    is_active: bool = True


class ScholarshipCreate(ScholarshipBase):
    required_documents: list[DocumentType] = Field(default_factory=list)
    optional_documents: list[DocumentType] = Field(default_factory=list)


class ScholarshipUpdate(BaseModel):
    name: str | None = None
    country: str | None = None
    funding_type: FundingType | None = None
    degree_level: DegreeLevel | None = None
    min_cgpa: float | None = None
    ielts_requirement: float | None = None
    toefl_requirement: int | None = None
    gre_requirement: int | None = None
    requires_research: bool | None = None
    requires_work_experience: bool | None = None
    min_work_experience_years: float | None = None
    deadline: date | None = None
    benefits: str | None = None
    description: str | None = None
    official_link: str | None = None
    max_budget_usd: float | None = None
    is_active: bool | None = None
    required_documents: list[DocumentType] | None = None
    optional_documents: list[DocumentType] | None = None


class ScholarshipOut(ScholarshipBase):
    model_config = ConfigDict(from_attributes=True, use_enum_values=True)

    id: int
    requirements: list[ScholarshipRequirementOut] = []
    created_at: datetime


class ScholarshipMatchOut(BaseModel):
    """A scholarship enriched with this user's match percentage & eligibility."""

    model_config = ConfigDict(from_attributes=True, use_enum_values=True)

    id: int
    name: str
    country: str
    funding_type: FundingType
    degree_level: DegreeLevel
    min_cgpa: float
    ielts_requirement: float | None
    deadline: date | None
    benefits: str
    description: str
    official_link: str | None
    match_percentage: float
    eligibility_status: str  # "eligible" | "partially_eligible" | "not_eligible"
    gap_reasons: list[str] = []
