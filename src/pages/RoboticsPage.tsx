import React from "react";
import { ShinyButton } from "../components/ShinyButton";
import { MotionHeadingGroup } from "../components/MotionHeading";
import { InteractiveSystemDiagram } from "../components/InteractiveSystemDiagram";
import { HANDS_ON_PROJECTS } from "../data/solutionsData";
import {
  Cpu,
  Eye,
  Zap,
  Activity,
  ArrowRight,
  Sliders,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

interface RoboticsPageProps {
  navigate: (path: string) => void;
}

export const RoboticsPage: React.FC<RoboticsPageProps> = ({ navigate }) => {
  return (
    <div className="relative pt-24 md:pt-32 pb-24 space-y-24 md:space-y-32 overflow-hidden">
      {/* ============================================================== */}
      {/* 01 — HERO HEADER                                               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <MotionHeadingGroup className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 typo-eyebrow text-[#00C9FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] animate-pulse" />
            <span>DISCIPLINE // ROBOTICS &amp; MECHATRONICS</span>
          </div>

          <h1 className="typo-h1 text-white">
            What is Robotics? <br />
            <span className="italic text-shimmer">Why Robotics Education?</span>
          </h1>

          <p className="typo-lead text-neutral-300">
            Robotics is not merely programming code on a monitor or assembling plastic blocks. It is the multidisciplinary intersection of mechanical engineering, electronic circuitry, sensory perception, and autonomous control algorithms.
          </p>
        </MotionHeadingGroup>
      </section>

      {/* ============================================================== */}
      {/* 02 — THE FOUR FOUNDATIONAL PILLARS                             */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        <MotionHeadingGroup className="border-b border-white/8 pb-4">
          <span className="typo-eyebrow text-[#00C9FF] uppercase">
            ENGINEERING SUB-SYSTEMS
          </span>
          <h2 className="typo-h2 text-white mt-1">
            The Anatomy of an Intelligent Machine
          </h2>
        </MotionHeadingGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Eye,
              title: "Sensors & Perception",
              sub: "ENVIRONMENTAL INPUT",
              desc: "Ultrasonic rangefinders, infrared reflectance sensors, capacitive touch, gyroscopes, and optical vision cameras providing real-time data.",
            },
            {
              icon: Cpu,
              title: "Microcontrollers",
              sub: "COMPUTATIONAL BRAIN",
              desc: "High-speed 32-bit embedded processors reading continuous sensor streams and calculating real-time trajectory adjustments.",
            },
            {
              icon: Zap,
              title: "Electronics & Circuits",
              sub: "POWER & SIGNAL BUS",
              desc: "Breadboards, logic level shifters, H-bridge motor drivers, voltage regulators, and current distribution safety mechanisms.",
            },
            {
              icon: Sliders,
              title: "Motion & Actuators",
              sub: "KINETIC OUTPUT",
              desc: "DC geared motors, precision angular servo motors, and mechanical linkages converting electrical potential into purposeful physical force.",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#07070F] border border-white/10 space-y-3 hover:border-[#00C9FF]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00C9FF]/10 text-[#00C9FF] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="typo-eyebrow text-[#A9D4FF] block uppercase">
                  {item.sub}
                </span>
                <h3 className="typo-h3 text-white">{item.title}</h3>
                <p className="typo-body text-neutral-300">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 03 — INTERACTIVE TECHNICAL ROBOTICS DIAGRAM (#61)              */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-6">
        <div>
          <span className="typo-eyebrow text-[#00C9FF] uppercase">
            INTERACTIVE SCHEMATIC
          </span>
          <h2 className="typo-h2 text-white mt-1">
            Interactive Robotics System Architecture
          </h2>
          <p className="typo-lead text-neutral-400 mt-2">
            Click any subsystem node below to inspect hardware components, algorithmic roles, and student takeaways.
          </p>
        </div>

        <InteractiveSystemDiagram />
      </section>

      {/* ============================================================== */}
      {/* 04 — HANDS-ON STUDENT PROJECTS SHOWCASE                        */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-10">
        <MotionHeadingGroup className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/8 pb-4">
          <div>
            <span className="typo-eyebrow text-[#00C9FF] uppercase">
              REAL ENGINEERING BUILDS
            </span>
            <h2 className="typo-h2 text-white mt-1">
              Sample Student Engineering Projects
            </h2>
          </div>
          <span className="typo-eyebrow text-[#00C9FF]">
            ACTIVE CURRICULUM BUILDS
          </span>
        </MotionHeadingGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {HANDS_ON_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="rounded-3xl bg-[#080812] border border-white/10 overflow-hidden flex flex-col md:flex-row group hover:border-[#00C9FF]/40 transition-all"
            >
              <div className="md:w-1/2 h-56 md:h-auto relative overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:hidden" />
              </div>

              <div className="p-6 md:w-1/2 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono tracking-widest text-[#00C9FF]">
                      {proj.num}
                    </span>
                    <span className="text-xs font-mono uppercase text-[#A9D4FF]">
                      {proj.category}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-white">
                    {proj.title}
                  </h3>

                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                    {proj.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techTags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded bg-white/5 text-xs font-mono text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate("/contact")}
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#00C9FF] hover:underline"
                  >
                    <span>REQUEST SYLLABUS SPEC</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 05 — CTA SECTION                                               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-[#070712] via-[#0A0A1A] to-[#040409] border border-white/15 text-center space-y-6">
          <span className="typo-eyebrow uppercase text-[#00C9FF]">
            NEXT STEP // BRING ROBOTICS TO CAMPUS
          </span>
          <h2 className="typo-h2 text-white">
            Equip Your Students with Real Robotics Capability.
          </h2>
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
