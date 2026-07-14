"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const CAPTIONS = ["Upper", "Silhouette", "Sole Unit", "Detail", "Finish"];

export function DetailGallery({ images, productName }: { images: string[]; productName: string }) {
  const [failed, setFailed] = useState<Set<number>>(new Set());

  // Cycle through the available shots so the section always fills 3-5 slots,
  // even when a product only has two source images.
  const slots = Array.from({ length: Math.min(Math.max(images.length, 3), 5) }, (_, i) => images[i % images.length]);

  return (
    <section className="section">
      <div className="container">
        <Reveal className="mb-14 md:mb-20">
          <span className="eyebrow mb-4 block">Craft</span>
          <h2 className="font-display text-4xl tracking-editorial md:text-6xl">
            Designed in Every Detail
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {slots.map((src, i) => (
            <Reveal
              key={`${src}-${i}`}
              delay={(i % 3) * 0.08}
              className={i === 0 ? "col-span-2 md:col-span-1" : ""}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-soft">
                {failed.has(i) ? (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-ink-faint">
                    <ImageOff className="h-6 w-6" strokeWidth={1.25} />
                  </div>
                ) : (
                  <Image
                    src={src}
                    alt={`${productName} - ${CAPTIONS[i % CAPTIONS.length]}`}
                    fill
                    sizes="(min-width: 768px) 30vw, 90vw"
                    className="object-cover transition-transform duration-700 ease-premium hover:scale-105"
                    onError={() => setFailed((prev) => new Set(prev).add(i))}
                  />
                )}
              </div>
              <p className="mt-3 text-xs uppercase tracking-wide text-ink-faint">
                {CAPTIONS[i % CAPTIONS.length]}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
