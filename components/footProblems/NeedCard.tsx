import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { img } from "@/lib/data";
import type { FootProblem } from "@/lib/footProblems";

/** Compact, image-forward card for the /foot-problems results grid. */
export function NeedCard({ problem }: { problem: FootProblem }) {
  return (
    <Link
      href={`/foot-problems/${problem.slug}`}
      data-cursor="pointer"
      className="group block overflow-hidden rounded-2xl border border-line bg-paper transition-colors hover:border-ink"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-soft">
        <Image
          src={img(problem.image, 800)}
          alt={problem.title}
          fill
          sizes="(min-width: 768px) 30vw, 90vw"
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink backdrop-blur-sm">
          {problem.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg leading-snug tracking-editorial">{problem.title}</h3>
        <div className="mt-2 flex items-center gap-1 text-xs font-medium text-ink-muted transition-colors group-hover:text-ink">
          Learn More
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
        </div>
      </div>
    </Link>
  );
}
