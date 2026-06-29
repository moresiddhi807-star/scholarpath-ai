"""
Stores computed readiness score snapshots for a user (optionally scoped
to a specific scholarship, or a general profile-wide score).
"""
from sqlalchemy import BigInteger, DateTime, Float, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base


class ReadinessScore(Base):
    __tablename__ = "readiness_scores"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    scholarship_id: Mapped[int | None] = mapped_column(
        BigInteger, ForeignKey("scholarships.id", ondelete="SET NULL"), nullable=True, index=True
    )

    overall_score: Mapped[float] = mapped_column(Float, nullable=False)
    academic_score: Mapped[float] = mapped_column(Float, nullable=False)
    language_score: Mapped[float] = mapped_column(Float, nullable=False)
    experience_score: Mapped[float] = mapped_column(Float, nullable=False)
    documents_score: Mapped[float] = mapped_column(Float, nullable=False)

    strengths_json: Mapped[str] = mapped_column(Text, nullable=False)   # JSON-encoded list[str]
    weaknesses_json: Mapped[str] = mapped_column(Text, nullable=False)  # JSON-encoded list[str]
    suggestions_json: Mapped[str] = mapped_column(Text, nullable=False)  # JSON-encoded list[str]

    created_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="readiness_scores")
    scholarship = relationship("Scholarship")
