import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('[ERROR] dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(templatePath, 'utf-8');

const routes = [
  {
    route: 'about',
    canonical: 'https://robopulse.smartgurukulam.com/about',
    title: 'About RoboPulse Intelligence — Mission, Leadership & Pedagogy',
    description: 'Learn how RoboPulse Intelligence engineers future-ready creators through hands-on robotics, AI literacy, and practical STEM learning across schools in India.'
  },
  {
    route: 'services',
    canonical: 'https://robopulse.smartgurukulam.com/services',
    title: 'School Robotics Labs & STEM Services — RoboPulse Intelligence',
    description: 'Turnkey robotics laboratory setup, CBSE-aligned curriculum integration, experiential STEM workshops, and faculty training for schools in India.'
  },
  {
    route: 'courses',
    canonical: 'https://robopulse.smartgurukulam.com/courses',
    title: 'Grade-Aligned Robotics & AI Courses (Grades 1-12) — RoboPulse Intelligence',
    description: 'Explore progressive robotics, coding, embedded systems, and computer vision courses tailored for primary, middle, and high school students.'
  },
  {
    route: 'robotics',
    canonical: 'https://robopulse.smartgurukulam.com/robotics',
    title: 'Robotics Lab Setup & Mechatronics Education — RoboPulse Intelligence',
    description: 'Complete school robotics lab infrastructure, modular workbenches, microcontrollers, sensor arrays, and hands-on hardware kits for K-12 campuses.'
  },
  {
    route: 'stem',
    canonical: 'https://robopulse.smartgurukulam.com/stem',
    title: 'Experiential STEM Education & Learning Pedagogy — RoboPulse Intelligence',
    description: 'Bridging textbook theory with tactile engineering through project-based learning, inquiry, and design thinking for forward-thinking Indian schools.'
  },
  {
    route: 'reviews',
    canonical: 'https://robopulse.smartgurukulam.com/reviews',
    title: 'School & Parent Reviews — RoboPulse Intelligence',
    description: 'Read verified feedback from school principals, STEM coordinators, and parents on RoboPulse robotics labs and student learning outcomes.'
  },
  {
    route: 'gallery',
    canonical: 'https://robopulse.smartgurukulam.com/gallery',
    title: 'Robotics Lab Exhibition & Campus Showcase — RoboPulse Intelligence',
    description: 'Browse real school robotics labs, student projects, teacher training sessions, and campus exhibitions deployed by RoboPulse Intelligence.'
  },
  {
    route: 'contact',
    canonical: 'https://robopulse.smartgurukulam.com/contact',
    title: 'Contact RoboPulse Intelligence — School Lab Enquiry & Demos',
    description: 'Connect with RoboPulse Intelligence in Pune and Varanasi. Request a turnkey robotics lab proposal, curriculum consultation, or campus demonstration.'
  },
  {
    route: 'chat',
    canonical: 'https://robopulse.smartgurukulam.com/chat',
    title: 'RoboPulse AI Assistant — Academic & Lab Advisory',
    description: 'Interact with the RoboPulse AI Assistant to explore school robotics curricula, turnkey lab planning, and hands-on STEM programs.'
  },
  {
    route: 'solutions',
    canonical: 'https://robopulse.smartgurukulam.com/services',
    title: 'School Robotics Labs & STEM Services — RoboPulse Intelligence',
    description: 'Turnkey robotics laboratory setup, CBSE-aligned curriculum integration, experiential STEM workshops, and faculty training for schools in India.'
  },
  {
    route: 'showcase',
    canonical: 'https://robopulse.smartgurukulam.com/gallery',
    title: 'Robotics Lab Exhibition & Campus Showcase — RoboPulse Intelligence',
    description: 'Browse real school robotics labs, student projects, teacher training sessions, and campus exhibitions deployed by RoboPulse Intelligence.'
  }
];

let generatedCount = 0;

for (const item of routes) {
  let html = baseHtml;

  // 1. Replace Canonical URL
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${item.canonical}" />`
  );

  // 2. Replace Title Tag
  html = html.replace(
    /<title>.*?<\/title>/is,
    `<title>${item.title}</title>`
  );

  // 3. Replace Meta Description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${item.description}" />`
  );

  // 4. Replace OpenGraph URL
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${item.canonical}" />`
  );

  // 5. Replace OpenGraph Title
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${item.title}" />`
  );

  // 6. Replace OpenGraph Description
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${item.description}" />`
  );

  // 7. Replace Twitter Title
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${item.title}" />`
  );

  // 8. Replace Twitter Description
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${item.description}" />`
  );

  const routeDir = path.join(distDir, item.route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }

  fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf-8');
  generatedCount++;
  console.log(`[SEO-GEN] Generated: dist/${item.route}/index.html (canonical: ${item.canonical})`);
}

console.log(`[SEO-GEN] Successfully generated ${generatedCount} route-specific static HTML entrypoints.`);
