import React, { useState } from "react";
import { ShinyButton } from "../components/ShinyButton";
import { SOLUTIONS_LIST, PROGRAM_MODELS } from "../data/solutionsData";
import { openWhatsApp } from "../config";
import { CheckCircle2, ArrowRight, Layers, Cpu, Award, Users, MessageCircle } from "lucide-react";

interface SolutionsPageProps {
  navigate: (path: string) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<string>("model-1");

  const currentModel =
    PROGRAM_MODELS.find((m) => m.id === activeTab) || PROGRAM_MODELS[0];

  return (
    <div className="relative pt-24 md:pt-32 pb-24 space-y-24 md:space-y-32 overflow-hidden">
      {/* ============================================================== */}
      {/* 01 — HERO HEADER                                               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#00C9FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] animate-pulse" />
            <span>SOLUTIONS // SCHOOL OFFERINGS</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.95]">
            Technology Programs Built for{" "}
            <span className="italic text-shimmer">Schools.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-sans">
            Modular, scalable, and turnkey educational architectures designed specifically to integrate seamlessly into modern school curricula, timetables, and campus facilities.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 02 — THE 6 CORE SOLUTIONS (#24, #25)                           */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="border-b border-white/8 pb-4">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00C9FF]">
            PROGRAM CATALOGUE
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-white mt-1">
            Six Specialized Institutional Tracks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SOLUTIONS_LIST.map((sol) => (
            <div
              key={sol.id}
              className="glass-card rounded-[24px] overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="h-56 relative overflow-hidden">
                  <img
                    src={sol.image}
                    alt={sol.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12] via-transparent to-transparent opacity-85" />
                  <span className="absolute top-4 right-4 font-mono text-xs text-[#00C9FF] bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    {sol.num}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#A9D4FF] uppercase">
                    {sol.category}
                  </span>
                  <h3 className="font-display text-2xl text-white">
                    {sol.title}
                  </h3>
                  <p className="text-xs text-neutral-400 italic font-display text-sm">
                    "{sol.tagline}"
                  </p>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {sol.description}
                  </p>

                  <div className="pt-3 border-t border-white/5 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block tracking-wider">
                      Key Competencies Built:
                    </span>
                    {sol.outcomes.map((out, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00C9FF] shrink-0 mt-0.5" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <ShinyButton
                  size="sm"
                  label="CONTACT US"
                  onClick={() => navigate("/contact")}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 03 — SCHOOL PROGRAM MODELS (#31)                               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00C9FF]">
            DEPLOYMENT BLUEPRINTS
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white mt-1">
            Programs Designed Around Your School.
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-xl">
            Choose how Robopulse fits into your existing academic timetable and physical campus infrastructure.
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PROGRAM_MODELS.map((model) => {
            const isSelected = activeTab === model.id;
            return (
              <button
                key={model.id}
                onClick={() => setActiveTab(model.id)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#250060]/40 border-[#00C9FF] text-white shadow-[0_0_20px_rgba(0,201,255,0.15)]"
                    : "bg-white/[0.02] border-white/5 text-neutral-400 hover:border-white/15"
                }`}
              >
                <span className="text-[10px] font-mono text-[#00C9FF] block">
                  {model.num}
                </span>
                <span className="text-sm font-semibold text-white block mt-1">
                  {model.name}
                </span>
                <span className="text-[11px] text-neutral-400 block mt-0.5 font-sans">
                  {model.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Model Details */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#080812] border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9FF]/10 text-[#00C9FF] text-xs font-mono">
              <span>{currentModel.num}</span>
              <span>·</span>
              <span>{currentModel.subtitle}</span>
            </div>

            <h3 className="font-display text-3xl sm:text-5xl text-white">
              {currentModel.name}
            </h3>

            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              {currentModel.description}
            </p>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-xs font-mono uppercase text-[#A9D4FF] block">
                Recommended For:
              </span>
              <p className="text-xs text-neutral-300 font-sans">
                {currentModel.idealFor}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-black/60 border border-white/5 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00C9FF] block">
              Core Deliverables Included
            </span>

            <ul className="space-y-3">
              {currentModel.deliverables.map((del, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-[#00C9FF] shrink-0 mt-0.5" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <ShinyButton
                size="md"
                label="CONTACT US"
                onClick={() => navigate("/contact")}
                className="w-full"
              />
              <button
                onClick={() => openWhatsApp(`Hello Robopulse, I would like to inquire about the ${currentModel.name} for our school.`)}
                className="w-full py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-neutral-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#00C9FF]" />
                <span>Discuss on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 04 — READY TO INQUIRE CALLOUT                                  */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-[#070712] via-[#090918] to-[#040409] border border-white/15 text-center space-y-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00C9FF]">
            TAILORED INSTITUTIONAL SOLUTIONS
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white">
            Need a Custom Architecture for Your Campus?
          </h2>
          <p className="text-sm text-neutral-300 max-w-xl mx-auto font-sans leading-relaxed">
            Our engineering education consultants can assess your classroom spaces, batch sizes, and syllabus requirements to formulate a comprehensive proposal.
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
