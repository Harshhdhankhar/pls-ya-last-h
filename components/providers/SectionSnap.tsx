"use client";

import { useEffect } from "react";

/**
 * Soft landing-page snaeeps scroll free under the user’s control.
 *
 * Wheel / touch / keys scroll normally (Lenis). After the user pauses,
 * if the viewport is close to a section edge we gently settle onto that
 * section so more of it fits the screen. No forced one-section stepping.
 */
export function SectionSnap() {
  useEffect(() => {
    const getLenis = () => (typeof window !== "undefined" ? window.__lenis : undefined);

    let settleTimer: number | null = null;
    let animating = false;

    const currentY = () => {
      const lenis = getLenis();
      return lenis && typeof lenis.scroll === "number" ? lenis.scroll : window.scrollY;
    };

    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-landing-snap]"));

    const sectionTop = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return rect.top + currentY();
    };

    const snapTo = (target: number) => {
      const y = Math.max(0, Math.round(target));
      if (Math.abs(currentY() - y) < 6) return;

      animating = true;
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(y, {
          duration: 0.85,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
          onComplete: () => {
            animating = false;
          },
        });
        return;
      }

      window.scrollTo({ top: y, behavior: "smooth" });
      window.setTimeout(() => {
        animating = false;
      }, 750);
    };

    /** Soft settle: only pull in when already near a section start. */
    const settle = () => {
      if (animating) return;

      const sections = getSections();
      if (sections.length < 2) return;

      const y = currentY();
      const threshold = Math.min(window.innerHeight * 0.28, 220);

      let bestTop = 0;
      let bestDist = Infinity;

      for (const el of sections) {
        // Skip soft-snap while deep inside a free-scroll (pin/scrub) section.
        if (el.dataset.landingSnap === "free") {
          const top = sectionTop(el);
          const next = sections[sections.indexOf(el) + 1];
          const nextTop = next ? sectionTop(next) : top + window.innerHeight * 2;
          if (y > top + threshold && y < nextTop - threshold) return;
        }

        const top = sectionTop(el);
        const dist = Math.abs(y - top);
        if (dist < bestDist) {
          bestDist = dist;
          bestTop = top;
        }
      }

      if (bestDist > 8 && bestDist <= threshold) {
        snapTo(bestTop);
      }
    };

    const scheduleSettle = () => {
      if (settleTimer) window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 140);
    };

    const onWheel = () => {
      if (animating) return;
      scheduleSettle();
    };

    const onKey = (e: KeyboardEvent) => {
      if (
        ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Spacebar", "Home", "End"].includes(
          e.key
        )
      ) {
        scheduleSettle();
      }
    };

    const onTouchEnd = () => scheduleSettle();

    // Also settle when Lenis finishes inertial scrolling.
    let scrollHandler: ((args: { velocity?: number }) => void) | null = null;
    const attachLenis = () => {
      const lenis = getLenis();
      if (!lenis || scrollHandler) return;
      scrollHandler = ({ velocity }) => {
        if (animating) return;
        if (typeof velocity === "number" && Math.abs(velocity) < 0.08) {
          scheduleSettle();
        }
      };
      lenis.on("scroll", scrollHandler);
    };

    attachLenis();
    const lenisPoll = window.setInterval(attachLenis, 400);
    window.setTimeout(() => window.clearInterval(lenisPoll), 3000);

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      if (settleTimer) window.clearTimeout(settleTimer);
      window.clearInterval(lenisPoll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return null;
}
