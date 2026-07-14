import { cn } from "@/lib/utils";

function scorePassword(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

const LABELS = ["Weak", "Fair", "Good", "Strong"];

export function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const score = scorePassword(password);
  const label = LABELS[Math.max(score - 1, 0)];

  return (
    <div className="mt-2.5">
      <div className="flex gap-1.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              i < score ? (score >= 3 ? "bg-gold" : "bg-ink/40") : "bg-line"
            )}
          />
        ))}
      </div>
      <p className="mt-1.5 text-[11px] uppercase tracking-wide text-ink-faint">
        {label} Password
      </p>
    </div>
  );
}
