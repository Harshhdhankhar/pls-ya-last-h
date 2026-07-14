import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

/** Small editorial break between the finder and the results grieeps
 *  footwear visually present without another long block of text. */
export function EditorialStrip() {
  const shots = products.slice(0, 3);

  return (
    <section className="border-y border-line bg-paper-warm py-14 md:py-20">
      <div className="container">
        <Reveal className="mb-8 flex items-end justify-between">
          <span className="eyebrow text-ink-muted">Built To Be Worn</span>
        </Reveal>
        <div className="grid grid-cols-3 gap-3 md:gap-5">
          {shots.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.08}>
              <Link href="/shop" data-cursor="pointer" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-paper-soft">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 768px) 24vw, 32vw"
                    className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
