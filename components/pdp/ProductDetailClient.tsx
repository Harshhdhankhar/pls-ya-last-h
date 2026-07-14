"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Product } from "@/lib/data";
import type { FootProblem } from "@/lib/footProblems";
import { useStore } from "@/lib/store";
import { ProductGallery } from "@/components/pdp/ProductGallery";
import { PurchasePanel } from "@/components/pdp/PurchasePanel";
import { MobileStickyBar } from "@/components/pdp/MobileStickyBar";
import { DetailGallery } from "@/components/pdp/DetailGallery";
import { DesignedFor } from "@/components/pdp/DesignedFor";
import { ProductCard } from "@/components/products/ProductCard";
import { Accordion, type AccordionEntry } from "@/components/ui/Accordion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealText } from "@/components/ui/Reveal";

const ORDER_FAQ: AccordionEntry[] = [
  {
    id: "faq-custom",
    question: "How is my pair customised?",
    answer:
      "Every pair is built around how you move and finished to your taste. You choose the colourway, finish, accent and an optional monogram - then it's Crafted for you in a limited run.",
  },
  {
    id: "faq-advance",
    question: "How does the ₹999 advance work?",
    answer:
      "Because each pair is Crafted for you, we confirm your order with a ₹999 advance at checkout. This locks in your customisation and starts production; the remaining balance is due before your pair is dispatched.",
  },
  {
    id: "faq-timeline",
    question: "How long until my pair arrives?",
    answer:
      "Crafted for you pairs are crafted by hand, so allow a little longer than off-the-shelf footwear. You'll see production and dispatch updates in your account, with tracking once it ships.",
  },
  {
    id: "faq-changes",
    question: "Can I change or cancel my order?",
    answer:
      "You can adjust your customisation or cancel for a full refund of the advance any time before your pair enters production. Once production begins, changes may not be possible.",
  },
];

export function ProductDetailClient({
  product,
  variants,
  related,
  designedFor,
}: {
  product: Product;
  variants: Product[];
  related: Product[];
  designedFor: FootProblem[];
}) {
  const { addToCart } = useStore();
  const [reserved, setReserved] = useState(false);

  const images = product.gallery?.length ? product.gallery : [product.image, product.hoverImage];
  const availability = product.availability ?? "In Stock";
  const soldOut = availability === "Sold Out";

  const detailsFaq: AccordionEntry[] = [
    ...(product.materials
      ? [{ id: "materials", question: "Materials", answer: product.materials }]
      : []),
    ...(product.fit ? [{ id: "fit", question: "Fit Notes", answer: product.fit }] : []),
  ];

  const handleReserve = () => {
    addToCart(product);
    setReserved(true);
    setTimeout(() => setReserved(false), 2400);
  };

  return (
    <div className="pb-24 pt-28 md:pb-0 md:pt-32">
      <div className="container">
        <Link
          href="/shop"
          data-cursor="pointer"
          className="mb-8 flex w-fit items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[62%_1fr] lg:gap-12">
          <ProductGallery images={images} productName={product.name} />

          <div className="lg:sticky lg:top-32 lg:self-start">
            <PurchasePanel
              product={product}
              variants={variants}
              reserved={reserved}
              onReserve={handleReserve}
            />
          </div>
        </div>
      </div>

      <DetailGallery images={images} productName={product.name} />

      <section className="section pt-0">
        <div className="container grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="eyebrow mb-4 block">Why This Pair</span>
            <h2 className="font-display text-3xl leading-[1.1] tracking-editorial md:text-5xl">
              <RevealText text="Considered From The First Stitch" />
            </h2>
            <Reveal delay={0.15} className="mt-6 max-w-lg">
              <p className="text-pretty text-lg leading-relaxed text-ink-muted">
                {product.description ??
                  "A single last refined across two hundred iterations, finished by hand in a limited run."}{" "}
                It disappears on the foot and lets everything else speauilt to be kept, not
                replaced each season.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <DesignedFor problems={designedFor} />

      {detailsFaq.length > 0 && (
        <section className="section">
          <div className="container max-w-2xl">
            <Reveal className="mb-10">
              <span className="eyebrow mb-4 block">Details</span>
              <h2 className="font-display text-4xl tracking-editorial md:text-5xl">Materials &amp; Fit</h2>
            </Reveal>
            <Reveal delay={0.1} className="rounded-2xl border border-line px-6 md:px-7">
              <Accordion items={detailsFaq} />
            </Reveal>
          </div>
        </section>
      )}

      <section className="section pt-0">
        <div className="container max-w-2xl">
          <Reveal className="mb-10">
            <span className="eyebrow mb-4 block">Crafted for you</span>
            <h2 className="font-display text-4xl tracking-editorial md:text-5xl">Ordering &amp; customisation</h2>
          </Reveal>
          <Reveal delay={0.1} className="rounded-2xl border border-line px-6 md:px-7">
            <Accordion items={ORDER_FAQ} />
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-paper-soft">
          <div className="container">
            <Reveal className="mb-14 md:mb-20">
              <span className="eyebrow mb-4 block">You May Also Like</span>
              <h2 className="font-display text-4xl tracking-editorial md:text-6xl">More From The Studio</h2>
            </Reveal>
            <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section text-center">
        <div className="container">
          <Reveal>
            <h2 className="font-display text-4xl tracking-editorial md:text-6xl">
              Ready to build yours?
            </h2>
            <p className="mx-auto mt-6 max-w-md text-ink-muted">
              Customise your finish, add it to cart and confirm with a ₹999 advance.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <MagneticButton
                variant="solid"
                size="lg"
                disabled={soldOut}
                onClick={() =>
                  document.getElementById("pdp-purchase")?.scrollIntoView({ behavior: "smooth", block: "center" })
                }
              >
                {soldOut ? "Sold Out" : "Customise & Add to Cart"}
              </MagneticButton>
              <MagneticButton href="/shop" variant="outline" size="lg">
                Browse All Silhouettes
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      <MobileStickyBar product={product} reserved={reserved} soldOut={soldOut} onReserve={handleReserve} />
    </div>
  );
}
