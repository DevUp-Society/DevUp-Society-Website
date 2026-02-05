// POST /api/events/register
// Handles complete registration submission
import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const eventSlug = formData.get('event_slug')?.toString();
    const teamName = formData.get('team_name')?.toString();
    const leadName = formData.get('lead_name')?.toString();
    const leadEmail = formData.get('lead_email')?.toString();
    const leadPhone = formData.get('lead_phone')?.toString();
    const leadCollege = formData.get('lead_college')?.toString();
    const teamNumber = formData.get('team_number')?.toString();
    const paymentAmount = parseInt(formData.get('payment_amount')?.toString() || '0');
    const transactionId = formData.get('transaction_id')?.toString();
    const teamSize = parseInt(formData.get('team_size')?.toString() || '2');

    // Validation
    if (!eventSlug || !teamName || !leadName || !leadEmail || !leadPhone || !leadCollege || !teamNumber) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate registration ID
    const registrationId = crypto.randomUUID();

    // 1. Insert registration
    const { error: regError } = await supabase
      .from('registrations')
      .insert([{
        id: registrationId,
        event_slug: eventSlug,
        team_name: teamName,
        lead_name: leadName,
        lead_email: leadEmail,
        lead_phone: leadPhone,
        lead_college: leadCollege,
        team_number: teamNumber,
        payment_amount: paymentAmount,
        transaction_id: transactionId,
        payment_status: 'pending',
        team_size: teamSize,
        status: 'pending'
      }]);

    if (regError) {
      console.error('Registration insert error:', regError);
      return new Response(JSON.stringify({ error: 'Failed to create registration' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Insert team members (if any)
    const members = [];
    for (let i = 2; i <= teamSize; i++) {
      const name = formData.get(`member_${i}_name`)?.toString();
      const email = formData.get(`member_${i}_email`)?.toString();
      const phone = formData.get(`member_${i}_phone`)?.toString();
      
      if (name && email && phone) {
        members.push({
          registration_id: registrationId,
          name,
          email,
          phone
        });
      }
    }

    if (members.length > 0) {
      const { error: memError } = await supabase
        .from('team_members')
        .insert(members);
      
      if (memError) {
        console.error('Team members insert error:', memError);
        // Continue even if members fail
      }
    }

    // 3. Send confirmation email
    try {
      const emailFormData = new FormData();
      emailFormData.append('teamNumber', teamNumber);
      emailFormData.append('teamName', teamName);
      emailFormData.append('leadName', leadName);
      emailFormData.append('leadEmail', leadEmail);
      emailFormData.append('teamSize', teamSize.toString());
      emailFormData.append('amount', paymentAmount.toString());
      emailFormData.append('transactionId', transactionId || '');
      
      // Call the email API (make absolute URL for server-side fetch)
      const protocol = request.headers.get('x-forwarded-proto') || 'http';
      const host = request.headers.get('host') || 'localhost:4321';
      const emailUrl = `${protocol}://${host}/api/email/pending`;
      
      const emailResponse = await fetch(emailUrl, {
        method: 'POST',
        body: emailFormData,
      });
      
      if (!emailResponse.ok) {
        console.error('Email sending failed');
      }
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Continue even if email fails
    }

    // Return success
    return new Response(JSON.stringify({ 
      success: true,
      registrationId,
      teamNumber,
      teamName,
      leadName,
      leadEmail,
      teamSize,
      paymentAmount,
      transactionId
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('Server error:', err);
    return new Response(JSON.stringify({ error: 'Server error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
