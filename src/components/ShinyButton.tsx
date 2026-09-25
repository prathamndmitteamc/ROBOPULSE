import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ShinyButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  icon?: boolean;
  type?: "button" | "submit";
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  label = "CONTACT US",
  onClick,
  className = "",
  size = "md",
  icon = true,
  type = "button",
}) => {
  const sizeClasses = {
    sm: "py-1.5 px-4 text-xs tracking-wider",
    md: "py-2.5 px-6 text-xs sm:text-sm tracking-wider font-semibold",
    lg: "py-3.5 px-8 text-sm sm:text-base tracking-wider font-semibold",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`shiny-border-wrapper group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C9FF] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] ${className}`}
      aria-label={label}
    >
      <span className="shiny-border-conic" />
      <span
        className={`relative z-10 flex items-center justify-center gap-2 rounded-full bg-[#050509] text-white transition-colors duration-300 group-hover:bg-[#090912] group-hover:text-[#00C9FF] ${sizeClasses[size]}`}
      >
        <span>{label}</span>
        {icon && (
          <ArrowUpRight className="w-4 h-4 text-[#00C9FF] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </span>
    </button>
  );
};
