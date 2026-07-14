"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Drawer({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-ink/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={cn(
              "fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col bg-paper",
              className
            )}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex items-center justify-between border-b border-line px-7 py-6">
              <h2 className="font-display text-xl tracking-editorial">{title}</h2>
              <button
                onClick={onClose}
                aria-label="Close"
                data-cursor="pointer"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-paper-soft"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
