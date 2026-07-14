"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Truck } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Order, TimelineStep } from "@/lib/memberData";
import { Timeline } from "@/components/account/Timeline";

const statusStyles: Record<Order["status"], string> = {
  Processing: "border-gold text-gold-deep bg-gold/10",
  Shipped: "border-gold text-gold-deep bg-gold/10",
  Delivered: "border-ink bg-ink text-paper",
  Cancelled: "border-line text-ink-faint",
};

const STAGES: Order["status"][] = ["Processing", "Shipped", "Delivered"];

function buildTimeline(order: Order): TimelineStep[] {
  const currentIndex = order.status === "Cancelled" ? -1 : STAGES.indexOf(order.status);

  return [
    { label: "Order Placed", date: order.date, complete: true },
    { label: "Processing", date: order.date, complete: currentIndex >= 0 },
    {
      label: "Shipped",
      date: order.carrier ? `Via ${order.carrier}` : "",
      complete: currentIndex >= 1,
    },
    {
      label: "Delivered",
      date: order.deliveryEstimate ?? "",
      complete: currentIndex >= 2,
    },
  ];
}

export function OrderCard({ order }: { order: Order }) {
  const [tracking, setTracking] = useState(false);

  const timeline = buildTimeline(order);

  return (
    <div className="rounded-2xl border border-line p-6 md:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-ink-faint">{order.id}</p>
          <p className="mt-0.5 font-display text-xl tracking-editorial">{order.date}</p>
        </div>
        <span
          className={cn(
            "inline-flex w-fit items-center rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wide",
            statusStyles[order.status]
          )}
        >
          {order.status}
        </span>
      </div>

      <div className="mt-6 space-y-4 border-t border-line pt-6">
        {order.items.map((item, i) => (
          <div key={`${order.id}-${i}`} className="flex items-center gap-4">
            <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-paper-soft">
              <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{item.name}</p>
              <p className="text-sm text-ink-muted">
                {item.colorway} · US {item.size} · Qty {item.qty}
              </p>
            </div>
            <p className="shrink-0 text-sm font-medium">{formatPrice(item.price)}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2 border-t border-line pt-6 text-sm">
        <p className="eyebrow mb-3 text-ink-faint">Order Summary</p>
        <div className="flex items-center justify-between text-ink-muted">
          <span>Subtotal</span>
          <span>{formatPrice(order.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-ink-muted">
          <span>Shipping</span>
          <span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
        </div>
        <div className="flex items-center justify-between text-ink-muted">
          <span>Tax</span>
          <span>{formatPrice(order.tax)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-line pt-2 font-medium text-ink">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      {order.trackingNumber && (
        <div className="mt-6 border-t border-line pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-sm text-ink-muted">
              <Truck className="h-4 w-4" strokeWidth={1.5} />
              <span>
                {order.carrier} · {order.trackingNumber}
              </span>
              {order.deliveryEstimate && <span className="text-ink-faint">· {order.deliveryEstimate}</span>}
            </div>
            <button
              onClick={() => setTracking((v) => !v)}
              data-cursor="pointer"
              className="flex items-center gap-1.5 text-sm font-medium text-ink"
            >
              Track Order
              <ChevronDown className={cn("h-4 w-4 transition-transform", tracking && "rotate-180")} strokeWidth={1.5} />
            </button>
          </div>

          {tracking && (
            <div className="mt-7">
              <p className="eyebrow mb-6 text-ink-faint">Delivery Progress</p>
              <Timeline steps={timeline} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
