import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { img } from "@/lib/data";
import type { FootProblem } from "@/lib/footProblems";
import { Reveal } from "@/components/ui/Reveal";

export function DesignedFor({ problems }: { problems: FootProblem[] }) {
  if (problems.length === 0) return null;

  return (
    <section className="section bg-paper-soft">
      <div className="container">
        <Reveal className="mb-14 max-w-xl md:mb-20">
          <span className="eyebrow mb-4 block">Designed For</span>
          <h2 className="font-display text-4xl tracking-editorial md:text-6xl">
            Built With Your Feet in Mind
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-ink-muted">
            This silhouette is a considered fit for the following everyday needs.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {problems.map((problem, i) => (
            <Reveal key={problem.slug} delay={i * 0.08}>
              <Link
                href={`/foot-problems/${problem.slug}`}
                data-cursor="pointer"
                className="group block overflow-hidden rounded-2xl border border-line bg-paper transition-colors hover:border-gold/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-paper-soft">
                  <Image
                    src={img(problem.image, 800)}
                    alt={problem.title}
                    fill
                    sizes="(min-width: 768px) 30vw, 90vw"
                    className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[11px] uppercase tracking-wide text-ink-faint">{problem.category}</p>
                  <h3 className="mt-2 font-display text-lg tracking-editorial">{problem.title}</h3>
                  <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-ink">
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
