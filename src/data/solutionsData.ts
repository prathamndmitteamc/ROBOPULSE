/**
 * Solutions, Models, Projects and Student Skills Data
 */

export interface SolutionTrack {
  id: string;
  num: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  outcomes: string[];
  image: string;
}

export const SOLUTIONS_LIST: SolutionTrack[] = [
  {
    id: "robotics-education",
    num: "01",
    category: "ROBOTICS",
    title: "Robotics Education",
    tagline: "Hands-on engineering, automation, and intelligent machines.",
    description:
      "Structured hands-on robotics curricula designed to help students grasp mechanics, electronic circuits, sensor fusion, and micro-controller programming through direct building.",
    outcomes: [
      "Physical mechanics & gear ratio fundamentals",
      "Sensor integration (ultrasonic, IR, optical)",
      "Autonomous navigation and obstacle avoidance",
      "Embedded code logic and debugging",
    ],
    image: "/src/assets/images/student_robotics_project_1790153242579.jpg",
  },
  {
    id: "ai-emerging-tech",
    num: "02",
    category: "AI SYSTEMS",
    title: "AI & Emerging Technology",
    tagline: "Demystifying artificial intelligence through tangible applications.",
    description:
      "Move beyond abstract theory. Introduce students to core computer vision, pattern recognition, smart automation, and machine learning principles using age-appropriate, interactive interfaces.",
    outcomes: [
      "Image recognition & basic vision models",
      "Algorithmic decision trees & feedback loops",
      "Smart sensor data collection & analysis",
      "Ethical understanding of modern AI systems",
    ],
    image: "/src/assets/images/hero_robotics_lab_1790153224618.jpg",
  },
  {
    id: "stem-lab-setup",
    num: "03",
    category: "LAB INFRASTRUCTURE",
    title: "STEM Lab Setup",
    tagline: "Turnkey innovation labs tailored for institutional campus requirements.",
    description:
      "We design, equip, and commission complete robotics and STEM laboratories—including modular workstations, certified electronics kits, safety gear, and institutional curriculum guides.",
    outcomes: [
      "Custom floorplan & safety compliant electrical bays",
      "Industrial-grade educational robotics hardware",
      "Comprehensive storage & component management",
      "Structured grade-wise activity manuals",
    ],
    image: "/src/assets/images/ai_stem_lab_setup_1790153258870.jpg",
  },
  {
    id: "introductory-training",
    num: "04",
    category: "CURRICULUM",
    title: "Introductory Training",
    tagline: "Inspiring initial entry points where curiosity turns into capability.",
    description:
      "Carefully calibrated entry-level sessions that spark student enthusiasm for robotics without intimidating technical barriers. Builds immediate confidence through quick, successful builds.",
    outcomes: [
      "Zero-to-one robot chassis assembly",
      "Basic electronic component identification",
      "First successful automated run",
      "Elimination of technophobia",
    ],
    image: "/src/assets/images/student_robotics_project_1790153242579.jpg",
  },
  {
    id: "teacher-orientation",
    num: "05",
    category: "FACULTY ENABLEMENT",
    title: "Teacher Orientation",
    tagline: "Equipping school faculty to confidently guide future-ready learning.",
    description:
      "Comprehensive orientation workshops for science and math teachers. We provide pedagogical frameworks, lab facilitation playbooks, and hardware troubleshooting knowledge.",
    outcomes: [
      "Hardware troubleshooting and safety protocols",
      "Facilitating inquiry-driven student problem solving",
      "Aligning robotics projects with school syllabus",
      "Long-term classroom mentorship support",
    ],
    image: "/src/assets/images/hero_robotics_lab_1790153224618.jpg",
  },
  {
    id: "robotics-exhibitions",
    num: "06",
    category: "EVENTS & EXPO",
    title: "Robotics Exhibitions",
    tagline: "Live demonstrations bringing machines and student creations to center stage.",
    description:
      "High-energy school exhibitions, tech fairs, and inter-house robotics arenas where students publicly present their prototypes to parents, educators, and the wider community.",
    outcomes: [
      "Public speaking & technical communication",
      "Live arena demonstration skills",
      "School-wide technology celebration",
      "Parent & community engagement",
    ],
    image: "/src/assets/images/robotics_exhibition_showcase_1790153274415.jpg",
  },
];

export interface ProgramModel {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  description: string;
  idealFor: string;
  deliverables: string[];
}

