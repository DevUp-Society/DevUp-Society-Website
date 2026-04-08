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
  if (!sheets) {
    console.error('[GoogleSheets] Client not initialized - credentials missing or invalid');
    return { success: false, error: 'Sheets client not initialized' };
  }

  try {
    // Format registration data
    const regRow = [
      registration.id,
      registration.event_slug,
      registration.lead_name,
      registration.lead_email,
      registration.lead_phone,
      registration.lead_designation || 'N/A',
      registration.lead_college,
      registration.status || 'pending',
      registration.created_at || new Date().toISOString(),
    ];

    console.log('[GoogleSheets] Attempting to append row:', {
      spreadsheetId: SPREADSHEET_ID ? '✓ Set' : '✗ Missing',
      registrationId: registration.id,
      email: registration.lead_email,
    });

    // Append to Registrations sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Registrations!A:I',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [regRow],
      },
    });

    console.log('[GoogleSheets] ✓ Synced registration:', registration.id, {
      updates: response.data.updates,
      teamMembers: teamMembers.length,
    });
    return { success: true };
  } catch (error: any) {
    console.error('[GoogleSheets] Sync failed:', {
      message: error.message,
      code: error.code,
      status: error.status,
      details: error.details,
      registrationId: registration.id,
    });
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

    // Clear existing data
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Registrations!A2:I',
    });

    // Format registration rows
    const regRows = registrations.map((reg: any) => [
      reg.id,
      reg.event_slug,
      reg.lead_name,
      reg.lead_email,
      reg.lead_phone,
      reg.lead_designation || 'N/A',
      reg.lead_college,
      reg.status,
      reg.created_at,
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

    console.log(`[GoogleSheets] ✓ Full backup: ${regRows.length} registrations`);

    return {
      success: true,
      stats: {
        registrations: regRows.length,
        members: 0,
      },
    };
  } catch (error: any) {
    console.error('[GoogleSheets] Full backup failed:', error.message);
    return { success: false, error: error.message };
  }
}
