import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface ThemeToggleProps {
  size?: "sm" | "md";
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = "md",
  showLabel = false,
  className = "",
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-9 h-9 text-sm",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to white mode" : "Switch to dark mode"}
      title={isDark ? "Switch to white mode" : "Switch to dark mode"}
      className={`relative inline-flex items-center justify-center rounded-full border transition-all duration-300 cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C9FF] ${
        isDark
          ? "bg-white/5 hover:bg-white/10 border-white/10 text-neutral-300 hover:text-[#00C9FF]"
          : "bg-slate-200/70 hover:bg-slate-300/80 border-slate-300/80 text-slate-700 hover:text-slate-900 shadow-sm"
      } ${sizeClasses[size]} ${className}`}
    >
      <span className="relative flex items-center justify-center">
        {isDark ? (
          <Sun
            className={`${iconSizes[size]} transition-transform duration-500 group-hover:rotate-45 text-[#00C9FF]`}
          />
        ) : (
          <Moon
            className={`${iconSizes[size]} transition-transform duration-500 group-hover:-rotate-12 text-[#250060]`}
          />
        )}
      </span>

      {showLabel && (
        <span className="ml-2 font-mono text-xs uppercase tracking-wider">
          {isDark ? "White Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
};
