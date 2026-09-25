/**
 * Robopulse Intelligence — Centralized Services Data
 * Provides data for the Services Mega-Menu and institutional service presentations.
 */

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  badge?: string;
  iconName: string;
  highlights: string[];
  path: string;
}

export interface FeaturedService {
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  metrics: { label: string; value: string }[];
  image: string;
  ctaText: string;
  ctaPath: string;
}

export const FEATURED_SERVICE: FeaturedService = {
  title: "Turnkey STEM & Robotics Lab Setup",
  subtitle: "FLAGSHIP INSTITUTIONAL DEPLOYMENT",
  description:
    "Complete end-to-end design, provisioning, and commissioning of modern robotics innovation labs for schools, including hardware bays, tools, and grade-aligned syllabi.",
  tag: "MOST POPULAR",
  metrics: [
    { label: "Commissioning", value: "14 Days" },
    { label: "Kit Durability", value: "Industrial" },
    { label: "Faculty Support", value: "Full Year" },
  ],
  image: "/src/assets/images/ai_stem_lab_setup_1790153258870.jpg",
  ctaText: "Explore Lab Architecture",
  ctaPath: "/solutions",
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "robotics-education",
    title: "Robotics Education",
    category: "CURRICULUM INTEGRATION",
    tagline: "Structured weekly engineering & automation programs for schools.",
    description:
      "Grade-calibrated mechatronics syllabus where students learn mechanics, electronic circuits, sensors, and microcontroller coding.",
    badge: "GRADES 1-12",
    iconName: "Bot",
    highlights: ["Chassis Mechanics", "Sensor Fusion", "Autonomous Navigation"],
    path: "/solutions",
  },
  {
    id: "ai-emerging-tech",
    title: "AI & Emerging Technology",
    category: "FUTURE INTELLIGENCE",
    tagline: "Demystifying artificial intelligence, machine learning, and edge computing.",
    description:
      "Hands-on computer vision models, algorithmic decision trees, speech synthesis, and smart IoT device integration.",
    badge: "CUTTING EDGE",
    iconName: "BrainCircuit",
    highlights: ["Computer Vision", "Smart Sensor IoT", "Ethical AI Principles"],
    path: "/solutions",
  },
  {
    id: "stem-lab-setup",
    title: "STEM Lab Setup",
    category: "CAMPUS INFRASTRUCTURE",
    tagline: "Turnkey physical innovation labs designed for school environments.",
    description:
      "Safe, modular laboratory workbenches, component management cabinets, testing arenas, 3D printers, and tools.",
    badge: "TURNKEY",
    iconName: "Cpu",
    highlights: ["Custom Floorplans", "Storage Management", "Safety Certified"],
    path: "/solutions",
  },
  {
    id: "introductory-training",
    title: "Introductory Training",
    category: "EXPERIENTIAL SESSIONS",
    tagline: "Inspiring initial entry points where curiosity turns into capability.",
    description:
      "Zero-barrier beginner robotics workshops and bootcamps to overcome intimidation and ignite genuine student passion.",
    badge: "BOOTCAMPS",
    iconName: "Sparkles",
    highlights: ["Zero-to-One Assembly", "First Code Run", "Technophobia Elimination"],
    path: "/solutions",
  },
  {
    id: "teacher-orientation",
    title: "Teacher Orientation",
    category: "FACULTY ENABLEMENT",
    tagline: "Empowering science and math educators to mentor next-gen builders.",
    description:
      "Comprehensive faculty workshops, lesson plan playbooks, equipment troubleshooting, and syllabus integration guidance.",
    badge: "CERTIFIED",
    iconName: "GraduationCap",
    highlights: ["Pedagogical Frameworks", "Troubleshooting Protocols", "Co-Teaching"],
    path: "/solutions",
  },
  {
    id: "robotics-exhibitions",
    title: "Robotics Exhibitions",
    category: "EXPOS & COMPETITIONS",
    tagline: "Campus technology showcases and competitive student arenas.",
    description:
      "High-energy school exhibitions, live bot battles, line-follower races, and parent-community technology open days.",
    badge: "SHOWCASE",
    iconName: "Trophy",
    highlights: ["Live Rover Arenas", "Public Communication", "Parent Showcase"],
    path: "/solutions",
  },
];
