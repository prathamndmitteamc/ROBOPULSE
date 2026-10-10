import React, { useState, useEffect } from "react";
import { RobopulseLogo } from "./RobopulseLogo";
import { ShinyButton } from "./ShinyButton";
import { AnimatedBackground } from "@/components/core/animated-background";
import { AnimatedTabsHover } from "./AnimatedTabsHover";
import {
  Menu,
  X,
  Home,
  Briefcase,
  GraduationCap,
  PhoneCall,
} from "lucide-react";

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getActiveTab = () => {
    if (currentPath === "/") return "Home";
    if (currentPath === "/about") return "About";
    if (currentPath === "/services" || currentPath === "/solutions") return "Services";
    if (currentPath === "/courses") return "Courses";
    return undefined;
  };

  return (
    <>
      {/* ============================================================== */}
      {/* DESKTOP FLOATING GLASS PILL NAVBAR                             */}
      {/* Order: Robopulse Logo | Home | About | Services | Courses | Contact Us */}
      {/* ============================================================== */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-[1120px] hidden md:block">
        <header>
          <nav
            className={`flex items-center justify-between px-6 sm:px-8 py-3 rounded-full transition-all duration-300 relative z-50 ${
              scrolled
                ? "bg-[#07070b]/94 backdrop-blur-xl border border-white/12 shadow-[0_12px_36px_-10px_rgba(0,0,0,0.85),0_0_24px_rgba(0,201,255,0.1)]"
                : "bg-[#090910]/85 backdrop-blur-lg border border-white/10 shadow-xl"
            }`}
            aria-label="Main Navigation"
          >
            {/* 1. Robopulse Logo */}
            <div className="flex items-center">
              <RobopulseLogo size="md" onClick={() => handleLinkClick("/")} />
            </div>

            {/* 2. Main Navigation Links with AnimatedBackground Hover Pill */}
            <div className="flex items-center gap-[28px] lg:gap-[32px]">
              <AnimatedBackground
                defaultValue={getActiveTab()}
                className="rounded-full bg-white/[0.05]"
                transition={{
                  type: "spring",
                  bounce: 0.15,
                  duration: 0.25,
                }}
                enableHover
              >
                {/* Home */}
                <button
                  data-id="Home"
                  type="button"
                  onClick={() => handleLinkClick("/")}
                  className={`relative px-3 py-1.5 font-sans text-[14px] sm:text-[14.5px] leading-[1.2] tracking-[0] cursor-pointer transition-colors duration-250 ease-out focus:outline-none whitespace-nowrap ${
                    currentPath === "/"
                      ? "text-white font-semibold drop-shadow-[0_0_8px_rgba(0,201,255,0.45)]"
                      : "text-neutral-200 font-medium hover:text-[#00C9FF]"
                  }`}
                >
                  <span>Home</span>
                  {currentPath === "/" && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-[#00C9FF] shadow-[0_0_8px_#00C9FF]" />
                  )}
                </button>

                {/* About */}
                <button
                  data-id="About"
                  type="button"
                  onClick={() => handleLinkClick("/about")}
                  className={`relative px-3 py-1.5 font-sans text-[14px] sm:text-[14.5px] leading-[1.2] tracking-[0] cursor-pointer transition-colors duration-250 ease-out focus:outline-none whitespace-nowrap ${
                    currentPath === "/about"
                      ? "text-white font-semibold drop-shadow-[0_0_8px_rgba(0,201,255,0.45)]"
                      : "text-neutral-200 font-medium hover:text-[#00C9FF]"
                  }`}
                >
                  <span>About</span>
                  {currentPath === "/about" && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-[#00C9FF] shadow-[0_0_8px_#00C9FF]" />
                  )}
                </button>

                {/* Services (Direct Clickable Page) */}
                <button
                  data-id="Services"
                  type="button"
                  onClick={() => handleLinkClick("/services")}
                  className={`relative px-3 py-1.5 font-sans text-[14px] sm:text-[14.5px] leading-[1.2] tracking-[0] cursor-pointer transition-colors duration-250 ease-out focus:outline-none whitespace-nowrap ${
                    currentPath === "/services" || currentPath === "/solutions"
                      ? "text-white font-semibold drop-shadow-[0_0_8px_rgba(0,201,255,0.45)]"
                      : "text-neutral-200 font-medium hover:text-[#00C9FF]"
                  }`}
                >
                  <span>Services</span>
                  {(currentPath === "/services" || currentPath === "/solutions") && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-[#00C9FF] shadow-[0_0_8px_#00C9FF]" />
                  )}
                </button>

                {/* Courses (Direct Clickable Page) */}
                <button
                  data-id="Courses"
                  type="button"
                  onClick={() => handleLinkClick("/courses")}
                  className={`relative px-3 py-1.5 font-sans text-[14px] sm:text-[14.5px] leading-[1.2] tracking-[0] cursor-pointer transition-colors duration-250 ease-out focus:outline-none whitespace-nowrap ${
                    currentPath === "/courses"
                      ? "text-white font-semibold drop-shadow-[0_0_8px_rgba(0,201,255,0.45)]"
                      : "text-neutral-200 font-medium hover:text-[#00C9FF]"
                  }`}
                >
                  <span>Courses</span>
                  {currentPath === "/courses" && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-[#00C9FF] shadow-[0_0_8px_#00C9FF]" />
                  )}
                </button>
              </AnimatedBackground>
            </div>

            {/* 3. Contact Us Primary Button */}
            <div className="flex items-center">
              <ShinyButton
                size="md"
                label="Contact Us"
                textClassName="font-sans !text-[14px] !font-semibold !leading-[1.2] !tracking-[0.01em]"
                onClick={() => handleLinkClick("/contact")}
              />
            </div>
          </nav>
        </header>
      </div>

      {/* ============================================================== */}
      {/* MOBILE STICKY TOP BAR                                          */}
      {/* ============================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 md:hidden bg-[#050509]/94 backdrop-blur-md border-b border-white/8 px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <RobopulseLogo size="md" onClick={() => handleLinkClick("/")} />

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleLinkClick("/contact")}
            className="font-sans text-[14px] font-semibold leading-[1.2] tracking-[0.01em] min-h-[44px] px-4 py-2 rounded-full bg-[#00C9FF]/10 border border-[#00C9FF]/30 text-[#00C9FF] active:bg-[#00C9FF]/20 cursor-pointer flex items-center justify-center whitespace-nowrap"
          >
            CONTACT US
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-300 hover:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00C9FF] cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#00C9FF]" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* ============================================================== */}
      {/* MOBILE DRAWER MENU                                             */}
      {/* Order: Home | About | Services | Courses | Contact Us          */}
      {/* ============================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-30 bg-[#030303]/98 backdrop-blur-2xl md:hidden px-5 py-6 flex flex-col justify-between overflow-y-auto pb-24">
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00C9FF]/80">
              NAVIGATION // ROBOPULSE INTELLIGENCE
            </p>

            <div className="space-y-1">
              {/* 1. Home */}
              <button
                onClick={() => handleLinkClick("/")}
                className={`w-full text-left min-h-[44px] flex items-center px-3.5 py-2 rounded-xl font-sans text-[14px] leading-[1.2] tracking-normal transition-colors duration-250 cursor-pointer whitespace-nowrap ${
                  currentPath === "/"
                    ? "text-white font-semibold bg-white/[0.05] border-l-2 border-[#00C9FF] shadow-[0_0_12px_rgba(0,201,255,0.15)]"
                    : "text-neutral-300 font-medium hover:text-[#00C9FF]"
                }`}
              >
                Home
              </button>

              {/* 2. About */}
              <button
                onClick={() => handleLinkClick("/about")}
                className={`w-full text-left min-h-[44px] flex items-center px-3.5 py-2 rounded-xl font-sans text-[14px] leading-[1.2] tracking-normal transition-colors duration-250 cursor-pointer whitespace-nowrap ${
                  currentPath === "/about"
                    ? "text-white font-semibold bg-white/[0.05] border-l-2 border-[#00C9FF] shadow-[0_0_12px_rgba(0,201,255,0.15)]"
                    : "text-neutral-300 font-medium hover:text-[#00C9FF]"
                }`}
              >
                About
              </button>

              {/* 3. Services */}
              <button
                onClick={() => handleLinkClick("/services")}
                className={`w-full text-left min-h-[44px] flex items-center px-3.5 py-2 rounded-xl font-sans text-[14px] leading-[1.2] tracking-normal transition-colors duration-250 cursor-pointer whitespace-nowrap ${
                  currentPath === "/services" || currentPath === "/solutions"
                    ? "text-white font-semibold bg-white/[0.05] border-l-2 border-[#00C9FF] shadow-[0_0_12px_rgba(0,201,255,0.15)]"
                    : "text-neutral-300 font-medium hover:text-[#00C9FF]"
                }`}
              >
                Services
              </button>

              {/* 4. Courses */}
              <button
                onClick={() => handleLinkClick("/courses")}
                className={`w-full text-left min-h-[44px] flex items-center px-3.5 py-2 rounded-xl font-sans text-[14px] leading-[1.2] tracking-normal transition-colors duration-250 cursor-pointer whitespace-nowrap ${
                  currentPath === "/courses"
                    ? "text-white font-semibold bg-white/[0.05] border-l-2 border-[#00C9FF] shadow-[0_0_12px_rgba(0,201,255,0.15)]"
                    : "text-neutral-300 font-medium hover:text-[#00C9FF]"
                }`}
              >
                Courses
              </button>

              {/* 5. Contact Us */}
              <button
                onClick={() => handleLinkClick("/contact")}
                className={`w-full text-left min-h-[44px] flex items-center px-3.5 py-2 rounded-xl font-sans text-[14px] leading-[1.2] tracking-normal transition-colors duration-250 cursor-pointer whitespace-nowrap ${
                  currentPath === "/contact"
                    ? "text-white font-semibold bg-white/[0.05] border-l-2 border-[#00C9FF] shadow-[0_0_12px_rgba(0,201,255,0.15)]"
                    : "text-neutral-300 font-medium hover:text-[#00C9FF]"
                }`}
              >
                Contact Us
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <ShinyButton
              label="Contact Us"
              size="md"
              textClassName="font-sans !text-[14px] !font-semibold !leading-[1.2] !tracking-[0.01em]"
              className="w-full min-h-[44px]"
              onClick={() => handleLinkClick("/contact")}
            />
            <p className="text-center text-xs font-mono text-neutral-500 uppercase tracking-wider">
              ROBOPULSE SYSTEMS · READY FOR EXPLORATION
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MOBILE STICKY BOTTOM NAVIGATION BAR                            */}
      {/* Order: Home | Services | Courses | Contact                     */}
      {/* ============================================================== */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#07070b]/94 backdrop-blur-xl border-t border-white/8 px-2 py-1.5 flex items-center justify-around"
        aria-label="Mobile Bottom Navigation"
      >
        <button
          onClick={() => handleLinkClick("/")}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
            currentPath === "/" ? "text-[#00C9FF]" : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="font-sans text-[11px] font-medium leading-[1.2] tracking-normal whitespace-nowrap">Home</span>
        </button>

        <button
          onClick={() => handleLinkClick("/services")}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
            currentPath === "/services" || currentPath === "/solutions"
              ? "text-[#00C9FF]"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span className="font-sans text-[11px] font-medium leading-[1.2] tracking-normal whitespace-nowrap">Services</span>
        </button>

        <button
          onClick={() => handleLinkClick("/courses")}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
            currentPath === "/courses"
              ? "text-[#00C9FF]"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span className="font-sans text-[11px] font-medium leading-[1.2] tracking-normal whitespace-nowrap">Courses</span>
        </button>

        <button
          onClick={() => handleLinkClick("/contact")}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
            currentPath === "/contact" ? "text-[#00C9FF]" : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          <span className="font-sans text-[11px] font-medium leading-[1.2] tracking-normal whitespace-nowrap">Contact</span>
        </button>
      </nav>
    </>
  );
};

export { AnimatedTabsHover };
