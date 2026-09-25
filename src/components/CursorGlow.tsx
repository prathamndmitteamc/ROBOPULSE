import React, { useEffect, useState } from "react";

export const CursorGlow: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-opacity duration-300 hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Soft Cyan Halo */}
      <div className="w-64 h-64 rounded-full bg-[#00C9FF]/6 blur-2xl -translate-x-1/2 -translate-y-1/2 absolute" />
      {/* Tiny Center Dot */}
      <div className="w-1.5 h-1.5 rounded-full bg-[#00C9FF]/60 -translate-x-1/2 -translate-y-1/2 absolute shadow-[0_0_8px_#00C9FF]" />
    </div>
  );
};
