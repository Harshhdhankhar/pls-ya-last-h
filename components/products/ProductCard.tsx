"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { QuickViewModal } from "@/components/products/QuickViewModal";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [hovered, setHovered] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const saved = isWishlisted(product.slug);
  const isComingSoon = product.comingSoon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.08 }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-soft ring-1 ring-transparent transition-all duration-300 group-hover:ring-gold/20">
        <Link
          href={`/shop/${product.slug}`}
          aria-label={`View ${product.name} - ${product.colorway}`}
          data-cursor="pointer"
          className="absolute inset-0 z-0"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 90vw"
            className={cn(
              "object-cover transition-all duration-[900ms] ease-premium",
              hovered ? "scale-105 opacity-0" : "scale-100 opacity-100"
            )}
          />
          <Image
            src={product.hoverImage}
            alt={`${product.name} - side view`}
            fill
            sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 90vw"
            className={cn(
              "object-cover transition-all duration-[900ms] ease-premium",
              hovered ? "scale-100 opacity-100" : "scale-105 opacity-0"
            )}
          />
        </Link>

        {isComingSoon ? (
          <span className="pointer-events-none absolute left-4 top-4 z-10 bg-gold/10 border border-gold/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gold-deep backdrop-blur-sm">
            Coming Soon
          </span>
        ) : product.badge ? (
          <span className="pointer-events-none absolute left-4 top-4 z-10 bg-paper/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink backdrop-blur-sm">
            {product.badge}
          </span>
        ) : null}

        <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
          <button
            onClick={() => toggleWishlist(product)}
            aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
            data-cursor="pointer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 backdrop-blur-sm transition-transform hover:scale-105"
          >
            <Heart className={cn("h-4 w-4", saved && "fill-gold text-gold")} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => setQuickView(true)}
            aria-label={`Quick view - ${product.name}`}
            data-cursor="pointer"
            className="group flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 backdrop-blur-sm transition-transform hover:scale-105"
          >
            <Eye className="h-4 w-4 transition-colors group-hover:text-gold" strokeWidth={1.5} />
          </button>
        </div>

        <motion.button
          onClick={isComingSoon ? undefined : () => addToCart(product)}
          data-cursor={isComingSoon ? undefined : "pointer"}
          initial={{ y: "120%" }}
          animate={{ y: hovered ? "0%" : "120%" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "absolute inset-x-3 bottom-3 z-10 flex h-11 items-center justify-center gap-2 rounded-full text-[12px] font-medium uppercase tracking-wide",
            isComingSoon
              ? "bg-gold text-ink"
              : "bg-ink text-paper"
          )}
        >
          {isComingSoon ? (
            "Coming Soon"
          ) : (
            <>
              <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />
              Add to Cart
            </>
          )}
        </motion.button>
      </div>

      <QuickViewModal product={product} open={quickView} onClose={() => setQuickView(false)} />

      <Link href={`/shop/${product.slug}`} data-cursor="pointer" className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="mt-1 text-sm text-ink-muted">{product.colorway}</p>
        </div>
        <p className="shrink-0 text-sm">{formatPrice(product.price)}</p>
      </Link>
    </motion.div>
  );
}
