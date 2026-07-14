"use client";

import { useRef, useState } from "react";
import {
  Check,
  Loader2,
  Lock,
  ShieldCheck,
  UploadCloud,
  Video,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { FloatingInput } from "@/components/auth/FloatingInput";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

type Stage = "auth" | "upload" | "pay" | "done";

const STEP_LABELS = ["Sign in", "Upload video", "Pay ₹99", "Done"];

const FILMING_TIPS = [
  "Film in a well-lit space with room to take 4-6 steps.",
  "Place your phone at knee height, roughly 3 metres away.",
  "Walk naturally across the frame, side-on, twice.",
  "Wear fitted clothing so your movement is visible.",
];

export function AnalyseFlow() {
  const { status, user, signIn, signUp } = useAuth();
  const authed = status === "authenticated" || status === "guest";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [paying, setPaying] = useState(false);
  const [manualStage, setManualStage] = useState<Stage | null>(null);

  const stage: Stage =
    manualStage ??
    (!authed ? "auth" : !file ? "upload" : "pay");

  const activeIndex =
    stage === "auth" ? 0 : stage === "upload" ? 1 : stage === "pay" ? 2 : 3;

  const handleAuth = async () => {
    setAuthError(null);
    setAuthLoading(true);
    const res =
      mode === "signin"
        ? await signIn(email, password, true)
        : await signUp(name, email, password);
    setAuthLoading(false);
    if (!res.success) {
      setAuthError(res.error);
      return;
    }
    setManualStage("upload");
  };

  const pickFile = (f: File | null) => {
    if (!f) return;
    setFile(f);
    setManualStage("pay");
  };

  const handlePay = async () => {
    setPaying(true);
    await new Promise((r) => setTimeout(r, 1400));
    setPaying(false);
    setManualStage("done");
  };

  return (
    <div className="mx-auto max-w-xl">
      {/* Progress */}
      <ol className="mb-12 flex items-center justify-between">
        {STEP_LABELS.map((label, i) => {
          const isActive = i === activeIndex;
          const isDone = i < activeIndex;
          return (
            <li key={label} className="flex flex-1 items-center gap-2 last:flex-none">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium transition-colors",
                    isDone
                      ? "border-gold bg-gold text-ink"
                      : isActive
                        ? "border-ink text-ink"
                        : "border-line text-ink-faint"
                  )}
                >
                  {isDone ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : i + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-[11px] font-medium uppercase tracking-wide sm:block",
                    isActive ? "text-ink" : "text-ink-faint"
                  )}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <span className="mx-2 hidden h-px flex-1 bg-line sm:block" />
              )}
            </li>
          );
        })}
      </ol>

      {/* AUTH */}
      {stage === "auth" && (
        <Reveal>
          <div className="rounded-[3px] border border-line p-8">
            <div className="mb-6 flex items-center gap-2 text-ink-muted">
              <Lock className="h-4 w-4" strokeWidth={1.5} />
              <span className="text-[11px] font-medium uppercase tracking-wide">
                Sign in to continue
              </span>
            </div>
            <h2 className="font-display text-3xl tracking-editorial">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              Your analysis is saved to your account so you can revisit it anytime.
            </p>

            <div className="mt-8 space-y-6">
              {mode === "signup" && (
                <FloatingInput label="Full name" value={name} onChange={setName} />
              )}
              <FloatingInput
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                autoComplete="email"
              />
              <FloatingInput
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
              />
              {authError && <p className="text-xs text-gold-deep">{authError}</p>}
              <MagneticButton
                variant="solid"
                size="lg"
                className="w-full"
                onClick={handleAuth}
                disabled={authLoading}
              >
                {authLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : mode === "signin" ? (
                  "Sign in & continue"
                ) : (
                  "Create account & continue"
                )}
              </MagneticButton>
            </div>

            <p className="mt-6 text-center text-sm text-ink-muted">
              {mode === "signin" ? "New to Sole-arium? " : "Already have an account? "}
              <button
                type="button"
                data-cursor="pointer"
                onClick={() => {
                  setMode(mode === "signin" ? "signup" : "signin");
                  setAuthError(null);
                }}
                className="link-underline font-medium text-ink"
              >
                {mode === "signin" ? "Create one" : "Sign in"}
              </button>
            </p>
          </div>
        </Reveal>
      )}

      {/* UPLOAD */}
      {stage === "upload" && (
        <Reveal>
          <div className="rounded-[3px] border border-line p-8">
            <div className="mb-6 flex items-center gap-2 text-ink-muted">
              <Video className="h-4 w-4" strokeWidth={1.5} />
              <span className="text-[11px] font-medium uppercase tracking-wide">
                Upload your walking video
              </span>
            </div>

            <div className="mb-8">
              <span className="eyebrow mb-3 block text-ink-faint">Before You Start</span>
              <h2 className="font-display text-2xl tracking-editorial">
                How to film your walk
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                A good clip takes under two minutes. Follow these tips for the most
                accurate read.
              </p>
              <ul className="mt-5 space-y-3.5">
                {FILMING_TIPS.map((tip, i) => (
                  <li key={tip} className="flex gap-3 border-b border-line pb-3.5 last:border-0">
                    <span className="font-display text-sm text-gold-deep">
                      0{i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-ink-soft">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                pickFile(e.dataTransfer.files?.[0] ?? null);
              }}
              data-cursor="pointer"
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center rounded-[2px] border border-dashed px-6 py-16 text-center transition-colors",
                dragActive ? "border-gold bg-gold/5" : "border-line hover:border-ink/40"
              )}
            >
              <UploadCloud className="h-9 w-9 text-ink-muted" strokeWidth={1.25} />
              <p className="mt-4 font-medium text-ink">Drag & drop your clip here</p>
              <p className="mt-1 text-sm text-ink-muted">or click to browsP4 or MOV, up to ~100MB</p>
              <input
                ref={inputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>
        </Reveal>
      )}

      {/* PAY */}
      {stage === "pay" && (
        <Reveal>
          <div className="rounded-[3px] border border-line p-8">
            <div className="mb-6 flex items-center gap-2 text-ink-muted">
              <ShieldCheck className="h-4 w-4" strokeWidth={1.5} />
              <span className="text-[11px] font-medium uppercase tracking-wide">
                Confirm & pay
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-line pb-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper-soft">
                  <Video className="h-4 w-4 text-ink" strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">
                    {file?.name ?? "Your walking video"}
                  </p>
                  <button
                    type="button"
                    data-cursor="pointer"
                    onClick={() => {
                      setFile(null);
                      setManualStage("upload");
                    }}
                    className="link-underline text-xs text-ink-muted"
                  >
                    Change file
                  </button>
                </div>
              </div>
              <Check className="h-5 w-5 text-gold" strokeWidth={2} />
            </div>

            <div className="flex items-center justify-between py-6">
              <span className="text-ink-muted">Movement analysis</span>
              <span className="font-display text-2xl">₹99</span>
            </div>

            <MagneticButton
              variant="solid"
              size="lg"
              className="w-full"
              onClick={handlePay}
              disabled={paying}
            >
              {paying ? <Loader2 className="h-4 w-4 animate-spin" /> : "Pay ₹99"}
            </MagneticButton>
            <p className="mt-4 text-center text-[11px] leading-relaxed text-ink-faint">
              Demo checkouo real payment is taken. Your card is not charged.
            </p>
          </div>
        </Reveal>
      )}

      {/* DONE */}
      {stage === "done" && (
        <Reveal>
          <div className="rounded-[3px] border border-line p-10 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
              <Check className="h-7 w-7 text-gold-deep" strokeWidth={2} />
            </span>
            <h2 className="mt-6 font-display text-3xl tracking-editorial">
              Your video is in{user?.name ? `, ${user.name.split(" ")[0]}` : ""}.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-ink-muted">
              Our team is reviewing your walk. Your personalised movement read will
              land in your account within 48 houre&rsquo;ll email you the moment
              it&rsquo;s ready.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <MagneticButton href="/account" variant="solid" size="lg">
                Go to my account
              </MagneticButton>
              <MagneticButton href="/shop" variant="outline" size="lg">
                Shop custom footwear
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}
