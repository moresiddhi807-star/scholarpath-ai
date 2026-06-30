"""
Scholarship listing, detail, and FEATURE 1 — match results for the
current user.
"""
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.scholarship import Scholarship
from app.models.user import User
from app.schemas.scholarship import ScholarshipMatchOut, ScholarshipOut
from app.services.matching_engine import compute_match, rank_scholarships

router = APIRouter(prefix="/api/scholarships", tags=["scholarships"])


@router.get("", response_model=list[ScholarshipOut])
def list_scholarships(
    db: Session = Depends(get_db),
    country: str | None = None,
    funding_type: str | None = None,
    degree_level: str | None = None,
    search: str | None = None,
    limit: int = Query(default=100, le=300),
    offset: int = 0,
):
    query = db.query(Scholarship).options(
    joinedload(Scholarship.requirements)
)

    if country:
        query = query.filter(Scholarship.country == country)
    if funding_type:
        query = query.filter(Scholarship.funding_type == funding_type)
    if degree_level:
        query = query.filter(Scholarship.degree_level == degree_level)
    if search:
        like = f"%{search}%"
        query = query.filter(Scholarship.name.ilike(like))

    return query.order_by(Scholarship.name).offset(offset).limit(limit).all()


@router.get("/countries", response_model=list[str])
def list_countries(db: Session = Depends(get_db)):
    rows = db.query(Scholarship.country).filter(Scholarship.is_active.is_(True)).distinct().order_by(Scholarship.country).all()
    return [r[0] for r in rows]


@router.get("/matches", response_model=list[ScholarshipMatchOut])
def get_matches(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    limit: int = Query(default=50, le=200),
):
    """FEATURE 1 — ranked scholarship matches for the logged-in user."""
    scholarships = (
        db.query(Scholarship)
        .options(joinedload(Scholarship.requirements))
        .filter(Scholarship.is_active.is_(True))
        .all()
    )
    ranked = rank_scholarships(current_user, scholarships)[:limit]

    return [
        ScholarshipMatchOut(
            id=s.id,
            name=s.name,
            country=s.country,
            funding_type=s.funding_type,
            degree_level=s.degree_level,
            min_cgpa=s.min_cgpa,
            ielts_requirement=s.ielts_requirement,
            deadline=s.deadline,
            benefits=s.benefits,
            description=s.description,
            official_link=s.official_link,
            match_percentage=match.match_percentage,
            eligibility_status=match.eligibility_status,
            gap_reasons=match.gap_reasons,
        )
        for s, match in ranked
    ]


@router.get("/{scholarship_id}", response_model=ScholarshipOut)
def get_scholarship(scholarship_id: int, db: Session = Depends(get_db)):
    scholarship = (
        db.query(Scholarship)
        .options(joinedload(Scholarship.requirements))
        .filter(Scholarship.id == scholarship_id)
        .first()
    )
    if not scholarship:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Scholarship not found.")
    return scholarship


@router.get("/{scholarship_id}/match", response_model=ScholarshipMatchOut)
def get_single_match(
    scholarship_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    scholarship = (
        db.query(Scholarship)
        .options(joinedload(Scholarship.requirements))
        .filter(Scholarship.id == scholarship_id)
        .first()
    )
    if not scholarship:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Scholarship not found.")

    match = compute_match(current_user, scholarship)
    return ScholarshipMatchOut(
        id=scholarship.id,
        name=scholarship.name,
        country=scholarship.country,
        funding_type=scholarship.funding_type,
        degree_level=scholarship.degree_level,
        min_cgpa=scholarship.min_cgpa,
        ielts_requirement=scholarship.ielts_requirement,
        deadline=scholarship.deadline,
        benefits=scholarship.benefits,
        description=scholarship.description,
        official_link=scholarship.official_link,
        match_percentage=match.match_percentage,
        eligibility_status=match.eligibility_status,
        gap_reasons=match.gap_reasons,
    )
