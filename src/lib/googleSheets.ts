/**
 * Google Sheets Backup Integration
 * Syncs registrations to Google Sheets for backup and easy access
 */
import { google } from 'googleapis';

const SPREADSHEET_ID = import.meta.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SERVICE_ACCOUNT_EMAIL = import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = import.meta.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

let sheets: any = null;

const MAX_RETRIES = 3;
const BASE_RETRY_DELAY_MS = 400;

function normalizePhone(phone: string): string {
  return String(phone || '').replace(/\D/g, '');
}

function shouldRetry(error: any): boolean {
  const status = error?.status || error?.code;
  if (typeof status === 'number') {
    return status === 429 || status >= 500;
  }

  const message = String(error?.message || '').toLowerCase();
  return (
    message.includes('econnreset') ||
    message.includes('timeout') ||
    message.includes('socket hang up') ||
    message.includes('rate limit')
  );
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry<T>(operation: () => Promise<T>, label: string): Promise<T> {
  let lastError: any;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;

      if (attempt >= MAX_RETRIES || !shouldRetry(error)) {
        throw error;
      }

      const delay = BASE_RETRY_DELAY_MS * Math.pow(2, attempt - 1);
      console.warn(
        `[GoogleSheets] ${label} failed on attempt ${attempt}/${MAX_RETRIES}, retrying in ${delay}ms`,
        { message: error?.message, status: error?.status || error?.code }
      );
      await sleep(delay);
    }
  }

  throw lastError;
}

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

export async function findRegistrationInSheets(
  eventSlug: string,
  leadEmail: string,
  leadPhone: string
): Promise<{ found: boolean; id?: string; rowNumber?: number; createdAt?: string; error?: string }> {
  if (!sheets) sheets = initSheetsClient();
  if (!sheets) return { found: false, error: 'Sheets client not initialized' };

  try {
    const response = await withRetry(
      () =>
        sheets.spreadsheets.values.get({
          spreadsheetId: SPREADSHEET_ID,
          range: 'Registrations!A2:I',
        }),
      'values.get'
    );

    const rows: any[][] = response?.data?.values || [];
    const targetEmail = String(leadEmail || '').toLowerCase().trim();
    const targetPhone = normalizePhone(leadPhone);
    const targetEvent = String(eventSlug || '').trim();

    for (let i = rows.length - 1; i >= 0; i--) {
      const row = rows[i] || [];
      const id = String(row[0] || '').trim();
      const event = String(row[1] || '').trim();
      const email = String(row[3] || '').toLowerCase().trim();
      const phone = normalizePhone(String(row[4] || ''));
      const createdAt = String(row[8] || '').trim();

      if (event === targetEvent && email === targetEmail && phone === targetPhone) {
        return {
          found: true,
          id,
          rowNumber: i + 2,
          createdAt,
        };
      }
    }

    return { found: false };
  } catch (error: any) {
    console.error('[GoogleSheets] Lookup failed:', {
      message: error?.message,
      code: error?.code,
      status: error?.status,
      eventSlug,
      leadEmail,
    });
    return { found: false, error: error?.message || 'Lookup failed' };
  }
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

    // Append to Registrations sheet and ask Google API to return the actual stored row.
    const response = await withRetry(
      () =>
        sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: 'Registrations!A:I',
          valueInputOption: 'RAW',
          insertDataOption: 'INSERT_ROWS',
          includeValuesInResponse: true,
          responseValueRenderOption: 'UNFORMATTED_VALUE',
          resource: {
            values: [regRow],
          },
        }),
      'values.append'
    );

    const updates = response?.data?.updates;
    const updatedRows = Number(updates?.updatedRows || 0);
    const updatedRange = String(updates?.updatedRange || '');
    const returnedFirstCell = String(updates?.updatedData?.values?.[0]?.[0] || '').trim();

    if (updatedRows !== 1 || !updatedRange || returnedFirstCell !== String(registration.id).trim()) {
      throw new Error(
        `Append verification failed (rows=${updatedRows}, range=${updatedRange}, returnedId=${returnedFirstCell})`
      );
    }

    console.log('[GoogleSheets] ✓ Synced registration:', registration.id, {
      updates,
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
