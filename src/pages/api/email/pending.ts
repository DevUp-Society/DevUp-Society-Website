import type { APIRoute } from 'astro';
import { sendPendingEmail } from '../../../lib/resend';

export const prerender = false; // This tells Astro this route is server-side only

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the form data (since Astro handles this better than raw JSON)
    const formData = await request.formData();
    
    // Parse team members if provided (comma-separated string)
    const teamMembersStr = formData.get('teamMembers') as string;
    const teamMembers = teamMembersStr 
      ? teamMembersStr.split(',').map(m => m.trim()).filter(m => m.length > 0)
      : undefined;
    
    const emailData = {
      teamNumber: formData.get('teamNumber') as string,
      teamName: formData.get('teamName') as string,
      leadName: formData.get('leadName') as string,
      leadEmail: formData.get('leadEmail') as string,
      teamSize: parseInt(formData.get('teamSize') as string),
      teamMembers,
      amount: parseInt(formData.get('amount') as string),
      transactionId: formData.get('transactionId') as string,
    };

    // Validate
    if (!emailData.teamNumber || !emailData.teamName || !emailData.leadName || 
        !emailData.leadEmail || !emailData.teamSize || !emailData.amount || !emailData.transactionId) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Missing required fields' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Send email
    const result = await sendPendingEmail(emailData);

    if (result.success) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Failed to send email' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Email API error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
