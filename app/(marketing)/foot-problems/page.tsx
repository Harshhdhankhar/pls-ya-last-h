"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Check } from "lucide-react";
import { footProblems } from "@/lib/footProblems";
import { img } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealText } from "@/components/ui/Reveal";

const badgeStyle = "inline-block rounded-full border border-ink/10 px-3 py-1 text-[10px] uppercase tracking-widest text-ink-muted";

const genderOptions = ["All", "Men", "Women", "Kids"] as const;
const ageOptions = ["Children", "Teenagers", "18–35", "36–45", "46–60", "60+"] as const;

const conditionGroups = [
  {
    label: "Medical",
    options: [
      "Diabetic Foot",
      "Leprosy Foot Support",
      "Post-Polio Support",
      "Arthritis",
      "Varicose Veins",
      "Plantar Fasciitis",
    ],
  },
  {
    label: "Structural Foot Issues",
    options: [
      "Flat Feet",
      "High Arches",
      "Bunions",
      "Hammer Toe",
      "Overpronation",
      "Supination",
    ],
  },
  {
    label: "Recovery",
    options: [
      "Post-Surgical Support",
      "Rehabilitation",
      "ACL Recovery",
    ],
  },
  {
    label: "Lifestyle",
    options: [
      "Sports",
      "Long Standing Hours",
      "General Comfort",
    ],
  },
] as const;

type ConditionOption = typeof conditionGroups[number]["options"][number];
type ConditionKey = ConditionOption;

