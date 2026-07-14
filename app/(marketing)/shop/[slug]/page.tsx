import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { footProblems } from "@/lib/footProblems";
import { ProductDetailClient } from "@/components/pdp/ProductDetailClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

// Heuristic mapping from silhouette category to the most relevant
// "Find Your Need" guides, used by the PDP's Designed For section.
const DESIGNED_FOR_BY_CATEGORY: Record<string, string[]> = {
  Low: ["long-standing", "office-commute", "everyday-comfort"],
  Mid: ["flat-feet", "overpronation", "office-commute"],
  High: ["flat-feet", "overpronation", "acl-recovery"],
  Runner: ["long-walking", "running", "high-arches"],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: `${product.name} - ${product.colorway}`,
    description: product.description ?? `${product.name} - ${product.line} from Sole-arium.`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const variants = products.filter((p) => p.name === product.name);
  const related = products.filter((p) => p.name !== product.name).slice(0, 4);
  const designedForSlugs = DESIGNED_FOR_BY_CATEGORY[product.category] ?? [];
  const designedFor = designedForSlugs
    .map((slug) => footProblems.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <ProductDetailClient
      product={product}
      variants={variants}
      related={related}
      designedFor={designedFor}
    />
  );
}
