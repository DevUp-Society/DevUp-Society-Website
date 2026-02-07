/**
 * OpenRouter API Client for DevUp AI Assistant
 *
 * This client handles all communication with OpenRouter's API.
 * Server-side only — never expose API keys to the client.
 */

import { AI_CONFIG, SYSTEM_PROMPT } from "./config";
import { buildKnowledgeContext } from "./knowledge";
import type {
  AssistantRequest,
  AssistantResponse,
  OpenRouterRequest,
  OpenRouterResponse,
  OpenRouterMessage,
} from "./types";

/**
 * OpenRouter error response structure
 */
interface OpenRouterErrorResponse {
  error?: {
    message?: string;
    code?: string;
  };
}

/**
 * Validates that required environment variables are set
 */
function validateEnvironment(): { valid: boolean; error?: string } {
  const apiKey = import.meta.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return {
      valid: false,
      error: "OPENROUTER_API_KEY environment variable is not set",
    };
  }

  return { valid: true };
}

/**
 * Builds the complete system prompt with knowledge context
 */
function buildSystemPrompt(): string {
  const knowledgeContext = buildKnowledgeContext();
  return SYSTEM_PROMPT.replace("{KNOWLEDGE_CONTEXT}", knowledgeContext);
}

/**
 * Makes a request to OpenRouter API
 */
async function callOpenRouter(
  messages: OpenRouterMessage[],
): Promise<OpenRouterResponse> {
  const apiKey = import.meta.env.OPENROUTER_API_KEY;
  const siteUrl = AI_CONFIG.SITE.website;
  const siteName = AI_CONFIG.SITE.name;

  const requestBody: OpenRouterRequest = {
    model: AI_CONFIG.MODEL,
    messages,
    temperature: AI_CONFIG.TEMPERATURE,
    max_tokens: AI_CONFIG.MAX_TOKENS,
    top_p: AI_CONFIG.TOP_P,
  };

  const response = await fetch(AI_CONFIG.OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": siteUrl,
      "X-Title": siteName,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("OpenRouter API Error:", {
      status: response.status,
      body: errorBody,
    });

    let errorMessage = `OpenRouter API error: ${response.status}`;

    try {
      const errorJson = JSON.parse(errorBody) as OpenRouterErrorResponse;
      if (errorJson.error?.message) {
        errorMessage = errorJson.error.message;
      }
    } catch {
      errorMessage = `OpenRouter API error: ${response.status} - ${response.statusText}`;
    }

    throw new Error(errorMessage);
  }

  return response.json() as Promise<OpenRouterResponse>;
}

/**
 * Determines confidence level based on response content
 */
function determineConfidence(
  response: string,
): "high" | "medium" | "low" | "none" {
  const lowerResponse = response.toLowerCase();

  // Low confidence indicators - redirect responses (but still helpful!)
  const redirectIndicators = [
    "check out devupvjit.in",
    "connect with us",
    "jump into our whatsapp",
    "reach out to our team",
    "for the latest details",
  ];

  if (
    redirectIndicators.some((indicator) => lowerResponse.includes(indicator)) &&
    lowerResponse.length < 150
  ) {
    return "low";
  }

  // High confidence - specific mentions of DevUp content
  const highConfidenceIndicators = [
    "devthon",
    "stackfest",
    "faizan",
    "devup society",
    "devup community",
    "vjit",
    "registration",
    "₹",
    "devupsociety@vjit.ac.in",
    "devupvjit.in",
    "hackathon",
    "prize pool",
    "developer upliftment",
  ];

  if (
    highConfidenceIndicators.some((indicator) =>
      lowerResponse.includes(indicator),
    )
  ) {
    return "high";
  }

  return "medium";
}

/**
 * Extracts relevant source page from the response
 */
function extractSource(
  _response: string,
  question: string,
): string | undefined {
  const lowerQuestion = question.toLowerCase();

  if (
    lowerQuestion.includes("event") ||
    lowerQuestion.includes("devthon") ||
    lowerQuestion.includes("stackfest") ||
    lowerQuestion.includes("register") ||
    lowerQuestion.includes("prize") ||
    lowerQuestion.includes("hackathon")
  ) {
    return "/events";
  }

  if (
    lowerQuestion.includes("team") ||
    lowerQuestion.includes("member") ||
    lowerQuestion.includes("lead") ||
    lowerQuestion.includes("who is") ||
    lowerQuestion.includes("founder")
  ) {
    return "/team";
  }

  if (
    lowerQuestion.includes("join") ||
    lowerQuestion.includes("apply") ||
    lowerQuestion.includes("become a member") ||
    lowerQuestion.includes("how to join")
  ) {
    return "/join";
  }

  if (
    lowerQuestion.includes("about") ||
    lowerQuestion.includes("what is devup")
  ) {
    return "/about";
  }

  if (lowerQuestion.includes("faq") || lowerQuestion.includes("question")) {
    return "/faq";
  }

  if (
    lowerQuestion.includes("community") ||
    lowerQuestion.includes("connect") ||
    lowerQuestion.includes("social") ||
    lowerQuestion.includes("instagram") ||
    lowerQuestion.includes("linkedin") ||
    lowerQuestion.includes("whatsapp")
  ) {
    return "/community";
  }

  return "/";
}

/**
 * Main function to process assistant requests
 */
export async function processAssistantRequest(
  request: AssistantRequest,
): Promise<AssistantResponse> {
  // Validate environment
  const envCheck = validateEnvironment();
  if (!envCheck.valid) {
    return {
      success: false,
      answer: AI_CONFIG.ERROR_RESPONSE,
      confidence: "none",
      error: envCheck.error,
    };
  }

  // Validate message
  const userMessage = request.message?.trim();
  if (!userMessage) {
    return {
      success: false,
      answer: "Please provide a question and I'll do my best to help!",
      confidence: "none",
    };
  }

  // Check message length
  if (userMessage.length > 500) {
    return {
      success: false,
      answer:
        "Your question is quite long. Could you please ask a more concise question?",
      confidence: "low",
    };
  }

  try {
    // Build system prompt with knowledge context
    const systemPrompt = buildSystemPrompt();

    // Build messages array
    const messages: OpenRouterMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ];

    // Call OpenRouter
    const openRouterResponse = await callOpenRouter(messages);

    // Extract response
    const assistantMessage = openRouterResponse.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error("No response content received from AI model");
    }

    // Determine confidence and source
    const confidence = determineConfidence(assistantMessage);
    const source =
      confidence === "none"
        ? undefined
        : extractSource(assistantMessage, userMessage);

    return {
      success: true,
      answer: assistantMessage,
      confidence,
      source,
    };
  } catch (error) {
    console.error("AI Assistant Error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return {
      success: false,
      answer: AI_CONFIG.ERROR_RESPONSE,
      confidence: "none",
      error: errorMessage,
    };
  }
}

/**
 * Utility function to check if the assistant is properly configured
 */
export function isAssistantConfigured(): boolean {
  return validateEnvironment().valid;
}

/**
 * Get the model name being used
 */
export function getModelName(): string {
  return AI_CONFIG.MODEL;
}
