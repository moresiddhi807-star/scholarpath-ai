import type { ReactNode } from "react";
import clsx from "clsx";
import type { EligibilityStatus, FundingType } from "../../types";

export type BadgeVariant = "neutral" | "ink" | "success" | "warning" | "danger" | "teal" | "amber" | "outline";

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  const variants: Record<BadgeVariant, string> = {
    neutral: "bg-ink-100 text-ink-700",
    ink: "bg-ink-100 text-ink-700",
    success: "bg-teal-100 text-teal-600",
    warning: "bg-amber-100 text-amber-600",
    danger: "bg-red-100 text-stamp-red",
    teal: "bg-teal-100 text-teal-600",
    amber: "bg-amber-100 text-amber-600",
    outline: "border border-ink-200 text-ink-600 bg-transparent",
  };
  return (
    <span className={clsx("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", variants[variant], className)}>
      {children}
    </span>
  );
}

export function EligibilityBadge({ status }: { status: EligibilityStatus }) {
  const config: Record<EligibilityStatus, { label: string; variant: BadgeVariant }> = {
    eligible: { label: "Eligible", variant: "success" },
    partially_eligible: { label: "Partially Eligible", variant: "warning" },
    not_eligible: { label: "Not Eligible", variant: "danger" },
  };
  const { label, variant } = config[status];
  return <Badge variant={variant}>{label}</Badge>;
}

export function FundingBadge({ type }: { type: FundingType }) {
  return type === "fully_funded" ? (
    <Badge variant="teal">Fully Funded</Badge>
  ) : (
    <Badge variant="amber">Partially Funded</Badge>
  );
}

export function eligibilityBadgeVariant(status: EligibilityStatus | string): BadgeVariant {
  if (status === "eligible") return "success";
  if (status === "partially_eligible") return "warning";
  return "danger";
}

export function eligibilityLabel(status: EligibilityStatus | string): string {
  if (status === "eligible") return "Eligible";
  if (status === "partially_eligible") return "Partial Match";
  return "Not Eligible";
}
