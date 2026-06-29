# ScholarPath AI

**An AI-powered Study Abroad Scholarship Navigator.**

ScholarPath AI answers one question for students: *"What scholarship can I realistically get, what am I missing, and what should I do next?"*

It is **not** another scholarship listing site. It's a focused tool built around four capabilities:

1. **Scholarship Matching Engine** — ranks 58+ global scholarships against your real profile with a transparent, explainable match percentage.
2. **Missing Document Detection** — compares what each scholarship requires against what you have on file.
3. **Scholarship Readiness Score** — a single 0–100 score (academic / language / experience / documents) with strengths, weaknesses, and concrete suggestions.
4. **Personalized Roadmap Generator** — an ordered, time-estimated action plan to close your gaps for a specific scholarship.

Plus: JWT authentication, student onboarding, a full dashboard, and an admin panel for managing the scholarship catalog and users.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS v4, Framer Motion, React Router, Lucide Icons, Recharts |
| Backend | FastAPI (Python 3.11+) |
| Database | MySQL 8.0+ |
| Auth | JWT (access + refresh tokens), bcrypt password hashing |
| Hosting (suggested) | Vercel (frontend) + Render (backend) |

---

## Project Structure

```
scholarpath-ai/
├── backend/                       FastAPI application
│   ├── app/
│   │   ├── core/                  config, DB session, security, auth deps
│   │   ├── models/                SQLAlchemy ORM models (6 tables)
│   │   ├── schemas/                Pydantic request/response schemas
│   │   ├── routers/                API route handlers (auth, scholarships,
│   │   │                           documents, readiness, roadmaps, dashboard, admin)
│   │   ├── services/                Core business logic:
│   │   │                           matching_engine.py    (Feature 1)
│   │   │                           document_gap.py       (Feature 2)
│   │   │                           readiness_engine.py   (Feature 3)
│   │   │                           roadmap_generator.py  (Feature 4)
│   │   ├── data/
│   │   │   └── scholarships_seed.py   58 scholarships across 48 countries
│   │   ├── init_db.py             one-shot DB bootstrap + seed script
│   │   └── main.py                FastAPI app entrypoint
│   ├── requirements.txt
│   └── .env.example
│
├── database/
│   ├── schema.sql                 Standalone MySQL DDL (mirrors the ORM)
│   └── seed.sql                   Standalone INSERT statements (58 scholarships + admin)
│
├── frontend/                      React + TypeScript SPA
│   └── src/
│       ├── components/
│       │   ├── ui/                Button, Card, Badge, Input, Skeleton,
│       │   │                       ReadinessStamp (signature visual), etc.
│       │   ├── layout/            Navbar, DashboardLayout, AdminLayout, route guards
│       │   ├── landing/           Hero, Features, Stats, HowItWorks, Testimonials
│       │   └── admin/             Scholarship form modal
│       ├── pages/                 One file per route (Dashboard, Scholarships,
│       │                           Readiness, Documents, Roadmap, Profile, Admin/*)
│       ├── context/                AuthContext (JWT session state)
│       ├── lib/                    api.ts (typed Axios client), helpers
│       └── types/                  Shared TypeScript types mirroring backend schemas
│
└── README.md                      You are here
```

---

## 1. Prerequisites

- **Python 3.11+**
- **Node.js 20+** and npm
- **MySQL 8.0+** running locally or remotely, with a database you can create

This project is **MySQL-only** — there is no SQLite fallback. You must have a MySQL server reachable before running the backend.

---

## 2. Database Setup

### Option A — Let the backend create everything (recommended)

1. Create an empty MySQL database and user:

   ```sql
   CREATE DATABASE scholarpath_ai CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'scholarpath_user'@'%' IDENTIFIED BY 'change_me';
   GRANT ALL PRIVILEGES ON scholarpath_ai.* TO 'scholarpath_user'@'%';
   FLUSH PRIVILEGES;
   ```

