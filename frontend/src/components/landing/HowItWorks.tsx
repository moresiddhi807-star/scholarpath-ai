import { motion } from "framer-motion";
import { UserPlus, ScanSearch, ClipboardCheck, Route } from "lucide-react";

const STEPS = [
  {
    icon: UserPlus,
    title: "Build your profile",
    description: "Share your academics, test scores, and experience once — it powers every tool on the platform.",
  },
  {
    icon: ScanSearch,
    title: "See your real matches",
    description: "Get a ranked list of scholarships with an honest match percentage, not just a list of names.",
  },
  {
    icon: ClipboardCheck,
    title: "Know what's missing",
    description: "Instantly see which documents and qualifications you still need for any scholarship you pick.",
  },
  {
    icon: Route,
    title: "Follow your roadmap",
    description: "Get an ordered, time-estimated plan that turns gaps into a step-by-step path to applying.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-paper-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-20"
        >
          <span className="text-xs font-mono font-semibold tracking-[0.18em] text-amber-600 uppercase">
            How it works
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink-950 mt-3 leading-tight">
            From profile to application, in four steps.
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-ink-200" />
          <div className="grid lg:grid-cols-4 gap-10 lg:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white border-2 border-ink-900 text-ink-900 mb-5 font-mono text-sm font-bold">
                  <step.icon size={22} strokeWidth={2} />
                </div>
                <h3 className="font-display font-semibold text-lg text-ink-900 mb-2">{step.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
