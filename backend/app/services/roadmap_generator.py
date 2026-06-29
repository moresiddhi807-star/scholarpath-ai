"""
FEATURE 4 — Personalized Roadmap Generator.

Builds an ordered, time-estimated checklist of steps a user needs to
complete to be application-ready for a chosen scholarship, based on:
  - missing documents for that scholarship
  - profile gaps (e.g. no IELTS score yet, CGPA below requirement)
  - the scholarship's own deadline

Each step carries an estimated duration in days, used to project a
total preparation timeline (and surfaced in the UI as an animated
timeline with progress tracking).
"""
from __future__ import annotations

from dataclasses import dataclass

from app.models.scholarship import Scholarship
from app.models.user import User
from app.services.document_gap import compute_document_gap, document_label

# Estimated days to acquire each document type from scratch
DOCUMENT_DURATIONS: dict[str, int] = {
    "passport": 21,
    "sop": 10,
    "lor": 14,
    "resume": 3,
    "transcript": 7,
    "ielts_certificate": 45,
    "toefl_certificate": 30,
    "gre_scorecard": 60,
    "research_papers": 90,
    "financial_statement": 10,
    "passport_photo": 1,
    "recommendation_letter": 14,
    "portfolio": 14,
    "medical_certificate": 5,
    "language_proficiency": 30,
}


@dataclass
class RoadmapStepPlan:
    title: str
    description: str
    estimated_days: int


def generate_roadmap_steps(user: User, scholarship: Scholarship, user_documents: list) -> list[RoadmapStepPlan]:
    steps: list[RoadmapStepPlan] = []

    # 1. Profile gap steps first (things that take longest / block everything else)
    if scholarship.ielts_requirement and (not user.ielts_score or user.ielts_score < scholarship.ielts_requirement):
        steps.append(
            RoadmapStepPlan(
                title="Prepare for & take IELTS",
                description=(
                    f"Target a band score of {scholarship.ielts_requirement:.1f} or higher. "
                    "Book a test date and follow a structured 6-8 week prep plan."
                ),
                estimated_days=DOCUMENT_DURATIONS["ielts_certificate"],
            )
        )

    if scholarship.gre_requirement and not user.gre_score:
        steps.append(
            RoadmapStepPlan(
                title="Prepare for & take the GRE",
                description=f"Target a composite score of {scholarship.gre_requirement} or higher.",
                estimated_days=DOCUMENT_DURATIONS["gre_scorecard"],
            )
        )

    if scholarship.min_cgpa and (user.current_cgpa or 0) < scholarship.min_cgpa:
        steps.append(
            RoadmapStepPlan(
                title="Strengthen academic profile",
                description=(
                    "Your current CGPA is below this scholarship's typical benchmark. "
                    "Focus on raising grades this term, or prepare a strong SOP addressing the gap."
                ),
                estimated_days=30,
            )
        )

    if scholarship.requires_research and not (user.research_publications or user.research_experience_years):
        steps.append(
            RoadmapStepPlan(
                title="Gain research experience",
                description="Join a research project or aim to publish a short paper or technical article.",
                estimated_days=DOCUMENT_DURATIONS["research_papers"],
            )
        )

    # 2. Missing documents, ordered by typical acquisition time (fastest first
    #    builds momentum, except passport which should start early in parallel)
    doc_gap = compute_document_gap(scholarship, user_documents)
    missing_docs = sorted(doc_gap["missing"], key=lambda d: DOCUMENT_DURATIONS.get(d["document_type"], 7))

    for doc in missing_docs:
        doc_type = doc["document_type"]
        label = document_label(doc_type)
        duration = DOCUMENT_DURATIONS.get(doc_type, 7)

        descriptions = {
            "passport": "Apply for or renew your passport — start this early as it can take the longest.",
            "sop": "Write a compelling Statement of Purpose tailored to this scholarship's goals and values.",
            "lor": "Request Letters of Recommendation from professors or supervisors who know your work well.",
            "resume": "Build an academic CV / resume highlighting education, projects, and achievements.",
            "transcript": "Request an official academic transcript from your university registrar.",
            "financial_statement": "Prepare a bank statement or financial sponsorship letter as proof of funds.",
            "passport_photo": "Get passport-size photos taken to the scholarship's specification.",
            "recommendation_letter": "Secure an additional recommendation letter.",
            "portfolio": "Compile a portfolio showcasing relevant work or projects.",
            "medical_certificate": "Complete a medical examination and obtain the certificate.",
            "language_proficiency": "Obtain a language proficiency certificate as required by the program.",
        }

        steps.append(
            RoadmapStepPlan(
                title=f"Prepare: {label}",
                description=descriptions.get(doc_type, f"Prepare and organize your {label}."),
                estimated_days=duration,
            )
        )

    # 3. Final submission step
    steps.append(
        RoadmapStepPlan(
            title="Review & submit application",
            description=(
                f"Do a final review of all materials against {scholarship.name}'s checklist, "
                "then submit before the deadline."
            ),
            estimated_days=3,
        )
    )

    return steps
