/**
 * OpenRouter API Client for DevUp AI Assistant
 * 
 * Copy this file to: src/lib/ai/client.ts
 * 
 * This client handles all communication with OpenRouter's API.
 * 
 * IMPORTANT: This is a server-side only module.
 * Never expose API keys to the client.
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
  messages: OpenRouterMessage[]
): Promise<OpenRouterResponse> {
  const apiKey = import.meta.env.OPENROUTER_API_KEY;
  const siteUrl = import.meta.env.SITE_URL || "https://devup.social";
  const siteName = import.meta.env.SITE_NAME || "DevUp Society";
  
  const requestBody: OpenRouterRequest = {
    model: AI_CONFIG.MODEL,
    messages,
    temperature: AI_CONFIG.TEMPERATURE,
    max_tokens: AI_CONFIG.MAX_TOKENS,
    top_p: AI_CONFIG.TOP_P,
  };
  
  console.log("OpenRouter Request:", {
    url: AI_CONFIG.OPENROUTER_API_URL,
    model: requestBody.model,
    messageCount: messages.length,
    hasApiKey: !!apiKey,
  });
  
  const response = await fetch(AI_CONFIG.OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": siteUrl,
      "X-Title": siteName,
    },
    body: JSON.stringify(requestBody),
  });
  
  if (!response.ok) {
    const errorBody = await response.text();
    console.error("OpenRouter API Error Response:", {
      status: response.status,
      statusText: response.statusText,
      body: errorBody,
    });
    
    let errorMessage = `OpenRouter API error: ${response.status}`;
    
    try {
      const errorJson = JSON.parse(errorBody) as OpenRouterErrorResponse;
      if (errorJson.error?.message) {
        errorMessage = errorJson.error.message;
      }
    } catch {
      // Use status text if JSON parsing fails
      errorMessage = `OpenRouter API error: ${response.status} - ${response.statusText}`;
    }
    
    throw new Error(errorMessage);
  }
  
  return response.json() as Promise<OpenRouterResponse>;
}

/**
 * Determines confidence level based on response content
 */
function determineConfidence(response: string): "high" | "medium" | "low" | "none" {
  const lowerResponse = response.toLowerCase();
  
  // Low confidence indicators - assistant doesn't have the info
  const noInfoIndicators = [
    "don't have information",
    "don't have that information",
    "not in my knowledge",
    "outside my knowledge",
    "cannot find information",
    "no information about",
    "not something i can answer",
    "beyond the scope",
    "i'm not able to provide",
    "i can only answer questions about devup",
    "i'd recommend checking other resources",
  ];
  
  if (noInfoIndicators.some(indicator => lowerResponse.includes(indicator))) {
    return "none";
  }
  
  // High confidence - specific mentions of DevUp content
  const highConfidenceIndicators = [
    "devthon",
    "stackfest",
    "team lead",
    "president",
    "devup society",
    "vjit",
    "registration",
    "₹",
    "@gmail.com",
  ];
  
  if (highConfidenceIndicators.some(indicator => lowerResponse.includes(indicator))) {
    return "high";
  }
  
  return "medium";
}

/**
 * Extracts relevant source page from the response
 */
function extractSource(response: string, question: string): string | undefined {
  const lowerQuestion = question.toLowerCase();
  const lowerResponse = response.toLowerCase();
  
  // Check what kind of information was requested
  if (
    lowerQuestion.includes("event") ||
    lowerQuestion.includes("devthon") ||
    lowerQuestion.includes("stackfest") ||
    lowerQuestion.includes("register") ||
    lowerQuestion.includes("prize") ||
    lowerQuestion.includes("deadline") ||
    lowerQuestion.includes("hackathon")
  ) {
    return "/events";
  }
  
  if (
    lowerQuestion.includes("team") ||
    lowerQuestion.includes("member") ||
    lowerQuestion.includes("lead") ||
    lowerQuestion.includes("president") ||
    lowerQuestion.includes("who is") ||
    lowerResponse.includes("team lead") ||
    lowerResponse.includes("president")
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
    lowerQuestion.includes("project") ||
    lowerQuestion.includes("portfolio")
  ) {
    return "/projects";
  }
  
  if (
    lowerQuestion.includes("community") ||
    lowerQuestion.includes("connect") ||
    lowerQuestion.includes("discord") ||
    lowerQuestion.includes("social") ||
    lowerQuestion.includes("instagram") ||
    lowerQuestion.includes("linkedin")
  ) {
    return "/community";
  }
  
  // Default to home for general questions
  return "/";
}

/**
 * Main function to process assistant requests
 * 
 * @param request - The user's message
 * @returns AssistantResponse with answer, sources, and metadata
 */
export async function processAssistantRequest(
  request: AssistantRequest
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
      answer: "Your question is quite long. Could you please ask a more concise question?",
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
    const source = confidence === "none" ? undefined : extractSource(assistantMessage, userMessage);
    
    return {
      success: true,
      answer: assistantMessage,
      confidence,
      source,
    };
    
  } catch (error) {
    console.error("AI Assistant Error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    // Provide a graceful fallback response
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
