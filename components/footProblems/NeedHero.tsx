import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal, RevealText } from "@/components/ui/Reveal";

/**
 * Compact split hero shared by /foot-problems and /foot-problems/[slug].
 * Text-first on mobile (so the heading isn't pushed below the fold),
 * side-by-side on desktop. Deliberately capped in heigho full-bleed
 * imagerer the editorial, product-first direction for these pages.
 */
export function NeedHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  badges,
  children,
  imagePriority = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  badges?: string[];
  children?: ReactNode;
  imagePriority?: boolean;
}) {
  return (
    <section className="flex min-h-[42vh] items-center pb-10 pt-28 sm:min-h-[48vh] lg:min-h-[60vh] lg:pt-32">
      <div className="container grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <Reveal>
            <span className="eyebrow mb-4 flex items-center gap-2 text-ink-muted">
              <span className="h-1 w-1 rounded-full bg-gold" />
              {eyebrow}
            </span>
          </Reveal>

          <h1 className="font-display text-4xl leading-[1.1] tracking-editorial md:text-6xl">
            <RevealText text={title} />
          </h1>

          {description && (
            <Reveal delay={0.15} className="mt-5 max-w-md">
              <p className="text-pretty leading-relaxed text-ink-muted">{description}</p>
            </Reveal>
          )}

          {badges && badges.length > 0 && (
            <Reveal delay={0.2} className="mt-6 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-gold-deep"
                >
                  {badge}
                </span>
              ))}
            </Reveal>
          )}

          {children && (
            <Reveal delay={0.3} className="mt-8">
              {children}
            </Reveal>
          )}
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5">
          <Reveal delay={0.1} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-paper-soft sm:aspect-[16/11] lg:aspect-square">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority={imagePriority}
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-contain p-4"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
