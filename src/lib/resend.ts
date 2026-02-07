import { Resend } from 'resend';
import { generateTicket } from './ticket';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// ✅ PRODUCTION MODE - Domain verified!
const SENDER_EMAIL = 'noreply@devupvjit.in'; // Use main domain, not send. subdomain
const REPLY_TO_EMAIL = 'devupsociety@gmail.com'; // Users can reply to this Gmail
const SUPPORT_EMAIL = 'devupsociety@gmail.com';

interface TeamMember {
  name: string;
  phone?: string;
}

interface TeamMember {
  name: string;
  phone?: string;
}

interface PendingEmailData {
  teamNumber: string;
  teamName: string;
  leadName: string;
  leadEmail: string;
  teamSize: number;
  amount: number;
  transactionId: string;
  teamMembers?: TeamMember[]; // Array of member objects with name and phone
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
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; 
              background: #0a0a0a; 
              color: #a1a1aa; 
              padding: 20px; 
              line-height: 1.6;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: linear-gradient(to bottom, #0f0f12 0%, #18181b 100%);
              border: 1px solid #27272a; 
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            }
            .header { 
              background: #1a1a1d;
              padding: 32px;
              border-bottom: 3px solid #ccff00; 
              text-align: center;
            }
            .logo-badge {
              display: inline-block;
              background: rgba(204, 255, 0, 0.1);
              border: 2px solid #ccff00;
              border-radius: 8px;
              padding: 8px 20px;
              margin-bottom: 16px;
            }
            .title { 
              color: #ffffff; 
              font-size: 32px; 
              font-weight: 800; 
              margin: 0;
              letter-spacing: 2px;
            }
            .subtitle { 
              color: #ccff00; 
              font-size: 13px; 
              margin-top: 8px;
              text-transform: uppercase;
              letter-spacing: 3px;
              font-weight: 600;
            }
            .content {
              padding: 32px;
            }
            .greeting {
              color: #ffffff;
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 16px;
            }
            .message {
              color: #d4d4d8;
              margin-bottom: 24px;
              font-size: 15px;
            }
            .status-badge { 
              background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
              color: #78350f; 
              padding: 12px 20px; 
              border-radius: 8px; 
              display: inline-flex;
              align-items: center;
              gap: 8px;
              font-size: 13px;
              font-weight: 700;
              margin: 24px 0;
              box-shadow: 0 4px 12px rgba(254, 243, 199, 0.3);
            }
            .details-grid {
              background: #1a1a1d;
              border: 1px solid #27272a;
              border-radius: 8px;
              padding: 24px;
              margin: 24px 0;
            }
            .detail-row {
              margin-bottom: 20px;
              padding-bottom: 20px;
              border-bottom: 1px solid #27272a;
            }
            .detail-row:last-child {
              margin-bottom: 0;
              padding-bottom: 0;
              border-bottom: none;
            }
            .label { 
              color: #71717a; 
              font-size: 11px; 
              text-transform: uppercase; 
              letter-spacing: 1.5px; 
              margin-bottom: 6px;
              font-weight: 600;
            }
            .value { 
              color: #ffffff; 
              font-size: 16px;
              font-weight: 600;
            }
            .info-box {
              background: rgba(204, 255, 0, 0.05);
              border-left: 4px solid #ccff00;
              padding: 16px;
              border-radius: 4px;
              margin: 24px 0;
            }
            .info-box p {
              color: #d4d4d8;
              margin: 0;
              font-size: 14px;
            }
            .footer { 
              background: #0f0f12;
              padding: 24px 32px; 
              border-top: 1px solid #27272a; 
              text-align: center;
            }
            .footer p {
              color: #71717a;
              font-size: 13px;
              margin: 8px 0;
            }
            .support { 
              color: #ccff00;
              text-decoration: none;
              font-weight: 600;
            }
            .support:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo-badge">
                <span style="color: #ccff00; font-weight: 800; font-size: 14px;">DEVUP</span>
              </div>
              <h1 class="title">DEVTHON 2026</h1>
              <p class="subtitle">Registration Received</p>
            </div>

            <div class="content">
              <p class="greeting">Hi ${data.leadName},</p>

              <p class="message">
                Thank you for registering for Devthon 2026! We have received your payment details and are currently verifying your transaction.
              </p>

              <div class="status-badge">
                <span>⏳</span>
                <span>Payment Verification Pending</span>
              </div>

              <div class="details-grid">
                <div class="detail-row">
                  <div class="label">Team Number</div>
                  <div class="value">${data.teamNumber}</div>
                </div>

                <div class="detail-row">
                  <div class="label">Team Name</div>
                  <div class="value">${data.teamName}</div>
                </div>

                <div class="detail-row">
                  <div class="label">Team Lead</div>
                  <div class="value">${data.leadName}</div>
                </div>

                <div class="detail-row">
                  <div class="label">Team Size</div>
                  <div class="value">${data.teamSize} Members</div>
                </div>

