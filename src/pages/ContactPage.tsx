import React, { useState } from "react";
import { CONFIG, submitLead, openWhatsApp, LeadPayload } from "../config";
import { ShinyButton } from "../components/ShinyButton";
import { MotionHeadingGroup } from "../components/MotionHeading";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Send,
  Building,
  Clock,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<LeadPayload>({
    name: "",
    phone: "",
    email: "",
    organization: "",
    city: "",
    requirement: "Robotics Education Program",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState<string>("");
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedbackMsg("");
    setSubmittedWhatsAppUrl("");

    const submittedName = formData.name.trim();
    const result = await submitLead(formData);

    if (result.success) {
      setStatus("success");
      setFeedbackMsg(result.message);

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        organization: "",
        city: "",
        requirement: "Robotics Education Program",
        message: "",
      });

      // Prepare personalized pre-filled WhatsApp message as specified in requirement:
      // "Hello RoboPulse Intelligence! I have submitted an enquiry through your website and would like to know more about your Robotics, AI, and STEM programs. Please contact me with further details."
      const whatsappMsg = submittedName
        ? `Hello RoboPulse Intelligence! I am ${submittedName}. I have submitted an enquiry through your website and would like to know more about your Robotics, AI, and STEM programs. Please contact me with further details.`
        : `Hello RoboPulse Intelligence! I have submitted an enquiry through your website and would like to know more about your Robotics, AI, and STEM programs. Please contact me with further details.`;

      const whatsappUrl = `https://wa.me/919451226511?text=${encodeURIComponent(whatsappMsg)}`;
      setSubmittedWhatsAppUrl(whatsappUrl);

      // Attempt to open WhatsApp smoothly after confirmation; if popup is blocked, the user can click "Continue on WhatsApp" button
      setTimeout(() => {
        try {
          window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        } catch (popupErr) {
          console.warn("[WHATSAPP] Popup prevented by browser policy:", popupErr);
        }
      }, 700);
    } else {
      setStatus("error");
      setFeedbackMsg(result.message);
      setSubmittedWhatsAppUrl("");
    }
  };

  return (
    <div className="relative pt-24 md:pt-32 pb-24 space-y-20 overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#250060]/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#00C9FF]/10 rounded-full blur-[110px] pointer-events-none" />

      {/* ============================================================== */}
      {/* 01 — HERO HEADER                                               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <MotionHeadingGroup className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 typo-eyebrow text-[#00C9FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] animate-pulse" />
            <span>CONTACT // INSTITUTIONAL ENQUIRY</span>
          </div>

          <h1 className="typo-h1 text-white">
            Let's Build What{" "}
            <span className="italic text-shimmer">Comes Next.</span>
          </h1>

          <p className="typo-lead text-neutral-300">
            Bring robotics, artificial intelligence, and hands-on STEM education to your school. Submit an institutional enquiry or schedule a campus demonstration.
          </p>
        </MotionHeadingGroup>
      </section>

      {/* ============================================================== */}
      {/* 02 — FORM & DETAILS GRID (#57, #58, #59)                       */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left / Contact Information Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-[#080812] border border-white/10 space-y-6">
              <span className="typo-eyebrow text-[#00C9FF] block uppercase">
                DIRECT INSTITUTIONAL CHANNELS
              </span>

              <div className="space-y-4 text-sm">
                {/* Head Office */}
                <div className="flex items-start gap-3 text-neutral-300">
                  <div className="w-9 h-9 rounded-xl bg-white/5 text-[#00C9FF] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-[#00C9FF] uppercase tracking-wider block font-semibold">
                      {CONFIG.offices.headOffice.title}
                    </span>
                    <span className="text-white text-xs sm:text-sm font-medium block leading-snug">
                      {CONFIG.offices.headOffice.address}
                    </span>
                    <a
                      href={CONFIG.offices.headOffice.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-[#00C9FF] transition-colors"
                    >
                      <span>View on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Branch Office */}
                <div className="flex items-start gap-3 text-neutral-300 pt-2 border-t border-white/5">
                  <div className="w-9 h-9 rounded-xl bg-white/5 text-[#A9D4FF] flex items-center justify-center shrink-0 mt-0.5">
                    <Building className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-[#A9D4FF] uppercase tracking-wider block font-semibold">
                      {CONFIG.offices.branchOffice.title}
                    </span>
                    <span className="text-white text-xs sm:text-sm font-medium block leading-snug">
                      {CONFIG.offices.branchOffice.address}
                    </span>
                    <a
                      href={CONFIG.offices.branchOffice.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-[#00C9FF] transition-colors"
                    >
                      <span>View on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Email Channel */}
                <div className="flex items-start gap-3 text-neutral-300 pt-2 border-t border-white/5">
                  <div className="w-9 h-9 rounded-xl bg-white/5 text-[#00C9FF] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-neutral-500 uppercase block">Enquiries & Purchases</span>
                    <a href={`mailto:${CONFIG.email}`} className="text-white text-xs sm:text-sm hover:text-[#00C9FF] transition-colors">
                      {CONFIG.email}
                    </a>
                  </div>
                </div>

                {/* Phone Channel */}
                <div className="flex items-start gap-3 text-neutral-300">
                  <div className="w-9 h-9 rounded-xl bg-white/5 text-[#00C9FF] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-neutral-500 uppercase block">Phone Assistance</span>
                    <a href={`tel:${CONFIG.phone}`} className="text-white text-xs sm:text-sm hover:text-[#00C9FF] transition-colors">
                      {CONFIG.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout (#54) */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <span className="text-xs font-mono text-[#A9D4FF] uppercase tracking-wider block">
                  Quick Mobile Messaging:
                </span>
                <button
                  type="button"
                  onClick={() => openWhatsApp()}
                  className="w-full py-3 px-4 rounded-xl bg-[#00C9FF]/10 hover:bg-[#00C9FF]/20 border border-[#00C9FF]/30 text-xs sm:text-sm font-semibold text-[#00C9FF] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start WhatsApp Conversation</span>
                </button>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  Official Channels:
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href={CONFIG.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#00C9FF] hover:border-[#00C9FF]/50 transition-colors"
                    title="Follow on Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#00C9FF] hover:border-[#00C9FF]/50 transition-colors"
                    title="Follow on Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={CONFIG.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#00C9FF] hover:border-[#00C9FF]/50 transition-colors"
                    title="Connect on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={CONFIG.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#00C9FF] hover:border-[#00C9FF]/50 transition-colors"
                    title="Subscribe on YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick response badge */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3 text-xs text-neutral-400">
              <Clock className="w-4 h-4 text-[#00C9FF] shrink-0" />
              <span>Institutional enquiries are evaluated within 24 business hours.</span>
            </div>
          </div>

          {/* Right / Interactive Form (#58, #59, #60, #71) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#080814] border border-white/10 space-y-6">
              <MotionHeadingGroup className="space-y-1">
                <h3 className="typo-h3 text-white">
                  Institutional Enquiry Form
                </h3>
                <p className="typo-small text-neutral-400">
                  Please complete the details below. Required fields are marked with an asterisk (*).
                </p>
              </MotionHeadingGroup>

              {/* Success state banner */}
              {status === "success" && (
                <div className="p-5 rounded-2xl bg-[#00C9FF]/10 border border-[#00C9FF]/40 text-[#00C9FF] text-xs font-mono space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-[#00C9FF] mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-semibold block text-sm text-white">Enquiry Successfully Submitted!</span>
                      <p className="text-neutral-300 font-sans text-xs leading-relaxed">{feedbackMsg}</p>
                    </div>
                  </div>
                  {submittedWhatsAppUrl && (
                    <div className="pt-2 border-t border-[#00C9FF]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <span className="text-[11px] text-neutral-400 font-sans">
                        Need immediate assistance? Connect directly with our robotics engineers:
                      </span>
                      <a
                        href={submittedWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00C9FF] text-black font-semibold text-xs hover:bg-white transition-colors shrink-0"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Continue on WhatsApp</span>
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Error state banner */}
              {status === "error" && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{feedbackMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Dr. Anita Sharma"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-[#00C9FF]"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block font-medium">
                      Mobile Number * (10 Digits)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-[#00C9FF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. principal@institution.edu.in"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-[#00C9FF]"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block font-medium">
                      City / Location *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Varanasi, Lucknow, Delhi"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-[#00C9FF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* School Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block font-medium">
                      School / Organization Name *
                    </label>
                    <input
                      type="text"
                      name="organization"
                      required
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="e.g. Delhi Public School / Horizon Academy"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-[#00C9FF]"
                    />
                  </div>

                  {/* Requirement Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block font-medium">
                      Primary Requirement *
                    </label>
                    <select
                      name="requirement"
                      value={formData.requirement}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-sm sm:text-base text-white focus:outline-none focus:border-[#00C9FF]"
                    >
                      <option value="Robotics Education Program">Robotics Education Program</option>
                      <option value="AI & Emerging Technology">AI & Emerging Technology</option>
                      <option value="STEM Lab Setup">STEM Lab Setup</option>
                      <option value="Teacher Orientation">Teacher Orientation</option>
                      <option value="Robotics Exhibition / Workshop">Robotics Exhibition / Workshop</option>
                      <option value="General Campus Consultation">General Campus Consultation</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block font-medium">
                    Message / Batch Size / Specific Goals
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your student grades, timetable preferences, or campus laboratory goals..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-[#00C9FF]"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <ShinyButton
                    type="submit"
                    label={status === "loading" ? "TRANSMITTING ENQUIRY..." : "SUBMIT INSTITUTIONAL ENQUIRY"}
                    size="lg"
                    className="w-full"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
