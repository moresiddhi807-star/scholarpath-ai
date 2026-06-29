"""
FEATURE 3 — Scholarship Readiness Score routes.
"""
import json

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.document import UserDocument
from app.models.readiness import ReadinessScore
from app.models.scholarship import Scholarship
from app.models.user import User
from app.schemas.tracking import ReadinessComputeRequest, ReadinessScoreOut
from app.services.readiness_engine import compute_readiness

router = APIRouter(prefix="/api/readiness", tags=["readiness"])


def _to_out(row: ReadinessScore) -> ReadinessScoreOut:
    return ReadinessScoreOut(
        id=row.id,
        scholarship_id=row.scholarship_id,
        overall_score=row.overall_score,
        academic_score=row.academic_score,
        language_score=row.language_score,
        experience_score=row.experience_score,
        documents_score=row.documents_score,
        strengths=json.loads(row.strengths_json),
        weaknesses=json.loads(row.weaknesses_json),
        suggestions=json.loads(row.suggestions_json),
        created_at=row.created_at,
    )


@router.post("/compute", response_model=ReadinessScoreOut)
def compute_my_readiness(
    payload: ReadinessComputeRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    scholarship = None
    if payload.scholarship_id:
        scholarship = (
            db.query(Scholarship)
            .options(joinedload(Scholarship.requirements))
            .filter(Scholarship.id == payload.scholarship_id)
            .first()
        )
        if not scholarship:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Scholarship not found.")

    user_documents = db.query(UserDocument).filter(UserDocument.user_id == current_user.id).all()
    result = compute_readiness(current_user, user_documents, scholarship)

    row = ReadinessScore(
        user_id=current_user.id,
        scholarship_id=scholarship.id if scholarship else None,
        overall_score=result.overall_score,
        academic_score=result.academic_score,
        language_score=result.language_score,
        experience_score=result.experience_score,
        documents_score=result.documents_score,
        strengths_json=json.dumps(result.strengths),
        weaknesses_json=json.dumps(result.weaknesses),
        suggestions_json=json.dumps(result.suggestions),
    )
    db.add(row)
    db.commit()
    db.refresh(row)

    return _to_out(row)


@router.get("/latest", response_model=ReadinessScoreOut | None)
def get_latest_readiness(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    scholarship_id: int | None = None,
):
    query = db.query(ReadinessScore).filter(ReadinessScore.user_id == current_user.id)
    if scholarship_id:
        query = query.filter(ReadinessScore.scholarship_id == scholarship_id)
    else:
        query = query.filter(ReadinessScore.scholarship_id.is_(None))

    row = query.order_by(ReadinessScore.created_at.desc()).first()
    return _to_out(row) if row else None


@router.get("/history", response_model=list[ReadinessScoreOut])
def get_readiness_history(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    rows = (
        db.query(ReadinessScore)
        .filter(ReadinessScore.user_id == current_user.id)
        .order_by(ReadinessScore.created_at.desc())
        .limit(30)
        .all()
    )
    return [_to_out(r) for r in rows]
