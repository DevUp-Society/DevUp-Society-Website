/**
 * POST /api/registrations/register
 * Handles event registration with Google Sheets storage
 */
import type { APIRoute } from 'astro';
import { syncRegistrationToSheets, isConfigured } from '../../../lib/googleSheets';

export const prerender = false;

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
    // Parse request body safely
    const rawBody = await request.text();
    if (!rawBody || !rawBody.trim()) {
      return new Response(
        JSON.stringify({ error: 'Missing request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const {
      event_slug,
      registration_flow,
      pass_type,
      lead_name,
      lead_email,
      lead_phone,
      lead_college,
      designation,
    } = body;

    // Validate required fields
    if (
      !event_slug ||
      !lead_name ||
      !lead_email ||
      !lead_phone ||
      !lead_college
    ) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Founders Meet requires designation/year information
    if (event_slug === 'founders-meet-2026' && !designation) {
      return new Response(
        JSON.stringify({ error: 'Designation / year is required for Founders Meet' }),
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
      registration_flow: registration_flow ? sanitizeInput(registration_flow) : 'quick',
      pass_type: pass_type ? sanitizeInput(pass_type) : 'normal',
      lead_name: sanitizeInput(lead_name),
      lead_email: lead_email.toLowerCase().trim(),
      lead_phone: cleanPhone,
      lead_college: sanitizeInput(lead_college),
      designation: designation ? sanitizeInput(designation) : null,
    };

    // Generate registration ID
    const registrationId = crypto.randomUUID();

    const registrationInsert: Record<string, any> = {
      id: registrationId,
      event_slug: sanitizedData.event_slug,
      registration_flow: sanitizedData.registration_flow,
      pass_type: sanitizedData.pass_type,
      lead_name: sanitizedData.lead_name,
      lead_email: sanitizedData.lead_email,
      lead_phone: sanitizedData.lead_phone,
      lead_college: sanitizedData.lead_college,
      status: 'submitted',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (sanitizedData.designation) {
      registrationInsert.lead_designation = sanitizedData.designation;
    }

    if (!isConfigured()) {
      return new Response(
        JSON.stringify({
          error: 'Google Sheets is not configured',
          message: 'Set GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, and GOOGLE_PRIVATE_KEY.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const syncResult = await syncRegistrationToSheets(registrationInsert, []);
    if (!syncResult.success) {
      return new Response(
        JSON.stringify({
          error: 'Failed to save registration',
          message: syncResult.error || 'Google Sheets sync failed',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const totalDuration = Date.now() - startTime;
    console.log(`[register] ✓ Registration complete: ${registrationId} (${totalDuration}ms)`);

    // Return success immediately (don't wait for email/sheets)
    return new Response(
      JSON.stringify({
        success: true,
        registrationId,
        leadName: sanitizedData.lead_name,
        leadEmail: sanitizedData.lead_email,
        leadPhone: sanitizedData.lead_phone,
        leadCollege: sanitizedData.lead_college,
        designation: sanitizedData.designation,
        registrationFlow: sanitizedData.registration_flow,
        passType: sanitizedData.pass_type,
        message: 'Pitch Quest registration submitted successfully.',
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
        message: error?.message || 'An error occurred. Please try again or contact support.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
