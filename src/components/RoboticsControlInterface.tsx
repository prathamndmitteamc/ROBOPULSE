import React, { useState } from "react";
import { Terminal, Activity, Cpu, Radio, ShieldCheck, RefreshCw } from "lucide-react";

export const RoboticsControlInterface: React.FC = () => {
  const [activeTelemetry, setActiveTelemetry] = useState<string>("SENSORS");
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);
  const [pingCount, setPingCount] = useState<number>(142);

  const modules = [
    { id: "SENSORS", label: "SENSORS", status: "ONLINE", spec: "Ultrasonic / IR / Optical Array", load: "98.4% Accuracy" },
    { id: "PROCESSING", label: "PROCESSING", status: "ACTIVE", spec: "Dual 32-bit MCU Architecture", load: "12ms Loop Time" },
    { id: "AI MODULE", label: "AI MODULE", status: "READY", spec: "Computer Vision & Edge Model", load: "Confidence 0.96" },
    { id: "MOTION", label: "MOTION", status: "ACTIVE", spec: "PWM Servo & Differential Drive", load: "RPM Balanced" },
    { id: "STEM LAB", label: "STEM LAB", status: "CONNECTED", spec: "Campus Lab Mesh Network", load: "Active Stations" },
  ];

  const handleSimulatePulse = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setPingCount((prev) => prev + 1);
      setIsCalibrating(false);
    }, 700);
  };

  return (
    <div className="relative rounded-2xl bg-[#07070D] border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,201,255,0.08)]">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0B0B14] border-b border-white/8">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#006CFF]/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#00C9FF]/60" />
          </div>
          <span className="ml-2 font-mono text-xs text-white/70 font-medium tracking-wider">
            ROBO SYSTEM // 001
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-[#00C9FF]">
            <Radio className="w-3 h-3 animate-pulse" />
            CORE ONLINE
          </span>
          <button
            onClick={handleSimulatePulse}
            disabled={isCalibrating}
            className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded bg-[#00C9FF]/10 text-[#00C9FF] hover:bg-[#00C9FF]/20 transition-colors disabled:opacity-50"
            title="Calibrate telemetry loop"
          >
            <RefreshCw className={`w-3 h-3 ${isCalibrating ? "animate-spin" : ""}`} />
            <span>{isCalibrating ? "SYNCING..." : "SYNC"}</span>
          </button>
        </div>
      </div>

      {/* Main Diagnostic Body */}
      <div className="p-5 font-mono text-xs space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[11px] text-neutral-400">
          <span className="uppercase tracking-widest text-neutral-300">SYSTEM DIAGNOSTICS</span>
          <span className="text-[#A9D4FF]">SESSION #{pingCount}</span>
        </div>

        {/* Telemetry Status Grid */}
        <div className="space-y-2">
          {modules.map((m) => {
            const isSelected = activeTelemetry === m.id;
            return (
              <div
                key={m.id}
                onClick={() => setActiveTelemetry(m.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  isSelected
                    ? "bg-[#250060]/30 border-[#00C9FF]/40 shadow-[0_0_15px_rgba(0,201,255,0.1)]"
                    : "bg-white/[0.02] border-white/5 hover:border-white/15"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-[#00C9FF] shadow-[0_0_8px_#00C9FF]" : "bg-neutral-500"}`} />
                  <div>
                    <span className="font-semibold text-white tracking-wider">{m.label}</span>
                    <span className="block text-[11px] text-neutral-400 font-sans">{m.spec}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <span className="text-[11px] text-neutral-400">{m.load}</span>
                  <span className="px-2 py-0.5 rounded bg-[#00C9FF]/15 text-[#00C9FF] text-[10px] font-semibold tracking-wider">
                    {m.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Command Line readout */}
        <div className="p-3 rounded-lg bg-black/60 border border-white/5 text-[11px] text-neutral-300 space-y-1">
          <div className="flex items-center gap-1.5 text-[#00C9FF]">
            <Terminal className="w-3.5 h-3.5" />
            <span>ACTIVE SUB-ROUTINE:</span>
          </div>
          <p className="text-neutral-400 font-mono pl-5">
            &gt; Selected: <span className="text-white font-medium">{activeTelemetry}</span> — All sensory buses calibrated to educational safety standards. Ready for student experiment.
          </p>
        </div>
      </div>
    </div>
  );
};
