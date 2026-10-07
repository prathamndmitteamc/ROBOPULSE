import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ShinyButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
  size?: "sm" | "md" | "lg";
  icon?: boolean;
  type?: "button" | "submit";
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  label = "CONTACT US",
  onClick,
  className = "",
  textClassName = "",
  size = "md",
  icon = true,
  type = "button",
}) => {
  const sizeClasses = {
    sm: "py-1.5 px-4 typo-btn text-[0.875rem]",
    md: "py-2.5 px-6 typo-btn text-[0.9375rem]",
    lg: "py-3.5 px-8 typo-btn text-[1rem]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`shiny-border-wrapper group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C9FF] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.04] hover:shadow-[0_12px_28px_-6px_rgba(0,201,255,0.45)] active:translate-y-0 active:scale-[0.98] ${className}`}
      aria-label={label}
    >
      <span className="shiny-border-conic" />
      <span
        className={`relative z-10 flex items-center justify-center gap-2 rounded-full bg-[#050509] text-white transition-colors duration-300 group-hover:bg-[#090912] group-hover:text-[#00C9FF] ${sizeClasses[size]} ${textClassName}`}
      >
        <span>{label}</span>
        {icon && (
          <ArrowUpRight className="w-4 h-4 text-[#00C9FF] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        )}
      </span>
    </button>
  );
};
