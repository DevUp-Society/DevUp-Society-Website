/**
 * OpenRouter API Client for DevUp AI Assistant
 * Production-ready with model fallback, think-block stripping,
 * and system-prompt compatibility for all model types.
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

/** Models that do NOT support the "system" role */
const NO_SYSTEM_ROLE_MODELS = ["google/gemma"];

/** OpenRouter error response structure */
interface OpenRouterErrorResponse {
  error?: {
    message?: string;
    code?: number | string;
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
 * Check if a model supports the system role
 */
function supportsSystemRole(model: string): boolean {
  return !NO_SYSTEM_ROLE_MODELS.some((prefix) => model.startsWith(prefix));
}

/**
 * Build messages array, adapting system prompt for models that don't support it
 */
function buildMessages(
  model: string,
  systemPrompt: string,
  userMessage: string,
): OpenRouterMessage[] {
  if (supportsSystemRole(model)) {
    return [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ];
  }
  // For models without system role support, prepend instructions to user message
  return [
    {
      role: "user",
      content: `[Instructions]\n${systemPrompt}\n[End Instructions]\n\nUser Question: ${userMessage}`,
    },
  ];
}

/**
 * Strip <think>...</think> blocks from reasoning models (Qwen, DeepSeek, etc.)
 */
function stripThinkBlocks(text: string): string {
  return text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
}

/**
 * Makes a request to OpenRouter API with a specific model
 */
async function callOpenRouter(
  model: string,
  messages: OpenRouterMessage[],
): Promise<OpenRouterResponse> {
  const apiKey = import.meta.env.OPENROUTER_API_KEY;
  const siteUrl = AI_CONFIG.SITE.website;
  const siteName = AI_CONFIG.SITE.name;

  const requestBody: OpenRouterRequest = {
    model,
    messages,
    temperature: AI_CONFIG.TEMPERATURE,
    max_tokens: AI_CONFIG.MAX_TOKENS,
    top_p: AI_CONFIG.TOP_P,
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000); // 12s timeout

  try {
    const response = await fetch(AI_CONFIG.OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": siteUrl,
        "X-Title": siteName,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`OpenRouter Error [${model}]:`, {
        status: response.status,
        body: errorBody,
      });

      let errorMessage = `API error ${response.status}`;
      try {
        const errorJson = JSON.parse(errorBody) as OpenRouterErrorResponse;
        if (errorJson.error?.message) {
          errorMessage = errorJson.error.message;
        }
      } catch {
        // use default
      }
      throw new Error(errorMessage);
    }

    return response.json() as Promise<OpenRouterResponse>;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Try calling OpenRouter with model fallback chain
 * If primary model fails, tries each fallback in order
 */
async function callWithFallback(
  systemPrompt: string,
  userMessage: string,
): Promise<{ response: OpenRouterResponse; model: string }> {
  const models = [AI_CONFIG.MODEL, ...AI_CONFIG.FALLBACK_MODELS];
  let lastError: Error | null = null;

  for (const model of models) {
    try {
      const messages = buildMessages(model, systemPrompt, userMessage);
      const response = await callOpenRouter(model, messages);
      return { response, model };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn(`Model ${model} failed, trying next...`, lastError.message);
      continue;
    }
  }

  throw lastError || new Error("All models failed");
}

/**
 * Determines confidence level based on response content
 */
function determineConfidence(
  response: string,
): "high" | "medium" | "low" | "none" {
  const lower = response.toLowerCase();

  const redirectIndicators = [
    "check out devupvjit.in",
    "connect with us",
    "jump into our whatsapp",
    "reach out to our team",
    "for the latest details",
  ];
  if (redirectIndicators.some((i) => lower.includes(i)) && lower.length < 150) {
    return "low";
  }

  const highIndicators = [
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
  if (highIndicators.some((i) => lower.includes(i))) {
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
  const q = question.toLowerCase();

  if (/event|devthon|stackfest|register|prize|hackathon/.test(q))
    return "/events";
  if (/team|member|lead|who is|founder/.test(q)) return "/team";
  if (/join|apply|become a member|how to join/.test(q)) return "/join";
  if (/about|what is devup/.test(q)) return "/about";
  if (/faq|question/.test(q)) return "/faq";
  if (/community|connect|social|instagram|linkedin|whatsapp/.test(q))
    return "/community";

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

  if (userMessage.length > 500) {
    return {
      success: false,
      answer:
        "Your question is quite long. Could you please ask a more concise question?",
      confidence: "low",
    };
  }

  try {
    const systemPrompt = buildSystemPrompt();

    // Call OpenRouter with automatic model fallback
    const { response: openRouterResponse } = await callWithFallback(
      systemPrompt,
      userMessage,
    );

    // Extract response content
    let assistantMessage = openRouterResponse.choices?.[0]?.message?.content;
    if (!assistantMessage) {
      throw new Error("No response content received from AI model");
    }

    // Strip <think> blocks from reasoning models
    assistantMessage = stripThinkBlocks(assistantMessage);

    if (!assistantMessage) {
      throw new Error("Empty response after processing");
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
 * Check if the assistant is properly configured
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
