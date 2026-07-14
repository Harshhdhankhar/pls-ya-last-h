"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageOff, X, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function GalleryLightbox({
  images,
  index,
  productName,
  onIndexChange,
  onClose,
}: {
  images: string[];
  index: number;
  productName: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const [failed, setFailed] = useState<Set<number>>(new Set());

  const go = (delta: number) => {
    setZoomed(false);
    onIndexChange((index + delta + images.length) % images.length);
  };

  const src = images[index];
  const hasFailed = failed.has(index);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99] bg-noir/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute right-5 top-5 z-10 flex items-center gap-2">
          <button
            onClick={() => setZoomed((v) => !v)}
            aria-label={zoomed ? "Zoom out" : "Zoom in"}
            data-cursor="pointer"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-bone/10 text-bone transition-colors hover:bg-bone/20"
          >
            {zoomed ? <ZoomOut className="h-5 w-5" strokeWidth={1.5} /> : <ZoomIn className="h-5 w-5" strokeWidth={1.5} />}
          </button>
          <button
            onClick={onClose}
            aria-label="Close gallery"
            data-cursor="pointer"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-bone/10 text-bone transition-colors hover:bg-bone/20"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous image"
              data-cursor="pointer"
              className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-bone/10 text-bone transition-colors hover:bg-bone/20 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next image"
              data-cursor="pointer"
              className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-bone/10 text-bone transition-colors hover:bg-bone/20 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </>
        )}

        <div
          className="flex h-full w-full items-center justify-center overflow-hidden p-6 sm:p-16"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {hasFailed ? (
            <div className="flex flex-col items-center gap-3 text-bone/50">
              <ImageOff className="h-10 w-10" strokeWidth={1.25} />
              <p className="text-sm">Image unavailable</p>
            </div>
          ) : (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => setZoomed((v) => !v)}
              data-cursor="pointer"
              className={cn(
                "relative h-full w-full max-w-3xl transition-transform duration-500 ease-premium",
                zoomed ? "scale-[1.7] cursor-zoom-out" : "cursor-zoom-in"
              )}
            >
              <Image
                src={src}
                alt={`${productName} - image ${index + 1} of ${images.length}`}
                fill
                sizes="90vw"
                className="object-contain"
                onError={() => setFailed((prev) => new Set(prev).add(index))}
              />
            </motion.div>
          )}
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-bone/10 px-4 py-1.5 text-xs font-medium tracking-wide text-bone">
          {index + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
