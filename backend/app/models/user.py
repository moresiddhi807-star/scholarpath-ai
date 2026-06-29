"""
User model: account credentials + full onboarding profile used by the
matching, readiness, and roadmap engines.
"""
import enum

from sqlalchemy import (
    BigInteger,
    Boolean,
    DateTime,
    Enum,
    Float,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base


class UserRole(str, enum.Enum):
    student = "student"
    admin = "admin"


class DegreeLevel(str, enum.Enum):
    undergraduate = "undergraduate"
    masters = "masters"
    phd = "phd"
    postdoc = "postdoc"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)

    # Auth
    full_name: Mapped[str] = mapped_column(String(150), nullable=False)
    email: Mapped[str] = mapped_column(String(190), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), default=UserRole.student, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    onboarding_complete: Mapped[bool] = mapped_column(Boolean, default=False)

    # Academic profile
    degree_level: Mapped[DegreeLevel | None] = mapped_column(Enum(DegreeLevel), nullable=True)
    branch: Mapped[str | None] = mapped_column(String(150), nullable=True)
    current_cgpa: Mapped[float | None] = mapped_column(Float, nullable=True)  # on a 10.0 scale
    graduation_year: Mapped[int | None] = mapped_column(Integer, nullable=True)

    # Preferences
    country_preference: Mapped[str | None] = mapped_column(String(100), nullable=True)
    budget_usd: Mapped[float | None] = mapped_column(Float, nullable=True)

    # Test scores
    ielts_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    toefl_score: Mapped[int | None] = mapped_column(Integer, nullable=True)
    gre_score: Mapped[int | None] = mapped_column(Integer, nullable=True)

    # Experience (years / counts, used as inputs to readiness scoring)
    work_experience_years: Mapped[float | None] = mapped_column(Float, default=0)
    research_experience_years: Mapped[float | None] = mapped_column(Float, default=0)
    research_publications: Mapped[int | None] = mapped_column(Integer, default=0)
    certifications_count: Mapped[int | None] = mapped_column(Integer, default=0)
    extracurricular_activities: Mapped[str | None] = mapped_column(Text, nullable=True)

    created_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped["DateTime"] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Relationships
    documents = relationship("UserDocument", back_populates="user", cascade="all, delete-orphan")
    readiness_scores = relationship("ReadinessScore", back_populates="user", cascade="all, delete-orphan")
    roadmaps = relationship("Roadmap", back_populates="user", cascade="all, delete-orphan")
