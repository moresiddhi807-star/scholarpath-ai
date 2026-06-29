import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "I had eleven scholarship tabs open and no idea which ones I actually qualified for. The readiness score told me to fix my IELTS before anything else — that one suggestion saved me months.",
    name: "Amara O.",
    detail: "Accepted — DAAD, Germany",
  },
  {
    quote:
      "The roadmap was the first thing that made studying abroad feel like a plan instead of a maze. I knew exactly what to do this week.",
    name: "Diego R.",
    detail: "Accepted — Chevening, UK",
  },
  {
    quote:
      "Seeing my missing documents laid out next to what I already had made prepping for applications so much less overwhelming.",
    name: "Priya K.",
    detail: "Accepted — MEXT, Japan",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs font-mono font-semibold tracking-[0.18em] text-teal-600 uppercase">
            Student outcomes
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink-950 mt-3 leading-tight">
            Built around real applications.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl bg-paper-100 p-7 flex flex-col"
            >
              <Quote className="text-teal-400 mb-4" size={28} strokeWidth={1.5} />
              <p className="text-sm text-ink-700 leading-relaxed flex-1">{t.quote}</p>
              <div className="mt-6 pt-5 border-t border-ink-200">
                <p className="text-sm font-semibold text-ink-900">{t.name}</p>
                <p className="text-xs text-teal-600 font-medium mt-0.5">{t.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
