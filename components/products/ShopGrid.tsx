"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { products } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/products/ProductCard";

export function ShopGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("filter");

  const filtered = useMemo(() => {
    if (active === "coming-soon") return products.filter((p) => p.comingSoon);
    return products;
  }, [active]);

  const setFilter = (filter: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filter) params.set("filter", filter);
    else params.delete("filter");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <div>
      <div className="mb-12 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setFilter(null)}
          data-cursor="pointer"
          className={cn(
            "rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors",
            !active ? "bg-ink text-paper" : "border border-line text-ink-muted hover:border-ink/40"
          )}
        >
          ALL
        </button>
        <button
          type="button"
          onClick={() => setFilter("coming-soon")}
          data-cursor="pointer"
          className={cn(
            "rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors",
            active === "coming-soon"
              ? "bg-ink text-paper"
              : "border border-line text-ink-muted hover:border-ink/40"
          )}
        >
          COMING SOON
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-ink-muted">No silhouettes in this filter yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
          {filtered.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
