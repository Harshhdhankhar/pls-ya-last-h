"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { GalleryLightbox } from "@/components/pdp/GalleryLightbox";

const SWIPE_THRESHOLD = 60;

export function ProductGallery({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [failed, setFailed] = useState<Set<number>>(new Set());

  const go = (delta: number) => {
    setIndex((prev) => (prev + delta + images.length) % images.length);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) go(1);
    else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
  };

  const hasFailed = failed.has(index);

  return (
    <div className="flex flex-col md:flex-row md:gap-4">
      {images.length > 1 && (
        <div className="order-2 mt-4 flex gap-3 overflow-x-auto no-scrollbar md:order-1 md:mt-0 md:w-20 md:shrink-0 md:flex-col md:overflow-x-visible md:overflow-y-auto">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              onClick={() => setIndex(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              data-cursor="pointer"
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-paper-soft transition-colors md:h-20 md:w-20",
                index === i ? "border-gold ring-1 ring-gold/30" : "border-transparent hover:border-line"
              )}
            >
              {failed.has(i) ? (
                <div className="flex h-full w-full items-center justify-center text-ink-faint">
                  <ImageOff className="h-4 w-4" strokeWidth={1.5} />
                </div>
              ) : (
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                  onError={() => setFailed((prev) => new Set(prev).add(i))}
                />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="relative order-1 h-[48vh] w-full overflow-hidden rounded-2xl bg-paper-soft ring-1 ring-transparent transition-all duration-300 hover:ring-gold/15 sm:h-[55vh] md:order-2 md:h-[74vh] lg:h-[78vh]">
        <motion.div
          key={index}
          className="relative h-full w-full"
          drag={images.length > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          {hasFailed ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-ink-faint">
              <ImageOff className="h-8 w-8" strokeWidth={1.25} />
              <p className="text-sm">Image unavailable</p>
            </div>
          ) : (
            <button
              onClick={() => setLightboxOpen(true)}
              aria-label="Open full-screen gallery"
              data-cursor="pointer"
              className="h-full w-full cursor-zoom-in"
            >
              <Image
                src={images[index]}
                alt={`${productName} - image ${index + 1} of ${images.length}`}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                priority={index === 0}
                className="object-contain"
                onError={() => setFailed((prev) => new Set(prev).add(index))}
              />
            </button>
          )}
        </motion.div>

        {images.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous image"
              data-cursor="pointer"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink shadow-sm transition-transform hover:scale-105"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next image"
              data-cursor="pointer"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink shadow-sm transition-transform hover:scale-105"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-paper/90 px-3 py-1 text-xs font-medium text-ink">
              {index + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {lightboxOpen && (
        <GalleryLightbox
          images={images}
          index={index}
          productName={productName}
          onIndexChange={setIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
