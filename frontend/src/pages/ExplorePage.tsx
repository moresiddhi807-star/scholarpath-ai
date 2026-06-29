import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, CalendarClock } from "lucide-react";
import { PublicNavbar } from "../components/layout/PublicNavbar";
import { Footer } from "../components/landing/CtaAndFooter";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { CardSkeleton } from "../components/ui/Skeleton";
import { Select } from "../components/ui/Input";
import { scholarshipsApi } from "../lib/api";
import type { Scholarship } from "../types";

function formatDeadline(deadline: string | null) {
  if (!deadline) return "Rolling";
  return new Date(deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function ExplorePage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [funding, setFunding] = useState("");

  useEffect(() => {
    Promise.all([scholarshipsApi.list(), scholarshipsApi.countries()]).then(([s, c]) => {
      setScholarships(s);
      setCountries(c);
      setIsLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return scholarships.filter((s) => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (country && s.country !== country) return false;
      if (funding && s.funding_type !== funding) return false;
      return true;
    });
  }, [scholarships, search, country, funding]);

  return (
    <div className="min-h-screen bg-paper-50">
      <PublicNavbar />
      <div className="pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-display font-semibold text-3xl sm:text-4xl text-ink-950">Explore Scholarships</h1>
          <p className="text-ink-500 mt-2 max-w-xl">
            Browse our full catalog of {scholarships.length || "58+"} global scholarships. Sign up to see your personalized match score for each one.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search scholarships..."
              className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-colors"
            />
          </div>
          <Select value={country} onChange={(e) => setCountry(e.target.value)} className="min-w-[180px]">
            <option value="">All countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
          <Select value={funding} onChange={(e) => setFunding(e.target.value)} className="min-w-[180px]">
            <option value="">All funding types</option>
            <option value="fully_funded">Fully Funded</option>
            <option value="partially_funded">Partially Funded</option>
          </Select>
        </motion.div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
              >
                <Card className="p-5 h-full flex flex-col hover:shadow-[0_12px_28px_rgba(11,17,32,0.08)] hover:border-ink-200 transition-all duration-300">
                  <Badge variant={s.funding_type === "fully_funded" ? "teal" : "amber"} className="self-start mb-3">
                    {s.funding_type === "fully_funded" ? "Fully Funded" : "Partially Funded"}
                  </Badge>
                  <h3 className="font-display font-semibold text-ink-900 leading-snug mb-2">{s.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-ink-400 mb-3">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {s.country}</span>
                    <span className="flex items-center gap-1"><CalendarClock size={12} /> {formatDeadline(s.deadline)}</span>
                  </div>
                  <p className="text-sm text-ink-500 line-clamp-3 flex-1">{s.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
