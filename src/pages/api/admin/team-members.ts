import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';
import { isAdmin } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
  try {
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing access token',
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !userData?.user?.email) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid or expired token',
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const adminStatus = await isAdmin(userData.user.email);
    if (!adminStatus) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Unauthorized: Admin access required',
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const regId = url.searchParams.get('regId');
    if (!regId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing regId parameter',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { data, error } = await supabaseAdmin
      .from('team_members')
      .select('name, email, phone')
      .eq('registration_id', regId);

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({
      success: true,
      data: data || [],
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Team members fetch error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Failed to fetch team members',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
