"use client";
import React, {
  Children,
  cloneElement,
  ReactElement,
  useEffect,
  useState,
  useId,
} from "react";
import { AnimatePresence, Transition, motion } from "motion/react";
import { cn } from "@/lib/utils";

export type AnimatedBackgroundProps = {
  children:
    | ReactElement<{ "data-id": string; className?: string; [key: string]: any }>[]
    | ReactElement<{ "data-id": string; className?: string; [key: string]: any }>;
  defaultValue?: string;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
};

export function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const uniqueId = useId();

  const handleSetActiveId = (id: string | null) => {
    setActiveId(id);
    if (onValueChange) {
      onValueChange(id);
    }
  };

  useEffect(() => {
    if (defaultValue !== undefined) {
      setActiveId(defaultValue);
    }
  }, [defaultValue]);

  return Children.map(children, (child: any, index) => {
    if (!child || !child.props) return child;
    const id = child.props["data-id"];

    const interactionProps = enableHover
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleSetActiveId(id);
            if (typeof child.props.onMouseEnter === "function") {
              child.props.onMouseEnter(e);
            }
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleSetActiveId(null);
            if (typeof child.props.onMouseLeave === "function") {
              child.props.onMouseLeave(e);
            }
          },
        }
      : {
          onClick: (e: React.MouseEvent) => {
            handleSetActiveId(id);
            if (typeof child.props.onClick === "function") {
              child.props.onClick(e);
            }
          },
        };

    return cloneElement(
      child,
      {
        key: index,
        className: cn("relative inline-flex items-center", child.props.className),
        "data-checked": activeId === id ? "true" : "false",
        ...interactionProps,
      },
      <>
        <AnimatePresence initial={false}>
          {activeId === id && (
            <motion.div
              layoutId={`background-${uniqueId}`}
              className={cn("absolute inset-0 pointer-events-none", className)}
              transition={transition}
              initial={{ opacity: defaultValue ? 1 : 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            />
          )}
        </AnimatePresence>
        <span className="relative z-10 inline-flex items-center gap-1.5">{child.props.children}</span>
      </>
    );
  });
}
