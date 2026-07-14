"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useStore } from "@/lib/store";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export function WishlistDrawer() {
  const { wishlist, wishlistOpen, closeWishlist, toggleWishlist, addToCart } = useStore();
  const items = products.filter((p) => wishlist.includes(p.slug));

  return (
    <Drawer open={wishlistOpen} onClose={closeWishlist} title={`Wishlist (${items.length})`}>
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 px-7 text-center">
          <p className="font-display text-2xl">Your list is empty</p>
          <p className="text-sm text-ink-muted">
            Tap the heart on any style to add it to your wishlist.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-line px-7">
          {items.map((item) => (
            <li key={item.slug} className="flex gap-4 py-6">
              <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-paper-soft">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium leading-tight">{item.name}</p>
                    <p className="mt-1 text-xs text-ink-muted">{item.colorway}</p>
                    <p className="mt-1 text-sm">{formatPrice(item.price)}</p>
                  </div>
                  <button
                    onClick={() => toggleWishlist(item)}
                    aria-label={`Remove ${item.name} from your wishlist`}
                    data-cursor="pointer"
                    className="text-ink-faint transition-colors hover:text-ink"
                  >
                    <X className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  data-cursor="pointer"
                  className="link-underline self-start text-xs font-medium uppercase tracking-wide"
                >
                  Add to Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {items.length > 0 && (
        <div className="border-t border-line px-7 py-7">
          <MagneticButton variant="outline" size="lg" className="w-full" onClick={closeWishlist}>
            Continue Exploring
          </MagneticButton>
        </div>
      )}
    </Drawer>
  );
}
