"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Check, User } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/account/SectionHeader";
import { EmptyState } from "@/components/account/EmptyState";
import { FloatingInput } from "@/components/auth/FloatingInput";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Switch } from "@/components/ui/Switch";
import { Reveal } from "@/components/ui/Reveal";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type CommPrefKey = "orderUpdates" | "newDrops" | "marketing" | "sms";
type CommPrefs = Record<CommPrefKey, boolean>;

const COMM_PREFS_KEY = "sole-arium.commPrefs";

const DEFAULT_COMM_PREFS: CommPrefs = {
  orderUpdates: true,
  newDrops: true,
  marketing: true,
  sms: true,
};

const COMM_PREF_ROWS: { key: CommPrefKey; title: string; description: string }[] = [
  {
    key: "orderUpdates",
    title: "Order & Shipping",
    description: "Confirmations, shipping alerts and delivery status.",
  },
  {
    key: "newDrops",
    title: "New Drops",
    description: "Be the first to know when a new silhouette drops.",
  },
  {
    key: "marketing",
    title: "Offers & Stories",
    description: "Occasional promotions and curated recommendations.",
  },
  {
    key: "sms",
    title: "SMS",
    description: "Time-sensitive updates sent straight to your phone.",
  },
];

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();

  // Photo
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Personal information
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [savedMsg, setSavedMsg] = useState(false);
  const savedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Communication preferences
  const [prefs, setPrefs] = useState<CommPrefs>(DEFAULT_COMM_PREFS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(COMM_PREFS_KEY);
      if (raw) setPrefs({ ...DEFAULT_COMM_PREFS, ...JSON.parse(raw) });
    } catch {
      // ignore malformed storage
    }
  }, []);

  useEffect(() => {
    return () => {
      if (savedTimeoutRef.current) clearTimeout(savedTimeoutRef.current);
    };
  }, []);

  // Connected accounts
  const [googleConnected, setGoogleConnected] = useState(true);
  const [appleConnected, setAppleConnected] = useState(false);

  if (!user) return null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (avatarPreview?.startsWith("blob:")) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSaveProfile = () => {
    updateProfile({ name, email, phone });
    setSavedMsg(true);
    if (savedTimeoutRef.current) clearTimeout(savedTimeoutRef.current);
    savedTimeoutRef.current = setTimeout(() => setSavedMsg(false), 2000);
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setPasswordLoading(false);
    setPasswordSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const updatePref = (key: CommPrefKey, value: boolean) => {
    setPrefs((prev) => {
      const next = { ...prev, [key]: value };
      localStorage.setItem(COMM_PREFS_KEY, JSON.stringify(next));
      return next;
    });
  };

  if (user.isGuest) {
    return (
      <EmptyState
        icon={User}
        title="Create your profile"
        description="Browsing as a guest. Create an account to manage your photo, personal details and preferences."
        actionLabel="Create Account"
        actionHref="/create-account"
      />
    );
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Settings"
        title="Profile"
        description="Your photo, personal details, security and preferencell in one place."
      />

      <div className="space-y-8">
        <Reveal className="rounded-2xl border border-line p-6 md:p-7">
          <p className="mb-6 font-medium">Photo</p>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-ink">
              {avatarPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarPreview} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center font-display text-2xl text-paper">
                  {initials(user.name)}
                </span>
              )}
            </div>
            <div>
              <MagneticButton
                type="button"
                variant="outline"
                size="sm"
                magnetic={false}
                onClick={() => fileInputRef.current?.click()}
              >
                New photo
              </MagneticButton>
              <p className="mt-3 text-xs text-ink-faint">JPG or PNG. Up to 5MB.</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="rounded-2xl border border-line p-6 md:p-7">
          <p className="mb-6 font-medium">Personal Details</p>
          <div className="grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2">
            <FloatingInput label="Full Name" value={name} onChange={setName} required autoComplete="name" />
            <FloatingInput
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              required
              autoComplete="email"
            />
            <FloatingInput
              label="Phone"
              type="tel"
              value={phone}
              onChange={setPhone}
              autoComplete="tel"
            />
          </div>
          <div className="mt-8 flex items-center gap-4">
            <MagneticButton type="button" variant="solid" size="sm" magnetic={false} onClick={handleSaveProfile}>
              Save
            </MagneticButton>
            <span
              className={cn(
                "flex items-center gap-1.5 text-xs text-gold-deep transition-opacity duration-500",
                savedMsg ? "opacity-100" : "opacity-0"
              )}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={1.5} />
              Saved
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl border border-line p-6 md:p-7">
          <p className="mb-6 font-medium">Change Password</p>
          <form onSubmit={handlePasswordSubmit} className="space-y-7">
            <FloatingInput
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={setCurrentPassword}
              required
              autoComplete="current-password"
            />
            <div>
              <FloatingInput
                label="New Password"
                type="password"
                value={newPassword}
                onChange={setNewPassword}
                required
                autoComplete="new-password"
              />
              <PasswordStrength password={newPassword} />
            </div>
            <FloatingInput
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              required
              autoComplete="new-password"
            />
            {passwordError && <p className="text-sm text-gold-deep">{passwordError}</p>}
            {passwordSuccess && (
              <p className="flex items-center gap-1.5 text-sm text-ink-muted">
                <Check className="h-3.5 w-3.5 text-gold-deep" strokeWidth={1.5} />
                Your password has been updated.
              </p>
            )}
            <MagneticButton type="submit" variant="solid" size="sm" magnetic={false}>
              {passwordLoading ? "Updating…" : "Update"}
            </MagneticButton>
          </form>
        </Reveal>

        <Reveal delay={0.15} className="rounded-2xl border border-line p-0">
          <p className="p-6 pb-0 font-medium md:p-7 md:pb-0">Communication</p>
          <div className="mt-4 divide-y divide-line">
            {COMM_PREF_ROWS.map((row) => (
              <div key={row.key} className="flex items-center justify-between gap-6 px-6 py-5 md:px-7">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{row.title}</p>
                  <p className="mt-1 text-sm text-ink-muted">{row.description}</p>
                </div>
                <Switch
                  checked={prefs[row.key]}
                  onChange={(value) => updatePref(row.key, value)}
                  label={row.title}
                />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="rounded-2xl border border-line p-6 md:p-7">
          <p className="mb-2 font-medium">Connected Accounts</p>
          <div className="divide-y divide-line">
            <div className="flex items-center justify-between gap-4 py-4">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#4285F4]" />
                <div>
                  <p className="text-sm font-medium">Google</p>
                  <p className="text-xs text-ink-faint">
                    {googleConnected ? "Connected" : "Not Connected"}
                  </p>
                </div>
              </div>
              <MagneticButton
                type="button"
                size="sm"
                magnetic={false}
                variant={googleConnected ? "outline" : "gold"}
                onClick={() => setGoogleConnected((v) => !v)}
              >
                {googleConnected ? "Disconnect" : "Connect"}
              </MagneticButton>
            </div>
            <div className="flex items-center justify-between gap-4 py-4">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-ink" />
                <div>
                  <p className="text-sm font-medium">Apple</p>
                  <p className="text-xs text-ink-faint">
                    {appleConnected ? "Connected" : "Not Connected"}
                  </p>
                </div>
              </div>
              <MagneticButton
                type="button"
                size="sm"
                magnetic={false}
                variant={appleConnected ? "outline" : "gold"}
                onClick={() => setAppleConnected((v) => !v)}
              >
                {appleConnected ? "Disconnect" : "Connect"}
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
