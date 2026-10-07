import React, { useState, useRef } from "react";

interface PillarItem {
  code: string;
  label: string;
}

const PROGRAM_PILLARS: PillarItem[] = [
  { label: "Robotics Education", code: "01 // MECHATRONICS" },
  { label: "AI Learning", code: "02 // NEURAL LOGIC" },
  { label: "STEM Programs", code: "03 // EXPERIENTIAL" },
  { label: "Practical Training", code: "04 // HANDS-ON" },
  { label: "Robotics Labs", code: "05 // TURNKEY BAYS" },
  { label: "School Innovation", code: "06 // FUTURE READINESS" },
];

export const ProgramPillarsStrip: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerMousePos, setContainerMousePos] = useState<{ x: number; y: number } | null>(null);

  // Per-item cursor tracking
  const [hoveredCardPos, setHoveredCardPos] = useState<{ index: number; x: number; y: number } | null>(null);

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setContainerMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleContainerMouseLeave = () => {
    setContainerMousePos(null);
    setHoveredCardPos(null);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8" aria-label="Program Architecture Pillars">
      {/* Outer ambient glow wrapper */}
      <div className="relative group/strip">
        {/* Ambient cyan/purple backdrop glow */}
        <div
          className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#00C9FF]/12 via-[#250060]/25 to-[#006CFF]/15 blur-xl opacity-60 group-hover/strip:opacity-90 transition-opacity duration-700 pointer-events-none"
          aria-hidden="true"
        />

        {/* Faint animated gradient border wrapper */}
        <div className="relative p-[1px] rounded-2xl md:rounded-3xl bg-gradient-to-r from-white/10 via-[#00C9FF]/20 to-white/10">
          {/* Main Large Rounded Container with glassmorphism */}
          <div
            ref={containerRef}
            onMouseMove={handleContainerMouseMove}
            onMouseLeave={handleContainerMouseLeave}
            className="relative overflow-hidden rounded-[calc(1rem-1px)] md:rounded-[calc(1.5rem-1px)] bg-[#05050a]/90 backdrop-blur-xl p-5 sm:p-7 lg:p-8"
          >
            {/* Ambient spotlight following the cursor across the entire container */}
            {containerMousePos && (
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-100"
                style={{
                  background: `radial-gradient(420px circle at ${containerMousePos.x}px ${containerMousePos.y}px, rgba(0, 201, 255, 0.08), rgba(37, 0, 96, 0.12), transparent 70%)`,
                }}
                aria-hidden="true"
              />
            )}

            {/* Subtle cyber grid backdrop accent */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(0, 201, 255, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 201, 255, 0.5) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
              aria-hidden="true"
            />

            {/* Grid of the 6 Navigation Cards */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5 text-center">
              {PROGRAM_PILLARS.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                const isHoveredThisCard = hoveredCardPos?.index === idx;

                return (
                  <div
                    key={idx}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedIndex(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedIndex(idx);
                      }
                    }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredCardPos({
                        index: idx,
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                      });
                    }}
                    onMouseLeave={() => {
                      if (hoveredCardPos?.index === idx) {
                        setHoveredCardPos(null);
                      }
                    }}
                    className={`group/card relative rounded-xl sm:rounded-2xl p-3.5 sm:p-4 lg:p-4.5 cursor-pointer select-none text-center transition-all duration-350 ease-out flex flex-col items-center justify-between min-h-[92px] sm:min-h-[102px] overflow-hidden ${
                      isSelected
                        ? "bg-[#090918]/95 border border-[#00C9FF]/60 shadow-[0_0_22px_rgba(0,201,255,0.22),inset_0_0_16px_rgba(0,201,255,0.08)] -translate-y-1 scale-[1.01]"
                        : "bg-white/[0.02] hover:bg-white/[0.05] border border-white/8 hover:border-[#00C9FF]/40 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_12px_28px_-6px_rgba(0,201,255,0.24),0_0_18px_rgba(37,0,96,0.3)]"
                    }`}
                  >
                    {/* Per-item cursor-following radial light */}
                    {isHoveredThisCard && hoveredCardPos && (
                      <div
                        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                        style={{
                          background: `radial-gradient(140px circle at ${hoveredCardPos.x}px ${hoveredCardPos.y}px, rgba(0, 201, 255, 0.16), transparent 75%)`,
                        }}
                        aria-hidden="true"
                      />
                    )}

                    {/* Light sweep animation on hover */}
                    <div
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent group-hover/card:animate-[shine_0.75s_ease-out] transition-transform duration-700"
                      aria-hidden="true"
                    />

                    {/* Thin luminous border glow traveling effect */}
                    <div
                      className={`pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl transition-opacity duration-300 ${
                        isSelected
                          ? "opacity-100 ring-1 ring-[#00C9FF]/40"
                          : "opacity-0 group-hover/card:opacity-100 ring-1 ring-[#00C9FF]/30"
                      }`}
                      aria-hidden="true"
                    />

                    {/* Card Content */}
                    <div className="relative z-10 w-full space-y-1.5 flex flex-col items-center justify-center">
                      {/* Code Tag: 01 // MECHATRONICS */}
                      <span
                        className={`font-mono text-[10px] sm:text-[11px] tracking-wider block transition-all duration-300 transform-gpu group-hover/card:translate-x-0.5 ${
                          isSelected
                            ? "text-[#00C9FF] font-semibold drop-shadow-[0_0_8px_rgba(0,201,255,0.7)]"
                            : "text-[#00C9FF]/80 group-hover/card:text-[#00C9FF] group-hover/card:drop-shadow-[0_0_8px_rgba(0,201,255,0.6)]"
                        }`}
                      >
                        {item.code}
                      </span>

                      {/* Main Title: Robotics Education */}
                      <span
                        className={`text-xs sm:text-[13.5px] lg:text-[14px] leading-snug block transition-all duration-300 transform-gpu group-hover/card:-translate-y-0.5 ${
                          isSelected
                            ? "text-white font-semibold drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                            : "text-neutral-300 font-medium group-hover/card:text-white group-hover/card:drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    {/* Active State Indicator Bar / Dot */}
                    <div className="relative z-10 mt-2 h-1 flex items-center justify-center">
                      {isSelected ? (
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] shadow-[0_0_8px_#00C9FF] animate-pulse" />
                          <span className="w-6 h-[2px] rounded-full bg-gradient-to-r from-[#00C9FF] to-[#006CFF] shadow-[0_0_8px_#00C9FF]" />
                        </div>
                      ) : (
                        <span className="w-3 h-[1.5px] rounded-full bg-white/10 group-hover/card:bg-[#00C9FF]/50 group-hover/card:w-5 transition-all duration-300" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
