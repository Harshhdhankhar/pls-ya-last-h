"use client";

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingInput({
  label,
  type = "text",
  value,
  onChange,
  error,
  required,
  name,
  autoComplete,
  className,
}: {
  label: string;
  type?: "text" | "email" | "password" | "tel";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  name?: string;
  autoComplete?: string;
  className?: string;
}) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [reveal, setReveal] = useState(false);
  const floated = focused || value.length > 0;
  const isPassword = type === "password";

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "relative border-b transition-colors",
          error ? "border-gold-deep" : focused ? "border-ink" : "border-line"
        )}
      >
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-0 origin-left text-ink-faint transition-all duration-300 ease-premium",
            floated ? "top-1 -translate-y-1 text-[11px] uppercase tracking-wide" : "top-3.5 text-base"
          )}
        >
          {label}
        </label>
        <input
          id={id}
          name={name}
          type={isPassword && reveal ? "text" : type}
          value={value}
          required={required}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent pb-2.5 pt-6 text-base text-ink focus:outline-none"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setReveal((v) => !v)}
            aria-label={reveal ? "Hide password" : "Show password"}
            data-cursor="pointer"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-ink-faint transition-colors hover:text-ink"
          >
            {reveal ? <EyeOff className="h-4 w-4" strokeWidth={1.5} /> : <Eye className="h-4 w-4" strokeWidth={1.5} />}
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-gold-deep">{error}</p>}
    </div>
  );
}
