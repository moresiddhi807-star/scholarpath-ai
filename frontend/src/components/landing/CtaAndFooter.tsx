import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Compass, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

export function CtaBand() {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-paper-50">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-ink-950 px-8 py-14 sm:px-14 sm:py-16 text-center relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: "radial-gradient(circle at 30% 20%, var(--color-teal-400), transparent 60%), radial-gradient(circle at 80% 80%, var(--color-amber-400), transparent 60%)",
            }}
          />
          <div className="relative">
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-paper-50 leading-tight">
              Find out what you're really eligible for.
            </h2>
            <p className="mt-4 text-ink-300 max-w-lg mx-auto">
              Three minutes to build your profile. A lifetime of clarity on your next step.
            </p>
            <div className="mt-8">
              <Button size="lg" variant="secondary" onClick={() => navigate("/register")}>
                Get Started Free <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-white border-t border-ink-100 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-display font-semibold text-ink-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 text-teal-300">
            <Compass size={16} />
          </span>
          ScholarPath <span className="text-teal-500">AI</span>
        </div>
        <p className="text-sm text-ink-400">© {new Date().getFullYear()} ScholarPath AI. Built for students going further.</p>
        <div className="flex gap-6 text-sm text-ink-500">
          <a href="#features" className="hover:text-ink-900 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-ink-900 transition-colors">How it Works</a>
        </div>
      </div>
    </footer>
  );
}
