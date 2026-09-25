import React from "react";
import { ShinyButton } from "../components/ShinyButton";
import { STUDENT_SKILLS } from "../data/solutionsData";
import {
  Atom,
  Cpu,
  Wrench,
  Calculator,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface StemPageProps {
  navigate: (path: string) => void;
}

export const StemPage: React.FC<StemPageProps> = ({ navigate }) => {
  const stemPillars = [
    {
      letter: "S",
      title: "Science",
      tagline: "OBSERVED LAWS OF NATURE",
      icon: Atom,
      examples: [
        "Newtonian mechanics, momentum, friction & torque",
        "Electromagnetism & electric potential",
        "Acoustic & optical wave propagation in sensors",
      ],
    },
    {
      letter: "T",
      title: "Technology",
      tagline: "EMBEDDED DIGITAL INTERFACES",
      icon: Cpu,
      examples: [
        "Microcontroller architecture & register states",
        "Digital logic, binary gates & PWM communication",
        "Edge computing & computer vision classifiers",
      ],
    },
    {
      letter: "E",
      title: "Engineering",
      tagline: "APPLIED PHYSICAL SYSTEMS",
      icon: Wrench,
      examples: [
        "Mechanical gear ratios, chassis balance & tolerances",
        "Circuit design, voltage drops & thermal dissipation",
        "Iterative prototyping & diagnostic debugging",
      ],
    },
    {
      letter: "M",
      title: "Mathematics",
      tagline: "PRECISE QUANTITATIVE REASONING",
      icon: Calculator,
      examples: [
        "Geometry & coordinate vector calculations",
        "Ohm's Law: Voltage, Current, and Resistance (V = IR)",
        "Kinematic equations for velocity and distance over time",
      ],
    },
  ];

  return (
    <div className="relative pt-24 md:pt-32 pb-24 space-y-24 md:space-y-32 overflow-hidden">
      {/* ============================================================== */}
      {/* 01 — HERO HEADER                                               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#00C9FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] animate-pulse" />
            <span>PEDAGOGY // STEM EDUCATION</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.95]">
            Experiential &amp; Project-Based{" "}
            <span className="italic text-shimmer">STEM Learning.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-sans">
            Bridging theoretical classroom equations with tactile physical engineering. When students assemble microcontrollers, measure sensor signals, and calculate torque, science and mathematics cease to be abstractions—they become instruments of creation.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 02 — S.T.E.M. ARCHITECTURE BREAKDOWN                           */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        <div className="border-b border-white/8 pb-4">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00C9FF]">
            DISCIPLINARY ALIGNMENT
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-white mt-1">
            How Robotics Unifies S.T.E.M.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stemPillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.letter}
                className="p-6 rounded-3xl bg-[#070710] border border-white/10 space-y-4 hover:border-[#00C9FF]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl text-[#00C9FF]">
                    {item.letter}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white/5 text-[#A9D4FF] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl text-white">{item.title}</h3>
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 block mt-0.5">
                    {item.tagline}
                  </span>
                </div>

                <ul className="space-y-2 pt-3 border-t border-white/5">
                  {item.examples.map((ex, i) => (
                    <li key={i} className="text-xs text-neutral-300 flex items-start gap-1.5 font-sans leading-relaxed">
                      <span className="text-[#00C9FF] mt-0.5">›</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 03 — 8 STUDENT SKILLS DEVELOPMENT (#28)                        */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        <div className="border-b border-white/8 pb-4">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00C9FF]">
            COGNITIVE OUTCOMES
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-white mt-1">
            Eight Student Competencies Built Through Robotics
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Measurable, high-impact cognitive and emotional traits developed through repetitive hardware problem solving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STUDENT_SKILLS.map((skill, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/8 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#00C9FF]">
                    {skill.focusArea}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    SKILL 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-display text-2xl text-white">
                  {skill.name}
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  {skill.definition}
                </p>
              </div>

              {/* Visual Competency Indicator bar */}
              <div className="pt-4 border-t border-white/5 space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                  <span>MASTERY INDEX</span>
                  <span className="text-[#A9D4FF]">{skill.progressPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#006CFF] to-[#00C9FF] rounded-full"
                    style={{ width: `${skill.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 04 — CTA SECTION                                               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-[#070712] via-[#090918] to-[#040409] border border-white/15 text-center space-y-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00C9FF]">
            ENHANCE YOUR CURRICULUM
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white">
            Embed Practical STEM In Your Timetable.
          </h2>
          <p className="text-sm text-neutral-300 max-w-xl mx-auto font-sans">
            Connect with our academic team to review curriculum mapping against your state, CBSE, ICSE, or Cambridge standards.
          </p>
          <div className="pt-2">
            <ShinyButton
              size="lg"
              label="CONTACT US"
              onClick={() => navigate("/contact")}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
