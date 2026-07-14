import { Footprints, Palette, Hammer } from "lucide-react";
import { Reveal, RevealText } from "@/components/ui/Reveal";

const steps = [
  {
    index: "01",
    Icon: Footprints,
    title: "Built around how you walk",
    body: "Every pair starts with your movement assessment: gait analysis, your stance, plantar pressure scans and the way you land. The fit and support are shaped around you.",
  },
  {
    index: "02",
    Icon: Palette,
    title: "Customised to your taste",
    body: "Choose your colourway, design and finishing details. The footwear stays refined - the expression is entirely yours.",
  },
  {
    index: "03",
    Icon: Hammer,
    title: "Crafted for you",
    body: "Nothing is mass-produced. Each pair is crafted to your specification in a limited run and delivered to your door.",
  },
];

export function HowCustomWorks() {
  return (
    <section
      id="how-custom"
      data-landing-snap
      className="section min-h-[100svh] !pt-16 md:!pt-20"
    >
      <div className="container">
        <Reveal className="mb-16 max-w-2xl md:mb-24">
          <span className="eyebrow mb-4 block">Why It&rsquo;s Different</span>
          <h2 className="font-display text-4xl tracking-editorial md:text-6xl">
            <RevealText text="Not off the shelf. Built around you." />
          </h2>
          <Reveal delay={0.2} className="mt-6">
            <p className="text-pretty leading-relaxed text-ink-muted md:text-lg">
              Most footwear are designed once and sold to everyone. Made for an
              average foot, which doesnt exist. We flip it - every pair is
              engineered around how you move and designed exactly how you want it.
            </p>
          </Reveal>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.Icon;
            return (
              <Reveal key={step.index} delay={i * 0.1} className="group">
                <div className="flex items-center justify-between border-b border-line pb-6">
                  <Icon
                    className="h-7 w-7 text-ink transition-colors duration-500 group-hover:text-gold"
                    strokeWidth={1.25}
                  />
                  <span className="font-display text-sm text-ink-faint">
                    {step.index}
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
  );
}