2. Configure `backend/.env` (see [Backend Setup](#3-backend-setup) below) with your `DATABASE_URL`.

3. From the `backend/` directory, run the bootstrap script. This creates all 7 tables via SQLAlchemy and seeds 58 scholarships + one admin account:

   ```bash
   python -m app.init_db
   ```

   This is **idempotent** — running it again skips scholarships and the admin account that already exist.

### Option B — Run the raw SQL files directly

If you prefer to provision the schema without touching Python:

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p scholarpath_ai < database/seed.sql
```

`database/seed.sql` includes a ready-to-use admin account:
- **Email:** `admin@scholarpath.ai`
- **Password:** `ChangeMe123!`

> Change this password immediately in any real deployment — either through the database directly, or by seeding your own admin via `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` in `.env` and running `python -m app.init_db` against a fresh database instead.

---

## 3. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Edit .env:
#   - DATABASE_URL      → your MySQL connection string
#   - JWT_SECRET_KEY    → generate with: openssl rand -hex 32
#   - ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD → only used if you run init_db
#                          against a fresh DB

python -m app.init_db           # creates tables + seeds data (Option A above)

uvicorn app.main:app --reload --port 8000
```

The API is now live at `http://localhost:8000`. Interactive docs (Swagger UI) are at `http://localhost:8000/docs`.

### Backend environment variables (`backend/.env`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | `mysql+pymysql://user:password@host:port/database` |
| `JWT_SECRET_KEY` | Random secret for signing JWTs — **must** be changed in production |
| `JWT_ALGORITHM` | Defaults to `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Default `60` |
| `REFRESH_TOKEN_EXPIRE_DAYS` | Default `7` |
| `FRONTEND_ORIGIN` | Used for CORS — your deployed frontend URL |
| `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` | Used only by `init_db.py` when seeding a fresh database |

---

## 4. Frontend Setup

```bash
cd frontend
npm install

cp .env.example .env
# Edit .env:
#   VITE_API_BASE_URL=http://localhost:8000   (or your deployed backend URL)

npm run dev
```

The app is now live at `http://localhost:5173`.

### Frontend scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) and produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## 5. Using the App

1. Visit the landing page → **Get Started** → create an account.
2. Complete the 4-step onboarding (academics, preferences, test scores, experience).
3. Land on the **Dashboard**, which surfaces:
   - Your live Readiness Score (the "stamp" widget)
   - Top scholarship matches
   - Documents on file
   - Upcoming deadlines
   - Roadmap progress
4. Browse **Scholarships**, open one, and you'll see:
   - Your match % and why it isn't higher (gap reasons)
   - The document checklist (available vs. missing)
   - A button to generate a personalized roadmap
5. Track your roadmap under **Roadmap**, checking off steps as you complete them.
6. Log in as the seeded admin account (`admin@scholarpath.ai`) to access **Admin Panel** → add, edit, or delete scholarships, and manage user accounts.

---

## 6. How the Core Engines Work

All four engines live in `backend/app/services/` and are intentionally **transparent, rule-based, and explainable** — not black-box ML — so every score can be justified to a student.

- **`matching_engine.py`** — weighted rubric (CGPA, language, research, work experience, budget feasibility) with weights that redistribute proportionally when a criterion doesn't apply to a given scholarship. Degree level is a hard gate.
- **`document_gap.py`** — set comparison between a scholarship's required documents and the user's marked-available documents.
- **`readiness_engine.py`** — four weighted sub-scores (Academic 30%, Language 25%, Experience 20%, Documents 25%) rolled into one overall score, plus generated strengths/weaknesses/suggestions.
- **`roadmap_generator.py`** — orders missing requirements and documents into a step-by-step plan with realistic estimated-day durations per item (e.g. passport ≈ 21 days, IELTS prep ≈ 45 days).

---

## 7. Deployment Guide

### Backend → Render

1. Push this repository to GitHub.
2. In Render, create a new **Web Service** pointing at `backend/`.
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add all variables from `backend/.env.example` under **Environment**, pointing `DATABASE_URL` at a managed MySQL instance (e.g. Render's managed MySQL, PlanetScale, or AWS RDS).
6. After the first deploy, open a shell on the service and run `python -m app.init_db` once to create tables and seed data.

### Database → Managed MySQL

Use any MySQL 8.0+ provider (PlanetScale, AWS RDS, Render MySQL, etc.). Run `database/schema.sql` and `database/seed.sql` against it, or use `init_db.py` as above.

### Frontend → Vercel

1. Import the repository into Vercel, set the **root directory** to `frontend/`.
2. Framework preset: **Vite**.
3. Build command: `npm run build` — output directory: `dist`.
4. Add the environment variable `VITE_API_BASE_URL` pointing at your deployed Render backend URL.
5. Deploy. Update `FRONTEND_ORIGIN` in the backend's environment variables to match your Vercel URL (for CORS).

---

## 8. API Overview

All endpoints are prefixed `/api`. Full interactive documentation is available at `/docs` once the backend is running.

| Group | Endpoints |
|---|---|
| Auth | `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`, `GET /auth/me`, `POST /auth/onboarding`, `PATCH /auth/profile` |
| Scholarships | `GET /scholarships`, `GET /scholarships/countries`, `GET /scholarships/matches`, `GET /scholarships/{id}`, `GET /scholarships/{id}/match` |
| Documents | `GET /documents`, `PUT /documents`, `DELETE /documents/{type}`, `GET /documents/gap/{scholarship_id}` |
| Readiness | `POST /readiness/compute`, `GET /readiness/latest`, `GET /readiness/history` |
| Roadmaps | `POST /roadmaps/generate`, `GET /roadmaps`, `GET /roadmaps/{id}`, `PATCH /roadmaps/steps/{id}` |
| Dashboard | `GET /dashboard/summary` |
| Admin | `GET/POST/PUT/DELETE /admin/scholarships`, `GET /admin/users`, `PATCH /admin/users/{id}/activate`, `PATCH /admin/users/{id}/deactivate` |

All routes except `register`, `login`, `refresh`, the public scholarship list/detail, and `/health` require a `Bearer` JWT. Admin routes additionally require `role: admin`.

---

## 9. Notes & Scope

- **No AI chat/copilot feature is included in this build** — by design, this version focuses entirely on the four core engines above (matching, document detection, readiness scoring, roadmap generation), plus auth, dashboard, and admin tooling.
- The scholarship dataset (58 entries, 48 countries) is realistic and illustrative; deadlines are seeded as "next plausible cycle" dates and should be verified against official sources before relying on them for real applications. Each scholarship includes an `official_link` for that purpose.
- Password hashing uses `bcrypt` directly (not via `passlib`) to avoid a known incompatibility between `passlib`'s version-detection and modern `bcrypt` releases.
