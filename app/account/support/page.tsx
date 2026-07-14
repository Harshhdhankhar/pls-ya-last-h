"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/account/SectionHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    id: "faq-custom",
    question: "What makes Sole-arium footwear different?",
    answer:
      "Every silhouette is designed around natural movemenhe way your foot bends, spreads and lands. We build on lasts developed through years of observation, not trends. Each pair is crafted in limited runs, by hand, using materials chosen for how they feel as well as how they look.",
  },
  {
    id: "faq-reservation",
    question: "How do reservations work?",
    answer:
      "Rather than mass-producing and hoping for a fit, we release in numbered drops. You place a reservation with a deposit to secure your pair. It then moves through four stageeserved, In Production, Ready to Ship, Shippeach visible from your account. Your pair is built to your size, for you.",
  },
  {
    id: "faq-fit",
    question: "How do I find the right fit?",
    answer:
      "Our lasts run true to size for most feet, though some silhouettes are cut slightly longer to accommodate a broader forefooe note this on each product page. If you have a previous Sole-arium pair, that size will carry over. If you are unsure, our studio can advise based on your usual size across other brands.",
  },
  {
    id: "faq-colorway",
    question: "Can I customise the colour or materials?",
    answer:
      "Each drop is a fixed desigolourway, materials and proportions are set when the run is announced. We make considered choices about every element so that each release stands as intended. Over time, archive colourways reappear as limited restocks.",
  },
  {
    id: "faq-shipping",
    question: "Where do you ship?",
    answer:
      "We ship to the United States, United Kingdom, EU and select territories across Asia-Pacific. In-stock orders leave the studio within two business days. Reserved pairs ship once they clear inspection, on the date shown in your timeline.",
  },
  {
    id: "faq-membership",
    question: "What do membership tiers offer?",
    answer:
      "Membership is earned through purchases and tenure, moving from Member to Founding Member to Icon Status. Each tier unlocks earlier access to new droprom 12 hours up to 48 hourlongside shipping upgrades and, at the top tier, an invitation to visit the studio.",
  },
  {
    id: "faq-payment",
    question: "How does payment work?",
    answer:
      "Most reservations are held with a deposit, with the balance charged automatically once your pair enters production. Some early-access drops require payment in full at the time of reservation. Either way, you will know the total before you confirm.",
  },
  {
    id: "faq-returns",
    question: "What if my shoes do not fit?",
    answer:
      "If your pair does not fit, you have 14 days from delivery to return unworn shoes in the original packaging for a full refund. Because each colourway is produced in a fixed quantity, exchanges are not held as backstoceturns are refunded instead. We will help you find the right size for the next drop.",
  },
];

const channels = [
  {
    icon: MapPin,
    label: "Studio",
    lines: ["Unit 4, Founders Yard", "Clerkenwell, London EC1"],
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

function FAQRow({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="py-1">
      <button
        type="button"
        onClick={onToggle}
        data-cursor="pointer"
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className={cn("font-display text-lg tracking-editorial md:text-xl", isOpen && "text-gold-deep")}>
          {faq.question}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-ink-faint transition-transform duration-500 ease-premium",
            isOpen && "rotate-180 text-gold"
          )}
          strokeWidth={1.5}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="text-pretty pb-6 leading-relaxed text-ink-muted">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SupportPage() {
  const { user } = useAuth();
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  if (!user) return null;

  return (
    <div>
      <SectionHeader
        eyebrow="Support"
        title="How can we help"
        description="Answers on reservations, fit, shipping and membershilus a direct line to the studio."
      />

      <Reveal className="rounded-2xl border border-line px-6 md:px-7">
        <div className="divide-y divide-line">
          {faqs.map((faq) => (
            <FAQRow
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId((prev) => (prev === faq.id ? null : faq.id))}
            />
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-14 rounded-2xl border border-line p-6 md:p-7">
        <p className="eyebrow mb-8 text-ink-muted">Still need something?</p>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {channels.map((item) => (
            <div key={item.label}>
              <item.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
              <p className="eyebrow mt-4 mb-2 text-ink-muted">{item.label}</p>
              {item.lines.map((line) => (
                <p key={line} className="text-base leading-snug">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-line pt-8">
          <MagneticButton href="/contact" variant="solid" size="md">
            Contact the Studio
          </MagneticButton>
        </div>
      </Reveal>
    </div>
  );
}