                ${data.teamMembers && data.teamMembers.length > 0 ? `
                <div class="detail-row">
                  <div class="label">Team Members</div>
                  <div class="value" style="line-height: 1.8;">
                    ${data.teamMembers.map(m => `
                      <div style="margin-bottom: 8px;">
                        <strong style="color: #ffffff;">${m.name}</strong>
                        ${m.phone ? `<span style="color: #a1a1aa; margin-left: 8px;">• ${m.phone}</span>` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
                ` : ''}

                <div class="detail-row">
                  <div class="label">Payment Amount</div>
                  <div class="value">₹${data.amount}</div>
                </div>

                <div class="detail-row">
                  <div class="label">Transaction ID</div>
                  <div class="value">${data.transactionId}</div>
                </div>
              </div>

              <div class="info-box">
                <p>
                  We verify payments manually every evening. Once verified, you will receive a confirmation email with your event ticket, venue details, and WhatsApp group link.
                </p>
              </div>
            </div>

            <div class="footer">
              <p>
                For any queries, reach us at <a href="mailto:${SUPPORT_EMAIL}" class="support">${SUPPORT_EMAIL}</a>
              </p>
              <p style="margin-top: 16px;">
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
    // Generate ticket PDF
    const ticketPdf = await generateTicket({
      teamNumber: data.teamNumber,
      teamName: data.teamName,
      leadName: data.leadName,
      teamSize: data.teamSize,
      teamMembers: data.teamMembers,
      eventName: 'Devthon 2026',
      eventDate: 'February 27-28, 2026',
      eventVenue: 'VJIT Campus, Hyderabad',
    });

    const result = await resend.emails.send({
      from: SENDER_EMAIL,
      replyTo: REPLY_TO_EMAIL,
      to: data.leadEmail,
      subject: `✅ Devthon 2026 Registration Confirmed - ${data.teamNumber}`,
      attachments: [
        {
          filename: `Devthon-2026-Ticket-${data.teamNumber}.pdf`,
          content: Buffer.from(ticketPdf).toString('base64'),
        },
      ],
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; 
              background: #0a0a0a; 
              color: #a1a1aa; 
              padding: 20px; 
              line-height: 1.6;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: linear-gradient(to bottom, #0f0f12 0%, #18181b 100%);
              border: 1px solid #27272a; 
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            }
            .header { 
              background: linear-gradient(135deg, #1a1a1d 0%, #0f0f12 100%);
              padding: 32px;
              border-bottom: 3px solid #ccff00; 
              text-align: center;
            }
            .logo-badge {
              display: inline-block;
              background: rgba(204, 255, 0, 0.15);
              border: 2px solid #ccff00;
              border-radius: 8px;
              padding: 8px 20px;
              margin-bottom: 16px;
            }
            .title { 
              color: #ffffff; 
              font-size: 32px; 
              font-weight: 800; 
              margin: 0;
              letter-spacing: 2px;
            }
            .subtitle { 
              color: #34d399; 
              font-size: 13px; 
              margin-top: 8px;
              text-transform: uppercase;
              letter-spacing: 3px;
              font-weight: 600;
            }
            .content {
              padding: 32px;
            }
            .greeting {
              color: #ffffff;
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 16px;
            }
            .message {
              color: #d4d4d8;
              margin-bottom: 24px;
              font-size: 15px;
            }
            .status-badge { 
              background: linear-gradient(135deg, #dcfce7 0%, #a7f3d0 100%);
              color: #14532d; 
              padding: 12px 20px; 
              border-radius: 8px; 
              display: inline-flex;
              align-items: center;
              gap: 8px;
              font-size: 13px;
              font-weight: 700;
              margin: 24px 0;
              box-shadow: 0 4px 12px rgba(220, 252, 231, 0.3);
            }
            .details-grid {
              background: #1a1a1d;
              border: 1px solid #27272a;
              border-radius: 8px;
              padding: 24px;
              margin: 24px 0;
            }
            .detail-row {
              margin-bottom: 20px;
              padding-bottom: 20px;
              border-bottom: 1px solid #27272a;
            }
            .detail-row:last-child {
              margin-bottom: 0;
              padding-bottom: 0;
              border-bottom: none;
            }
            .label { 
              color: #71717a; 
              font-size: 11px; 
              text-transform: uppercase; 
              letter-spacing: 1.5px; 
              margin-bottom: 6px;
              font-weight: 600;
            }
            .value { 
              color: #ffffff; 
              font-size: 16px;
              font-weight: 600;
            }
            .event-box {
              background: linear-gradient(135deg, rgba(204, 255, 0, 0.08) 0%, rgba(204, 255, 0, 0.03) 100%);
              border-left: 4px solid #ccff00;
              padding: 20px;
              border-radius: 4px;
              margin: 24px 0;
            }
            .event-box strong {
              color: #ffffff;
              font-size: 15px;
              display: block;
              margin-bottom: 12px;
            }
            .event-box p {
              color: #d4d4d8;
              margin: 8px 0;
              font-size: 14px;
            }
            .cta-button { 
              background: linear-gradient(135deg, #ccff00 0%, #a3d900 100%);
              color: #000000; 
              padding: 14px 28px; 
              text-decoration: none; 
              border-radius: 8px; 
              display: inline-block; 
              font-weight: 700; 
              margin: 24px 0;
              box-shadow: 0 4px 12px rgba(204, 255, 0, 0.3);
              transition: transform 0.2s;
            }
            .cta-button:hover {
              transform: translateY(-2px);
            }
            .ticket-info {
              background: rgba(52, 211, 153, 0.08);
              border: 2px solid #34d399;
              border-radius: 8px;
              padding: 20px;
              margin: 24px 0;
              text-align: center;
            }
            .ticket-info p {
              color: #d4d4d8;
              margin: 8px 0;
              font-size: 14px;
            }
            .ticket-info strong {
              color: #34d399;
              font-size: 16px;
            }
            .footer { 
              background: #0f0f12;
              padding: 24px 32px; 
              border-top: 1px solid #27272a; 
              text-align: center;
            }
            .footer p {
              color: #71717a;
              font-size: 13px;
              margin: 8px 0;
            }
            .support { 
              color: #ccff00;
              text-decoration: none;
              font-weight: 600;
            }
            .support:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo-badge">
                <span style="color: #ccff00; font-weight: 800; font-size: 14px;">DEVUP</span>
              </div>
              <h1 class="title">DEVTHON 2026</h1>
              <p class="subtitle">✅ Registration Confirmed</p>
            </div>

            <div class="content">
              <p class="greeting">Hi ${data.leadName},</p>

              <p class="message">
                Congratulations! Your payment has been verified and your registration for Devthon 2026 is confirmed. You're all set for the hackathon!
              </p>

              <div class="status-badge">
                <span>✅</span>
                <span>Payment Verified</span>
              </div>

              <div class="details-grid">
                <div class="detail-row">
                  <div class="label">Team Number</div>
                  <div class="value">${data.teamNumber}</div>
                </div>

                <div class="detail-row">
                  <div class="label">Team Name</div>
                  <div class="value">${data.teamName}</div>
                </div>

                <div class="detail-row">
                  <div class="label">Team Lead</div>
                  <div class="value">${data.leadName}</div>
                </div>

                <div class="detail-row">
                  <div class="label">Team Size</div>
                  <div class="value">${data.teamSize} Members</div>
                </div>

                ${data.teamMembers && data.teamMembers.length > 0 ? `
                <div class="detail-row">
                  <div class="label">Team Members</div>
                  <div class="value" style="line-height: 1.8;">
                    ${data.teamMembers.map(m => `
                      <div style="margin-bottom: 8px;">
                        <strong style="color: #ffffff;">${m.name}</strong>
                        ${m.phone ? `<span style="color: #a1a1aa; margin-left: 8px;">• ${m.phone}</span>` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
                ` : ''}

                <div class="detail-row">
                  <div class="label">Payment Amount</div>
                  <div class="value">₹${data.amount}</div>
                </div>

                <div class="detail-row">
                  <div class="label">Transaction ID</div>
                  <div class="value">${data.transactionId}</div>
                </div>
              </div>

              <div class="event-box">
                <strong>📅 Event Details</strong>
                <p>📍 VJIT Campus, Hyderabad</p>
                <p>🗓️ February 27-28, 2026</p>
                <p>⏰ 36-hour Hackathon</p>
                <p style="margin-top: 12px;">
                  <a href="https://maps.app.goo.gl/1TVBQEfzYStHc3pn6" style="color: #ccff00; text-decoration: none; font-weight: 600;">🗺️ View Venue on Google Maps →</a>
                </p>
              </div>

              <div style="background: linear-gradient(135deg, rgba(204, 255, 0, 0.12) 0%, rgba(204, 255, 0, 0.05) 100%); border: 2px solid #ccff00; border-radius: 8px; padding: 24px; margin: 24px 0; text-align: center;">
                <p style="color: #ccff00; font-weight: 700; font-size: 16px; margin-bottom: 12px;">⚠️ IMPORTANT: Join WhatsApp Group</p>
                <p style="color: #d4d4d8; margin-bottom: 16px; font-size: 14px;">It is <strong style="color: #ffffff;">mandatory</strong> to join our official WhatsApp group. All important updates, schedule changes, and announcements will be shared here.</p>
                <a href="https://chat.whatsapp.com/ERAYANFQPlpEBrjgE6355i" style="background: #25D366; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 700; font-size: 15px; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);">
                  📱 Join WhatsApp Group Now
                </a>
                <p style="color: #a1a1aa; margin-top: 12px; font-size: 12px;">Don't miss out on important updates!</p>
              </div>

              <div class="ticket-info">
                <strong>📎 Your Event Ticket is Attached!</strong>
                <p style="margin-top: 12px;">
                  Download the PDF ticket and save it on your phone.<br/>
                  <strong style="color: #ffffff;">Present this ticket at the venue for entry.</strong>
                </p>
              </div>
            </div>

            <div class="footer">
              <p>
                For any queries, reach us at <a href="mailto:${SUPPORT_EMAIL}" class="support">${SUPPORT_EMAIL}</a>
              </p>
              <p style="margin-top: 16px;">
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
