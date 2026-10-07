import React from "react";
import { ShinyButton } from "../components/ShinyButton";
import { MotionHeadingGroup } from "../components/MotionHeading";
import { PARENT_AND_SCHOOL_REVIEWS, SCHOOLS, PARTNERS } from "../data/feedbackData";
import { Star, Quote, Building2, MapPin, CheckCircle, ShieldCheck } from "lucide-react";

interface ReviewsPageProps {
  navigate: (path: string) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ navigate }) => {
  return (
    <div className="relative pt-24 md:pt-32 pb-24 space-y-24 md:space-y-32 overflow-hidden">
      {/* ============================================================== */}
      {/* 01 — HERO HEADER                                               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <MotionHeadingGroup className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 typo-eyebrow text-[#00C9FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] animate-pulse" />
            <span>COMMUNITY // AUTHENTIC FEEDBACK</span>
          </div>

          <h1 className="typo-h1 text-white">
            What Parents &amp; Schools{" "}
            <span className="italic text-shimmer">Say.</span>
          </h1>

          <p className="typo-lead text-neutral-300">
            Direct observations from school administrators, science coordinators, and parents whose students engage with Robopulse robotics and STEM learning programs.
          </p>
        </MotionHeadingGroup>
      </section>

      {/* ============================================================== */}
      {/* 02 — REVIEWS & TESTIMONIALS GRID (#42)                         */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        <MotionHeadingGroup className="border-b border-white/8 pb-4">
          <span className="typo-eyebrow text-[#00C9FF] uppercase">
            VERIFIED EXPERIENCES
          </span>
          <h2 className="typo-h2 text-white mt-1">
            Testimonials from Campus Deployments
          </h2>
        </MotionHeadingGroup>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PARENT_AND_SCHOOL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-3xl bg-[#080812] border border-white/10 space-y-6 flex flex-col justify-between relative hover:border-[#00C9FF]/35 transition-colors"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[#00C9FF]/40" />

                <p className="typo-body text-neutral-200 italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-2">
                {rev.rating && (
                  <div className="flex items-center gap-1 text-[#00C9FF]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#00C9FF]" />
                    ))}
                  </div>
                )}

                <div>
                  <h4 className="typo-h5 text-white font-medium">
                    {rev.author}
                  </h4>
                  <p className="typo-small text-[#A9D4FF]">{rev.role}</p>
                  <p className="typo-eyebrow text-neutral-400 mt-0.5">
                    {rev.organization} · {rev.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 03 — VERIFIED INSTITUTIONAL COHORTS (#43)                      */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        <div className="border-b border-white/8 pb-4">
          <span className="typo-eyebrow text-[#00C9FF] uppercase">
            SCHOOL ENGAGEMENTS
          </span>
          <h2 className="typo-h2 text-white mt-1">
            Institutions &amp; Program Cohorts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SCHOOLS.map((sch, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/8 space-y-3"
            >
              <div className="flex items-center gap-2 text-[#00C9FF]">
                <Building2 className="w-4 h-4" />
                <span className="typo-eyebrow uppercase">
                  CAMPUS COHORT
                </span>
              </div>

              <h3 className="typo-h3 text-white">{sch.name}</h3>

              <div className="space-y-1.5 typo-small text-neutral-300">
                <p>
                  <span className="text-neutral-400 font-mono text-xs">Program: </span>
                  {sch.program}
                </p>
                <p>
                  <span className="text-neutral-400 font-mono text-xs">Focus: </span>
                  {sch.activity}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between typo-eyebrow text-neutral-400 border-t border-white/5">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00C9FF]" />
                  {sch.location}
                </span>
                <span>{sch.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 04 — CTA SECTION                                               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-[#070712] via-[#090918] to-[#040409] border border-white/15 text-center space-y-6">
          <span className="typo-eyebrow text-[#00C9FF] uppercase">
            JOIN OUR GROWING NETWORK
          </span>
          <h2 className="typo-h2 text-white">
            Transform Technology Education at Your School
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
