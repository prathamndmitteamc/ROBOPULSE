import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Building, Star, Tag } from "lucide-react";
import { GalleryItem } from "../data/galleryData";

interface ImageLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (item) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [item]);

  // Keyboard navigation: Escape to close, Left/Right arrows to navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && hasPrev) {
        onPrev();
      } else if (e.key === "ArrowRight" && hasNext) {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, hasPrev, hasNext, onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      {/* Lightbox Modal Container */}
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col lg:flex-row bg-[#080814] border border-white/15 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,201,255,0.15)] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Lightbox"
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/15 backdrop-blur-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media / Image Column */}
        <div className="relative flex-1 bg-black flex items-center justify-center min-h-[260px] sm:min-h-[360px] lg:min-h-[500px] overflow-hidden group">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain max-h-[50vh] lg:max-h-[85vh] select-none"
            loading="eager"
            onError={(e) => {
              // Fallback safe placeholder if image cannot load
              (e.currentTarget as HTMLImageElement).src =
                "/assets/images/hero_robotics_lab_1790153224618.jpg";
            }}
          />

          {/* Navigation Controls over image */}
          {hasPrev && (
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous item"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/15 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {hasNext && (
            <button
              type="button"
              onClick={onNext}
              aria-label="Next item"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/15 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Category Badge overlay on image */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[#00C9FF]/20 border border-[#00C9FF]/40 text-[#00C9FF] backdrop-blur-md">
              {item.category}
            </span>
          </div>
        </div>

        {/* Details Column */}
        <div className="w-full lg:w-[380px] p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 overflow-y-auto max-h-[40vh] lg:max-h-[85vh] space-y-6">
          <div className="space-y-4">
            {/* Tag / Eyebrow */}
            {item.tag && (
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00C9FF] uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5" />
                <span>{item.tag}</span>
              </div>
            )}

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold font-sans text-white leading-tight">
              {item.title}
            </h3>

            {/* Rating if available */}
            {item.rating && (
              <div className="flex items-center gap-1.5 text-[#00C9FF]">
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-[#00C9FF]" />
                ))}
                <span className="text-xs font-mono text-neutral-400 ml-1">
                  Verified Observation
                </span>
              </div>
            )}

            {/* Description / Quote */}
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              {item.description}
            </p>

            {/* Institution or Location info */}
            {(item.institution || item.dateOrLocation) && (
              <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs">
                {item.institution && (
                  <div className="flex items-start gap-2 text-neutral-300">
                    <Building className="w-3.5 h-3.5 text-[#00C9FF] shrink-0 mt-0.5" />
                    <span className="font-medium text-white">{item.institution}</span>
                  </div>
                )}
                {item.dateOrLocation && (
                  <div className="flex items-start gap-2 text-neutral-400">
                    <MapPin className="w-3.5 h-3.5 text-[#A9D4FF] shrink-0 mt-0.5" />
                    <span>{item.dateOrLocation}</span>
                  </div>
                )}
              </div>
            )}

            {/* Author / Role for Reviews */}
            {item.author && (
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="font-semibold text-sm text-white block">
                  {item.author}
                </span>
                {item.role && (
                  <span className="text-xs text-[#00C9FF] block mt-0.5 font-mono">
                    {item.role}
                  </span>
                )}
              </div>
            )}

            {/* Equipment Details if available */}
            {item.equipmentDetails && item.equipmentDetails.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  Featured Infrastructure:
                </span>
                <ul className="space-y-1.5">
                  {item.equipmentDetails.map((eq, i) => (
                    <li
                      key={i}
                      className="text-xs text-neutral-300 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] mt-1.5 shrink-0" />
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Tags */}
            {item.techTags && item.techTags.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  Technology Components:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.techTags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[#A9D4FF]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>ROBOPULSE SHOWCASE</span>
            <span>PRESS ESC TO CLOSE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
