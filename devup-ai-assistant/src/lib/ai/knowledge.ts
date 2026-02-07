/**
 * Knowledge Context Builder
 * DevUp Society - Site-Restricted AI Assistant
 *
 * Copy this file to: src/lib/ai/knowledge.ts
 *
 * ⚠️ CUSTOMIZE THIS FILE: Update with YOUR organization's data!
 *
 * This file builds the knowledge base that the AI uses to answer questions.
 * You can either:
 * 1. Import your existing data files (events.ts, team.ts)
 * 2. Or hardcode the information directly in this file
 */

// =====================================================
// OPTION 1: Import your existing data files
// Uncomment and modify these imports to match your project:
// =====================================================
// import { events, type Event } from "../../data/events";
// import { teamMembers, coreTeam } from "../../data/team";

import { AI_CONFIG } from "./config";
import type { KnowledgeContext } from "./types";

/**
 * Build the "About" section of the knowledge context
 *
 * ⚠️ CUSTOMIZE: Update all information about your organization
 */
function buildAboutContext(): string {
  const { SITE } = AI_CONFIG;

  return `
## ABOUT DEVUP SOCIETY

DevUp Society is a student-led tech community at ${SITE.institution} in ${SITE.location}.
- Founded: ${SITE.founded}
- Tagline: "${SITE.tagline}"
- Motto: "Code. Build. Deploy."
- Email: ${SITE.email}
- Website: ${SITE.website}

FOUNDING MEMBERS (Who led the foundation of DevUp Society):
1. Faizan Ali - Main Founder
2. Syed Asif
3. Thapendra
4. Narsing
5. Sanchit

WEBSITE DEVELOPMENT:
- This website was developed by SAI SRUJAN and his Technical Team.

FOCUS AREAS:
- Full-Stack Development (MERN, Django, Next.js)
- DevOps & Cloud (Docker, Kubernetes, AWS)
- AI/ML Engineering (PyTorch, TensorFlow, LLMs)
- Mobile Development (React Native, Flutter)

WHAT WE DO:
- Weekly workshops and hands-on sessions
- Hackathons and coding competitions
- Real-world project development
- Industry mentorship and networking
- Tech talks and knowledge sharing

HOW TO JOIN:
- Recruitment happens periodically (currently closed)
- Join the WhatsApp community: ${SITE.socials.whatsapp}
- Follow on Instagram: ${SITE.socials.instagram}
- Check GitHub: ${SITE.socials.github}

CURRENT STATUS:
- Active members: 60+
- Recruitment: Currently closed (join WhatsApp for updates)
- Community platform: Under construction (expected Q2 2026)
`.trim();
}

/**
 * Build the "Events" section of the knowledge context
 *
 * ⚠️ CUSTOMIZE: Add your events here
 *
 * If you have an events.ts file, import it and use the data.
 * Otherwise, hardcode your events below.
 */
function buildEventsContext(): string {
  // Example hardcoded events - replace with your actual events
  return `
## EVENTS

### UPCOMING EVENTS:

**DevThon 2026**
- Date: Thursday, February 27, 2026 to Friday, February 28, 2026
- Location: VJIT Campus - Main Auditorium & Labs
- Mode: offline
- Status: UPCOMING
- Description: A 24-hour coding marathon exclusively for 1st Year students! Build innovative solutions, compete for prizes worth ₹35,000+, and kickstart your development journey.
- Type: Hackathon (24-hour coding challenge)
- Registration Fee: ₹150 per person
- Expected Participants: 200+
- Prize Pool: ₹35,000+
- Prizes:
  - Gold: ₹15,000 (certificates, LinkedIn recommendations)
  - Silver: ₹10,000 (certificates, LinkedIn recommendations)
  - Bronze: ₹5,000 (certificates)
- Themes/Tracks: Smart City, HealthTech, EdTech, Open Innovation
- Registration: Opens February 5, 2026 at 10:00 AM

### PAST EVENTS:

**StackFest 2024**
- Date: Saturday, November 30, 2024
- Location: VJIT Campus
- Mode: offline
- Status: PAST
- Description: Full-Stack Masterclass covering modern web development with React, Node.js, and MongoDB.
`.trim();
}

/**
 * Build the "Team" section of the knowledge context
 *
 * ⚠️ CUSTOMIZE: Add your team members here
 */
