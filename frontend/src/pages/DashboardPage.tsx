import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, FileCheck2, CalendarClock, Map, GraduationCap } from "lucide-react";
import { ReadinessStamp } from "../components/ui/ReadinessStamp";
import { StampSkeleton, CardSkeleton } from "../components/ui/Skeleton";
import { Badge, eligibilityBadgeVariant, eligibilityLabel } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { dashboardApi, readinessApi } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import type { DashboardSummary } from "../types";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06 } }),
};

export function DashboardPage() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isComputing, setIsComputing] = useState(false);

  const load = async () => {
    setIsLoading(true);
    const data = await dashboardApi.summary();
    setSummary(data);
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleComputeReadiness = async () => {
    setIsComputing(true);
    await readinessApi.compute();
    await load();
    setIsComputing(false);
  };

  const firstName = user?.full_name?.split(" ")[0];

  return (
    <div className="space-y-8 pb-12">
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
        <h1 className="font-display font-semibold text-2xl sm:text-3xl text-ink-950">
          Welcome back, {firstName} 👋
        </h1>
        <p className="text-ink-500 mt-1">Here's where your scholarship journey stands today.</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Readiness widget */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="lg:col-span-1">
          <Card className="p-6 h-full flex flex-col items-center justify-center text-center gap-4">
            <h3 className="font-display font-semibold text-ink-900 self-start">Readiness Score</h3>
            {isLoading ? (
              <StampSkeleton size={150} />
            ) : summary?.readiness ? (
              <ReadinessStamp score={summary.readiness.overall_score} size={150} />
            ) : (
              <div className="py-4">
                <p className="text-sm text-ink-500 mb-4">You haven't computed your readiness score yet.</p>
                <Button size="sm" onClick={handleComputeReadiness} isLoading={isComputing}>
                  Compute Now
                </Button>
              </div>
            )}
            {summary?.readiness && (
              <Link to="/dashboard/readiness" className="text-sm font-medium text-teal-600 hover:text-teal-700 inline-flex items-center gap-1">
                View full breakdown <ArrowRight size={14} />
              </Link>
            )}
          </Card>
        </motion.div>

        {/* Top matches widget */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="lg:col-span-2">
          <Card className="p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-ink-900">Top Scholarship Matches</h3>
              <Link to="/dashboard/scholarships" className="text-sm font-medium text-teal-600 hover:text-teal-700 inline-flex items-center gap-1">
                See all <ArrowRight size={14} />
              </Link>
            </div>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => <div key={i} className="h-14 skeleton rounded-xl" />)}
              </div>
            ) : summary?.top_matches.length ? (
              <div className="space-y-2">
                {summary.top_matches.map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-ink-50 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-ink-900 truncate">{m.name}</p>
                      <p className="text-xs text-ink-400">{m.country}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge variant={eligibilityBadgeVariant(m.eligibility_status)}>{eligibilityLabel(m.eligibility_status)}</Badge>
                      <span className="font-mono font-bold text-sm text-ink-900 w-12 text-right">{m.match_percentage}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-ink-400 py-6 text-center">No matches yet — complete your profile to see scholarships.</p>
            )}
          </Card>
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Missing documents widget */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
          <Card className="p-6 h-full">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <FileCheck2 size={18} />
              </span>
              <h3 className="font-display font-semibold text-ink-900 text-sm">Documents on File</h3>
            </div>
            {isLoading ? (
              <CardSkeleton />
            ) : (
              <>
                <p className="text-3xl font-bold font-mono text-ink-900">{summary?.documents_available_count ?? 0}</p>
                <p className="text-xs text-ink-400 mt-1 mb-4">documents marked available</p>
                <Link to="/dashboard/documents">
                  <Button size="sm" variant="outline" className="w-full">
                    Manage Documents
                  </Button>
                </Link>
              </>
            )}
          </Card>
        </motion.div>

        {/* Upcoming deadlines widget */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}>
          <Card className="p-6 h-full">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                <CalendarClock size={18} />
              </span>
              <h3 className="font-display font-semibold text-ink-900 text-sm">Upcoming Deadlines</h3>
            </div>
            {isLoading ? (
              <CardSkeleton />
            ) : summary?.upcoming_deadlines.length ? (
              <ul className="space-y-2.5">
                {summary.upcoming_deadlines.slice(0, 3).map((d) => (
                  <li key={d.id} className="flex items-center justify-between text-sm">
                    <span className="text-ink-700 truncate pr-2">{d.name}</span>
                    <span className="font-mono text-xs text-ink-400 shrink-0">{new Date(d.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-400 py-2">No upcoming deadlines among your top matches.</p>
            )}
          </Card>
        </motion.div>

        {/* Roadmap progress widget */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}>
          <Card className="p-6 h-full">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-100 text-ink-700">
                <Map size={18} />
              </span>
              <h3 className="font-display font-semibold text-ink-900 text-sm">Roadmap Progress</h3>
            </div>
            {isLoading ? (
              <CardSkeleton />
            ) : summary?.roadmaps.length ? (
              <div className="space-y-3">
                {summary.roadmaps.slice(0, 2).map((r) => (
                  <div key={r.id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-ink-600 truncate pr-2">{r.scholarship_name}</span>
                      <span className="font-mono text-ink-400">{r.completed_steps}/{r.total_steps}</span>
                    </div>
                    <div className="h-1.5 bg-ink-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${r.progress_percentage}%` }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-teal-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className="text-sm text-ink-400 mb-3">No roadmap yet.</p>
                <Link to="/dashboard/scholarships">
                  <Button size="sm" variant="outline" className="w-full">
                    <GraduationCap size={14} /> Pick a Scholarship
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
