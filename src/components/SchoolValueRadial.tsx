import React, { useState } from "react";
import { Sparkles, CheckCircle2, ChevronRight } from "lucide-react";

interface Pillar {
  id: string;
  title: string;
  description: string;
  benefit: string;
}

export const SchoolValueRadial: React.FC = () => {
  const [activePillar, setActivePillar] = useState<string>("practical");

  const pillars: Pillar[] = [
    {
      id: "practical",
      title: "Practical Learning",
      description: "Moving students beyond passive textbook memorization to tangible physics and electronic experimentation.",
      benefit: "Retains 75%+ higher conceptual comprehension through physical trial.",
    },
    {
      id: "project",
      title: "Project-Based Learning",
      description: "Every curriculum milestone culminates in a functional machine built and tested by teams.",
      benefit: "Fosters self-direction, task ownership, and persistent trial-and-error.",
    },
    {
      id: "tech-exposure",
      title: "Technology Exposure",
      description: "Direct interaction with microcontrollers, optical sensors, motor drivers, and logic interfaces.",
      benefit: "Demystifies emerging tech early, creating confident creators instead of consumers.",
    },
    {
      id: "creativity",
      title: "Student Creativity",
      description: "Open-ended engineering design prompts encouraging novel mechanical architectures.",
      benefit: "Encourages diverse solution pathways to single challenges.",
    },
    {
      id: "problem-solving",
      title: "Problem Solving",
      description: "Debugging physical gear jams and code logic teaches analytical resilience.",
      benefit: "Builds a growth mindset where mistakes are treated as diagnostic data.",
    },
    {
      id: "teacher-enablement",
      title: "Teacher Enablement",
      description: "Turnkey syllabi, teacher orientation, and mentorship for existing science and computer faculty.",
      benefit: "No specialized hiring required; empowers existing institutional faculty.",
    },
    {
      id: "innovation-culture",
      title: "Innovation Culture",
      description: "Transforms school campus spaces into vibrant exhibition and experimentation hubs.",
      benefit: "Elevates school reputation and institutional admissions appeal.",
    },
    {
      id: "future-skills",
      title: "Future Skills",
      description: "Foundational exposure to automation, algorithmic thinking, and mechatronics.",
      benefit: "Prepares students for upcoming university disciplines and 2030+ engineering roles.",
    },
  ];

  const selected = pillars.find((p) => p.id === activePillar) || pillars[0];

  return (
    <div className="relative rounded-3xl bg-[#07070E] border border-white/10 p-6 md:p-12 overflow-hidden shadow-2xl">
      {/* Background ambient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#250060]/30 rounded-full blur-[120px] pointer-events-none" />

      {/* ============================================================== */}
      {/* DESKTOP INTERACTIVE RADIAL DISPLAY (#27)                       */}
      {/* ============================================================== */}
      <div className="hidden lg:block relative min-h-[580px]">
        {/* Center Node */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-56 h-56 rounded-full bg-[#05050A] border-2 border-[#00C9FF]/50 p-6 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(0,201,255,0.25)]">
          <div className="w-10 h-10 rounded-full bg-[#00C9FF]/20 flex items-center justify-center text-[#00C9FF] mb-2 animate-pulse">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#00C9FF] font-semibold">
            ROBOPULSE CORE
          </span>
          <h4 className="font-display text-lg text-white font-medium mt-1 leading-snug">
            Robotics · AI <br /> STEM · Innovation
          </h4>
          <span className="text-[10px] font-mono text-neutral-400 mt-2">
            8 SCHOOL PILLARS
          </span>
        </div>

        {/* Orbit Ring line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full border border-dashed border-[#00C9FF]/20 pointer-events-none" />

        {/* 8 Surrounding Radial Nodes arranged in circle */}
        {pillars.map((pillar, idx) => {
          const angle = (idx * (360 / pillars.length) - 90) * (Math.PI / 180);
          const radius = 230; // px
          const x = Math.round(radius * Math.cos(angle));
          const y = Math.round(radius * Math.sin(angle));
          const isSelected = activePillar === pillar.id;

          return (
            <div
              key={pillar.id}
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
              className="absolute top-1/2 left-1/2 z-30"
            >
              <button
                onClick={() => setActivePillar(pillar.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-300 flex items-center gap-2 whitespace-nowrap shadow-lg ${
                  isSelected
                    ? "bg-[#00C9FF] text-black font-semibold scale-110 shadow-[0_0_20px_rgba(0,201,255,0.6)]"
                    : "bg-[#0C0C16] border border-white/10 text-neutral-300 hover:border-[#00C9FF]/40 hover:text-white"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-black" : "bg-[#00C9FF]"}`} />
                <span>{pillar.title}</span>
              </button>
            </div>
          );
        })}

        {/* Bottom Inspector Bar for Selected Node */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 w-full max-w-xl bg-[#090912]/90 backdrop-blur-md border border-white/10 p-4 rounded-xl text-center">
          <span className="font-mono text-[10px] text-[#00C9FF] uppercase tracking-widest">
            ACTIVE FOCUS // {selected.title}
          </span>
          <p className="text-xs text-neutral-200 mt-1 font-sans">
            {selected.description}
          </p>
          <div className="mt-2 text-[11px] font-mono text-[#A9D4FF] flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00C9FF]" />
            <span>School Outcome: {selected.benefit}</span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE RESPONSIVE INTERACTIVE LIST (Prompt #27 usability rule)  */}
      {/* ============================================================== */}
      <div className="block lg:hidden space-y-4">
        {/* Core Header badge */}
        <div className="p-4 rounded-2xl bg-[#05050A] border border-[#00C9FF]/30 text-center">
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#00C9FF] font-semibold">
            ROBOPULSE CORE // 8 PILLARS
          </span>
          <h4 className="font-display text-xl text-white mt-1">
            Robotics · AI · STEM · Innovation
          </h4>
        </div>

        {/* Vertical Pillars List */}
        <div className="space-y-2">
          {pillars.map((pillar) => {
            const isSelected = activePillar === pillar.id;
            return (
              <div
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#250060]/30 border-[#00C9FF] shadow-[0_0_15px_rgba(0,201,255,0.15)]"
                    : "bg-white/[0.02] border-white/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-[#00C9FF]" : "bg-neutral-600"}`} />
                    <span className="text-xs font-semibold text-white tracking-wide">
                      {pillar.title}
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? "rotate-90 text-[#00C9FF]" : "text-neutral-500"
                    }`}
                  />
                </div>

                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-white/5 space-y-2 text-xs">
                    <p className="text-neutral-300 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                    <div className="flex items-start gap-1.5 text-[11px] font-mono text-[#00C9FF]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{pillar.benefit}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
