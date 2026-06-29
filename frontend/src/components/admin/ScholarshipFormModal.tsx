import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Input, Select } from "../ui/Input";
import { Button } from "../ui/Button";
import { document_label_map } from "../../lib/documentLabels";
import type { DocumentType, FundingType, Scholarship } from "../../types";

const ALL_DOCUMENT_TYPES = Object.keys(document_label_map) as DocumentType[];

export interface ScholarshipFormValues {
  name: string;
  country: string;
  funding_type: FundingType;
  degree_level: string;
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
  required_documents: DocumentType[];
}

export function ScholarshipFormModal({
  initial,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  initial?: Scholarship | null;
  onClose: () => void;
  onSubmit: (values: ScholarshipFormValues) => void;
  isSubmitting: boolean;
}) {
  const [form, setForm] = useState<ScholarshipFormValues>({
    name: initial?.name ?? "",
    country: initial?.country ?? "",
    funding_type: initial?.funding_type ?? "fully_funded",
    degree_level: initial?.degree_level ?? "masters",
    min_cgpa: initial?.min_cgpa ?? 7,
    ielts_requirement: initial?.ielts_requirement ?? null,
    toefl_requirement: initial?.toefl_requirement ?? null,
    gre_requirement: initial?.gre_requirement ?? null,
    requires_research: initial?.requires_research ?? false,
    requires_work_experience: initial?.requires_work_experience ?? false,
    min_work_experience_years: initial?.min_work_experience_years ?? 0,
    deadline: initial?.deadline ?? null,
    benefits: initial?.benefits ?? "",
    description: initial?.description ?? "",
    official_link: initial?.official_link ?? null,
    max_budget_usd: initial?.max_budget_usd ?? null,
    required_documents: initial?.requirements.map((r) => r.document_type) ?? ["passport", "sop", "lor", "resume", "transcript"],
  });

  const update = <K extends keyof ScholarshipFormValues>(key: K, value: ScholarshipFormValues[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleDoc = (doc: DocumentType) => {
    setForm((f) => ({
      ...f,
      required_documents: f.required_documents.includes(doc)
        ? f.required_documents.filter((d) => d !== doc)
        : [...f.required_documents, doc],
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-ink-950/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100 sticky top-0 bg-white z-10">
          <h2 className="font-display font-semibold text-lg text-ink-900">
            {initial ? "Edit Scholarship" : "Add Scholarship"}
          </h2>
          <button onClick={onClose} className="p-1.5 text-ink-400 hover:text-ink-900 rounded-lg hover:bg-ink-100">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Name" required value={form.name} onChange={(e) => update("name", e.target.value)} />
            <Input label="Country" required value={form.country} onChange={(e) => update("country", e.target.value)} />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Select label="Funding type" value={form.funding_type} onChange={(e) => update("funding_type", e.target.value as FundingType)}>
              <option value="fully_funded">Fully Funded</option>
              <option value="partially_funded">Partially Funded</option>
            </Select>
            <Select label="Degree level" value={form.degree_level} onChange={(e) => update("degree_level", e.target.value)}>
              <option value="undergraduate">Undergraduate</option>
              <option value="masters">Master's</option>
              <option value="phd">PhD</option>
              <option value="postdoc">Postdoc</option>
              <option value="any">Any</option>
            </Select>
            <Input
              label="Min CGPA"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={form.min_cgpa}
              onChange={(e) => update("min_cgpa", parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Input
              label="IELTS requirement"
              type="number"
              step="0.5"
              value={form.ielts_requirement ?? ""}
              onChange={(e) => update("ielts_requirement", e.target.value ? parseFloat(e.target.value) : null)}
            />
            <Input
              label="Deadline"
              type="date"
              value={form.deadline ?? ""}
              onChange={(e) => update("deadline", e.target.value || null)}
            />
            <Input
              label="Max program cost (USD)"
              type="number"
              value={form.max_budget_usd ?? ""}
              onChange={(e) => update("max_budget_usd", e.target.value ? parseFloat(e.target.value) : null)}
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-ink-700">
              <input type="checkbox" checked={form.requires_research} onChange={(e) => update("requires_research", e.target.checked)} className="rounded" />
              Requires research experience
            </label>
            <label className="flex items-center gap-2 text-sm text-ink-700">
              <input
                type="checkbox"
                checked={form.requires_work_experience}
                onChange={(e) => update("requires_work_experience", e.target.checked)}
                className="rounded"
              />
              Requires work experience
            </label>
          </div>

          <Input label="Official link" type="url" value={form.official_link ?? ""} onChange={(e) => update("official_link", e.target.value)} />

          <div>
            <label className="text-sm font-medium text-ink-700 mb-1.5 block">Description</label>
            <textarea
              required
              className="w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 min-h-[80px] resize-none"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-ink-700 mb-1.5 block">Benefits</label>
            <textarea
              required
              className="w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 min-h-[60px] resize-none"
              value={form.benefits}
              onChange={(e) => update("benefits", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-ink-700 mb-2 block">Required documents</label>
            <div className="grid sm:grid-cols-2 gap-2">
              {ALL_DOCUMENT_TYPES.map((doc) => (
                <label key={doc} className="flex items-center gap-2 text-sm text-ink-600">
                  <input type="checkbox" checked={form.required_documents.includes(doc)} onChange={() => toggleDoc(doc)} className="rounded" />
                  {document_label_map[doc]}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-ink-100">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" isLoading={isSubmitting}>{initial ? "Save Changes" : "Add Scholarship"}</Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
