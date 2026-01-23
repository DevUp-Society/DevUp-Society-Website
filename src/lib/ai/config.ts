/**
 * AI Assistant Configuration
 * DevUp Society - Site-Restricted AI Assistant
 *
 * Production-ready configuration aligned with main website.
 */

export const AI_CONFIG = {
  // OpenRouter Configuration
  OPENROUTER_API_URL: "https://openrouter.ai/api/v1/chat/completions",
  MODEL: "google/gemma-3-4b-it:free", // Primary: free, fast via Google AI Studio
  FALLBACK_MODELS: [
    "qwen/qwen3-4b:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "mistralai/mistral-small-3.1-24b-instruct:free",
  ],

  // Model Parameters - Low temperature for consistent responses
  TEMPERATURE: 0.2,
  MAX_TOKENS: 350, // Enough for rich, impressive responses
  TOP_P: 0.9,

  // Response Configuration
  FALLBACK_RESPONSE:
    "Great question! 🚀 While I don't have the exact details on that, I'd love to point you in the right direction. Check out our website at devupvjit.in, or drop a message in our WhatsApp community — our amazing members are always ready to help!",

  ERROR_RESPONSE:
    "Oops! 😅 Hit a small bump there. Give it another shot, or reach out directly to our team on WhatsApp — we're always around to help fellow developers!",

  // Site Configuration — aligned with main website
  SITE: {
    name: "DevUp Society",
    tagline: "Code. Build. Deploy.",
    institution: "Vidya Jyothi Institute of Technology (VJIT)",
    location: "Hyderabad, Telangana, India",
    founded: "2024",
    website: "https://www.devupvjit.in",
    email: "devupsociety@vjit.ac.in",
    socials: {
      github: "https://github.com/DevUp-Society",
      linkedin: "https://www.linkedin.com/company/devup-community",
      instagram: "https://www.instagram.com/devupcommunity/",
      twitter: "https://twitter.com/devup_society",
      whatsapp: "https://chat.whatsapp.com/CvU68WlMmoo5PvIBpOU5Dy",
    },
  },
} as const;

/**
 * System prompt that makes the AI engaging, creative, and impressive
 * while staying accurate to DevUp Society information.
 */
export const SYSTEM_PROMPT = `You are DevUp AI, assistant for DevUp Society at VJIT, Hyderabad.

IMPORTANT IDENTITY:
- You were created/made by DEVUP SOCIETY. When asked "who made you" or "who created you", always answer: "I was made by DEVUP SOCIETY Team!"

RULES:
1. ONLY use the CONTEXT below. No external knowledge.
2. If not in context, say: "I don't have that info. Ask about DevUp events, team, or how to join!"
3. Never make up facts. Be concise and friendly.
4. For unrelated topics, respond warmly: "Hey there! 😊 That's outside my expertise, but I'd love to help you with DevUp Society - our events, team, projects, or how to join. What can I tell you about DevUp?"

CONTEXT:
{KNOWLEDGE_CONTEXT}

Answer briefly and helpfully.`;
