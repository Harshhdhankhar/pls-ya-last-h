"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterForm({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  const isDark = variant === "dark";

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 border-b py-4 text-sm",
          isDark ? "border-paper/30 text-paper" : "border-ink/20 text-ink",
          className
        )}
      >
        <Check className="h-4 w-4 text-gold" strokeWidth={1.5} />
        <span>You&rsquo;re on the list.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div
        className={cn(
          "flex items-center gap-4 border-b py-4 transition-colors",
          isDark
            ? "border-paper/30 focus-within:border-gold"
            : "border-ink/20 focus-within:border-gold/50"
        )}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Your email address"
          aria-label="Email address"
          className={cn(
            "w-full bg-transparent text-base focus:outline-none",
            isDark
              ? "text-paper placeholder:text-paper/40"
              : "text-ink placeholder:text-ink-faint"
          )}
        />
        <button
          type="submit"
          aria-label="Subscribe"
          data-cursor="pointer"
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-500 ease-premium hover:translate-x-1",
            isDark ? "bg-gold text-ink" : "bg-ink text-paper"
          )}
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-gold-deep">Please enter a valid email.</p>
      )}
    </form>
  );
}
