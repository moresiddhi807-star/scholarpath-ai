import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Circle, Clock, Map as MapIcon } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Select } from "../components/ui/Input";
import { roadmapsApi } from "../lib/api";
import type { Roadmap } from "../types";

export function RoadmapPage() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingStepId, setUpdatingStepId] = useState<number | null>(null);

  useEffect(() => {
    roadmapsApi.list().then((data) => {
      setRoadmaps(data);
      if (data.length) setSelectedId(data[0].id);
      setIsLoading(false);
    });
  }, []);

  const selected = roadmaps.find((r) => r.id === selectedId);

  const toggleStep = async (stepId: number, current: boolean) => {
    setUpdatingStepId(stepId);
    const updated = await roadmapsApi.updateStep(stepId, !current);
    setRoadmaps((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setUpdatingStepId(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 skeleton rounded-lg" />
        <div className="h-96 skeleton rounded-2xl" />
      </div>
    );
  }

  if (!roadmaps.length) {
    return (
      <div className="text-center py-24">
        <MapIcon className="mx-auto text-ink-300 mb-4" size={40} />
        <h2 className="font-display font-semibold text-xl text-ink-900 mb-2">No roadmap yet</h2>
        <p className="text-ink-500 max-w-md mx-auto">
          Open any scholarship from your matches and generate a personalized roadmap to see your step-by-step plan here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-semibold text-2xl sm:text-3xl text-ink-950">Your Roadmap</h1>
          <p className="text-ink-500 mt-1">A step-by-step plan tailored to your target scholarship.</p>
        </div>
        {roadmaps.length > 1 && (
          <Select value={selectedId ?? ""} onChange={(e) => setSelectedId(Number(e.target.value))} className="min-w-[220px]">
            {roadmaps.map((r) => (
              <option key={r.id} value={r.id}>{r.scholarship_name}</option>
            ))}
          </Select>
        )}
      </motion.div>

      {selected && (
        <>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Card className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-display font-semibold text-ink-900">{selected.scholarship_name}</h3>
                  <p className="text-xs text-ink-400 mt-0.5 flex items-center gap-1.5">
                    <Clock size={12} /> Est. {selected.total_estimated_days} days total
                  </p>
                </div>
                <span className="font-mono font-bold text-lg text-ink-900">{selected.progress_percentage}%</span>
              </div>
              <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${selected.progress_percentage}%` }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
                />
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-6 sm:p-8">
              <div className="relative">
                <div className="absolute left-[19px] top-2 bottom-2 w-px bg-ink-100" />
                <div className="space-y-1">
                  {selected.steps.map((step, i) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="relative flex gap-4 py-3.5 group"
                    >
                      <button
                        onClick={() => toggleStep(step.id, step.is_complete)}
                        disabled={updatingStepId === step.id}
                        className={`relative z-10 shrink-0 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          step.is_complete
                            ? "bg-teal-500 border-teal-500 text-white"
                            : "bg-white border-ink-200 text-ink-300 group-hover:border-teal-400"
                        }`}
                      >
                        {updatingStepId === step.id ? (
                          <span className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                        ) : step.is_complete ? (
                          <Check size={18} />
                        ) : (
                          <Circle size={14} />
                        )}
                      </button>
                      <div className="flex-1 pt-1.5 pb-1">
                        <div className="flex items-center justify-between gap-3">
                          <h4 className={`text-sm font-semibold ${step.is_complete ? "text-ink-400 line-through" : "text-ink-900"}`}>
                            {step.title}
                          </h4>
                          <span className="font-mono text-xs text-ink-400 shrink-0">{step.estimated_days}d</span>
                        </div>
                        <p className={`text-sm mt-1 leading-relaxed ${step.is_complete ? "text-ink-300" : "text-ink-500"}`}>
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </div>
  );
}
