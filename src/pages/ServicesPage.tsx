/**
 * Robopulse Intelligence — Comprehensive Services Page
 * Full institutional breakdown of Robotics, AI, STEM Lab Setup, Faculty Training, and Campus Ecosystems.
 */

import React, { useState } from "react";
import { ShinyButton } from "../components/ShinyButton";
import { MotionHeadingGroup } from "../components/MotionHeading";
import { openWhatsApp } from "../config";
import { SERVICES_LIST, FEATURED_SERVICE } from "../data/servicesData";
import { PROGRAM_MODELS } from "../data/solutionsData";
import {
  Bot,
  BrainCircuit,
  Cpu,
  Sparkles,
  GraduationCap,
  Layers,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Award,
  Users,
  Compass,
  Zap,
  MessageCircle,
} from "lucide-react";

interface ServicesPageProps {
  navigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ navigate }) => {
  const [selectedModel, setSelectedModel] = useState<string>("model-1");

  const activeModel =
    PROGRAM_MODELS.find((m) => m.id === selectedModel) || PROGRAM_MODELS[0];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Bot":
        return <Bot className="w-5 h-5 text-[#00C9FF]" />;
      case "BrainCircuit":
        return <BrainCircuit className="w-5 h-5 text-[#006CFF]" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-[#00C9FF]" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-[#A9D4FF]" />;
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5 text-[#00C9FF]" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-[#006CFF]" />;
      default:
        return <Bot className="w-5 h-5 text-[#00C9FF]" />;
    }
  };

  return (
    <div className="relative pt-24 md:pt-32 pb-24 space-y-24 md:space-y-32 overflow-hidden">
      {/* ============================================================== */}
      {/* 01 — HERO HEADER                                               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <MotionHeadingGroup className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 typo-eyebrow text-[#00C9FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] animate-pulse" />
            <span>SERVICES // INSTITUTIONAL CAPABILITIES</span>
          </div>

          <h1 className="typo-h1 text-white">
            Transforming Campuses into{" "}
            <span className="italic text-shimmer">Innovation Hubs.</span>
          </h1>

          <p className="typo-lead text-neutral-300">
            Comprehensive institutional services spanning turnkey robotics laboratory setups, grade-aligned curriculum integration, hands-on STEM bootcamps, and continuous teacher enablement.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <ShinyButton
              label="Request Institutional Proposal"
              size="md"
              onClick={() => navigate("/contact")}
            />
            <button
              onClick={() =>
                openWhatsApp(
                  "Hello Robopulse, I would like to explore institutional robotics & STEM services for our school."
                )
              }
              className="px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 typo-btn text-neutral-200 hover:text-white transition-all duration-200 flex items-center gap-2 hover:border-[#00C9FF]/60 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_8px_25px_rgba(0,201,255,0.25)] active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#00C9FF]" />
              <span>WhatsApp Consultation</span>
            </button>
          </div>
        </MotionHeadingGroup>
      </section>

      {/* ============================================================== */}
      {/* 02 — FLAGSHIP TURNKEY LAB SETUP SPOTLIGHT                      */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-[28px] overflow-hidden border border-white/10 bg-[#05050A] p-8 sm:p-12 lg:p-14">
          {/* Subtle cybernetic accent gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C9FF]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#250060]/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9FF]/10 border border-[#00C9FF]/30 typo-eyebrow text-[#00C9FF]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{FEATURED_SERVICE.tag}</span>
              </div>

              <div className="space-y-2">
                <span className="typo-eyebrow text-[#A9D4FF] uppercase block">
                  {FEATURED_SERVICE.subtitle}
                </span>
                <h2 className="typo-h2 text-white">
                  {FEATURED_SERVICE.title}
                </h2>
              </div>

              <p className="typo-lead text-neutral-300">
                {FEATURED_SERVICE.description}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {FEATURED_SERVICE.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/8 text-center"
                  >
                    <span className="block typo-h3 text-white">
                      {m.value}
                    </span>
                    <span className="typo-eyebrow text-[#A9D4FF] uppercase">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <ShinyButton
                  label="Schedule Campus Walkthrough"
                  size="sm"
                  onClick={() => navigate("/contact")}
                />
              </div>
            </div>

            {/* Right Media */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <img
                  src={FEATURED_SERVICE.image}
                  alt={FEATURED_SERVICE.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/15">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="typo-eyebrow text-[#00C9FF] uppercase block">
                        CAMPUS INFRASTRUCTURE
                      </span>
                      <p className="typo-small font-semibold text-white mt-0.5">
                        Modular Workbenches, Component Bays & Safety Tested
                      </p>
                    </div>
                    <span className="typo-eyebrow text-neutral-300 bg-white/10 px-2.5 py-1 rounded">
                      ISO 9001
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 03 — SIX CORE INSTITUTIONAL SERVICE TRACKS                    */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <MotionHeadingGroup className="border-b border-white/8 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="typo-eyebrow text-[#00C9FF] uppercase">
              CORE CATALOGUE
            </span>
            <h2 className="typo-h2 text-white mt-1">
              Six Tailored Service Domains
            </h2>
          </div>
          <p className="typo-small text-neutral-400 max-w-sm sm:text-right">
            Integrated engineering programs configured for schools, colleges, and training institutes.
          </p>
        </MotionHeadingGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              onClick={() => navigate("/contact")}
              className="glass-card box-hover-pop rounded-[24px] p-7 sm:p-8 flex flex-col justify-between group hover:border-[#00C9FF]/50 transition-all duration-300 cursor-pointer"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-[#00C9FF]/50 group-hover:bg-[#00C9FF]/10 group-hover:scale-110 group-hover:rotate-[-3deg] transition-all duration-300">
                    {getServiceIcon(service.iconName)}
                  </div>
                  {service.badge && (
                    <span className="typo-eyebrow text-[#00C9FF] bg-[#00C9FF]/10 px-2.5 py-1 rounded-full border border-[#00C9FF]/25 uppercase group-hover:border-[#00C9FF]/50 transition-colors">
                      {service.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <span className="typo-eyebrow text-[#A9D4FF] uppercase block">
                    {service.category}
                  </span>
                  <h3 className="typo-h3 text-white group-hover:text-[#00C9FF] transition-colors">
                    {service.title}
                  </h3>
                </div>

                <p className="typo-body text-neutral-300">
                  {service.description}
                </p>

                <div className="pt-4 border-t border-white/5 space-y-2">
                  <span className="typo-eyebrow text-neutral-400 uppercase block">
                    Key Deliverables:
                  </span>
                  {service.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 typo-small text-neutral-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00C9FF] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/contact");
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-[#00C9FF]/15 border border-white/10 hover:border-[#00C9FF]/40 typo-btn text-xs text-neutral-200 hover:text-white flex items-center gap-1.5 transition-all duration-200 group-hover:text-[#00C9FF] group-hover:translate-x-1 cursor-pointer"
                >
                  <span>Inquire For Campus</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="typo-eyebrow text-neutral-400">
                  INSTITUTIONAL
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 04 — FOUR-STAGE IMPLEMENTATION METHODOLOGY                    */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <MotionHeadingGroup className="border-b border-white/8 pb-4">
          <span className="typo-eyebrow text-[#00C9FF] uppercase">
            PROVEN METHODOLOGY
          </span>
          <h2 className="typo-h2 text-white mt-1">
            How Robopulse Deploys on Campus
          </h2>
        </MotionHeadingGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Campus Spatial Audit",
              description:
                "Detailed physical room inspection, electrical load safety analysis, and custom 3D architectural floorplans tailored to your campus.",
              tag: "PLANNING",
            },
            {
              step: "02",
              title: "Hardware Bay Setup",
              description:
                "Assembly of modular engineering workbenches, component storage towers, soldering safety enclosures, and testing robotics arenas.",
              tag: "INFRASTRUCTURE",
            },
            {
              step: "03",
              title: "Educator Enablement",
              description:
                "Hands-on faculty orientation, curriculum manuals, grading rubrics, and troubleshooting playbooks so teachers lead with confidence.",
              tag: "CURRICULUM",
            },
            {
              step: "04",
              title: "Continuous Mentorship",
              description:
                "Year-round technical assistance, kit spare parts replacements, Olympiad coaching, and student project exhibition juries.",
              tag: "SUSTAINABILITY",
            },
          ].map((phase, idx) => (
            <div
              key={idx}
              className="box-hover-pop p-6 rounded-2xl bg-white/[0.02] border border-white/8 space-y-4 hover:border-[#00C9FF]/40 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-light text-[#00C9FF]/40 group-hover:text-[#00C9FF] transition-colors">
                  {phase.step}
                </span>
                <span className="typo-eyebrow text-[#A9D4FF] bg-white/5 px-2 py-0.5 rounded border border-white/10 group-hover:border-[#00C9FF]/30 transition-colors">
                  {phase.tag}
                </span>
              </div>
              <h3 className="typo-h4 text-white group-hover:text-[#00C9FF] transition-colors">
                {phase.title}
              </h3>
              <p className="typo-body text-neutral-300">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 05 — PARTNERSHIP ENGAGEMENT MODELS                            */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-10">
        <MotionHeadingGroup className="border-b border-white/8 pb-4">
          <span className="typo-eyebrow text-[#00C9FF] uppercase">
            ENGAGEMENT MODELS
          </span>
          <h2 className="typo-h2 text-white mt-1">
            Choose Your Institutional Framework
          </h2>
        </MotionHeadingGroup>

        {/* Model Tabs */}
        <div className="flex flex-wrap gap-3">
          {PROGRAM_MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`px-5 py-3 rounded-full typo-btn text-xs transition-all duration-200 hover:-translate-y-1 hover:scale-[1.04] active:scale-95 cursor-pointer ${
                selectedModel === model.id
                  ? "bg-[#00C9FF] text-black font-bold shadow-[0_0_20px_rgba(0,201,255,0.4)]"
                  : "bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-[#00C9FF]/50"
              }`}
            >
              {model.name}
            </button>
          ))}
        </div>

        {/* Active Model Spotlight */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6">
            <div>
              <span className="typo-eyebrow text-[#00C9FF] uppercase">
                {activeModel.subtitle}
              </span>
              <h3 className="typo-h2 text-white mt-1">
                {activeModel.name}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="typo-eyebrow text-neutral-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                {activeModel.num}
              </span>
              <span className="typo-eyebrow text-[#00C9FF] bg-[#00C9FF]/10 px-3 py-1.5 rounded-lg border border-[#00C9FF]/30">
                Turnkey Deployment
              </span>
            </div>
          </div>

          <p className="typo-lead text-neutral-200 max-w-4xl">
            {activeModel.description}
          </p>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/8 typo-small text-neutral-300">
            <span className="text-[#00C9FF] uppercase typo-eyebrow block mb-1">
              Ideal Institutional Profile:
            </span>
            {activeModel.idealFor}
          </div>

          <div className="pt-2 space-y-3">
            <h4 className="typo-eyebrow text-[#A9D4FF] uppercase">
              Key Institutional Deliverables & Commitments:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeModel.deliverables.map((deliv, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 typo-small text-neutral-300 p-2.5 rounded-lg bg-white/[0.02] border border-white/5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00C9FF] shrink-0 mt-0.5" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/8 flex flex-wrap items-center justify-between gap-4">
            <p className="typo-small text-neutral-400">
              Tailored proposals provided within 48 hours following an initial discovery call.
            </p>
            <ShinyButton
              label="Request Framework Details"
              size="sm"
              onClick={() => navigate("/contact")}
            />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 06 — INSTITUTIONAL CTA BANNER                                 */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-[28px] p-10 sm:p-14 bg-gradient-to-br from-[#0A0A14] via-[#05050A] to-[#18003F]/40 border border-white/10 text-center space-y-6 overflow-hidden">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#00C9FF]/10 rounded-full blur-[100px] pointer-events-none" />

          <MotionHeadingGroup className="relative z-10 max-w-2xl mx-auto space-y-3">
            <span className="typo-eyebrow text-[#00C9FF] uppercase">
              PARTNER WITH ROBOPULSE
            </span>
            <h2 className="typo-h2 text-white">
              Ready to Upgrade Your Institution's Tech Profile?
            </h2>
            <p className="typo-lead text-neutral-300">
              Book an exploratory session with our educational engineers. We will review your campus layout, grade levels, and educational goals to configure the perfect implementation.
            </p>
          </MotionHeadingGroup>

          <div className="relative z-10 flex flex-wrap justify-center gap-4 pt-2">
            <ShinyButton
              label="Schedule Consultation"
              size="md"
              onClick={() => navigate("/contact")}
            />
            <button
              onClick={() =>
                openWhatsApp(
                  "Hello, I would like to schedule an institutional robotics demo for our school."
                )
              }
              className="px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 typo-btn text-neutral-200 hover:text-white transition-all duration-200 flex items-center gap-2 hover:border-[#00C9FF]/60 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_8px_25px_rgba(0,201,255,0.25)] active:scale-95 cursor-pointer"
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
