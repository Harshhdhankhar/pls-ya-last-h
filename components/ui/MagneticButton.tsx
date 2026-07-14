"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

const button = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full text-[13px] font-medium tracking-wide transition-colors duration-500 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        solid: "bg-ink text-paper hover:bg-ink-soft",
        outline: "border border-ink/20 text-ink hover:border-ink",
        gold: "bg-gold text-ink hover:bg-gold-soft",
        ghost: "text-ink hover:text-ink-muted",
      },
      size: {
        md: "h-12 px-7",
        lg: "h-14 px-9 text-[13px]",
        sm: "h-10 px-5 text-[12px]",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  }
);

type Props = VariantProps<typeof button> & {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  magnetic?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant,
  size,
  className,
  magnetic = true,
  ariaLabel,
  type = "button",
  disabled = false,
}: Props) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(0.3);
  const isMagnetic = magnetic && !disabled;

  const content = (
    <motion.span
      style={isMagnetic ? { x, y } : undefined}
      className="relative z-10 inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  const sharedProps = {
    className: cn(button({ variant, size }), disabled && "pointer-events-none opacity-50", className),
    onMouseMove: isMagnetic ? onMouseMove : undefined,
    onMouseLeave: isMagnetic ? onMouseLeave : undefined,
    "data-cursor": disabled ? undefined : ("pointer" as const),
    "aria-label": ariaLabel,
  };

  if (href && !disabled) {
    return (
      <Link
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...sharedProps}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...sharedProps}
    >
      {content}
    </button>
  );
}
