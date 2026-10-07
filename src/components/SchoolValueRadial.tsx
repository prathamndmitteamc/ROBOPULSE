import React, { useState, useEffect, useRef } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface Pillar {
  id: string;
  title: string;
  description: string;
  benefit: string;
}

export const SchoolValueRadial: React.FC = () => {
  const [activePillar, setActivePillar] = useState<string>("practical");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(1000);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pillar definitions
  const pillars: Pillar[] = [
    {
      id: "practical",
      title: "Practical Learning",
      description:
        "Moving students beyond passive textbook memorization to tangible physics and electronic experimentation.",
      benefit: "Retains 75%+ higher conceptual comprehension through physical trial.",
    },
    {
      id: "project",
      title: "Project-Based Learning",
      description:
        "Every curriculum milestone culminates in a functional machine built and tested by teams.",
      benefit: "Fosters self-direction, task ownership, and persistent trial-and-error.",
    },
    {
      id: "tech-exposure",
      title: "Technology Exposure",
      description:
        "Direct interaction with microcontrollers, optical sensors, motor drivers, and logic interfaces.",
      benefit: "Demystifies emerging tech early, creating confident creators instead of consumers.",
    },
    {
      id: "creativity",
      title: "Student Creativity",
      description:
        "Open-ended engineering design prompts encouraging novel mechanical architectures.",
      benefit: "Encourages diverse solution pathways to single challenges.",
    },
    {
      id: "problem-solving",
      title: "Problem Solving",
      description:
        "Debugging physical gear jams and code logic teaches analytical resilience.",
      benefit: "Builds a growth mindset where mistakes are treated as diagnostic data.",
    },
    {
      id: "teacher-enablement",
      title: "Teacher Enablement",
      description:
        "Turnkey syllabi, teacher orientation, and mentorship for existing science and computer faculty.",
      benefit: "No specialized hiring required; empowers existing institutional faculty.",
    },
    {
      id: "innovation-culture",
      title: "Innovation Culture",
      description:
        "Transforms school campus spaces into vibrant exhibition and experimentation hubs.",
      benefit: "Elevates school reputation and institutional admissions appeal.",
    },
    {
      id: "future-skills",
      title: "Future Skills",
      description:
        "Foundational exposure to automation, algorithmic thinking, and mechatronics.",
      benefit: "Prepares students for upcoming university disciplines and 2030+ engineering roles.",
    },
  ];

  const selected = pillars.find((p) => p.id === activePillar) || pillars[0];

  // Measure actual container width for accurate, glitch-free responsive positioning
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Smooth slow orbital movement
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Rotation speed: ~360 degrees in 100 seconds (0.0036 deg/ms)
    // Extremely subtle, elegant continuous motion
    const speed = 0.0036;

    const animate = (time: number) => {
      if (lastTimeRef.current != null) {
        const delta = time - lastTimeRef.current;
        if (!isPaused) {
          setRotationAngle((prev) => (prev + delta * speed) % 360);
        }
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPaused]);

  // Handle pillar selection
  const handleSelectPillar = (id: string) => {
    setActivePillar(id);
    setIsPaused(true);

    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    // Smoothly resume slow orbit after 4 seconds of idle
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4000);
  };

  // Compute adaptive orbital radius & center sizes based on measured container width
  // Container widths range: Desktop (~1150px), Laptop (~950px), Tablet (~700px), Mobile (~340-440px)
  let rx = 310;
  let ry = 220;
  let stageMinHeight = 540;
  let centerDiameter = 220;
  let buttonPadding = "px-4 py-2 text-xs md:text-sm";
  let dotSize = "w-2 h-2";

  if (containerWidth >= 1100) {
    rx = 340;
    ry = 230;
    stageMinHeight = 560;
    centerDiameter = 224;
    buttonPadding = "px-4 py-2 text-xs lg:text-sm";
  } else if (containerWidth >= 900) {
    rx = 290;
    ry = 210;
    stageMinHeight = 510;
    centerDiameter = 200;
    buttonPadding = "px-3.5 py-1.5 text-xs sm:text-[13px]";
  } else if (containerWidth >= 680) {
    rx = 240;
    ry = 185;
    stageMinHeight = 460;
    centerDiameter = 175;
    buttonPadding = "px-3 py-1.5 text-[12px]";
  } else if (containerWidth >= 460) {
    rx = 180;
    ry = 155;
    stageMinHeight = 410;
    centerDiameter = 145;
    buttonPadding = "px-2.5 py-1 text-[11px]";
    dotSize = "w-1.5 h-1.5";
  } else {
    // Narrow Mobile (< 460px)
    rx = 140;
    ry = 135;
    stageMinHeight = 360;
    centerDiameter = 125;
    buttonPadding = "px-2 py-1 text-[10px]";
    dotSize = "w-1.5 h-1.5";
  }

  return (
    <div
      ref={containerRef}
      className="relative rounded-3xl bg-[#07070E] border border-white/10 p-4 sm:p-8 lg:p-10 overflow-hidden shadow-2xl"
    >
      {/* Background ambient orbs */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#250060]/30 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#00C9FF]/10 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Cyber grid subtle backdrop accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 201, 255, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 201, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      {/* ============================================================== */}
      {/* ZONE 1: ORBITAL PILLAR STAGE (Autonomous vertical bounding box) */}
      {/* ============================================================== */}
      <div
        style={{ minHeight: `${stageMinHeight}px` }}
        className="relative w-full flex items-center justify-center select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
          pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 1000);
        }}
      >
        {/* Orbital Ellipse Ring Line (Dashed) */}
        <div
          style={{
            width: `${rx * 2}px`,
            height: `${ry * 2}px`,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#00C9FF]/20 pointer-events-none transition-all duration-300"
          aria-hidden="true"
        />

        {/* Secondary subtle concentric pulse ring */}
        <div
          style={{
            width: `${rx * 1.45}px`,
            height: `${ry * 1.45}px`,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04] pointer-events-none"
          aria-hidden="true"
        />

        {/* Central Stable Node: ROBOPULSE CORE */}
        <div
          style={{
            width: `${centerDiameter}px`,
            height: `${centerDiameter}px`,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-full bg-[#05050A] border-2 border-[#00C9FF]/50 p-3 sm:p-5 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(0,201,255,0.25)] transition-all duration-300"
        >
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#00C9FF]/20 flex items-center justify-center text-[#00C9FF] mb-1 sm:mb-1.5 shadow-[0_0_15px_rgba(0,201,255,0.4)]">
            <Sparkles className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 animate-pulse" />
          </div>
          <span className="font-mono text-[8.5px] sm:text-[10px] tracking-[0.25em] text-[#00C9FF] font-semibold">
            ROBOPULSE CORE
          </span>
          <h4 className="font-display text-xs sm:text-sm lg:text-base text-white font-medium mt-0.5 leading-snug">
            Robotics · AI <br className="hidden sm:inline" /> STEM · Innovation
          </h4>
          <span className="text-[8px] sm:text-[9.5px] font-mono text-neutral-400 mt-1 uppercase tracking-wider">
            8 School Pillars
          </span>
        </div>

        {/* 8 Clickable Orbital Pillars */}
        {pillars.map((pillar, idx) => {
          // Equi-spaced 45 degree intervals around the 360 ring
          const baseAngle = idx * (360 / pillars.length) - 90;
          const currentAngle = (baseAngle + rotationAngle) * (Math.PI / 180);

          const x = Math.round(rx * Math.cos(currentAngle));
          const y = Math.round(ry * Math.sin(currentAngle));
          const isSelected = activePillar === pillar.id;

          return (
            <div
              key={pillar.id}
              style={{
                transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0)`,
                willChange: "transform",
              }}
              className="absolute top-1/2 left-1/2 z-30 transition-transform duration-75 ease-linear"
            >
              <button
                type="button"
                onClick={() => handleSelectPillar(pillar.id)}
                className={`group relative ${buttonPadding} rounded-full font-medium cursor-pointer transition-all duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shadow-lg select-none outline-none focus:outline-none ${
                  isSelected
                    ? "bg-[#00C9FF] text-black font-semibold scale-105 sm:scale-110 shadow-[0_0_24px_rgba(0,201,255,0.7),0_0_10px_rgba(0,201,255,0.4)] ring-2 ring-[#00C9FF]/60"
                    : "bg-[#0C0C16]/95 backdrop-blur-md border border-white/12 text-neutral-200 hover:border-[#00C9FF]/60 hover:text-white hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_0_18px_rgba(0,201,255,0.35)]"
                }`}
              >
                {/* Indicator dot */}
                <span
                  className={`${dotSize} rounded-full transition-colors ${
                    isSelected
                      ? "bg-black"
                      : "bg-[#00C9FF] shadow-[0_0_6px_#00C9FF]"
                  }`}
                />

                {/* Pillar Title */}
                <span className="tracking-wide">{pillar.title}</span>

                {/* Subtle active pulse halo */}
                {isSelected && (
                  <span
                    className="absolute -inset-1 rounded-full border border-[#00C9FF]/40 animate-ping pointer-events-none"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* ZONE 2: DEDICATED SEPARATE ACTIVE FOCUS PANEL                  */}
      {/* Guaranteed vertical clearance below orbit with dedicated box   */}
      {/* ============================================================== */}
      <div className="relative z-30 mt-6 sm:mt-8 pt-6 border-t border-white/10 max-w-2xl mx-auto w-full">
        <div
          key={selected.id}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#090915]/95 to-[#06060c]/98 backdrop-blur-xl border border-[#00C9FF]/30 p-5 sm:p-6 text-center shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_25px_rgba(0,201,255,0.1)] transition-all duration-300"
        >
          {/* Subtle top cyan line indicator */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#00C9FF] to-transparent shadow-[0_0_10px_#00C9FF]" />

          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs text-[#00C9FF] uppercase tracking-[0.2em] font-semibold">
              ACTIVE FOCUS // {selected.title}
            </span>
          </div>

          <h3 className="typo-h3 text-white text-lg sm:text-xl font-medium mt-1">
            {selected.title}
          </h3>

          <p className="typo-body text-neutral-200 text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
            {selected.description}
          </p>

          <div className="mt-3.5 pt-3 border-t border-white/10 text-xs sm:text-sm font-mono text-[#A9D4FF] inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#00C9FF]/10 border border-[#00C9FF]/20">
            <CheckCircle2 className="w-4 h-4 text-[#00C9FF] shrink-0" />
            <span>
              <strong className="text-white font-medium">School Outcome:</strong>{" "}
              {selected.benefit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
