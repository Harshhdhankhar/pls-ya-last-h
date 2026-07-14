"use client";

import { useState } from "react";
import Link from "next/link";
import { Footprints, Heart, ShieldCheck } from "lucide-react";
import type { Product } from "@/lib/data";
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

const FINISHES = ["Matte", "Grain", "Suede"] as const;
const ACCENTS = [
  { label: "Gold", color: "#e8a020" },
  { label: "Tonal", color: "#8a8378" },
  { label: "Onyx", color: "#1c1c1c" },
] as const;

const availabilityStyles: Record<NonNullable<Product["availability"]>, string> = {
  "In Stock": "border-line text-ink-muted",
  "Low Stock": "border-gold text-gold-deep bg-gold/10",
  "Pre-Order": "border-gold text-gold-deep bg-gold/10",
  "Sold Out": "border-line text-ink-faint",
};

export function PurchasePanel({
  product,
  variants,
  reserved,
  onReserve,
}: {
  product: Product;
  variants: Product[];
  reserved: boolean;
  onReserve: () => void;
}) {
  const { toggleWishlist, isWishlisted } = useStore();

  const [finish, setFinish] = useState<(typeof FINISHES)[number]>("Matte");
  const [accent, setAccent] = useState<string>(ACCENTS[0].label);
  const [monogram, setMonogram] = useState("");

  const saved = isWishlisted(product.slug);
  const availability = product.availability ?? "In Stock";
  const soldOut = availability === "Sold Out";
  const badgeLabel = product.badge ?? (availability === "Pre-Order" ? "Crafted for you" : undefined);

  return (
    <div>
      {badgeLabel && (
        <span className="mb-4 inline-flex items-center rounded-full border border-gold bg-gold/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-gold-deep">
          {badgeLabel}
        </span>
      )}

      <p className="text-xs uppercase tracking-wide text-ink-faint">{product.line}</p>
      <h1 className="mt-1.5 font-display text-4xl tracking-editorial md:text-5xl">{product.name}</h1>

      <p className="mt-4 text-2xl text-ink-muted">
        {product.price ? formatPrice(product.price) : "Price Coming Soon"}
      </p>

      {product.description && (
        <p className="mt-5 max-w-md text-pretty leading-relaxed text-ink-muted">{product.description}</p>
      )}

      {variants.length > 1 && (
        <div className="mt-8">
          <p className="eyebrow mb-3 text-ink-faint">
            Colour - <span className="normal-case tracking-normal text-ink">{product.colorway}</span>
          </p>
          <div className="flex gap-2.5">
            {variants.map((variant) => {
              const key = variant.colorway.split(" / ")[0];
              const isActive = variant.slug === product.slug;
              return (
                <Link
                  key={variant.slug}
                  href={`/shop/${variant.slug}`}
                  aria-label={variant.colorway}
                  data-cursor="pointer"
                  className={cn(
                    "h-8 w-8 rounded-full border-2 transition-transform",
                    isActive ? "border-gold scale-110 ring-1 ring-gold/30" : "border-transparent hover:scale-105"
                  )}
                  style={{ backgroundColor: swatchColor[key] ?? "#cccccc" }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Aesthetic customisation */}
      <div className="mt-8 border-t border-line pt-8">
        <p className="eyebrow mb-3 text-ink-faint">
          Finish - <span className="normal-case tracking-normal text-ink">{finish}</span>
        </p>
        <div className="flex flex-wrap gap-2.5">
          {FINISHES.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFinish(f)}
              data-cursor="pointer"
              className={cn(
                "rounded-full border px-4 py-2 text-xs transition-colors",
                finish === f
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-muted hover:border-ink/40"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="eyebrow mb-3 text-ink-faint">
          Accent - <span className="normal-case tracking-normal text-ink">{accent}</span>
        </p>
        <div className="flex gap-2.5">
          {ACCENTS.map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={() => setAccent(a.label)}
              aria-label={a.label}
              data-cursor="pointer"
              className={cn(
                "h-8 w-8 rounded-full border-2 transition-transform",
                accent === a.label
                  ? "border-gold scale-110 ring-1 ring-gold/30"
                  : "border-transparent hover:scale-105"
              )}
              style={{ backgroundColor: a.color }}
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="eyebrow mb-3 text-ink-faint">Monogram - optional</p>
        <input
          value={monogram}
          maxLength={3}
          onChange={(e) => setMonogram(e.target.value.toUpperCase())}
          placeholder="Up to 3 initials"
          className="w-full max-w-[200px] rounded-full border border-line bg-transparent px-4 py-2.5 text-sm uppercase tracking-widest text-ink placeholder:normal-case placeholder:tracking-normal placeholder:text-ink-faint focus:border-ink focus:outline-none"
        />
      </div>

      <div id="pdp-purchase" className="scroll-mt-32" />

      <div className="mt-8 flex items-center gap-3">
        <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-wide", availabilityStyles[availability])}>
          {availability}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-ink-faint">
          <Footprints className="h-3.5 w-3.5" strokeWidth={1.5} />
          Shaped to how you walk
        </span>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <MagneticButton
          variant="solid"
          size="lg"
          onClick={onReserve}
          disabled={soldOut}
          className="flex-1"
          magnetic={false}
        >
          {soldOut ? "Sold Out" : reserved ? "Added to Cart" : "Add to Cart"}
        </MagneticButton>
        <button
          onClick={() => toggleWishlist(product)}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          data-cursor="pointer"
          className={cn(
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-colors",
            saved ? "border-gold bg-gold/10" : "border-line hover:border-ink"
          )}
        >
          <Heart className={cn("h-5 w-5", saved && "fill-gold text-gold")} strokeWidth={1.5} />
        </button>
      </div>

      {reserved && (
        <p className="mt-3 text-xs text-gold-deep">
          Added to your caronfirm your custom order at checkout with a ₹999 advance.
        </p>
      )}

      <div className="mt-10 space-y-4 border-t border-line pt-8 text-sm">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" strokeWidth={1.5} />
          <p className="text-ink-muted">Recommendations are provided for guidance only and should not replace professional medical or clinical assessment.</p>
        </div>
      </div>

      {product.highlights && product.highlights.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2 border-t border-line pt-8">
          {product.highlights.map((h) => (
            <span
              key={h}
              className="rounded-full border border-line px-3 py-1.5 text-xs text-ink-muted transition-colors hover:border-gold/40"
            >
              {h}
            </span>
          ))}
        </div>
      )}

    </div>
  );
}
