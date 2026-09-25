import React from "react";
import { ShinyButton } from "../components/ShinyButton";
import { Bot, Home, PhoneCall } from "lucide-react";

interface NotFoundPageProps {
  navigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ navigate }) => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-32 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#00C9FF]/10 text-[#00C9FF] flex items-center justify-center mx-auto border border-[#00C9FF]/30">
          <Bot className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00C9FF]">
            ERROR 404 // TELEMETRY INTERRUPTED
          </span>
          <h1 className="font-display text-5xl sm:text-6xl text-white">
            Signal Lost.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
            The requested robotics node or coordinate does not exist in our system registry. Reconnect to headquarters via the links below.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <ShinyButton
            label="RETURN HOME"
            size="md"
            onClick={() => navigate("/")}
          />
          <button
            onClick={() => navigate("/contact")}
            className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white tracking-wider flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-[#00C9FF]" />
            <span>Contact Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};
