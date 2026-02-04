import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// ✅ PRODUCTION MODE - Domain verified!
const SENDER_EMAIL = 'noreply@send.devupvjit.in';
const REPLY_TO_EMAIL = 'devupsociety@gmail.com'; // Users can reply to this Gmail
const SUPPORT_EMAIL = 'devupsociety@gmail.com';

interface PendingEmailData {
  teamNumber: string;
  teamName: string;
  leadName: string;
  leadEmail: string;
  teamSize: number;
  amount: number;
  transactionId: string;
}

interface VerifiedEmailData extends PendingEmailData {
  whatsappLink?: string;
}

export async function sendPendingEmail(data: PendingEmailData) {
  try {
    const result = await resend.emails.send({
      from: SENDER_EMAIL,
      replyTo: REPLY_TO_EMAIL,
      to: data.leadEmail,
      subject: `Devthon 2026 Registration - Payment Verification Pending (${data.teamNumber})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: monospace; background: #030303; color: #a1a1aa; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #18181b; border: 1px solid #27272a; padding: 32px; }
            .header { border-bottom: 2px solid #ccff00; padding-bottom: 16px; margin-bottom: 24px; }
            .title { color: #ffffff; font-size: 24px; font-weight: bold; margin: 0; }
            .team-number { color: #ccff00; font-size: 14px; margin-top: 8px; }
            .section { margin: 24px 0; }
            .label { color: #71717a; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
            .value { color: #ffffff; font-size: 14px; }
            .status-badge { background: #fef3c7; color: #78350f; padding: 8px 16px; border-radius: 4px; display: inline-block; font-size: 12px; margin: 16px 0; }
            .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #27272a; font-size: 12px; color: #71717a; }
            .support { color: #ccff00; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="title">DEVTHON 2026</h1>
              <p class="team-number">Registration Received</p>
            </div>

            <p style="color: #ffffff; margin-bottom: 24px;">
              Hi ${data.leadName},
            </p>

            <p>
              Thank you for registering for Devthon 2026! We have received your payment details and are currently verifying your transaction.
            </p>

            <div class="status-badge">
              ⏳ Payment Verification Pending
            </div>

            <div class="section">
              <div class="label">Team Number</div>
              <div class="value">${data.teamNumber}</div>
            </div>

            <div class="section">
              <div class="label">Team Name</div>
              <div class="value">${data.teamName}</div>
            </div>

            <div class="section">
              <div class="label">Team Lead</div>
              <div class="value">${data.leadName}</div>
            </div>

            <div class="section">
              <div class="label">Team Size</div>
              <div class="value">${data.teamSize} Members</div>
            </div>

            <div class="section">
              <div class="label">Payment Amount</div>
              <div class="value">₹${data.amount}</div>
            </div>

            <div class="section">
              <div class="label">Transaction ID</div>
              <div class="value">${data.transactionId}</div>
            </div>

            <p style="margin-top: 32px;">
              We verify payments manually every evening. Once verified, you will receive a confirmation email with your event ticket and further details.
            </p>

            <div class="footer">
              <p>
                For any queries, reach us at <span class="support">${SUPPORT_EMAIL}</span>
              </p>
              <p style="margin-top: 8px;">
                DevUp Society | VJIT Hyderabad
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('Pending email sent:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to send pending email:', error);
    return { success: false, error };
  }
}

export async function sendVerifiedEmail(data: VerifiedEmailData) {
  try {
    const result = await resend.emails.send({
      from: SENDER_EMAIL,
      replyTo: REPLY_TO_EMAIL,
      to: data.leadEmail,
      subject: `✅ Devthon 2026 Registration Confirmed - ${data.teamNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: monospace; background: #030303; color: #a1a1aa; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #18181b; border: 1px solid #27272a; padding: 32px; }
            .header { border-bottom: 2px solid #ccff00; padding-bottom: 16px; margin-bottom: 24px; }
            .title { color: #ffffff; font-size: 24px; font-weight: bold; margin: 0; }
            .team-number { color: #ccff00; font-size: 14px; margin-top: 8px; }
            .section { margin: 24px 0; }
            .label { color: #71717a; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
            .value { color: #ffffff; font-size: 14px; }
            .status-badge { background: #dcfce7; color: #14532d; padding: 8px 16px; border-radius: 4px; display: inline-block; font-size: 12px; margin: 16px 0; font-weight: bold; }
            .cta-button { background: #ccff00; color: #000000; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold; margin: 24px 0; }
            .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #27272a; font-size: 12px; color: #71717a; }
            .support { color: #ccff00; }
            .important { background: #27272a; padding: 16px; border-left: 3px solid #ccff00; margin: 24px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="title">DEVTHON 2026</h1>
              <p class="team-number">Payment Verified ✅</p>
            </div>

            <p style="color: #ffffff; margin-bottom: 24px;">
              Hi ${data.leadName},
            </p>

            <p>
              Congratulations! Your payment has been verified and your registration for Devthon 2026 is confirmed.
            </p>

            <div class="status-badge">
              ✅ Registration Confirmed
            </div>

            <div class="section">
              <div class="label">Team Number</div>
              <div class="value">${data.teamNumber}</div>
            </div>

            <div class="section">
              <div class="label">Team Name</div>
              <div class="value">${data.teamName}</div>
            </div>

            <div class="section">
              <div class="label">Team Lead</div>
              <div class="value">${data.leadName}</div>
            </div>

            <div class="section">
              <div class="label">Team Size</div>
              <div class="value">${data.teamSize} Members</div>
            </div>

            <div class="section">
              <div class="label">Payment Amount</div>
              <div class="value">₹${data.amount}</div>
            </div>

            <div class="section">
              <div class="label">Transaction ID</div>
              <div class="value">${data.transactionId}</div>
            </div>

            <div class="important">
              <strong style="color: #ffffff;">Event Details:</strong><br/>
              📅 February 27-28, 2026<br/>
              📍 VJIT Campus, Hyderabad<br/>
              ⏰ 36-hour Hackathon
            </div>

            ${data.whatsappLink ? `
            <p style="margin-top: 24px;">
              Join our official WhatsApp group for event updates, announcements, and reminders:
            </p>
            <a href="${data.whatsappLink}" class="cta-button">
              Join WhatsApp Group
            </a>
            ` : ''}

            <p style="margin-top: 32px;">
              Your event ticket with QR code will be sent in a separate email shortly. Keep an eye on your inbox!
            </p>

            <div class="footer">
              <p>
                For any queries, reach us at <span class="support">${SUPPORT_EMAIL}</span>
              </p>
              <p style="margin-top: 8px;">
                DevUp Society | VJIT Hyderabad
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('Verified email sent:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to send verified email:', error);
    return { success: false, error };
  }
}
