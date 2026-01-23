/**
 * POST /api/registrations/register
 * Handles event registration with payment verification
 * Includes Google Sheets backup and email notifications
 */
import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { syncRegistrationToSheets, isConfigured } from '../../../lib/googleSheets';

export const config = {
  runtime: 'nodejs',
  maxDuration: 10, // 10s timeout on Hobby tier
};

// Input validation helpers
function sanitizeInput(str: string): string {
  if (typeof str !== 'string') return str;
  return str.trim().replace(/[<>]/g, ''); // Basic XSS prevention
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  // Indian phone: 10 digits starting with 6-9
  return /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
}

export const POST: APIRoute = async ({ request }) => {
  const startTime = Date.now();

  try {
    // Parse request body
    const body = await request.json();
    const {
      event_slug,
      team_name,
      lead_name,
      lead_email,
      lead_phone,
      lead_college,
      team_number,
      payment_amount,
      transaction_id,
      team_size,
      members,
    } = body;

    // Validate required fields
    if (
      !event_slug ||
      !team_name ||
      !lead_name ||
      !lead_email ||
      !lead_phone ||
      !lead_college ||
      !team_number
    ) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email
    if (!validateEmail(lead_email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate phone
    const cleanPhone = lead_phone.replace(/\s/g, '');
    if (!validatePhone(cleanPhone)) {
      return new Response(
        JSON.stringify({
          error: 'Invalid phone number. Must be a 10-digit Indian mobile number.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      event_slug: sanitizeInput(event_slug),
      team_name: sanitizeInput(team_name),
      lead_name: sanitizeInput(lead_name),
      lead_email: lead_email.toLowerCase().trim(),
      lead_phone: cleanPhone,
      lead_college: sanitizeInput(lead_college),
      team_number: sanitizeInput(team_number),
      transaction_id: transaction_id ? sanitizeInput(transaction_id) : null,
    };

    // Initialize Supabase
    const supabase = createClient(
      import.meta.env.SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.SUPABASE_ANON_KEY
    );

    // Check for duplicate registrations
    const { data: existingReg } = await supabase
      .from('registrations')
      .select('id, team_number')
      .eq('event_slug', sanitizedData.event_slug)
      .or(
        `lead_email.eq.${sanitizedData.lead_email},lead_phone.eq.${sanitizedData.lead_phone}`
      )
      .limit(1);

    if (existingReg && existingReg.length > 0) {
      return new Response(
        JSON.stringify({
          error: 'Duplicate registration detected',
          message: `This email or phone is already registered (Team: ${existingReg[0].team_number})`,
        }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check duplicate transaction ID
    if (transaction_id) {
      const { data: existingTxn } = await supabase
        .from('registrations')
        .select('team_number')
        .eq('transaction_id', sanitizedData.transaction_id)
        .limit(1);

      if (existingTxn && existingTxn.length > 0) {
        return new Response(
          JSON.stringify({
            error: 'Duplicate transaction ID',
            message: 'This transaction ID has already been used.',
          }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Generate registration ID
    const registrationId = crypto.randomUUID();

    // Insert registration
    const { error: regError } = await supabase.from('registrations').insert([
      {
        id: registrationId,
        event_slug: sanitizedData.event_slug,
        team_name: sanitizedData.team_name,
        lead_name: sanitizedData.lead_name,
        lead_email: sanitizedData.lead_email,
        lead_phone: sanitizedData.lead_phone,
        lead_college: sanitizedData.lead_college,
        team_number: sanitizedData.team_number,
        payment_amount: parseInt(payment_amount) || 0,
        transaction_id: sanitizedData.transaction_id,
        payment_status: 'pending',
        team_size: parseInt(team_size) || 2,
        status: 'pending',
      },
    ]);

    if (regError) {
      console.error('[register] Supabase insert error:', regError);
      return new Response(
        JSON.stringify({ error: 'Failed to create registration' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Insert team members
    let insertedTeamMembers: any[] = [];
    if (members && Array.isArray(members) && members.length > 0) {
      const teamMembers = members.map((member: any) => ({
        registration_id: registrationId,
        name: sanitizeInput(member.name),
        email: member.email ? member.email.toLowerCase().trim() : null,
        phone: member.phone ? member.phone.replace(/\s/g, '') : null,
      }));

      const { data: memberData, error: memError } = await supabase
        .from('team_members')
        .insert(teamMembers)
        .select();

      if (memberData) {
        insertedTeamMembers = memberData;
        console.log(`[register] ✓ Inserted ${memberData.length} team members`);
      }
    }

    const dbDuration = Date.now() - startTime;
    console.log(`[register] ✓ Database operations: ${dbDuration}ms`);

    // Async operations (don't wait for completion)
    // Google Sheets backup
    if (isConfigured()) {
      const registrationData = {
        id: registrationId,
        team_number: sanitizedData.team_number,
        event_slug: sanitizedData.event_slug,
        team_name: sanitizedData.team_name,
        lead_name: sanitizedData.lead_name,
        lead_email: sanitizedData.lead_email,
        lead_phone: sanitizedData.lead_phone,
        lead_college: sanitizedData.lead_college,
        team_size: parseInt(team_size) || 2,
        payment_amount: parseInt(payment_amount) || 0,
        transaction_id: sanitizedData.transaction_id,
        payment_status: 'pending',
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      syncRegistrationToSheets(registrationData, insertedTeamMembers).catch(
        (error) => console.error('[register] Sheets sync failed:', error)
      );
    }

    // Send email (async)
    const teamMembersData =
      members && members.length > 0
        ? members
            .map((m: any) => ({
              name: sanitizeInput(m.name),
              phone: m.phone ? m.phone.replace(/\s/g, '') : undefined,
            }))
            .filter((m: any) => m.name)
        : [];

    const emailFormData = new URLSearchParams({
      teamNumber: sanitizedData.team_number,
      teamName: sanitizedData.team_name,
      leadName: sanitizedData.lead_name,
      leadEmail: sanitizedData.lead_email,
      teamSize: team_size.toString(),
      amount: payment_amount.toString(),
      transactionId: sanitizedData.transaction_id || 'N/A',
    });

    if (teamMembersData.length > 0) {
      emailFormData.append('teamMembers', JSON.stringify(teamMembersData));
    }

    fetch('https://www.devupvjit.in/api/email/pending', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: emailFormData.toString(),
    })
      .then((res) => {
        if (res.ok) console.log('[register] ✓ Email sent');
        else console.error('[register] Email failed:', res.status);
      })
      .catch((error) => console.error('[register] Email error:', error));

    const totalDuration = Date.now() - startTime;
    console.log(
      `[register] ✓ Registration complete: ${sanitizedData.team_number} (${totalDuration}ms)`
    );

    // Return success immediately (don't wait for email/sheets)
    return new Response(
      JSON.stringify({
        success: true,
        registrationId,
        teamNumber: sanitizedData.team_number,
        teamName: sanitizedData.team_name,
        leadName: sanitizedData.lead_name,
        leadEmail: sanitizedData.lead_email,
        teamSize: parseInt(team_size) || 2,
        paymentAmount: parseInt(payment_amount) || 0,
        transactionId: sanitizedData.transaction_id,
        message: 'Registration successful! Check your email for confirmation.',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error(`[register] Error after ${duration}ms:`, error);

    // Handle timeout specifically
    if (duration >= 9000) {
      // Near 10s limit
      return new Response(
        JSON.stringify({
          error: 'Request timeout',
          message: 'Registration is processing. Please check your email shortly.',
        }),
        { status: 504, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        error: 'Registration failed',
        message: 'An error occurred. Please try again or contact support.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
