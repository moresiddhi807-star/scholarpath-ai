import { motion } from "framer-motion";
import { Target, FileSearch, Gauge, Map, type LucideIcon } from "lucide-react";

const FEATURES: { icon: LucideIcon; title: string; description: string; accent: string }[] = [
  {
    icon: Target,
    title: "Scholarship Matching Engine",
    description:
      "Compares your academic profile against 58+ global scholarships and ranks them by real match percentage — not keyword guessing.",
    accent: "teal",
  },
  {
    icon: FileSearch,
    title: "Missing Document Detection",
    description:
      "See exactly which documents each scholarship requires, what you already have, and what's still missing — at a glance.",
    accent: "amber",
  },
  {
    icon: Gauge,
    title: "Scholarship Readiness Score",
    description:
      "A single 0–100 score built from your academics, language scores, experience, and documents — with clear strengths and gaps.",
    accent: "teal",
  },
  {
    icon: Map,
    title: "Personalized Roadmap Generator",
    description:
      "An ordered, time-estimated action plan built around your specific gaps for the scholarship you're targeting.",
    accent: "amber",
  },
];

export function FeaturesShowcase() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs font-mono font-semibold tracking-[0.18em] text-teal-600 uppercase">
            What ScholarPath does
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink-950 mt-3 leading-tight">
            Four tools. One honest answer:{" "}
            <span className="text-ink-400">what should you do next.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-ink-100 p-7 hover:border-ink-200 hover:shadow-[0_12px_30px_rgba(11,17,32,0.07)] transition-all duration-300"
            >
              <div
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl mb-5 transition-colors ${
                  feature.accent === "teal" ? "bg-teal-100 text-teal-600" : "bg-amber-100 text-amber-600"
                }`}
              >
                <feature.icon size={20} strokeWidth={2} />
              </div>
              <h3 className="font-display font-semibold text-lg text-ink-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
