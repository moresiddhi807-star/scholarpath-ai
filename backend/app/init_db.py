"""
One-shot database bootstrap script.

Usage:
    python -m app.init_db

Creates all tables (if they don't exist) and seeds:
  - the scholarship catalog (idempotent: skips scholarships that already
    exist by name+country)
  - one sample admin account (idempotent: skips if the email already exists)

Run this once after pointing DATABASE_URL at a real, empty MySQL database
that you've already created (see database/schema.sql or the README).
"""
from datetime import datetime

from app.core.config import settings
from app.core.database import Base, SessionLocal, engine
from app.core.security import hash_password
from app.data.scholarships_seed import SCHOLARSHIPS
from app.models.scholarship import Scholarship, ScholarshipRequirement
from app.models.user import User, UserRole

import app.models  # noqa: F401  (ensures all models are registered on Base.metadata)


def create_tables():
    print("Creating tables (if not already present)...")
    Base.metadata.create_all(bind=engine)
    print("Tables ready.")


def seed_scholarships(db):
    existing = {(s.name, s.country) for s in db.query(Scholarship.name, Scholarship.country).all()}
    created = 0

    for entry in SCHOLARSHIPS:
        key = (entry["name"], entry["country"])
        if key in existing:
            continue

        deadline = datetime.strptime(entry["deadline"], "%Y-%m-%d").date() if entry.get("deadline") else None

        scholarship = Scholarship(
            name=entry["name"],
            country=entry["country"],
            funding_type=entry["funding_type"],
            degree_level=entry["degree_level"],
            min_cgpa=entry["min_cgpa"],
            ielts_requirement=entry["ielts_requirement"],
            toefl_requirement=entry["toefl_requirement"],
            gre_requirement=entry["gre_requirement"],
            requires_research=entry["requires_research"],
            requires_work_experience=entry["requires_work_experience"],
            min_work_experience_years=entry["min_work_experience_years"],
            deadline=deadline,
            benefits=entry["benefits"],
            description=entry["description"],
            official_link=entry.get("official_link"),
            max_budget_usd=entry.get("max_budget_usd"),
            is_active=True,
        )
        db.add(scholarship)
        db.flush()

        for doc_type in entry.get("required_documents", []):
            db.add(ScholarshipRequirement(scholarship_id=scholarship.id, document_type=doc_type, is_mandatory=True))
        for doc_type in entry.get("optional_documents", []):
            db.add(ScholarshipRequirement(scholarship_id=scholarship.id, document_type=doc_type, is_mandatory=False))

        created += 1

    db.commit()
    print(f"Seeded {created} new scholarships ({len(SCHOLARSHIPS) - created} already existed).")


def seed_admin(db):
    existing = db.query(User).filter(User.email == settings.ADMIN_SEED_EMAIL).first()
    if existing:
        print(f"Admin account already exists: {settings.ADMIN_SEED_EMAIL}")
        return

    admin = User(
        full_name="ScholarPath Admin",
        email=settings.ADMIN_SEED_EMAIL,
        hashed_password=hash_password(settings.ADMIN_SEED_PASSWORD),
        role=UserRole.admin,
        is_active=True,
        onboarding_complete=True,
    )
    db.add(admin)
    db.commit()
    print(f"Created admin account: {settings.ADMIN_SEED_EMAIL} / (password set in .env)")


def main():
    create_tables()
    db = SessionLocal()
    try:
        seed_scholarships(db)
        seed_admin(db)
    finally:
        db.close()
    print("\nDatabase bootstrap complete.")


if __name__ == "__main__":
    main()
