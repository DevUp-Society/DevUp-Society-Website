import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';
import { isAdmin } from '../../../lib/auth';
import { sendVerifiedEmail } from '../../../lib/resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
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

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: id and status',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!['verified', 'rejected'].includes(status)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid status. Must be "verified" or "rejected"',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Update payment status in database
    const { data: registration, error: updateError } = await supabaseAdmin
      .from('registrations')
      .update({ payment_status: status })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    // If verified, send confirmation email with ticket
    if (status === 'verified' && registration) {
      try {
        // Get team members
        const { data: members } = await supabaseAdmin
          .from('team_members')
          .select('name, phone')
          .eq('registration_id', id);

        const teamMembers = members?.map(m => ({ 
          name: m.name,
          phone: m.phone 
        })) || [];

        await sendVerifiedEmail({
          teamNumber: registration.team_number,
          teamName: registration.team_name,
          leadName: registration.lead_name,
          leadEmail: registration.lead_email,
          teamSize: registration.team_size,
          teamMembers: teamMembers.length > 0 ? teamMembers : undefined,
          amount: registration.payment_amount,
          transactionId: registration.transaction_id,
        });
      } catch (emailError) {
        console.error('Failed to send verification email:', emailError);
        // Don't fail the entire request if email fails
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Payment status updated to ${status}`,
      data: registration,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Update status error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Failed to update payment status',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
