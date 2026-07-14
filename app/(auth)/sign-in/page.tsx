"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FloatingInput } from "@/components/auth/FloatingInput";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useAuth } from "@/lib/auth";

export default function SignInPage() {
  const router = useRouter();
  const { signIn, continueAsGuest } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await signIn(email, password, remember);
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push("/account");
  };

  const handleSocial = async () => {
    setLoading(true);
    await signIn("member@solearium.com", "demoAccess", true);
    setLoading(false);
    router.push("/account");
  };

  return (
    <AuthLayout
      title="Welcome back."
      subtitle="Sign in to your account."
      footer={
        <>
          Don&rsquo;t have an account?{" "}
          <Link href="/create-account" className="link-underline font-medium text-ink" data-cursor="pointer">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-7">
        <FloatingInput
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          required
          autoComplete="email"
        />
        <FloatingInput
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          required
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2.5 text-ink-muted">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded-sm border-line accent-ink"
            />
            Remember me
          </label>
          <Link href="/forgot-password" className="link-underline text-ink-muted" data-cursor="pointer">
            Forgot password?
          </Link>
        </div>

        {error && <p className="text-sm text-gold-deep">{error}</p>}

        <MagneticButton type="submit" variant="solid" size="lg" className="w-full" magnetic={false}>
          {loading ? "Signing in…" : "Sign in"}
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

      <p className="mt-10 text-center text-[11px] leading-relaxed text-ink-faint">
        By continuing, you agree to our{" "}
        <span className="link-underline text-ink-muted">Terms of Service</span> and{" "}
        <span className="link-underline text-ink-muted">Privacy Policy</span>.
      </p>
    </AuthLayout>
  );
}
