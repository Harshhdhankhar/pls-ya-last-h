"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Pencil, Trash2, Check } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { addresses as initialAddresses, type Address } from "@/lib/memberData";
import { SectionHeader } from "@/components/account/SectionHeader";
import { EmptyState } from "@/components/account/EmptyState";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FloatingInput } from "@/components/auth/FloatingInput";
import { AddressAutocompleteInput } from "@/components/account/AddressAutocompleteInput";

type AddressFormState = {
  label: string;
  fullName: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault: boolean;
};

const emptyForm: AddressFormState = {
  label: "",
  fullName: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  phone: "",
  isDefault: false,
};

function toFormState(address: Address): AddressFormState {
  return {
    label: address.label,
    fullName: address.fullName,
    line1: address.line1,
    line2: address.line2 ?? "",
    city: address.city,
    state: address.state,
    zip: address.zip,
    country: address.country,
    phone: address.phone,
    isDefault: address.isDefault,
  };
}

export default function AddressesPage() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AddressFormState>(emptyForm);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  if (!user) return null;

  if (user.isGuest) {
    return (
      <div>
        <SectionHeader eyebrow="Addresses" title="Addresses" />
        <EmptyState
          icon={MapPin}
          title="Sign in to manage addresses"
          description="Create an account or sign in to save shipping addresses for faster checkout."
          actionLabel="Sign In"
          actionHref="/sign-in"
        />
      </div>
    );
  }

  const updateField = <K extends keyof AddressFormState>(key: K, value: AddressFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setConfirmDeleteId(null);
    setFormOpen(true);
  };

  const openEditForm = (address: Address) => {
    setEditingId(address.id);
    setForm(toFormState(address));
    setConfirmDeleteId(null);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      setAddresses((prev) => {
        const next = prev.map((a) =>
          a.id === editingId
            ? {
                ...a,
                label: form.label,
                fullName: form.fullName,
                line1: form.line1,
                line2: form.line2 || undefined,
                city: form.city,
                state: form.state,
                zip: form.zip,
                country: form.country,
                phone: form.phone,
                isDefault: form.isDefault,
              }
            : a
        );
        return form.isDefault ? next.map((a) => ({ ...a, isDefault: a.id === editingId })) : next;
      });
    } else {
      const newAddress: Address = {
        id: `addr_${Date.now()}`,
        label: form.label,
        fullName: form.fullName,
        line1: form.line1,
        line2: form.line2 || undefined,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country,
        phone: form.phone,
        isDefault: form.isDefault || addresses.length === 0,
      };
      setAddresses((prev) => {
        const withNew = [...prev, newAddress];
        return newAddress.isDefault
          ? withNew.map((a) => ({ ...a, isDefault: a.id === newAddress.id }))
          : withNew;
      });
    }

    closeForm();
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => {
      const target = prev.find((a) => a.id === id);
      const remaining = prev.filter((a) => a.id !== id);
      if (target?.isDefault && remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
        remaining[0] = { ...remaining[0], isDefault: true };
      }
      return remaining;
    });
    setConfirmDeleteId(null);
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div>
      <SectionHeader
        eyebrow={`${addresses.length} saved`}
        title="Addresses"
        description="Manage your saved shipping addresses."
        action={
          <MagneticButton onClick={formOpen ? closeForm : openAddForm} variant={formOpen ? "outline" : "solid"}>
            {formOpen ? "Cancel" : "New Address"}
          </MagneticButton>
        }
      />

      <AnimatePresence initial={false}>
        {formOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-line p-6 md:p-7">
              <p className="mb-6 font-display text-xl tracking-editorial">
                {editingId ? "Edit Address" : "Add a New Address"}
              </p>
              <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
                <FloatingInput
                  label="Label (e.g. Home, Studio)"
                  value={form.label}
                  onChange={(v) => updateField("label", v)}
                  required
                />
                <FloatingInput
                  label="Full Name"
                  value={form.fullName}
                  onChange={(v) => updateField("fullName", v)}
                  required
                />
                <AddressAutocompleteInput
                  label="Address Line 1"
                  value={form.line1}
                  onChange={(v) => updateField("line1", v)}
                  required
                  className="sm:col-span-2"
                />
                <FloatingInput
                  label="Address Line 2 (optional)"
                  value={form.line2}
                  onChange={(v) => updateField("line2", v)}
                  className="sm:col-span-2"
                />
                <FloatingInput label="City" value={form.city} onChange={(v) => updateField("city", v)} required />
                <FloatingInput label="State" value={form.state} onChange={(v) => updateField("state", v)} required />
                <FloatingInput label="ZIP Code" value={form.zip} onChange={(v) => updateField("zip", v)} required />
                <FloatingInput
                  label="Country"
                  value={form.country}
                  onChange={(v) => updateField("country", v)}
                  required
                />
                <FloatingInput
                  label="Phone"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => updateField("phone", v)}
                  required
                  className="sm:col-span-2"
                />
              </div>

              <label className="mt-7 flex items-center gap-2.5 text-sm text-ink-muted" data-cursor="pointer">
                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) => updateField("isDefault", e.target.checked)}
                  className="h-4 w-4 rounded-sm border-line accent-ink"
                />
                Set as default shipping address
              </label>

              <div className="mt-7 flex gap-3">
                <MagneticButton type="submit" size="sm" magnetic={false}>
                  {editingId ? "Save" : "Add Address"}
                </MagneticButton>
                <MagneticButton type="button" size="sm" variant="ghost" magnetic={false} onClick={closeForm}>
                  Cancel
                </MagneticButton>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {addresses.length === 0 && !formOpen ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line px-8 py-24 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper-soft">
            <MapPin className="h-6 w-6 text-ink-muted" strokeWidth={1.25} />
          </span>
          <p className="mt-6 font-display text-2xl tracking-editorial">Add your first address</p>
          <p className="mt-3 max-w-sm text-pretty leading-relaxed text-ink-muted">
            Save an address so checkout is faster next time.
          </p>
            <MagneticButton onClick={openAddForm} variant="solid" className="mt-8">
            New Address
          </MagneticButton>
        </div>
      ) : (
        <div className="space-y-6">
          {addresses.map((address) => (
            <div key={address.id} className="rounded-2xl border border-line p-6 md:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-display text-lg tracking-editorial">{address.label}</p>
                {address.isDefault && (
                  <span className="inline-flex items-center rounded-full border border-gold bg-gold/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-gold-deep">
                    Default
                  </span>
                )}
              </div>

              <div className="mt-4 text-sm leading-relaxed text-ink-muted">
                <p className="text-ink">{address.fullName}</p>
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>
                  {address.city}, {address.state} {address.zip}
                </p>
                <p>{address.country}</p>
                <p className="mt-1.5">{address.phone}</p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-5">
                <button
                  onClick={() => openEditForm(address)}
                  data-cursor="pointer"
                  className="flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  <Pencil className="h-4 w-4" strokeWidth={1.5} />
                  Edit
                </button>
                <button
                  onClick={() => setConfirmDeleteId(address.id)}
                  data-cursor="pointer"
                  className="flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-gold-deep"
                >
                  <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                  Remove
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    data-cursor="pointer"
                    className="flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                  >
                    <Check className="h-4 w-4" strokeWidth={1.5} />
                    Set as Default
                  </button>
                )}
              </div>

              {confirmDeleteId === address.id && (
                <div className="mt-6 rounded-xl border border-gold/40 bg-gold/[0.06] p-5">
                  <p className="text-sm font-medium">Remove this address?</p>
                  <p className="mt-1.5 text-sm text-ink-muted">This can&rsquo;t be undone.</p>
                  <div className="mt-4 flex gap-3">
                    <MagneticButton
                      size="sm"
                      variant="outline"
                      magnetic={false}
                      onClick={() => handleDelete(address.id)}
                    >
                      Yes, Remove
                    </MagneticButton>
                    <MagneticButton size="sm" variant="ghost" magnetic={false} onClick={() => setConfirmDeleteId(null)}>
                      Keep
                    </MagneticButton>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
