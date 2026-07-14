"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { instagram } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function InstagramGrid() {
  return (
    <section
      id="instagram"
      data-landing-snap
      className="section min-h-[100svh] !pt-16 md:!pt-20"
    >
      <div className="container">
        <Reveal className="mb-12 flex items-center justify-between md:mb-16">
          <div className="flex items-center gap-3">
            <Instagram className="h-5 w-5 text-ink-muted" strokeWidth={1.5} />
            <span className="font-display text-2xl tracking-editorial">Follow @sole_arium</span>
          </div>
          <span className="eyebrow hidden text-ink-muted md:block">
            Tag your #Sole-arium Moments
          </span>
        </Reveal>

        <div className="columns-2 gap-3 sm:columns-3 md:columns-4 md:gap-4">
          {instagram.map((src, i) => (
            <motion.div
              key={src + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.06 }}
              className="group relative mb-3 overflow-hidden bg-paper-soft md:mb-4"
              style={{ aspectRatio: i % 3 === 0 ? "4 / 5" : "1 / 1" }}
            >
              <Image
                src={src}
                alt="Sole-arium styled in the everyday"
                fill
                sizes="(min-width: 768px) 22vw, 46vw"
                className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/30">
                <Instagram
                  className="h-6 w-6 text-paper opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  strokeWidth={1.5}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
