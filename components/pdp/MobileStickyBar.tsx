"use client";

import type { Product } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function MobileStickyBar({
  product,
  reserved,
  soldOut,
  onReserve,
}: {
  product: Product;
  reserved: boolean;
  soldOut: boolean;
  onReserve: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-paper/95 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <div className="flex items-center gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{product.name}</p>
          <p className="text-sm text-ink-muted">
            {product.price ? formatPrice(product.price) : "Price Coming Soon"}
          </p>
        </div>
        <MagneticButton
          variant="solid"
          size="md"
          onClick={onReserve}
          disabled={soldOut}
          magnetic={false}
          className="flex-1"
        >
          {soldOut ? "Sold Out" : reserved ? "Added to Cart" : "Add to Cart"}
        </MagneticButton>
      </div>
    </div>
  );
}
