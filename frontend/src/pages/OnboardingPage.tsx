import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Compass, Check } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input, Select } from "../components/ui/Input";
import { FloatingBlobs } from "../components/ui/FloatingBlobs";
import { authApi } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import type { DegreeLevel, OnboardingData } from "../types";
import { isAxiosError } from "axios";

const STEPS = ["Academics", "Preferences", "Test Scores", "Experience"];

const COUNTRIES = [
  "Germany", "United States", "United Kingdom", "Japan", "Canada", "Australia",
  "France", "Netherlands", "Sweden", "Switzerland", "Singapore", "South Korea",
  "Italy", "Ireland", "New Zealand", "China", "Other / Open to anywhere",
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState<OnboardingData>({
    degree_level: "masters",
    branch: "",
    current_cgpa: 7.5,
    graduation_year: new Date().getFullYear() + 1,
    country_preference: "Germany",
    budget_usd: 10000,
    ielts_score: null,
    toefl_score: null,
    gre_score: null,
    work_experience_years: 0,
    research_experience_years: 0,
    research_publications: 0,
    certifications_count: 0,
    extracurricular_activities: "",
  });

  const update = <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const isLastStep = step === STEPS.length - 1;

  const validateStep = (): string | null => {
    if (step === 0) {
      if (!form.branch.trim()) return "Please enter your field of study.";
      if (form.current_cgpa < 0 || form.current_cgpa > 10) return "CGPA must be between 0 and 10.";
    }
    return null;
  };

  const handleNext = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedUser = await authApi.onboarding(form);
      setUser(updatedUser);
      navigate("/dashboard");
    } catch (err) {
      const message = isAxiosError(err) ? err.response?.data?.detail : null;
      setError(message || "Something went wrong saving your profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-paper-50 py-12 px-6">
      <FloatingBlobs />
      <div className="max-w-2xl mx-auto relative">
        <div className="flex items-center justify-center gap-2 font-display font-semibold text-xl text-ink-900 mb-8">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-900 text-teal-300">
            <Compass size={18} />
          </span>
          ScholarPath <span className="text-teal-500">AI</span>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  animate={{
                    backgroundColor: i <= step ? "var(--color-ink-900)" : "var(--color-ink-100)",
                    color: i <= step ? "#fafaf7" : "var(--color-ink-400)",
                  }}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-mono font-bold"
                >
                  {i < step ? <Check size={14} /> : i + 1}
                </motion.div>
                <span className={`text-xs font-medium hidden sm:block ${i <= step ? "text-ink-700" : "text-ink-300"}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-8 sm:w-16 h-px mx-1 ${i < step ? "bg-ink-900" : "bg-ink-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="glass rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(11,17,32,0.1)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 0 && (
                <div className="space-y-5">
                  <h2 className="font-display font-semibold text-xl text-ink-950">Tell us about your academics</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Select
                      label="Degree level you're pursuing"
                      value={form.degree_level}
                      onChange={(e) => update("degree_level", e.target.value as DegreeLevel)}
                    >
                      <option value="undergraduate">Undergraduate</option>
                      <option value="masters">Master's</option>
                      <option value="phd">PhD</option>
                      <option value="postdoc">Postdoc</option>
                    </Select>
                    <Input
                      label="Field of study / branch"
                      value={form.branch}
                      onChange={(e) => update("branch", e.target.value)}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Current CGPA (out of 10)"
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={form.current_cgpa}
                      onChange={(e) => update("current_cgpa", parseFloat(e.target.value) || 0)}
                    />
                    <Input
                      label="Graduation year"
                      type="number"
                      min="1990"
                      max="2035"
                      value={form.graduation_year}
                      onChange={(e) => update("graduation_year", parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="font-display font-semibold text-xl text-ink-950">Your study preferences</h2>
                  <Select
                    label="Preferred country"
                    value={form.country_preference}
                    onChange={(e) => update("country_preference", e.target.value)}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                  <Input
                    label="Budget you can personally contribute (USD)"
                    type="number"
                    min="0"
                    value={form.budget_usd}
                    onChange={(e) => update("budget_usd", parseFloat(e.target.value) || 0)}
                    hint="Used to flag partially-funded scholarships that may leave a funding gap."
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="font-display font-semibold text-xl text-ink-950">Test scores</h2>
                  <p className="text-sm text-ink-500 -mt-2">Leave any you haven't taken blank — you can add them later.</p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Input
                      label="IELTS (0–9)"
                      type="number"
                      step="0.5"
                      min="0"
                      max="9"
                      value={form.ielts_score ?? ""}
                      onChange={(e) => update("ielts_score", e.target.value ? parseFloat(e.target.value) : null)}
                      placeholder="—"
                    />
                    <Input
                      label="TOEFL (0–120)"
                      type="number"
                      min="0"
                      max="120"
                      value={form.toefl_score ?? ""}
                      onChange={(e) => update("toefl_score", e.target.value ? parseInt(e.target.value) : null)}
                      placeholder="—"
                    />
                    <Input
                      label="GRE (0–340)"
                      type="number"
                      min="0"
                      max="340"
                      value={form.gre_score ?? ""}
                      onChange={(e) => update("gre_score", e.target.value ? parseInt(e.target.value) : null)}
                      placeholder="—"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="font-display font-semibold text-xl text-ink-950">Experience & activities</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Work experience (years)"
                      type="number"
                      step="0.5"
                      min="0"
                      value={form.work_experience_years}
                      onChange={(e) => update("work_experience_years", parseFloat(e.target.value) || 0)}
                    />
                    <Input
                      label="Research experience (years)"
                      type="number"
                      step="0.5"
                      min="0"
                      value={form.research_experience_years}
                      onChange={(e) => update("research_experience_years", parseFloat(e.target.value) || 0)}
                    />
                    <Input
                      label="Research publications"
                      type="number"
                      min="0"
                      value={form.research_publications}
                      onChange={(e) => update("research_publications", parseInt(e.target.value) || 0)}
                    />
                    <Input
                      label="Certifications"
                      type="number"
                      min="0"
                      value={form.certifications_count}
                      onChange={(e) => update("certifications_count", parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ink-700 mb-1.5 block">Extracurricular activities</label>
                    <textarea
                      className="w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-colors min-h-[90px] resize-none"
                      value={form.extracurricular_activities ?? ""}
                      onChange={(e) => update("extracurricular_activities", e.target.value)}
                      placeholder="Leadership roles, clubs, volunteering, competitions..."
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-stamp-red mt-4">
              {error}
            </motion.p>
          )}

          <div className="flex items-center justify-between mt-9">
            <Button variant="ghost" onClick={handleBack} disabled={step === 0} className={step === 0 ? "invisible" : ""}>
              <ArrowLeft size={16} /> Back
            </Button>
            {isLastStep ? (
              <Button onClick={handleSubmit} isLoading={isLoading}>
                Complete Profile <Check size={16} />
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next <ArrowRight size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
