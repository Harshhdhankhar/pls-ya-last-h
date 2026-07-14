import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

/** Enhanced presentation of the existing "suggested products" recommendation -
 *  same data/links as before, just a more considered product-card layout. */
export function StickyRecommendedCard({ products }: { products: Product[] }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
        Suggested Silhouettes
      </p>
      <div className="mt-4 space-y-4">
        {products.map((p) => (
          <Link
            key={p.slug}
            href="/shop"
            data-cursor="pointer"
            className="group flex items-center gap-3"
          >
            <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-paper-soft">
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="56px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{p.name}</p>
              <p className="text-xs text-ink-muted">{p.colorway}</p>
            </div>
            <p className="shrink-0 text-xs text-ink-muted">{formatPrice(p.price)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
