/**
 * Robopulse Intelligence — Centralized Courses Data
 * Easily expandable registry for robotics, AI, STEM, and mechatronics courses.
 * New courses added here will dynamically populate across the Courses Mega-Menu and pages.
 */

export interface CourseItem {
  id: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Mastery";
  ageGroup: string;
  duration: string;
  tagline: string;
  description: string;
  badge?: string;
  topics: string[];
  iconName: string;
  path: string;
}

export interface FeaturedCourse {
  title: string;
  subtitle: string;
  tag: string;
  ageGroup: string;
  duration: string;
  description: string;
  highlights: string[];
  ctaText: string;
  ctaPath: string;
}

export const FEATURED_COURSE: FeaturedCourse = {
  title: "Full-Stack Mechatronics & Autonomous Systems",
  subtitle: "FLAGSHIP CERTIFICATION DIPLOMA",
  tag: "RECOMMENDED",
  ageGroup: "Ages 12-17 · Grades 7-12",
  duration: "48 Hours · 16 Practical Milestones",
  description:
    "An intensive end-to-end curriculum taking students from micro-controller architecture and sensor physics to closed-loop autonomous rover navigation and computer vision AI.",
  highlights: [
    "Embedded C++ & MicroPython on 32-bit MCUs",
    "Ultrasonic, Lidar, and Camera telemetry",
    "Autonomous obstacle & PID line algorithms",
    "Recognized Project Certificate & Portfolio",
  ],
  ctaText: "Request Course Syllabus",
  ctaPath: "/contact",
};

export const COURSE_CATEGORIES = [
  "All Levels",
  "Primary (Grades 1-4)",
  "Middle School (Grades 5-8)",
  "Senior & AI (Grades 9-12)",
  "Specialized & Competitions",
] as const;

