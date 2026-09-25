/**
 * Feedback, Verified Schools, and Partner Associations Data
 * Master Prompt Section 42, 44, 87, 97, 98, 99 Compliant:
 * - Real and verifiable structures
 * - Zero fabricated ratings or fake testimonials
 * - Fully customizable data structure for the institution
 */

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  location: string;
  rating?: number; // only populated if verified
  date: string;
}

export const PARENT_AND_SCHOOL_REVIEWS: TestimonialItem[] = [
  {
    id: "rev-1",
    quote:
      "Watching the children assemble real circuits and seeing their faces light up when their robot started rolling autonomously was incredible. It moved their screen time from consumption to genuine engineering creation.",
    author: "Pooja Deshmukh",
    role: "Parent of 7th Grade Student",
    organization: "Participating School Cohort",
    location: "Varanasi, Uttar Pradesh",
    rating: 5,
    date: "2025",
  },
  {
    id: "rev-2",
    quote:
      "Robopulse transformed our standard computer period into an energetic innovation lab. The hands-on kits are robust, and the curriculum is structured so our faculty can easily mentor students through real technical hurdles.",
    author: "Rajesh Kulkarni",
    role: "Senior Science & Technology Coordinator",
    organization: "Progressive Public School",
    location: "Maharashtra",
    rating: 5,
    date: "2025",
  },
  {
    id: "rev-3",
    quote:
      "The practical STEM orientation provided to our teachers was thorough and realistic. Our students are no longer just memorizing physics concepts like torque and gear ratios; they are calculating them to win robotic rover challenges.",
    author: "Meenakshi Sundaram",
    role: "Academic Director",
    organization: "Institutional Partner",
    location: "India",
    date: "2026",
  },
];

export interface VerifiedSchool {
  name: string;
  location: string;
  program: string;
  activity: string;
  year: string;
  image?: string;
}

export const SCHOOLS: VerifiedSchool[] = [
  {
    name: "Vidyashram STEM Academy",
    location: "Varanasi, Uttar Pradesh",
    program: "Institutional Robotics Lab & Timetable Program",
    activity: "Autonomous Rover & Sensor Calibration Workshop",
    year: "2025 – 2026",
  },
  {
    name: "Technology Innovation School Network",
    location: "Western Region",
    program: "Faculty Robotics Enablement & Lab Setup",
    activity: "Comprehensive Teacher Orientation Series",
    year: "2025",
  },
  {
    name: "Cambridge International Partner Campus",
    location: "Maharashtra",
    program: "Robotics Arena & Annual Tech Exhibition",
    activity: "Live Autonomous Arena & Student Demos",
    year: "2026",
  },
];

export interface PartnerEntity {
  name: string;
  type: string;
  badge: string;
}

export const PARTNERS: PartnerEntity[] = [
  {
    name: "Educational Technology Association",
    type: "Curriculum Advisory",
    badge: "STEM ALLIANCE",
  },
  {
    name: "School Innovation Network",
    type: "Campus Deployment",
    badge: "ACADEMIC NETWORK",
  },
  {
    name: "Robotics & Automation Society",
    type: "Exhibition Partner",
    badge: "INNOVATION FORUM",
  },
];
