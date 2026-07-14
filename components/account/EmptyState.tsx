import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}) {
  return (
    <Reveal className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line px-8 py-24 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper-soft">
        <Icon className="h-6 w-6 text-ink-muted" strokeWidth={1.25} />
      </span>
      <p className="mt-6 font-display text-2xl tracking-editorial">{title}</p>
      <p className="mt-3 max-w-sm text-pretty leading-relaxed text-ink-muted">{description}</p>
      <MagneticButton href={actionHref} variant="solid" className="mt-8">
        {actionLabel}
      </MagneticButton>
    </Reveal>
  );
}
