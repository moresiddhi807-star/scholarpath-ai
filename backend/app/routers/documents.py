"""
FEATURE 2 — Missing Document Detection routes.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.document import UserDocument
from app.models.scholarship import Scholarship
from app.models.user import User
from app.schemas.tracking import DocumentGapReport, UserDocumentOut, UserDocumentUpsert
from app.services.document_gap import compute_document_gap

router = APIRouter(prefix="/api/documents", tags=["documents"])


@router.get("", response_model=list[UserDocumentOut])
def list_my_documents(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(UserDocument).filter(UserDocument.user_id == current_user.id).all()


@router.put("", response_model=UserDocumentOut)
def upsert_document(
    payload: UserDocumentUpsert,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Mark a document type as available/unavailable (creates or updates)."""
    doc = (
        db.query(UserDocument)
        .filter(UserDocument.user_id == current_user.id, UserDocument.document_type == payload.document_type)
        .first()
    )
    if doc:
        doc.is_available = payload.is_available
        doc.file_name = payload.file_name
        doc.notes = payload.notes
    else:
        doc = UserDocument(
            user_id=current_user.id,
            document_type=payload.document_type,
            is_available=payload.is_available,
            file_name=payload.file_name,
            notes=payload.notes,
        )
        db.add(doc)

    db.commit()
    db.refresh(doc)
    return doc


@router.delete("/{document_type}", status_code=status.HTTP_204_NO_CONTENT)
def delete_document(document_type: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    doc = (
        db.query(UserDocument)
        .filter(UserDocument.user_id == current_user.id, UserDocument.document_type == document_type)
        .first()
    )
    if doc:
        db.delete(doc)
        db.commit()
    return None


@router.get("/gap/{scholarship_id}", response_model=DocumentGapReport)
def get_document_gap(scholarship_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    scholarship = (
        db.query(Scholarship)
        .options(joinedload(Scholarship.requirements))
        .filter(Scholarship.id == scholarship_id)
        .first()
    )
    if not scholarship:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Scholarship not found.")

    user_documents = db.query(UserDocument).filter(UserDocument.user_id == current_user.id).all()
    return compute_document_gap(scholarship, user_documents)
