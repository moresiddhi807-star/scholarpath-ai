"""
FEATURE 1 — Scholarship Matching Engine.

Compares a user's profile against each scholarship's stated requirements
and produces a match percentage (0-100), an eligibility status, and a
list of human-readable gap reasons for anything that's missing or short.

The scoring model is a deliberately transparent weighted rubric rather
than a black box, so the "why" behind a match percentage is always
explainable to the student:

    Degree level fit........... hard gate   (must match, else 0% match)
    CGPA.......................... 30 points (full credit if >= requirement,
                                               partial credit on a sliding
                                               scale down to 0 at -1.5 CGPA)
    IELTS / language.............. 20 points (full credit if met, partial
                                               credit scaled down to 0 at -1.5 band)
    Research experience........... 20 points (only scored if the scholarship
                                               requires research)
    Work experience................ 15 points (only scored if required)
    Budget feasibility............. 15 points (only scored for partially
                                               funded scholarships with a
                                               stated program cost)

Points for criteria that don't apply to a given scholarship (e.g. a
scholarship with no research requirement) are redistributed proportionally
across the remaining applicable criteria so the max achievable is always 100.
"""
from __future__ import annotations

from dataclasses import dataclass, field

from app.models.scholarship import Scholarship
from app.models.user import User


@dataclass
class MatchResult:
    match_percentage: float
    eligibility_status: str  # "eligible" | "partially_eligible" | "not_eligible"
    gap_reasons: list[str] = field(default_factory=list)


def _degree_matches(user: User, scholarship: Scholarship) -> bool:
    if scholarship.degree_level.value == "any":
        return True
    if user.degree_level is None:
        return False
    return user.degree_level.value == scholarship.degree_level.value


def compute_match(user: User, scholarship: Scholarship) -> MatchResult:
    gap_reasons: list[str] = []

    # Hard gate: degree level must align (a scholarship for Master's
    # applicants isn't realistically a match for a PhD applicant, etc.)
    if not _degree_matches(user, scholarship):
        return MatchResult(
            match_percentage=0.0,
            eligibility_status="not_eligible",
            gap_reasons=[
                f"This scholarship is for {scholarship.degree_level.value.title()} students; "
                f"your profile is set to {(user.degree_level.value.title() if user.degree_level else 'not specified')}."
            ],
        )

    # Build the list of applicable criteria and their max weights
    criteria: list[tuple[str, float]] = [("cgpa", 30.0), ("language", 20.0)]
    if scholarship.requires_research:
        criteria.append(("research", 20.0))
    if scholarship.requires_work_experience:
        criteria.append(("work", 15.0))
    if scholarship.funding_type.value == "partially_funded" and scholarship.max_budget_usd:
        criteria.append(("budget", 15.0))

    total_weight = sum(w for _, w in criteria)
    scale = 100.0 / total_weight if total_weight else 1.0

    earned = 0.0

    # --- CGPA ---
    cgpa_weight = dict(criteria).get("cgpa", 0.0)
    if cgpa_weight:
        user_cgpa = user.current_cgpa or 0.0
        req_cgpa = scholarship.min_cgpa or 0.0
        if user_cgpa >= req_cgpa:
            earned += cgpa_weight
        else:
            deficit = req_cgpa - user_cgpa
            fraction = max(0.0, 1 - (deficit / 1.5))  # 0 credit once 1.5+ CGPA short
            earned += cgpa_weight * fraction
            gap_reasons.append(
                f"Your CGPA ({user_cgpa:.1f}) is below the minimum requirement of {req_cgpa:.1f}."
            )

    # --- Language (IELTS) ---
    lang_weight = dict(criteria).get("language", 0.0)
    if lang_weight:
        if scholarship.ielts_requirement:
            user_ielts = user.ielts_score or 0.0
            req_ielts = scholarship.ielts_requirement
            if user_ielts >= req_ielts:
                earned += lang_weight
            else:
                deficit = req_ielts - user_ielts
                fraction = max(0.0, 1 - (deficit / 1.5))
                earned += lang_weight * fraction
                if user.ielts_score is None:
                    gap_reasons.append(
                        f"No IELTS score on file (requires {req_ielts:.1f})."
                    )
                else:
                    gap_reasons.append(
                        f"Your IELTS score ({user_ielts:.1f}) is below the required {req_ielts:.1f}."
                    )
        else:
            # No language requirement stated — give full credit
            earned += lang_weight

    # --- Research ---
    research_weight = dict(criteria).get("research", 0.0)
    if research_weight:
        has_research = (user.research_experience_years or 0) > 0 or (user.research_publications or 0) > 0
        if has_research:
            # Scale partial credit by publications/years, capped at full weight
            strength = min(1.0, ((user.research_publications or 0) * 0.34) + ((user.research_experience_years or 0) * 0.2))
            earned += research_weight * max(0.3, strength)
        else:
            gap_reasons.append("This scholarship favors candidates with research experience or publications.")

    # --- Work experience ---
    work_weight = dict(criteria).get("work", 0.0)
    if work_weight:
        user_years = user.work_experience_years or 0
        req_years = scholarship.min_work_experience_years or 0
        if user_years >= req_years:
            earned += work_weight
        else:
            deficit = req_years - user_years
            fraction = max(0.0, 1 - (deficit / max(req_years, 1)))
            earned += work_weight * fraction
            gap_reasons.append(
                f"Requires {req_years:.0f}+ years of work experience; your profile shows {user_years:.1f}."
            )

    # --- Budget feasibility (partial funding only) ---
    budget_weight = dict(criteria).get("budget", 0.0)
    if budget_weight:
        user_budget = user.budget_usd or 0.0
        program_cost = scholarship.max_budget_usd or 0.0
        if user_budget >= program_cost:
            earned += budget_weight
        else:
            coverage = user_budget / program_cost if program_cost else 0
            earned += budget_weight * max(0.0, coverage)
            gap_reasons.append(
                "This scholarship is only partially funded — your stated budget may not "
                "fully cover the remaining program cost."
            )

    match_percentage = round(min(100.0, earned * scale), 1)

    if match_percentage >= 80:
        eligibility_status = "eligible"
    elif match_percentage >= 50:
        eligibility_status = "partially_eligible"
    else:
        eligibility_status = "not_eligible"

    return MatchResult(match_percentage=match_percentage, eligibility_status=eligibility_status, gap_reasons=gap_reasons)


def rank_scholarships(user: User, scholarships: list[Scholarship]) -> list[tuple[Scholarship, MatchResult]]:
    """Return scholarships paired with their match result, sorted best-first."""
    results = [(s, compute_match(user, s)) for s in scholarships]
    results.sort(key=lambda pair: pair[1].match_percentage, reverse=True)
    return results
