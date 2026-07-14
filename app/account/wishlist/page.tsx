"use client";

import { useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { products } from "@/lib/data";
import { SectionHeader } from "@/components/account/SectionHeader";
import { WishlistItemCard } from "@/components/account/WishlistItemCard";
import { EmptyState } from "@/components/account/EmptyState";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.slug));
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareData = {
      title: "My Sole-arium Wishlist",
      text: "A few silhouettes I have my eye on.",
      url,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelleo action needed
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <SectionHeader
        eyebrow={`${items.length} in wishlist`}
        title="Wishlist"
        description="Silhouettes you have your eye on."
        action={
          items.length > 0 && (
            <button
              onClick={handleShare}
              data-cursor="pointer"
              className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink"
            >
              <Share2 className="h-4 w-4" strokeWidth={1.5} />
              {copied ? "Link Copied" : "Share"}
            </button>
          )
        }
      />

      {items.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Build your wishlist"
          description="Tap the heart on any product to add it to your wishlist."
          actionLabel="Explore the Collection"
          actionHref="/shop"
        />
      ) : (
        <div className="space-y-6">
          {items.map((product, i) => (
            <WishlistItemCard key={product.slug} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
