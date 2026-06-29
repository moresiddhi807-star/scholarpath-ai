"""
Scholarship catalog + per-scholarship required documents.
"""
import enum

from sqlalchemy import (
    BigInteger,
    Boolean,
    Date,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base


class FundingType(str, enum.Enum):
    fully_funded = "fully_funded"
    partially_funded = "partially_funded"


class DegreeLevel(str, enum.Enum):
    undergraduate = "undergraduate"
    masters = "masters"
    phd = "phd"
    postdoc = "postdoc"
    any = "any"


class Scholarship(Base):
    __tablename__ = "scholarships"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)

    name: Mapped[str] = mapped_column(String(200), nullable=False)
    country: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    funding_type: Mapped[FundingType] = mapped_column(Enum(FundingType), nullable=False, index=True)
    degree_level: Mapped[DegreeLevel] = mapped_column(Enum(DegreeLevel), nullable=False, index=True)

    min_cgpa: Mapped[float] = mapped_column(Float, default=0)  # on a 10.0 scale
    ielts_requirement: Mapped[float | None] = mapped_column(Float, nullable=True)
    toefl_requirement: Mapped[int | None] = mapped_column(Integer, nullable=True)
    gre_requirement: Mapped[int | None] = mapped_column(Integer, nullable=True)
    requires_research: Mapped[bool] = mapped_column(Boolean, default=False)
    requires_work_experience: Mapped[bool] = mapped_column(Boolean, default=False)
    min_work_experience_years: Mapped[float] = mapped_column(Float, default=0)

    deadline: Mapped["Date"] = mapped_column(Date, nullable=True)
    benefits: Mapped[str] = mapped_column(Text, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    official_link: Mapped[str | None] = mapped_column(String(500), nullable=True)
    max_budget_usd: Mapped[float | None] = mapped_column(
        Float, nullable=True, comment="Approx total program cost; used to match against user budget for partial-funding gap"
    )

    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    created_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped["DateTime"] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    requirements = relationship(
        "ScholarshipRequirement", back_populates="scholarship", cascade="all, delete-orphan"
    )
    roadmaps = relationship("Roadmap", back_populates="scholarship")


class DocumentType(str, enum.Enum):
    passport = "passport"
    sop = "sop"
    lor = "lor"
    resume = "resume"
    transcript = "transcript"
    ielts_certificate = "ielts_certificate"
    toefl_certificate = "toefl_certificate"
    gre_scorecard = "gre_scorecard"
    research_papers = "research_papers"
    financial_statement = "financial_statement"
    passport_photo = "passport_photo"
    recommendation_letter = "recommendation_letter"
    portfolio = "portfolio"
    medical_certificate = "medical_certificate"
    language_proficiency = "language_proficiency"


class ScholarshipRequirement(Base):
    """A single required document for a given scholarship (many-to-one)."""

    __tablename__ = "scholarship_requirements"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    scholarship_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey("scholarships.id", ondelete="CASCADE"), nullable=False, index=True
    )
    document_type: Mapped[DocumentType] = mapped_column(Enum(DocumentType), nullable=False)
    is_mandatory: Mapped[bool] = mapped_column(Boolean, default=True)
    notes: Mapped[str | None] = mapped_column(String(255), nullable=True)

    scholarship = relationship("Scholarship", back_populates="requirements")
