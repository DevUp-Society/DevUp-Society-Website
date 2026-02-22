/**
 * Google Sheets Backup Integration
 * Syncs registrations to Google Sheets for backup and easy access
 */
import { google } from 'googleapis';

const SPREADSHEET_ID = import.meta.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SERVICE_ACCOUNT_EMAIL = import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = import.meta.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

let sheets: any = null;

function initSheetsClient() {
  if (!SPREADSHEET_ID || !SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
    console.warn('[GoogleSheets] Missing credentials - backup disabled');
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
    console.log('[GoogleSheets] ✓ Client initialized');
    return sheets;
  } catch (error: any) {
    console.error('[GoogleSheets] Init failed:', error.message);
    return null;
  }
}

export function isConfigured(): boolean {
  return !!(SPREADSHEET_ID && SERVICE_ACCOUNT_EMAIL && PRIVATE_KEY);
}

/**
 * Sync single registration to Google Sheets
 */
export async function syncRegistrationToSheets(
  registration: any,
  teamMembers: any[] = []
): Promise<{ success: boolean; error?: string }> {
  if (!sheets) sheets = initSheetsClient();
  if (!sheets) return { success: false, error: 'Sheets not configured' };

  try {
    // Format registration data
    const regRow = [
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
      registration.transaction_id || 'N/A',
      registration.payment_status || 'pending',
      registration.status || 'pending',
      registration.created_at || new Date().toISOString(),
      registration.updated_at || new Date().toISOString(),
    ];

    // Append to Registrations sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Registrations!A:O',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [regRow],
      },
    });

    // Append team members if any
    if (teamMembers.length > 0) {
      const memberRows = teamMembers.map((member) => [
        member.id || crypto.randomUUID(),
        registration.id,
        registration.team_number,
        member.name,
        member.email || 'N/A',
        member.phone || 'N/A',
        member.created_at || new Date().toISOString(),
      ]);

      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Team Members!A:G',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: memberRows,
        },
      });
    }

    console.log('[GoogleSheets] ✓ Synced:', registration.team_number);
    return { success: true };
  } catch (error: any) {
    console.error('[GoogleSheets] Sync failed:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Full backup from Supabase to Google Sheets
 */
export async function fullBackupToSheets(supabase: any): Promise<{
  success: boolean;
  error?: string;
  stats?: { registrations: number; members: number };
}> {
  if (!sheets) sheets = initSheetsClient();
  if (!sheets) return { success: false, error: 'Sheets not configured' };

  try {
    // Fetch all registrations
    const { data: registrations, error: regError } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (regError) throw new Error(`Supabase error: ${regError.message}`);

    // Fetch all team members
    const { data: teamMembers, error: memError } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: false });

    if (memError) throw new Error(`Team members error: ${memError.message}`);

    // Clear existing data
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Registrations!A2:O',
    });

    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Team Members!A2:G',
    });

    // Format registration rows
    const regRows = registrations.map((reg: any) => [
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
      reg.transaction_id || 'N/A',
      reg.payment_status,
      reg.status,
      reg.created_at,
      reg.updated_at,
    ]);

    // Write registrations
    if (regRows.length > 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Registrations!A2',
        valueInputOption: 'RAW',
        resource: {
          values: regRows,
        },
      });
    }

    // Format team member rows
    const memberRows = teamMembers.map((member: any) => [
      member.id,
      member.registration_id,
      member.team_number || 'N/A',
      member.name,
      member.email || 'N/A',
      member.phone || 'N/A',
      member.created_at,
    ]);

    // Write team members
    if (memberRows.length > 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Team Members!A2',
        valueInputOption: 'RAW',
        resource: {
          values: memberRows,
        },
      });
    }

    console.log(
      `[GoogleSheets] ✓ Full backup: ${regRows.length} regs, ${memberRows.length} members`
    );

    return {
      success: true,
      stats: {
        registrations: regRows.length,
        members: memberRows.length,
      },
    };
  } catch (error: any) {
    console.error('[GoogleSheets] Full backup failed:', error.message);
    return { success: false, error: error.message };
  }
}
