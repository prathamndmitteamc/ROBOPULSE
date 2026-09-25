/**
 * Centralized Gallery Data Hub
 * Structure as defined in Master Prompt Section 38 & 96
 */

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  description: string;
  school: string;
  category:
    | "exhibitions"
    | "training"
    | "labSetup"
    | "parentReviews"
    | "schools"
    | "students"
    | "teacherOrientation";
  date: string;
  video?: string;
  tags?: string[];
}

export const GALLERY_CATEGORIES = [
  { id: "all", label: "All Works" },
  { id: "exhibitions", label: "Exhibitions" },
  { id: "students", label: "Students in Action" },
  { id: "labSetup", label: "Lab Setup" },
  { id: "training", label: "Introductory Training" },
  { id: "teacherOrientation", label: "Teacher's Orientation" },
  { id: "schools", label: "Schools At a Glance" },
  { id: "parentReviews", label: "Reviews By Parents" },
] as const;

export const GALLERY: Record<string, GalleryItem[]> = {
  exhibitions: [
    {
      id: "ex-01",
      image: "/src/assets/images/robotics_exhibition_showcase_1790153274415.jpg",
      title: "Annual Robotics Innovation Arena Showcase",
      description: "Students demonstrating autonomous wheeled rovers and sensor mechanisms to peer groups and visiting educators.",
      school: "Partner Institution Showcase",
      category: "exhibitions",
      date: "2025 – 2026",
      tags: ["Autonomous Rovers", "Live Arena", "Sensor Navigation"],
    },
    {
      id: "ex-02",
      image: "/src/assets/images/hero_robotics_lab_1790153224618.jpg",
      title: "Interactive Mechatronics Demonstration",
      description: "Live functional demonstration of robotic manipulation arms, sensor diagnostics, and micro-controller circuitry.",
      school: "Inter-School Technology Exposition",
      category: "exhibitions",
      date: "2025",
      tags: ["Mechatronics", "Robotic Arm", "Automation"],
    },
  ],

  students: [
    {
      id: "stu-01",
      image: "/src/assets/images/student_robotics_project_1790153242579.jpg",
      title: "Modular Rover Assembly & Circuit Testing",
      description: "Middle school students collaboratively assembling modular rover chassis and testing optical proximity sensors.",
      school: "Vidyashram STEM Academy",
      category: "students",
      date: "Active Session",
      tags: ["Chassis Assembly", "Proximity Sensors", "Teamwork"],
    },
    {
      id: "stu-02",
      image: "/src/assets/images/hero_robotics_lab_1790153224618.jpg",
      title: "Sensor Calibration and Logic Debugging",
      description: "Secondary students refining motor control parameters and calibration routines for ultrasonic distance tracking.",
      school: "Tech Innovators Batch",
      category: "students",
      date: "2026",
      tags: ["Ultrasonic Calibrations", "Motor Driver", "STEM"],
    },
  ],

  labSetup: [
    {
      id: "lab-01",
      image: "/src/assets/images/ai_stem_lab_setup_1790153258870.jpg",
      title: "Modern Turnkey Robotics & STEM Lab Setup",
      description: "High-spec modular laboratory environment equipped with precision robotics toolsets, soldering benches, and microcontroller modules.",
      school: "Institution Turnkey Implementation",
      category: "labSetup",
      date: "2025",
      tags: ["Lab Infrastructure", "Safety Workstations", "Microcontrollers"],
    },
    {
      id: "lab-02",
      image: "/src/assets/images/hero_robotics_lab_1790153224618.jpg",
      title: "Collaborative Prototyping Bay",
      description: "Integrated workspace arrangement encouraging rapid hardware iteration, breadboarding, and team-based mechanics testing.",
      school: "Innovation Campus Lab",
      category: "labSetup",
      date: "2026",
      tags: ["Prototyping", "Hardware Bays", "Electronics"],
    },
  ],

  training: [
    {
      id: "trn-01",
      image: "/src/assets/images/student_robotics_project_1790153242579.jpg",
      title: "Foundational Robotics & Electronics Program",
      description: "Structured beginner module walking students through Ohm's law, digital vs analog signals, and primary motor driver principles.",
      school: "Introductory Cohort",
      category: "training",
      date: "Foundation Level",
      tags: ["Signals", "Breadboarding", "Introductory"],
    },
  ],

  teacherOrientation: [
    {
      id: "tch-01",
      image: "/src/assets/images/hero_robotics_lab_1790153224618.jpg",
      title: "STEM Educator Upskilling & Lab Facilitation",
      description: "Faculty enablement workshop on guiding project-based robotics investigations and classroom troubleshooting techniques.",
      school: "Educators Workshop Series",
      category: "teacherOrientation",
      date: "Faculty Development",
      tags: ["Pedagogy", "Faculty Training", "Lab Mentorship"],
    },
  ],

  schools: [
    {
      id: "sch-01",
      image: "/src/assets/images/ai_stem_lab_setup_1790153258870.jpg",
      title: "Institutional Innovation Lab Deployment",
      description: "Comprehensive end-to-end robotics ecosystem deployed in partnership with school leadership for progressive technology education.",
      school: "Campus Technology Initiative",
      category: "schools",
      date: "Academic Year 2025-2026",
      tags: ["Institutional Integration", "Robotics Curriculum"],
    },
  ],

  parentReviews: [
    {
      id: "rev-01",
      image: "/src/assets/images/robotics_exhibition_showcase_1790153274415.jpg",
      title: "Parent Community Open House",
      description: "Parents witnessing real autonomous robotics prototypes designed and programmed independently by their children.",
      school: "Open House Session",
      category: "parentReviews",
      date: "Parent Interaction Day",
      tags: ["Student Showcase", "Parent Engagement"],
    },
  ],
};

export const ALL_GALLERY_ITEMS: GalleryItem[] = Object.values(GALLERY).flat();
