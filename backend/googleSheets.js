import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Google Sheets API
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

let sheets = null;

function initSheetsClient() {
  if (!SPREADSHEET_ID || !SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
    console.warn('[GoogleSheets] Missing credentials - backup to Google Sheets disabled');
    return null;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: SERVICE_ACCOUNT_EMAIL,
        private_key: PRIVATE_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    sheets = google.sheets({ version: 'v4', auth });
    console.log('[GoogleSheets] ✓ Client initialized successfully');
    return sheets;
  } catch (error) {
    console.error('[GoogleSheets] Failed to initialize:', error.message);
    return null;
  }
}

// Initialize on module load
sheets = initSheetsClient();

/**
 * Initialize spreadsheet with headers
 */
export async function initializeSpreadsheet() {
  if (!sheets) return { success: false, error: 'Sheets client not initialized' };

  try {
    // Set up Registrations sheet headers
    const registrationsHeaders = [
      'ID',
      'Team Number',
      'Event Slug',
      'Team Name',
      'Lead Name',
      'Lead Email',
      'Lead Phone',
      'Lead College',
      'Team Size',
      'Payment Amount',
      'Transaction ID',
      'Payment Status',
      'Status',
      'Created At',
      'Updated At'
    ];

    // Set up Team Members sheet headers
    const teamMembersHeaders = [
      'ID',
      'Registration ID',
      'Team Number',
      'Name',
      'Email',
      'Phone',
      'Created At'
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Registrations!A1:O1',
      valueInputOption: 'RAW',
      resource: {
        values: [registrationsHeaders]
      }
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Team Members!A1:G1',
      valueInputOption: 'RAW',
      resource: {
        values: [teamMembersHeaders]
      }
    });

    console.log('[GoogleSheets] ✓ Spreadsheet headers initialized');
    return { success: true };
  } catch (error) {
    console.error('[GoogleSheets] Failed to initialize spreadsheet:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Sync a single registration to Google Sheets
 */
export async function syncRegistrationToSheets(registration, teamMembers = []) {
  if (!sheets) {
    console.warn('[GoogleSheets] Skipping sync - client not initialized');
    return { success: false, error: 'Sheets client not initialized' };
  }

  try {
    console.log(`[GoogleSheets] Syncing registration ${registration.team_number}...`);

    // Prepare registration row
    const registrationRow = [
      registration.id,
      registration.team_number,
      registration.event_slug,
      registration.team_name,
      registration.lead_name,
      registration.lead_email,
      registration.lead_phone,
      registration.lead_college,
      registration.team_size,
      registration.payment_amount,
      registration.transaction_id || '',
      registration.payment_status,
      registration.status,
      registration.created_at || new Date().toISOString(),
      registration.updated_at || new Date().toISOString()
    ];

    // Append to Registrations sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Registrations!A2:O',
      valueInputOption: 'RAW',
      resource: {
        values: [registrationRow]
      }
    });

    // Sync team members if any
    if (teamMembers && teamMembers.length > 0) {
      const memberRows = teamMembers.map(member => [
        member.id || '',
        registration.id,
        registration.team_number,
        member.name,
        member.email || '',
        member.phone || '',
        member.created_at || new Date().toISOString()
      ]);

      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Team Members!A2:G',
        valueInputOption: 'RAW',
        resource: {
          values: memberRows
        }
      });

      console.log(`[GoogleSheets] ✓ Synced registration + ${teamMembers.length} team members`);
    } else {
      console.log('[GoogleSheets] ✓ Synced registration (no team members)');
    }

    return { success: true };
  } catch (error) {
    console.error('[GoogleSheets] Sync failed:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Full backup - sync all registrations from Supabase to Google Sheets
 */
export async function fullBackupToSheets(supabase) {
  if (!sheets) {
    return { success: false, error: 'Sheets client not initialized' };
  }

  try {
    console.log('[GoogleSheets] Starting full backup...');

    // Fetch all registrations
    const { data: registrations, error: regError } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (regError) throw regError;

    // Fetch all team members
    const { data: allMembers, error: memError } = await supabase
      .from('team_members')
      .select('*');

    if (memError) throw memError;

    // Group team members by registration_id
    const membersByReg = {};
    allMembers?.forEach(member => {
      if (!membersByReg[member.registration_id]) {
        membersByReg[member.registration_id] = [];
      }
      membersByReg[member.registration_id].push(member);
    });

    // Clear existing data (keep headers)
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Registrations!A2:O'
    });

    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Team Members!A2:G'
    });

    // Prepare all rows
    const registrationRows = registrations.map(reg => [
      reg.id,
      reg.team_number,
      reg.event_slug,
      reg.team_name,
      reg.lead_name,
      reg.lead_email,
      reg.lead_phone,
      reg.lead_college,
      reg.team_size,
      reg.payment_amount,
      reg.transaction_id || '',
      reg.payment_status,
      reg.status,
      reg.created_at || '',
      reg.updated_at || ''
    ]);

    const memberRows = [];
    allMembers?.forEach(member => {
      const registration = registrations.find(r => r.id === member.registration_id);
      memberRows.push([
        member.id,
        member.registration_id,
        registration?.team_number || '',
        member.name,
        member.email || '',
        member.phone || '',
        member.created_at || ''
      ]);
    });

    // Batch write
    if (registrationRows.length > 0) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Registrations!A2:O',
        valueInputOption: 'RAW',
        resource: {
          values: registrationRows
        }
      });
    }

    if (memberRows.length > 0) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Team Members!A2:G',
        valueInputOption: 'RAW',
        resource: {
          values: memberRows
        }
      });
    }

    console.log(`[GoogleSheets] ✓ Full backup complete: ${registrationRows.length} registrations, ${memberRows.length} team members`);
    
    return {
      success: true,
      stats: {
        registrations: registrationRows.length,
        teamMembers: memberRows.length
      }
    };
  } catch (error) {
    console.error('[GoogleSheets] Full backup failed:', error.message);
    return { success: false, error: error.message };
  }
}

export const isConfigured = () => {
  return sheets !== null;
};
