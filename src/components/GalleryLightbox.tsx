import React, { useEffect } from "react";
import { GalleryItem } from "../data/galleryData";
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Tag } from "lucide-react";

interface GalleryLightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (newItem: GalleryItem) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  item,
  items,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [item, items]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate(items[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    onNavigate(items[nextIndex]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-6"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close Lightbox"
        className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Navigation */}
      <button
        onClick={handlePrev}
        aria-label="Previous Image"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-[#00C9FF] hover:text-black text-white transition-all cursor-pointer hidden sm:flex items-center justify-center"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Navigation */}
      <button
        onClick={handleNext}
        aria-label="Next Image"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-[#00C9FF] hover:text-black text-white transition-all cursor-pointer hidden sm:flex items-center justify-center"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Modal Content Box */}
      <div className="max-w-5xl w-full max-h-[90vh] flex flex-col lg:flex-row bg-[#0A0A12] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Left: Image Canvas */}
        <div className="lg:w-2/3 bg-black flex items-center justify-center relative overflow-hidden min-h-[300px] lg:min-h-[500px]">
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain max-h-[70vh]"
          />
        </div>

        {/* Right: Metadata Panel */}
        <div className="lg:w-1/3 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#0A0A12] border-t lg:border-t-0 lg:border-l border-white/10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#00C9FF]">
                {item.category}
              </span>
              <span className="font-mono text-xs text-neutral-500">
                {currentIndex + 1} / {items.length}
              </span>
            </div>

            <h3 className="font-display text-2xl text-white font-medium leading-tight">
              {item.title}
            </h3>

            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              {item.description}
            </p>

            <div className="pt-4 border-t border-white/5 space-y-2.5 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00C9FF] shrink-0" />
                <span>{item.school}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00C9FF] shrink-0" />
                <span>{item.date}</span>
              </div>
            </div>

            {item.tags && item.tags.length > 0 && (
              <div className="pt-3 border-t border-white/5">
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block mb-2">
                  Focus Tags:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile pagination controls */}
          <div className="pt-6 flex sm:hidden items-center justify-between border-t border-white/10 mt-6">
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-lg bg-white/10 text-xs font-mono text-white flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-lg bg-white/10 text-xs font-mono text-white flex items-center gap-1"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
