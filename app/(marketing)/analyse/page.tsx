import type { Metadata } from "next";
import { ArrowRight, Video, ScanLine, FileText } from "lucide-react";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Analyse How You Mov99",
  description:
    "Upload a short walking video and get a personalised read on your gait and posture. Guided, online and just ₹99.",
};

const steps = [
  {
    icon: Video,
    title: "Record a short clip",
    body: "Follow our simple on-screen guide and film 30 seconds of yourself walking. Any phone camera works.",
  },
  {
    icon: ScanLine,
    title: "We read your movement",
    body: "Your clip is reviewed for gait, balance and posture patterns - the same lens we use to build footwear around real movement.",
  },
  {
    icon: FileText,
    title: "Get your personalised read",
    body: "Receive a clear summary of how you move and what it means for comfort, support and fit.",
  },
];

export default function AnalysePage() {
  return (
    <>
      <section className="section pt-32 md:pt-40">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow mb-4 inline-flex items-center justify-center gap-2">
              <Video className="h-3.5 w-3.5" strokeWidth={1.75} />
              Movement Analysis · ₹99
            </span>
            <h1 className="mt-4 font-display text-5xl tracking-tightest md:text-7xl">
              <RevealText text="Analyse how you move" />
            </h1>
            <Reveal delay={0.2} className="mx-auto mt-6 max-w-xl">
              <p className="text-pretty leading-relaxed text-ink-muted md:text-lg">
                Most people have never seen how they actually walk. Upload a short
                video and get a personalised read on your gait and posturuick,
                guided and entirely online.
              </p>
            </Reveal>
            <Reveal delay={0.35} className="mt-10 flex justify-center">
              <MagneticButton href="/analyse/start" variant="solid" size="lg">
                Get started
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-paper-soft">
        <div className="container">
          <Reveal className="mb-16 max-w-xl">
            <span className="eyebrow mb-4 block">How It Works</span>
            <h2 className="font-display text-4xl tracking-editorial md:text-5xl">
              Three simple steps
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={i * 0.1} className="group">
                  <div className="flex items-center justify-between border-b border-line pb-6">
                    <Icon
                      className="h-7 w-7 text-ink transition-colors duration-500 group-hover:text-gold"
                      strokeWidth={1.25}
                    />
                    <span className="font-display text-sm text-ink-faint">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl tracking-editorial">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-pretty leading-relaxed text-ink-muted">
                    {step.body}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
