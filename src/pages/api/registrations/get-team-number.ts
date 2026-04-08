/**
 * GET /api/registrations/get-team-number
 * Legacy endpoint retained for compatibility.
 * Team numbers are deprecated for individual registrations.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

export const config = {
  runtime: 'nodejs',
  maxDuration: 10,
};

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      success: false,
      error: 'Team numbers are deprecated for this event registration flow.',
    }),
    { status: 410, headers: { 'Content-Type': 'application/json' } }
  );
};
