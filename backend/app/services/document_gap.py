"""
FEATURE 2 — Missing Document Detection.

Compares a scholarship's required documents against the documents a
user has marked as available, and reports what's present, what's
missing, and an overall completion percentage.
"""
from __future__ import annotations

from app.models.scholarship import DocumentType, Scholarship
from app.models.user import User

DOCUMENT_LABELS: dict[str, str] = {
    "passport": "Passport",
    "sop": "Statement of Purpose (SOP)",
    "lor": "Letter of Recommendation (LOR)",
    "resume": "Resume / CV",
    "transcript": "Academic Transcript",
    "ielts_certificate": "IELTS Certificate",
    "toefl_certificate": "TOEFL Certificate",
    "gre_scorecard": "GRE Scorecard",
    "research_papers": "Research Papers / Publications",
    "financial_statement": "Financial Statement",
    "passport_photo": "Passport-size Photo",
    "recommendation_letter": "Additional Recommendation Letter",
    "portfolio": "Portfolio",
    "medical_certificate": "Medical Certificate",
    "language_proficiency": "Language Proficiency Certificate",
}


def document_label(doc_type: DocumentType | str) -> str:
    key = doc_type.value if isinstance(doc_type, DocumentType) else doc_type
    return DOCUMENT_LABELS.get(key, key.replace("_", " ").title())


def compute_document_gap(scholarship: Scholarship, user_documents: list) -> dict:
    """
    Returns a dict with available/missing document lists and a completion %.
    `user_documents` is a list of UserDocument ORM rows for this user.
    """
    available_types = {
        d.document_type.value if hasattr(d.document_type, "value") else d.document_type
        for d in user_documents
        if d.is_available
    }

    available: list[dict] = []
    missing: list[dict] = []

    for req in scholarship.requirements:
        doc_key = req.document_type.value if hasattr(req.document_type, "value") else req.document_type
        item = {
            "document_type": doc_key,
            "label": document_label(doc_key),
            "is_mandatory": req.is_mandatory,
        }
        if doc_key in available_types:
            item["available"] = True
            available.append(item)
        else:
            item["available"] = False
            missing.append(item)

    total = len(scholarship.requirements)
    completion_percentage = round((len(available) / total) * 100, 1) if total else 100.0

    return {
        "scholarship_id": scholarship.id,
        "scholarship_name": scholarship.name,
        "available": available,
        "missing": missing,
        "completion_percentage": completion_percentage,
    }
