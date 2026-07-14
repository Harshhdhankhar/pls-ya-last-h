"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Premium intro loader. Holds scroll (html.is-loading, set in the server
 * markup) until the brand mark finishes its reveal, then releases the page.
 */
export function Loader() {
  const reducedMotion = usePrefersReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const release = () => {
      document.documentElement.classList.remove("is-loading");
      window.__lenis?.start();
    };

    if (reducedMotion) {
      release();
      setDone(true);
      return;
    }

    const timer = setTimeout(() => {
      setDone(true);
      release();
    }, 1900);

    return () => clearTimeout(timer);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-paper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: EASE, delay: 0.05 } }}
        >
          <div className="overflow-hidden">
            <motion.span
              className="block font-display text-[13vw] leading-[0.85] tracking-tightest text-ink md:text-[8vw]"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
            >
              Sole-arium
            </motion.span>
          </div>

          <motion.div
            className="mt-10 h-px w-40 overflow-hidden bg-ink/10 md:w-56"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ transformOrigin: "left" }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.55 }}
            />
          </motion.div>

          <motion.span
            className="eyebrow mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            Every Step, Corrected
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
