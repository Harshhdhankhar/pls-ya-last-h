"use client";

import { Package } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { orders } from "@/lib/memberData";
import { SectionHeader } from "@/components/account/SectionHeader";
import { EmptyState } from "@/components/account/EmptyState";
import { OrderCard } from "@/components/account/OrderCard";

export default function OrdersPage() {
  const { user } = useAuth();
  if (!user) return null;

  if (user.isGuest) {
    return (
      <div>
        <SectionHeader eyebrow="History" title="Your Orders" />
        <EmptyState
          icon={Package}
          title="Sign in to view your orders"
          description="Create an account or sign in to view your order history and delivery tracking."
          actionLabel="Sign In"
          actionHref="/sign-in"
        />
      </div>
    );
  }

  const currentOrders = orders.filter((o) => o.status === "Processing" || o.status === "Shipped");
  const pastOrders = orders.filter((o) => o.status === "Delivered" || o.status === "Cancelled");

  return (
    <div>
      <SectionHeader
        eyebrow="History"
        title="Your Orders"
        description="Track deliveries, review invoices and revisit past purchases."
      />

      {orders.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No orders yet"
          description="You haven't placed an order yerowse the collection and find your next pair."
          actionLabel="Explore the Collection"
          actionHref="/shop"
        />
      ) : (
        <div className="space-y-14">
          <div>
            <p className="mb-6 font-medium">In Progress</p>
            {currentOrders.length === 0 ? (
              <p className="text-sm leading-relaxed text-ink-muted">No active orders.</p>
            ) : (
              <div className="space-y-6">
                {currentOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="mb-6 font-medium">Completed</p>
            {pastOrders.length === 0 ? (
              <p className="text-sm leading-relaxed text-ink-muted">No completed orders yet.</p>
            ) : (
              <div className="space-y-6">
                {pastOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
