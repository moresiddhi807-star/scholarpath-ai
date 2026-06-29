import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { ScholarshipFormModal, type ScholarshipFormValues } from "../../components/admin/ScholarshipFormModal";
import { adminApi } from "../../lib/api";
import type { Scholarship } from "../../types";

export function AdminScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Scholarship | null | "new">(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const load = async () => {
    setIsLoading(true);
    const data = await adminApi.listScholarships();
    setScholarships(data);
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = scholarships.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.country.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (values: ScholarshipFormValues) => {
    setIsSubmitting(true);
    const payload = { ...values, required_documents: values.required_documents, optional_documents: [] };
    if (editing && editing !== "new") {
      await adminApi.updateScholarship(editing.id, payload);
    } else {
      await adminApi.createScholarship(payload);
    }
    setIsSubmitting(false);
    setEditing(null);
    load();
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    await adminApi.deleteScholarship(id);
    setScholarships((prev) => prev.filter((s) => s.id !== id));
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-semibold text-2xl text-ink-950">Manage Scholarships</h1>
          <p className="text-ink-500 mt-1 text-sm">{scholarships.length} scholarships in the catalog.</p>
        </div>
        <Button onClick={() => setEditing("new")}>
          <Plus size={16} /> Add Scholarship
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search scholarships..."
          className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        />
      </div>

      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-12 skeleton rounded-lg" />)}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs text-ink-400 uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Country</th>
                <th className="px-5 py-3 font-medium">Funding</th>
                <th className="px-5 py-3 font-medium">Degree</th>
                <th className="px-5 py-3 font-medium">Deadline</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-ink-50 hover:bg-ink-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-ink-900 max-w-xs truncate">{s.name}</td>
                  <td className="px-5 py-3.5 text-ink-500">{s.country}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={s.funding_type === "fully_funded" ? "teal" : "amber"}>
                      {s.funding_type === "fully_funded" ? "Full" : "Partial"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-ink-500 capitalize">{s.degree_level}</td>
                  <td className="px-5 py-3.5 text-ink-500 font-mono text-xs">{s.deadline ?? "Rolling"}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => setEditing(s)} className="p-2 text-ink-400 hover:text-ink-900 hover:bg-ink-100 rounded-lg transition-colors">
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        disabled={deletingId === s.id}
                        className="p-2 text-ink-400 hover:text-stamp-red hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <AnimatePresence>
        {editing && (
          <ScholarshipFormModal
            initial={editing === "new" ? null : editing}
            onClose={() => setEditing(null)}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
