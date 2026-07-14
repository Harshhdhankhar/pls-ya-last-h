"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { accountNav } from "@/components/account/accountNav";
import { MembershipBadge } from "@/components/account/MembershipBadge";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function UserCard({ compact = false }: { compact?: boolean }) {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className={cn("flex items-center gap-3.5", compact && "gap-3")}>
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-ink font-display text-paper",
          compact ? "h-10 w-10 text-sm" : "h-12 w-12 text-base"
        )}
      >
        {user.isGuest ? "G" : initials(user.name)}
      </span>
      <div className="min-w-0">
        <p className="truncate font-medium leading-tight">{user.name}</p>
        <MembershipBadge level={user.membershipLevel} className="mt-1.5" />
      </div>
    </div>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {accountNav.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            data-cursor="pointer"
            className={cn(
              "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
              isActive ? "bg-ink text-paper" : "text-ink-muted hover:bg-paper-soft hover:text-ink"
            )}
          >
            <item.icon
              className={cn("h-[18px] w-[18px]", isActive ? "text-gold" : "text-ink-faint group-hover:text-ink")}
              strokeWidth={1.5}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AccountShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/sign-in");
  }, [status, router]);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-ink" />
          <span className="eyebrow text-ink-muted">Loading your account</span>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              data-cursor="pointer"
              className="hidden items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink lg:flex"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              Back to site
            </Link>
            <Link href="/account" className="lg:hidden">
              <Image src="/logo.png" alt="Sole-arium" width={752} height={332} className="h-14 w-auto" priority />
            </Link>
          </div>

          <span className="font-display text-lg tracking-editorial text-ink-muted lg:hidden">
            Account
          </span>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              data-cursor="pointer"
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-paper-soft"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              data-cursor="pointer"
              className="flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
              Log Out
            </button>
          </div>
        </div>
      </header>

      <div className="container grid grid-cols-1 gap-10 py-10 lg:grid-cols-[260px_1fr] lg:gap-14 lg:py-14">
        <aside className="hidden lg:block">
          <div className="sticky top-32 space-y-8">
            <div className="rounded-2xl border border-line p-5">
              <UserCard />
            </div>
            <NavList />
          </div>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[90] bg-ink/30 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 z-[95] flex h-full w-full max-w-xs flex-col bg-paper lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between border-b border-line px-6 py-6">
                <UserCard compact />
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                  data-cursor="pointer"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-paper-soft"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <NavList onNavigate={() => setMobileOpen(false)} />
              </div>
              <div className="border-t border-line p-4">
                <button
                  onClick={handleLogout}
                  data-cursor="pointer"
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-ink-muted hover:bg-paper-soft hover:text-ink"
                >
                  <LogOut className="h-[18px] w-[18px]" strokeWidth={1.5} />
              Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
