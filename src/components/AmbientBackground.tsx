/**
 * Robopulse Intelligence — Dynamic Responsive Ambient Background
 *
 * Implements a dynamic, responsive ambient background featuring slowly moving
 * organic light gradients that continuously drift and subtly respond to the user's cursor.
 *
 * Robopulse Brand Colors:
 * - Electric Cyan: #00C9FF
 * - Bright Blue: #006CFF
 * - Cyber Purple: #250060
 *
 * Key Architecture:
 * - 4 large heavily blurred radial gradient light orbs (low opacity, fluid flowing light)
 * - GPU-friendly requestAnimationFrame loop with translate3d & will-change: transform
 * - Exponential lerp interpolation for silky-smooth delayed/parallax cursor attraction
 * - Automatic graceful multi-frequency organic drifting on mobile/touch & idle
 * - Strictly respects prefers-reduced-motion
 */

import React, { useEffect, useRef } from "react";

interface OrbConfig {
  id: number;
  colorName: "cyan" | "purple" | "blue" | "purple-cyan" | "cyan-highlight";
  background: string;
  width: number;
  height: number;
  anchorX: number; // 0 to 1 percentage of viewport width
  anchorY: number; // 0 to 1 percentage of viewport height
  blur: number;
  // Multi-frequency sinusoidal drift parameters
  driftFreqX1: number;
  driftFreqY1: number;
  driftFreqX2: number;
  driftFreqY2: number;
  driftAmpX: number;
  driftAmpY: number;
  scaleFreq: number;
  scaleAmp: number;
  phase: number;
}

const ORBS: OrbConfig[] = [
  // 1. Electric Cyan Primary Glow (Top-Left / Center Drift)
  {
    id: 1,
    colorName: "cyan",
    background:
      "radial-gradient(circle, rgba(0, 201, 255, 0.15) 0%, rgba(0, 201, 255, 0.07) 35%, rgba(0, 201, 255, 0.015) 60%, transparent 75%)",
    width: 780,
    height: 780,
    anchorX: 0.22,
    anchorY: 0.22,
    blur: 120,
    driftFreqX1: 0.00032,
    driftFreqY1: 0.00026,
    driftFreqX2: 0.00015,
    driftFreqY2: 0.00018,
    driftAmpX: 90,
    driftAmpY: 80,
    scaleFreq: 0.00018,
    scaleAmp: 0.07,
    phase: 0.0,
  },
  // 2. Cyber Purple Deep Atmosphere (Top-Right / Mid Drift)
  {
    id: 2,
    colorName: "purple",
    background:
      "radial-gradient(circle, rgba(37, 0, 96, 0.32) 0%, rgba(37, 0, 96, 0.18) 40%, rgba(37, 0, 96, 0.04) 65%, transparent 80%)",
    width: 880,
    height: 880,
    anchorX: 0.78,
    anchorY: 0.32,
    blur: 140,
    driftFreqX1: 0.00028,
    driftFreqY1: 0.00034,
    driftFreqX2: 0.00014,
    driftFreqY2: 0.00022,
    driftAmpX: 110,
    driftAmpY: 95,
    scaleFreq: 0.00014,
    scaleAmp: 0.08,
    phase: 1.6,
  },
  // 3. Bright Blue Energy Core (Mid-Bottom / Center Drift)
  {
    id: 3,
    colorName: "blue",
    background:
      "radial-gradient(circle, rgba(0, 108, 255, 0.16) 0%, rgba(0, 108, 255, 0.08) 35%, rgba(0, 108, 255, 0.015) 60%, transparent 75%)",
    width: 740,
    height: 740,
    anchorX: 0.48,
    anchorY: 0.70,
    blur: 125,
    driftFreqX1: 0.00024,
    driftFreqY1: 0.00038,
    driftFreqX2: 0.00017,
    driftFreqY2: 0.00012,
    driftAmpX: 95,
    driftAmpY: 85,
    scaleFreq: 0.00022,
    scaleAmp: 0.06,
    phase: 3.2,
  },
  // 4. Cyber Purple & Electric Cyan Dual Depth (Bottom-Left Drift)
  {
    id: 4,
    colorName: "purple-cyan",
    background:
      "radial-gradient(circle, rgba(37, 0, 96, 0.28) 0%, rgba(0, 201, 255, 0.08) 42%, rgba(37, 0, 96, 0.02) 65%, transparent 80%)",
    width: 820,
    height: 820,
    anchorX: 0.14,
    anchorY: 0.82,
    blur: 135,
    driftFreqX1: 0.00036,
    driftFreqY1: 0.00024,
    driftFreqX2: 0.00018,
    driftFreqY2: 0.00016,
    driftAmpX: 100,
    driftAmpY: 90,
    scaleFreq: 0.00016,
    scaleAmp: 0.07,
    phase: 4.8,
  },
  // 5. Electric Cyan / Bright Blue Zenith Accent (Upper-Right Drift)
  {
    id: 5,
    colorName: "cyan-highlight",
    background:
      "radial-gradient(circle, rgba(0, 201, 255, 0.11) 0%, rgba(0, 108, 255, 0.05) 35%, transparent 70%)",
    width: 620,
    height: 620,
    anchorX: 0.65,
    anchorY: 0.15,
    blur: 110,
    driftFreqX1: 0.00030,
    driftFreqY1: 0.00042,
    driftFreqX2: 0.00013,
    driftFreqY2: 0.00020,
    driftAmpX: 75,
    driftAmpY: 70,
    scaleFreq: 0.00020,
    scaleAmp: 0.05,
    phase: 5.6,
  },
];

