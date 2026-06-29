import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  isLoading?: boolean;
}

const variantClasses: Record<string, string> = {
  primary:
    "bg-ink-900 text-paper-50 hover:bg-ink-800 shadow-[0_1px_2px_rgba(11,17,32,0.1)] hover:shadow-[0_4px_14px_rgba(11,17,32,0.25)]",
  secondary: "bg-teal-500 text-white hover:bg-teal-600 shadow-[0_1px_2px_rgba(14,165,160,0.2)] hover:shadow-[0_4px_14px_rgba(14,165,160,0.35)]",
  ghost: "bg-transparent text-ink-700 hover:bg-ink-100",
  outline: "bg-transparent border border-ink-200 text-ink-800 hover:border-ink-400 hover:bg-white",
  danger: "bg-stamp-red text-white hover:opacity-90",
};

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, isLoading, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 ease-out active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
