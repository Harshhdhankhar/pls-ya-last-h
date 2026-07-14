"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Switch({
  checked,
  onChange,
  label,
  disabled = false,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      data-cursor={disabled ? undefined : "pointer"}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300",
        disabled ? "cursor-not-allowed bg-line/70" : checked ? "bg-ink" : "bg-line"
      )}
    >
      <motion.span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full shadow-sm",
          checked ? "bg-gold" : "bg-paper"
        )}
        animate={{ left: checked ? "22px" : "2px" }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </button>
  );
}
