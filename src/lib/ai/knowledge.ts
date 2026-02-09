/**
 * Knowledge Context Builder
 * DevUp Society AI Assistant
 *
 * Builds the knowledge base from actual website data.
 * This ensures the AI answers are always accurate and up-to-date.
 */

import { AI_CONFIG } from "./config";
import { events } from "../../data/events";
import { teamMembers, coreTeam } from "../../data/team";
import type { KnowledgeContext } from "./types";

/**
 * Format a date string into a human-readable format
 */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Build the "About" section of the knowledge context
 */
function buildAboutContext(): string {
  const { SITE } = AI_CONFIG;

  return `
## ABOUT DEVUP SOCIETY

DevUp Society is THE most happening student-led tech community at ${SITE.institution} in ${SITE.location}! 🚀
- Founded: ${SITE.founded}
- Motto: "Code. Build. Deploy." — because that's what real developers do!
- Email: ${SITE.email}
- Website: ${SITE.website}

FOUNDING MEMBERS (The legends who started this revolution):
1. Mohammed Faizan Ali - Founder & Chief of Community & Vision
2. Syed Asif - Co-Founder
3. Thapendra D - Founding Member
4. Narsing Yadav - Founding Member
5. Sanchit Gupta - Founding Member

ABOUT THIS AI (DevUp AI):
- Created and developed entirely by the DevUp Community — a collaborative masterpiece by our talented student developers!
- This AI assistant showcases what DevUp members can build when passion meets skill.

WEBSITE DEVELOPMENT:
- This awesome website was developed by SAI SRUJAN and the Technical Team.

WHAT MAKES DEVUP SPECIAL:
- 🎯 Full-Stack Development (MERN, Django, Next.js)
- ☁️ DevOps & Cloud (Docker, Kubernetes, AWS)
- 🤖 AI/ML Engineering (PyTorch, TensorFlow, LLMs)
- 📱 Mobile Development (React Native, Flutter)
- 🌟 Open Source Contribution

EPIC THINGS WE DO:
- 🏆 Hackathons and coding competitions (Devthon, StackFest) — with amazing prizes!
- 💻 Technical workshops and hands-on sessions
- 🚀 Real-world project development
- 🤝 Industry mentorship and networking
- 🎤 Tech talks and knowledge sharing

HOW TO JOIN THE CREW:
- Recruitment happens periodically — keep an eye out!
- Join the WhatsApp community: ${SITE.socials.whatsapp}
- Follow on Instagram: ${SITE.socials.instagram}
- Check GitHub: ${SITE.socials.github}

COMMUNITY STATS:
- Active members: 100+
- Growing fast with passionate developers!
- Join WhatsApp for recruitment updates
- Website: ${SITE.website}

IMPORTANT NOTE:
- DevUp Society is a STUDENT COMMUNITY, not a DevOps tool or service!
- "DevUp" stands for "Developer Upliftment" — we uplift developers! 💚
- Not affiliated with any commercial entity.
`.trim();
}

/**
 * Build the "Events" section from actual events data
 */
function buildEventsContext(): string {
  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const pastEvents = events.filter((e) => e.status === "past");

  let eventsText = "## EVENTS\n\n";

  // Upcoming Events
  if (upcomingEvents.length > 0) {
    eventsText += "### UPCOMING EVENTS:\n\n";
    for (const event of upcomingEvents) {
      eventsText += `**${event.title}**\n`;
      eventsText += `- Date: ${formatDate(event.date)}\n`;
      eventsText += `- Location: ${event.location}\n`;
      eventsText += `- Mode: ${event.mode}\n`;
      eventsText += `- Status: UPCOMING\n`;
      eventsText += `- Description: ${event.shortDescription}\n`;
      if (event.isHackathon) {
        eventsText += `- Type: Hackathon\n`;
      }
      if (event.fee) {
        eventsText += `- Registration Fee: ₹${event.fee} per person\n`;
      }
      if (event.stats) {
        eventsText += `- Expected Participants: ${event.stats.participants}\n`;
        eventsText += `- Prize Pool: ${event.stats.prizePool}\n`;
      }
      if (event.prizes && event.prizes.length > 0) {
        eventsText += `- Prizes:\n`;
        for (const prize of event.prizes) {
          eventsText += `  - ${prize.type}: ${prize.amount}\n`;
        }
      }
      if (event.themes && event.themes.length > 0) {
        eventsText += `- Themes: ${event.themes.map((t) => t.title).join(", ")}\n`;
      }
      if (event.faqs && event.faqs.length > 0) {
        eventsText += `- FAQs:\n`;
        for (const faq of event.faqs) {
          eventsText += `  Q: ${faq.question} A: ${faq.answer}\n`;
        }
      }
      eventsText += `- More info: ${AI_CONFIG.SITE.website}/events/${event.slug}\n\n`;
    }
  }

  // Past Events
  if (pastEvents.length > 0) {
    eventsText += "### PAST EVENTS:\n\n";
    for (const event of pastEvents.slice(0, 5)) {
      eventsText += `**${event.title}**\n`;
      eventsText += `- Date: ${formatDate(event.date)}\n`;
      eventsText += `- Location: ${event.location}\n`;
      eventsText += `- Mode: ${event.mode}\n`;
      eventsText += `- Status: PAST\n`;
      eventsText += `- Description: ${event.shortDescription}\n\n`;
    }
  }

  return eventsText.trim();
}

