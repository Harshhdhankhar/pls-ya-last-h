"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Minus, Plus, X } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { cart, cartOpen, closeCart, setQty, removeFromCart, subtotal } = useStore();
  const router = useRouter();

  const goToCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <Drawer open={cartOpen} onClose={closeCart} title={`Cart (${cart.length})`}>
      {cart.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 px-7 text-center">
          <p className="font-display text-2xl">Your cart is empty</p>
          <p className="text-sm text-ink-muted">
            Browse the collection and add a pair built around how you move.
          </p>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <ul className="flex-1 divide-y divide-line px-7">
            {cart.map((item) => (
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
                    </div>
                    <button
                      onClick={() => removeFromCart(item.slug)}
                      aria-label={`Remove ${item.name}`}
                      data-cursor="pointer"
                      className="text-ink-faint transition-colors hover:text-ink"
                    >
                      <X className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 rounded-full border border-line px-2 py-1">
                      <button
                        onClick={() => setQty(item.slug, item.qty - 1)}
                        aria-label="Decrease quantity"
                        data-cursor="pointer"
                        className="flex h-5 w-5 items-center justify-center"
                      >
                        <Minus className="h-3 w-3" strokeWidth={1.5} />
                      </button>
                      <span className="w-4 text-center text-xs">{item.qty}</span>
                      <button
                        onClick={() => setQty(item.slug, item.qty + 1)}
                        aria-label="Increase quantity"
                        data-cursor="pointer"
                        className="flex h-5 w-5 items-center justify-center"
                      >
                        <Plus className="h-3 w-3" strokeWidth={1.5} />
                      </button>
                    </div>
                    <span className="text-sm">{formatPrice(item.price * item.qty)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-line px-7 py-7">
            <div className="mb-5 flex items-center justify-between text-sm">
              <span className="text-ink-muted">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <MagneticButton
              variant="solid"
              size="lg"
              className="w-full"
              magnetic={false}
              onClick={goToCheckout}
            >
              Checkout
            </MagneticButton>
            <p className="mt-4 text-center text-[11px] leading-relaxed text-ink-faint">
              Every pair is Crafted for you. Confirm at checkout with a ₹999 advance;
              balance due before dispatch.
            </p>
          </div>
        </div>
      )}
    </Drawer>
  );
}
