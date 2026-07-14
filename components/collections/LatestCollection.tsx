import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/products/ProductCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

export function LatestCollection() {
  const items = products.filter((p) => !p.comingSoon).slice(0, 4);

  return (
    <section id="latest-arrivals" data-landing-snap className="section min-h-[100svh] bg-paper-soft !pt-16 md:!pt-20">
      <div className="container">
        <Reveal className="mb-14 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div>
            <span className="eyebrow mb-4 block">The Collections</span>
            <h2 className="font-display text-4xl tracking-editorial md:text-6xl">
              Latest Arrivals
            </h2>
          </div>
          <MagneticButton href="/shop" variant="outline" magnetic={false}>
            View all Collections
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </MagneticButton>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-3 md:gap-x-8">
          {items.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