export const PROGRAM_MODELS: ProgramModel[] = [
  {
    id: "model-1",
    num: "MODEL 01",
    name: "In-School Program",
    subtitle: "Curriculum Integration",
    description:
      "Robotics and STEM learning integrated directly into the weekly academic timetable. Students engage with structured practical coursework alongside their regular science and math subjects.",
    idealFor: "Schools aiming for systemic, grade-wide technology literacy.",
    deliverables: [
      "Weekly timetabled practical sessions",
      "Grade-mapped experiential curriculum",
      "Dedicated trainer or co-teaching model",
      "Periodic student evaluation and project reviews",
    ],
  },
  {
    id: "model-2",
    num: "MODEL 02",
    name: "After-School Program",
    subtitle: "Enrichment & Clubs",
    description:
      "Advanced robotics and technology exploration conducted after regular school hours for passionate students interested in deep engineering, competition prep, or specialized builds.",
    idealFor: "Students seeking focused innovation and competition pathways.",
    deliverables: [
      "Flexible after-hours or weekend batches",
      "Competition and Olympiad coaching",
      "Advanced sensor and coding modules",
      "Self-directed capstone project creation",
    ],
  },
  {
    id: "model-3",
    num: "MODEL 03",
    name: "STEM / Robotics Lab",
    subtitle: "Permanent Campus Facility",
    description:
      "A dedicated, permanent technology innovation environment setup within the institution where students can build, test, experiment, and collaborate year-round.",
    idealFor: "Institutions establishing a signature technology identity.",
    deliverables: [
      "Turnkey hardware, kits & workstation setup",
      "Comprehensive lab safety & asset management",
      "Faculty enablement & teacher training",
      "Ongoing curriculum updates & kit maintenance",
    ],
  },
  {
    id: "model-4",
    num: "MODEL 04",
    name: "Workshops & Exhibitions",
    subtitle: "Short-Format Immersion",
    description:
      "High-impact, focused experiential workshops and campus robotics carnivals designed around specific emerging technology themes, science weeks, or tech fests.",
    idealFor: "School events, summer bootcamps, and institutional tech days.",
    deliverables: [
      "1 to 5 day intensive hands-on workshops",
      "Live arena challenges and rover races",
      "Take-home or institutional kit options",
      "Campus-wide participation certificates",
    ],
  },
];

export interface StudentSkill {
  name: string;
  definition: string;
  focusArea: string;
  progressPercent: number; // visual indicator bar
}

export const STUDENT_SKILLS: StudentSkill[] = [
  {
    name: "Problem Solving",
    definition: "Deconstructing complex physical and logical malfunctions into manageable diagnostic steps.",
    focusArea: "Diagnostic & Circuit Logic",
    progressPercent: 92,
  },
  {
    name: "Critical Thinking",
    definition: "Evaluating trade-offs between speed, weight, torque, and power in mechanical setups.",
    focusArea: "Algorithmic Analysis",
    progressPercent: 88,
  },
  {
    name: "Creativity",
    definition: "Designing novel physical architectures and custom chassis for unique functional challenges.",
    focusArea: "Design & Prototyping",
    progressPercent: 94,
  },
  {
    name: "Collaboration",
    definition: "Teaming up where one student handles mechanics, another codes, and both test together.",
    focusArea: "Team Synergies",
    progressPercent: 90,
  },
  {
    name: "Communication",
    definition: "Articulating technical design choices and demonstrating operating mechanisms to audiences.",
    focusArea: "Technical Presentation",
    progressPercent: 86,
  },
  {
    name: "Engineering Thinking",
    definition: "Understanding constraints, tolerances, feedback loops, and iterative mechanical design.",
    focusArea: "Systems Architecture",
    progressPercent: 95,
  },
  {
    name: "Confidence",
    definition: "The profound realization that students can build real, intelligent machines with their own hands.",
    focusArea: "Self-Efficacy",
    progressPercent: 96,
  },
  {
    name: "Innovation",
    definition: "Inventing practical prototypes for real-world environmental, healthcare, or agricultural needs.",
    focusArea: "Future Solutions",
    progressPercent: 91,
  },
];

export interface HandsOnProject {
  id: string;
  num: string;
  title: string;
  category: string;
  description: string;
  techTags: string[];
  image: string;
}

export const HANDS_ON_PROJECTS: HandsOnProject[] = [
  {
    id: "proj-1",
    num: "PROJECT 001",
    title: "Autonomous Obstacle Rover",
    category: "ROBOTICS",
    description: "Wheeled rover utilizing dual ultrasonic sensors and motor drivers to autonomously map room boundaries and navigate without human intervention.",
    techTags: ["Ultrasonic Sensors", "Motor H-Bridge", "Microcontroller", "Autonomous Navigation"],
    image: "/src/assets/images/student_robotics_project_1790153242579.jpg",
  },
  {
    id: "proj-2",
    num: "PROJECT 002",
    title: "Vision-Guided Sort Mechanism",
    category: "AI & VISION",
    description: "Camera-assisted robotic arm with color detection models that sorts objects based on hue and dimensions into designated receptacles.",
    techTags: ["Computer Vision", "Servo Actuators", "Object Classification", "Python/C++"],
    image: "/src/assets/images/hero_robotics_lab_1790153224618.jpg",
  },
  {
    id: "proj-3",
    num: "PROJECT 003",
    title: "Smart Agricultural Telemetry Bay",
    category: "STEM & IOT",
    description: "Sensory ecosystem monitoring soil moisture, ambient humidity, and temperature to automate micro-irrigation valves.",
    techTags: ["Capacitive Soil Probe", "Solenoid Valve", "Telemetry", "Environmental STEM"],
    image: "/src/assets/images/ai_stem_lab_setup_1790153258870.jpg",
  },
  {
    id: "proj-4",
    num: "PROJECT 004",
    title: "Multi-Axis Mechanical Gripper",
    category: "MECHATRONICS",
    description: "Precision 4-DOF mechanical arm engineered with high-torque servos to explore kinematics and coordinate positioning.",
    techTags: ["Inverse Kinematics", "PWM Drivers", "3D Structures", "Automation"],
    image: "/src/assets/images/robotics_exhibition_showcase_1790153274415.jpg",
  },
];
