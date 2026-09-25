/**
 * Robopulse Intelligence — Master Home Hero Banner
 * Features an animated interactive 3D robot head & half body with active cursor gaze tracking,
 * ocular pupil kinematics, chest arc reactor pulse, dual-layer neural schematic x-ray spotlight,
 * and mechatronics HUD telemetry.
 */

import React, { useEffect, useRef, useState, useCallback } from "react";
import { openWhatsApp } from "../config";
import { MessageCircle, ArrowRight, ShieldCheck, Cpu, Bot, Zap, Eye, Crosshair } from "lucide-react";

interface RobopulseHeroProps {
  navigate: (path: string) => void;
}

export const RobopulseHero: React.FC<RobopulseHeroProps> = ({ navigate }) => {
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const backImageRef = useRef<HTMLImageElement | null>(null);
  const robotRigRef = useRef<HTMLDivElement | null>(null);

  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 260, y: 240 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [clickRipples, setClickRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [calibrationFlash, setCalibrationFlash] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Handle click on robot for neural pulse calibration shockwave
  const handleRobotClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!stackRef.current) return;
    const rect = stackRef.current.getBoundingClientRect();
    const rippleX = e.clientX - rect.left;
    const rippleY = e.clientY - rect.top;

    const newRipple = { id: Date.now(), x: rippleX, y: rippleY };
    setClickRipples((prev) => [...prev.slice(-3), newRipple]);
    setCalibrationFlash(true);
    setTimeout(() => setCalibrationFlash(false), 900);
  }, []);

  // Main 3D Head & Torso Kinematics + Canvas HUD Telemetry Render Loop
  useEffect(() => {
    if (reducedMotion) return;

    let animId: number;
    const smooth = { x: 260, y: 240 };
    const target = { x: 260, y: 240 };
    const smoothRot = { x: 0, y: 0 };
    const smoothShift = { x: 0, y: 0 };
    let isUserInteracting = false;
    let autoTime = 0;
    let reticleAngle = 0;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!stackRef.current || !canvas) return;
      const rect = stackRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Global hero pointer tracking so the robot head follows cursor across entire viewport
    const handlePointerMove = (clientX: number, clientY: number) => {
      if (!stackRef.current) return;
      const rect = stackRef.current.getBoundingClientRect();
      target.x = clientX - rect.left;
      target.y = clientY - rect.top;
      isUserInteracting = true;
      setIsHovered(true);
    };

    const onHeroMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onHeroTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onPointerLeave = () => {
      isUserInteracting = false;
      setIsHovered(false);
    };

    const heroEl = heroSectionRef.current;
    const stackEl = stackRef.current;

    if (heroEl) {
      heroEl.addEventListener("mousemove", onHeroMouseMove);
      heroEl.addEventListener("touchmove", onHeroTouchMove, { passive: true });
      heroEl.addEventListener("mouseleave", onPointerLeave);
      heroEl.addEventListener("touchend", onPointerLeave);
    }

    // Render loop
    const render = (time: number) => {
      if (!stackRef.current || !canvas) return;
      const rect = stackRef.current.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Ambient automatic autonomous scanning trajectory when idle
      if (!isUserInteracting) {
        autoTime += 0.018;
        target.x = w * 0.5 + Math.cos(autoTime * 0.9) * (w * 0.32);
        target.y = h * 0.44 + Math.sin(autoTime * 1.3) * (h * 0.24);
      }

      // Smooth mechanical easing: spring damping
      smooth.x += (target.x - smooth.x) * 0.09;
      smooth.y += (target.y - smooth.y) * 0.09;

      // Normalized coordinates (-1 to +1 from center of robot)
      const normX = Math.max(-1.5, Math.min(1.5, (smooth.x - w * 0.5) / (w * 0.5)));
      const normY = Math.max(-1.5, Math.min(1.5, (smooth.y - h * 0.48) / (h * 0.5)));

      // 3D Angle Kinematics: Robot turns head & upper torso towards cursor
      const targetRotY = normX * 18.5; // Turn left/right
      const targetRotX = -normY * 13.5; // Tilt up/down
      const targetShiftX = normX * 12; // Parallax translation
      const targetShiftY = normY * 8;

      smoothRot.x += (targetRotX - smoothRot.x) * 0.09;
      smoothRot.y += (targetRotY - smoothRot.y) * 0.09;
      smoothShift.x += (targetShiftX - smoothShift.x) * 0.09;
      smoothShift.y += (targetShiftY - smoothShift.y) * 0.09;

      // Apply 3D perspective transform to the robot rig
      if (robotRigRef.current) {
        robotRigRef.current.style.transform = `
          perspective(1100px)
          rotateX(${smoothRot.x.toFixed(2)}deg)
          rotateY(${smoothRot.y.toFixed(2)}deg)
          translate3d(${smoothShift.x.toFixed(2)}px, ${smoothShift.y.toFixed(2)}px, 0px)
        `;
      }

      setMousePos({ x: Math.round(smooth.x), y: Math.round(smooth.y) });

      // Dual-Layer CSS Mask for Internal Neural Blueprint Scanner
      if (backImageRef.current) {
        const spotlightRadius = 195;
        const maskGradient = `radial-gradient(circle ${spotlightRadius}px at ${smooth.x}px ${smooth.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 64%, rgba(0,0,0,0.4) 82%, rgba(0,0,0,0) 100%)`;
        backImageRef.current.style.webkitMaskImage = maskGradient;
        backImageRef.current.style.maskImage = maskGradient;
      }

      // Canvas Mechatronic HUD Rendering
      ctx.clearRect(0, 0, w, h);
      ctx.save();

      reticleAngle += 0.025;

      const reticleRadius = 48;

      // 1. Cursor Target Reticle with Rotary Angle Ticks
      ctx.save();
      ctx.translate(smooth.x, smooth.y);

      // Rotating dashed outer ring
      ctx.rotate(reticleAngle);
      ctx.beginPath();
      ctx.arc(0, 0, reticleRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 201, 255, 0.45)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([8, 12]);
      ctx.stroke();

      // Counter-rotating inner ring
      ctx.rotate(-reticleAngle * 2);
      ctx.beginPath();
      ctx.arc(0, 0, reticleRadius * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(169, 212, 255, 0.55)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();

      // 4 Precision corner brackets [ ]
      const bSize = 14;
      ctx.setLineDash([]);
      ctx.strokeStyle = "rgba(0, 201, 255, 0.9)";
      ctx.lineWidth = 1.5;

      // Top-Left bracket
      ctx.beginPath();
      ctx.moveTo(-reticleRadius - 6, -reticleRadius + bSize);
      ctx.lineTo(-reticleRadius - 6, -reticleRadius - 6);
      ctx.lineTo(-reticleRadius + bSize, -reticleRadius - 6);
      ctx.stroke();

      // Top-Right bracket
      ctx.beginPath();
      ctx.moveTo(reticleRadius + 6 - bSize, -reticleRadius - 6);
      ctx.lineTo(reticleRadius + 6, -reticleRadius - 6);
      ctx.lineTo(reticleRadius + 6, -reticleRadius + bSize);
      ctx.stroke();

      // Bottom-Left bracket
      ctx.beginPath();
      ctx.moveTo(-reticleRadius - 6, reticleRadius - bSize);
      ctx.lineTo(-reticleRadius - 6, reticleRadius + 6);
      ctx.lineTo(-reticleRadius + bSize, reticleRadius + 6);
      ctx.stroke();

      // Bottom-Right bracket
      ctx.beginPath();
      ctx.moveTo(reticleRadius + 6 - bSize, reticleRadius + 6);
      ctx.lineTo(reticleRadius + 6, reticleRadius + 6);
      ctx.lineTo(reticleRadius + 6, reticleRadius - bSize);
      ctx.stroke();

      ctx.restore();

      // 2. Optical Gaze Vector Beam: From Robot Eyes (Center approx w*0.5, h*0.27) to Cursor
      const eyeOriginX = w * 0.5 + smoothShift.x;
      const eyeOriginY = h * 0.27 + smoothShift.y;

      const beamGradient = ctx.createLinearGradient(eyeOriginX, eyeOriginY, smooth.x, smooth.y);
      beamGradient.addColorStop(0, "rgba(0, 201, 255, 0.45)");
      beamGradient.addColorStop(0.7, "rgba(0, 201, 255, 0.15)");
      beamGradient.addColorStop(1, "rgba(0, 201, 255, 0.7)");

      ctx.beginPath();
      ctx.moveTo(eyeOriginX - 14, eyeOriginY);
      ctx.lineTo(smooth.x, smooth.y);
      ctx.moveTo(eyeOriginX + 14, eyeOriginY);
      ctx.lineTo(smooth.x, smooth.y);
      ctx.strokeStyle = beamGradient;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Central Crosshair at Cursor
      ctx.beginPath();
      ctx.moveTo(smooth.x - 8, smooth.y);
      ctx.lineTo(smooth.x + 8, smooth.y);
      ctx.moveTo(smooth.x, smooth.y - 8);
      ctx.lineTo(smooth.x, smooth.y + 8);
      ctx.strokeStyle = "rgba(0, 201, 255, 0.95)";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Center point
      ctx.beginPath();
      ctx.arc(smooth.x, smooth.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();

      // 4. Cursor targeting indicator
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(0, 201, 255, 0.85)";
      ctx.fillText(`TARGET // ${Math.round(smooth.x)}, ${Math.round(smooth.y)}`, smooth.x + 20, smooth.y - 10);

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
      if (heroEl) {
        heroEl.removeEventListener("mousemove", onHeroMouseMove);
        heroEl.removeEventListener("touchmove", onHeroTouchMove);
        heroEl.removeEventListener("mouseleave", onPointerLeave);
        heroEl.removeEventListener("touchend", onPointerLeave);
      }
    };
  }, [reducedMotion]);

  // Calculate normalized ocular pupil offsets
  const pupilOffsetX = (mousePos.x - 260) / 32;
  const pupilOffsetY = (mousePos.y - 140) / 32;
  const boundedPupilX = Math.max(-7, Math.min(7, pupilOffsetX));
  const boundedPupilY = Math.max(-5, Math.min(5, pupilOffsetY));

  return (
    <section
      ref={heroSectionRef}
      className="robopulse-hero relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#000000] select-none"
      aria-label="Robopulse Intelligence Interactive Hero"
    >
      {/* ============================================================== */}
      {/* 01 — SCOPED FUTURISTIC BACKGROUND & AMBIENT GLOW               */}
      {/* ============================================================== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 70% 38%, rgba(0,201,255,0.14), transparent 35%),
            radial-gradient(circle at 30% 60%, rgba(37,0,96,0.25), transparent 40%),
            #050509
          `,
        }}
      />

      {/* Cybernetic Precision Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,201,255,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,201,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Floating Ambient Glow Orbs */}
      <div
        className="robopulse-hero-orb absolute top-12 left-1/4 w-[460px] h-[460px] rounded-full pointer-events-none"
        style={{
          background: "rgba(0,201,255,0.13)",
          filter: "blur(70px)",
          animation: reducedMotion ? "none" : "heroOrbFloat1 8s ease-in-out infinite",
        }}
      />
      <div
        className="robopulse-hero-orb absolute bottom-16 right-12 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "rgba(37,0,96,0.22)",
          filter: "blur(70px)",
          animation: reducedMotion ? "none" : "heroOrbFloat2 12s ease-in-out infinite",
        }}
      />

      {/* ============================================================== */}
      {/* 02 — HERO CONTENT CONTAINER (Desktop Split Layout)             */}
      {/* ============================================================== */}
      <div className="robopulse-hero-inner relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* ---------------------------------------------------------- */}
          {/* LEFT: EDITORIAL COPY & CALL TO ACTION                      */}
          {/* ---------------------------------------------------------- */}
          <div className="robopulse-hero-content lg:col-span-7 space-y-7 sm:space-y-8">
            
            {/* Step 1: Eyebrow + Status indicator */}
            <div
              className="space-y-2"
              style={{
                animation: reducedMotion ? "none" : "heroFadeIn 0.7s cubic-bezier(.16,1,.3,1) 0.1s both",
              }}
            >
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono tracking-[0.2em] text-[#00C9FF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] animate-pulse" />
                <span className="font-semibold">ROBOPULSE INTELLIGENCE</span>
              </div>
              <div className="text-[11px] font-mono tracking-[0.22em] text-[#A9D4FF]/75 uppercase pl-1 flex items-center gap-2">
                <span>ROBOTICS</span>
                <span className="text-[#00C9FF]">◆</span>
                <span>AI VISION</span>
                <span className="text-[#00C9FF]">◆</span>
                <span>STEM EDUCATION</span>
              </div>
            </div>

            {/* Step 2: Main Hero Heading */}
            <h1
              className="robopulse-hero-title font-display text-5xl sm:text-7xl lg:text-[84px] leading-[0.92] text-white tracking-[-0.04em] font-normal"
              style={{
                animation: reducedMotion ? "none" : "heroSlideUp 0.8s cubic-bezier(.16,1,.3,1) 0.2s both",
              }}
            >
              Building the Intelligence{" "}
              <span className="block text-shimmer italic font-normal">
                Behind Tomorrow.
              </span>
            </h1>

            {/* Step 3: Supporting Copy */}
            <p
              className="text-base sm:text-lg text-neutral-300 max-w-xl font-sans font-normal leading-relaxed"
              style={{
                animation: reducedMotion ? "none" : "heroSlideUp 0.8s cubic-bezier(.16,1,.3,1) 0.35s both",
              }}
            >
              Empowering the next generation through Robotics, Artificial Intelligence and Future-Ready STEM Education. Experience practical training with autonomous mechatronics.
            </p>

            {/* Step 4: Primary CTA + WhatsApp Secondary */}
            <div
              className="flex flex-wrap items-center gap-4 pt-2"
              style={{
                animation: reducedMotion ? "none" : "heroSlideUp 0.8s cubic-bezier(.16,1,.3,1) 0.5s both",
              }}
            >
              {/* Primary Conic Shiny Border CTA */}
              <div className="relative p-[1px] rounded-full overflow-hidden inline-block group">
                <div
                  className="absolute inset-[-100%] rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0%, #250060 40%, #00C9FF 50%, transparent 60%)",
                    animation: reducedMotion ? "none" : "heroConicSpin 4s linear infinite",
                  }}
                />

                <button
                  onClick={() => navigate("/contact")}
                  className="relative px-8 py-4 rounded-full bg-[#050509] text-white text-xs sm:text-sm font-semibold tracking-wider flex items-center gap-2.5 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_0_25px_rgba(0,201,255,0.4)] cursor-pointer"
                >
                  <span>GET STARTED</span>
                  <ArrowRight className="w-4 h-4 text-[#00C9FF] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Secondary WhatsApp Action */}
              <button
                type="button"
                onClick={() => openWhatsApp("Hello Robopulse, I would like to explore your Robotics & AI programs.")}
                className="px-6 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-xs sm:text-sm font-semibold tracking-wider text-neutral-200 hover:text-white transition-all flex items-center gap-2 hover:border-[#00C9FF]/40 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#00C9FF]" />
                <span>WhatsApp Enquiries</span>
              </button>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* RIGHT: ANIMATED 3D ROBOT HEAD & HALF BODY REACTING TO CURSOR */}
          {/* ---------------------------------------------------------- */}
          <div
            className="robopulse-hero-visual lg:col-span-5 relative"
            style={{
              animation: reducedMotion ? "none" : "heroVisualEntrance 0.9s cubic-bezier(.16,1,.3,1) 0.45s both",
            }}
          >
            {/* Breathing & Floating Animation Wrapper */}
            <div
              className="relative mx-auto max-w-md lg:max-w-none"
              style={{
                animation: reducedMotion ? "none" : "heroFloat 6s ease-in-out infinite",
              }}
            >
              {/* Outer Cyan Rim & Purple Ambient Light */}
              <div className="absolute -inset-2 bg-gradient-to-br from-[#00C9FF]/25 via-[#006CFF]/20 to-[#250060]/40 rounded-[32px] blur-xl opacity-90 pointer-events-none" />

              {/* Main Interactive Robot Viewport Stack */}
              <div
                ref={stackRef}
                onClick={handleRobotClick}
                className="hero-stack relative rounded-[28px] overflow-hidden border border-[rgba(0,201,255,0.22)] bg-[#050509] shadow-2xl cursor-crosshair select-none group"
                style={{ height: "520px" }}
              >
                {/* 3D Transform Rig Container (Smoothly Tilts & Turns to Cursor) */}
                <div
                  ref={robotRigRef}
                  className="robot-rig absolute inset-0 w-full h-full transition-transform duration-75 ease-out"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* LAYER 1: Front Robot Head & Half Body (High-Tech Photorealistic) */}
                  <img
                    src="/src/assets/images/interactive_robot_head_body_1790353827292.jpg"
                    alt="Autonomous AI Robot Head and Half Body"
                    referrerPolicy="no-referrer"
                    className="hero-front absolute inset-0 w-full h-full object-cover object-center scale-[1.03] transition-transform duration-300"
                  />

                  {/* High-tech Vignette Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* LAYER 2: Back Mechatronic Neural Blueprint Scanner (Revealed at Cursor) */}
                  <img
                    ref={backImageRef}
                    src="/src/assets/images/robot_internal_schematic_1790353848882.jpg"
                    alt="Robot internal neural blueprint scan"
                    aria-hidden="true"
                    referrerPolicy="no-referrer"
                    className="hero-back absolute inset-0 w-full h-full object-cover object-center scale-[1.03] pointer-events-none"
                    style={{
                      willChange: "mask-image, -webkit-mask-image",
                    }}
                  />

                  {/* ACTIVE OCULAR SENSORS / EYES TRACKING CURSOR */}
                  {/* Left Eye Pupil */}
                  <div
                    className="absolute top-[26.4%] left-[45.2%] w-3 h-3 rounded-full pointer-events-none flex items-center justify-center"
                    style={{
                      boxShadow: "0 0 16px #00C9FF, inset 0 0 4px #FFFFFF",
                      backgroundColor: "rgba(0, 201, 255, 0.4)",
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#00C9FF]"
                      style={{
                        transform: `translate(${boundedPupilX}px, ${boundedPupilY}px)`,
                        transition: "transform 0.05s ease-out",
                      }}
                    />
                  </div>

                  {/* Right Eye Pupil */}
                  <div
                    className="absolute top-[26.4%] left-[54.8%] w-3 h-3 rounded-full pointer-events-none flex items-center justify-center"
                    style={{
                      boxShadow: "0 0 16px #00C9FF, inset 0 0 4px #FFFFFF",
                      backgroundColor: "rgba(0, 201, 255, 0.4)",
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#00C9FF]"
                      style={{
                        transform: `translate(${boundedPupilX}px, ${boundedPupilY}px)`,
                        transition: "transform 0.05s ease-out",
                      }}
                    />
                  </div>

                  {/* CHEST ARC REACTOR PULSING CORE */}
                  <div
                    className="absolute top-[62%] left-1/2 -translate-x-1/2 w-14 h-14 rounded-full pointer-events-none flex items-center justify-center"
                    style={{
                      background: "radial-gradient(circle, rgba(0,201,255,0.45) 0%, rgba(37,0,96,0.2) 65%, transparent 100%)",
                      animation: "reactorPulse 2.4s ease-in-out infinite",
                    }}
                  >
                    {/* Inner glowing core ring */}
                    <div className="w-8 h-8 rounded-full border border-[#00C9FF]/60 flex items-center justify-center animate-spin" style={{ animationDuration: "10s" }}>
                      <div className="w-4 h-4 rounded-full bg-[#00C9FF]/80 shadow-[0_0_14px_#00C9FF]" />
                    </div>
                  </div>

                  {/* Click Ripple Shockwaves */}
                  {clickRipples.map((ripple) => (
                    <span
                      key={ripple.id}
                      className="absolute rounded-full border border-[#00C9FF] pointer-events-none"
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: 20,
                        height: 20,
                        transform: "translate(-50%, -50%)",
                        animation: "rippleExpand 0.75s cubic-bezier(0.1, 0.8, 0.3, 1) forwards",
                      }}
                    />
                  ))}
                </div>

                {/* LAYER 3: Dynamic Canvas HUD Telemetry & Crosshair Layer */}
                <canvas
                  ref={canvasRef}
                  className="hero-mask-canvas absolute inset-0 w-full h-full pointer-events-none z-10"
                  aria-hidden="true"
                />

                {/* Top Corner Technical HUD Badge */}
                <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-xs font-mono z-20 pointer-events-none">
                  <div className="flex items-center gap-2 text-[#00C9FF]">
                    <span className="w-2 h-2 rounded-full bg-[#00C9FF] animate-ping" />
                    <span className="font-semibold tracking-wider text-[11px]">NEURAL MK-IV // ACTIVE</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-300 mt-0.5">
                    <Crosshair className="w-3 h-3 text-[#00C9FF]" />
                    <span>ACTIVE 3D MECHATRONICS</span>
                  </div>
                </div>

                {/* Top Right Status Badge */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-[#00C9FF]/30 text-[10px] font-mono text-[#00C9FF] z-20 pointer-events-none hidden sm:flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF] animate-pulse" />
                  <span>AUTONOMOUS RIG</span>
                </div>

                {/* Click Flash Feedback Banner */}
                {calibrationFlash && (
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 px-3 py-1.5 rounded-lg bg-[#00C9FF]/20 border border-[#00C9FF] backdrop-blur-md text-[11px] font-mono text-white flex items-center gap-2 animate-bounce">
                    <Zap className="w-3.5 h-3.5 text-[#00C9FF]" />
                    <span>SENSORY LOCK RE-CALIBRATED</span>
                  </div>
                )}

                {/* Bottom Interactive Glass Control Panel */}
                <div
                  className="absolute bottom-4 left-4 right-4 p-4 rounded-[22px] z-20 pointer-events-none"
                  style={{
                    background: "rgba(10, 10, 16, 0.78)",
                    border: "1px solid rgba(0, 201, 255, 0.2)",
                    backdropFilter: "blur(18px)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00C9FF]" />
                      <span className="text-[10px] font-mono tracking-widest text-[#00C9FF] uppercase font-semibold">
                        ROBOTIC PERCEPTION LAYER
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">
                      MOVE CURSOR TO ROTATE RIG
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 text-xs">
                    <p className="font-display text-white text-sm sm:text-base">
                      Interactive Autonomous Mechatronics
                    </p>
                    <span className="text-[10px] font-mono text-[#A9D4FF] bg-[#00C9FF]/10 px-2 py-0.5 rounded border border-[#00C9FF]/25">
                      FPS: 60 // 3D RIG
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================== */}
      {/* 03 — SCOPED CSS ANIMATIONS                                     */}
      {/* ============================================================== */}
      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes heroSlideUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroVisualEntrance {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(18px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes heroFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes reactorPulse {
          0%, 100% {
            transform: translate(-50%, 0) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, 0) scale(1.15);
            opacity: 1;
          }
        }

        @keyframes rippleExpand {
          0% {
            width: 0px;
            height: 0px;
            opacity: 1;
          }
          100% {
            width: 320px;
            height: 320px;
            opacity: 0;
          }
        }

        @keyframes heroOrbFloat1 {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes heroOrbFloat2 {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-24px) scale(1.06);
          }
        }

        @keyframes heroConicSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .robopulse-hero,
          .robopulse-hero *,
          .hero-stack,
          .hero-front,
          .hero-back,
          .robot-rig,
          .robopulse-hero-orb {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};