/**
 * Build the "Team" section from actual team data
 */
function buildTeamContext(): string {
  // Get faculty advisors
  const faculty = coreTeam.filter((m) =>
    ["tm-001", "tm-002", "tm-003"].includes(m.id),
  );

  // Get core leadership
  const leadership = coreTeam.filter(
    (m) =>
      m.teamSlug === "leadership" &&
      !["tm-001", "tm-002", "tm-003"].includes(m.id),
  );

  // Get team leads
  const leads = coreTeam.filter(
    (m) => m.teamSlug !== "leadership" && m.role.toLowerCase().includes("lead"),
  );

  let teamText = "## TEAM MEMBERS\n\n";

  // Faculty Advisors
  teamText += "### FACULTY ADVISORS:\n";
  for (const member of faculty) {
    teamText += `- ${member.name} - ${member.role}\n`;
  }
  teamText += "\n";

  // Core Leadership
  teamText += "### CORE LEADERSHIP:\n";
  for (const member of leadership) {
    teamText += `- ${member.name} - ${member.role} (${member.year})\n`;
  }
  teamText += "\n";

  // Team Leads
  teamText += "### TEAM LEADS:\n";
  for (const member of leads) {
    teamText += `- ${member.name} - ${member.role} (${member.teamName})\n`;
  }
  teamText += "\n";

  teamText += `TOTAL TEAM SIZE: ${teamMembers.length}+ members across all teams\n`;

  return teamText.trim();
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
- Registration links for upcoming events

### TEAM PAGE (/team)
- Faculty advisors section
- Core leadership grid
- Links to individual team pages

### ABOUT PAGE (/about)
- Full history and mission
- Vision and values
- Entity information

### FAQ PAGE (/faq)
- Common questions about DevUp Society
- Organized by category
- Answers about joining, events, skills

### JOIN PAGE (/join)
- How to join DevUp Society
- Recruitment information
- WhatsApp community link

### COMMUNITY PAGE (/community)
- Community resources and links
- Social media links
- Discord/WhatsApp community
`.trim();
}

/**
 * Build the "FAQ" section - common questions and answers
 */
function buildFAQContext(): string {
  const { SITE } = AI_CONFIG;

  // Get upcoming event info for dynamic FAQ
  const upcomingHackathon = events.find(
    (e) => e.status === "upcoming" && e.isHackathon,
  );

  let faqText = `
## FREQUENTLY ASKED QUESTIONS

Q: How do I join DevUp Society?
A: Join our WhatsApp community to get notified about recruitment and events: ${SITE.socials.whatsapp}

Q: Is DevUp Society free to join?
A: Yes, joining the DevUp Society community is completely free. Some events may have registration fees.

Q: Who can join DevUp Society?
A: DevUp Society welcomes students from all colleges, not just VJIT. Anyone passionate about technology can join.

Q: Who founded DevUp Society?
A: DevUp Society was founded by Mohammed Faizan Ali along with Syed Asif, Thapendra D, Narsing Yadav, and Sanchit Gupta.

Q: Who developed this website?
A: This website was developed by SAI SRUJAN and the Technical Team.

Q: How can I contact DevUp Society?
A: Email: ${SITE.email}, WhatsApp: Join community link, Instagram: @devupcommunity

Q: What tech stack does DevUp focus on?
A: Full-Stack (MERN, Django, Next.js), DevOps (Docker, K8s, AWS), AI/ML (PyTorch, TensorFlow), Mobile (React Native, Flutter)

Q: Is DevUp Society the same as DevOps?
A: No! DevUp Society is a student developer community. "DevUp" stands for "Developer Upliftment." While we teach DevOps as one topic, we are NOT a DevOps tool or service.

Q: Where is DevUp Society located?
A: DevUp Society is based at VJIT (Vidya Jyothi Institute of Technology) in Hyderabad, Telangana, India.
`;

  // Add dynamic event FAQ if available
  if (upcomingHackathon) {
    faqText += `
Q: When is the next hackathon?
A: ${upcomingHackathon.title} is scheduled for ${formatDate(upcomingHackathon.date)}. Visit ${SITE.website}/events/${upcomingHackathon.slug} for details.

Q: What is the registration fee for ${upcomingHackathon.title}?
A: ${upcomingHackathon.fee ? `₹${upcomingHackathon.fee} per person.` : "Check the event page for current pricing."}

Q: What is the prize pool for ${upcomingHackathon.title}?
A: ${upcomingHackathon.stats?.prizePool || "Check the event page for prize details."}
`;

    if (upcomingHackathon.themes && upcomingHackathon.themes.length > 0) {
      faqText += `
Q: What are the themes for ${upcomingHackathon.title}?
A: ${upcomingHackathon.themes.map((t) => t.title).join(", ")}.
`;
    }
  }

  return faqText.trim();
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
