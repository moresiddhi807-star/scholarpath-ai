import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Save, User as UserIcon } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Input, Select } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { authApi } from "../lib/api";
import type { DegreeLevel } from "../types";

export function ProfilePage() {
  const { user, setUser } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    full_name: user?.full_name ?? "",
    degree_level: (user?.degree_level ?? "masters") as DegreeLevel,
    branch: user?.branch ?? "",
    current_cgpa: user?.current_cgpa ?? 0,
    graduation_year: user?.graduation_year ?? new Date().getFullYear(),
    country_preference: user?.country_preference ?? "",
    budget_usd: user?.budget_usd ?? 0,
    ielts_score: user?.ielts_score ?? undefined,
    toefl_score: user?.toefl_score ?? undefined,
    gre_score: user?.gre_score ?? undefined,
    work_experience_years: user?.work_experience_years ?? 0,
    research_experience_years: user?.research_experience_years ?? 0,
    research_publications: user?.research_publications ?? 0,
    certifications_count: user?.certifications_count ?? 0,
    extracurricular_activities: user?.extracurricular_activities ?? "",
  });

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaved(false);
    const updated = await authApi.updateProfile(form);
    setUser(updated);
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-semibold text-2xl sm:text-3xl text-ink-950">Profile</h1>
        <p className="text-ink-500 mt-1">Keep your details current — every tool on the platform uses this profile.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-7 pb-7 border-b border-ink-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-700 font-display font-semibold text-lg">
              <UserIcon size={24} />
            </div>
            <div>
              <p className="font-semibold text-ink-900">{user?.email}</p>
              <p className="text-xs text-ink-400">{user?.role === "admin" ? "Administrator" : "Student"} account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <h3 className="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-3">Basic Info</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Full name" value={form.full_name} onChange={(e) => update("full_name", e.target.value)} />
                <Select label="Degree level" value={form.degree_level} onChange={(e) => update("degree_level", e.target.value as DegreeLevel)}>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="masters">Master's</option>
                  <option value="phd">PhD</option>
                  <option value="postdoc">Postdoc</option>
                </Select>
                <Input label="Field of study" value={form.branch} onChange={(e) => update("branch", e.target.value)} />
                <Input
                  label="Current CGPA"
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
                  value={form.graduation_year}
                  onChange={(e) => update("graduation_year", parseInt(e.target.value) || 0)}
                />
                <Input
                  label="Country preference"
                  value={form.country_preference}
                  onChange={(e) => update("country_preference", e.target.value)}
                />
                <Input
                  label="Budget (USD)"
                  type="number"
                  value={form.budget_usd}
                  onChange={(e) => update("budget_usd", parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-3">Test Scores</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <Input
                  label="IELTS"
                  type="number"
                  step="0.5"
                  value={form.ielts_score ?? ""}
                  onChange={(e) => update("ielts_score", e.target.value ? parseFloat(e.target.value) : undefined)}
                />
                <Input
                  label="TOEFL"
                  type="number"
                  value={form.toefl_score ?? ""}
                  onChange={(e) => update("toefl_score", e.target.value ? parseInt(e.target.value) : undefined)}
                />
                <Input
                  label="GRE"
                  type="number"
                  value={form.gre_score ?? ""}
                  onChange={(e) => update("gre_score", e.target.value ? parseInt(e.target.value) : undefined)}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-3">Experience</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Work experience (years)"
                  type="number"
                  step="0.5"
                  value={form.work_experience_years}
                  onChange={(e) => update("work_experience_years", parseFloat(e.target.value) || 0)}
                />
                <Input
                  label="Research experience (years)"
                  type="number"
                  step="0.5"
                  value={form.research_experience_years}
                  onChange={(e) => update("research_experience_years", parseFloat(e.target.value) || 0)}
                />
                <Input
                  label="Research publications"
                  type="number"
                  value={form.research_publications}
                  onChange={(e) => update("research_publications", parseInt(e.target.value) || 0)}
                />
                <Input
                  label="Certifications"
                  type="number"
                  value={form.certifications_count}
                  onChange={(e) => update("certifications_count", parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium text-ink-700 mb-1.5 block">Extracurricular activities</label>
                <textarea
                  className="w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-colors min-h-[90px] resize-none"
                  value={form.extracurricular_activities}
                  onChange={(e) => update("extracurricular_activities", e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" isLoading={isSaving}>
                <Save size={16} /> Save Changes
              </Button>
              {saved && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-teal-600 font-medium">
                  Saved!
                </motion.span>
              )}
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
