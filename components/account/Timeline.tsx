import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimelineStep } from "@/lib/memberData";

export function Timeline({ steps }: { steps: TimelineStep[] }) {
  const activeIndex = steps.findIndex((s) => !s.complete);

  return (
    <ol className="relative">
      {steps.map((step, i) => {
        const isActive = i === activeIndex;
        const isLast = i === steps.length - 1;
        return (
          <li key={step.label} className="relative flex gap-5 pb-9 last:pb-0">
            {!isLast && (
              <span
                className={cn(
                  "absolute left-[15px] top-8 h-full w-px",
                  step.complete ? "bg-ink" : "bg-line"
                )}
              />
            )}
            <span
              className={cn(
                "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                step.complete
                  ? "border-ink bg-ink text-paper"
                  : isActive
                    ? "border-gold bg-paper text-gold-deep"
                    : "border-line bg-paper text-ink-faint"
              )}
            >
              {step.complete ? (
                <Check className="h-4 w-4" strokeWidth={2} />
              ) : (
                <span className={cn("h-2 w-2 rounded-full", isActive ? "bg-gold" : "bg-ink-faint")} />
              )}
            </span>
            <div className="pt-1">
              <p className={cn("font-medium", !step.complete && !isActive && "text-ink-faint")}>
                {step.label}
              </p>
              <p className="mt-0.5 text-sm text-ink-muted">{step.date}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
