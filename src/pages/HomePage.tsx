import React, { useState } from "react";
import { RobopulseHero } from "../components/RobopulseHero";
import { ShinyButton } from "../components/ShinyButton";
import { RoboticsControlInterface } from "../components/RoboticsControlInterface";
import { SchoolValueRadial } from "../components/SchoolValueRadial";
import { openWhatsApp } from "../config";
import { SOLUTIONS_LIST, HANDS_ON_PROJECTS, PROGRAM_MODELS } from "../data/solutionsData";
import { SCHOOLS, PARTNERS } from "../data/feedbackData";
import {
  ArrowRight,
  Cpu,
  Layers,
  Sparkles,
  Bot,
  Zap,
  Activity,
  CheckCircle,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const [selectedModel, setSelectedModel] = useState<string>("model-1");

  const activeProgramModel =
    PROGRAM_MODELS.find((m) => m.id === selectedModel) || PROGRAM_MODELS[0];

  return (
    <div className="relative pt-24 md:pt-32 space-y-24 md:space-y-36 pb-20 overflow-hidden">
      {/* ============================================================== */}
      {/* 01 — ROBOPULSE HERO BANNER (Cursor Spotlight Reveal + Telemetry)*/}
      {/* ============================================================== */}
      <RobopulseHero navigate={navigate} />

      {/* ============================================================== */}
      {/* 02 — INFINITE TECHNOLOGY TICKER (#20)                          */}
      {/* ============================================================== */}
      <section className="relative border-y border-white/8 bg-[#050509] py-4 overflow-hidden">
        <div className="animate-marquee flex items-center gap-12 font-mono text-xs sm:text-sm tracking-[0.25em] text-neutral-300">
          {[
            "ROBOTICS EDUCATION",
            "AI LEARNING",
            "STEM PROGRAMS",
            "PRACTICAL TRAINING",
            "ROBOTICS LABS",
            "SCHOOL INNOVATION",
            "ROBOTICS EDUCATION",
            "AI LEARNING",
            "STEM PROGRAMS",
            "PRACTICAL TRAINING",
            "ROBOTICS LABS",
            "SCHOOL INNOVATION",
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 shrink-0">
              <span className="hover:text-[#00C9FF] transition-colors">{item}</span>
              <span className="text-[#00C9FF]/60">◆</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 03 — TRUST STRIP (#21)                                         */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {[
            { label: "Robotics Education", code: "01 // MECHATRONICS" },
            { label: "AI Learning", code: "02 // NEURAL LOGIC" },
            { label: "STEM Programs", code: "03 // EXPERIENTIAL" },
            { label: "Practical Training", code: "04 // HANDS-ON" },
            { label: "Robotics Labs", code: "05 // TURNKEY BAYS" },
            { label: "School Innovation", code: "06 // FUTURE READINESS" },
          ].map((item, idx) => (
            <div key={idx} className="space-y-1">
              <span className="font-mono text-[10px] text-[#00C9FF] tracking-widest block">
                {item.code}
              </span>
              <span className="text-xs sm:text-sm font-medium text-white">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 04 — EDITORIAL INTRODUCTION (#22)                              */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00C9FF]">
              01. PHILOSOPHY &amp; APPROACH
            </span>
            <h2 className="font-display text-4xl sm:text-6xl text-white tracking-tight leading-[0.95]">
              From Curiosity <br />
              <span className="italic text-neutral-400">to Creation.</span>
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed font-sans">
              Robopulse Intelligence transforms technology education into hands-on experiences where students learn to build, experiment, solve problems and create.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed font-sans">
              Rather than viewing robotics as a novelty or an isolated extracurricular, we embed it as a fundamental discipline for systems thinking, spatial mechanics, and cognitive resilience.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate("/about")}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-[#00C9FF] hover:text-white transition-colors"
              >
                <span>EXPLORE OUR PEDAGOGY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <RoboticsControlInterface />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 05 — SOLUTIONS TRACKS (#24, #25, #26)                          */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/8 pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00C9FF]">
              PROGRAM ARCHITECTURE
            </span>
            <h2 className="font-display text-4xl sm:text-6xl text-white tracking-tight mt-2">
              Technology Programs Built for Schools.
            </h2>
          </div>
          <button
            onClick={() => navigate("/solutions")}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-300 hover:text-[#00C9FF] transition-colors"
          >
            <span>VIEW ALL SOLUTIONS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Core Visual Solution Cards (#24, #25) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SOLUTIONS_LIST.map((sol) => (
            <div
              key={sol.id}
              onClick={() => navigate("/solutions")}
              className="glass-card rounded-[24px] overflow-hidden group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image container */}
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={sol.image}
                    alt={sol.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 right-4 font-mono text-xs text-[#00C9FF] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    {sol.num}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#A9D4FF] uppercase">
                    {sol.category}
                  </span>
                  <h3 className="font-display text-2xl text-white group-hover:text-[#00C9FF] transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {sol.description}
                  </p>
                </div>
              </div>

              {/* Bottom Cyan interaction line */}
              <div className="px-6 pb-6 pt-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#00C9FF] pt-3 border-t border-white/5">
                  <span>DISCOVER TRACK</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 06 — SCHOOL VALUE RADIAL SECTION (#27)                         */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00C9FF]">
            INSTITUTIONAL IMPACT
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-tight">
            Why Schools Choose Robotics-Driven Learning
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Click any pillar to inspect the institutional, pedagogical, and student outcomes.
          </p>
        </div>

        <SchoolValueRadial />
      </section>

      {/* ============================================================== */}
      {/* 07 — PROJECT-BASED LEARNING SHOWCASE (#29, #30)                */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/8 pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00C9FF]">
              EXPERIENTIAL CURRICULUM
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-tight mt-1">
              Learning Happens When Students Build.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              Move beyond theory. Build. Test. Break. Improve. Learn.
            </p>
          </div>
          <button
            onClick={() => navigate("/robotics")}
            className="text-xs font-mono text-[#00C9FF] hover:underline whitespace-nowrap"
          >
            ALL PROJECTS &gt;
          </button>
        </div>

        {/* Horizontal Project Cards (#30) */}
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x">
          {HANDS_ON_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="min-w-[300px] sm:min-w-[360px] max-w-[380px] snap-start rounded-2xl bg-[#080810] border border-white/10 p-5 space-y-4 hover:border-[#00C9FF]/40 transition-all flex flex-col justify-between shrink-0"
            >
              <div className="space-y-3">
                <div className="h-44 rounded-xl overflow-hidden relative">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#00C9FF]">
                    {proj.num}
                  </span>
                </div>

                <span className="text-[10px] font-mono tracking-widest text-[#A9D4FF] uppercase">
                  {proj.category}
                </span>

                <h3 className="font-display text-xl text-white">{proj.title}</h3>

                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  {proj.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                {proj.techTags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 08 — SCHOOL PROGRAM MODELS (#31)                               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00C9FF]">
            FLEXIBLE INSTITUTIONAL ADOPTION
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-tight mt-1">
            Programs Designed Around Your School.
          </h2>
        </div>

        {/* 4 Program Model Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PROGRAM_MODELS.map((model) => {
            const isSelected = selectedModel === model.id;
            return (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#250060]/40 border-[#00C9FF] text-white shadow-[0_0_20px_rgba(0,201,255,0.15)]"
                    : "bg-white/[0.02] border-white/5 text-neutral-400 hover:border-white/20"
                }`}
              >
                <span className="text-[10px] font-mono text-[#00C9FF] block">
                  {model.num}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white block mt-1">
                  {model.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Model Details Panel */}
        <div className="p-8 rounded-2xl bg-[#090912] border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00C9FF]">
              {activeProgramModel.subtitle}
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-white">
              {activeProgramModel.name}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              {activeProgramModel.description}
            </p>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-neutral-400">
              <span className="text-white font-medium">Ideal Fit: </span>
              {activeProgramModel.idealFor}
            </div>
          </div>

          <div className="lg:col-span-5 bg-black/50 p-6 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A9D4FF] block">
              Program Deliverables
            </span>
            <ul className="space-y-2.5">
              {activeProgramModel.deliverables.map((del, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                  <CheckCircle className="w-4 h-4 text-[#00C9FF] shrink-0 mt-0.5" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-white/10">
              <ShinyButton
                size="sm"
                label="INQUIRE FOR SCHOOL"
                onClick={() => navigate("/contact")}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 09 — ROBOTICS LAB CALLOUT (#32)                                */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#050509]">
          <img
            src="/src/assets/images/ai_stem_lab_setup_1790153258870.jpg"
            alt="Futuristic school STEM and robotics lab setup"
            referrerPolicy="no-referrer"
            className="w-full h-[400px] sm:h-[480px] object-cover opacity-35"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent flex items-center p-8 sm:p-14">
            <div className="max-w-xl space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-[#00C9FF]">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>LAB STATUS // ACTIVE &amp; READY</span>
              </div>

              <h2 className="font-display text-4xl sm:text-6xl text-white leading-tight">
                Turn a Classroom Into an Innovation Lab.
              </h2>

              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                Modular workstations, precision robotics toolsets, certified microcontrollers, and comprehensive grade-mapped safety guidelines installed directly on your campus.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <ShinyButton
                  size="md"
                  label="REQUEST LAB PROPOSAL"
                  onClick={() => navigate("/contact")}
                />
                <button
                  onClick={() => navigate("/gallery")}
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold tracking-wider text-white"
                >
                  View Installed Labs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10 — CINEMATIC STATEMENT TRANSITION (#33)                      */}
      {/* ============================================================== */}
      <section className="relative py-24 text-center border-y border-white/5 bg-[#020205]">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00C9FF]">
            ROBOPULSE MANDATE
          </span>
          <p className="font-display text-4xl sm:text-6xl md:text-7xl text-white italic tracking-tight">
            "The future is built, not predicted."
          </p>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono">
            WHERE PRACTICAL ENGINEERING MEETS TOMORROW'S INTELLECT
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 11 — LEADERSHIP SECTION (#45)                                  */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#07070F] border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Director Portrait (#45) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 max-w-sm w-full">
              <img
                src="/src/assets/images/director_leadership_portrait_1790153288824.jpg"
                alt="Director of Robopulse Intelligence"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono tracking-widest text-[#00C9FF] block">
                  LEADERSHIP
                </span>
                <span className="font-display text-xl text-white font-medium">
                  Director, Robopulse Intelligence
                </span>
              </div>
            </div>
          </div>

          {/* Right: Leadership Message (#45 verbatim) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00C9FF]">
              LEADERSHIP // VISION
            </span>

            <h2 className="font-display text-3xl sm:text-5xl text-white leading-tight">
              A Message From Our Director
            </h2>

            {/* Thin cyan vertical line as requested in prompt #45 */}
            <div className="pl-5 border-l-2 border-[#00C9FF] space-y-4">
              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-sans italic">
                "As Director of Robopulse Intelligence, I'm proud to lead a team of innovators passionate about revolutionizing industries with cutting-edge robotics solutions. We're committed to harnessing the power of AI and robotics to drive efficiency, productivity, and progress in India. Let's collaborate to shape a smarter, more sustainable future."
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => navigate("/about")}
                className="inline-flex items-center gap-2 text-xs font-mono text-[#00C9FF] hover:underline"
              >
                <span>READ ABOUT OUR MISSION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 12 — FINAL CTA & CONVERSION PANEL (#85, #86)                   */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-3xl p-10 sm:p-16 bg-gradient-to-b from-[#090915] to-[#040408] border border-white/15 overflow-hidden text-center space-y-8">
          {/* Ambient orbs */}
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#00C9FF]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[#250060]/35 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00C9FF]">
              TAKE ACTION // FUTURE READY
            </span>

            <h2 className="font-display text-4xl sm:text-6xl text-white leading-tight">
              Build the Future With Robopulse.
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
              Bring robotics, AI, and future-ready STEM learning into your educational environment. Schedule an on-campus demonstration or institutional consultation.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap justify-center gap-4">
            <ShinyButton
              size="lg"
              label="CONTACT US"
              onClick={() => navigate("/contact")}
            />
            <button
              onClick={() => openWhatsApp()}
              className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-semibold tracking-wider text-white flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#00C9FF]" />
              <span>Direct WhatsApp Chat</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
