"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const LENGTH = 6;

export default function VerifyEmailPage() {
  const router = useRouter();
  const { user, verifyEmail } = useAuth();
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => Math.max(c - 1, 0)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const setDigit = (index: number, value: string) => {
    const clean = value.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = clean;
      return next;
    });
    if (clean && index < LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!pasted) return;
    e.preventDefault();
    setDigits(Array.from({ length: LENGTH }, (_, i) => pasted[i] ?? ""));
    inputs.current[Math.min(pasted.length, LENGTH - 1)]?.focus();
  };

  const handleSubmit = async () => {
    setError(null);
    const code = digits.join("");
    setLoading(true);
    const result = await verifyEmail(code);
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push("/account");
  };

  const complete = digits.every((d) => d.length === 1);

  return (
    <AuthLayout
      title="Verify your email."
      subtitle={`Enter the six-digit code sent to ${user?.email || "your email"}.`}
    >
      <div className="flex gap-2.5" onPaste={handlePaste}>
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            value={digit}
            onChange={(e) => setDigit(i, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !digit && i > 0) inputs.current[i - 1]?.focus();
            }}
            inputMode="numeric"
            maxLength={1}
            className={cn(
              "h-14 w-12 rounded-md border text-center font-display text-2xl transition-colors focus:outline-none",
              error ? "border-gold-deep" : "border-line focus:border-ink"
            )}
          />
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-gold-deep">{error}</p>}

      <MagneticButton
        onClick={handleSubmit}
        variant="solid"
        size="lg"
        className="mt-8 w-full"
        magnetic={false}
      >
        {loading ? "Verifying…" : complete ? "Verify email" : "Enter code"}
      </MagneticButton>

      <button
        onClick={() => setCooldown(30)}
        disabled={cooldown > 0}
        data-cursor="pointer"
        className="link-underline mt-6 block text-center text-sm text-ink-muted disabled:text-ink-faint"
      >
        {cooldown > 0 ? `Send again in ${cooldown}s` : "Send again"}
      </button>
    </AuthLayout>
  );
}
