import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { FloatingBlobs } from "../ui/FloatingBlobs";
import { ReadinessStamp } from "../ui/ReadinessStamp";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE_OUT },
  }),
};

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-36 pb-24 lg:pt-44 lg:pb-32">
      <FloatingBlobs />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold tracking-wide mb-7"
            >
              <Sparkles size={14} />
              AI-Powered Scholarship Readiness
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="font-display font-semibold text-5xl sm:text-6xl lg:text-[4.2rem] leading-[1.04] tracking-tight text-ink-950"
            >
              Your path to studying
              <br />
              abroad,{" "}
              <span className="relative inline-block">
                <span className="relative z-10 italic text-teal-600">stamped</span>
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="14"
                  viewBox="0 0 220 14"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M2 9C40 2 100 2 218 9" stroke="var(--color-amber-400)" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>{" "}
              and ready.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-7 text-lg text-ink-500 max-w-xl leading-relaxed"
            >
              Discover scholarships you can realistically win, see exactly what's
              missing from your application, and follow a roadmap built around
              your profile — not a generic checklist.
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="mt-9 flex flex-wrap gap-4">
              <Button size="lg" onClick={() => navigate("/register")}>
                Get Started <ArrowRight size={18} />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/explore")}>
                Explore Scholarships
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="mt-12 flex items-center gap-8 text-sm text-ink-400"
            >
              <div>
                <span className="font-mono font-semibold text-ink-900 text-lg">58+</span> scholarships
              </div>
              <div className="h-4 w-px bg-ink-200" />
              <div>
                <span className="font-mono font-semibold text-ink-900 text-lg">48</span> countries
              </div>
              <div className="h-4 w-px bg-ink-200" />
              <div>
                <span className="font-mono font-semibold text-ink-900 text-lg">5</span> live widgets
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="glass rounded-3xl p-10 shadow-[0_20px_60px_rgba(11,17,32,0.12)] flex flex-col items-center gap-5 relative">
              <span className="absolute top-5 left-6 text-xs font-mono font-semibold tracking-widest text-ink-400">
                YOUR READINESS
              </span>
              <ReadinessStamp score={78} size={200} />
              <p className="text-sm text-ink-500 text-center max-w-[220px]">
                Computed live from your CGPA, test scores, experience, and documents on file.
              </p>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-4 glass rounded-2xl px-4 py-3 shadow-lg hidden sm:block"
            >
              <p className="text-xs text-ink-400 mb-0.5">Top Match</p>
              <p className="text-sm font-semibold text-ink-900">DAAD — 95%</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 -left-6 glass rounded-2xl px-4 py-3 shadow-lg hidden sm:block"
            >
              <p className="text-xs text-ink-400 mb-0.5">Missing</p>
              <p className="text-sm font-semibold text-stamp-red">2 documents</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
