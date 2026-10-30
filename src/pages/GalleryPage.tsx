import React, { useState, useMemo } from "react";
import { MotionHeadingGroup } from "../components/MotionHeading";
import { ShinyButton } from "../components/ShinyButton";
import { ImageLightbox } from "../components/ImageLightbox";
import { SEOHead } from "../components/SEOHead";
import { openWhatsApp } from "../config";
import {
  GALLERY_ITEMS,
  GalleryCategory,
  GalleryItem,
} from "../data/galleryData";
import {
  Sparkles,
  Quote,
  Star,
  MapPin,
  Building,
  ArrowRight,
  Maximize2,
  Calendar,
  Layers,
  Cpu,
  GraduationCap,
  Wrench,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

interface GalleryPageProps {
  navigate: (path: string) => void;
}

const CATEGORIES: GalleryCategory[] = [
  "ALL",
  "PARENT REVIEWS",
  "SCHOOL DRIVES",
  "STEM LABS",
  "STUDENT PROJECTS",
  "WORKSHOPS & EVENTS",
];

export const GalleryPage: React.FC<GalleryPageProps> = ({ navigate }) => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("ALL");
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<GalleryItem | null>(null);

  // Filtered list based on tab
  const filteredItems = useMemo(() => {
    if (activeCategory === "ALL") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Lightbox navigation within current filtered list
  const currentLightboxIndex = useMemo(() => {
    if (!selectedLightboxItem) return -1;
    return filteredItems.findIndex((it) => it.id === selectedLightboxItem.id);
  }, [selectedLightboxItem, filteredItems]);

  const handleLightboxPrev = () => {
    if (currentLightboxIndex > 0) {
      setSelectedLightboxItem(filteredItems[currentLightboxIndex - 1]);
    }
  };

  const handleLightboxNext = () => {
    if (currentLightboxIndex < filteredItems.length - 1 && currentLightboxIndex !== -1) {
      setSelectedLightboxItem(filteredItems[currentLightboxIndex + 1]);
    }
  };

  // Distinct segmented datasets for the structured editorial sections
  const parentReviews = useMemo(
    () => GALLERY_ITEMS.filter((item) => item.category === "PARENT REVIEWS"),
    []
  );

  const schoolDrivesAndWorkshops = useMemo(
    () =>
      GALLERY_ITEMS.filter(
        (item) =>
          item.category === "SCHOOL DRIVES" || item.category === "WORKSHOPS & EVENTS"
      ),
    []
  );

  const stemLabs = useMemo(
    () => GALLERY_ITEMS.filter((item) => item.category === "STEM LABS"),
    []
  );

  const studentProjects = useMemo(
    () => GALLERY_ITEMS.filter((item) => item.category === "STUDENT PROJECTS"),
    []
  );

  return (
    <div className="relative pt-24 md:pt-32 pb-24 space-y-24 md:space-y-32 overflow-hidden">
      <SEOHead
        title="Robotics Lab Exhibition & Campus Showcase — RoboPulse Intelligence"
        description="Browse real school robotics labs, student projects, teacher training sessions, and campus exhibitions deployed by RoboPulse Intelligence."
        canonicalPath="/gallery"
        breadcrumbs={[{ name: "Showcase & Gallery", path: "/gallery" }]}
      />

      {/* Background ambient orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#250060]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#00C9FF]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-[#006CFF]/15 rounded-full blur-[150px] pointer-events-none" />

      {/* ============================================================== */}
      {/* A. GALLERY HERO                                                */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <MotionHeadingGroup className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 typo-eyebrow text-[#00C9FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] animate-pulse" />
            <span>EXHIBITION // INTERACTIVE SHOWCASE</span>
          </div>

          <h1 className="typo-h1 text-white">
            Inside the World of{" "}
            <span className="italic text-shimmer">RoboPulse.</span>
          </h1>

          <p className="typo-lead text-neutral-300 max-w-3xl">
            Explore the people, projects, learning environments, and school experiences bringing robotics, AI, and STEM education to life.
          </p>

          {/* Quick Metrics Strip */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/8 backdrop-blur-sm">
              <span className="text-2xl font-bold font-mono text-[#00C9FF] block">100%</span>
              <span className="text-xs text-neutral-400 font-sans">Hands-on Hardware</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/8 backdrop-blur-sm">
              <span className="text-2xl font-bold font-mono text-[#A9D4FF] block">14-Day</span>
              <span className="text-xs text-neutral-400 font-sans">Turnkey Lab Setup</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/8 backdrop-blur-sm">
              <span className="text-2xl font-bold font-mono text-[#00C9FF] block">Grade 1-12</span>
              <span className="text-xs text-neutral-400 font-sans">Aligned Curricula</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/8 backdrop-blur-sm">
              <span className="text-2xl font-bold font-mono text-[#A9D4FF] block">Verified</span>
              <span className="text-xs text-neutral-400 font-sans">Educator Mentorship</span>
            </div>
          </div>
        </MotionHeadingGroup>
      </section>

      {/* ============================================================== */}
      {/* 7. GALLERY FILTERING SYSTEM & ALL-ITEMS EXPLORER               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <span className="typo-eyebrow text-[#00C9FF] uppercase tracking-wider block">
              CURATED ARCHIVE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
              Explore by Category
            </h2>
          </div>

          {/* Filter Bar with Horizontal Scroll for Mobile */}
          <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#070712] border border-white/10 w-max">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-[#00C9FF] text-black font-bold shadow-[0_0_16px_rgba(0,201,255,0.45)]"
                        : "text-neutral-400 hover:text-white hover:bg-white/5 font-medium"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filtered Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedLightboxItem(item)}
              className="group relative rounded-3xl bg-[#080812] border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#00C9FF]/50 transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,201,255,0.12)] cursor-pointer"
            >
              {/* Image Container with Restrained Zoom */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/assets/images/hero_robotics_lab_1790153224618.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080812] via-transparent to-transparent opacity-80" />

                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase bg-[#000000]/70 backdrop-blur-md border border-white/15 text-[#00C9FF]">
                    {item.tag || item.category}
                  </span>
                </div>

                {/* Lightbox Expand Icon */}
                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 border border-white/15 text-white/80 group-hover:text-white group-hover:border-[#00C9FF]/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                  <Maximize2 className="w-4 h-4 text-[#00C9FF]" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  {item.subtitle && (
                    <span className="text-[11px] font-mono text-[#00C9FF] tracking-wider block">
                      {item.subtitle}
                    </span>
                  )}

                  <h3 className="text-lg font-bold font-sans text-white group-hover:text-[#00C9FF] transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Card Meta Footer */}
                <div className="pt-4 border-t border-white/5 space-y-2">
                  {item.author && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{item.author}</span>
                      {item.rating && (
                        <div className="flex items-center gap-0.5 text-[#00C9FF]">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#00C9FF]" />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {(item.institution || item.dateOrLocation) && (
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span className="truncate max-w-[180px]">
                        {item.institution || item.dateOrLocation}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#00C9FF] group-hover:translate-x-0.5 transition-transform">
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* B. PARENTS & SCHOOL FEEDBACK (Editorial Section)               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        <MotionHeadingGroup className="border-b border-white/8 pb-4">
          <div className="inline-flex items-center gap-2 typo-eyebrow text-[#00C9FF]">
            <Quote className="w-3.5 h-3.5" />
            <span>AUTHENTIC EXPERIENCES</span>
          </div>
          <h2 className="typo-h2 text-white mt-1">
            Experiences That Build Trust
          </h2>
          <p className="typo-lead text-neutral-300 max-w-3xl mt-2">
            Discover feedback and experiences from parents, educators, and school communities connected with robotics and STEM learning.
          </p>
        </MotionHeadingGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {parentReviews.map((rev) => (
            <div
              key={rev.id}
              onClick={() => setSelectedLightboxItem(rev)}
              className="p-8 rounded-3xl bg-[#080812] border border-white/10 hover:border-[#00C9FF]/40 space-y-6 flex flex-col justify-between relative group cursor-pointer transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,201,255,0.08)]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-[#00C9FF]/10 text-[#00C9FF] flex items-center justify-center border border-[#00C9FF]/20">
                    <Quote className="w-5 h-5" />
                  </div>
                  {rev.rating && (
                    <div className="flex items-center gap-1 text-[#00C9FF]">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#00C9FF]" />
                      ))}
                    </div>
                  )}
                </div>

                <h3 className="text-base font-semibold text-white group-hover:text-[#00C9FF] transition-colors">
                  "{rev.title}"
                </h3>

                <p className="text-sm text-neutral-300 italic leading-relaxed font-sans">
                  "{rev.description}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-1.5">
                <h4 className="text-sm font-semibold text-white">{rev.author}</h4>
                <p className="text-xs text-[#A9D4FF] font-mono">{rev.role}</p>
                <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-neutral-400">
                  <span>{rev.institution}</span>
                  <span>{rev.dateOrLocation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* C. SCHOOL DRIVES & ACTIVITIES                                  */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        <MotionHeadingGroup className="border-b border-white/8 pb-4">
          <div className="inline-flex items-center gap-2 typo-eyebrow text-[#00C9FF]">
            <Calendar className="w-3.5 h-3.5" />
            <span>CAMPUS ENGAGEMENT</span>
          </div>
          <h2 className="typo-h2 text-white mt-1">
            Bringing Innovation to Schools
          </h2>
          <p className="typo-lead text-neutral-300 max-w-3xl mt-2">
            Explore school visits, robotics demonstrations, STEM awareness drives, workshops, exhibitions, and hands-on learning activities.
          </p>
        </MotionHeadingGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {schoolDrivesAndWorkshops.map((drive) => (
            <div
              key={drive.id}
              onClick={() => setSelectedLightboxItem(drive)}
              className="group rounded-3xl bg-[#080812] border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#00C9FF]/40 transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                <img
                  src={drive.image}
                  alt={drive.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/assets/images/robotics_exhibition_showcase_1790153274415.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080812] via-transparent to-transparent opacity-80" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase bg-black/70 border border-white/15 text-[#00C9FF]">
                  {drive.tag}
                </span>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-sans text-white group-hover:text-[#00C9FF] transition-colors">
                    {drive.title}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {drive.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2">
                  {drive.institution && (
                    <div className="flex items-center gap-2 text-xs text-white">
                      <Building className="w-3.5 h-3.5 text-[#00C9FF] shrink-0" />
                      <span className="font-medium truncate">{drive.institution}</span>
                    </div>
                  )}
                  {drive.dateOrLocation && (
                    <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                      <MapPin className="w-3 h-3 text-[#A9D4FF] shrink-0" />
                      <span>{drive.dateOrLocation}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* D. STEM LABS & INFRASTRUCTURE                                  */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        <MotionHeadingGroup className="border-b border-white/8 pb-4">
          <div className="inline-flex items-center gap-2 typo-eyebrow text-[#00C9FF]">
            <Layers className="w-3.5 h-3.5" />
            <span>LABORATORY ENVIRONMENTS</span>
          </div>
          <h2 className="typo-h2 text-white mt-1">
            Where Future Innovators Build
          </h2>
          <p className="typo-lead text-neutral-300 max-w-3xl mt-2">
            Explore the learning environments, equipment, and practical technology experiences that support robotics, AI, and STEM education.
          </p>
        </MotionHeadingGroup>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {stemLabs.map((lab) => (
            <div
              key={lab.id}
              onClick={() => setSelectedLightboxItem(lab)}
              className="group rounded-3xl bg-[#080814] border border-white/10 hover:border-[#00C9FF]/50 overflow-hidden transition-all duration-300 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_12px_36px_rgba(0,201,255,0.15)]"
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black/60">
                <img
                  src={lab.image}
                  alt={lab.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/assets/images/ai_stem_lab_setup_1790153258870.jpg";
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* E. STUDENT PROJECTS & INNOVATION                               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        <MotionHeadingGroup className="border-b border-white/8 pb-4">
          <div className="inline-flex items-center gap-2 typo-eyebrow text-[#00C9FF]">
            <Cpu className="w-3.5 h-3.5" />
            <span>PRACTICAL HARDWARE BUILDS</span>
          </div>
          <h2 className="typo-h2 text-white mt-1">
            From Ideas to Intelligent Machines
          </h2>
          <p className="typo-lead text-neutral-300 max-w-3xl mt-2">
            Showcasing autonomous obstacle rovers, vision-guided sorting arms, telemetry nodes, and tactile student engineering experiments.
          </p>
        </MotionHeadingGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {studentProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedLightboxItem(project)}
              className="group rounded-3xl bg-[#080812] border border-white/10 hover:border-[#00C9FF]/40 overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/assets/images/student_robotics_project_1790153242579.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080812] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  {project.subtitle && (
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono tracking-wider uppercase bg-[#00C9FF]/20 border border-[#00C9FF]/40 text-[#00C9FF]">
                      {project.subtitle}
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono tracking-wider uppercase bg-black/60 border border-white/10 text-neutral-300">
                    {project.tag}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-sans text-white group-hover:text-[#00C9FF] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {project.description}
                  </p>
                </div>

                {project.techTags && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techTags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-[#A9D4FF]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* F. FINAL CONTACT CTA                                           */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-3xl p-10 sm:p-16 bg-gradient-to-b from-[#090915] to-[#040408] border border-white/15 overflow-hidden text-center space-y-8">
          {/* Ambient orbs */}
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#00C9FF]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[#250060]/35 rounded-full blur-[120px] pointer-events-none" />

          <MotionHeadingGroup className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="typo-eyebrow text-[#00C9FF] uppercase tracking-wider">
              PARTNER WITH ROBOPULSE
            </span>

            <h2 className="typo-h2 text-white">
              Let's Bring Innovation to Your School
            </h2>

            <p className="typo-lead text-neutral-300">
              Explore how RoboPulse can support your school's robotics, AI, and STEM learning initiatives.
            </p>
          </MotionHeadingGroup>

          <div className="relative z-10 flex flex-wrap justify-center gap-4">
            <ShinyButton
              size="lg"
              label="CONTACT US"
              onClick={() => navigate("/contact")}
            />
            <button
              type="button"
              onClick={() => openWhatsApp("Hello RoboPulse, I would like to inquire about school robotics activities and lab setups.")}
              className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 typo-btn text-white flex items-center gap-2 cursor-pointer transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#00C9FF]" />
              <span>Direct WhatsApp Chat</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. IMAGE LIGHTBOX MODAL                                        */}
      {/* ============================================================== */}
      <ImageLightbox
        item={selectedLightboxItem}
        onClose={() => setSelectedLightboxItem(null)}
        onPrev={handleLightboxPrev}
        onNext={handleLightboxNext}
        hasPrev={currentLightboxIndex > 0}
        hasNext={currentLightboxIndex < filteredItems.length - 1 && currentLightboxIndex !== -1}
      />
    </div>
  );
};
