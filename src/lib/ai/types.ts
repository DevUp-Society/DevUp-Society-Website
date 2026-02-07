/**
 * AI Assistant Type Definitions
 * DevUp Society - Site-Restricted AI Assistant
 */

export interface AssistantRequest {
  message: string;
  conversationId?: string;
}

export interface AssistantResponse {
  success: boolean;
  answer: string;
  confidence: "high" | "medium" | "low" | "none";
  source?: string;
  error?: string;
}

export interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature: number;
  max_tokens: number;
  top_p: number;
}

export interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface KnowledgeContext {
  about: string;
  events: string;
  team: string;
  pages: string;
  faq: string;
}