export const COURSES_LIST: CourseItem[] = [
  // Primary (Grades 1-4)
  {
    id: "little-maker-mechanics",
    title: "Junior Maker: Mechanics & Motion",
    category: "Primary (Grades 1-4)",
    level: "Beginner",
    ageGroup: "Ages 6-9",
    duration: "20 Hours",
    tagline: "Discover gears, levers, pulleys, and foundational mechanical motion.",
    description:
      "A tactile introduction to simple machines, balance, and motor-driven contraptions using child-safe modular engineering blocks.",
    badge: "FOUNDATIONAL",
    topics: ["Gear Ratios & Torque", "Pulleys & Levers", "Motorized Contraptions", "Creative Design"],
    iconName: "Blocks",
    path: "/contact",
  },
  {
    id: "junior-robocoder",
    title: "Junior RoboCoder: Visual Logic",
    category: "Primary (Grades 1-4)",
    level: "Beginner",
    ageGroup: "Ages 7-10",
    duration: "24 Hours",
    tagline: "Bridging drag-and-drop block coding with real robotic hardware actions.",
    description:
      "Students program interactive rovers with color sensors, LED indicators, and acoustic buzzers using intuitive block-based flowcharts.",
    badge: "POPULAR",
    topics: ["Block-Based Sequencing", "Loops & Conditionals", "Light & Sound Actuation", "Robo-Mazes"],
    iconName: "Gamepad2",
    path: "/contact",
  },

  // Middle School (Grades 5-8)
  {
    id: "autonomous-mobile-robotics",
    title: "Autonomous Mobile Robotics",
    category: "Middle School (Grades 5-8)",
    level: "Intermediate",
    ageGroup: "Ages 10-13",
    duration: "32 Hours",
    tagline: "Building two-wheel and four-wheel autonomous ground vehicles from scratch.",
    description:
      "Hands-on assembly of mobile robotic rovers using ultrasonic telemetry, IR line arrays, and dual H-bridge motor driver circuits.",
    badge: "BESTSELLER",
    topics: ["Ultrasonic Distance Echoes", "Infrared Line Tracking", "Motor Pulse-Width Modulation (PWM)", "Differential Drive"],
    iconName: "Car",
    path: "/contact",
  },
  {
    id: "iot-smart-campus",
    title: "IoT & Connected Smart Systems",
    category: "Middle School (Grades 5-8)",
    level: "Intermediate",
    ageGroup: "Ages 11-14",
    duration: "28 Hours",
    tagline: "Interfacing physical sensors with cloud dashboards and wireless protocols.",
    description:
      "Learn Wi-Fi and Bluetooth embedded protocols. Build smart weather stations, automated plant watering systems, and room intruder alarms.",
    badge: "TRENDING",
    topics: ["ESP32 Wi-Fi Modules", "Analog Sensor ADC", "Cloud Dashboards", "Home Automation"],
    iconName: "Wifi",
    path: "/contact",
  },
  {
    id: "3d-modeling-rapid-prototyping",
    title: "3D CAD Modeling & Digital Fabrication",
    category: "Middle School (Grades 5-8)",
    level: "Intermediate",
    ageGroup: "Ages 10-14",
    duration: "24 Hours",
    tagline: "From digital sketch to physical reality with CAD and 3D printing.",
    description:
      "Students master parametric 3D design software, slicing parameters, infill densities, and print custom chassis and brackets for their robots.",
    badge: "HANDS-ON",
    topics: ["Parametric 3D Modeling", "Slicing Software & Infill", "Tolerances & Assembly", "Custom Chassis Builds"],
    iconName: "Layers",
    path: "/contact",
  },

  // Senior & AI (Grades 9-12)
  {
    id: "edge-ai-computer-vision",
    title: "Edge AI & Computer Vision",
    category: "Senior & AI (Grades 9-12)",
    level: "Advanced",
    ageGroup: "Ages 14-18",
    duration: "40 Hours",
    tagline: "Empowering robots with optical perception, face detection, and neural models.",
    description:
      "Implement real-time OpenCV color tracking, lane boundary detection for autonomous rovers, and lightweight object classification models on embedded edge computers.",
    badge: "FLAGSHIP",
    topics: ["OpenCV Image Pipelines", "Color & Contour Filtering", "Object Classification", "Autonomous Lane Following"],
    iconName: "Eye",
    path: "/contact",
  },
  {
    id: "embedded-systems-c",
    title: "Embedded Systems & Microcontroller C++",
    category: "Senior & AI (Grades 9-12)",
    level: "Advanced",
    ageGroup: "Ages 13-18",
    duration: "36 Hours",
    tagline: "Direct bare-metal register manipulation, interrupts, and real-time control.",
    description:
      "Move beyond beginner abstractions. Write clean, high-performance C/C++ firmware, handle timer hardware interrupts, and master I2C/SPI bus communication.",
    badge: "ENGINEERING",
    topics: ["Hardware Timers & Interrupts", "I2C & SPI Sensor Buses", "PID Controller Tuning", "Serial Protocols"],
    iconName: "Terminal",
    path: "/contact",
  },

  // Specialized & Competitions
  {
    id: "wro-competition-prep",
    title: "WRO & Robotics Olympiad Arena Track",
    category: "Specialized & Competitions",
    level: "Mastery",
    ageGroup: "Ages 10-17",
    duration: "45 Hours",
    tagline: "Rigorous coaching for World Robot Olympiad & National Robofest arenas.",
    description:
      "Strategic arena optimization, precision mechanical repeatability, speed tuning, and rulebook compliance under high-pressure competitive conditions.",
    badge: "COMPETITION",
    topics: ["Speed-Accuracy Optimization", "Mechanical Repeatability", "Mission Rulebook Strategy", "Arena Simulation"],
    iconName: "Award",
    path: "/contact",
  },
  {
    id: "drone-aerial-robotics",
    title: "Drone Dynamics & Aerial Robotics",
    category: "Specialized & Competitions",
    level: "Advanced",
    ageGroup: "Ages 13-18",
    duration: "30 Hours",
    tagline: "Physics of flight, brushless ESCs, gyroscope stabilization, and telemetry.",
    description:
      "Explore aerodynamics, quadcopter frame kinematics, flight controllers, PID roll/pitch/yaw balance, and safe indoor piloting protocols.",
    badge: "AERONAUTICS",
    topics: ["Quadcopter Kinematics", "Gyro & Accelerometer IMUs", "ESC & Brushless Motors", "Flight Controller Setup"],
    iconName: "Compass",
    path: "/contact",
  },
];
