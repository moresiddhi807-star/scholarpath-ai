import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { TrendingUp, TrendingDown, Lightbulb, RefreshCw } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ReadinessStamp } from "../components/ui/ReadinessStamp";
import { StampSkeleton } from "../components/ui/Skeleton";
import { readinessApi } from "../lib/api";
import type { ReadinessScoreData } from "../types";

export function ReadinessPage() {
  const [readiness, setReadiness] = useState<ReadinessScoreData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecomputing, setIsRecomputing] = useState(false);

  const load = async () => {
    setIsLoading(true);
    const existing = await readinessApi.latest();
    if (existing) {
      setReadiness(existing);
    } else {
      const computed = await readinessApi.compute();
      setReadiness(computed);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleRecompute = async () => {
    setIsRecomputing(true);
    const computed = await readinessApi.compute();
    setReadiness(computed);
    setIsRecomputing(false);
  };

  const radarData = readiness
    ? [
        { subject: "Academic", value: readiness.academic_score, fullMark: 100 },
        { subject: "Language", value: readiness.language_score, fullMark: 100 },
        { subject: "Experience", value: readiness.experience_score, fullMark: 100 },
        { subject: "Documents", value: readiness.documents_score, fullMark: 100 },
      ]
    : [];

  const barData = readiness
    ? [
        { name: "Academic", score: readiness.academic_score },
        { name: "Language", score: readiness.language_score },
        { name: "Experience", score: readiness.experience_score },
        { name: "Documents", score: readiness.documents_score },
      ]
    : [];

  return (
    <div className="space-y-6 pb-12">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-semibold text-2xl sm:text-3xl text-ink-950">Scholarship Readiness Score</h1>
          <p className="text-ink-500 mt-1">Your general profile strength across all scholarship criteria.</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleRecompute} isLoading={isRecomputing}>
          <RefreshCw size={14} /> Recompute
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="p-6 h-full flex flex-col items-center justify-center text-center">
            {isLoading || !readiness ? <StampSkeleton size={180} /> : <ReadinessStamp score={readiness.overall_score} size={180} />}
            <p className="text-sm text-ink-500 mt-4 max-w-[220px]">
              Weighted across academics (30%), language (25%), experience (20%), and documents (25%).
            </p>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
          <Card className="p-6 h-full">
            <h3 className="font-display font-semibold text-ink-900 mb-4">Score Breakdown</h3>
            {!isLoading && readiness && (
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="var(--color-ink-100)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--color-ink-500)", fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "var(--color-ink-300)", fontSize: 10 }} />
                  <Radar name="Score" dataKey="value" stroke="var(--color-teal-500)" fill="var(--color-teal-400)" fillOpacity={0.35} />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card className="p-6">
          <h3 className="font-display font-semibold text-ink-900 mb-4">Sub-scores</h3>
          {!isLoading && readiness && (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid horizontal={false} stroke="var(--color-ink-100)" />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: "var(--color-ink-400)", fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fill: "var(--color-ink-700)", fontSize: 12 }} width={80} />
                <Tooltip
                  cursor={{ fill: "var(--color-ink-50)" }}
                  contentStyle={{ borderRadius: 12, border: "1px solid var(--color-ink-100)", fontSize: 12 }}
                />
                <Bar dataKey="score" fill="var(--color-teal-500)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-6 h-full">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={18} className="text-teal-500" />
              <h3 className="font-display font-semibold text-ink-900 text-sm">Strengths</h3>
            </div>
            <ul className="space-y-2.5">
              {readiness?.strengths.map((s, i) => (
                <li key={i} className="text-sm text-ink-600 leading-snug">• {s}</li>
              ))}
              {!readiness?.strengths.length && <li className="text-sm text-ink-300">None identified yet.</li>}
            </ul>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card className="p-6 h-full">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown size={18} className="text-stamp-red" />
              <h3 className="font-display font-semibold text-ink-900 text-sm">Weaknesses</h3>
            </div>
            <ul className="space-y-2.5">
              {readiness?.weaknesses.map((w, i) => (
                <li key={i} className="text-sm text-ink-600 leading-snug">• {w}</li>
              ))}
              {!readiness?.weaknesses.length && <li className="text-sm text-ink-300">None identified.</li>}
            </ul>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="p-6 h-full">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={18} className="text-amber-500" />
              <h3 className="font-display font-semibold text-ink-900 text-sm">Suggestions</h3>
            </div>
            <ul className="space-y-2.5">
              {readiness?.suggestions.map((s, i) => (
                <li key={i} className="text-sm text-ink-600 leading-snug">• {s}</li>
              ))}
              {!readiness?.suggestions.length && <li className="text-sm text-ink-300">Nothing to suggest right now.</li>}
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
