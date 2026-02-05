// GET /api/events/get-team-number?slug=event-slug
// Returns next available team number for an event
import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const GET: APIRoute = async ({ url }) => {
  try {
    const eventSlug = url.searchParams.get('slug');
    
    if (!eventSlug) {
      return new Response(JSON.stringify({ error: 'Event slug is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get all team numbers for this event
    const { data, error } = await supabase
      .from('registrations')
      .select('team_number')
      .eq('event_slug', eventSlug);

    if (error) {
      console.error('Supabase error:', error);
      return new Response(JSON.stringify({ error: 'Database error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Find highest sequence number
    const maxSeq = (data || []).reduce((max, row) => {
      const match = row.team_number?.match(/DEV2026-(\d{3,})/);
      const num = match ? parseInt(match[1], 10) : 0;
      return Math.max(max, num);
    }, 0);

    // Format next team number
    const nextSeq = maxSeq + 1;
    const teamNumber = `DEV2026-${String(nextSeq).padStart(3, '0')}`;

    return new Response(JSON.stringify({ teamNumber }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('Server error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
