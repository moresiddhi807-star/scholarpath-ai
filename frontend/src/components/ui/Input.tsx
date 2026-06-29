import { type InputHTMLAttributes, type SelectHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-ink-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-300",
            "transition-colors duration-150 outline-none",
            "focus:border-teal-500 focus:ring-2 focus:ring-teal-100",
            error && "border-stamp-red focus:border-stamp-red focus:ring-red-100",
            className
          )}
          {...props}
        />
        {hint && !error && <span className="text-xs text-ink-400">{hint}</span>}
        {error && <span className="text-xs text-stamp-red">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className, id, children, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-ink-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            "w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900",
            "transition-colors duration-150 outline-none appearance-none",
            "focus:border-teal-500 focus:ring-2 focus:ring-teal-100",
            "bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236b7798%22 stroke-width=%222%22%3E%3Cpath d=%22M6 9l6 6 6-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_0.85rem_center] bg-[length:1rem] pr-10",
            error && "border-stamp-red",
            className
          )}
          {...props}
        >
          {children}
        </select>
        {error && <span className="text-xs text-stamp-red">{error}</span>}
      </div>
    );
  }
);
Select.displayName = "Select";
