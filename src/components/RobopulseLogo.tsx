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
  // Responsive circular emblem wrapper dimensions:
  // Desktop: ~48px × 48px | Tablet: ~44px × 44px | Mobile: ~40px × 40px
  const emblemSizes = {
    sm: "w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] lg:w-[44px] lg:h-[44px]",
    md: "w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] lg:w-[48px] lg:h-[48px]",
    lg: "w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] lg:w-[52px] lg:h-[52px]",
  };

  // ROBOPULSE Title typography (~17-19px desktop, ~15-16px mobile)
  const titleSizes = {
    sm: "text-[14px] sm:text-[15px] lg:text-[16px]",
    md: "text-[15.5px] sm:text-[17px] lg:text-[18.5px]",
    lg: "text-[18px] sm:text-[20px] lg:text-[22px]",
  };

  // INTELLIGENCE Subtitle typography (~8-10px desktop, ~7-8px mobile)
  const subSizes = {
    sm: "text-[7px] sm:text-[8px] lg:text-[8.5px]",
    md: "text-[7.5px] sm:text-[8.5px] lg:text-[9.5px]",
    lg: "text-[9px] sm:text-[10px] lg:text-[11px]",
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-[10px] sm:gap-[12px] cursor-pointer select-none group ${className}`}
    >
      {/* 1. Circular Cyborg Head Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        {/* Subtle cyan & deep blue/purple ambient backlight */}
        <div className="absolute inset-0 bg-[#00C9FF]/15 rounded-full blur-[8px] group-hover:bg-[#00C9FF]/30 transition-all duration-300 pointer-events-none" />
        <div className="absolute -inset-1 bg-[#250060]/20 rounded-full blur-[10px] pointer-events-none" />

        {/* Circular emblem frame */}
        <div
          className={`relative ${emblemSizes[size]} rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-[#05050a] border border-[#00C9FF]/25 shadow-[0_0_12px_rgba(0,201,255,0.22),0_4px_14px_rgba(0,0,0,0.6)] group-hover:border-[#00C9FF]/50 group-hover:shadow-[0_0_18px_rgba(0,201,255,0.38),0_4px_16px_rgba(0,0,0,0.7)] group-hover:scale-[1.03] transition-all duration-300 ease-out`}
        >
          <img
            src="https://i.postimg.cc/nzpwrV4P/Futuristic-Neon-Cyborg-Head-Emblem.png"
            alt="Robopulse Cyborg Emblem"
            className="w-full h-full object-cover select-none pointer-events-none"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* 2. Distinct ROBOPULSE INTELLIGENCE Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-sans font-bold text-white tracking-[0.08em] transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] ${titleSizes[size]}`}
        >
          ROBOPULSE
        </span>
        <span
          className={`font-sans font-semibold text-[#00C9FF] uppercase tracking-[0.24em] mt-0.5 transition-colors duration-300 group-hover:text-[#A9D4FF] group-hover:drop-shadow-[0_0_6px_rgba(0,201,255,0.4)] ${subSizes[size]}`}
        >
          INTELLIGENCE
        </span>
      </div>
    </div>
  );
};