export const AmbientBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let isReduced = prefersReducedMotion.matches;
    const onReducedMotionChange = (e: MediaQueryListEvent) => {
      isReduced = e.matches;
    };
    prefersReducedMotion.addEventListener("change", onReducedMotionChange);

    // Track viewport size
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    const onResize = () => {
      winWidth = window.innerWidth;
      winHeight = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Track touch capability
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Mouse tracking state with idle decay
    const mouse = {
      x: winWidth * 0.5,
      y: winHeight * 0.5,
      active: false,
      lastMoveTime: 0,
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // Touch devices use pure automatic organic flow
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      mouse.lastMoveTime = performance.now();
    };

    const onMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // Initialize orb position tracking state
    const orbStates = ORBS.map(() => ({
      currentX: 0,
      currentY: 0,
      currentScale: 1,
      targetX: 0,
      targetY: 0,
      targetScale: 1,
    }));

    let animId: number;

    const render = (time: number) => {
      // If user prefers reduced motion, set orbs to static base positions and halt RAF
      if (isReduced) {
        orbRefs.current.forEach((el) => {
          if (el) {
            el.style.transform = "translate3d(0, 0, 0) scale(1)";
          }
        });
        return;
      }

      // Check if mouse interaction has gone idle (decay back to center after 3.5s)
      const timeSinceMove = performance.now() - mouse.lastMoveTime;
      const mouseWeight =
        isTouchDevice || !mouse.active
          ? 0
          : Math.max(0, 1 - timeSinceMove / 3500);

      // 1. Calculate each orb's natural organic sinusoidal drift
      const orbCenters: { x: number; y: number; index: number }[] = [];

      ORBS.forEach((orb, i) => {
        const baseX = winWidth * orb.anchorX - orb.width * 0.5;
        const baseY = winHeight * orb.anchorY - orb.height * 0.5;

        // Multi-frequency smooth harmonic drift
        const driftX =
          Math.sin(time * orb.driftFreqX1 + orb.phase) * orb.driftAmpX * 0.65 +
          Math.cos(time * orb.driftFreqX2 + orb.phase * 0.5) *
            orb.driftAmpX *
            0.35;

        const driftY =
          Math.cos(time * orb.driftFreqY1 + orb.phase) * orb.driftAmpY * 0.65 +
          Math.sin(time * orb.driftFreqY2 + orb.phase * 0.5) *
            orb.driftAmpY *
            0.35;

        const scale =
          1 + Math.sin(time * orb.scaleFreq + orb.phase) * orb.scaleAmp;

        // Visual center in viewport coordinates
        const visualCenterX = baseX + driftX + orb.width * 0.5;
        const visualCenterY = baseY + driftY + orb.height * 0.5;

        orbCenters.push({
          x: visualCenterX,
          y: visualCenterY,
          index: i,
        });

        // Store base + drift in state
        orbStates[i].targetX = driftX;
        orbStates[i].targetY = driftY;
        orbStates[i].targetScale = scale;
      });

      // 2. Identify nearest orb to the cursor for gentle attraction + subtle parallax for others
      if (mouseWeight > 0.01) {
        let nearestIndex = 0;
        let minDistance = Infinity;

        orbCenters.forEach(({ x, y, index }) => {
          const dist = Math.hypot(mouse.x - x, mouse.y - y);
          if (dist < minDistance) {
            minDistance = dist;
            nearestIndex = index;
          }
        });

        // Apply cursor influence:
        // - Nearest orb gently shifts towards the cursor
        // - Further orbs experience subtle multi-depth parallax
        const normMouseX = (mouse.x / winWidth - 0.5) * 2; // -1 to 1
        const normMouseY = (mouse.y / winHeight - 0.5) * 2; // -1 to 1

        ORBS.forEach((_, i) => {
          if (i === nearestIndex) {
            const nearestCenter = orbCenters[i];
            const dx = mouse.x - nearestCenter.x;
            const dy = mouse.y - nearestCenter.y;
            // Clamped, subtle spring pull (maximum ~75px)
            const pullFactor = Math.min(1, Math.max(0.15, 1 - minDistance / 900));
            const attractionX = dx * 0.12 * pullFactor * mouseWeight;
            const attractionY = dy * 0.12 * pullFactor * mouseWeight;

            orbStates[i].targetX += attractionX;
            orbStates[i].targetY += attractionY;
            orbStates[i].targetScale *= 1 + 0.04 * mouseWeight;
          } else {
            // Subtle 3D-depth parallax shift on non-nearest orbs
            const depthFactor = (i % 2 === 0 ? 1 : -1) * (18 + i * 4);
            orbStates[i].targetX += normMouseX * depthFactor * mouseWeight;
            orbStates[i].targetY += normMouseY * depthFactor * mouseWeight;
          }
        });
      }

      // 3. Smooth exponential interpolation (lerp damping: 0.032) for liquid fluid motion
      const lerpFactor = 0.032;

      ORBS.forEach((_, i) => {
        const state = orbStates[i];
        state.currentX += (state.targetX - state.currentX) * lerpFactor;
        state.currentY += (state.targetY - state.currentY) * lerpFactor;
        state.currentScale +=
          (state.targetScale - state.currentScale) * lerpFactor;

        const el = orbRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${state.currentX.toFixed(2)}px, ${state.currentY.toFixed(2)}px, 0) scale(${state.currentScale.toFixed(3)})`;
        }
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      prefersReducedMotion.removeEventListener("change", onReducedMotionChange);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0 bg-[#030303]"
      style={{
        // Hardware acceleration layer
        contain: "strict",
      }}
    >
      {/* 1. Underlying Deep Ambient Black Base */}
      <div className="absolute inset-0 bg-[#030303]" />

      {/* 2. Micro Cybernetic Precision Grid (Retains Robopulse futuristic aesthetic) */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 201, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 201, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* 3. Dynamic Organic Flowing Light Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {ORBS.map((orb, index) => {
          return (
            <div
              key={orb.id}
              ref={(el) => {
                orbRefs.current[index] = el;
              }}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: `${orb.width}px`,
                height: `${orb.height}px`,
                left: `${orb.anchorX * 100}%`,
                top: `${orb.anchorY * 100}%`,
                marginLeft: `-${orb.width * 0.5}px`,
                marginTop: `-${orb.height * 0.5}px`,
                background: orb.background,
                filter: `blur(${orb.blur}px)`,
                transform: "translate3d(0, 0, 0)",
                willChange: "transform",
                mixBlendMode: "screen",
              }}
            />
          );
        })}
      </div>

      {/* 4. Soft Edge Vignette (Keeps deep black frame integrity around viewport perimeter) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(3, 3, 3, 0.75) 100%)",
        }}
      />
    </div>
  );
};
