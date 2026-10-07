/**
 * Robopulse Intelligence — MotionHeading System
 *
 * Provides high-performance, GPU-accelerated framer-motion based staggered fade-in-up
 * text animations for heading sections across the application.
 *
 * Features:
 * - Uses smooth cubic-bezier transition curves: [0.16, 1, 0.3, 1]
 * - Viewport-triggered (whileInView) with once: true and comfortable margins
 * - Automatically respects prefers-reduced-motion for full accessibility
 * - Staggered orchestration between eyebrow, headline, description, and actions
 */

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

export interface MotionHeadingGroupProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  yOffset?: number;
  viewportMargin?: string;
}

export const MotionHeadingGroup: React.FC<MotionHeadingGroupProps> = ({
  children,
  className = "",
  delay = 0.05,
  stagger = 0.12,
  yOffset = 24,
  viewportMargin = "-60px",
}) => {
  const prefersReduced = useReducedMotion();
  const shouldReduce = Boolean(prefersReduced);

  const containerVariants: Variants = {
    hidden: {
      opacity: shouldReduce ? 1 : 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduce ? 0 : stagger,
        delayChildren: shouldReduce ? 0 : delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: shouldReduce ? 1 : 0,
      y: shouldReduce ? 0 : yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduce ? 0 : 0.72,
        ease: SMOOTH_EASE,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      className={className}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return (
          <motion.div variants={itemVariants} className="w-full">
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export interface MotionItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
}

export const MotionItem: React.FC<MotionItemProps> = ({
  children,
  className = "",
  yOffset = 24,
  duration = 0.72,
}) => {
  const prefersReduced = useReducedMotion();
  const shouldReduce = Boolean(prefersReduced);

  const itemVariants: Variants = {
    hidden: {
      opacity: shouldReduce ? 1 : 0,
      y: shouldReduce ? 0 : yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduce ? 0 : duration,
        ease: SMOOTH_EASE,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

export interface MotionSectionHeaderProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  titleShimmer?: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center" | "right";
  borderBottom?: boolean;
  className?: string;
  maxWidth?: string;
  size?: "sm" | "md" | "lg" | "hero";
  badgePulse?: boolean;
}

export const MotionSectionHeader: React.FC<MotionSectionHeaderProps> = ({
  eyebrow,
  title,
  titleShimmer,
  description,
  align = "left",
  borderBottom = false,
  className = "",
  maxWidth = "max-w-3xl",
  size = "md",
  badgePulse = false,
}) => {
  const prefersReduced = useReducedMotion();
  const shouldReduce = Boolean(prefersReduced);

  const containerVariants: Variants = {
    hidden: {
      opacity: shouldReduce ? 1 : 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.1,
        delayChildren: shouldReduce ? 0 : 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: shouldReduce ? 1 : 0,
      y: shouldReduce ? 0 : 22,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduce ? 0 : 0.72,
        ease: SMOOTH_EASE,
      },
    },
  };

  const getTitleSizeClasses = () => {
    switch (size) {
      case "hero":
        return "typo-h1";
      case "lg":
        return "typo-h2";
      case "sm":
        return "typo-h4";
      case "md":
      default:
        return "typo-h3";
    }
  };

  const alignmentClasses =
    align === "center"
      ? "text-center mx-auto items-center"
      : align === "right"
      ? "text-right ml-auto items-end"
      : "text-left items-start";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={`space-y-4 ${borderBottom ? "border-b border-white/8 pb-4" : ""} ${className}`}
    >
      <div className={`flex flex-col ${alignmentClasses} ${maxWidth} space-y-4`}>
        {/* 1. Eyebrow */}
        {eyebrow && (
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 typo-eyebrow text-[#00C9FF]">
              {badgePulse && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] animate-pulse" />
              )}
              <span className="uppercase">{eyebrow}</span>
            </div>
          </motion.div>
        )}

        {/* 2. Main Title */}
        <motion.h2
          variants={itemVariants}
          className={`font-display text-white ${getTitleSizeClasses()}`}
        >
          {title}
          {titleShimmer && (
            <>
              {" "}
              <span className="italic text-shimmer font-normal">
                {titleShimmer}
              </span>
            </>
          )}
        </motion.h2>

        {/* 3. Description Paragraph */}
        {description && (
          <motion.p
            variants={itemVariants}
            className="typo-lead text-neutral-300 font-sans font-normal max-prose-readable"
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};
