"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/data";

export type CartItem = {
  slug: string;
  name: string;
  line: string;
  price: number;
  colorway: string;
  image: string;
  qty: number;
};

type StoreState = {
  cart: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  wishlistOpen: boolean;
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  setQty: (slug: string, qty: number) => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (slug: string) => boolean;
  openCart: () => void;
  closeCart: () => void;
  openWishlist: () => void;
  closeWishlist: () => void;
  cartCount: number;
  subtotal: number;
};

const StoreContext = createContext<StoreState | null>(null);

const CART_KEY = "sole-arium.cart";
const WISHLIST_KEY = "sole-arium.wishlist";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const w = localStorage.getItem(WISHLIST_KEY);
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const value = useMemo<StoreState>(() => {
    const addToCart = (product: Product) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.slug === product.slug);
        if (existing) {
          return prev.map((i) =>
            i.slug === product.slug ? { ...i, qty: i.qty + 1 } : i
          );
        }
        return [
          ...prev,
          {
            slug: product.slug,
            name: product.name,
            line: product.line,
            price: product.price,
            colorway: product.colorway,
            image: product.image,
            qty: 1,
          },
        ];
      });
      setCartOpen(true);
    };

    const removeFromCart = (slug: string) =>
      setCart((prev) => prev.filter((i) => i.slug !== slug));

    const clearCart = () => setCart([]);

    const setQty = (slug: string, qty: number) =>
      setCart((prev) =>
        qty <= 0
          ? prev.filter((i) => i.slug !== slug)
          : prev.map((i) => (i.slug === slug ? { ...i, qty } : i))
      );

    const toggleWishlist = (product: Product) =>
      setWishlist((prev) =>
        prev.includes(product.slug)
          ? prev.filter((s) => s !== product.slug)
          : [...prev, product.slug]
      );

    const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

    return {
      cart,
      wishlist,
      cartOpen,
      wishlistOpen,
      addToCart,
      removeFromCart,
      clearCart,
      setQty,
      toggleWishlist,
      isWishlisted: (slug: string) => wishlist.includes(slug),
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      openWishlist: () => setWishlistOpen(true),
      closeWishlist: () => setWishlistOpen(false),
      cartCount,
      subtotal,
    };
  }, [cart, wishlist, cartOpen, wishlistOpen]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
