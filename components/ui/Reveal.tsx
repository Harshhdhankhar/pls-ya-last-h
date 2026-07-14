"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Simple fade-up reveal on scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const word: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.85, ease: EASE } },
};

/**
 * Editorial line/word reveaach word rises from a clipped mask.
 * Renders as a block; pass an element tag via `as`.
 */
export function RevealText({
  text,
  className,
  stagger = 0.06,
  delay = 0,
  as: Tag = "span",
  once = true,
}: {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  once?: boolean;
}) {
  const words = text.split(" ");
  return (
    <Tag className={cn("inline-block", className)}>
      <motion.span
        className="inline"
        variants={container}
        custom={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-8% 0px" }}
        transition={{ delayChildren: delay }}
      >
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="relative inline-flex overflow-hidden align-bottom pb-[0.2em] pr-[0.08em]"
          >
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
