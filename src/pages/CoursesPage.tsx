/**
 * Robopulse Intelligence — Comprehensive Courses Page
 * Complete curriculum catalog across Primary, Middle School, Senior & AI, and Olympiad Competition tracks.
 */

import React, { useState } from "react";
import { ShinyButton } from "../components/ShinyButton";
import { MotionHeadingGroup } from "../components/MotionHeading";
import { openWhatsApp } from "../config";
import {
  COURSES_LIST,
  COURSE_CATEGORIES,
  FEATURED_COURSE,
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
  Users,
  CheckCircle2,
  BookOpen,
  Sparkles,
  MessageCircle,
} from "lucide-react";

interface CoursesPageProps {
  navigate: (path: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ navigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Levels");

  const filteredCourses =
    selectedCategory === "All Levels"
      ? COURSES_LIST
      : COURSES_LIST.filter((c) => c.category === selectedCategory);

  const getCourseIcon = (iconName: string) => {
    switch (iconName) {
      case "Blocks":
        return <Blocks className="w-5 h-5 text-[#00C9FF]" />;
      case "Gamepad2":
        return <Gamepad2 className="w-5 h-5 text-[#006CFF]" />;
      case "Car":
        return <Car className="w-5 h-5 text-[#00C9FF]" />;
      case "Wifi":
        return <Wifi className="w-5 h-5 text-[#A9D4FF]" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-[#006CFF]" />;
      case "Eye":
        return <Eye className="w-5 h-5 text-[#00C9FF]" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-[#A9D4FF]" />;
      case "Award":
        return <Award className="w-5 h-5 text-[#00C9FF]" />;
      case "Compass":
        return <Compass className="w-5 h-5 text-[#006CFF]" />;
      default:
        return <BookOpen className="w-5 h-5 text-[#00C9FF]" />;
    }
  };

  const getLevelBadgeClass = (level: CourseItem["level"]) => {
    switch (level) {
      case "Beginner":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "Intermediate":
        return "bg-[#00C9FF]/10 text-[#00C9FF] border-[#00C9FF]/30";
      case "Advanced":
        return "bg-[#006CFF]/15 text-[#A9D4FF] border-[#006CFF]/35";
      case "Mastery":
        return "bg-[#250060]/40 text-[#00C9FF] border-[#00C9FF]/40";
      default:
        return "bg-white/10 text-white border-white/20";
    }
  };

  return (
    <div className="relative pt-24 md:pt-32 pb-24 space-y-24 md:space-y-32 overflow-hidden">
      {/* ============================================================== */}
      {/* 01 — HERO HEADER                                               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <MotionHeadingGroup className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#00C9FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] animate-pulse" />
            <span>CURRICULUM // GRADE-ALIGNED PATHWAYS</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.95]">
            Engineering Courses for{" "}
            <span className="italic text-shimmer">Every Stage.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-sans">
            Progressive mechatronics and AI learning journeys crafted for young learners through to high school engineers. Real hardware, experiential problem-solving, and competition-ready skills.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <ShinyButton
              label="Request Full Syllabus Pack"
              size="md"
              onClick={() => navigate("/contact")}
            />
            <button
              onClick={() =>
                openWhatsApp(
                  "Hello Robopulse, I would like to inquire about robotics & AI courses for our students."
                )
              }
              className="px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs sm:text-sm font-semibold tracking-wider text-neutral-200 hover:text-white transition-all flex items-center gap-2 hover:border-[#00C9FF]/40 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#00C9FF]" />
              <span>WhatsApp Academic Advisory</span>
            </button>
          </div>
        </MotionHeadingGroup>
      </section>

      {/* ============================================================== */}
      {/* 02 — FLAGSHIP COURSE SPOTLIGHT                                 */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-[28px] overflow-hidden border border-white/10 bg-gradient-to-br from-[#070712] via-[#05050A] to-[#140030] p-8 sm:p-12 lg:p-14">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#006CFF]/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9FF]/10 border border-[#00C9FF]/30 text-[11px] font-mono tracking-widest text-[#00C9FF]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{FEATURED_COURSE.tag}</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono tracking-[0.2em] text-[#A9D4FF] uppercase block">
                  {FEATURED_COURSE.subtitle}
                </span>
                <h2 className="font-display text-3xl sm:text-5xl text-white leading-tight">
                  {FEATURED_COURSE.title}
                </h2>
              </div>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                {FEATURED_COURSE.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/8">
                  <Users className="w-3.5 h-3.5 text-[#00C9FF]" />
                  <span>{FEATURED_COURSE.ageGroup}</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/8">
                  <Clock className="w-3.5 h-3.5 text-[#006CFF]" />
                  <span>{FEATURED_COURSE.duration}</span>
                </span>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase text-[#A9D4FF] tracking-wider block">
                  Curriculum Highlights:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {FEATURED_COURSE.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-neutral-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00C9FF] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <ShinyButton
                  label={FEATURED_COURSE.ctaText}
                  size="sm"
                  onClick={() => navigate(FEATURED_COURSE.ctaPath)}
                />
              </div>
            </div>

            {/* Right Visual Stats Card */}
            <div className="lg:col-span-5">
              <div className="glass-panel rounded-2xl p-7 border border-white/10 space-y-6">
                <div className="border-b border-white/8 pb-4">
                  <span className="text-[10px] font-mono text-[#00C9FF] uppercase tracking-widest block">
                    LEARNING OUTCOME PROFILE
                  </span>
                  <h3 className="font-display text-2xl text-white mt-1">
                    Industry-Aligned Skillsets
                  </h3>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <div className="flex justify-between font-mono text-[11px] mb-1">
                      <span className="text-neutral-300">Hardware & Firmware C++</span>
                      <span className="text-[#00C9FF]">95% Practical</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[95%] bg-[#00C9FF] rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-mono text-[11px] mb-1">
                      <span className="text-neutral-300">Closed-Loop PID Control</span>
                      <span className="text-[#006CFF]">90% Mastery</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[90%] bg-[#006CFF] rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-mono text-[11px] mb-1">
                      <span className="text-neutral-300">Edge AI Optical Vision</span>
                      <span className="text-[#A9D4FF]">85% Integration</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[85%] bg-[#A9D4FF] rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/8 text-[11px] font-mono text-neutral-400">
                  <span className="text-white font-semibold block mb-0.5">
                    Portfolio Certification:
                  </span>
                  Each graduate presents a fully functional autonomous ground rover during campus exhibition.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 03 — INTERACTIVE CATEGORY FILTER & COURSE CATALOGUE            */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-10">
        <MotionHeadingGroup className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/8 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00C9FF]">
              COURSE REPOSITORY
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-white mt-1">
              Select Your Learning Pathway
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            Showing {filteredCourses.length} of {COURSES_LIST.length} Courses
          </span>
        </MotionHeadingGroup>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2.5">
          {COURSE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#00C9FF] text-black font-semibold shadow-[0_0_18px_rgba(0,201,255,0.4)]"
                  : "bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="glass-card rounded-[24px] p-7 flex flex-col justify-between group hover:border-[#00C9FF]/30 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Header row: Icon & Level */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-[#00C9FF]/40 transition-colors">
                    {getCourseIcon(course.iconName)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${getLevelBadgeClass(
                        course.level
                      )}`}
                    >
                      {course.level}
                    </span>
                  </div>
                </div>

                {/* Course Metadata Strip */}
                <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#00C9FF]" />
                    <span>{course.ageGroup}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#006CFF]" />
                    <span>{course.duration}</span>
                  </span>
                </div>

                {/* Title & Tagline */}
                <div className="space-y-1">
                  <h3 className="font-display text-2xl text-white group-hover:text-[#00C9FF] transition-colors leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans line-clamp-1 italic">
                    "{course.tagline}"
                  </p>
                </div>

                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {course.description}
                </p>

                {/* Syllabus Topic Chips */}
                <div className="pt-3 border-t border-white/5 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block">
                    Core Modules:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {course.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono text-[#A9D4FF] bg-white/[0.03] border border-white/8 px-2 py-0.5 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() =>
                    openWhatsApp(
                      `Hello Robopulse, I would like to inquire about the course "${course.title}".`
                    )
                  }
                  className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors group-hover:text-[#00C9FF] cursor-pointer"
                >
                  <span>Inquire Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-[10px] font-mono text-neutral-500 uppercase">
                  {course.badge || "SYLLABUS"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 04 — PEDAGOGICAL LEARNING ROADMAP                              */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <MotionHeadingGroup className="border-b border-white/8 pb-4">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00C9FF]">
            PROGRESSION FRAMEWORK
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-white mt-1">
            From First Mechanism to Edge AI
          </h2>
        </MotionHeadingGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "STAGE 01",
              title: "Tactile Simple Machines",
              grades: "Grades 1-4 · Ages 6-9",
              description:
                "Physical mechanical linkages, gear train ratios, levers, and pulleys. Developing fine motor skills and spatial reasoning without screens.",
              color: "#00C9FF",
            },
            {
              step: "STAGE 02",
              title: "Visual Logic & Actuation",
              grades: "Grades 4-6 · Ages 9-11",
              description:
                "Visual flowcharts, conditional logic, sensors, and basic electric circuits driving motors, LED lights, and acoustic buzzers.",
              color: "#006CFF",
            },
            {
              step: "STAGE 03",
              title: "Mobile Autonomous Vehicles",
              grades: "Grades 6-9 · Ages 11-14",
              description:
                "Microcontrollers, ultrasonic distance telemetry, line sensor arrays, motor PWM drivers, and wireless IoT cloud boards.",
              color: "#A9D4FF",
            },
            {
              step: "STAGE 04",
              title: "Computer Vision & Edge AI",
              grades: "Grades 9-12 · Ages 14-18",
              description:
                "Text-based Python and C++, OpenCV camera filters, real-time object detection models, and Olympiad competition arenas.",
              color: "#00C9FF",
            },
          ].map((stage, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/8 space-y-3.5 hover:border-[#00C9FF]/30 transition-colors"
            >
              <span className="font-mono text-xs text-[#00C9FF] tracking-widest uppercase">
                {stage.step}
              </span>
              <h3 className="font-display text-xl text-white">
                {stage.title}
              </h3>
              <span className="text-[10px] font-mono text-[#A9D4FF] block">
                {stage.grades}
              </span>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 05 — CALL TO ACTION                                            */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-[28px] p-10 sm:p-14 bg-gradient-to-br from-[#0A0A14] via-[#05050A] to-[#002550]/40 border border-white/10 text-center space-y-6 overflow-hidden">
          <div className="absolute top-0 right-1/3 w-80 h-80 bg-[#00C9FF]/10 rounded-full blur-[100px] pointer-events-none" />

          <MotionHeadingGroup className="relative z-10 max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00C9FF]">
              ENROLLMENT & SCHOOL ADOPTION
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-white">
              Introduce These Courses to Your Campus
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
              We offer full course licensing, hardware kit bundles, faculty training, and student certifications for academic institutions and learning centers.
            </p>
          </MotionHeadingGroup>

          <div className="relative z-10 flex flex-wrap justify-center gap-4 pt-2">
            <ShinyButton
              label="Contact Course Advisors"
              size="md"
              onClick={() => navigate("/contact")}
            />
            <button
              onClick={() =>
                openWhatsApp(
                  "Hello, I would like to discuss implementing Robopulse robotics courses in our school curriculum."
                )
              }
              className="px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs sm:text-sm font-semibold tracking-wider text-neutral-200 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#00C9FF]" />
              <span>Direct WhatsApp Discussion</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
