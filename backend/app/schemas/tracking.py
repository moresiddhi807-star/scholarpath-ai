"""
Pydantic schemas for document tracking, readiness scoring, and roadmaps.
"""
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.scholarship import DocumentType


# ---------- Documents ----------

class UserDocumentUpsert(BaseModel):
    document_type: DocumentType
    is_available: bool = True
    file_name: str | None = None
    notes: str | None = None


class UserDocumentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True, use_enum_values=True)

    id: int
    document_type: DocumentType
    is_available: bool
    file_name: str | None = None
    notes: str | None = None
    updated_at: datetime


class DocumentGapItem(BaseModel):
    document_type: DocumentType
    label: str
    is_mandatory: bool
    available: bool


class DocumentGapReport(BaseModel):
    scholarship_id: int
    scholarship_name: str
    available: list[DocumentGapItem]
    missing: list[DocumentGapItem]
    completion_percentage: float


# ---------- Readiness ----------

class ReadinessScoreOut(BaseModel):
    model_config = ConfigDict(from_attributes=True, use_enum_values=True)

    id: int
    scholarship_id: int | None
    overall_score: float
    academic_score: float
    language_score: float
    experience_score: float
    documents_score: float
    strengths: list[str]
    weaknesses: list[str]
    suggestions: list[str]
    created_at: datetime


class ReadinessComputeRequest(BaseModel):
    scholarship_id: int | None = None


# ---------- Roadmap ----------

class RoadmapStepOut(BaseModel):
    model_config = ConfigDict(from_attributes=True, use_enum_values=True)

    id: int
    order_index: int
    title: str
    description: str
    estimated_days: int
    is_complete: bool


class RoadmapOut(BaseModel):
    model_config = ConfigDict(from_attributes=True, use_enum_values=True)

    id: int
    scholarship_id: int
    scholarship_name: str
    status: str
    total_estimated_days: int
    progress_percentage: float
    steps: list[RoadmapStepOut]
    created_at: datetime


class RoadmapGenerateRequest(BaseModel):
    scholarship_id: int


class RoadmapStepUpdate(BaseModel):
    is_complete: bool
