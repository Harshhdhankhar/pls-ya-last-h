"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 400);
      return () => clearTimeout(t);
    }
    setQuery("");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    return {
      products: products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.line.toLowerCase().includes(q) ||
          p.colorway.toLowerCase().includes(q)
      ).slice(0, 4),
    };
  }, [query]);

  const hasResults = results && results.products.length;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[96] bg-paper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="container flex h-full flex-col pt-32 md:pt-40">
            <div className="flex items-start justify-between gap-6 border-b border-line pb-6">
              <div className="flex flex-1 items-center gap-4">
                <Search className="h-6 w-6 shrink-0 text-ink-faint" strokeWidth={1.5} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search styles, collections…"
                  className="w-full bg-transparent font-display text-3xl tracking-editorial placeholder:text-ink-faint focus:outline-none md:text-5xl"
                />
              </div>
              <button
                onClick={onClose}
                aria-label="Close search"
                data-cursor="pointer"
                className="mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-paper-soft"
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-10">
              {!query && (
                <p className="eyebrow">Try “Meridian”, “Runner”, or “Heritage”</p>
              )}

              {query && !hasResults && (
                <p className="text-ink-muted">No results for “{query}”</p>
              )}

              {results && results.products.length > 0 && (
                <div className="mb-10">
                  <p className="eyebrow mb-5">Products</p>
                  <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {results.products.map((p, i) => (
                      <motion.div
                        key={p.slug}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                      >
                        <Link href="/shop" onClick={onClose} data-cursor="pointer" className="group block">
                          <div className="relative aspect-[4/5] overflow-hidden bg-paper-soft">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="220px"
                              className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                            />
                          </div>
                          <p className="mt-3 text-sm font-medium">{p.name}</p>
                          <p className="text-xs text-ink-muted">{formatPrice(p.price)}</p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
