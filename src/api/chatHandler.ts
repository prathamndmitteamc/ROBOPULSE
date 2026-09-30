/**
 * Server-side Chat Handler for Robopulse AI Assistant
 * Powered by @google/genai with gemini-3.8-flash (fallback to gemini-3.1-flash-lite)
 */

import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";

const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export const ROBOPULSE_SYSTEM_INSTRUCTION = `
You are "Pulse", the official AI Assistant for Robopulse Intelligence (robopulse.in).
Robopulse Intelligence is a pioneer in Robotics Education, Artificial Intelligence, and future-ready STEM learning for schools, colleges, and institutions across India.

KEY INSTITUTIONAL KNOWLEDGE:
1. Philosophy & Approach:
   - Slogan: "Building the Intelligence Behind Tomorrow" & "The future is built, not predicted."
   - Vision: Transforming classroom curiosity into practical engineering mastery.
   - We believe in experiential, hardware-first learning where students construct, test, code, and debug real physical systems.

2. Offerings & Services (/services):
   - Turnkey STEM & Robotics Lab Setup: 14-day on-campus commissioning, industrial durability workstations, certified microcontrollers, storage bays, and safety enclosures.
   - Robotics Education Curriculum: Grade-mapped from Grade 1 to Grade 12.
   - AI & Emerging Technologies: Real-time computer vision, OpenCV, Edge AI inference, sensor logic.
   - Teacher Orientation & Enablement: Comprehensive manuals, rubrics, and faculty training.
   - Robotics Exhibitions & Carnivals: Inter-school competitions, live arena battles, hackathons.
   - Flexible School Models: In-Curriculum Integration, After-School Clubs, Dedicated Permanent Campus Labs, and Short Intensive Workshops.

3. Grade-Aligned Courses (/courses):
   - Primary Track (Grades 1-4): Simple Machines, Gear Ratios, Levers, Pulleys, and Visual Scratch Logic.
   - Middle School Track (Grades 5-8): Embedded Microcontrollers (ESP32/Arduino), Autonomous Rovers, Sensor Arrays (ultrasonic, line-tracking, IR).
   - Senior & AI Track (Grades 9-12): Computer Vision with Python/C++, Object Detection, Kinematics, 4-DOF Robotic Arms, Industrial IoT.
   - Competition Track: World Robot Olympiad (WRO) & National Robotics Championship preparation.

4. Contact & Consultation (/contact):
   - Phone: +91 97241 12345 (available Mon - Sat 9:00 AM - 7:00 PM IST)
   - Email: contact@robopulse.in
   - Address: Innovation Tower, SG Highway, Ahmedabad, Gujarat, India 380054
   - Direct WhatsApp support is also available for rapid school inquiries.

GUIDELINES FOR YOUR RESPONSES:
- Be concise, helpful, intellectually sharp, and warmly professional.
- Use clean Markdown with bullet points where appropriate for readability.
- When answering questions about specific offerings, guide the user to the relevant page (e.g. "You can explore our full syllabus on the Courses page" or "Request a campus layout audit via the Contact page").
- If the user asks general engineering or robotics questions (e.g. "What is PWM?", "How do ultrasonic sensors work?", "What is an autonomous rover?"), explain clearly with an engaging, educational tone.
- Do not make up false pricing; explain that institutional proposals are customized based on school lab size, student cohort numbers, and workstation requirements, and invite them to request a proposal.
`;

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function processChatRequest(messages: ChatMessage[]): Promise<string> {
  if (!messages || messages.length === 0) {
    return "Hello! I am Pulse, your Robopulse AI Assistant. How can I help you explore our robotics programs, courses, or school lab setups today?";
  }

  // Format messages into Gemini contents format
  const formattedContents = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  if (formattedContents.length === 0) {
    formattedContents.push({
      role: "user",
      parts: [{ text: "Hello Robopulse AI" }],
    });
  }

  // Attempt generation with primary model (gemini-3.8-flash), fallback to gemini-3.1-flash-lite
  const modelsToTry = ["gemini-3.8-flash", "gemini-3.1-flash-lite"];

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: formattedContents,
        config: {
          systemInstruction: ROBOPULSE_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (err: unknown) {
      console.warn(`Model ${model} returned error, attempting fallback if available:`, (err as Error)?.message || err);
      // Continue to next model in list
    }
  }

  // If both models threw or API key is absent, provide an intelligent offline response based on user input
  const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase() || "";
  return getIntelligentFallback(lastUserMessage);
}

function getIntelligentFallback(query: string): string {
  if (query.includes("course") || query.includes("curriculum") || query.includes("grade") || query.includes("learn")) {
    return "Robopulse offers comprehensive grade-aligned robotics courses:\n\n- **Primary (Grades 1-4)**: Simple machines, gear trains, and visual logic actuation.\n- **Middle School (Grades 5-8)**: Microcontroller programming, autonomous rovers, and sensor telemetry.\n- **Senior & AI (Grades 9-12)**: Python mechatronics, Computer Vision with OpenCV, and Edge AI.\n\nExplore all modules on our [Courses Page](/courses) or connect with our academic counselors!";
  }

  if (query.includes("lab") || query.includes("setup") || query.includes("hardware") || query.includes("school")) {
    return "Robopulse specializes in **Turnkey School Robotics Labs**:\n\n- **14-Day Rapid Commissioning**: Complete room layout, electrical safety, and modular workbenches.\n- **Industrial Durability**: Heavy-duty storage bays, certified components, and diagnostic tools.\n- **Faculty Enablement**: Multi-day teacher training, curriculum binders, and assessment rubrics.\n\nVisit our [Services Page](/services) or request an on-campus audit on our [Contact Page](/contact).";
  }

  if (query.includes("contact") || query.includes("phone") || query.includes("email") || query.includes("address") || query.includes("quote") || query.includes("demo")) {
    return "We would love to connect with your school or institution:\n\n- **Phone**: +91 97241 12345\n- **Email**: contact@robopulse.in\n- **Campus Audits & Demos**: Request a campus visit directly via our [Contact Form](/contact).\n- **WhatsApp**: Click the WhatsApp button in the corner for an instant chat with our engineering team.";
  }

  return "Welcome to Robopulse Intelligence! We empower schools and learners with hands-on Robotics, Artificial Intelligence, and practical STEM learning.\n\nHow can I help you today? You can ask about:\n- 🏫 **School Robotics Lab Setups**\n- 🎓 **Curriculum & Grade-Wise Courses**\n- 🤖 **Hardware Kits & Student Projects**\n- 📞 **Scheduling a Campus Demonstration**";
}
