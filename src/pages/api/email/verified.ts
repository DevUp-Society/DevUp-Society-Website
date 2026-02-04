import type { APIRoute } from 'astro';
import { sendVerifiedEmail } from '../../../lib/resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    const emailData = {
      teamNumber: formData.get('teamNumber') as string,
      teamName: formData.get('teamName') as string,
      leadName: formData.get('leadName') as string,
      leadEmail: formData.get('leadEmail') as string,
      teamSize: parseInt(formData.get('teamSize') as string),
      amount: parseInt(formData.get('amount') as string),
      transactionId: formData.get('transactionId') as string,
      whatsappLink: formData.get('whatsappLink') as string | undefined,
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

    const result = await sendVerifiedEmail(emailData);

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
