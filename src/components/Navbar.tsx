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
  Image as GalleryIcon,
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
    if (currentPath === "/gallery") return "Gallery";
    return undefined;
  };

  return (
    <>
      {/* ============================================================== */}
      {/* DESKTOP FLOATING GLASS PILL NAVBAR                             */}
      {/* Order: Robopulse Logo | Home | About | Services | Courses | Gallery | Contact Us */}
      {/* ============================================================== */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1140px] hidden md:block">
        <header>
          <nav
            className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 relative z-50 ${
              scrolled
                ? "bg-[#07070b]/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(0,201,255,0.08)]"
                : "bg-[#090910]/75 backdrop-blur-lg border border-white/8 shadow-lg"
            }`}
            aria-label="Main Navigation"
          >
            {/* 1. Robopulse Logo */}
            <div className="flex items-center">
              <RobopulseLogo size="sm" onClick={() => handleLinkClick("/")} />
            </div>

            {/* 2. Main Navigation Links with AnimatedBackground Hover Pill */}
            <div className="flex items-center">
              <AnimatedBackground
                defaultValue={getActiveTab()}
                className="rounded-lg bg-zinc-100 dark:bg-zinc-800"
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.3,
                }}
                enableHover
              >
                {/* Home */}
                <button
                  data-id="Home"
                  type="button"
                  onClick={() => handleLinkClick("/")}
                  className={`px-3 py-1.5 text-xs lg:text-[13px] tracking-wide font-medium cursor-pointer transition-colors duration-300 focus:outline-none ${
                    currentPath === "/"
                      ? "text-zinc-950 dark:text-zinc-50 font-semibold"
                      : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                  }`}
                >
                  Home
                </button>

                {/* About */}
                <button
                  data-id="About"
                  type="button"
                  onClick={() => handleLinkClick("/about")}
                  className={`px-3 py-1.5 text-xs lg:text-[13px] tracking-wide font-medium cursor-pointer transition-colors duration-300 focus:outline-none ${
                    currentPath === "/about"
                      ? "text-zinc-950 dark:text-zinc-50 font-semibold"
                      : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                  }`}
                >
                  About
                </button>

                {/* Services (Direct Clickable Page) */}
                <button
                  data-id="Services"
                  type="button"
                  onClick={() => handleLinkClick("/services")}
                  className={`px-3 py-1.5 text-xs lg:text-[13px] tracking-wide font-medium cursor-pointer transition-colors duration-300 focus:outline-none ${
                    currentPath === "/services" || currentPath === "/solutions"
                      ? "text-zinc-950 dark:text-zinc-50 font-semibold"
                      : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                  }`}
                >
                  Services
                </button>

                {/* Courses (Direct Clickable Page) */}
                <button
                  data-id="Courses"
                  type="button"
                  onClick={() => handleLinkClick("/courses")}
                  className={`px-3 py-1.5 text-xs lg:text-[13px] tracking-wide font-medium cursor-pointer transition-colors duration-300 focus:outline-none ${
                    currentPath === "/courses"
                      ? "text-zinc-950 dark:text-zinc-50 font-semibold"
                      : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                  }`}
                >
                  Courses
                </button>

                {/* Gallery */}
                <button
                  data-id="Gallery"
                  type="button"
                  onClick={() => handleLinkClick("/gallery")}
                  className={`px-3 py-1.5 text-xs lg:text-[13px] tracking-wide font-medium cursor-pointer transition-colors duration-300 focus:outline-none ${
                    currentPath === "/gallery"
                      ? "text-zinc-950 dark:text-zinc-50 font-semibold"
                      : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                  }`}
                >
                  Gallery
                </button>
              </AnimatedBackground>
            </div>

            {/* 3. Contact Us Primary Button */}
            <div className="flex items-center gap-3">
              <ShinyButton
                size="sm"
                label="Contact Us"
                onClick={() => handleLinkClick("/contact")}
              />
            </div>
          </nav>
        </header>
      </div>

      {/* ============================================================== */}
      {/* MOBILE STICKY TOP BAR                                          */}
      {/* ============================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 md:hidden bg-[#050509]/92 backdrop-blur-md border-b border-white/8 px-4 py-3 flex items-center justify-between">
        <RobopulseLogo size="sm" onClick={() => handleLinkClick("/")} />

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleLinkClick("/contact")}
            className="text-[11px] font-semibold tracking-wider px-3 py-1.5 rounded-full bg-[#00C9FF]/10 border border-[#00C9FF]/30 text-[#00C9FF] active:bg-[#00C9FF]/20 cursor-pointer"
          >
            CONTACT US
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00C9FF] cursor-pointer"
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
      {/* Order: Home | About | Services | Courses | Gallery | Contact Us*/}
      {/* ============================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[53px] z-30 bg-[#030303]/98 backdrop-blur-2xl md:hidden px-5 py-6 flex flex-col justify-between overflow-y-auto pb-24">
          <div className="space-y-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#00C9FF]/80">
              NAVIGATION // ROBOPULSE INTELLIGENCE
            </p>

            <div className="space-y-1">
              {/* 1. Home */}
              <button
                onClick={() => handleLinkClick("/")}
                className={`w-full text-left text-lg font-display tracking-tight py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${
                  currentPath === "/"
                    ? "text-[#00C9FF] bg-white/[0.04]"
                    : "text-neutral-200 hover:text-white"
                }`}
              >
                Home
              </button>

              {/* 2. About */}
              <button
                onClick={() => handleLinkClick("/about")}
                className={`w-full text-left text-lg font-display tracking-tight py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${
                  currentPath === "/about"
                    ? "text-[#00C9FF] bg-white/[0.04]"
                    : "text-neutral-200 hover:text-white"
                }`}
              >
                About
              </button>

              {/* 3. Services */}
              <button
                onClick={() => handleLinkClick("/services")}
                className={`w-full text-left text-lg font-display tracking-tight py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${
                  currentPath === "/services" || currentPath === "/solutions"
                    ? "text-[#00C9FF] bg-white/[0.04]"
                    : "text-neutral-200 hover:text-white"
                }`}
              >
                Services
              </button>

              {/* 4. Courses */}
              <button
                onClick={() => handleLinkClick("/courses")}
                className={`w-full text-left text-lg font-display tracking-tight py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${
                  currentPath === "/courses"
                    ? "text-[#00C9FF] bg-white/[0.04]"
                    : "text-neutral-200 hover:text-white"
                }`}
              >
                Courses
              </button>

              {/* 5. Gallery */}
              <button
                onClick={() => handleLinkClick("/gallery")}
                className={`w-full text-left text-lg font-display tracking-tight py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${
                  currentPath === "/gallery"
                    ? "text-[#00C9FF] bg-white/[0.04]"
                    : "text-neutral-200 hover:text-white"
                }`}
              >
                Gallery
              </button>

              {/* 6. Contact Us */}
              <button
                onClick={() => handleLinkClick("/contact")}
                className={`w-full text-left text-lg font-display tracking-tight py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${
                  currentPath === "/contact"
                    ? "text-[#00C9FF] bg-white/[0.04]"
                    : "text-neutral-200 hover:text-white"
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
              className="w-full"
              onClick={() => handleLinkClick("/contact")}
            />
            <p className="text-center text-[11px] text-neutral-500 font-mono">
              ROBOPULSE SYSTEMS · READY FOR EXPLORATION
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MOBILE STICKY BOTTOM NAVIGATION BAR                            */}
      {/* Order: Home | Services | Courses | Gallery | Contact           */}
      {/* ============================================================== */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#07070b]/94 backdrop-blur-xl border-t border-white/8 px-2 py-2 flex items-center justify-around"
        aria-label="Mobile Bottom Navigation"
      >
        <button
          onClick={() => handleLinkClick("/")}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
            currentPath === "/" ? "text-[#00C9FF]" : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight">Home</span>
        </button>

        <button
          onClick={() => handleLinkClick("/services")}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
            currentPath === "/services" || currentPath === "/solutions"
              ? "text-[#00C9FF]"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight">Services</span>
        </button>

        <button
          onClick={() => handleLinkClick("/courses")}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
            currentPath === "/courses"
              ? "text-[#00C9FF]"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight">Courses</span>
        </button>

        <button
          onClick={() => handleLinkClick("/gallery")}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
            currentPath === "/gallery" ? "text-[#00C9FF]" : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <GalleryIcon className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight">Gallery</span>
        </button>

        <button
          onClick={() => handleLinkClick("/contact")}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
            currentPath === "/contact" ? "text-[#00C9FF]" : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight">Contact</span>
        </button>
      </nav>
    </>
  );
};

export { AnimatedTabsHover };
