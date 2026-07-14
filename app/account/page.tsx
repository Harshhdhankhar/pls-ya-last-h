"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Sparkles, Watch } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { products } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";
import {
  preorders,
  activity,
  upcomingReleases,
  recommendedProducts,
  membershipBenefits,
} from "@/lib/memberData";
import { SectionHeader } from "@/components/account/SectionHeader";
import { StatCard } from "@/components/account/StatCard";
import { ProductCard } from "@/components/products/ProductCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

export default function AccountOverviewPage() {
  const { user } = useAuth();
  const { wishlist } = useStore();
  if (!user) return null;

  const firstName = user.isGuest ? "there" : user.name.split(" ")[0];
  const wishlisted = products.filter((p) => wishlist.includes(p.slug));
  const activePreorders = user.isGuest ? [] : preorders.filter((p) => p.status !== "Shipped");
  const benefits = membershipBenefits[user.membershipLevel] ?? [];

  return (
    <div>
      <SectionHeader
        eyebrow="Overview"
        title={`Good to see you, ${firstName}`}
        description={
          user.isGuest
            ? "Browsing as a guesreate an account to save your wishlist and track reservations."
            : "Your reservations, wishlist and studio updatell in one place."
        }
        action={
          user.isGuest && (
            <MagneticButton href="/create-account" variant="solid">
              Join the Studio
            </MagneticButton>
          )
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        <StatCard label="Status" value={user.membershipLevel} delay={0} />
        <StatCard label="Joined" value={user.memberSince || "-"} delay={0.05} />
        <StatCard
          label="Early Access"
          value={user.earlyAccess ? "Active" : "Not Yet"}
          hint={user.earlyAccess ? "24 hours before the public" : "Unlocks at Founding tier"}
          accent={user.earlyAccess}
          delay={0.1}
        />
        <StatCard
          label="Points"
          value={user.points.toLocaleString()}
          hint={user.isGuest ? "Sign in to earn points" : "Earned with every order"}
          delay={0.15}
        />
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
        <Reveal className="rounded-2xl border border-line p-7">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Watch className="h-4 w-4 text-gold" strokeWidth={1.5} />
              <p className="font-medium">Pre-orders</p>
            </div>
            <Link href="/account/pre-orders" className="link-underline text-sm text-ink-muted" data-cursor="pointer">
              View All
            </Link>
          </div>

          {activePreorders.length === 0 ? (
            <p className="text-sm leading-relaxed text-ink-muted">
              {user.isGuest ? "Sign in to view your reservations." : "No active reservations right now."}
            </p>
          ) : (
            <div className="space-y-5">
              {activePreorders.slice(0, 2).map((p) => (
                <div key={p.id} className="flex items-center gap-4">
                  <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-paper-soft">
                    <Image src={p.product.image} alt={p.product.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{p.product.name}</p>
                    <p className="text-xs text-ink-muted">{p.status}</p>
                  </div>
                  <div className="h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-line">
                    <div className="h-full bg-gold" style={{ width: `${p.progressPercent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.08} className="rounded-2xl border border-line p-7">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="h-4 w-4 text-gold" strokeWidth={1.5} />
              <p className="font-medium">Wishlist</p>
            </div>
            <Link href="/account/wishlist" className="link-underline text-sm text-ink-muted" data-cursor="pointer">
              View All
            </Link>
          </div>

          {wishlisted.length === 0 ? (
            <p className="text-sm leading-relaxed text-ink-muted">
              Nothing in your wishlist yeap the heart on any silhouette to add it.
            </p>
          ) : (
            <div className="flex items-center gap-3">
              {wishlisted.slice(0, 4).map((p) => (
                <div key={p.slug} className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-paper-soft">
                  <Image src={p.image} alt={p.name} fill sizes="56px" className="object-cover" />
                </div>
              ))}
              {wishlisted.length > 4 && (
                <span className="text-sm text-ink-muted">+{wishlisted.length - 4} more</span>
              )}
            </div>
          )}
        </Reveal>
      </div>

      <Reveal className="mt-14">
        <p className="mb-6 font-medium">Activity</p>
        <div className="divide-y divide-line rounded-2xl border border-line">
          {activity.slice(0, 5).map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4 px-6 py-4">
              <p className="text-sm text-ink">{item.message}</p>
              <span className="shrink-0 text-xs text-ink-faint">{item.date}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-14">
        <div className="mb-6 flex items-center justify-between">
          <p className="font-medium">Coming Soon</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {upcomingReleases.map((release, i) => (
            <Reveal key={release.id} delay={i * 0.06} className="group overflow-hidden rounded-2xl border border-line">
              <div className="relative aspect-[4/3] overflow-hidden bg-paper-soft">
                <Image
                  src={release.image}
                  alt={release.name}
                  fill
                  sizes="320px"
                  className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="font-medium">{release.name}</p>
                <p className="mt-1 text-sm text-ink-muted">{release.dropDate}</p>
                <button
                  data-cursor="pointer"
                  className={cn(
                    "mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wide",
                    release.notifyEnabled ? "text-gold-deep" : "text-ink-muted"
                  )}
                >
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {release.notifyEnabled ? "Notifications On" : "Notify Me"}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <div className="mb-6 flex items-center justify-between">
          <p className="font-medium">You Might Also Like</p>
          <Link href="/shop" className="link-underline text-sm text-ink-muted" data-cursor="pointer">
            Browse All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {recommendedProducts.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>
      </div>

      <Reveal className="mt-14 rounded-2xl border border-line bg-paper-soft p-7 md:p-10">
          <p className="font-medium">Member Benefits</p>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <div>
                <p className="text-sm font-medium">{benefit.title}</p>
                <p className="mt-1 text-sm text-ink-muted">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
        {user.membershipLevel !== "Icon Status" && !user.isGuest && (
          <Link
            href="/account/settings"
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink"
            data-cursor="pointer"
          >
            See how to unlock your next tier
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        )}
      </Reveal>
    </div>
  );
}
