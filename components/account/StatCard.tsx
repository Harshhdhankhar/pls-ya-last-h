import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export function StatCard({
  label,
  value,
  hint,
  accent = false,
  delay = 0,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className={cn(
        "rounded-2xl border border-line p-6 transition-colors",
        accent && "border-gold/40 bg-gold/[0.06]"
      )}
    >
      <p className="eyebrow text-ink-muted">{label}</p>
      <p className="mt-3 font-display text-3xl tracking-editorial">{value}</p>
      {hint && <p className="mt-1.5 text-sm text-ink-muted">{hint}</p>}
    </Reveal>
  );
}
