/**
 * AI Assistant Configuration
 * DevUp Society - Site-Restricted AI Assistant
 * 
 * Copy this file to: src/lib/ai/config.ts
 * 
 * ⚠️ CUSTOMIZE THIS FILE for your organization!
 */

export const AI_CONFIG = {
    // OpenRouter Configuration - DO NOT CHANGE
    OPENROUTER_API_URL: "https://openrouter.ai/api/v1/chat/completions",
    MODEL: "meta-llama/llama-3.3-70b-instruct:free", // Free, fast (<2s), high quality
    
    // Model Parameters - Low temperature for consistent responses
    TEMPERATURE: 0.2,
    MAX_TOKENS: 250, // Reduced for faster responses
    TOP_P: 0.9,
    
    // Response Configuration
    FALLBACK_RESPONSE: "I can only answer questions about DevUp Society, our events, team members, and activities. I don't have information about that specific topic. Could you ask me something about our hackathons, team, or how to join DevUp?",
    
    ERROR_RESPONSE: "I'm having trouble processing your request right now. Please try again in a moment, or reach out to our team directly via WhatsApp.",
    
    // =====================================================
    // ⚠️ CUSTOMIZE BELOW: Update with YOUR organization info
    // =====================================================
    SITE: {
        name: "DevUp Society",
        tagline: "Where Code Meets Innovation",
        institution: "Vidya Jyothi Institute of Technology (VJIT)",
        location: "Hyderabad, India",
        founded: "2024",
        website: "https://devup-society.com",
        email: "devupsociety@gmail.com",
        socials: {
            github: "https://github.com/DevUp-Society",
            linkedin: "https://www.linkedin.com/company/devup-community",
            instagram: "https://www.instagram.com/devupcommunity/",
            whatsapp: "https://chat.whatsapp.com/CvU68WlMmoo5PvIBpOU5Dy"
        }
    }
} as const;

/**
 * System prompt that strictly restricts the AI to only answer
 * from the provided context. This is the core anti-hallucination measure.
 * 
 * ⚠️ CUSTOMIZE: Update the identity section for your assistant
 */
export const SYSTEM_PROMPT = `You are DevUp AI, assistant for DevUp Society at VJIT, Hyderabad.
Created by the DevUp Community (student developers). Be enthusiastic, helpful, and concise.
Use 1-2 emojis per response. Give specific, actionable answers from the CONTEXT below.
If info isn't in context, redirect to devupvjit.in or WhatsApp. Never make up facts.
For off-topic questions, redirect to DevUp topics. "DevUp" = "Developer Upliftment", NOT DevOps.

CONTEXT:
{KNOWLEDGE_CONTEXT}

Answer briefly and helpfully.`;
