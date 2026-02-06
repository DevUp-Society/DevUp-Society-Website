import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { syncRegistrationToSheets, fullBackupToSheets, isConfigured } from './googleSheets.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'DevUp Backend API' });
});

// GET /api/get-team-number?slug=event-slug
app.get('/api/get-team-number', async (req, res) => {
  try {
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({ error: 'Event slug is required' });
    }

    // Get all team numbers for this event
    const { data, error } = await supabase
      .from('registrations')
      .select('team_number')
      .eq('event_slug', slug);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Database error' });
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

    res.json({ teamNumber });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/register
app.post('/api/register', async (req, res) => {
  try {
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
      members
    } = req.body;

    // Validation
    if (!event_slug || !team_name || !lead_name || !lead_email || !lead_phone || !lead_college || !team_number) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate registration ID
    const registrationId = crypto.randomUUID();

    // Insert registration
    const { error: regError } = await supabase
      .from('registrations')
      .insert([{
        id: registrationId,
        event_slug,
        team_name,
        lead_name,
        lead_email,
        lead_phone,
        lead_college,
        team_number,
        payment_amount: parseInt(payment_amount) || 0,
        transaction_id,
        payment_status: 'pending',
        team_size: parseInt(team_size) || 2,
        status: 'pending'
      }]);

    if (regError) {
      console.error('Registration insert error:', regError);
      return res.status(500).json({ error: 'Failed to create registration' });
    }

    // Insert team members if any
    if (members && Array.isArray(members) && members.length > 0) {
      const teamMembers = members.map(member => ({
        registration_id: registrationId,
        name: member.name,
        email: member.email,
        phone: member.phone
      }));

      const { error: memError } = await supabase
        .from('team_members')
        .insert(teamMembers);

      if (memError) {
        console.error('Team members insert error:', memError);
      }
    }

    // Backup to Google Sheets
    if (isConfigured()) {
      console.log('[GoogleSheets] Auto-syncing registration...');
      try {
        const registrationData = {
          id: registrationId,
          team_number,
          event_slug,
          team_name,
          lead_name,
          lead_email,
          lead_phone,
          lead_college,
          team_size: parseInt(team_size) || 2,
          payment_amount: parseInt(payment_amount) || 0,
          transaction_id,
          payment_status: 'pending',
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const teamMembersData = members && Array.isArray(members) && members.length > 0
          ? members.map(member => ({
              registration_id: registrationId,
              name: member.name,
              email: member.email,
              phone: member.phone,
              created_at: new Date().toISOString()
            }))
          : [];

        await syncRegistrationToSheets(registrationData, teamMembersData);
      } catch (sheetsError) {
        console.error('[GoogleSheets] Auto-sync failed:', sheetsError);
        // Don't fail registration if sheets sync fails
      }
    }

    // Send pending payment email
    console.log('[EMAIL] Sending pending payment email to:', lead_email);
    try {
      const memberNames = members && members.length > 0 
        ? members.map(m => m.name).filter(n => n).join(', ')
        : undefined;

      const emailFormData = new URLSearchParams({
        teamNumber: team_number,
        teamName: team_name,
        leadName: lead_name,
        leadEmail: lead_email,
        teamSize: team_size.toString(),
        amount: payment_amount.toString(),
        transactionId: transaction_id || 'N/A'
      });

      if (memberNames) {
        emailFormData.append('teamMembers', memberNames);
      }

      const emailResponse = await fetch('https://www.devupvjit.in/api/email/pending', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: emailFormData.toString()
      });

      if (emailResponse.ok) {
        console.log('[EMAIL] Pending payment email sent successfully');
      } else {
        const errorText = await emailResponse.text();
        console.error('[EMAIL] Failed to send email:', errorText);
      }
    } catch (emailError) {
      console.error('[EMAIL] Error sending email:', emailError);
      // Don't fail registration if email fails
    }

    // Return success
    res.json({
      success: true,
      registrationId,
      teamNumber: team_number,
      teamName: team_name,
      leadName: lead_name,
      leadEmail: lead_email,
      teamSize: team_size,
      paymentAmount: payment_amount,
      transactionId: transaction_id
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error occurred' });
  }
});

// POST /api/sync-sheets - Manual full backup to Google Sheets
app.post('/api/sync-sheets', async (req, res) => {
  try {
    if (!isConfigured()) {
      return res.status(503).json({ 
        error: 'Google Sheets backup not configured',
        message: 'Missing credentials: GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, or GOOGLE_PRIVATE_KEY'
      });
    }

    console.log('[GoogleSheets] Starting manual full backup...');
    const result = await fullBackupToSheets(supabase);

    if (!result.success) {
      return res.status(500).json({ 
        error: 'Backup failed',
        message: result.error
      });
    }

    console.log('[GoogleSheets] Manual backup completed successfully');
    res.json({
      success: true,
      message: 'Full backup completed',
      stats: result.stats
    });
  } catch (err) {
    console.error('[GoogleSheets] Manual backup error:', err);
    res.status(500).json({ error: 'Backup failed', message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`📊 Google Sheets backup: ${isConfigured() ? '✓ Enabled' : '✗ Disabled (missing credentials)'}`);
});
