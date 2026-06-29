"""
ScholarPath AI — FastAPI application entrypoint.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import admin, auth, dashboard, documents, readiness, roadmaps, scholarships

app = FastAPI(
    title=settings.APP_NAME,
    description="AI-powered Study Abroad Scholarship Navigator API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
from app.core.database import Base, engine
import app.models as models

# Create tables automatically on startup
Base.metadata.create_all(bind=engine)
from app.init_db import seed_admin
from app.core.database import SessionLocal

db = SessionLocal()
seed_admin(db)
db.close()

app.include_router(auth.router)
app.include_router(scholarships.router)
app.include_router(documents.router)
app.include_router(readiness.router)
app.include_router(roadmaps.router)
app.include_router(dashboard.router)
app.include_router(admin.router)


@app.get("/api/health", tags=["health"])
def health_check():
    return {"status": "ok", "app": settings.APP_NAME}


@app.get("/", tags=["health"])
def root():
    return {"message": f"{settings.APP_NAME} API is running. See /docs for API documentation."}
