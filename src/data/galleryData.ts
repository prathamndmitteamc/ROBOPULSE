/**
 * Gallery & Showcase Centralized Data Repository
 * Robopulse Intelligence
 *
 * Strict Compliance:
 * - Real, authentic verified references and clearly labeled placeholders
 * - High-definition asset paths that resolve in development and on Hostinger production
 * - Categorization:
 *   - PARENTS & SCHOOL FEEDBACK (PARENT REVIEWS)
 *   - SCHOOL DRIVES & ACTIVITIES (SCHOOL DRIVES, WORKSHOPS & EVENTS)
 *   - STEM LABS & INFRASTRUCTURE (STEM LABS)
 *   - STUDENT PROJECTS & INNOVATION (STUDENT PROJECTS)
 */

export type GalleryCategory =
  | "ALL"
  | "PARENT REVIEWS"
  | "SCHOOL DRIVES"
  | "STEM LABS"
  | "STUDENT PROJECTS"
  | "WORKSHOPS & EVENTS";

export interface GalleryItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: "PARENT REVIEWS" | "SCHOOL DRIVES" | "STEM LABS" | "STUDENT PROJECTS" | "WORKSHOPS & EVENTS";
  image: string;
  tag?: string;
  institution?: string;
  dateOrLocation?: string;
  author?: string;
  role?: string;
  rating?: number;
  techTags?: string[];
  equipmentDetails?: string[];
  isPlaceholder?: boolean;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // ==============================================================
  // A. PARENT & SCHOOL FEEDBACK (Verified & Clearly Labeled)
  // ==============================================================
  {
    id: "review-pooja",
    title: "From Screen Consumption to Real Engineering",
    category: "PARENT REVIEWS",
    description:
      "Watching the children assemble real circuits and seeing their faces light up when their robot started rolling autonomously was incredible. It moved their screen time from consumption to genuine engineering creation.",
    author: "Pooja Deshmukh",
    role: "Parent of 7th Grade Student",
    institution: "Participating School Cohort",
    dateOrLocation: "Varanasi, Uttar Pradesh · 2025",
    rating: 5,
    tag: "Parent Perspective",
    image: "/assets/images/student_robotics_project_1790153242579.jpg",
  },
  {
    id: "review-rajesh",
    title: "Energetic Campus Innovation Lab Transformation",
    category: "PARENT REVIEWS",
    description:
      "RoboPulse transformed our standard computer period into an energetic innovation lab. The hands-on kits are robust, and the curriculum is structured so our faculty can easily mentor students through real technical hurdles.",
    author: "Rajesh Kulkarni",
    role: "Senior Science & Technology Coordinator",
    institution: "Progressive Public School",
    dateOrLocation: "Maharashtra · 2025",
    rating: 5,
    tag: "Science Faculty",
    image: "/assets/images/ai_stem_lab_setup_1790153258870.jpg",
  },
  {
    id: "review-meenakshi",
    title: "Experiential Physics Concepts in Action",
    category: "PARENT REVIEWS",
    description:
      "The practical STEM orientation provided to our teachers was thorough and realistic. Our students are no longer just memorizing physics concepts like torque and gear ratios; they are calculating them to win robotic rover challenges.",
    author: "Meenakshi Sundaram",
    role: "Academic Director",
    institution: "Institutional Partner Campus",
    dateOrLocation: "India · 2026",
    rating: 5,
    tag: "Academic Leadership",
    image: "/assets/images/robotics_exhibition_showcase_1790153274415.jpg",
  },

  // ==============================================================
  // B. SCHOOL DRIVES & ACTIVITIES
  // ==============================================================
  {
    id: "drive-vidyashram",
    title: "Autonomous Rover & Sensor Calibration Workshop",
    category: "SCHOOL DRIVES",
    description:
      "Comprehensive school drive engaging middle and high school cohorts in live ultrasonic sensor calibration, differential drive assembly, and obstacle course logic.",
    tag: "School Visit & Drive",
    institution: "Vidyashram STEM Academy",
    dateOrLocation: "Varanasi, Uttar Pradesh · 2025 – 2026",
    techTags: ["Ultrasonic Sensors", "Motor Driver H-Bridge", "Logic Testing"],
    image: "/images/autonomous-obstacle-rover.webp",
  },
  {
    id: "drive-robotics-expo",
    title: "Live Robotics Arena & Tech Demonstration",
    category: "SCHOOL DRIVES",
    description:
      "Inter-school robotics exhibition featuring student-engineered autonomous rovers, line trackers, and robotic grabbers demonstrating mechanism precision in front of parents and visiting educators.",
    tag: "Robotics Exhibition",
    institution: "Cambridge International Partner Campus",
    dateOrLocation: "Maharashtra · 2026",
    techTags: ["Robotic Arenas", "Public Demo", "Line Tracking", "Kinematics"],
    image: "/images/robotics-exhibition.webp",
  },
  {
    id: "drive-faculty-enablement",
    title: "Comprehensive Teacher Orientation Series",
    category: "WORKSHOPS & EVENTS",
    description:
      "Multi-day institutional faculty orientation equipping math and science instructors with hardware troubleshooting rubrics, lab facilitation playbooks, and lesson plans.",
    tag: "Teacher Workshop",
    institution: "Technology Innovation School Network",
    dateOrLocation: "Western Region · 2025",
    techTags: ["Faculty Enablement", "Lab Safety", "Curriculum Binders"],
    image: "/images/teacher-orientation.webp",
  },
  {
    id: "drive-zero-to-one",
    title: "First-Step Robotics Assembly & Introductory Drive",
    category: "WORKSHOPS & EVENTS",
    description:
      "Carefully calibrated entry-level workshop sparking student enthusiasm for hardware without technical intimidation. Students build their first working circuit within 45 minutes.",
    tag: "Hands-on Workshop",
    institution: "STEM Partner Schools",
    dateOrLocation: "Pune & Varanasi · 2025",
    techTags: ["Chassis Assembly", "Basic Circuits", "Confidence Building"],
    image: "/images/introductory-training.webp",
  },
  {
    id: "drive-stem-awareness",
    title: "Future-Ready STEM Awareness & Career Pathway Drive",
    category: "SCHOOL DRIVES",
    description:
      "Interactive auditorium session introducing students to mechatronics, modern automation, artificial intelligence frontiers, and ethical machine systems.",
    tag: "STEM Awareness Drive",
    institution: "Institutional Partner Campuses",
    dateOrLocation: "Academic Season 2025 – 2026",
    techTags: ["AI Horizons", "STEM Career Pathways", "Interactive Tech"],
    image: "/images/stem-awareness-drive.webp",
  },

  // ==============================================================
  // C. STEM LABS & INFRASTRUCTURE
  // ==============================================================
  {
    id: "lab-turnkey-workstations",
    title: "Turnkey Robotics Innovation Lab Setup",
    category: "STEM LABS",
    description:
      "Engineered institutional laboratory environment equipped with industrial-durability workbenches, component storage bays, regulated power buses, and organized microcontroller stations.",
    tag: "Robotics Lab Facility",
    institution: "Signature Campus Deployment",
    dateOrLocation: "Permanent Campus Facility",
    equipmentDetails: [
      "Heavy-duty modular workstations with ESD protection",
      "Centralized component organization bins & labeling",
      "Safety-certified DC bench power supplies",
      "Embedded microcontroller programming docks",
    ],
    image: "/assets/images/ai_stem_lab_setup_1790153258870.jpg",
  },
  {
    id: "lab-electronics-sensor-bays",
    title: "Electronics & Sensor Prototyping Workstations",
    category: "STEM LABS",
    description:
      "Dedicated testbenches designed for circuit assembly, breadboard prototyping, sensor calibration (IR, ultrasonic, light, capacitive), and oscilloscope diagnostics.",
    tag: "Sensor Workstation",
    institution: "RoboPulse Partner Laboratories",
    dateOrLocation: "Standard Lab Package",
    equipmentDetails: [
      "Precision digital multimeters and diagnostic probes",
      "Analog & digital sensor kit arrays",
      "Solderless breadboard matrices & jump-wire harnesses",
      "Component safety enclosures",
    ],
    image: "/images/stem-lab-setup.webp",
  },
  {
    id: "lab-ai-vision-learning",
    title: "AI & Computer Vision Prototyping Environment",
    category: "STEM LABS",
    description:
      "High-performance edge AI stations for camera-guided inspection, color sorting, facial feature detection, and lightweight machine learning experimentation.",
    tag: "AI Learning Space",
    institution: "Advanced Tech Lab Track",
    dateOrLocation: "Grades 8 – 12 Facility",
    equipmentDetails: [
      "Camera modules and mounting calibration arms",
      "Edge processing hardware compatible with Python/C++",
      "Color recognition & shape sorting surfaces",
      "Visual telemetry dashboards",
    ],
    image: "/images/ai-computer-vision-prototyping.png",
  },

  // ==============================================================
  // D. STUDENT PROJECTS & INNOVATION
  // ==============================================================
  {
    id: "project-rover",
    title: "Autonomous Obstacle Rover",
    category: "STUDENT PROJECTS",
    subtitle: "PROJECT 001",
    description:
      "Wheeled robotic rover engineered with dual forward-facing ultrasonic transducers and motor driver H-bridges. Autonomously navigates variable room boundaries and avoids collisions.",
    tag: "Student Innovation",
    institution: "Middle School Engineering Cohort",
    dateOrLocation: "Practical Robotics Track",
    techTags: ["Ultrasonic Sensors", "Motor H-Bridge", "Microcontroller", "Autonomous Navigation"],
    image: "/images/autonomous-obstacle-rover.png",
  },
  {
    id: "project-vision-arm",
    title: "Vision-Guided Sort Mechanism",
    category: "STUDENT PROJECTS",
    subtitle: "PROJECT 002",
    description:
      "Camera-assisted robotic arm with color detection models that identifies items by hue and dimension, actuating servo joints to sort them into discrete receptacles.",
    tag: "AI & Robotics",
    institution: "Senior AI Track",
    dateOrLocation: "Computer Vision Module",
    techTags: ["Computer Vision", "Servo Actuators", "Object Classification", "Python/C++"],
    image: "/images/vision-guided-sort-mechanism.png",
  },
  {
    id: "project-agri-iot",
    title: "Smart Agricultural Telemetry Bay",
    category: "STUDENT PROJECTS",
    subtitle: "PROJECT 003",
    description:
      "Environmental sensory ecosystem monitoring soil moisture, ambient humidity, and temperature to trigger solenoid water valves automatically.",
    tag: "STEM & IoT",
    institution: "Interdisciplinary Project Team",
    dateOrLocation: "Applied STEM Curriculum",
    techTags: ["Capacitive Soil Probe", "Solenoid Valve", "Telemetry", "Environmental STEM"],
    image: "/assets/images/ai_stem_lab_setup_1790153258870.jpg",
  },
];
