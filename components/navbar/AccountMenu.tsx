"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, User, Watch, Heart } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { MembershipBadge } from "@/components/account/MembershipBadge";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function AccountMenu() {
  const { user, status, signOut } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (status === "loading") return null;

  if (status === "unauthenticated") {
    return (
      <Link
        href="/sign-in"
        data-cursor="pointer"
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
        aria-label="Sign in"
      >
        <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
      </Link>
    );
  }

  if (!user) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        data-cursor="pointer"
        aria-label="Account menu"
        className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-ink/5"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[11px] font-medium text-paper">
          {user.isGuest ? "G" : initials(user.name)}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-line bg-paper p-2 shadow-[0_20px_60px_-20px_rgb(var(--ink)/0.25)]"
          >
            <div className="border-b border-line p-4">
              <p className="font-medium">{user.isGuest ? "Guest" : user.name}</p>
              <MembershipBadge level={user.membershipLevel} className="mt-2" />
            </div>
            <div className="p-1.5">
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                data-cursor="pointer"
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-ink transition-colors hover:bg-paper-soft"
              >
                <User className="h-4 w-4 text-ink-faint" strokeWidth={1.5} />
                My Account
              </Link>
              <Link
                href="/account/pre-orders"
                onClick={() => setOpen(false)}
                data-cursor="pointer"
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-ink transition-colors hover:bg-paper-soft"
              >
                <Watch className="h-4 w-4 text-ink-faint" strokeWidth={1.5} />
                Pre-orders
              </Link>
              <Link
                href="/account/wishlist"
                onClick={() => setOpen(false)}
                data-cursor="pointer"
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-ink transition-colors hover:bg-paper-soft"
              >
                <Heart className="h-4 w-4 text-ink-faint" strokeWidth={1.5} />
                Wishlist
              </Link>
            </div>
            <div className="border-t border-line p-1.5">
              <button
                onClick={() => {
                  setOpen(false);
                  signOut();
                  router.push("/");
                }}
                data-cursor="pointer"
                className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-ink-muted transition-colors hover:bg-paper-soft hover:text-ink"
              >
                <LogOut className="h-4 w-4 text-ink-faint" strokeWidth={1.5} />
                Log Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
