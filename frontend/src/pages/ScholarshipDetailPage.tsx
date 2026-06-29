import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, CalendarClock, ExternalLink, CheckCircle2, XCircle, Gauge, Map as MapIcon } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge, eligibilityBadgeVariant, eligibilityLabel } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { ReadinessStamp } from "../components/ui/ReadinessStamp";
import { scholarshipsApi, documentsApi, readinessApi, roadmapsApi } from "../lib/api";
import type { Scholarship, ScholarshipMatch, DocumentGapReport, ReadinessScoreData } from "../types";

function formatDeadline(deadline: string | null) {
  if (!deadline) return "Rolling admission";
  return new Date(deadline).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function ScholarshipDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scholarshipId = Number(id);

  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [match, setMatch] = useState<ScholarshipMatch | null>(null);
  const [gap, setGap] = useState<DocumentGapReport | null>(null);
  const [readiness, setReadiness] = useState<ReadinessScoreData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const [roadmapGenerated, setRoadmapGenerated] = useState(false);

  useEffect(() => {
    if (!scholarshipId) return;
    Promise.all([
      scholarshipsApi.get(scholarshipId),
      scholarshipsApi.match(scholarshipId),
      documentsApi.gap(scholarshipId),
      readinessApi.compute(scholarshipId),
    ]).then(([s, m, g, r]) => {
      setScholarship(s);
      setMatch(m);
      setGap(g);
      setReadiness(r);
      setIsLoading(false);
    });
  }, [scholarshipId]);

  const handleGenerateRoadmap = async () => {
    setIsGeneratingRoadmap(true);
    await roadmapsApi.generate(scholarshipId);
    setIsGeneratingRoadmap(false);
    setRoadmapGenerated(true);
  };

  if (isLoading || !scholarship || !match) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-40 skeleton rounded-lg" />
        <div className="h-48 skeleton rounded-2xl" />
        <div className="h-64 skeleton rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 transition-colors">
        <ArrowLeft size={16} /> Back
      </button>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <Badge variant={scholarship.funding_type === "fully_funded" ? "teal" : "amber"}>
            {scholarship.funding_type === "fully_funded" ? "Fully Funded" : "Partially Funded"}
          </Badge>
          <Badge variant={eligibilityBadgeVariant(match.eligibility_status)}>{eligibilityLabel(match.eligibility_status)}</Badge>
          <Badge variant="outline">{scholarship.degree_level === "any" ? "Any Degree Level" : scholarship.degree_level}</Badge>
        </div>
        <h1 className="font-display font-semibold text-3xl text-ink-950">{scholarship.name}</h1>
        <div className="flex items-center gap-5 mt-3 text-sm text-ink-500">
          <span className="flex items-center gap-1.5"><MapPin size={15} /> {scholarship.country}</span>
          <span className="flex items-center gap-1.5"><CalendarClock size={15} /> {formatDeadline(scholarship.deadline)}</span>
          {scholarship.official_link && (
            <a href={scholarship.official_link} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-teal-600 hover:text-teal-700">
              Official site <ExternalLink size={13} />
            </a>
          )}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Match + readiness summary */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="p-6 flex flex-col items-center text-center gap-3">
            <ReadinessStamp score={match.match_percentage} size={140} label="MATCH" />
            {readiness && (
              <p className="text-xs text-ink-400">
                Readiness for this scholarship: <span className="font-mono font-semibold text-ink-700">{readiness.overall_score}%</span>
              </p>
            )}
            {match.gap_reasons.length > 0 && (
              <div className="w-full text-left mt-2">
                <p className="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-2">Why not higher?</p>
                <ul className="space-y-1.5">
                  {match.gap_reasons.map((reason, i) => (
                    <li key={i} className="text-xs text-ink-600 flex items-start gap-1.5">
                      <XCircle size={13} className="text-stamp-red shrink-0 mt-0.5" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Description + benefits */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
          <Card className="p-6 h-full">
            <h3 className="font-display font-semibold text-ink-900 mb-2">About this scholarship</h3>
            <p className="text-sm text-ink-600 leading-relaxed mb-5">{scholarship.description}</p>
            <h3 className="font-display font-semibold text-ink-900 mb-2">Benefits</h3>
            <p className="text-sm text-ink-600 leading-relaxed mb-5">{scholarship.benefits}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-ink-100 text-sm">
              <div>
                <p className="text-ink-400 text-xs mb-1">Min. CGPA</p>
                <p className="font-mono font-semibold text-ink-900">{scholarship.min_cgpa.toFixed(1)}</p>
              </div>
              {scholarship.ielts_requirement && (
                <div>
                  <p className="text-ink-400 text-xs mb-1">IELTS</p>
                  <p className="font-mono font-semibold text-ink-900">{scholarship.ielts_requirement.toFixed(1)}</p>
                </div>
              )}
              {scholarship.requires_work_experience && (
                <div>
                  <p className="text-ink-400 text-xs mb-1">Work Exp.</p>
                  <p className="font-mono font-semibold text-ink-900">{scholarship.min_work_experience_years}+ yrs</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Document gap */}
      {gap && (
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-semibold text-ink-900">Document Checklist</h3>
              <span className="font-mono text-sm font-semibold text-ink-700">{gap.completion_percentage}% complete</span>
            </div>
            <div className="h-2 bg-ink-100 rounded-full overflow-hidden mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${gap.completion_percentage}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-teal-500 rounded-full"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
              {gap.available.map((d) => (
                <div key={d.document_type} className="flex items-center gap-2 text-sm text-ink-700">
                  <CheckCircle2 size={16} className="text-teal-500 shrink-0" /> {d.label}
                </div>
              ))}
              {gap.missing.map((d) => (
                <div key={d.document_type} className="flex items-center gap-2 text-sm text-ink-400">
                  <XCircle size={16} className="text-stamp-red/60 shrink-0" /> {d.label}
                  {d.is_mandatory && <span className="text-[10px] text-stamp-red font-semibold">REQUIRED</span>}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* CTA: generate roadmap */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-ink-950 border-none">
          <div className="text-center sm:text-left">
            <h3 className="font-display font-semibold text-paper-50 flex items-center justify-center sm:justify-start gap-2">
              <Gauge size={18} className="text-teal-400" /> Ready to plan your application?
            </h3>
            <p className="text-sm text-ink-300 mt-1">Generate a personalized step-by-step roadmap for {scholarship.name}.</p>
          </div>
          {roadmapGenerated ? (
            <Button variant="secondary" onClick={() => navigate("/dashboard/roadmap")}>
              <MapIcon size={16} /> View Roadmap
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleGenerateRoadmap} isLoading={isGeneratingRoadmap}>
              <MapIcon size={16} /> Generate Roadmap
            </Button>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
