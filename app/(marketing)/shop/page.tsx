import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopGrid } from "@/components/products/ShopGrid";
import { Reveal, RevealText } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Shop Custom Footwear",
  description:
    "Every Sole-arium silhouettade to order in premium leather and knit, built around how you move and customised to your taste.",
};

export default function ShopPage() {
  return (
    <div className="pt-28 md:pt-32">
      <section className="section pb-14 pt-0 md:pb-20">
        <div className="container">
          <span className="eyebrow mb-6 block">Shop</span>
          <h1 className="max-w-3xl font-display text-5xl leading-[1.1] tracking-editorial md:text-7xl">
            <RevealText text="Custom Footwear For Your Stride" />
          </h1>
          <Reveal delay={0.2} className="mt-7 max-w-md">
            <p className="text-pretty text-lg leading-relaxed text-ink-muted">
              Every pair is Crafted for you. Built around how you move and finished in
              your choice of colour, material and detail. Filter by line or browse everything.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container">
          <Suspense fallback={<div className="h-40 animate-pulse rounded bg-paper-soft" />}>
            <ShopGrid />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