export default function FootProblemsPage() {
  const [activeGender, setActiveGender] = useState<string | null>("All");
  const [activeAge, setActiveAge] = useState<string | null>(null);
  const [activeCondition, setActiveCondition] = useState<ConditionKey | null>(null);

  const matchFilters = (p: typeof footProblems[number], filters: { gender?: string | null; age?: string | null; condition?: ConditionKey | null }) => {
    const genderMap: Record<string, string[]> = {
      Men: ["men"],
      Women: ["women"],
      Kids: ["children"],
    };
    if (filters.gender && filters.gender !== "All") {
      const mapped = genderMap[filters.gender];
      if (!mapped || !mapped.some((g) => p.audienceGroups.includes(g))) return false;
    }

    const ageMap: Record<string, string[]> = {
      Children: ["children"],
      Teenagers: ["teenagers"],
      "18–35": ["adults"],
      "36–45": ["adults"],
      "46–60": ["40+"],
      "60+": ["elderly"],
    };
    if (filters.age) {
      const mapped = ageMap[filters.age];
      if (!mapped || !mapped.some((a) => p.audienceGroups.includes(a))) return false;
    }

    const conditionSlugs: Record<ConditionKey, string | string[]> = {
      "Diabetic Foot": "diabetic-foot",
      "Leprosy Foot Support": "diabetic-foot",
      "Post-Polio Support": "post-polio-support",
      "Arthritis": "arthritis",
      "Varicose Veins": "varicose-vein-discomfort",
      "Plantar Fasciitis": "plantar-fasciitis",
      "Flat Feet": "flat-feet",
      "High Arches": "high-arches",
      "Bunions": "bunions",
      "Hammer Toe": "hammer-toe",
      "Overpronation": "overpronation",
      "Supination": "supination",
      "Post-Surgical Support": "post-surgical-recovery",
      "Rehabilitation": "rehabilitation-support",
      "ACL Recovery": "acl-recovery",
      "Sports": ["running", "gym-training", "court-sports", "outdoor-activity"],
      "Long Standing Hours": "long-standing",
      "General Comfort": "everyday-comfort",
    };

    if (filters.condition) {
      const targetSlugs = conditionSlugs[filters.condition];
      const slugs = Array.isArray(targetSlugs) ? targetSlugs : [targetSlugs];
      if (!slugs.some((s) => p.slug === s)) return false;
    }

    return true;
  };

  const currentFilters = { gender: activeGender, age: activeAge, condition: activeCondition };
  const exactResults = footProblems.filter((p) => matchFilters(p, currentFilters));
  const genderResults = footProblems.filter((p) => matchFilters(p, { gender: activeGender, age: null, condition: null }));

  const isFiltering = activeAge || activeCondition;
  let displayed = exactResults;
  let showFallbackMessage = false;

  if (isFiltering && exactResults.length === 0) {
    if (genderResults.length > 0) {
      displayed = genderResults;
    } else {
      displayed = footProblems;
    }
    showFallbackMessage = true;
  }

  const allConditions = conditionGroups.flatMap((g) => g.options);

  return (
    <div className="pt-28 md:pt-32">
      {/* Split Hero */}
      <section className="relative flex min-h-[50vh] md:min-h-[60vh]">
        <div className="container flex w-full flex-col items-center justify-center md:flex-row">
          <div className="flex w-full flex-col justify-center py-16 md:w-1/2 md:py-0 md:pr-12">
            <Reveal>
              <span className="eyebrow mb-6 block">Find Your Fit</span>
            </Reveal>
            <h1 className="max-w-2xl font-display text-5xl leading-[1.1] tracking-editorial md:text-7xl">
              <RevealText text="Designed For The Way You Move" />
            </h1>
            <Reveal delay={0.2} className="mt-7 max-w-lg">
              <p className="text-pretty text-lg leading-relaxed text-ink-muted">
                Explore footwear designed around how you move, where you need support and how you spend your day.
              </p>
            </Reveal>
            <Reveal delay={0.35} className="mt-10 flex flex-wrap gap-4">
              <MagneticButton href="#finder-filters" variant="solid" size="lg">
                Discover Your Fit
              </MagneticButton>
            </Reveal>
          </div>
          <div className="relative flex w-full items-center justify-center md:w-1/2">
            <Reveal delay={0.15} className="h-full w-full">
              <div className="relative aspect-square w-full max-w-lg md:aspect-[4/5]">
                <Image
                  src={img("1542291026-7eec264c27ff", 1000)}
                  alt="Side profile of a Sole-arium silhouette"
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

      {/* Find Your Perfect Fit - Single Filter Section */}
      <section id="finder-filters" className="section bg-ink text-paper dark:bg-paper dark:text-ink">
        <div className="container">
          <Reveal>
            <span className="eyebrow mb-4 block text-paper/40 dark:text-ink/40">Fit Finder</span>
            <h2 className="font-display text-3xl tracking-editorial md:text-4xl">
              Find Your Perfect Fit
            </h2>
            <p className="mt-3 max-w-xl text-sm text-paper/60 dark:text-ink/60">
              Select your profile and condition to discover suitable footwear.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <div className="rounded-2xl border border-paper/20 bg-paper/5 p-6 dark:border-ink/20 dark:bg-ink/5">
              {/* First Row: Gender and Age */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-paper/10 bg-paper/5 p-4 dark:border-ink/10 dark:bg-ink/5">
                  <p className="mb-3 text-xs uppercase tracking-widest text-paper/50 dark:text-ink/50">
                    Gender
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {genderOptions.map((opt) => {
                      const isActive = activeGender === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => setActiveGender(isActive ? null : opt)}
                          data-cursor="pointer"
                          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                            isActive
                              ? "bg-[#E8A020] text-[#141414]"
                              : "border border-paper/20 bg-paper/10 text-paper/70 hover:border-paper/30 hover:bg-paper/15 dark:border-ink/20 dark:bg-ink/10 dark:text-ink/70 dark:hover:border-ink/30 dark:hover:bg-ink/15"
                          }`}
                        >
                          {isActive && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-xl border border-paper/10 bg-paper/5 p-4 dark:border-ink/10 dark:bg-ink/5">
                  <p className="mb-3 text-xs uppercase tracking-widest text-paper/50 dark:text-ink/50">
                    Age
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ageOptions.map((opt) => {
                      const isActive = activeAge === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => setActiveAge(isActive ? null : opt)}
                          data-cursor="pointer"
                          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                            isActive
                              ? "bg-[#E8A020] text-[#141414]"
                              : "border border-paper/20 bg-paper/10 text-paper/70 hover:border-paper/30 hover:bg-paper/15 dark:border-ink/20 dark:bg-ink/10 dark:text-ink/70 dark:hover:border-ink/30 dark:hover:bg-ink/15"
                          }`}
                        >
                          {isActive && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Subtle Divider */}
              <div className="my-4 h-px bg-gradient-to-r from-transparent via-paper/10 to-transparent dark:via-ink/10" />

              {/* Second Section: Need or Foot Condition */}
              <div className="rounded-xl border border-paper/10 bg-paper/5 p-4 dark:border-ink/10 dark:bg-ink/5">
                <p className="mb-4 text-xs uppercase tracking-widest text-paper/50 dark:text-ink/50">
                  Need or Foot Condition
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {conditionGroups.map((group) => (
                    <div key={group.label}>
                      <p className="mb-2 text-[11px] uppercase tracking-wider text-paper/30 dark:text-ink/30">
                        {group.label}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {group.options.map((opt) => {
                          const isActive = activeCondition === opt;
                          return (
                            <button
                              key={opt}
                              onClick={() => setActiveCondition(isActive ? null : opt)}
                              data-cursor="pointer"
                              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                                isActive
                                  ? "bg-[#E8A020] text-[#141414]"
                                  : "border border-paper/20 bg-paper/10 text-paper/70 hover:border-paper/30 hover:bg-paper/15 dark:border-ink/20 dark:bg-ink/10 dark:text-ink/70 dark:hover:border-ink/30 dark:hover:bg-ink/15"
                              }`}
                            >
                              {isActive && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subtle Divider */}
              <div className="my-4 h-px bg-gradient-to-r from-transparent via-paper/10 to-transparent dark:via-ink/10" />

              {/* Action Area */}
              <div className="space-y-3">
                {/* Selected Summary */}
                <div className="text-center text-xs text-paper/60 dark:text-ink/60 md:text-left">
                  {activeGender || activeAge || activeCondition ? (
                    <span>
                      Selected:{" "}
                      {activeGender && activeGender !== "All" ? activeGender : "All"}
                      {activeGender && activeGender !== "All" && (activeAge || activeCondition) && " · "}
                      {activeAge && `${activeAge}`}
                      {activeAge && activeCondition && " · "}
                      {activeCondition && activeCondition}
                    </span>
                  ) : (
                    <span>Selected: All</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 md:flex-row md:justify-end">
                  <button
                    onClick={() => {
                      setActiveGender("All");
                      setActiveAge(null);
                      setActiveCondition(null);
                    }}
                    data-cursor="pointer"
                    className="rounded-lg border border-paper/20 px-4 py-2 text-xs font-medium text-paper/70 transition-all hover:border-paper/30 hover:bg-paper/10 dark:border-ink/20 dark:text-ink/70 dark:hover:border-ink/30 dark:hover:bg-ink/10"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById("product-results")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    data-cursor="pointer"
                    className="rounded-lg bg-[#E8A020] px-4 py-2 text-xs font-medium text-[#141414] transition-all hover:bg-[#d4921d]"
                  >
                    Show Matching Footwear
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Product cards */}
      <section id="product-results" className="section pt-0">
        <div className="container">
          {showFallbackMessage && (
            <Reveal>
              <p className="mb-8 text-sm text-ink-muted">
                No exact match found. Showing similar options.
              </p>
            </Reveal>
          )}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayed.map((problem, i) => (
              <Reveal key={problem.slug} delay={(i % 6) * 0.05}>
                <Link
                  href={`/foot-problems/${problem.slug}`}
                  data-cursor="pointer"
                  className="group block rounded-2xl border border-line bg-paper overflow-hidden transition-all hover:border-gold/40 hover:shadow-sm"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-paper-soft ring-1 ring-transparent transition-all duration-300 group-hover:ring-gold/15">
                    <Image
                      src={img(problem.image, 800)}
                      alt={problem.title}
                      fill
                      sizes="(min-width: 768px) 30vw, 90vw"
                      className="object-contain p-6 transition-transform duration-700 ease-premium group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] uppercase tracking-wide text-ink-faint">
                        {problem.category}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-xl tracking-editorial">{problem.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {problem.supportiveFeatures.slice(0, 3).map((f) => (
                        <span key={f} className={badgeStyle}>
                          {f.split(" ").slice(0, 2).join(" ")}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-ink">
                      View Details
                      <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-ink text-paper dark:bg-paper dark:text-ink">
        <div className="container text-center">
          <Reveal>
            <h2 className="font-display text-4xl tracking-editorial md:text-6xl">
              Start Your Search Here
            </h2>
            <p className="mx-auto mt-6 max-w-md text-paper/70 dark:text-ink/70">
              Take our fit finder to discover the footwear designed around your movement.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <MagneticButton href="#finder-filters" variant="gold" size="lg">
                Explore Filters
              </MagneticButton>
              <MagneticButton href="/shop" variant="outline" size="lg">
                Shop The Collection
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