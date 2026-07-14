import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { footProblems } from "@/lib/footProblems";
import { img, products } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealText } from "@/components/ui/Reveal";

const badgeStyle = "inline-block rounded-full border border-ink/10 px-3 py-1 text-[10px] uppercase tracking-widest text-ink-muted";

export function generateStaticParams() {
  return footProblems.map((p) => ({ slug: p.slug }));
}

export default async function FootProblemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const problem = footProblems.find((p) => p.slug === slug);
  if (!problem) notFound();

  const recommended = products.slice(0, 3);

  return (
    <div>
      {/* Split Hero */}
      <section className="relative flex min-h-[50vh] md:min-h-[60vh] pt-28 md:pt-32">
        <div className="container flex w-full flex-col md:flex-row">
          <div className="flex w-full flex-col justify-center py-12 md:w-1/2 md:py-0 md:pr-12">
            <Link
              href="/foot-problems"
              className="mb-6 flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              Back to Find Your Fit
            </Link>
            <span className="eyebrow mb-4 block text-ink-faint">{problem.category}</span>
            <h1 className="max-w-2xl font-display text-5xl leading-[1.1] tracking-editorial md:text-7xl">
              <RevealText text={problem.title} />
            </h1>
            <Reveal delay={0.2} className="mt-6 flex flex-wrap gap-2">
              {problem.supportiveFeatures.slice(0, 3).map((f) => (
                <span key={f} className={badgeStyle}>
                  {f.split(" ").slice(0, 2).join(" ")}
                </span>
              ))}
            </Reveal>
            <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-4">
              <MagneticButton
                href={`/foot-problems?category=${problem.category.toLowerCase().replace(/\s+/g, "-")}`}
                variant="solid"
                size="lg"
              >
                Discover Your Fit
              </MagneticButton>
              <MagneticButton href="/shop" variant="outline" size="lg">
                Shop Now
              </MagneticButton>
            </Reveal>
          </div>
          <div className="relative flex w-full items-center justify-center md:w-1/2">
            <Reveal delay={0.1} className="h-full w-full">
              <div className="relative aspect-square w-full max-w-lg md:aspect-[4/5] drop-shadow-[0_0_30px_rgba(232,160,32,0.06)]">
                <Image
                  src={img(problem.image, 1000)}
                  alt={problem.title}
                  fill
                  sizes="(min-width: 768px) 40vw, 80vw"
                  className="object-contain"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="section pt-12 md:pt-16">
        <div className="container grid grid-cols-1 gap-6 md:grid-cols-3">
          <Reveal>
            <div className="rounded-2xl border border-line p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_20px_rgba(232,160,32,0.04)]">
              <h3 className="font-display text-lg tracking-editorial">Understanding Your Movement</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {problem.description}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-line p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_20px_rgba(232,160,32,0.04)]">
              <h3 className="font-display text-lg tracking-editorial">What To Look For</h3>
              <ul className="mt-3 space-y-2">
                {problem.commonSigns.map((sign) => (
                  <li key={sign} className="flex items-start gap-2 text-sm text-ink-muted">
                    <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-gold/20">
                      <Check className="h-2 w-2 text-gold" strokeWidth={3} />
                    </span>
                    {sign}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-line p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_20px_rgba(232,160,32,0.04)]">
              <h3 className="font-display text-lg tracking-editorial">How It Feels</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {problem.dailyImpact}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features + Sidebar */}
      <section className="section pt-0">
        <div className="container grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <h2 className="font-display text-3xl tracking-editorial md:text-4xl">
                Features That Support You
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {problem.supportiveFeatures.map((f, i) => (
                  <div
                    key={f}
                    className="rounded-xl border border-line bg-paper-soft p-5 transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_20px_rgba(232,160,32,0.04)]"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 mb-3">
                      <span className="font-mono text-xs font-bold text-gold">0{i + 1}</span>
                    </span>
                    <p className="text-sm leading-relaxed text-ink-muted">{f}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <div className="rounded-2xl border border-line bg-paper-soft p-6">
                <p className="text-sm font-medium">Your Recommended Fit</p>
                <p className="mt-1 text-ink-muted">{problem.recommendedCategory}</p>
              </div>
            </Reveal>

            {problem.requiresDisclaimer && (
              <Reveal delay={0.15} className="mt-6">
                <div className="rounded-xl border border-gold/30 bg-gold/[0.04] p-4">
                  <p className="text-xs leading-relaxed text-ink-muted">
                    Designed with {problem.title.toLowerCase()} in mind. We recommend trying our silhouettes to find the comfort and support that feels right for you.
                  </p>
                </div>
              </Reveal>
            )}
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <div className="sticky top-32 space-y-6">
              <Reveal delay={0.2}>
                <div className="rounded-xl border border-line p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
                    Pairs We Recommend
                  </p>
                  <div className="mt-4 space-y-4">
                    {recommended.map((p, i) => (
                      <Link
                        key={p.slug}
                        href="/shop"
                        className="group flex items-center gap-3"
                      >
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-paper-soft">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes="56px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{p.name}</p>
                          <p className="text-xs text-ink-muted">{p.colorway}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-ink text-paper dark:bg-paper dark:text-ink">
        <div className="container text-center">
          <Reveal>
            <h2 className="font-display text-4xl tracking-editorial md:text-6xl">
              Ready To Find Your Fit?
            </h2>
            <p className="mx-auto mt-6 max-w-md text-paper/70 dark:text-ink/70">
              Explore our range of footwear designed around how you move.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/shop" variant="gold" size="lg">
                Shop Now
              </MagneticButton>
              <MagneticButton href="/foot-problems" variant="outline" size="lg">
                See All Guides
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Note */}
      <section className="section pb-14">
        <div className="container">
          <p className="max-w-2xl text-xs leading-relaxed text-ink-faint">
            Sole-arium offers personalised footwear guidance based on how you move. Every foot is differene recommend finding the silhouette that feels right for you.
          </p>
        </div>
      </section>
    </div>
  );
}
