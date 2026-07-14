"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Truck } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Preorder } from "@/lib/memberData";
import { Timeline } from "@/components/account/Timeline";
import { MagneticButton } from "@/components/ui/MagneticButton";

const statusStyles: Record<Preorder["status"], string> = {
  Reserved: "border-line text-ink-muted",
  "In Production": "border-gold text-gold-deep bg-gold/10",
  "Ready to Ship": "border-ink text-ink",
  Shipped: "border-ink bg-ink text-paper",
  Cancelled: "border-line text-ink-faint",
};

const SHIPPING_TIERS = [
  { id: "standard", label: "Standard", detail: "Included", price: 0 },
  { id: "express", label: "Express", detail: "2-3 days faster", price: 25 },
  { id: "priority", label: "Priority", detail: "Fastest available", price: 45 },
];

export function PreorderCard({
  preorder,
  onCancel,
}: {
  preorder: Preorder;
  onCancel: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const [shippingTier, setShippingTier] = useState("standard");
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [upgraded, setUpgraded] = useState(false);

  const { product } = preorder;

  return (
    <div className="rounded-2xl border border-line p-6 md:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-paper-soft">
            <Image src={product.image} alt={product.name} fill sizes="80px" className="object-cover" />
          </div>
          <div>
            <p className="text-xs text-ink-faint">{preorder.id}</p>
            <p className="mt-0.5 font-display text-xl tracking-editorial">{product.name}</p>
            <p className="text-sm text-ink-muted">
              {product.colorway} · US {preorder.size}
            </p>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex w-fit items-center rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wide",
            statusStyles[preorder.status]
          )}
        >
          {preorder.status}
        </span>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-6 sm:grid-cols-4">
        <div>
          <p className="eyebrow text-ink-faint">Progress</p>
          <p className="mt-1.5 font-medium">{preorder.progressPercent}%</p>
        </div>
        <div>
          <p className="eyebrow text-ink-faint">Est. Delivery</p>
          <p className="mt-1.5 font-medium">{preorder.estimatedDelivery}</p>
        </div>
        <div>
          <p className="eyebrow text-ink-faint">Payment</p>
          <p className="mt-1.5 font-medium">{preorder.paymentStatus}</p>
        </div>
        <div>
          <p className="eyebrow text-ink-faint">Placed on</p>
          <p className="mt-1.5 font-medium">{preorder.placedOn}</p>
        </div>
      </div>

      <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-line">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${preorder.progressPercent}%` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={cn("h-full rounded-full", preorder.status === "Cancelled" ? "bg-ink-faint" : "bg-gold")}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setExpanded((v) => !v)}
          data-cursor="pointer"
          className="flex items-center gap-1.5 text-sm font-medium text-ink"
        >
          View Timeline
          <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} strokeWidth={1.5} />
        </button>

        {preorder.canUpgradeShipping && preorder.status !== "Cancelled" && (
          <button
            onClick={() => setUpgrading((v) => !v)}
            data-cursor="pointer"
            className="flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            <Truck className="h-4 w-4" strokeWidth={1.5} />
            Upgrade Shipping
          </button>
        )}

        {preorder.canCancel && preorder.status !== "Cancelled" && (
          <button
            onClick={() => setConfirmCancel(true)}
            data-cursor="pointer"
            className="text-sm font-medium text-ink-muted transition-colors hover:text-gold-deep"
          >
            Cancel Reservation
          </button>
        )}
      </div>

      {upgraded && (
        <p className="mt-4 text-sm text-gold-deep">
          Upgraded to {SHIPPING_TIERS.find((t) => t.id === shippingTier)?.label} shipping.
        </p>
      )}

      {upgrading && (
        <div className="mt-6 rounded-xl border border-line p-5">
          <p className="mb-4 text-sm font-medium">Choose a shipping speed</p>
          <div className="space-y-2.5">
            {SHIPPING_TIERS.map((tier) => (
              <label
                key={tier.id}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 text-sm transition-colors",
                  shippingTier === tier.id ? "border-ink" : "border-line"
                )}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name={`shipping-${preorder.id}`}
                    checked={shippingTier === tier.id}
                    onChange={() => setShippingTier(tier.id)}
                    className="h-4 w-4 accent-ink"
                  />
                  {tier.label}
                  <span className="text-ink-faint">{tier.detail}</span>
                </span>
                <span>{tier.price === 0 ? "Free" : formatPrice(tier.price)}</span>
              </label>
            ))}
          </div>
          <MagneticButton
            size="sm"
            className="mt-4"
            magnetic={false}
            onClick={() => {
              setUpgraded(true);
              setUpgrading(false);
            }}
          >
            Confirm
          </MagneticButton>
        </div>
      )}

      {confirmCancel && (
        <div className="mt-6 rounded-xl border border-gold/40 bg-gold/[0.06] p-5">
          <p className="text-sm font-medium">Cancel this reservation?</p>
          <p className="mt-1.5 text-sm text-ink-muted">
            This can&rsquo;t be undone. Your deposit will be refunded within 5 business days.
          </p>
          <div className="mt-4 flex gap-3">
            <MagneticButton
              size="sm"
              variant="outline"
              magnetic={false}
              onClick={() => {
                onCancel(preorder.id);
                setConfirmCancel(false);
              }}
            >
              Yes, Cancel
            </MagneticButton>
            <MagneticButton size="sm" variant="ghost" magnetic={false} onClick={() => setConfirmCancel(false)}>
              Keep Reservation
            </MagneticButton>
          </div>
        </div>
      )}

      {expanded && (
        <div className="mt-7 border-t border-line pt-7">
          <Timeline steps={preorder.timeline} />
        </div>
      )}
    </div>
  );
}
