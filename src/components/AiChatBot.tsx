/**
 * Robopulse Intelligence — AI Assistant Chatbot ("Pulse")
 *
 * Direct interactive conversational AI agent powered by Gemini.
 * Assists school administrators, teachers, students, and parents with:
 * - School STEM & Robotics Lab setups
 * - Curriculum & grade-wise courses
 * - Hardware kits, workstations, and safety specs
 * - Campus demonstrations and institutional consultations
 * - General STEM and robotics questions
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { openWhatsApp, CONFIG } from "../config";
import {
  Bot,
  Send,
  X,
  RotateCcw,
  Sparkles,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  Minimize2,
  Maximize2,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export interface ChatMessage {
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
      "Hello! I am **Pulse**, the official AI Technical Advisor for **Robopulse Intelligence**.\n\nI can help you explore our **School Robotics Labs**, **Grade-Wise STEM Curricula**, **Hardware Kits**, or connect you with our engineering team for an on-campus demonstration. How can I assist you today?",
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

interface AiChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  navigate?: (path: string) => void;
}

export const AiChatBot: React.FC<AiChatBotProps> = ({ isOpen, onClose, navigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem("robopulse_ai_chat_history");
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore session storage error
    }
    return INITIAL_MESSAGES;
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Save messages to session storage
  useEffect(() => {
    try {
      sessionStorage.setItem("robopulse_ai_chat_history", JSON.stringify(messages));
    } catch {
      // Ignore
    }
  }, [messages]);

  // Scroll to bottom when messages update or opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
      }, 150);
    }
  }, [messages, isOpen]);

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
      const replyContent =
        data.reply ||
        "I am ready to assist you with our robotics and AI programs. You can also explore our Courses and Services directly!";

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: replyContent,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      console.warn("Chat API error, using intelligent client fallback:", err);

      let fallbackText =
        "Thank you for your question! Robopulse Intelligence provides comprehensive Robotics Labs and grade-mapped STEM curricula for schools across India.";

      const qLower = query.toLowerCase();
      if (qLower.includes("lab") || qLower.includes("setup") || qLower.includes("school")) {
        fallbackText =
          "Robopulse provides **Turnkey STEM & Robotics Labs** with 14-day on-campus commissioning, modular workbenches, component towers, and teacher enablement.\n\nExplore our [Services Page](/services) or request an on-campus audit on our [Contact Page](/contact).";
      } else if (qLower.includes("course") || qLower.includes("class") || qLower.includes("grade")) {
        fallbackText =
          "Our courses span **Primary (Grades 1-4)**, **Middle School (Grades 5-8)**, and **Senior AI (Grades 9-12)** with real Arduino, ESP32, and OpenCV computer vision projects.\n\nCheck out the [Courses Page](/courses) for full syllabi.";
      } else if (qLower.includes("contact") || qLower.includes("phone") || qLower.includes("quote")) {
        fallbackText =
          `You can reach our institutional team directly at **${CONFIG.phoneDisplay}** or **${CONFIG.email}**. You can also schedule an on-campus demonstration via our [Contact Page](/contact).`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    try {
      sessionStorage.removeItem("robopulse_ai_chat_history");
    } catch {
      // Ignore
    }
  };

  const handleLinkClick = (url: string) => {
    if (url.startsWith("/")) {
      if (navigate) {
        navigate(url);
        // Optional: close or keep open based on preference
      } else {
        window.location.href = url;
      }
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Helper to render rich markdown in bubbles safely
  const renderFormattedContent = (content: string) => {
    // Split into paragraphs / lines
    const lines = content.split("\n");

    return (
      <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, lIdx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={lIdx} className="h-1" />;

          // Check if bullet point
          const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("* ");
          const text = isBullet ? trimmed.slice(2) : trimmed;

          // Parse bold, links, code
          const parts: React.ReactNode[] = [];
          const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
          let lastIndex = 0;
          let match: RegExpExecArray | null;

          while ((match = regex.exec(text)) !== null) {
            // Push preceding plain text
            if (match.index > lastIndex) {
              parts.push(text.slice(lastIndex, match.index));
            }

            const token = match[0];
            if (token.startsWith("[") && token.includes("](") && token.endsWith(")")) {
              // Markdown Link [Label](Url)
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
              // Bold
              parts.push(
                <strong key={`${lIdx}-${match.index}`} className="font-semibold text-white">
                  {token.slice(2, -2)}
                </strong>
              );
            } else if (token.startsWith("*") && token.endsWith("*")) {
              // Italic
              parts.push(
                <em key={`${lIdx}-${match.index}`} className="italic text-[#A9D4FF]">
                  {token.slice(1, -1)}
                </em>
              );
            } else if (token.startsWith("`") && token.endsWith("`")) {
              // Inline Code
              parts.push(
                <code
                  key={`${lIdx}-${match.index}`}
                  className="font-mono text-[11px] bg-white/10 px-1.5 py-0.5 rounded text-[#00C9FF]"
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.95 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed z-50 flex flex-col overflow-hidden bg-[#06060E] border border-white/12 shadow-[0_20px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(0,201,255,0.18)] ${
            isExpanded
              ? "inset-4 sm:inset-10 rounded-2xl md:rounded-3xl"
              : "bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[420px] max-w-[440px] h-[580px] max-h-[85vh] rounded-2xl sm:rounded-3xl"
          }`}
          role="dialog"
          aria-label="Robopulse AI Assistant"
        >
          {/* Header */}
          <div className="relative px-4 py-3.5 sm:px-5 sm:py-4 bg-gradient-to-r from-[#070714] via-[#090918] to-[#12002A] border-b border-white/10 flex items-center justify-between shrink-0 select-none">
            {/* Robot Avatar & Status */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#006CFF] to-[#00C9FF] text-black flex items-center justify-center shadow-[0_0_15px_rgba(0,201,255,0.4)]">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#06060E] animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg text-white font-medium tracking-tight">
                    Pulse AI
                  </h3>
                  <span className="text-[9px] font-mono uppercase bg-[#00C9FF]/15 text-[#00C9FF] px-1.5 py-0.5 rounded border border-[#00C9FF]/30 tracking-wider">
                    Online
                  </span>
                </div>
                <p className="text-[11px] font-mono text-neutral-400">
                  Robopulse Technical Advisor
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-1.5 text-neutral-400">
              {/* WhatsApp Human Switch */}
              <button
                type="button"
                onClick={() =>
                  openWhatsApp(
                    "Hello Robopulse, I was speaking with your AI assistant and would like to speak to a human expert."
                  )
                }
                title="Switch to Human WhatsApp Support"
                className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors text-xs flex items-center gap-1 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline text-[11px]">Human</span>
              </button>

              {/* Clear History */}
              <button
                type="button"
                onClick={handleClearChat}
                title="Reset Conversation"
                className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Expand/Collapse (Desktop) */}
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                title={isExpanded ? "Collapse Window" : "Expand Window"}
                className="hidden sm:flex p-1.5 sm:p-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                {isExpanded ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                title="Close AI Assistant"
                className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 no-scrollbar">
            {messages.map((msg) => {
              const isUser = msg.role === "user";

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    isUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  {!isUser && (
                    <div className="w-7 h-7 rounded-lg bg-[#00C9FF]/15 border border-[#00C9FF]/30 text-[#00C9FF] flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 text-xs sm:text-sm ${
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
                      className={`text-[9px] font-mono mt-1.5 flex items-center gap-1 ${
                        isUser ? "text-blue-100 justify-end" : "text-neutral-500 justify-start"
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#00C9FF]/15 border border-[#00C9FF]/30 text-[#00C9FF] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3.5 rounded-2xl rounded-tl-none bg-[#0B0B16] border border-white/10 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00C9FF] animate-bounce" />
                  <span
                    className="w-2 h-2 rounded-full bg-[#00C9FF] animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-[#00C9FF] animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                  <span className="text-[11px] font-mono text-neutral-400 pl-2">
                    Pulse is thinking...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips (when few messages or on start) */}
          {messages.length <= 3 && !isLoading && (
            <div className="px-4 py-2 border-t border-white/5 bg-[#05050C] shrink-0">
              <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1.5">
                Quick Questions:
              </span>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-[#00C9FF] hover:border-[#00C9FF]/40 transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 sm:p-4 bg-[#070710] border-t border-white/10 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about robotics labs, courses, or tech..."
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00C9FF] focus:ring-1 focus:ring-[#00C9FF] transition-all disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#006CFF] to-[#00C9FF] text-black flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all cursor-pointer shrink-0 shadow-[0_0_15px_rgba(0,201,255,0.3)]"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-black" />
              </button>
            </form>

            <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-neutral-500 px-1">
              <span>Powered by Gemini 3 Flash Intelligence</span>
              <button
                type="button"
                onClick={() =>
                  openWhatsApp(
                    "Hello Robopulse, I would like to consult with an educational engineer."
                  )
                }
                className="text-[#00C9FF] hover:underline"
              >
                Official WhatsApp →
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
