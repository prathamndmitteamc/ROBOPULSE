/**
 * Robopulse Intelligence — Dedicated AI Assistant Page (/chat or /ai-bot)
 * Allows users to access the full-page AI Bot directly.
 */

import React, { useState, useEffect, useRef } from "react";
import { openWhatsApp, CONFIG } from "../config";
import { Bot, Send, RotateCcw, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { MotionHeadingGroup } from "../components/MotionHeading";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content:
      "Hello! I am **Pulse**, the official AI Technical Advisor for **Robopulse Intelligence**.\n\nI can help you explore our **Turnkey Robotics Labs**, **Grade-Wise STEM Curricula**, **Hardware Kits**, or connect you with our engineering team for an on-campus demonstration. What would you like to know?",
    timestamp: "Just now",
  },
];

const SUGGESTED_PROMPTS = [
  "🏫 How to setup a robotics lab in our school?",
  "🎓 Which courses are for Grade 5-8 students?",
  "🤖 What hardware kits and tools are included?",
  "📋 How do we request an institutional proposal?",
  "🧠 How is AI and Computer Vision taught?",
];

interface ChatPageProps {
  navigate: (path: string) => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({ navigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem("robopulse_ai_chat_history");
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return INITIAL_MESSAGES;
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem("robopulse_ai_chat_history", JSON.stringify(messages));
    } catch {
      // Ignore
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content:
            data.reply ||
            "I am ready to help you with our robotics and AI programs. You can also explore our Courses and Services directly!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content:
            "Robopulse Intelligence provides comprehensive Robotics Labs and grade-mapped STEM curricula for schools across India.\n\nExplore our [Services Page](/services), view [Courses](/courses), or connect with our team on WhatsApp!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkClick = (url: string) => {
    if (url.startsWith("/")) {
      navigate(url);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n");

    return (
      <div className="space-y-2 text-sm sm:text-base leading-relaxed">
        {lines.map((line, lIdx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={lIdx} className="h-1" />;

          const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("* ");
          const text = isBullet ? trimmed.slice(2) : trimmed;

          const parts: React.ReactNode[] = [];
          const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
          let lastIndex = 0;
          let match: RegExpExecArray | null;

          while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
              parts.push(text.slice(lastIndex, match.index));
            }

            const token = match[0];
            if (token.startsWith("[") && token.includes("](") && token.endsWith(")")) {
              const linkMatch = token.match(/\[(.*?)\]\((.*?)\)/);
              if (linkMatch) {
                const label = linkMatch[1];
                const url = linkMatch[2];
                parts.push(
                  <button
                    key={`${lIdx}-${match.index}`}
                    onClick={() => handleLinkClick(url)}
                    className="inline-flex items-center gap-1 font-semibold text-[#00C9FF] hover:underline cursor-pointer bg-[#00C9FF]/10 px-1.5 py-0.5 rounded transition-colors"
                  >
                    <span>{label}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                );
              }
            } else if (token.startsWith("**") && token.endsWith("**")) {
              parts.push(
                <strong key={`${lIdx}-${match.index}`} className="font-semibold text-white">
                  {token.slice(2, -2)}
                </strong>
              );
            } else if (token.startsWith("*") && token.endsWith("*")) {
              parts.push(
                <em key={`${lIdx}-${match.index}`} className="italic text-[#A9D4FF]">
                  {token.slice(1, -1)}
                </em>
              );
            } else if (token.startsWith("`") && token.endsWith("`")) {
              parts.push(
                <code
                  key={`${lIdx}-${match.index}`}
                  className="font-mono text-xs bg-white/10 px-1.5 py-0.5 rounded text-[#00C9FF]"
                >
                  {token.slice(1, -1)}
                </code>
              );
            }

            lastIndex = regex.lastIndex;
          }

          if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
          }

          if (isBullet) {
            return (
              <div key={lIdx} className="flex items-start gap-2 pl-1">
                <span className="text-[#00C9FF] shrink-0 mt-1 font-bold">›</span>
                <span className="flex-1 text-neutral-200">{parts}</span>
              </div>
            );
          }

          return (
            <p key={lIdx} className="text-neutral-200">
              {parts}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative pt-24 md:pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <MotionHeadingGroup className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 typo-eyebrow text-[#00C9FF]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] animate-pulse" />
          <span>INTELLIGENT ADVISOR // GEMINI 3 FLASH</span>
        </div>

        <h1 className="typo-h1 text-white">
          Pulse <span className="italic text-shimmer">AI Assistant</span>
        </h1>

        <p className="typo-lead text-neutral-300">
          Ask questions regarding our School Robotics Labs, Grade-Wise Courses, Hardware Kits, or request an institutional proposal.
        </p>
      </MotionHeadingGroup>

      {/* Main Chat Interface */}
      <div className="rounded-3xl bg-[#070712] border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(0,201,255,0.12)] overflow-hidden flex flex-col h-[650px] max-h-[75vh]">
        {/* Top Control Bar */}
        <div className="px-6 py-4 bg-[#090918] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#006CFF] to-[#00C9FF] text-black flex items-center justify-center shadow-[0_0_15px_rgba(0,201,255,0.4)]">
              <Bot className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="text-base font-semibold text-white block">Pulse AI Advisor</span>
              <span className="text-xs font-mono text-emerald-400">● Systems Active</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                openWhatsApp(
                  "Hello Robopulse, I would like to consult with an educational engineer directly."
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono hover:bg-emerald-500/20 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Talk to Human</span>
            </button>

            <button
              onClick={() => {
                setMessages(INITIAL_MESSAGES);
                sessionStorage.removeItem("robopulse_ai_chat_history");
              }}
              title="Reset Chat"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
          {messages.map((msg) => {
            const isUser = msg.role === "user";

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${
                  isUser ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-[#00C9FF]/15 border border-[#00C9FF]/30 text-[#00C9FF] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-sm sm:text-base ${
                    isUser
                      ? "bg-gradient-to-r from-[#006CFF] to-[#00A8FF] text-white rounded-tr-none shadow-[0_4px_20px_rgba(0,108,255,0.25)]"
                      : "bg-[#0B0B16] border border-white/10 text-neutral-200 rounded-tl-none shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
                  }`}
                >
                  {isUser ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    renderFormattedContent(msg.content)
                  )}

                  <div
                    className={`text-xs font-mono mt-2 flex items-center gap-1 ${
                      isUser ? "text-blue-100 justify-end" : "text-neutral-500 justify-start"
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#00C9FF]/15 border border-[#00C9FF]/30 text-[#00C9FF] flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-none bg-[#0B0B16] border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00C9FF] animate-bounce" />
                <span
                  className="w-2 h-2 rounded-full bg-[#00C9FF] animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-[#00C9FF] animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
                <span className="text-xs font-mono text-neutral-400 pl-2">
                  Pulse is generating technical response...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 3 && !isLoading && (
          <div className="px-6 py-2.5 bg-[#05050C] border-t border-white/5 shrink-0 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-mono text-neutral-500 shrink-0">Popular:</span>
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-[#00C9FF] hover:border-[#00C9FF]/40 transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 bg-[#070710] border-t border-white/10 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Robopulse robotics, lab setups, courses, or technology..."
              disabled={isLoading}
              className="flex-1 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-[#00C9FF] focus:ring-1 focus:ring-[#00C9FF] transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 rounded-full bg-gradient-to-tr from-[#006CFF] to-[#00C9FF] text-black font-semibold text-xs tracking-wider flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,201,255,0.3)] shrink-0"
            >
              <span>SEND</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
