"""
Pydantic schemas for authentication and user profile (onboarding).
"""
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.models.user import DegreeLevel, UserRole


# ---------- Auth ----------

class RegisterRequest(BaseModel):
    full_name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshRequest(BaseModel):
    refresh_token: str


# ---------- Onboarding / Profile ----------

class OnboardingRequest(BaseModel):
    degree_level: DegreeLevel
    branch: str = Field(max_length=150)
    current_cgpa: float = Field(ge=0, le=10)
    graduation_year: int = Field(ge=1990, le=2035)
    country_preference: str = Field(max_length=100)
    budget_usd: float = Field(ge=0)
    ielts_score: float | None = Field(default=None, ge=0, le=9)
    toefl_score: int | None = Field(default=None, ge=0, le=120)
    gre_score: int | None = Field(default=None, ge=0, le=340)
    work_experience_years: float = Field(default=0, ge=0, le=50)
    research_experience_years: float = Field(default=0, ge=0, le=50)
    research_publications: int = Field(default=0, ge=0)
    certifications_count: int = Field(default=0, ge=0)
    extracurricular_activities: str | None = None


class UserProfileUpdate(BaseModel):
    """Partial update — all fields optional."""
    full_name: str | None = None
    degree_level: DegreeLevel | None = None
    branch: str | None = None
    current_cgpa: float | None = Field(default=None, ge=0, le=10)
    graduation_year: int | None = None
    country_preference: str | None = None
    budget_usd: float | None = Field(default=None, ge=0)
    ielts_score: float | None = Field(default=None, ge=0, le=9)
    toefl_score: int | None = Field(default=None, ge=0, le=120)
    gre_score: int | None = Field(default=None, ge=0, le=340)
    work_experience_years: float | None = None
    research_experience_years: float | None = None
    research_publications: int | None = None
    certifications_count: int | None = None
    extracurricular_activities: str | None = None


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True, use_enum_values=True)

    id: int
    full_name: str
    email: EmailStr
    role: UserRole
    is_active: bool
    onboarding_complete: bool
    degree_level: DegreeLevel | None = None
    branch: str | None = None
    current_cgpa: float | None = None
    graduation_year: int | None = None
    country_preference: str | None = None
    budget_usd: float | None = None
    ielts_score: float | None = None
    toefl_score: int | None = None
    gre_score: int | None = None
    work_experience_years: float | None = None
    research_experience_years: float | None = None
    research_publications: int | None = None
    certifications_count: int | None = None
    extracurricular_activities: str | None = None
    created_at: datetime
