import React, { useState } from "react";
import {
  FEATURED_COURSE,
  COURSES_LIST,
  COURSE_CATEGORIES,
  CourseItem,
} from "../data/coursesData";
import {
  Blocks,
  Gamepad2,
  Car,
  Wifi,
  Layers,
  Eye,
  Terminal,
  Award,
  Compass,
  ArrowRight,
  Clock,
  User,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { openWhatsApp } from "../config";

interface CoursesMegaMenuProps {
  onSelectCourse: (course: CourseItem) => void;
  onNavigate: (path: string) => void;
  onClose: () => void;
}

// Icon mapper
const getCourseIcon = (iconName: string) => {
  switch (iconName) {
    case "Blocks":
      return Blocks;
    case "Gamepad2":
      return Gamepad2;
    case "Car":
      return Car;
    case "Wifi":
      return Wifi;
    case "Layers":
      return Layers;
    case "Eye":
      return Eye;
    case "Terminal":
      return Terminal;
    case "Award":
      return Award;
    case "Compass":
      return Compass;
    default:
      return BookOpen;
  }
};

export const CoursesMegaMenu: React.FC<CoursesMegaMenuProps> = ({
  onSelectCourse,
  onNavigate,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Levels");

  const filteredCourses =
    selectedCategory === "All Levels"
      ? COURSES_LIST
      : COURSES_LIST.filter((c) => c.category === selectedCategory);

  return (
    <div
      className="w-full max-w-[1100px] p-6 lg:p-7 rounded-3xl bg-[#06060c]/95 backdrop-blur-2xl border border-white/10 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(0,201,255,0.12)] text-white animate-in fade-in zoom-in-95 duration-200"
      role="menu"
      aria-label="Courses Mega Menu"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
        {/* ============================================================== */}
        {/* LEFT COLUMN: FEATURED COURSE PANEL                             */}
        {/* ============================================================== */}
        <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-[#13002f] via-[#090918] to-[#040409] border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden group">
          {/* Ambient light glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#006CFF]/20 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#00C9FF]/15 rounded-full blur-[50px] pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-[#00C9FF]/15 border border-[#00C9FF]/30 text-[#00C9FF] text-[10px] font-mono tracking-wider font-semibold">
                {FEATURED_COURSE.tag}
              </span>
              <span className="text-[10px] font-mono text-[#A9D4FF]">
                ACCREDITED TRACK
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                {FEATURED_COURSE.subtitle}
              </span>
              <h4 className="font-display text-xl text-white group-hover:text-[#00C9FF] transition-colors leading-tight">
                {FEATURED_COURSE.title}
              </h4>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-300">
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#00C9FF]" />
                <span>{FEATURED_COURSE.ageGroup}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#A9D4FF]" />
                <span>{FEATURED_COURSE.duration}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              {FEATURED_COURSE.description}
            </p>

            <div className="space-y-1.5 pt-3 border-t border-white/5">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                Core Engineering Outcomes:
              </span>
              {FEATURED_COURSE.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs text-neutral-200">
                  <span className="text-[#00C9FF] text-xs mt-0.5">›</span>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-5 relative z-10">
            <button
              onClick={() => {
                onNavigate(FEATURED_COURSE.ctaPath);
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#00C9FF] hover:bg-[#A9D4FF] text-black font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,201,255,0.3)] cursor-pointer"
            >
              <span>{FEATURED_COURSE.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT SECTION: CATEGORIZED MULTI-COLUMN COURSES                */}
        {/* ============================================================== */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
          <div>
            {/* Header & Category Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-white/8">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00C9FF] block">
                  EXPANDABLE CURRICULUM REGISTRY
                </span>
                <h3 className="font-display text-xl text-white">
                  Available Robopulse Courses
                </h3>
              </div>

              {/* Dynamic Category Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                {COURSE_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono tracking-tight transition-all whitespace-nowrap cursor-pointer ${
                        isSelected
                          ? "bg-[#00C9FF] text-black font-semibold shadow-[0_0_12px_rgba(0,201,255,0.3)]"
                          : "bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.07]"
                      }`}
                    >
                      {cat.replace(" (Grades 1-4)", "").replace(" (Grades 5-8)", "").replace(" (Grades 9-12)", "")}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Course Cards Grid (Height capped with smooth scroll) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1 no-scrollbar">
              {filteredCourses.map((course) => {
                const IconComponent = getCourseIcon(course.iconName);
                return (
                  <div
                    key={course.id}
                    onClick={() => {
                      onSelectCourse(course);
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#00C9FF]/40 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[#00C9FF]/10 text-[#00C9FF] border border-[#00C9FF]/20 flex items-center justify-center group-hover:bg-[#00C9FF] group-hover:text-black transition-colors">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono text-neutral-400">
                            {course.ageGroup}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <span
                            className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                              course.level === "Beginner"
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                : course.level === "Intermediate"
                                ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                                : course.level === "Advanced"
                                ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            }`}
                          >
                            {course.level}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-display text-base text-white group-hover:text-[#00C9FF] transition-colors flex items-center justify-between">
                          <span>{course.title}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#00C9FF]" />
                        </h4>
                        <p className="text-[11px] text-neutral-400 font-sans leading-relaxed line-clamp-2 mt-0.5">
                          {course.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-400">
                        <Clock className="w-3 h-3 text-[#00C9FF]" />
                        <span>{course.duration}</span>
                      </div>

                      <span className="text-[10px] font-mono text-[#00C9FF] group-hover:underline">
                        Inquire Course ›
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Bar: Reassurance & Course Inquiries */}
          <div className="pt-3 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] animate-pulse" />
              <span>Looking for school batch discounts or custom lab integration?</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onNavigate("/contact");
                  onClose();
                }}
                className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white border border-white/10 font-medium transition-colors cursor-pointer"
              >
                Inquire For Cohort
              </button>
              <button
                onClick={() => {
                  openWhatsApp("Hello Robopulse, I would like to inquire about course syllabus and batch schedules for our students.");
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
