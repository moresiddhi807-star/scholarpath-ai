import { type HTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx("bg-white border border-ink-100 rounded-2xl shadow-[0_1px_3px_rgba(11,17,32,0.06)]", className)}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = "Card";

export const GlassCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={clsx("glass rounded-2xl shadow-[0_8px_30px_rgba(11,17,32,0.08)]", className)} {...props}>
      {children}
    </div>
  )
);
GlassCard.displayName = "GlassCard";
