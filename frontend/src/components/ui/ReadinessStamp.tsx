import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

/**
 * ReadinessStamp — the platform's signature visual element.
 *
 * Modeled on a passport / visa ink stamp: a slightly imperfect double ring
 * with a rotated label and a big mono-spaced number in the center. Used
 * everywhere the readiness score appears (dashboard widget, full readiness
 * page) so the score becomes instantly recognizable as "the stamp."
 */
export function ReadinessStamp({
  score,
  size = 180,
  label = "READINESS",
}: {
  score: number;
  size?: number;
  label?: string;
}) {
  const motionScore = useMotionValue(0);
  const rounded = useTransform(motionScore, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(motionScore, score, { duration: 1.4, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [score]);

  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;
  const color = score >= 75 ? "var(--color-teal-500)" : score >= 50 ? "var(--color-amber-500)" : "var(--color-stamp-red)";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        initial={{ rotate: -8, opacity: 0, scale: 0.85 }}
        animate={{ rotate: -4, opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        {/* Outer dashed ring (stamp texture) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius + 8}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          strokeOpacity={0.4}
          className="stamp-ring"
        />
        {/* Background track */}
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-ink-100)" strokeWidth={8} />
        {/* Progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {/* Inner thin ring for stamp detail */}
        <circle cx={size / 2} cy={size / 2} r={radius - 14} fill="none" stroke={color} strokeWidth={1} strokeOpacity={0.3} />
      </motion.svg>

      <div className="relative flex flex-col items-center justify-center -rotate-4" style={{ transform: "rotate(-4deg)" }}>
        <motion.span
          className="font-mono font-bold tabular-nums"
          style={{ fontSize: size * 0.26, color: "var(--color-ink-900)" }}
        >
          {rounded}
        </motion.span>
        <span
          className="font-mono font-semibold tracking-[0.18em] text-center leading-tight"
          style={{ fontSize: size * 0.065, color, marginTop: -2 }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
