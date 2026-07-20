// Portfolio content — grounded only in what is real (the two shipped case studies).
// No invented years, companies, client counts, or awards.

import altimetrikLogo from "@/assets/companies/altimetrik.svg";
import maxyfiLogo from "@/assets/companies/maxyfi.svg";
import zenstatementLogo from "@/assets/companies/zenstatement.svg";

import heygenAi from "@/assets/ai-logos/heygen.svg";
import canvaAi from "@/assets/ai-logos/canva.svg";
import claudeAi from "@/assets/ai-logos/claude.svg";
import notionAi from "@/assets/ai-logos/notion.svg";
import v0Ai from "@/assets/ai-logos/v0.svg";
import replitAi from "@/assets/ai-logos/replit.svg";
import geminiAi from "@/assets/ai-logos/gemini.svg";
import boltAi from "@/assets/ai-logos/bolt.svg";

export const PROFILE = {
  name: "Suriya Kumar J",
  role: "Product Designer",
  location: "India · Remote",
  email: "suriyakumar.jsk10@gmail.com",
  // Opens in a new tab (résumé / CV).
  resumeUrl: "https://drive.google.com/file/d/1LY5Mq_6hGA1QgqZkJ6jVA6tVtEb0h8vh/view?usp=drive_link",
  // Fill these in when the user provides them; empty = shown but inert.
  socials: {
    linkedin: "https://www.linkedin.com/in/suriya-kumar-jsk10/",
    github: "",
    x: "",
    dribbble: "",
  },
  available: true,
  // One-line value proposition (hero headline).
  tagline: ["Designing", "clarity", "into complex products."],
};

// About-page introduction — concise, authentic, human.
export const ABOUT_INTRO = [
  "I'm Suriya Kumar J — a product designer who turns complex, high-stakes workflows into products that feel calm and obvious to use.",
  "I'm drawn to problems where clarity matters — where people are moving real money or making decisions they can't undo. I work end-to-end: sitting with the real workflow, mapping every state with engineers, and shaping systems teams can build on.",
  "The products I enjoy most are the operational, data-heavy ones that look intimidating at first. The craft is making them feel simple.",
];

// Experience — the real, shipped work (most recent first).
export const EXPERIENCE = [
  {
    company: "Altimetrik",
    logo: altimetrikLogo,
    role: "Senior Engineer — Digital Experience Design",
    period: "Nov 2025 — Present",
    impact:
      "Designing product experiences for enterprise clients — partnering closely with product and engineering teams to take complex, data-heavy tools from problem framing through to polished, shipped UI.",
  },
  {
    company: "ZenStatement",
    logo: zenstatementLogo,
    role: "Founding Product Designer",
    period: "Sep 2024 — Nov 2025",
    impact:
      "Designed the reconciliation experience end-to-end — turning spreadsheet matching of thousands of transactions into a dashboard that leads with the exceptions that matter.",
  },
  {
    company: "Maxyfi",
    logo: maxyfiLogo,
    role: "Product Designer (Founding Team)",
    period: "Jan 2022 — Sep 2024",
    impact:
      "Brought a dense desktop collections workflow to a mobile field-agent app — fewer taps, a clear daily agenda, and real-time status managers can trust.",
  },
];

// Skills grouped into categories.
export const SKILL_GROUPS = [
  { title: "Product Design", items: ["UX Design", "UI Design", "Interaction Design", "Design Systems", "Wireframing", "Prototyping", "Accessibility"] },
  { title: "Research", items: ["User Research", "Usability Testing", "Information Architecture", "Journey Mapping"] },
  { title: "Tools", items: ["Figma", "FigJam", "Adobe CC", "Maze", "Miro"] },
];

// AI-assisted workflow — rendered as brand logos (white in dark theme).
// NOTE: "Gemini" and "Bolt" are best-guess names for the two unlabelled SVGs
// (a "G" lettermark and a sail/"B" mark) — confirm and I'll fix the alt text.
export const AI_LOGOS = [
  { name: "HeyGen", src: heygenAi },
  { name: "Canva", src: canvaAi },
  { name: "Claude", src: claudeAi },
  { name: "Notion", src: notionAi },
  { name: "v0", src: v0Ai },
  { name: "Replit", src: replitAi },
  { name: "Gemini", src: geminiAi },
  { name: "Bolt", src: boltAi },
];

// Design principles (About page).
export const DESIGN_PRINCIPLES = [
  { n: "01", title: "Clarity over decoration", body: "Design should communicate before it impresses." },
  { n: "02", title: "One screen, one job", body: "Each screen does one thing well. Everything else is a distraction." },
  { n: "03", title: "Research before pixels", body: "Good decisions start with understanding people, not aesthetics." },
  { n: "04", title: "Consistency builds trust", body: "Familiar patterns make a product easier to learn — and to trust." },
];
