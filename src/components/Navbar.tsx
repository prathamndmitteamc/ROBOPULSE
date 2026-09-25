import React, { useState, useEffect, useRef } from "react";
import { RobopulseLogo } from "./RobopulseLogo";
import { ShinyButton } from "./ShinyButton";
import { ServicesMegaMenu } from "./ServicesMegaMenu";
import { CoursesMegaMenu } from "./CoursesMegaMenu";
import { ServiceItem, SERVICES_LIST, FEATURED_SERVICE } from "../data/servicesData";
import { CourseItem, COURSES_LIST, FEATURED_COURSE } from "../data/coursesData";
import { AnimatedBackground } from "@/components/core/animated-background";
import { AnimatedTabsHover } from "./AnimatedTabsHover";
import { ThemeToggle } from "./ThemeToggle";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Briefcase,
  GraduationCap,
  Image as GalleryIcon,
  PhoneCall,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

type ActiveMenu = "services" | "courses" | null;

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const [activeDropdown, setActiveDropdown] = useState<ActiveMenu>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseEnter = (menu: "services" | "courses") => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleLinkClick = (path: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectService = (service: ServiceItem) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    // Navigate to solutions page or contact
    navigate(service.path || "/solutions");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectCourse = (course: CourseItem) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    // Navigate to contact for curriculum inquiry
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Dim backdrop when desktop mega-menu is active */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-200 hidden md:block"
          onClick={() => setActiveDropdown(null)}
          aria-hidden="true"
        />
      )}

      {/* ============================================================== */}
      {/* DESKTOP FLOATING GLASS PILL NAVBAR & MEGA-MENUS                */}
      {/* Order: Robopulse Logo | Home | About | Services | Courses | Gallery | Contact Us */}
      {/* ============================================================== */}
      <div
        ref={navContainerRef}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1140px] hidden md:block"
        onMouseLeave={handleMouseLeave}
      >
        <header>
          <nav
            className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 relative z-50 ${
              scrolled || activeDropdown
                ? "bg-[#07070b]/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(0,201,255,0.08)]"
                : "bg-[#090910]/75 backdrop-blur-lg border border-white/8 shadow-lg"
            }`}
            aria-label="Main Navigation"
          >
            {/* 1. Robopulse Logo */}
            <div className="flex items-center">
              <RobopulseLogo size="sm" onClick={() => handleLinkClick("/")} />
            </div>

            {/* 2. Main Navigation Links with AnimatedBackground Hover Animation */}
            <div className="flex items-center">
              <AnimatedBackground
                defaultValue={
                  currentPath === "/"
                    ? "Home"
                    : currentPath === "/about"
                    ? "About"
                    : currentPath === "/solutions"
                    ? "Services"
                    : currentPath === "/gallery"
                    ? "Gallery"
                    : undefined
                }
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

                {/* Services (Dropdown trigger) */}
                <button
                  data-id="Services"
                  type="button"
                  onMouseEnter={() => handleMouseEnter("services")}
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "services" ? null : "services"
                    )
                  }
                  aria-expanded={activeDropdown === "services"}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs lg:text-[13px] tracking-wide font-medium cursor-pointer transition-colors duration-300 focus:outline-none ${
                    activeDropdown === "services" || currentPath === "/solutions"
                      ? "text-[#00C9FF] dark:text-[#00C9FF] font-semibold"
                      : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === "services"
                        ? "rotate-180 text-[#00C9FF]"
                        : "text-neutral-400"
                    }`}
                  />
                </button>

                {/* Courses (Dropdown trigger) */}
                <button
                  data-id="Courses"
                  type="button"
                  onMouseEnter={() => handleMouseEnter("courses")}
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "courses" ? null : "courses"
                    )
                  }
                  aria-expanded={activeDropdown === "courses"}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs lg:text-[13px] tracking-wide font-medium cursor-pointer transition-colors duration-300 focus:outline-none ${
                    activeDropdown === "courses"
                      ? "text-[#00C9FF] dark:text-[#00C9FF] font-semibold"
                      : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                  }`}
                >
                  <span>Courses</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === "courses"
                        ? "rotate-180 text-[#00C9FF]"
                        : "text-neutral-400"
                    }`}
                  />
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

            {/* 3. Theme Toggle & Contact Us Primary Button */}
            <div className="flex items-center gap-3">
              <ThemeToggle size="md" />
              <ShinyButton
                size="sm"
                label="Contact Us"
                onClick={() => handleLinkClick("/contact")}
              />
            </div>
          </nav>
        </header>

        {/* ============================================================== */}
        {/* DESKTOP MEGA-MENU PANELS                                       */}
        {/* ============================================================== */}
        <div
          className="absolute top-full left-0 w-full pt-3 z-50 pointer-events-auto"
          onMouseEnter={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          }}
          onMouseLeave={handleMouseLeave}
        >
          {activeDropdown === "services" && (
            <ServicesMegaMenu
              onSelectService={handleSelectService}
              onNavigate={handleLinkClick}
              onClose={() => setActiveDropdown(null)}
            />
          )}

          {activeDropdown === "courses" && (
            <CoursesMegaMenu
              onSelectCourse={handleSelectCourse}
              onNavigate={handleLinkClick}
              onClose={() => setActiveDropdown(null)}
            />
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE STICKY TOP BAR                                          */}
      {/* ============================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 md:hidden bg-[#050509]/92 backdrop-blur-md border-b border-white/8 px-4 py-3 flex items-center justify-between">
        <RobopulseLogo size="sm" onClick={() => handleLinkClick("/")} />

        <div className="flex items-center gap-2">
          <ThemeToggle size="sm" />
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
      {/* MOBILE DRAWER MENU (with expandable Services & Courses)        */}
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
                className={`w-full text-left text-lg font-display tracking-tight py-2.5 px-3 rounded-xl transition-colors ${
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
                className={`w-full text-left text-lg font-display tracking-tight py-2.5 px-3 rounded-xl transition-colors ${
                  currentPath === "/about"
                    ? "text-[#00C9FF] bg-white/[0.04]"
                    : "text-neutral-200 hover:text-white"
                }`}
              >
                About
              </button>

              {/* 3. Services (Expandable Accordion) */}
              <div className="rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full text-left text-lg font-display tracking-tight py-2.5 px-3 flex items-center justify-between text-neutral-200 hover:text-white cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>Services</span>
                    <span className="text-[9px] font-mono text-[#00C9FF] bg-[#00C9FF]/10 px-1.5 py-0.5 rounded border border-[#00C9FF]/20">
                      6 Tracks
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform ${
                      mobileServicesOpen ? "rotate-180 text-[#00C9FF]" : ""
                    }`}
                  />
                </button>

                {mobileServicesOpen && (
                  <div className="px-3 pb-3 space-y-2 pt-1 border-t border-white/5 bg-black/40">
                    {/* Featured mobile badge */}
                    <div className="p-2.5 rounded-lg bg-gradient-to-r from-[#250060]/30 to-[#00C9FF]/10 border border-white/10 text-xs flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-mono text-[#00C9FF] block">
                          FEATURED LAB SETUP
                        </span>
                        <span className="font-semibold text-white">
                          {FEATURED_SERVICE.title}
                        </span>
                      </div>
                      <button
                        onClick={() => handleLinkClick("/solutions")}
                        className="text-[10px] font-mono text-[#00C9FF] flex items-center gap-1 shrink-0"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    {SERVICES_LIST.map((srv) => (
                      <button
                        key={srv.id}
                        onClick={() => handleSelectService(srv)}
                        className="w-full text-left p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 flex items-start justify-between gap-2 cursor-pointer"
                      >
                        <div>
                          <span className="text-xs font-medium text-white block">
                            {srv.title}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-sans line-clamp-1 block">
                            {srv.tagline}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-[#A9D4FF] shrink-0 mt-0.5">
                          {srv.badge}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Courses (Expandable Accordion) */}
              <div className="rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden">
                <button
                  onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                  className="w-full text-left text-lg font-display tracking-tight py-2.5 px-3 flex items-center justify-between text-neutral-200 hover:text-white cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>Courses</span>
                    <span className="text-[9px] font-mono text-[#A9D4FF] bg-[#006CFF]/15 px-1.5 py-0.5 rounded border border-[#006CFF]/30">
                      Curriculum
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform ${
                      mobileCoursesOpen ? "rotate-180 text-[#00C9FF]" : ""
                    }`}
                  />
                </button>

                {mobileCoursesOpen && (
                  <div className="px-3 pb-3 space-y-2 pt-1 border-t border-white/5 bg-black/40">
                    {/* Featured mobile course */}
                    <div className="p-2.5 rounded-lg bg-gradient-to-r from-[#18003F]/50 to-[#006CFF]/15 border border-white/10 text-xs flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-mono text-[#A9D4FF] block">
                          FLAGSHIP COURSE
                        </span>
                        <span className="font-semibold text-white text-[11px] block">
                          {FEATURED_COURSE.title}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono block">
                          {FEATURED_COURSE.ageGroup}
                        </span>
                      </div>
                      <button
                        onClick={() => handleLinkClick("/contact")}
                        className="text-[10px] font-mono text-[#00C9FF] flex items-center gap-1 shrink-0"
                      >
                        <span>Inquire</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    {COURSES_LIST.map((crs) => (
                      <button
                        key={crs.id}
                        onClick={() => handleSelectCourse(crs)}
                        className="w-full text-left p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 flex items-start justify-between gap-2 cursor-pointer"
                      >
                        <div>
                          <span className="text-xs font-medium text-white block">
                            {crs.title}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-sans line-clamp-1 block">
                            {crs.tagline}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-[#00C9FF] shrink-0 mt-0.5">
                          {crs.duration}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Gallery */}
              <button
                onClick={() => handleLinkClick("/gallery")}
                className={`w-full text-left text-lg font-display tracking-tight py-2.5 px-3 rounded-xl transition-colors ${
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
                className={`w-full text-left text-lg font-display tracking-tight py-2.5 px-3 rounded-xl transition-colors ${
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
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs font-mono text-neutral-300 uppercase tracking-wider">
                Display Theme
              </span>
              <ThemeToggle showLabel size="sm" />
            </div>
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
      {/* Updated to reflect: Home | Services | Courses | Gallery | Contact */}
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
          onClick={() => {
            setMobileMenuOpen(true);
            setMobileServicesOpen(true);
            setMobileCoursesOpen(false);
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
            mobileServicesOpen || currentPath === "/solutions"
              ? "text-[#00C9FF]"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight">Services</span>
        </button>

        <button
          onClick={() => {
            setMobileMenuOpen(true);
            setMobileCoursesOpen(true);
            setMobileServicesOpen(false);
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
            mobileCoursesOpen
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
