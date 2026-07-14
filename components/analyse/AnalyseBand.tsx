"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AnalyseBand() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = testimonials[index];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      id="analyse-band"
      data-landing-snap
      className="section flex min-h-[100svh] flex-col justify-between border-y border-line bg-paper-soft !pt-16 md:!pt-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-8">
            <span className="eyebrow mb-4 block">Movement Analysis · ₹99</span>
            <h2 className="font-display text-4xl tracking-editorial md:text-6xl">
              <RevealText text="Analyse how you move" />
            </h2>
            <Reveal delay={0.2} className="mt-6 max-w-xl">
              <p className="text-pretty leading-relaxed text-ink-muted md:text-lg">
                Upload a short video of yourself walking and get a personalised
                read on your gait and posture - the same understanding we use to
                build footwear around real movement. Quick, guided and entirely
                online.
              </p>
            </Reveal>
          </Reveal>

          <Reveal delay={0.25} className="flex md:col-span-4 md:justify-end">
            <MagneticButton href="/analyse" variant="solid" size="lg">
              Get started - ₹99
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </MagneticButton>
          </Reveal>
        </div>
      </div>

      <div className="container mt-16 border-t border-line pt-12 md:mt-20 md:pt-14">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow mb-6 block">From Our Community</span>
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <p className="text-balance font-display text-2xl leading-snug tracking-editorial md:text-4xl">
                  &ldquo;{active.quote}&rdquo;
                </p>
                <p className="eyebrow mt-6 text-ink-muted">
                  {active.author} - {active.role}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-center gap-3">
              {testimonials.map((t, i) => (
                <button
                  key={t.author}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial from ${t.author}`}
                  data-cursor="pointer"
                  className="group flex h-6 items-center px-1"
                >
                  <span
                    className={cn(
                      "h-1 rounded-full transition-all duration-500 ease-premium",
                      i === index ? "w-8 bg-gold" : "w-3 bg-ink/15 group-hover:bg-ink/30"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
