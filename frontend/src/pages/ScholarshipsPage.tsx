import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { ScholarshipMatchCard } from "../components/ui/ScholarshipMatchCard";
import { CardSkeleton } from "../components/ui/Skeleton";
import { Select } from "../components/ui/Input";
import { scholarshipsApi } from "../lib/api";
import type { ScholarshipMatch } from "../types";

const FUNDING_OPTIONS = [
  { value: "", label: "All funding types" },
  { value: "fully_funded", label: "Fully Funded" },
  { value: "partially_funded", label: "Partially Funded" },
];

const ELIGIBILITY_OPTIONS = [
  { value: "", label: "All eligibility" },
  { value: "eligible", label: "Eligible" },
  { value: "partially_eligible", label: "Partial Match" },
  { value: "not_eligible", label: "Not Eligible" },
];

export function ScholarshipsPage() {
  const [matches, setMatches] = useState<ScholarshipMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [fundingFilter, setFundingFilter] = useState("");
  const [eligibilityFilter, setEligibilityFilter] = useState("");

  useEffect(() => {
    scholarshipsApi.matches().then((data) => {
      setMatches(data);
      setIsLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return matches.filter((m) => {
      if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.country.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (fundingFilter && m.funding_type !== fundingFilter) return false;
      if (eligibilityFilter && m.eligibility_status !== eligibilityFilter) return false;
      return true;
    });
  }, [matches, search, fundingFilter, eligibilityFilter]);

  return (
    <div className="space-y-6 pb-12">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-semibold text-2xl sm:text-3xl text-ink-950">Your Scholarship Matches</h1>
        <p className="text-ink-500 mt-1">Ranked by how well each scholarship fits your profile.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by scholarship or country..."
            className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-colors"
          />
        </div>
        <div className="flex gap-3">
          <Select value={fundingFilter} onChange={(e) => setFundingFilter(e.target.value)} className="min-w-[170px]">
            {FUNDING_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </Select>
          <Select value={eligibilityFilter} onChange={(e) => setEligibilityFilter(e.target.value)} className="min-w-[170px]">
            {ELIGIBILITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </Select>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : filtered.length ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((m, i) => (
            <ScholarshipMatchCard key={m.id} match={m} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <SlidersHorizontal className="mx-auto text-ink-300 mb-3" size={32} />
          <p className="text-ink-500">No scholarships match your current filters.</p>
        </div>
      )}
    </div>
  );
}
