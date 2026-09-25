import React, { useState, useMemo } from "react";
import { GALLERY_CATEGORIES, ALL_GALLERY_ITEMS, GalleryItem } from "../data/galleryData";
import { GalleryLightbox } from "../components/GalleryLightbox";
import { ShinyButton } from "../components/ShinyButton";
import { Search, MapPin, Calendar, Tag, Maximize2, Filter } from "lucide-react";

interface GalleryPageProps {
  navigate: (path: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ navigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    return ALL_GALLERY_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="relative pt-24 md:pt-32 pb-24 space-y-16 overflow-hidden">
      {/* Lightbox Modal */}
      <GalleryLightbox
        item={activeLightboxItem}
        items={filteredItems.length > 0 ? filteredItems : ALL_GALLERY_ITEMS}
        onClose={() => setActiveLightboxItem(null)}
        onNavigate={(newItem) => setActiveLightboxItem(newItem)}
      />

      {/* ============================================================== */}
      {/* 01 — HERO HEADER                                               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#00C9FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] animate-pulse" />
            <span>DOCUMENTATION // ARCHIVE</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.95]">
            Inside the Robopulse{" "}
            <span className="italic text-shimmer">Experience.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-sans">
            Explore authentic moments from our campus deployments, student robotics challenges, teacher enablement workshops, and state-of-the-art innovation laboratories.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 02 — FILTER TABS & SEARCH CONTROLS (#37, #38)                  */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#070710] border border-white/8">
          {/* 7 Category Filter Buttons (Prompt #37 & #96) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {GALLERY_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-[#00C9FF] text-black font-semibold shadow-[0_0_15px_rgba(0,201,255,0.4)]"
                      : "bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search builds, schools, tags..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00C9FF] font-sans"
            />
          </div>
        </div>

        {/* Counter readout */}
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 px-2">
          <span>SHOWING {filteredItems.length} RECORDED ARCHIVES</span>
          <span>ROBOPULSE GALLERY INDEX</span>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 03 — GALLERY GRID (#36, #37, #82)                              */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <div className="p-16 rounded-3xl bg-white/[0.01] border border-white/5 text-center space-y-4">
            <p className="font-display text-2xl text-neutral-400">
              No gallery items found matching your filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="text-xs font-mono text-[#00C9FF] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                className="glass-card rounded-[24px] overflow-hidden group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Image with zoom and expand button */}
                  <div className="h-60 relative overflow-hidden bg-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-transparent to-transparent opacity-80" />

                    {/* Expand Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <span className="p-3 rounded-full bg-[#00C9FF] text-black shadow-lg">
                        <Maximize2 className="w-5 h-5" />
                      </span>
                    </div>

                    <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest text-[#00C9FF] bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      {item.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-display text-2xl text-white group-hover:text-[#00C9FF] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="px-6 pb-6 pt-2 border-t border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#00C9FF] shrink-0" />
                      <span className="truncate max-w-[160px]">{item.school}</span>
                    </div>
                    <span className="font-mono text-[11px] text-neutral-500">
                      {item.date}
                    </span>
                  </div>

                  {item.tags && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.tags.slice(0, 2).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-neutral-400"
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
        )}
      </section>

      {/* ============================================================== */}
      {/* 04 — CTA SECTION                                               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-[#070712] via-[#090918] to-[#040409] border border-white/15 text-center space-y-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00C9FF]">
            FEATURE YOUR CAMPUS
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white">
            Ready to Build Next-Level Robotics on Your Campus?
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
