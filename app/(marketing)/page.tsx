import { Hero } from "@/components/hero/Hero";
import { LatestCollection } from "@/components/collections/LatestCollection";
import { HowCustomWorks } from "@/components/story/HowCustomWorks";
import { AnalyseBand } from "@/components/analyse/AnalyseBand";
import { InstagramGrid } from "@/components/instagram/InstagramGrid";
import { Newsletter } from "@/components/newsletter/Newsletter";
import { SectionSnap } from "@/components/providers/SectionSnap";

export default function HomePage() {
  return (
    <>
      <SectionSnap />
      <Hero />
      <LatestCollection />
      <HowCustomWorks />
      <AnalyseBand />
      <InstagramGrid />
      <Newsletter />
    </>
  );
}
