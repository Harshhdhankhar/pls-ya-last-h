import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Confirm your custom footwear order with a ₹999 advance.",
};

export default function CheckoutPage() {
  return (
    <section className="section pt-32 md:pt-40">
      <div className="container">
        <div className="mb-12 max-w-xl">
          <span className="eyebrow mb-4 block">Checkout</span>
          <h1 className="font-display text-4xl tracking-tightest md:text-5xl">
            Confirm your custom order
          </h1>
        </div>
        <CheckoutClient />
      </div>
    </section>
  );
}
