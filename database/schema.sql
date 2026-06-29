-- =========================================================
-- ScholarPath AI — MySQL Schema
-- =========================================================
-- This file mirrors the SQLAlchemy models in backend/app/models/.
-- The backend will also auto-create these tables on first run via
-- `python -m app.init_db`, but this file is provided so you can:
--   1) Inspect/review the schema independently of the ORM
--   2) Provision the schema manually (DBA / CI workflows)
--   3) Use it as a reference for the exact column types & constraints
--
-- Run with:
--   mysql -u root -p < database/schema.sql
--
-- Requires MySQL 8.0+ (uses JSON-free design; CHECK constraints are
-- enforced by MySQL 8.0.16+).
-- =========================================================

CREATE DATABASE IF NOT EXISTS scholarpath_ai
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE scholarpath_ai;

-- Recommended: create a dedicated app user (adjust host/password as needed)
-- CREATE USER IF NOT EXISTS 'scholarpath_user'@'%' IDENTIFIED BY 'change_me';
-- GRANT ALL PRIVILEGES ON scholarpath_ai.* TO 'scholarpath_user'@'%';
-- FLUSH PRIVILEGES;

-- ---------------------------------------------------------
-- users
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id                          BIGINT AUTO_INCREMENT PRIMARY KEY,

  full_name                   VARCHAR(150)  NOT NULL,
  email                       VARCHAR(190)  NOT NULL,
  hashed_password             VARCHAR(255)  NOT NULL,
  role                        ENUM('student','admin') NOT NULL DEFAULT 'student',
  is_active                   BOOLEAN NOT NULL DEFAULT TRUE,
  onboarding_complete         BOOLEAN NOT NULL DEFAULT FALSE,

  degree_level                ENUM('undergraduate','masters','phd','postdoc') NULL,
  branch                      VARCHAR(150) NULL,
  current_cgpa                FLOAT NULL,
  graduation_year             INT NULL,

  country_preference          VARCHAR(100) NULL,
  budget_usd                  FLOAT NULL,

  ielts_score                 FLOAT NULL,
  toefl_score                 INT NULL,
  gre_score                   INT NULL,

  work_experience_years       FLOAT DEFAULT 0,
  research_experience_years   FLOAT DEFAULT 0,
  research_publications       INT DEFAULT 0,
  certifications_count        INT DEFAULT 0,
  extracurricular_activities  TEXT NULL,

  created_at                  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at                  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uq_users_email (email),
  KEY idx_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ---------------------------------------------------------
-- scholarships
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS scholarships (
  id                           BIGINT AUTO_INCREMENT PRIMARY KEY,

  name                         VARCHAR(200) NOT NULL,
  country                      VARCHAR(100) NOT NULL,
  funding_type                 ENUM('fully_funded','partially_funded') NOT NULL,
  degree_level                 ENUM('undergraduate','masters','phd','postdoc','any') NOT NULL,

  min_cgpa                     FLOAT DEFAULT 0,
  ielts_requirement             FLOAT NULL,
  toefl_requirement             INT NULL,
  gre_requirement                INT NULL,
  requires_research             BOOLEAN DEFAULT FALSE,
  requires_work_experience      BOOLEAN DEFAULT FALSE,
  min_work_experience_years     FLOAT DEFAULT 0,

  deadline                     DATE NULL,
  benefits                     TEXT NOT NULL,
  description                  TEXT NOT NULL,
  official_link                VARCHAR(500) NULL,
  max_budget_usd                FLOAT NULL COMMENT 'Approx total program cost; used for partial-funding budget matching',

  is_active                    BOOLEAN DEFAULT TRUE,

  created_at                   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at                   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  KEY idx_scholarships_country (country),
  KEY idx_scholarships_funding_type (funding_type),
  KEY idx_scholarships_degree_level (degree_level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ---------------------------------------------------------
-- scholarship_requirements  (required documents per scholarship)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS scholarship_requirements (
  id                BIGINT AUTO_INCREMENT PRIMARY KEY,
  scholarship_id    BIGINT NOT NULL,
  document_type     ENUM(
                       'passport','sop','lor','resume','transcript',
                       'ielts_certificate','toefl_certificate','gre_scorecard',
                       'research_papers','financial_statement','passport_photo',
                       'recommendation_letter','portfolio','medical_certificate',
                       'language_proficiency'
                     ) NOT NULL,
  is_mandatory      BOOLEAN DEFAULT TRUE,
  notes             VARCHAR(255) NULL,

  KEY idx_sreq_scholarship_id (scholarship_id),
  CONSTRAINT fk_sreq_scholarship
    FOREIGN KEY (scholarship_id) REFERENCES scholarships(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ---------------------------------------------------------
-- user_documents  (which documents a user has marked available)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_documents (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id         BIGINT NOT NULL,
  document_type   ENUM(
                     'passport','sop','lor','resume','transcript',
                     'ielts_certificate','toefl_certificate','gre_scorecard',
                     'research_papers','financial_statement','passport_photo',
                     'recommendation_letter','portfolio','medical_certificate',
                     'language_proficiency'
                   ) NOT NULL,
  is_available    BOOLEAN DEFAULT TRUE,
  file_name       VARCHAR(255) NULL,
  notes           VARCHAR(255) NULL,

  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  KEY idx_udoc_user_id (user_id),
  CONSTRAINT fk_udoc_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ---------------------------------------------------------
-- readiness_scores  (snapshots over time)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS readiness_scores (
  id                 BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id            BIGINT NOT NULL,
  scholarship_id     BIGINT NULL,

  overall_score      FLOAT NOT NULL,
  academic_score     FLOAT NOT NULL,
  language_score     FLOAT NOT NULL,
  experience_score   FLOAT NOT NULL,
  documents_score    FLOAT NOT NULL,

  strengths_json     TEXT NOT NULL,
  weaknesses_json    TEXT NOT NULL,
  suggestions_json   TEXT NOT NULL,

  created_at         DATETIME DEFAULT CURRENT_TIMESTAMP,

  KEY idx_rscore_user_id (user_id),
  KEY idx_rscore_scholarship_id (scholarship_id),
  CONSTRAINT fk_rscore_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_rscore_scholarship
    FOREIGN KEY (scholarship_id) REFERENCES scholarships(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ---------------------------------------------------------
-- roadmaps
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS roadmaps (
  id                BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id           BIGINT NOT NULL,
  scholarship_id    BIGINT NOT NULL,
  status            ENUM('active','completed','archived') DEFAULT 'active',

  created_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  KEY idx_roadmap_user_id (user_id),
  KEY idx_roadmap_scholarship_id (scholarship_id),
  CONSTRAINT fk_roadmap_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_roadmap_scholarship
    FOREIGN KEY (scholarship_id) REFERENCES scholarships(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ---------------------------------------------------------
-- roadmap_steps
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS roadmap_steps (
  id               BIGINT AUTO_INCREMENT PRIMARY KEY,
  roadmap_id       BIGINT NOT NULL,
  order_index      INT NOT NULL,
  title            VARCHAR(200) NOT NULL,
  description      TEXT NOT NULL,
  estimated_days   INT DEFAULT 7,
  is_complete      BOOLEAN DEFAULT FALSE,

  KEY idx_rstep_roadmap_id (roadmap_id),
  CONSTRAINT fk_rstep_roadmap
    FOREIGN KEY (roadmap_id) REFERENCES roadmaps(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
