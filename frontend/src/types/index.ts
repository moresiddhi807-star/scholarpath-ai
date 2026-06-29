// Core domain types mirroring the FastAPI Pydantic schemas.

export type DegreeLevel = "undergraduate" | "masters" | "phd" | "postdoc";
export type DegreeLevelOrAny = DegreeLevel | "any";
export type FundingType = "fully_funded" | "partially_funded";
export type EligibilityStatus = "eligible" | "partially_eligible" | "not_eligible";
export type UserRole = "student" | "admin";

export type DocumentType =
  | "passport"
  | "sop"
  | "lor"
  | "resume"
  | "transcript"
  | "ielts_certificate"
  | "toefl_certificate"
  | "gre_scorecard"
  | "research_papers"
  | "financial_statement"
  | "passport_photo"
  | "recommendation_letter"
  | "portfolio"
  | "medical_certificate"
  | "language_proficiency";

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: UserRole;
  is_active?: boolean;
  onboarding_complete: boolean;
  degree_level: DegreeLevel | null;
  branch: string | null;
  current_cgpa: number | null;
  graduation_year: number | null;
  country_preference: string | null;
  budget_usd: number | null;
  ielts_score: number | null;
  toefl_score: number | null;
  gre_score: number | null;
  work_experience_years: number | null;
  research_experience_years: number | null;
  research_publications: number | null;
  certifications_count: number | null;
  extracurricular_activities: string | null;
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface ScholarshipRequirement {
  id: number;
  document_type: DocumentType;
  is_mandatory: boolean;
  notes: string | null;
}

export interface Scholarship {
  id: number;
  name: string;
  country: string;
  funding_type: FundingType;
  degree_level: DegreeLevelOrAny;
  min_cgpa: number;
  ielts_requirement: number | null;
  toefl_requirement: number | null;
  gre_requirement: number | null;
  requires_research: boolean;
  requires_work_experience: boolean;
  min_work_experience_years: number;
  deadline: string | null;
  benefits: string;
  description: string;
  official_link: string | null;
  max_budget_usd: number | null;
  is_active: boolean;
  requirements: ScholarshipRequirement[];
  created_at: string;
}

export interface ScholarshipMatch {
  id: number;
  name: string;
  country: string;
  funding_type: FundingType;
  degree_level: DegreeLevelOrAny;
  min_cgpa: number;
  ielts_requirement: number | null;
  deadline: string | null;
  benefits: string;
  description: string;
  official_link: string | null;
  match_percentage: number;
  eligibility_status: EligibilityStatus;
  gap_reasons: string[];
}

export interface UserDocument {
  id: number;
  document_type: DocumentType;
  is_available: boolean;
  file_name: string | null;
  notes: string | null;
  updated_at: string;
}

export interface DocumentGapItem {
  document_type: DocumentType;
  label: string;
  is_mandatory: boolean;
  available: boolean;
}

export interface DocumentGapReport {
  scholarship_id: number;
  scholarship_name: string;
  available: DocumentGapItem[];
  missing: DocumentGapItem[];
  completion_percentage: number;
}

export interface ReadinessScoreData {
  id: number;
  scholarship_id: number | null;
  overall_score: number;
  academic_score: number;
  language_score: number;
  experience_score: number;
  documents_score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  created_at: string;
}

export interface RoadmapStep {
  id: number;
  order_index: number;
  title: string;
  description: string;
  estimated_days: number;
  is_complete: boolean;
}

export interface Roadmap {
  id: number;
  scholarship_id: number;
  scholarship_name: string;
  status: string;
  total_estimated_days: number;
  progress_percentage: number;
  steps: RoadmapStep[];
  created_at: string;
}

export interface DashboardSummary {
  top_matches: {
    id: number;
    name: string;
    country: string;
    funding_type: FundingType;
    match_percentage: number;
    eligibility_status: EligibilityStatus;
    deadline: string | null;
  }[];
  readiness: {
    overall_score: number;
    academic_score: number;
    language_score: number;
    experience_score: number;
    documents_score: number;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  } | null;
  documents_available_count: number;
  upcoming_deadlines: { id: number; name: string; deadline: string; country: string }[];
  roadmaps: {
    id: number;
    scholarship_id: number;
    scholarship_name: string;
    progress_percentage: number;
    total_steps: number;
    completed_steps: number;
  }[];
  onboarding_complete: boolean;
}

export interface OnboardingData {
  degree_level: DegreeLevel;
  branch: string;
  current_cgpa: number;
  graduation_year: number;
  country_preference: string;
  budget_usd: number;
  ielts_score: number | null;
  toefl_score: number | null;
  gre_score: number | null;
  work_experience_years: number;
  research_experience_years: number;
  research_publications: number;
  certifications_count: number;
  extracurricular_activities: string | null;
}
