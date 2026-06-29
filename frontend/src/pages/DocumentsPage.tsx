import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, FileText } from "lucide-react";
import { Card } from "../components/ui/Card";
import { documentsApi } from "../lib/api";
import { document_label_map } from "../lib/documentLabels";
import type { DocumentType, UserDocument } from "../types";

const ALL_DOCUMENT_TYPES: DocumentType[] = [
  "passport", "sop", "lor", "resume", "transcript", "ielts_certificate",
  "toefl_certificate", "gre_scorecard", "research_papers", "financial_statement",
  "passport_photo", "recommendation_letter", "portfolio", "medical_certificate", "language_proficiency",
];

export function DocumentsPage() {
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingType, setSavingType] = useState<DocumentType | null>(null);

  useEffect(() => {
    documentsApi.list().then((docs) => {
      setDocuments(docs);
      setIsLoading(false);
    });
  }, []);

  const isAvailable = (type: DocumentType) => documents.find((d) => d.document_type === type)?.is_available ?? false;

  const toggle = async (type: DocumentType) => {
    setSavingType(type);
    const newValue = !isAvailable(type);
    const updated = await documentsApi.upsert({ document_type: type, is_available: newValue });
    setDocuments((prev) => {
      const exists = prev.find((d) => d.document_type === type);
      if (exists) return prev.map((d) => (d.document_type === type ? updated : d));
      return [...prev, updated];
    });
    setSavingType(null);
  };

  const availableCount = ALL_DOCUMENT_TYPES.filter(isAvailable).length;
  const completionPct = Math.round((availableCount / ALL_DOCUMENT_TYPES.length) * 100);

  return (
    <div className="space-y-6 pb-12">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-semibold text-2xl sm:text-3xl text-ink-950">Documents</h1>
        <p className="text-ink-500 mt-1">Mark which documents you already have ready — this powers gap detection for every scholarship.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold text-ink-900 text-sm">Overall completion</h3>
            <span className="font-mono font-bold text-ink-900">{completionPct}%</span>
          </div>
          <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPct}%` }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-teal-500 rounded-full"
            />
          </div>
        </Card>
      </motion.div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 9 }).map((_, i) => <div key={i} className="h-16 skeleton rounded-xl" />)}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ALL_DOCUMENT_TYPES.map((type, i) => {
            const available = isAvailable(type);
            return (
              <motion.button
                key={type}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => toggle(type)}
                disabled={savingType === type}
                className={`relative flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                  available ? "border-teal-300 bg-teal-50" : "border-ink-100 bg-white hover:border-ink-200"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    available ? "bg-teal-500 text-white" : "bg-ink-100 text-ink-400"
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {available ? (
                      <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Check size={18} />
                      </motion.div>
                    ) : (
                      <motion.div key="file" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <FileText size={16} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <span className={`text-sm font-medium ${available ? "text-ink-900" : "text-ink-600"}`}>
                  {document_label_map[type]}
                </span>
                {savingType === type && (
                  <span className="absolute right-3 h-3.5 w-3.5 rounded-full border-2 border-ink-300 border-t-teal-500 animate-spin" />
                )}
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
}
