import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, CalendarClock, ArrowRight } from "lucide-react";
import { Card } from "./Card";
import { Badge, eligibilityBadgeVariant, eligibilityLabel } from "./Badge";
import type { ScholarshipMatch } from "../../types";

function formatDeadline(deadline: string | null) {
  if (!deadline) return "Rolling";
  return new Date(deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function ScholarshipMatchCard({ match, index = 0 }: { match: ScholarshipMatch; index?: number }) {
  const navigate = useNavigate();

  const ringColor =
    match.match_percentage >= 80 ? "var(--color-teal-500)" : match.match_percentage >= 50 ? "var(--color-amber-500)" : "var(--color-ink-300)";
  const circumference = 2 * Math.PI * 19;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
    >
      <Card
        className="p-5 cursor-pointer hover:border-ink-200 hover:shadow-[0_12px_28px_rgba(11,17,32,0.08)] transition-all duration-300"
        onClick={() => navigate(`/dashboard/scholarships/${match.id}`)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <Badge variant={match.funding_type === "fully_funded" ? "teal" : "amber"}>
                {match.funding_type === "fully_funded" ? "Fully Funded" : "Partially Funded"}
              </Badge>
              <Badge variant={eligibilityBadgeVariant(match.eligibility_status)}>
                {eligibilityLabel(match.eligibility_status)}
              </Badge>
            </div>
            <h3 className="font-display font-semibold text-lg text-ink-900 truncate">{match.name}</h3>
            <div className="flex items-center gap-4 mt-1.5 text-xs text-ink-400">
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {match.country}
              </span>
              <span className="flex items-center gap-1">
                <CalendarClock size={12} /> {formatDeadline(match.deadline)}
              </span>
            </div>
            <p className="text-sm text-ink-500 mt-3 line-clamp-2">{match.description}</p>
          </div>

          {/* Mini match ring */}
          <div className="relative shrink-0 flex flex-col items-center">
            <svg width="48" height="48" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="19" fill="none" stroke="var(--color-ink-100)" strokeWidth="5" />
              <motion.circle
                cx="24"
                cy="24"
                r="19"
                fill="none"
                stroke={ringColor}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset: circumference - (match.match_percentage / 100) * circumference }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                transform="rotate(-90 24 24)"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xs text-ink-900">
              {match.match_percentage}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end mt-4 pt-4 border-t border-ink-100">
          <span className="text-sm font-medium text-teal-600 inline-flex items-center gap-1">
            View details <ArrowRight size={14} />
          </span>
        </div>
      </Card>
    </motion.div>
  );
}
