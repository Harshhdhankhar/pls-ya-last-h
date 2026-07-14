"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/data";
import { products } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { MagneticButton } from "@/components/ui/MagneticButton";

const swatchColor: Record<string, string> = {
  Bone: "#e8e2d6",
  Sand: "#dcc9a3",
  Onyx: "#1c1c1c",
  Clay: "#a9694f",
  Slate: "#5b6672",
  Carbon: "#2b2d2f",
  Noir: "#141414",
  Fog: "#b8bcc0",
};

export function WishlistItemCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, toggleWishlist } = useStore();
  const variants = products.filter((p) => p.name === product.name);
  const [active, setActive] = useState(product);
  const [moved, setMoved] = useState(false);

  const lowStock = active.badge === "Limited";
  const availability = lowStock ? "Low Stoc remaining" : "In Stock";

  const handleMoveToCart = () => {
    addToCart(active);
    setMoved(true);
  };

  if (moved) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        onAnimationComplete={() => toggleWishlist(product)}
        className="overflow-hidden rounded-2xl border border-gold/40 bg-gold/[0.06] p-6 text-center text-sm text-gold-deep"
      >
        Moved to bag
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.06 }}
      className="grid grid-cols-1 gap-6 rounded-2xl border border-line p-6 sm:grid-cols-[180px_1fr] md:p-7"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-paper-soft">
        <Image src={active.image} alt={active.name} fill sizes="200px" className="object-cover" />
        <button
          onClick={() => toggleWishlist(product)}
          aria-label="Remove from wishlist"
          data-cursor="pointer"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-paper/90"
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-faint">{active.line}</p>
            <p className="mt-1 font-display text-2xl tracking-editorial">{active.name}</p>
            <p className="mt-1 text-sm text-ink-muted">{active.colorway}</p>
          </div>
          <p className="shrink-0 text-lg">{formatPrice(active.price)}</p>
        </div>

        <p className={cn("mt-3 text-sm font-medium", lowStock ? "text-gold-deep" : "text-ink-muted")}>
          {availability}
        </p>

        {variants.length > 1 && (
          <div className="mt-5">
            <p className="eyebrow mb-2.5 text-ink-faint">Colour</p>
            <div className="flex gap-2.5">
              {variants.map((variant) => {
                const key = variant.colorway.split(" / ")[0];
                return (
                  <button
                    key={variant.slug}
                    onClick={() => setActive(variant)}
                    aria-label={variant.colorway}
                    data-cursor="pointer"
                    className={cn(
                      "h-7 w-7 rounded-full border-2 transition-transform",
                      active.slug === variant.slug ? "border-ink scale-110" : "border-transparent"
                    )}
                    style={{ backgroundColor: swatchColor[key] ?? "#cccccc" }}
                  />
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <MagneticButton size="sm" onClick={handleMoveToCart} magnetic={false}>
            Add to Bag
          </MagneticButton>
          <MagneticButton size="sm" variant="ghost" onClick={() => toggleWishlist(product)} magnetic={false}>
            Remove
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
}
