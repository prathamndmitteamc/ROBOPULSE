import React from "react";
import { FEATURED_SERVICE, SERVICES_LIST, ServiceItem } from "../data/servicesData";
import {
  Bot,
  BrainCircuit,
  Cpu,
  Sparkles,
  GraduationCap,
  Trophy,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Calendar,
  Layers,
} from "lucide-react";
import { openWhatsApp } from "../config";

interface ServicesMegaMenuProps {
  onSelectService: (service: ServiceItem) => void;
  onNavigate: (path: string) => void;
  onClose: () => void;
}

// Icon mapper
const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case "Bot":
      return Bot;
    case "BrainCircuit":
      return BrainCircuit;
    case "Cpu":
      return Cpu;
    case "Sparkles":
      return Sparkles;
    case "GraduationCap":
      return GraduationCap;
    case "Trophy":
      return Trophy;
    default:
      return Cpu;
  }
};

export const ServicesMegaMenu: React.FC<ServicesMegaMenuProps> = ({
  onSelectService,
  onNavigate,
  onClose,
}) => {
  return (
    <div
      className="w-full max-w-[1100px] p-6 lg:p-7 rounded-3xl bg-[#06060c]/95 backdrop-blur-2xl border border-white/10 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(0,201,255,0.12)] text-white animate-in fade-in zoom-in-95 duration-200"
      role="menu"
      aria-label="Services Mega Menu"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
        {/* ============================================================== */}
        {/* LEFT COLUMN: FEATURED SERVICE PANEL                            */}
        {/* ============================================================== */}
        <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-[#0c0c1e] via-[#080814] to-[#040409] border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden group">
          {/* Subtle glow orb */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#00C9FF]/15 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#250060]/30 rounded-full blur-[50px] pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-[#00C9FF]/15 border border-[#00C9FF]/30 text-[#00C9FF] text-[10px] font-mono tracking-wider font-semibold">
                {FEATURED_SERVICE.tag}
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                01 // SPOTLIGHT
              </span>
            </div>

            {/* Featured Image with rounded glass border */}
            <div className="h-32 w-full rounded-xl overflow-hidden border border-white/10 relative">
              <img
                src={FEATURED_SERVICE.image}
                alt={FEATURED_SERVICE.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06060c] via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-2 left-2.5 text-[10px] font-mono text-[#A9D4FF] uppercase tracking-wider">
                {FEATURED_SERVICE.subtitle}
              </span>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-display text-xl text-white group-hover:text-[#00C9FF] transition-colors">
                {FEATURED_SERVICE.title}
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                {FEATURED_SERVICE.description}
              </p>
            </div>

            {/* Metrics Chips */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
              {FEATURED_SERVICE.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg bg-white/[0.03] border border-white/5 text-center"
                >
                  <span className="text-xs font-mono font-semibold text-[#00C9FF] block">
                    {m.value}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-tight block">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-5 relative z-10">
            <button
              onClick={() => {
                onNavigate(FEATURED_SERVICE.ctaPath);
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#00C9FF] hover:bg-[#A9D4FF] text-black font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,201,255,0.3)] cursor-pointer"
            >
              <span>{FEATURED_SERVICE.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT SECTION: MULTI-COLUMN SERVICES GRID                      */}
        {/* ============================================================== */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/8">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00C9FF] block">
                  INSTITUTIONAL PORTFOLIO
                </span>
                <h3 className="font-display text-xl text-white">
                  Robopulse Turnkey Services
                </h3>
              </div>
              <button
                onClick={() => {
                  onNavigate("/solutions");
                  onClose();
                }}
                className="text-xs font-mono text-[#00C9FF] hover:underline flex items-center gap-1.5"
              >
                <span>View Full Solutions Page</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* 6 Services in a 2-column or 3-column organized layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SERVICES_LIST.map((service) => {
                const IconComponent = getServiceIcon(service.iconName);
                return (
                  <div
                    key={service.id}
                    onClick={() => {
                      onSelectService(service);
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#00C9FF]/40 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-lg bg-[#00C9FF]/10 text-[#00C9FF] border border-[#00C9FF]/20 flex items-center justify-center group-hover:bg-[#00C9FF] group-hover:text-black transition-colors">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        {service.badge && (
                          <span className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/5 group-hover:border-[#00C9FF]/30 transition-colors">
                            {service.badge}
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="font-display text-base text-white group-hover:text-[#00C9FF] transition-colors flex items-center justify-between">
                          <span>{service.title}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#00C9FF]" />
                        </h4>
                        <p className="text-[11px] text-neutral-400 font-sans leading-relaxed line-clamp-2 mt-0.5">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 mt-2 border-t border-white/5 flex items-center gap-1.5 flex-wrap">
                      {service.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-mono text-neutral-400 bg-black/40 px-1.5 py-0.5 rounded border border-white/5"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Bar: Quick Reassurance & Institutional Consultation */}
          <div className="pt-3 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] animate-pulse" />
              <span>Need custom lab floorplans or curriculum mapping for your school?</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onNavigate("/contact");
                  onClose();
                }}
                className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white border border-white/10 font-medium transition-colors cursor-pointer"
              >
                Enquire for Campus
              </button>
              <button
                onClick={() => {
                  openWhatsApp("Hello Robopulse, I would like to explore your Services for our institution.");
                  onClose();
                }}
                className="px-3.5 py-1.5 rounded-lg bg-[#00C9FF]/15 hover:bg-[#00C9FF]/25 text-[#00C9FF] border border-[#00C9FF]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>WhatsApp Us</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
