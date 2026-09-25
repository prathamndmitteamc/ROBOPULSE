import React from "react";
import { openWhatsApp } from "../config";
import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-20 md:bottom-8 right-5 z-40 flex items-center group cursor-pointer"
      onClick={() => openWhatsApp()}
    >
      <div className="hidden sm:flex items-center mr-2 px-3 py-1.5 rounded-full bg-[#050509]/90 border border-white/10 text-white text-xs font-medium backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl pointer-events-none">
        <span className="text-[#00C9FF] mr-1.5">●</span>
        Chat with Robopulse
      </div>

      <button
        type="button"
        aria-label="Chat on WhatsApp with Robopulse"
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#006CFF] to-[#00C9FF] text-black flex items-center justify-center shadow-[0_4px_20px_rgba(0,201,255,0.4)] transition-transform duration-300 group-hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#00C9FF]"
      >
        <MessageCircle className="w-6 h-6 text-black fill-black/10" />
      </button>
    </aside>
  );
};
