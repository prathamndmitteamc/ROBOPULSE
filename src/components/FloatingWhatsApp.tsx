import React, { useState, useEffect } from "react";
import { Bot, Sparkles, X, MessageSquare } from "lucide-react";
import { AiChatBot } from "./AiChatBot";

interface FloatingWhatsAppProps {
  navigate?: (path: string) => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ navigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnreadPulse, setHasUnreadPulse] = useState(true);

  // Global window listener so any button can open the AI assistant
  useEffect(() => {
    (window as unknown as { openAiChatBot?: () => void }).openAiChatBot = () => {
      setIsOpen(true);
      setHasUnreadPulse(false);
    };

    return () => {
      delete (window as unknown as { openAiChatBot?: () => void }).openAiChatBot;
    };
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setHasUnreadPulse(false);
  };

  return (
    <>
      {/* Side Message / AI Assistant Floating Trigger */}
      <aside
        aria-label="Ask Robopulse AI Technical Advisor"
        className="fixed bottom-20 md:bottom-8 right-5 z-40 flex items-center group cursor-pointer select-none"
      >
        {/* Tooltip on hover */}
        {!isOpen && (
          <div
            onClick={handleToggle}
            className="hidden sm:flex items-center gap-2 mr-2.5 px-3.5 py-2 rounded-full bg-[#080814]/95 border border-white/12 text-white text-xs font-medium backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(0,201,255,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#00C9FF] animate-pulse" />
            <span className="font-semibold text-white">Ask Robopulse AI</span>
            <span className="text-[10px] font-mono text-[#00C9FF] bg-[#00C9FF]/10 px-1.5 py-0.5 rounded border border-[#00C9FF]/30">
              Pulse
            </span>
          </div>
        )}

        {/* Floating Side Button */}
        <button
          type="button"
          onClick={handleToggle}
          aria-label={isOpen ? "Close AI Assistant" : "Open Robopulse AI Assistant"}
          className={`relative w-13 h-13 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_4px_25px_rgba(0,201,255,0.45)] group-hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#00C9FF] cursor-pointer ${
            isOpen
              ? "bg-[#090916] border border-white/20 text-white shadow-none"
              : "bg-gradient-to-tr from-[#006CFF] via-[#00C9FF] to-[#A9D4FF] text-black"
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              {/* Pulsing Beacon Ring */}
              <span className="absolute -inset-1 rounded-full bg-[#00C9FF]/30 animate-ping opacity-60 pointer-events-none" />

              {/* Central Bot Icon */}
              <div className="relative flex items-center justify-center">
                <Bot className="w-6 h-6 text-black" />
                <Sparkles className="w-3 h-3 text-[#18003F] absolute -top-1 -right-1" />
              </div>

              {/* Unread Indicator Badge */}
              {hasUnreadPulse && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#030303] shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              )}
            </>
          )}
        </button>
      </aside>

      {/* AI Bot Chatbot Modal / Drawer */}
      <AiChatBot isOpen={isOpen} onClose={() => setIsOpen(false)} navigate={navigate} />
    </>
  );
};
