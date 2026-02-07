/**
 * AI Assistant API Route
 * DevUp Society - Site-Restricted AI Assistant
 * 
 * Copy this file to: src/pages/api/assistant.ts
 * 
 * POST /api/assistant
 * 
 * This endpoint handles all AI assistant requests.
 * 
 * Request Body:
 * {
 *   "message": "Your question here"
 * }
 * 
 * Response:
 * {
 *   "success": true/false,
 *   "answer": "The AI response",
 *   "confidence": "high" | "medium" | "low" | "none",
 *   "source": "/events" (optional, relevant page)
 *   "error": "Error message" (only if success is false)
 * }
 */

import type { APIRoute } from "astro";
import { processAssistantRequest, isAssistantConfigured } from "../../lib/ai/client";
import type { AssistantRequest, AssistantResponse } from "../../lib/ai/types";

// ⚠️ IMPORTANT: This line is required for server-side rendering
export const prerender = false;

/**
 * Rate limiting - simple in-memory store
 * In production, use Redis or similar for distributed rate limiting
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

/**
 * Clean up old rate limit entries periodically
 */
function cleanupRateLimits() {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupRateLimits, 5 * 60 * 1000);

/**
 * GET handler - Health check
 */
export const GET: APIRoute = async () => {
  const configured = isAssistantConfigured();
  
  return new Response(
    JSON.stringify({
      status: configured ? "healthy" : "misconfigured",
      service: "DevUp AI Assistant",
      configured,
      timestamp: new Date().toISOString(),
    }),
    {
      status: configured ? 200 : 503,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

/**
 * POST handler - Process assistant request
 */
export const POST: APIRoute = async ({ request, clientAddress }) => {
  // CORS headers for client-side requests
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  
  try {
    // Rate limiting - get IP from headers or clientAddress
    // Use X-Forwarded-For for proxied requests (Vercel, Cloudflare, etc.)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || clientAddress || "unknown";
    
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({
          success: false,
          answer: "You're sending too many requests. Please wait a moment before trying again.",
          confidence: "none",
          error: "Rate limit exceeded",
        } satisfies AssistantResponse),
        { status: 429, headers }
      );
    }
    
    // Parse request body
    let body: AssistantRequest;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          answer: "Invalid request format. Please send a valid JSON body.",
          confidence: "none",
          error: "Invalid JSON",
        } satisfies AssistantResponse),
        { status: 400, headers }
      );
    }
    
    // Validate message field
    if (!body.message || typeof body.message !== "string") {
      return new Response(
        JSON.stringify({
          success: false,
          answer: "Please provide a message to ask the assistant.",
          confidence: "none",
          error: "Missing message field",
        } satisfies AssistantResponse),
        { status: 400, headers }
      );
    }
    
    // Sanitize message - remove any HTML/script tags
    const sanitizedMessage = body.message
      .replaceAll(/<[^>]*>/g, "")
      .trim()
      .substring(0, 500);
    
    if (!sanitizedMessage) {
      return new Response(
        JSON.stringify({
          success: false,
          answer: "Please provide a valid question.",
          confidence: "none",
          error: "Empty message after sanitization",
        } satisfies AssistantResponse),
        { status: 400, headers }
      );
    }
    
    // Process the request
    const response = await processAssistantRequest({
      message: sanitizedMessage,
      conversationId: body.conversationId,
    });
    
    // Return response
    return new Response(JSON.stringify(response), {
      status: response.success ? 200 : 500,
      headers,
    });
    
  } catch (error) {
    console.error("Assistant API Error:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        answer: "An unexpected error occurred. Please try again later.",
        confidence: "none",
        error: error instanceof Error ? error.message : "Unknown error",
      } satisfies AssistantResponse),
      { status: 500, headers }
    );
  }
};

/**
 * OPTIONS handler - CORS preflight
 */
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
};
