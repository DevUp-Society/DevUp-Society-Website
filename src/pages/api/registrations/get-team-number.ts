/**
 * GET /api/registrations/get-team-number?slug=event-slug
 * Generates next available team number for an event
 */
import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const config = {
  runtime: 'nodejs',
  maxDuration: 10,
};

export const GET: APIRoute = async ({ request }) => {
  const startTime = Date.now();

  try {
    // Parse query params
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');

    if (!slug) {
      return new Response(
        JSON.stringify({ error: 'Event slug is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase
    const supabase = createClient(
      import.meta.env.SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.SUPABASE_ANON_KEY
    );

    // Get all team numbers for this event
    const { data, error } = await supabase
      .from('registrations')
      .select('team_number')
      .eq('event_slug', slug);

    if (error) {
      console.error('[get-team-number] Supabase error:', error);
      return new Response(
        JSON.stringify({ error: 'Database error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Find highest sequence number
    const maxSeq = (data || []).reduce((max, row) => {
      const match = row.team_number?.match(/DEV2026-(\d{3,})/);
      const num = match ? parseInt(match[1], 10) : 0;
      return Math.max(max, num);
    }, 0);

    // Generate next team number
    const nextSeq = maxSeq + 1;
    const teamNumber = `DEV2026-${String(nextSeq).padStart(3, '0')}`;

    const duration = Date.now() - startTime;
    console.log(`[get-team-number] ✓ Generated ${teamNumber} in ${duration}ms`);

    return new Response(
      JSON.stringify({ teamNumber }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, must-revalidate',
        },
      }
    );
  } catch (error: any) {
    console.error('[get-team-number] Server error:', error);
    return new Response(
      JSON.stringify({ error: 'Server error', message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
