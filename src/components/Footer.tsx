import React from "react";
import { RobopulseLogo } from "./RobopulseLogo";
import { CONFIG, openWhatsApp } from "../config";
import { Mail, Phone, MapPin, ArrowUpRight, MessageCircle, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050509] border-t border-white/5 pt-16 pb-24 md:pb-12 text-neutral-400 overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#250060]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#00C9FF]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12 border-b border-white/5">
          {/* Column 1: Brand & Statement */}
          <div className="space-y-4">
            <RobopulseLogo size="md" onClick={() => handleNav("/")} />
            <p className="font-display text-lg text-white/90 italic tracking-tight">
              "Building the intelligence behind tomorrow."
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Empowering schools and students through practical robotics laboratories, artificial intelligence literacy, and hands-on STEM engineering.
            </p>
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => openWhatsApp()}
                className="inline-flex items-center gap-2 text-xs font-medium text-[#00C9FF] hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Quick WhatsApp Assistance</span>
              </button>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href={CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#00C9FF] hover:border-[#00C9FF]/50 transition-colors"
                  title="Follow us on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#00C9FF] hover:border-[#00C9FF]/50 transition-colors"
                  title="Follow us on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={CONFIG.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#00C9FF] hover:border-[#00C9FF]/50 transition-colors"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={CONFIG.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#00C9FF] hover:border-[#00C9FF]/50 transition-colors"
                  title="Subscribe on YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white/80">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav("/about")}
                  className="hover:text-white transition-colors"
                >
                  About Robopulse
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("/about")}
                  className="hover:text-white transition-colors"
                >
                  Leadership & Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("/reviews")}
                  className="hover:text-white transition-colors"
                >
                  Parent & School Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("/contact")}
                  className="hover:text-white transition-colors"
                >
                  Contact Institutional Team
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white/80">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav("/robotics")}
                  className="hover:text-white transition-colors"
                >
                  Robotics Education
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("/solutions")}
                  className="hover:text-white transition-colors"
                >
                  AI & Emerging Tech
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("/solutions")}
                  className="hover:text-white transition-colors"
                >
                  STEM Lab Setup
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("/solutions")}
                  className="hover:text-white transition-colors"
                >
                  Teacher Orientation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("/gallery")}
                  className="hover:text-white transition-colors"
                >
                  Robotics Exhibitions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Explore & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white/80">
              Explore & Connect
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-[#00C9FF] shrink-0 mt-0.5" />
                <span>{CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Mail className="w-3.5 h-3.5 text-[#00C9FF] shrink-0" />
                <a href={`mailto:${CONFIG.email}`} className="hover:text-white transition-colors">
                  {CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Phone className="w-3.5 h-3.5 text-[#00C9FF] shrink-0" />
                <a href={`tel:${CONFIG.phone}`} className="hover:text-white transition-colors">
                  {CONFIG.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => handleNav("/contact")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white hover:border-[#00C9FF]/50 transition-colors"
              >
                <span>Request Campus Demo</span>
                <ArrowUpRight className="w-3 h-3 text-[#00C9FF]" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} {CONFIG.businessName}. All rights reserved.
          </div>

          {/* Prompt #64 & #06 Compliant Status Indicator: Cyan/white, NEVER green */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C9FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C9FF]" />
            </span>
            <span className="tracking-wider uppercase text-neutral-300">
              ROBOPULSE SYSTEMS · ONLINE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
