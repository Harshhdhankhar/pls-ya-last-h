import type { Metadata } from "next";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { story, img } from "@/lib/data";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WhySoleArium } from "@/components/story/WhySoleArium";

export const metadata: Metadata = {
  title: "About Sole-arium",
  description:
    "A studio built around how you move. Every silhouette considered, refined and crafted to be your most-worn pair.",
};

const founderImage = img("1606107557195-0e29a4b5b4aa", 1600);

const founders = [
  {
    name: "Arun Mittal",
    role: "Co-founder",
    bio: "Obsessed with the idea that a great pair should feel like it was made for one person, because it was.",
    image: "/team/arun.jpg",
    linkedin: "https://www.linkedin.com/in/arunkrmittal/",
  },
  {
    name: "Aryan Balotiya",
    role: "Co-founder",
    bio: "Believes every foot moves differently, and that footwear should be built to match.",
    image: "/team/aryan.jpeg",
    linkedin: "https://linkedin.com/in/aryan-balotiya-09819722b",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 md:pt-32">
      <section className="section pb-14 pt-0 md:pb-20">
        <div className="container">
          <span className="eyebrow mb-6 block">Our Purpose</span>
          <h1 className="max-w-3xl font-display text-5xl leading-[1.1] tracking-editorial md:text-7xl">
            <RevealText text="Designed Around Your Movement" />
          </h1>
          <Reveal delay={0.2} className="mt-7 max-w-lg">
            <p className="text-pretty text-lg leading-relaxed text-ink-muted">
              We believe the right footwear disappears beneath you. What remains is effortless movement, lasting comfort and confidence in every step.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <span className="eyebrow mb-5 block">Our Story</span>
            <h2 className="font-display text-4xl leading-[1.1] tracking-editorial md:text-5xl">
              Built Around Your Stride
            </h2>
            <div className="mt-8 space-y-6 text-pretty text-lg leading-relaxed text-ink-muted">
              <p>
                Sole-arium began with a simple question: <strong>why do so many people live with foot pain and think it's normal?</strong>
              </p>
              <p>
                The answer wasn't found in new materials or trend forecasts. It was found in the way people move. Every foot is different. Every stride is different. Yet most footwear is still designed for an average that doesn't truly exist.
              </p>
              <p>
                That's why every Sole-arium journey begins with understanding you. Through a movement assessment, we analyse how you walk, stand and distribute pressure across your feet. That data becomes the foundation of footwear designed exclusively for your biomechanics.
              </p>
              <p>
                Our ambition goes beyond comfort. We want to help people move better, reduce unnecessary strain and care for their feet before small discomforts become lifelong problems.
              </p>
              <p>
                Because every step influences the rest of your body.
              </p>
              <p>
                And every person deserves footwear built around them.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={0.2} className="border-l-2 border-gold pl-6">
              <p className="font-display text-2xl italic leading-snug tracking-editorial md:text-3xl">
                &ldquo;{story.quote}&rdquo;
              </p>
              <p className="eyebrow mt-6 text-ink-muted">{story.quoteAttribution}</p>
            </Reveal>

            <Reveal delay={0.3} className="relative mt-10 aspect-[4/3] overflow-hidden bg-paper-soft">
              <Image
                src={founderImage}
                alt="At work in the studio"
                fill
                sizes="(min-width: 768px) 28vw, 90vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="hairline" />
      </div>

      <section className="section">
        <div className="container">
          <Reveal className="max-w-2xl">
            <span className="eyebrow mb-4 block">Our Vision</span>
            <h2 className="font-display text-4xl leading-[1.1] tracking-editorial md:text-5xl">
              Footwear that understands movement
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-6 text-pretty text-lg leading-relaxed text-ink-muted md:grid-cols-2 md:gap-12">
            <p>
              Most people have never seen how they actually move. They adapt to
              discomfort, blame the miles, and settle for shoes that look right but
              were never built for them.
            </p>
            <p>
              We start somewhere different, with how you move. Every pair begins from
              real movement, then it is shaped, tested and reshaped until it
              disappears on the foot. Our ambition is simple: footwear made around
              you, considered, personal and built to be lived in.
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="hairline" />
      </div>

      <section className="section">
        <div className="container">
          <Reveal className="mb-14 max-w-xl md:mb-20">
            <span className="eyebrow mb-4 block">The Founders</span>
            <h2 className="font-display text-4xl tracking-editorial md:text-6xl">
              The people behind the pair
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-muted">
              Sole-arium is built by people who believe footwear should be shaped
              around the person wearing it, not the other way around.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12">
            {founders.map((founder, i) => (
              <Reveal key={founder.name} delay={i * 0.1} className="group flex items-start gap-5">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full bg-paper-soft md:h-28 md:w-28">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    sizes="112px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-xl tracking-editorial md:text-2xl">
                      {founder.name}
                    </h3>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn profile of ${founder.name}`}
                      data-cursor="pointer"
                      className="text-ink-muted transition-colors hover:text-gold"
                    >
                      <Linkedin className="h-4 w-4" strokeWidth={1.5} />
                    </a>
                  </div>
                  <p className="eyebrow mt-1.5 text-gold-deep">{founder.role}</p>
                  <p className="mt-3 max-w-sm text-pretty leading-relaxed text-ink-muted">
                    {founder.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="hairline" />
      </div>

      <WhySoleArium />

      <section className="section border-t border-line pt-24 md:pt-32">
        <div className="container flex flex-col items-center gap-8 text-center">
          <h2 className="font-display text-4xl tracking-editorial md:text-6xl">
            The Full Collection
          </h2>
          <p className="max-w-md text-pretty text-ink-muted">
            Every silhouette we&rsquo;ve designed is meant to be worn, not just admired.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/shop" variant="solid" size="lg">
              Shop Custom Footwear
            </MagneticButton>
            <MagneticButton href="/analyse" variant="outline" size="lg">
              Analyse how you move
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
