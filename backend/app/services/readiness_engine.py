"""
FEATURE 3 — Scholarship Readiness Score (the platform's main USP).

Produces a 0-100 readiness score broken into four sub-scores
(academic, language, experience, documents), plus plain-language
strengths, weaknesses, and improvement suggestions.

If a `scholarship` is provided the score is computed relative to that
scholarship's specific requirements (and its required-document list).
If not, a general-purpose score is computed using sensible global
benchmarks, and a generic, commonly-required document checklist
(passport, SOP, LOR, resume, transcript, IELTS) is used instead.
"""
from __future__ import annotations

from dataclasses import dataclass, field

from app.models.scholarship import Scholarship
from app.models.user import User
from app.services.document_gap import compute_document_gap, document_label

GENERIC_REQUIRED_DOCS = ["passport", "sop", "lor", "resume", "transcript", "ielts_certificate"]

# Global benchmark used when no specific scholarship is selected
BENCHMARK_CGPA = 8.5
BENCHMARK_IELTS = 7.0


@dataclass
class ReadinessResult:
    overall_score: float
    academic_score: float
    language_score: float
    experience_score: float
    documents_score: float
    strengths: list[str] = field(default_factory=list)
    weaknesses: list[str] = field(default_factory=list)
    suggestions: list[str] = field(default_factory=list)


class _GenericDoc:
    """Lightweight stand-in for a ScholarshipRequirement when scoring generically."""
    def __init__(self, document_type: str, is_mandatory: bool = True):
        self.document_type = document_type
        self.is_mandatory = is_mandatory


class _GenericScholarship:
    def __init__(self):
        self.id = None
        self.name = "General Profile"
        self.requirements = [_GenericDoc(d) for d in GENERIC_REQUIRED_DOCS]


def compute_readiness(user: User, user_documents: list, scholarship: Scholarship | None = None) -> ReadinessResult:
    strengths: list[str] = []
    weaknesses: list[str] = []
    suggestions: list[str] = []

    target_cgpa = scholarship.min_cgpa if scholarship and scholarship.min_cgpa else BENCHMARK_CGPA
    target_ielts = scholarship.ielts_requirement if scholarship and scholarship.ielts_requirement else BENCHMARK_IELTS

    # --- Academic sub-score (0-100) ---
    user_cgpa = user.current_cgpa or 0.0
    academic_score = min(100.0, (user_cgpa / target_cgpa) * 100) if target_cgpa else 100.0
    if user_cgpa >= target_cgpa:
        strengths.append(f"Strong academic record (CGPA {user_cgpa:.1f}, meets/exceeds the {target_cgpa:.1f} benchmark).")
    elif user_cgpa >= target_cgpa - 0.5:
        weaknesses.append(f"CGPA ({user_cgpa:.1f}) is just below the typical benchmark of {target_cgpa:.1f}.")
        suggestions.append("Highlight strong coursework or projects to offset a slightly lower CGPA.")
    else:
        weaknesses.append(f"CGPA ({user_cgpa:.1f}) is notably below the typical benchmark of {target_cgpa:.1f}.")
        suggestions.append("Consider scholarships with more flexible CGPA requirements, or strengthen your SOP to address this.")

    # --- Language sub-score (0-100) ---
    if user.ielts_score:
        language_score = min(100.0, (user.ielts_score / target_ielts) * 100) if target_ielts else 100.0
        if user.ielts_score >= target_ielts:
            strengths.append(f"IELTS score ({user.ielts_score:.1f}) meets the benchmark.")
        else:
            weaknesses.append(f"IELTS score ({user.ielts_score:.1f}) is below the typical {target_ielts:.1f} benchmark.")
            suggestions.append("Retake IELTS focusing on your weaker bands to push your overall score up.")
    elif user.toefl_score:
        # Rough TOEFL-to-IELTS equivalence for scoring purposes only
        equivalent_ielts = min(9.0, user.toefl_score / 13.3)
        language_score = min(100.0, (equivalent_ielts / target_ielts) * 100) if target_ielts else 100.0
        strengths.append(f"TOEFL score on file ({user.toefl_score}).")
    else:
        language_score = 0.0
        weaknesses.append("No IELTS or TOEFL score on file.")
        suggestions.append("Complete IELTS or TOEFL — most scholarships require an English proficiency score.")

    # --- Experience sub-score (0-100): research + work + certifications ---
    research_pts = min(40.0, (user.research_publications or 0) * 15 + (user.research_experience_years or 0) * 8)
    work_pts = min(30.0, (user.work_experience_years or 0) * 10)
    cert_pts = min(30.0, (user.certifications_count or 0) * 7)
    experience_score = min(100.0, research_pts + work_pts + cert_pts)

    if (user.research_publications or 0) > 0:
        strengths.append(f"{user.research_publications} research publication(s) on record.")
    else:
        weaknesses.append("No research publications on record.")
        suggestions.append("Publish a research paper or technical article to strengthen competitive applications.")

    if (user.certifications_count or 0) >= 2:
        strengths.append(f"{user.certifications_count} certifications add credibility to your profile.")
    elif (user.certifications_count or 0) == 0:
        weaknesses.append("No certifications listed.")
        suggestions.append("Add relevant certifications (online courses, technical credentials) to round out your profile.")

    if (user.work_experience_years or 0) >= 1:
        strengths.append(f"{user.work_experience_years:.1f} years of work experience.")

    # --- Documents sub-score ---
    target_scholarship = scholarship if scholarship else _GenericScholarship()
    doc_gap = compute_document_gap(target_scholarship, user_documents)
    documents_score = doc_gap["completion_percentage"]

    if doc_gap["missing"]:
        missing_labels = ", ".join(m["label"] for m in doc_gap["missing"][:4])
        weaknesses.append(f"Missing documents: {missing_labels}.")
        for m in doc_gap["missing"][:3]:
            suggestions.append(f"Prepare your {m['label']}.")
    else:
        strengths.append("All required documents are marked available.")

    # --- Overall weighted score ---
    overall_score = round(
        academic_score * 0.30 + language_score * 0.25 + experience_score * 0.20 + documents_score * 0.25, 1
    )

    return ReadinessResult(
        overall_score=overall_score,
        academic_score=round(academic_score, 1),
        language_score=round(language_score, 1),
        experience_score=round(experience_score, 1),
        documents_score=round(documents_score, 1),
        strengths=strengths[:6],
        weaknesses=weaknesses[:6],
        suggestions=suggestions[:6],
    )
