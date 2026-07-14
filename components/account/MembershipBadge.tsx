import { cn } from "@/lib/utils";
import type { MembershipLevel } from "@/lib/auth";

const styles: Record<MembershipLevel, string> = {
  Guest: "border-line text-ink-muted",
  Member: "border-ink/30 text-ink",
  "Founding Member": "border-gold text-gold-deep bg-gold/10",
  "Icon Status": "border-ink bg-ink text-paper",
};

export function MembershipBadge({
  level,
  className,
}: {
  level: MembershipLevel;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-wide",
        styles[level],
        className
      )}
    >
      {level}
    </span>
  );
}
