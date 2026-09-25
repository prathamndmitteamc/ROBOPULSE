import React from "react";
import { ShinyButton } from "../components/ShinyButton";
import { openWhatsApp } from "../config";
import {
  Compass,
  Target,
  Sparkles,
  TrendingUp,
  Cpu,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  return (
    <div className="relative pt-24 md:pt-32 pb-24 space-y-24 md:space-y-32 overflow-hidden">
      {/* ============================================================== */}
      {/* 01 — HERO HEADER                                               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#00C9FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] animate-pulse" />
            <span>ABOUT // ROBOPULSE INTELLIGENCE</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.95]">
            Engineering the Next Generation of{" "}
            <span className="italic text-shimmer">Makers.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-sans">
            Robopulse Intelligence operates at the vital convergence of advanced robotics, artificial intelligence literacy, and institutional STEM education. We exist to ensure that young minds do not simply observe the technological revolution—they architect it.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 02 — MISSION & VISION                                          */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#07070F] border border-white/10 space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-[#00C9FF]/10 text-[#00C9FF] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#00C9FF] block">
              OUR MISSION
            </span>
            <h3 className="font-display text-3xl text-white">
              Democratizing Practical Engineering
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              To empower schools and learning institutions across India with state-of-the-art robotics laboratories, experiential curricula, and comprehensive educator enablement—transforming classroom curiosity into demonstrable technical capability.
            </p>
          </div>

          {/* Vision Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#07070F] border border-white/10 space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-[#250060]/40 text-[#A9D4FF] flex items-center justify-center border border-[#006CFF]/30">
              <Compass className="w-6 h-6" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#A9D4FF] block">
              OUR VISION
            </span>
            <h3 className="font-display text-3xl text-white">
              A Nation of Confident Creators
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              To see every student graduate with an intuitive understanding of autonomous systems, algorithmic reasoning, and physical engineering—ready to lead India’s future in automation, AI, and sustainable industrial innovation.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 03 — INNOVATION & BUSINESS PHILOSOPHY (Prompt #47 & #48)       */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#090915] to-[#040409] border border-white/10 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00C9FF]">
              CORE FOUNDATIONAL TENETS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-white">
              Guided by Purpose, Built for Permanence.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Innovation Philosophy (#47) */}
            <div className="space-y-4 border-l-2 border-[#00C9FF] pl-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00C9FF]">
                <Sparkles className="w-4 h-4" />
                <span>INNOVATION PHILOSOPHY</span>
              </div>
              <h3 className="font-display text-2xl text-white">
                Shaping the Frontier of Intelligent Machines
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                At Robopulse Intelligence, we are propelled by relentless innovation and deep technical passion. We believe breakthrough advancements in robotics begin when young learners are trusted with real tools, authentic physics constraints, and open-ended design challenges. We are actively shaping the future of robotics, one intelligent machine at a time.
              </p>
            </div>

            {/* Business Philosophy (#48) */}
            <div className="space-y-4 border-l-2 border-[#006CFF] pl-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#A9D4FF]">
                <TrendingUp className="w-4 h-4" />
                <span>BUSINESS PHILOSOPHY</span>
              </div>
              <h3 className="font-display text-2xl text-white">
                Sustainable Growth &amp; Institutional Stewardship
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                At Robopulse Intelligence, we rigorously balance bold technological innovation with financial prudence. By prioritizing durable laboratory hardware, modular upgrade pathways, and transparent institutional partnerships, we ensure sustainable campus deployments that maximize enduring value for schools, educators, and community stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 04 — LEADERSHIP SECTION (#45)                                  */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-white/15 relative">
              <img
                src="/src/assets/images/director_leadership_portrait_1790153288824.jpg"
                alt="Director, Robopulse Intelligence"
                referrerPolicy="no-referrer"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-mono text-[10px] tracking-widest text-[#00C9FF] block">
                  EXECUTIVE LEADERSHIP
                </span>
                <span className="font-display text-xl text-white">
                  Director, Robopulse Intelligence
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00C9FF]">
              LEADERSHIP MESSAGE
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-white leading-tight">
              A Message From Our Director
            </h2>

            <div className="pl-6 border-l-2 border-[#00C9FF] space-y-4">
              <p className="text-base text-neutral-200 leading-relaxed font-sans italic">
                "As Director of Robopulse Intelligence, I'm proud to lead a team of innovators passionate about revolutionizing industries with cutting-edge robotics solutions. We're committed to harnessing the power of AI and robotics to drive efficiency, productivity, and progress in India. Let's collaborate to shape a smarter, more sustainable future."
              </p>
            </div>

            <p className="text-xs text-neutral-400 font-mono">
              DIRECTOR // ROBOPULSE INTELLIGENCE
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 05 — THE FUTURE OF LEARNING                                    */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00C9FF]">
            EDUCATIONAL TRAJECTORY
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-white">
            The Future of Learning in Practice
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Cpu,
              title: "Autonomous Intelligence",
              desc: "Moving beyond pre-programmed paths to adaptive algorithms, ultrasonic telemetry, and closed feedback loops.",
            },
            {
              icon: BookOpen,
              title: "Experiential Pedagogy",
              desc: "Re-imagining conventional textbooks into tactile discovery where physical failure informs theoretical insight.",
            },
            {
              icon: Sparkles,
              title: "Institutional Distinction",
              desc: "Positioning schools at the vanguard of modern STEM, cultivating campus prestige through student engineering accolades.",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/8 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00C9FF]/10 text-[#00C9FF] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl text-white">{item.title}</h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-8">
          <ShinyButton
            label="CONTACT US FOR COLLABORATION"
            onClick={() => navigate("/contact")}
            size="md"
          />
        </div>
      </section>
    </div>
  );
};
