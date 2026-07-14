import { Reveal } from "@/components/ui/Reveal";

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <Reveal className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-14 md:flex-row md:items-end">
      <div>
        <span className="eyebrow mb-3 block">{eyebrow}</span>
        <h1 className="font-display text-4xl tracking-editorial md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-lg text-pretty leading-relaxed text-ink-muted">{description}</p>
        )}
      </div>
      {action}
    </Reveal>
  );
}
