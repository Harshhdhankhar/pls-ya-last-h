"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FloatingInput } from "@/components/auth/FloatingInput";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useAuth } from "@/lib/auth";

export default function CreateAccountPage() {
  const router = useRouter();
  const { signUp, continueAsGuest } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!agreed) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }
    setLoading(true);
    const result = await signUp(name, email, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push("/verify-email");
  };

  const handleSocial = async () => {
    setLoading(true);
    await signUp("New Member", "member@solearium.com", "demoAccess1");
    setLoading(false);
    router.push("/account");
  };

  return (
    <AuthLayout
      title="Create your account."
      subtitle="Early access, reserved pairs and a personal wishlist."
      footer={
        <>
          Already a member?{" "}
          <Link href="/sign-in" className="link-underline font-medium text-ink" data-cursor="pointer">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-7">
        <FloatingInput label="Full name" value={name} onChange={setName} required autoComplete="name" />
        <FloatingInput
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          required
          autoComplete="email"
        />
        <div>
          <FloatingInput
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            required
            autoComplete="new-password"
          />
          <PasswordStrength password={password} />
        </div>

        <label className="flex items-start gap-2.5 text-sm text-ink-muted">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded-sm border-line accent-ink"
          />
          <span>
            I accept the <span className="link-underline text-ink">Terms of Service</span> and{" "}
            <span className="link-underline text-ink">Privacy Policy</span>.
          </span>
        </label>

        {error && <p className="text-sm text-gold-deep">{error}</p>}

        <MagneticButton type="submit" variant="solid" size="lg" className="w-full" magnetic={false}>
          {loading ? "Creating account…" : "Create account"}
        </MagneticButton>
      </form>

      <AuthDivider />
      <SocialButtons onSelect={handleSocial} />

      <button
        onClick={() => {
          continueAsGuest();
          router.push("/account");
        }}
        data-cursor="pointer"
        className="link-underline mt-8 block w-full text-center text-sm text-ink-muted"
      >
        Continue as guest
      </button>
    </AuthLayout>
  );
}
