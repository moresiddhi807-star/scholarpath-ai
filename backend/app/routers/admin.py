"""
Admin panel routes: full scholarship CRUD + user management.
Gated behind get_current_admin (role == admin).
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.core.deps import get_current_admin
from app.models.scholarship import Scholarship, ScholarshipRequirement
from app.models.user import User
from app.schemas.scholarship import ScholarshipCreate, ScholarshipOut, ScholarshipUpdate
from app.schemas.auth import UserResponse

router = APIRouter(prefix="/api/admin", tags=["admin"])


# ---------- Scholarships ----------

@router.get("/scholarships", response_model=list[ScholarshipOut])
def admin_list_scholarships(db: Session = Depends(get_db), _: User = Depends(get_current_admin)):
    return (
        db.query(Scholarship)
        .options(joinedload(Scholarship.requirements))
        .order_by(Scholarship.created_at.desc())
        .all()
    )


@router.post("/scholarships", response_model=ScholarshipOut, status_code=status.HTTP_201_CREATED)
def admin_create_scholarship(
    payload: ScholarshipCreate, db: Session = Depends(get_db), _: User = Depends(get_current_admin)
):
    data = payload.model_dump(exclude={"required_documents", "optional_documents"})
    scholarship = Scholarship(**data)
    db.add(scholarship)
    db.flush()

    for doc_type in payload.required_documents:
        db.add(ScholarshipRequirement(scholarship_id=scholarship.id, document_type=doc_type, is_mandatory=True))
    for doc_type in payload.optional_documents:
        db.add(ScholarshipRequirement(scholarship_id=scholarship.id, document_type=doc_type, is_mandatory=False))

    db.commit()
    db.refresh(scholarship)
    return scholarship


@router.put("/scholarships/{scholarship_id}", response_model=ScholarshipOut)
def admin_update_scholarship(
    scholarship_id: int,
    payload: ScholarshipUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    scholarship = db.query(Scholarship).filter(Scholarship.id == scholarship_id).first()
    if not scholarship:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Scholarship not found.")

    data = payload.model_dump(exclude_unset=True, exclude={"required_documents", "optional_documents"})
    for field, value in data.items():
        setattr(scholarship, field, value)

    if payload.required_documents is not None or payload.optional_documents is not None:
        db.query(ScholarshipRequirement).filter(ScholarshipRequirement.scholarship_id == scholarship.id).delete()
        for doc_type in payload.required_documents or []:
            db.add(ScholarshipRequirement(scholarship_id=scholarship.id, document_type=doc_type, is_mandatory=True))
        for doc_type in payload.optional_documents or []:
            db.add(ScholarshipRequirement(scholarship_id=scholarship.id, document_type=doc_type, is_mandatory=False))

    db.commit()
    db.refresh(scholarship)
    return scholarship


@router.delete("/scholarships/{scholarship_id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_scholarship(scholarship_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_admin)):
    scholarship = db.query(Scholarship).filter(Scholarship.id == scholarship_id).first()
    if not scholarship:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Scholarship not found.")
    db.delete(scholarship)
    db.commit()
    return None


# ---------- Users ----------

@router.get("/users", response_model=list[UserResponse])
def admin_list_users(db: Session = Depends(get_db), _: User = Depends(get_current_admin)):
    return db.query(User).order_by(User.created_at.desc()).all()


@router.patch("/users/{user_id}/deactivate", response_model=UserResponse)
def admin_deactivate_user(user_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_admin)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    user.is_active = False
    db.commit()
    db.refresh(user)
    return user


@router.patch("/users/{user_id}/activate", response_model=UserResponse)
def admin_activate_user(user_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_admin)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    user.is_active = True
    db.commit()
    db.refresh(user)
    return user
