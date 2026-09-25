import React from "react";

interface RobopulseLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export const RobopulseLogo: React.FC<RobopulseLogoProps> = ({
  className = "",
  size = "md",
  onClick,
}) => {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const titleSizes = {
    sm: "text-base tracking-[0.14em]",
    md: "text-lg tracking-[0.16em]",
    lg: "text-2xl tracking-[0.18em]",
  };

  const subSizes = {
    sm: "text-[9px] tracking-[0.28em]",
    md: "text-[10px] tracking-[0.32em]",
    lg: "text-[11px] tracking-[0.36em]",
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 cursor-pointer select-none group ${className}`}
    >
      {/* Futuristic Robotic Intelligence Emblem */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        {/* Ambient glow behind mark */}
        <div className="absolute inset-0 bg-[#00C9FF]/20 rounded-full blur-md group-hover:bg-[#00C9FF]/35 transition-all duration-500" />
        
        <img
          src="https://i.ibb.co/GQW7R33B/remove-photos-removed-background-Copy.png"
          alt="Robopulse Logo"
          className="relative w-full h-full object-contain drop-shadow-[0_0_12px_rgba(0,201,255,0.45)]"
        />
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col leading-tight">
        <span
          className={`font-sans font-bold text-white transition-colors duration-300 group-hover:text-[#00C9FF] ${titleSizes[size]}`}
        >
          ROBOPULSE
        </span>
        <span
          className={`font-mono uppercase text-[#A9D4FF]/75 font-medium ${subSizes[size]}`}
        >
          INTELLIGENCE
        </span>
      </div>
    </div>
  );
};
