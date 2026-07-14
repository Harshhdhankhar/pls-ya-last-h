"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Loader2, Lock, ShieldCheck } from "lucide-react";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { formatPrice } from "@/lib/utils";
import { FloatingInput } from "@/components/auth/FloatingInput";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

const ADVANCE = 999;

export function CheckoutClient() {
  const { cart, subtotal, clearCart } = useStore();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(false);
  const [orderId] = useState(
    () => "SA-" + Math.random().toString(36).slice(2, 7).toUpperCase()
  );

  useEffect(() => {
    if (user && !user.isGuest) {
      setName((n) => n || user.name);
      setEmail((e) => e || user.email);
    }
  }, [user]);

  const advance = Math.min(ADVANCE, subtotal);
  const balance = Math.max(subtotal - advance, 0);
  const canPay =
    name.trim() && email.trim() && phone.trim() && address.trim() && city.trim() && pincode.trim();

  const handlePay = async () => {
    if (!canPay) return;
    setPaying(true);
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    setPaying(false);
    setDone(true);
  };

  if (done) {
    return (
      <Reveal className="mx-auto max-w-xl text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
          <Check className="h-7 w-7 text-gold-deep" strokeWidth={2} />
        </span>
        <h1 className="mt-6 font-display text-4xl tracking-editorial">Order confirmed</h1>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-ink-muted">
          Your ₹999 advance is in and order <span className="font-medium text-ink">{orderId}</span> is
          confirmed. We&rsquo;ve started building your paiou&rsquo;ll get production and dispatch
          updates by email, with the balance due before delivery.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticButton href="/account" variant="solid" size="lg">
            View my orders
          </MagneticButton>
          <MagneticButton href="/shop" variant="outline" size="lg">
            Continue shopping
          </MagneticButton>
        </div>
      </Reveal>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-display text-4xl tracking-editorial">Your cart is empty</h1>
        <p className="mx-auto mt-4 max-w-sm text-ink-muted">
          Add a pair to get startevery order is built around how you move.
        </p>
        <div className="mt-8 flex justify-center">
          <MagneticButton href="/shop" variant="solid" size="lg">
            Shop custom footwear
          </MagneticButton>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">
      {/* Details form */}
      <div>
        <h2 className="font-display text-2xl tracking-editorial">Delivery details</h2>
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FloatingInput label="Full name" value={name} onChange={setName} />
            <FloatingInput label="Phone" type="tel" value={phone} onChange={setPhone} />
          </div>
          <FloatingInput label="Email" type="email" value={email} onChange={setEmail} />
          <FloatingInput label="Address" value={address} onChange={setAddress} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FloatingInput label="City" value={city} onChange={setCity} />
            <FloatingInput label="Pincode" value={pincode} onChange={setPincode} />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="lg:sticky lg:top-32 lg:self-start">
        <div className="rounded-[3px] border border-line p-7">
          <h2 className="font-display text-2xl tracking-editorial">Your order</h2>

          <ul className="mt-6 divide-y divide-line">
            {cart.map((item) => (
              <li key={item.slug} className="flex gap-4 py-4">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-paper-soft">
                  <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex flex-1 items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium leading-tight">{item.name}</p>
                    <p className="mt-1 text-xs text-ink-muted">{item.colorway}</p>
                    <p className="mt-1 text-xs text-ink-faint">Qty {item.qty}</p>
                  </div>
                  <span className="text-sm">{formatPrice(item.price * item.qty)}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-2.5 border-t border-line pt-6 text-sm">
            <div className="flex items-center justify-between text-ink-muted">
              <span>Order total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between font-medium">
              <span>Advance due today</span>
              <span>{formatPrice(advance)}</span>
            </div>
            <div className="flex items-center justify-between text-ink-muted">
              <span>Balance before dispatch</span>
              <span>{formatPrice(balance)}</span>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-2 rounded-[2px] bg-paper-soft p-4 text-xs leading-relaxed text-ink-muted">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
            <p>
              Each pair is Crafted for you. A ₹999 advance confirms your customisation and
              starts production; the balance is collected before your pair is dispatched.
            </p>
          </div>

          <div className="mt-6">
            <MagneticButton
              variant="solid"
              size="lg"
              className="w-full"
              magnetic={false}
              onClick={handlePay}
              disabled={paying || !canPay}
            >
              {paying ? <Loader2 className="h-4 w-4 animate-spin" /> : `Pay ₹999 advance`}
            </MagneticButton>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-ink-faint">
              <Lock className="h-3 w-3" strokeWidth={1.75} />
              Demo checkouo real payment is taken.
            </p>
            <Link
              href="/shop"
              data-cursor="pointer"
              className="link-underline mt-4 block text-center text-xs text-ink-muted"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
