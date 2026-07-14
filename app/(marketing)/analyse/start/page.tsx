import type { Metadata } from "next";
import { AnalyseFlow } from "@/components/analyse/AnalyseFlow";

export const metadata: Metadata = {
  title: "Start Your Analysi99",
  description:
    "Sign in, upload your walking video and get your personalised movement read.",
};

export default function AnalyseStartPage() {
  return (
    <section className="section pt-32 md:pt-40">
      <div className="container">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <span className="eyebrow mb-4 block">Movement Analysis · ₹99</span>
          <h1 className="font-display text-4xl tracking-tightest md:text-5xl">
            Let&rsquo;s see how you move
          </h1>
        </div>
        <AnalyseFlow />
      </div>
    </section>
  );
}
