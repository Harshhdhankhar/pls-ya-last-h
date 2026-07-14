"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/navbar/MobileMenu";
import { SearchOverlay } from "@/components/navbar/SearchOverlay";
import { AccountMenu } from "@/components/navbar/AccountMenu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, wishlist, openCart, openWishlist } = useStore();
  const compactNav = scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-all duration-500 ease-premium",
          scrolled
            ? "bg-paper/90 backdrop-blur-xl border-b border-line"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div
          className={cn(
            "container flex items-center justify-between transition-all duration-500 ease-premium",
            compactNav ? "h-10 md:h-12" : "h-20 md:h-24"
          )}
        >
          <Link
            href="/"
            data-cursor="pointer"
            className="flex items-center"
          >
            <Image
              src="/logo.png"
              alt="Sole-arium home"
              width={752}
              height={332}
              className="h-14 w-auto md:h-16"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === "/shop" && pathname.startsWith("/shop"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-cursor="pointer"
                  className={cn(
                    "link-underline text-[13px] font-medium uppercase tracking-wide text-ink transition-colors",
                    isActive && "text-gold-deep after:!scale-x-100 after:!bg-gold"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 md:gap-2.5">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              data-cursor="pointer"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>

            <AccountMenu />

            <ThemeToggle className="hidden sm:flex" />

            <button
              onClick={openWishlist}
              aria-label="Wishlist"
              data-cursor="pointer"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 sm:flex"
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold text-[9px] font-semibold text-ink">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={openCart}
              aria-label="Bag"
              data-cursor="pointer"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold text-[9px] font-semibold text-ink">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              data-cursor="pointer"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.25 }}
                  className="flex"
                >
                  {mobileOpen ? (
                    <X className="h-5 w-5" strokeWidth={1.5} />
                  ) : (
                    <Menu className="h-5 w-5" strokeWidth={1.5} />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
