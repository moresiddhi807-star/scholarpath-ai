"""
Aggregated dashboard data: top matches, readiness snapshot, missing
documents summary, upcoming deadlines, and roadmap progress — all in
one call so the dashboard loads fast.
"""
import json
from datetime import date, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.document import UserDocument
from app.models.readiness import ReadinessScore
from app.models.roadmap import Roadmap
from app.models.scholarship import Scholarship
from app.models.user import User
from app.services.matching_engine import rank_scholarships

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("/summary")
def dashboard_summary(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Top scholarship matches
    scholarships = (
        db.query(Scholarship)
        .options(joinedload(Scholarship.requirements))
        .filter(Scholarship.is_active.is_(True))
        .all()
    )
    ranked = rank_scholarships(current_user, scholarships)[:5]
    top_matches = [
        {
            "id": s.id,
            "name": s.name,
            "country": s.country,
            "funding_type": s.funding_type.value,
            "match_percentage": m.match_percentage,
            "eligibility_status": m.eligibility_status,
            "deadline": s.deadline.isoformat() if s.deadline else None,
        }
        for s, m in ranked
    ]

    # Latest general readiness score
    latest_readiness = (
        db.query(ReadinessScore)
        .filter(ReadinessScore.user_id == current_user.id, ReadinessScore.scholarship_id.is_(None))
        .order_by(ReadinessScore.created_at.desc())
        .first()
    )
    readiness_payload = None
    if latest_readiness:
        readiness_payload = {
            "overall_score": latest_readiness.overall_score,
            "academic_score": latest_readiness.academic_score,
            "language_score": latest_readiness.language_score,
            "experience_score": latest_readiness.experience_score,
            "documents_score": latest_readiness.documents_score,
            "strengths": json.loads(latest_readiness.strengths_json),
            "weaknesses": json.loads(latest_readiness.weaknesses_json),
            "suggestions": json.loads(latest_readiness.suggestions_json),
        }

    # Documents on file
    user_docs = db.query(UserDocument).filter(UserDocument.user_id == current_user.id).all()
    docs_available = sum(1 for d in user_docs if d.is_available)

    # Upcoming deadlines among top matches (within 180 days)
    cutoff = date.today() + timedelta(days=180)
    upcoming_deadlines = [
        {"id": s.id, "name": s.name, "deadline": s.deadline.isoformat(), "country": s.country}
        for s, _ in ranked
        if s.deadline and date.today() <= s.deadline <= cutoff
    ]
    upcoming_deadlines.sort(key=lambda d: d["deadline"])

    # Roadmap progress
    roadmaps = (
        db.query(Roadmap)
        .options(joinedload(Roadmap.steps), joinedload(Roadmap.scholarship))
        .filter(Roadmap.user_id == current_user.id)
        .order_by(Roadmap.created_at.desc())
        .all()
    )
    roadmap_summaries = []
    for r in roadmaps:
        total = len(r.steps)
        completed = sum(1 for s in r.steps if s.is_complete)
        roadmap_summaries.append(
            {
                "id": r.id,
                "scholarship_id": r.scholarship_id,
                "scholarship_name": r.scholarship.name,
                "progress_percentage": round((completed / total) * 100, 1) if total else 0,
                "total_steps": total,
                "completed_steps": completed,
            }
        )

    return {
        "top_matches": top_matches,
        "readiness": readiness_payload,
        "documents_available_count": docs_available,
        "upcoming_deadlines": upcoming_deadlines,
        "roadmaps": roadmap_summaries,
        "onboarding_complete": current_user.onboarding_complete,
    }
