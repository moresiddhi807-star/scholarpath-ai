"""
FEATURE 4 — Personalized Roadmap Generator routes.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.document import UserDocument
from app.models.roadmap import Roadmap, RoadmapStep
from app.models.scholarship import Scholarship
from app.models.user import User
from app.schemas.tracking import RoadmapGenerateRequest, RoadmapOut, RoadmapStepUpdate
from app.services.roadmap_generator import generate_roadmap_steps

router = APIRouter(prefix="/api/roadmaps", tags=["roadmaps"])


def _to_out(roadmap: Roadmap) -> RoadmapOut:
    total_days = sum(s.estimated_days for s in roadmap.steps)
    completed = sum(1 for s in roadmap.steps if s.is_complete)
    progress = round((completed / len(roadmap.steps)) * 100, 1) if roadmap.steps else 0.0

    return RoadmapOut(
        id=roadmap.id,
        scholarship_id=roadmap.scholarship_id,
        scholarship_name=roadmap.scholarship.name,
        status=roadmap.status.value,
        total_estimated_days=total_days,
        progress_percentage=progress,
        steps=roadmap.steps,
        created_at=roadmap.created_at,
    )


@router.post("/generate", response_model=RoadmapOut, status_code=status.HTTP_201_CREATED)
def generate_roadmap(
    payload: RoadmapGenerateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    scholarship = (
        db.query(Scholarship)
        .options(joinedload(Scholarship.requirements))
        .filter(Scholarship.id == payload.scholarship_id)
        .first()
    )
    if not scholarship:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Scholarship not found.")

    # Replace any existing roadmap for this scholarship so re-generating is safe
    existing = (
        db.query(Roadmap)
        .filter(Roadmap.user_id == current_user.id, Roadmap.scholarship_id == scholarship.id)
        .first()
    )
    if existing:
        db.delete(existing)
        db.flush()

    user_documents = db.query(UserDocument).filter(UserDocument.user_id == current_user.id).all()
    step_plans = generate_roadmap_steps(current_user, scholarship, user_documents)

    roadmap = Roadmap(user_id=current_user.id, scholarship_id=scholarship.id)
    db.add(roadmap)
    db.flush()

    for idx, plan in enumerate(step_plans):
        db.add(
            RoadmapStep(
                roadmap_id=roadmap.id,
                order_index=idx,
                title=plan.title,
                description=plan.description,
                estimated_days=plan.estimated_days,
            )
        )

    db.commit()
    db.refresh(roadmap)
    return _to_out(roadmap)


@router.get("", response_model=list[RoadmapOut])
def list_my_roadmaps(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    roadmaps = (
        db.query(Roadmap)
        .options(joinedload(Roadmap.steps), joinedload(Roadmap.scholarship))
        .filter(Roadmap.user_id == current_user.id)
        .order_by(Roadmap.created_at.desc())
        .all()
    )
    return [_to_out(r) for r in roadmaps]


@router.get("/{roadmap_id}", response_model=RoadmapOut)
def get_roadmap(roadmap_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    roadmap = (
        db.query(Roadmap)
        .options(joinedload(Roadmap.steps), joinedload(Roadmap.scholarship))
        .filter(Roadmap.id == roadmap_id, Roadmap.user_id == current_user.id)
        .first()
    )
    if not roadmap:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Roadmap not found.")
    return _to_out(roadmap)


@router.patch("/steps/{step_id}", response_model=RoadmapOut)
def update_step(
    step_id: int,
    payload: RoadmapStepUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    step = (
        db.query(RoadmapStep)
        .join(Roadmap, Roadmap.id == RoadmapStep.roadmap_id)
        .filter(RoadmapStep.id == step_id, Roadmap.user_id == current_user.id)
        .first()
    )
    if not step:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Roadmap step not found.")

    step.is_complete = payload.is_complete
    db.commit()

    roadmap = (
        db.query(Roadmap)
        .options(joinedload(Roadmap.steps), joinedload(Roadmap.scholarship))
        .filter(Roadmap.id == step.roadmap_id)
        .first()
    )
    return _to_out(roadmap)
