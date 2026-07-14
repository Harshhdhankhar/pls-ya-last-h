"use client";

import { Feather, Footprints, ShieldCheck, Sparkles } from "lucide-react";
import { values } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

const icons = [Sparkles, Footprints, Feather, ShieldCheck];

export function WhySoleArium() {
  return (
    <section
      id="why-solearium"
      data-landing-snap
      className="section min-h-[100svh] !pt-16 md:!pt-20"
    >
      <div className="container">
        <Reveal className="mb-16 max-w-xl md:mb-24">
          <span className="eyebrow mb-4 block">The Ethos</span>
          <h2 className="font-display text-4xl tracking-editorial md:text-6xl">
            Every Detail, Considered
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={value.index} delay={i * 0.08} className="group">
                <div className="flex items-center justify-between border-b border-line pb-6">
                  <Icon
                    className="h-7 w-7 text-ink transition-colors duration-500 group-hover:text-gold"
                    strokeWidth={1.25}
                  />
                  <span className="font-display text-sm text-ink-faint">{value.index}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl tracking-editorial">
                  {value.title}
                </h3>
                <p className="mt-3 text-pretty leading-relaxed text-ink-muted">
                  {value.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
