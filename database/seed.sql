-- =========================================================
-- ScholarPath AI — Seed Data (58 scholarships, 48 countries)
-- =========================================================
-- Run AFTER schema.sql has created the database & tables:
--   mysql -u root -p scholarpath_ai < database/seed.sql
--
-- This file is idempotent-ish: it does not check for existing
-- rows, so run it once against a freshly created schema. If
-- you need idempotent seeding, use `python -m app.init_db`
-- instead, which skips scholarships that already exist.
-- =========================================================

USE scholarpath_ai;

SET FOREIGN_KEY_CHECKS=0;

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('DAAD Study Scholarship', 'Germany', 'fully_funded', 'masters', 7.5, 6.5, 90, NULL, 0, 0, 0, '2026-10-15', 'Monthly stipend of €934, travel allowance, health insurance, tuition waiver at public universities.', 'Germany''s flagship scholarship for international graduate students, covering living costs and tuition at German public universities.', 'https://www.daad.de', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'research_papers', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Erasmus Mundus Joint Master Degree', 'European Union', 'fully_funded', 'masters', 7.0, 6.5, 88, NULL, 0, 0, 0, '2027-01-15', 'Full tuition, monthly stipend of €1,400, travel & installation allowance, insurance.', 'Prestigious EU-funded joint master''s program delivered across at least two European universities.', 'https://www.eacea.ec.europa.eu', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Fulbright Foreign Student Program', 'United States', 'fully_funded', 'masters', 7.5, 7.0, 100, 310, 0, 1, 2, '2027-05-01', 'Full tuition, living stipend, airfare, health insurance.', 'The U.S. government''s flagship international exchange program for graduate study and research.', 'https://foreign.fulbrightonline.org', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'gre_scorecard', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'research_papers', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('MEXT Japanese Government Scholarship', 'Japan', 'fully_funded', 'masters', 7.0, 6.0, 80, NULL, 0, 0, 0, '2027-05-31', 'Full tuition, monthly stipend of ¥144,000-145,000, round-trip airfare.', 'Japan''s Ministry of Education scholarship covering tuition and living costs at Japanese universities.', 'https://www.mext.go.jp', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'medical_certificate', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Chevening Scholarship', 'United Kingdom', 'fully_funded', 'masters', 7.0, 6.5, 87, NULL, 0, 1, 2, '2026-11-05', 'Full tuition, monthly living stipend, travel costs, arrival allowance.', 'UK government''s global scholarship program for future leaders to pursue a one-year master''s degree.', 'https://www.chevening.org', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Commonwealth Scholarship', 'United Kingdom', 'fully_funded', 'masters', 7.0, 6.5, 88, NULL, 0, 0, 0, '2026-12-12', 'Full tuition, living allowance, airfare, thesis grant where applicable.', 'For students from Commonwealth countries to pursue master''s or PhD study in the UK.', 'https://cscuk.fcdo.gov.uk', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'research_papers', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Gates Cambridge Scholarship', 'United Kingdom', 'fully_funded', 'phd', 8.5, 7.5, 110, NULL, 1, 0, 0, '2026-12-03', 'Full tuition at Cambridge, maintenance allowance, discretionary funding for research.', 'Highly competitive full-cost scholarship for outstanding applicants to pursue postgraduate study at Cambridge.', 'https://www.gatescambridge.org', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'research_papers', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Chinese Government Scholarship (CSC)', 'China', 'fully_funded', 'masters', 7.0, 6.0, 80, NULL, 0, 0, 0, '2027-03-30', 'Full tuition, accommodation, monthly stipend, comprehensive medical insurance.', 'China Scholarship Council program covering study at top Chinese universities.', 'https://www.csc.edu.cn', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'medical_certificate', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Knight-Hennessy Scholars Program', 'United States', 'fully_funded', 'masters', 8.5, 7.0, 100, 320, 1, 1, 2, '2026-10-08', 'Full tuition at Stanford, living stipend, leadership development programming.', 'Stanford''s premier graduate scholarship for future global leaders across any graduate program.', 'https://knight-hennessy.stanford.edu', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'gre_scorecard', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'research_papers', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Swiss Government Excellence Scholarship', 'Switzerland', 'fully_funded', 'phd', 8.0, 7.0, 95, NULL, 1, 0, 0, '2026-11-30', 'Monthly stipend of CHF 1,920-3,500, tuition waiver, health insurance contribution.', 'Switzerland''s scholarship for postgraduate researchers at Swiss universities.', 'https://www.sbfi.admin.ch', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'research_papers', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Vanier Canada Graduate Scholarship', 'Canada', 'fully_funded', 'phd', 8.5, 6.5, 93, NULL, 1, 0, 0, '2026-11-04', 'CAD $50,000 per year for three years.', 'Canada''s premier doctoral scholarship recognizing leadership and research excellence.', 'https://vanier.gc.ca', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'research_papers', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Australia Awards Scholarship', 'Australia', 'fully_funded', 'masters', 7.0, 6.5, 90, NULL, 0, 1, 2, '2027-04-30', 'Full tuition, return airfare, establishment allowance, living expenses, health cover.', 'Australian government scholarship for students from partner countries for full-time study.', 'https://www.australiaawards.gov.au', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'medical_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('New Zealand Excellence Award', 'New Zealand', 'fully_funded', 'masters', 7.5, 6.5, 90, NULL, 0, 0, 0, '2026-09-30', 'Tuition fees, living stipend of NZD $441/week, establishment grant.', 'New Zealand government award for high-achieving international students.', 'https://www.education.govt.nz', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Korean Government Scholarship Program (KGSP)', 'South Korea', 'fully_funded', 'masters', 7.0, 5.5, 80, NULL, 0, 0, 0, '2027-02-15', 'Full tuition, monthly stipend of ₩900,000-1,000,000, settlement allowance, airfare.', 'South Korea''s scholarship for international students to pursue degrees at Korean universities.', 'https://www.studyinkorea.go.kr', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'medical_certificate', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Eiffel Excellence Scholarship', 'France', 'fully_funded', 'masters', 7.5, 6.5, 90, NULL, 0, 0, 0, '2027-01-10', 'Monthly allowance of €1,181, travel costs, health insurance, cultural activities.', 'French government scholarship for top international students in priority fields.', 'https://www.campusfrance.org', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Holland Scholarship', 'Netherlands', 'partially_funded', 'masters', 7.0, 6.5, 90, NULL, 0, 0, 0, '2027-02-01', 'One-time grant of €5,000 toward the first year of study.', 'Dutch government and university co-funded scholarship for non-EEA students.', 'https://www.studyinnl.org', 28000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Italian Government Scholarship', 'Italy', 'partially_funded', 'masters', 6.5, 6.0, 80, NULL, 0, 0, 0, '2026-12-20', 'Monthly stipend of €900, tuition fee waiver at participating universities.', 'Italy''s Ministry of Foreign Affairs scholarship for international students.', 'https://www.esteri.it', 20000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Sweden Institute Scholarship for Global Professionals', 'Sweden', 'fully_funded', 'masters', 7.5, 6.5, 90, NULL, 0, 1, 3, '2027-02-12', 'Full tuition, monthly living allowance, travel grant, insurance.', 'For professionals from select developing countries pursuing a Swedish master''s degree.', 'https://si.se', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Danish Government Scholarship', 'Denmark', 'partially_funded', 'masters', 7.5, 6.5, 88, NULL, 0, 0, 0, '2027-01-15', 'Full or partial tuition waiver plus a living stipend at select Danish universities.', 'Tuition waivers and stipends offered by Danish universities to high-achieving non-EU students.', 'https://studyindenmark.dk', 25000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Norway Quota Scheme Partner Scholarship', 'Norway', 'partially_funded', 'masters', 7.0, 6.5, 88, NULL, 0, 0, 0, '2026-12-01', 'Tuition-free education at public Norwegian universities plus a partial living grant from select institutions.', 'Norwegian public universities charge no tuition; this program adds a stipend for eligible developing-country students.', 'https://www.studyinnorway.no', 15000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Belgian Development Cooperation Scholarship (VLIR-UOS)', 'Belgium', 'fully_funded', 'masters', 7.0, 6.0, 80, NULL, 0, 1, 1, '2027-01-25', 'Full tuition, monthly allowance, travel and insurance costs.', 'Belgium''s scholarship for students from developing countries in select master''s programs.', 'https://www.vliruos.be', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Austria OeAD Scholarship', 'Austria', 'partially_funded', 'masters', 7.0, 6.0, 85, NULL, 0, 0, 0, '2027-03-01', 'Monthly stipend of €1,150, partial tuition support, insurance.', 'Austrian agency for education and internationalization scholarship for graduate study.', 'https://oead.at', 22000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Finland KAUTE Foundation Scholarship', 'Finland', 'partially_funded', 'masters', 7.5, 6.5, 92, NULL, 0, 0, 0, '2027-01-31', 'Partial tuition grant of up to €10,000 toward Finnish university programs.', 'Foundation grant supporting international students in business and technology master''s programs in Finland.', 'https://www.kaute.fi', 18000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Irish Government of Ireland Scholarship', 'Ireland', 'fully_funded', 'phd', 8.0, 6.5, 90, NULL, 1, 0, 0, '2027-04-15', 'Annual stipend of €18,500, tuition fees up to €5,750 per year for four years.', 'Ireland''s flagship doctoral scholarship for outstanding researchers across all disciplines.', 'https://research.ie', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'research_papers', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Spain La Caixa Foundation Scholarship', 'Spain', 'fully_funded', 'masters', 7.5, 6.5, 90, NULL, 0, 0, 0, '2026-11-15', 'Tuition fees, monthly stipend, travel and insurance costs for study at select Spanish universities.', 'La Caixa Foundation scholarship for outstanding students pursuing graduate study in Spain.', 'https://fundacionlacaixa.org', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Singapore International Graduate Award (SINGA)', 'Singapore', 'fully_funded', 'phd', 8.0, 6.5, 92, NULL, 1, 0, 0, '2026-12-01', 'Monthly stipend of SGD $3,200-3,700, tuition coverage, airfare, settling-in allowance.', 'Joint scholarship for PhD studies in science and engineering at Singapore''s leading research institutions.', 'https://www.a-star.edu.sg', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'research_papers', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Malaysia International Scholarship (MIS)', 'Malaysia', 'fully_funded', 'masters', 7.0, 6.0, 80, NULL, 0, 0, 0, '2027-03-15', 'Full tuition, monthly allowance, airfare, medical insurance.', 'Malaysian government scholarship for international students in priority fields of study.', 'https://www.mohe.gov.my', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'medical_certificate', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Turkiye Burslari Scholarship', 'Turkey', 'fully_funded', 'masters', 7.0, NULL, NULL, NULL, 0, 0, 0, '2027-02-20', 'Full tuition, monthly stipend, accommodation, health insurance, Turkish language course.', 'Turkey''s government scholarship offering full funding across thousands of programs nationwide.', 'https://www.turkiyeburslari.gov.tr', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'medical_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Israel Government Scholarship (MASA)', 'Israel', 'partially_funded', 'masters', 7.0, 6.0, 80, NULL, 0, 0, 0, '2027-01-20', 'Partial tuition grant covering up to 50% of program costs.', 'Scholarship supporting international students pursuing graduate study at Israeli universities.', 'https://www.masaisrael.org', 20000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('UAE Khalifa University Merit Scholarship', 'United Arab Emirates', 'partially_funded', 'masters', 8.0, 6.5, 90, NULL, 0, 0, 0, '2027-05-01', 'Merit-based tuition waiver of up to 75% plus research assistantship opportunities.', 'Merit scholarship for high-achieving students in engineering and science programs in the UAE.', 'https://www.ku.ac.ae', 22000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Saudi Arabia King Abdullah Scholarship', 'Saudi Arabia', 'fully_funded', 'masters', 7.5, 6.0, 80, NULL, 0, 0, 0, '2027-04-01', 'Full tuition, monthly stipend, housing allowance, health insurance, return airfare.', 'Saudi government scholarship for international students across approved global universities.', 'https://www.moe.gov.sa', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'medical_certificate', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('South Africa NRF Freestanding Masters Scholarship', 'South Africa', 'partially_funded', 'masters', 7.0, NULL, NULL, NULL, 1, 0, 0, '2026-10-31', 'Annual grant of ZAR 110,000 toward tuition and living costs.', 'National Research Foundation grant for master''s-level research students in South Africa.', 'https://www.nrf.ac.za', 12000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'research_papers', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Brazil Science Without Borders', 'Brazil', 'partially_funded', 'masters', 7.0, 6.0, 80, NULL, 1, 0, 0, '2027-02-28', 'Partial tuition support and a monthly research stipend at partner Brazilian universities.', 'Brazilian initiative supporting international exchange and research collaboration in STEM fields.', 'https://www.gov.br/capes', 10000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'research_papers', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Mexico Government Scholarship (AMEXCID)', 'Mexico', 'fully_funded', 'masters', 7.0, NULL, NULL, NULL, 0, 0, 0, '2027-03-30', 'Full tuition waiver, monthly stipend, health insurance.', 'Mexican government scholarship for international students at public Mexican universities.', 'https://www.gob.mx/amexcid', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'language_proficiency', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Chile Becas Chile Scholarship', 'Chile', 'fully_funded', 'phd', 7.5, 6.5, 88, NULL, 1, 0, 0, '2027-06-30', 'Full tuition, monthly stipend, health insurance, settlement allowance, research costs.', 'Chilean government scholarship for doctoral study at top global and national universities.', 'https://www.becaschile.cl', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'research_papers', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Argentina Bec.AR Scholarship', 'Argentina', 'partially_funded', 'masters', 7.0, NULL, NULL, NULL, 0, 1, 1, '2027-04-15', 'Partial tuition coverage plus a monthly stipend for select strategic-sector master''s programs.', 'Argentine government scholarship supporting professionals to study abroad in priority fields.', 'https://www.becar.gob.ar', 14000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'language_proficiency', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('India National Overseas Scholarship', 'India', 'fully_funded', 'masters', 6.5, 6.0, 80, NULL, 0, 0, 0, '2027-03-01', 'Tuition fees, maintenance allowance, airfare, contingency allowance.', 'Government of India scholarship supporting students to pursue master''s or PhD study abroad.', 'https://www.tribal.nic.in', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Nigeria Federal Government Scholarship', 'Nigeria', 'partially_funded', 'masters', 6.5, 6.0, 80, NULL, 0, 0, 0, '2027-05-20', 'Partial tuition grant plus a contribution toward living expenses abroad.', 'Nigerian government bursary supporting citizens to pursue postgraduate study overseas.', 'https://www.fme.gov.ng', 8000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Kenya Mastercard Foundation Scholars Program', 'Kenya', 'fully_funded', 'undergraduate', 7.0, 6.0, 79, NULL, 0, 0, 0, '2027-01-31', 'Full tuition, accommodation, stipend, mentorship, leadership development.', 'Program supporting academically talented but economically disadvantaged African students.', 'https://mastercardfdn.org', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'financial_statement', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Ghana Government Scholarship Secretariat Award', 'Ghana', 'partially_funded', 'masters', 6.5, 6.0, 79, NULL, 0, 0, 0, '2027-02-28', 'Partial tuition support plus book and research allowances.', 'Ghanaian government award assisting citizens pursuing postgraduate education abroad.', 'https://gss.gov.gh', 9000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Egypt Ministry of Higher Education Scholarship', 'Egypt', 'partially_funded', 'masters', 6.5, 5.5, 75, NULL, 0, 0, 0, '2027-03-10', 'Partial tuition coverage and a modest monthly living allowance.', 'Egyptian government scholarship supporting graduate study in priority technical fields abroad.', 'https://www.mohesr.gov.eg', 7000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Vietnam Government Scholarship', 'Vietnam', 'partially_funded', 'masters', 6.5, 5.5, 75, NULL, 0, 0, 0, '2027-04-30', 'Partial tuition grant and travel subsidy for overseas postgraduate study.', 'Vietnamese government scholarship supporting citizens studying in priority STEM disciplines abroad.', 'https://moet.gov.vn', 8000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Indonesia LPDP Scholarship', 'Indonesia', 'fully_funded', 'masters', 7.0, 6.5, 80, NULL, 0, 0, 0, '2027-02-15', 'Full tuition, monthly stipend, book allowance, health insurance, settlement allowance.', 'Indonesia Endowment Fund for Education scholarship covering study at top global universities.', 'https://lpdp.kemenkeu.go.id', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Philippines DOST-SEI Scholarship', 'Philippines', 'partially_funded', 'masters', 6.5, NULL, NULL, NULL, 1, 0, 0, '2027-01-30', 'Tuition subsidy, book allowance, and a thesis/research grant for science and engineering students.', 'Philippine government grant supporting graduate study in science and technology fields.', 'https://www.sei.dost.gov.ph', 9000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'research_papers', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Pakistan HEC Overseas Scholarship', 'Pakistan', 'fully_funded', 'phd', 7.0, 6.0, 80, NULL, 1, 0, 0, '2027-03-20', 'Full tuition, monthly stipend, airfare, visa fees, health insurance.', 'Pakistan Higher Education Commission scholarship for doctoral study at top-ranked global universities.', 'https://www.hec.gov.pk', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'research_papers', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Bangladesh NST Fellowship', 'Bangladesh', 'partially_funded', 'masters', 6.5, NULL, NULL, NULL, 1, 0, 0, '2027-05-15', 'Partial tuition support and a research stipend for science and technology master''s students.', 'National Science and Technology Fellowship supporting Bangladeshi students in STEM fields.', 'https://most.gov.bd', 6000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'research_papers', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Sri Lanka Commonwealth Shared Scholarship', 'United Kingdom', 'fully_funded', 'masters', 7.0, 6.5, 88, NULL, 0, 0, 0, '2027-01-10', 'Full tuition, stipend, airfare, and warm clothing allowance for UK study.', 'Shared scholarship scheme for students from developing Commonwealth countries to study in the UK.', 'https://cscuk.fcdo.gov.uk', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Poland NAWA Scholarship', 'Poland', 'partially_funded', 'masters', 7.0, 6.0, 80, NULL, 0, 0, 0, '2027-04-15', 'Monthly stipend plus a partial tuition waiver at Polish public universities.', 'Polish National Agency for Academic Exchange scholarship for international students.', 'https://nawa.gov.pl', 12000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Czech Republic Government Scholarship', 'Czech Republic', 'partially_funded', 'masters', 6.5, 6.0, 80, NULL, 0, 0, 0, '2026-09-30', 'Monthly stipend of CZK 14,000 and a partial tuition waiver at public Czech universities.', 'Scholarship supporting students from developing countries to study in the Czech Republic.', 'https://www.studyin.cz', 10000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Hungary Stipendium Hungaricum', 'Hungary', 'fully_funded', 'masters', 7.0, 6.0, 80, NULL, 0, 0, 0, '2027-01-15', 'Full tuition, monthly stipend of HUF 43,700-140,000, accommodation contribution, health insurance.', 'Hungarian government scholarship program open to students from over 70 partner countries.', 'https://stipendiumhungaricum.hu', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'medical_certificate', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Greece IKY State Scholarship', 'Greece', 'partially_funded', 'masters', 7.0, 6.0, 80, NULL, 0, 0, 0, '2027-03-31', 'Monthly stipend plus a partial tuition waiver at Greek public universities.', 'Greek State Scholarships Foundation award for international postgraduate students.', 'https://www.iky.gr', 11000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Portugal Calouste Gulbenkian Scholarship', 'Portugal', 'partially_funded', 'masters', 7.0, 6.0, 85, NULL, 0, 0, 0, '2027-02-28', 'Partial tuition grant and a contribution toward living costs in Portugal.', 'Gulbenkian Foundation scholarship supporting international students at Portuguese universities.', 'https://gulbenkian.pt', 13000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Canada Trudeau Foundation Doctoral Scholarship', 'Canada', 'fully_funded', 'phd', 8.5, 7.0, 100, NULL, 1, 0, 0, '2026-11-20', 'CAD $60,000 per year for up to three years, plus mentorship and networking opportunities.', 'Canada''s premier doctoral scholarship for research addressing pressing societal challenges.', 'https://trudeaufoundation.ca', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'research_papers', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('University of Toronto Lester B. Pearson Scholarship', 'Canada', 'fully_funded', 'undergraduate', 8.5, 6.5, 89, NULL, 0, 0, 0, '2026-11-28', 'Full tuition, books, incidental fees, and full residence support for four years.', 'University of Toronto''s most prestigious undergraduate scholarship for international students.', 'https://future.utoronto.ca', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Melbourne International Research Scholarship', 'Australia', 'fully_funded', 'phd', 8.0, 6.5, 79, NULL, 1, 0, 0, '2026-10-31', 'Full tuition waiver, living allowance of AUD $35,000/year, health cover.', 'University of Melbourne''s flagship doctoral research scholarship for international students.', 'https://www.unimelb.edu.au', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'research_papers', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('ETH Zurich Excellence Scholarship', 'Switzerland', 'partially_funded', 'masters', 8.5, 7.0, 100, NULL, 0, 0, 0, '2026-12-15', 'CHF 12,000-15,000 award plus a partial tuition waiver for top-ranked applicants.', 'Merit scholarship for outstanding incoming master''s students at ETH Zurich.', 'https://ethz.ch', 24000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('National University of Singapore Research Scholarship', 'Singapore', 'fully_funded', 'phd', 8.0, 6.5, 85, NULL, 1, 0, 0, '2027-01-15', 'Monthly stipend of SGD $2,200-3,500, full tuition waiver, conference travel support.', 'NUS scholarship supporting doctoral researchers across science, engineering, and computing fields.', 'https://www.nus.edu.sg', NULL, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'research_papers', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 0);

INSERT INTO scholarships (name, country, funding_type, degree_level, min_cgpa, ielts_requirement, toefl_requirement, gre_requirement, requires_research, requires_work_experience, min_work_experience_years, deadline, benefits, description, official_link, max_budget_usd, is_active) VALUES ('Technical University of Munich International Scholarship', 'Germany', 'partially_funded', 'masters', 7.5, 6.5, 88, NULL, 0, 0, 0, '2027-03-01', 'One-time grant of €4,000-6,000 toward living and tuition-related costs.', 'TUM merit award supporting outstanding international master''s applicants.', 'https://www.tum.de', 20000, 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'passport', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'sop', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'lor', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'resume', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'transcript', 1);
INSERT INTO scholarship_requirements (scholarship_id, document_type, is_mandatory) VALUES (LAST_INSERT_ID(), 'ielts_certificate', 1);

SET FOREIGN_KEY_CHECKS=1;

-- Sample admin account
-- Email: admin@scholarpath.ai   Password: ChangeMe123!
-- The hash below was generated with the app's bcrypt helper for that
-- exact password. CHANGE THIS PASSWORD after first login in production.
INSERT INTO users (full_name, email, hashed_password, role, is_active, onboarding_complete)
VALUES (
  'ScholarPath Admin',
  'admin@scholarpath.ai',
  '$2b$12$8mBD2IiyyZyV3tH7u0zoUOCVI3Y5QIL0.1u8H9ucMGJfyKbkNTuJG',
  'admin',
  1,
  1
);