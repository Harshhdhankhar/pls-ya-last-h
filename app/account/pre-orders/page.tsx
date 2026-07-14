"use client";

import { useState } from "react";
import { Watch } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { preorders as initialPreorders, type Preorder } from "@/lib/memberData";
import { SectionHeader } from "@/components/account/SectionHeader";
import { PreorderCard } from "@/components/account/PreorderCard";
import { EmptyState } from "@/components/account/EmptyState";

export default function PreOrdersPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<Preorder[]>(initialPreorders);

  const handleCancel = (id: string) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Cancelled", canCancel: false, canUpgradeShipping: false } : p))
    );
  };

  if (user?.isGuest) {
    return (
      <div>
        <SectionHeader eyebrow="Reservations" title="Pre-orders" />
        <EmptyState
          icon={Watch}
          title="Sign in to view your reservations"
          description="Create an account or sign in to follow the progress of your reserved silhouettes."
          actionLabel="Sign In"
          actionHref="/sign-in"
        />
      </div>
    );
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Reservations"
        title="Pre-orders"
        description="Follow each silhouette from reservation to arrival."
      />

      {items.length === 0 ? (
        <EmptyState
          icon={Watch}
          title="Reserve your first pair"
          description="Limited runs move fast. Browse the current drop and reserve before it's gone."
          actionLabel="Explore the Collection"
          actionHref="/shop"
        />
      ) : (
        <div className="space-y-6">
          {items.map((preorder) => (
            <PreorderCard key={preorder.id} preorder={preorder} onCancel={handleCancel} />
          ))}
        </div>
      )}
    </div>
  );
}