function buildTeamContext(): string {
  return `
## TEAM MEMBERS

### FACULTY ADVISORS:
- Dr. M Srinivas Rao - Faculty Coordinator
- Dr. G Ramesh - Associate Faculty Coordinator
- Mr. K Naveen Kumar - Technical Mentor

### CORE LEADERSHIP:
- Mohammed Faizan Ali - Chief of Community & Vision (4th Year)
- Syed Asif - Chief Executive Director (3rd Year)
- Thapendra D - Executive Director - Operations (3rd Year)
- B Narsing - Executive Director - Technical (3rd Year)
- Sanchit - Executive Director - Strategy (3rd Year)

### TECH TEAM:
- K Sai Srujan - Tech Lead
- Plus 10+ team members

### MARKETING TEAM:
- Team handling social media and outreach

### EVENTS TEAM:
- Team managing hackathons and workshops

TOTAL TEAM SIZE: 60+ members across all teams
`.trim();
}

/**
 * Build the "Pages" section - descriptions of website pages
 */
function buildPagesContext(): string {
  return `
## WEBSITE PAGES

### HOME PAGE (/)
- Hero section with animated title
- About DevUp Society section
- Focus areas: Full-Stack, DevOps, AI/ML, Mobile Dev
- Call-to-action to join

### EVENTS PAGE (/events)
- Lists all upcoming and past events
- Event cards with date, location, and details
- Registration information

### TEAM PAGE (/team)
- Faculty advisors section
- Core leadership grid
- Links to individual team pages

### PROJECTS PAGE (/projects)
- Featured projects showcase
- Project cards with tech stack and links

### JOIN PAGE (/join)
- Recruitment status
- WhatsApp community join link
- Newsletter subscription form

### COMMUNITY PAGE (/community)
- Community resources and platform
`.trim();
}

/**
 * Build the "FAQ" section - common questions and answers
 *
 * ⚠️ CUSTOMIZE: Add your frequently asked questions
 */
function buildFAQContext(): string {
  return `
## FREQUENTLY ASKED QUESTIONS

Q: How do I join DevUp Society?
A: Recruitment is currently closed. Join our WhatsApp community to get notified when recruitment opens: https://chat.whatsapp.com/CvU68WlMmoo5PvIBpOU5Dy

Q: When is the next hackathon?
A: DevThon 2026 is scheduled for February 27-28, 2026. It's a 24-hour offline hackathon at VJIT Campus.

Q: What is the registration fee for DevThon?
A: ₹150 per person. This includes food and swag. Team size is 2-4 members.

Q: What are the prizes for DevThon?
A: Gold: ₹15,000, Silver: ₹10,000, Bronze: ₹5,000. Total prize pool is ₹35,000+.

Q: Who can participate in DevThon 2026?
A: Exclusively for 1st Year VJIT students.

Q: What are the hackathon themes?
A: Smart City, HealthTech, EdTech, and Open Innovation.

Q: Who is the founder/leader of DevUp Society?
A: Mohammed Faizan Ali is the Chief of Community & Vision (Main Founder). The society was founded by Faizan Ali, Syed Asif, Thapendra, Narsing, and Sanchit.

Q: Who developed this website?
A: This website was developed by SAI SRUJAN and his Technical Team.

Q: How can I contact DevUp Society?
A: Email: devupsociety@gmail.com, WhatsApp: Join community link, Instagram: @devupcommunity

Q: What tech stack does DevUp focus on?
A: Full-Stack (MERN, Django, Next.js), DevOps (Docker, K8s, AWS), AI/ML (PyTorch, TensorFlow), Mobile (React Native, Flutter)

Q: Is DevUp only for IT students?
A: While based in the IT department at VJIT, DevUp welcomes students from CSE, ECE, and other branches interested in technology.
`.trim();
}

/**
 * Main function: Build the complete knowledge context
 * This is called at request time to compile all site knowledge
 */
export function buildKnowledgeContext(): string {
  const sections: KnowledgeContext = {
    about: buildAboutContext(),
    events: buildEventsContext(),
    team: buildTeamContext(),
    pages: buildPagesContext(),
    faq: buildFAQContext(),
  };

  // Combine all sections into a single context string
  const fullContext = [
    sections.about,
    sections.events,
    sections.team,
    sections.pages,
    sections.faq,
  ].join("\n\n---\n\n");

  return fullContext;
}

/**
 * Get a specific section of the knowledge context
 * Useful for debugging or selective context injection
 */
export function getKnowledgeSection(section: keyof KnowledgeContext): string {
  switch (section) {
    case "about":
      return buildAboutContext();
    case "events":
      return buildEventsContext();
    case "team":
      return buildTeamContext();
    case "pages":
      return buildPagesContext();
    case "faq":
      return buildFAQContext();
    default:
      return "";
  }
}
