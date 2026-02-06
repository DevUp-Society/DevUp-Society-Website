import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

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

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
