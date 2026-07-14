import { Reveal, RevealText } from "@/components/ui/Reveal";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";

export function Newsletter() {
  return (
    <section
      id="newsletter"
      data-landing-snap
      className="section min-h-[100svh] border-y border-line bg-paper-soft !pt-16 md:!pt-20"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-6 block">Stay in Touch</span>
          <h2 className="font-display text-4xl tracking-editorial md:text-6xl">
            <RevealText text="First to know. First to wear." />
          </h2>
          <Reveal delay={0.2} className="mt-6">
            <p className="text-pretty text-ink-muted">
              Early access to limited releases, studio stories and nothing else.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mx-auto mt-10 max-w-md">
            <NewsletterForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
