import React, { useState } from "react";
import { Eye, Cpu, Zap, Brain, Sliders, Info, Bot } from "lucide-react";

interface NodeDetail {
  id: string;
  name: string;
  category: string;
  description: string;
  educationalTakeaway: string;
  components: string[];
}

export const InteractiveSystemDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>("sensor");

  const nodes: Record<string, NodeDetail> = {
    sensor: {
      id: "sensor",
      name: "01. SENSORS (Perception)",
      category: "INPUT BUS",
      description: "How machines perceive environmental stimuli: distance, surface reflectivity, light level, magnetic field, and physical contact.",
      educationalTakeaway: "Students explore analog-to-digital conversion and physical signal thresholds.",
      components: ["Ultrasonic Distance Sensor", "Infrared Line Array", "Photoresistors (LDR)", "Gyro & Accelerometer"],
    },
    processor: {
      id: "processor",
      name: "02. PROCESSOR (Compute Core)",
      category: "CENTRAL LOGIC",
      description: "The computational brain executing programmed instructions, mathematical calculations, and event interrupts in microsecond loops.",
      educationalTakeaway: "Students write conditional algorithms (if/else), loops, and state machines.",
      components: ["32-bit Microcontroller", "Hardware Interrupts", "PWM Timer Channels", "Flash & SRAM Memory"],
    },
    actuator: {
      id: "actuator",
      name: "03. ACTUATORS (Motion & Force)",
      category: "OUTPUT DRIVES",
      description: "Converting computational signals into physical kinetic motion, torque, angular velocity, and grip pressure.",
      educationalTakeaway: "Students learn gear ratios, electrical current requirements, and mechanical linkages.",
      components: ["DC Geared Motors", "High-Torque Servos", "H-Bridge Drivers", "Stepper Mechanisms"],
    },
    ai: {
      id: "ai",
      name: "04. AI LOGIC (Adaptive Intelligence)",
      category: "NEURAL LAYER",
      description: "Software intelligence enabling the robot to classify objects, navigate uncertain terrain, and learn from past trials.",
      educationalTakeaway: "Students demystify computer vision, model weights, and machine learning pipelines.",
      components: ["Edge Vision Inference", "Obstacle Mapping Trees", "Color Classification", "Pathfinding Algorithms"],
    },
    control: {
      id: "control",
      name: "05. CONTROL LOOP (Feedback)",
      category: "SYSTEM FEEDBACK",
      description: "The closed-loop mechanism continuously comparing real sensor readings against the desired goal state.",
      educationalTakeaway: "Students grasp PID (Proportional-Integral-Derivative) principles and error correction.",
      components: ["Error Correction Loops", "Autonomous State Controller", "Safety Killswitches", "Wireless Telemetry"],
    },
  };

  const current = nodes[activeNode] || nodes.sensor;

  return (
    <div className="rounded-2xl bg-[#07070D] border border-white/10 p-6 lg:p-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#00C9FF]/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Schematic Tree View */}
        <div className="w-full lg:w-1/2 space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-5 h-5 text-[#00C9FF]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00C9FF]">
              ROBOT ARCHITECTURE // EXPLODED BUS
            </span>
          </div>

          <div className="relative pl-6 border-l-2 border-[#00C9FF]/30 space-y-3">
            {[
              { id: "sensor", label: "SENSOR SUBSYSTEM", icon: Eye, role: "Perception" },
              { id: "processor", label: "COMPUTE PROCESSOR", icon: Cpu, role: "Execution" },
              { id: "actuator", label: "ACTUATORS & MOTORS", icon: Zap, role: "Kinetic Action" },
              { id: "ai", label: "AI & VISION MODULE", icon: Brain, role: "Intelligence" },
              { id: "control", label: "CLOSED CONTROL LOOP", icon: Sliders, role: "Feedback Loop" },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = activeNode === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNode(item.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? "bg-[#250060]/40 border-[#00C9FF] text-white shadow-[0_0_20px_rgba(0,201,255,0.15)]"
                      : "bg-white/[0.02] border-white/5 text-neutral-300 hover:border-[#00C9FF]/30 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected ? "bg-[#00C9FF] text-black" : "bg-white/5 text-[#00C9FF] group-hover:bg-[#00C9FF]/20"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-semibold tracking-wider">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-neutral-400 font-sans">{item.role}</div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                      isSelected
                        ? "bg-[#00C9FF]/20 text-[#00C9FF]"
                        : "text-neutral-500 group-hover:text-neutral-300"
                    }`}
                  >
                    INSPECT &gt;
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Technical Inspector Panel */}
        <div className="w-full lg:w-1/2 rounded-xl bg-[#0A0A14] border border-white/10 p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#00C9FF]">
                {current.category}
              </span>
              <h4 className="font-display text-2xl text-white mt-0.5">
                {current.name}
              </h4>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#00C9FF]/15 text-[#00C9FF] font-mono text-[11px] font-semibold">
              ACTIVE
            </span>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed font-sans">
            {current.description}
          </p>

          <div className="p-3.5 rounded-lg bg-[#250060]/20 border border-[#006CFF]/30 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-[#A9D4FF] font-semibold font-mono text-[11px]">
              <Info className="w-3.5 h-3.5 text-[#00C9FF]" />
              <span>EDUCATIONAL TAKEAWAY FOR STUDENTS:</span>
            </div>
            <p className="text-neutral-300 text-xs">
              {current.educationalTakeaway}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
              Core Hardware & Logical Units:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {current.components.map((comp, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded bg-white/[0.03] border border-white/5 text-[11px] font-mono text-neutral-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C9FF]" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
