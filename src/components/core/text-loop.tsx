"use client";
import React, { useState, useEffect, Children } from "react";
import {
  AnimatePresence,
  Transition,
  Variants,
  motion,
  type AnimatePresenceProps,
} from "motion/react";
import { cn } from "@/lib/utils";

export type TextLoopProps = {
  children: React.ReactNode[];
  className?: string;
  interval?: number;
  transition?: Transition;
  variants?: Variants;
  onIndexChange?: (index: number) => void;
  trigger?: boolean;
  mode?: AnimatePresenceProps["mode"];
};

export function TextLoop({
  children,
  className,
  interval = 3,
  transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  variants,
  onIndexChange,
  trigger = true,
  mode = "popLayout",
}: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    if (!trigger || items.length <= 1) return;

    const intervalMs = interval * 1000;
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [items.length, interval, onIndexChange, trigger]);

  // Buttery-smooth motion blur vertical glide variants
  const defaultVariants: Variants = {
    initial: {
      y: "90%",
      opacity: 0,
      filter: "blur(6px)",
    },
    animate: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: {
      y: "-90%",
      opacity: 0,
      filter: "blur(6px)",
    },
  };

  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-start overflow-hidden align-baseline",
        className
      )}
    >
      <AnimatePresence mode={mode} initial={false}>
        <motion.span
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          variants={variants || defaultVariants}
          className="inline-block whitespace-nowrap will-change-[transform,opacity,filter]"
        >
          {items[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function TextLoopBasic() {
  return (
    <TextLoop className="font-mono text-sm">
      <span>How can I assist you today?</span>
      <span>Generate a logo</span>
      <span>Create a component</span>
      <span>Draw a diagram</span>
    </TextLoop>
  );
}
