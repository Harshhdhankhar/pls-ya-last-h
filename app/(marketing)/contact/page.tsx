import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal, RevealText } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contacole-arium",
  description:
    "Reach the Sole-arium studio for press, wholesale, or general inquiriee respond personally within two business days.",
};

const info = [
  {
    icon: MapPin,
    label: "Visit",
    lines: ["Unit 4, Founders Yard", "Clerkenwell, London"],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["studio@solearium.com"],
  },
  {
    icon: Phone,
    label: "Phone",
    lines: ["+44 20 7946 0891", "Mon - Fri, 9am - 6pm GMT"],
  },
];

export default function ContactPage() {
  return (
    <div className="pt-28 md:pt-32">
      <section className="section pb-14 pt-0 md:pb-20">
        <div className="container">
          <span className="eyebrow mb-6 block">Get In Touch</span>
          <h1 className="max-w-3xl font-display text-5xl leading-[1.1] tracking-editorial md:text-7xl">
            <RevealText text="Let's talk." />
          </h1>
          <Reveal delay={0.2} className="mt-7 max-w-xl">
            <p className="text-pretty text-lg leading-relaxed text-ink-muted">
              Whether you&rsquo;re a user, clinician, partner, or investor, we&rsquo;d love to
              hear from you. Tell us what you&rsquo;re looking for and we&rsquo;ll direct you to
              the right place.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0 pb-24 md:pb-32">
        <div className="container grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <div className="space-y-10 border-t border-line pt-10 md:border-t-0 md:pt-0">
              {info.map((item, i) => (
                <Reveal key={item.label} delay={i * 0.1}>
                  <item.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  <p className="eyebrow mt-4 mb-2 text-ink-muted">{item.label}</p>
                  {item.lines.map((line) => (
                    <p key={line} className="text-lg">
                      {line}
                    </p>
                  ))}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
