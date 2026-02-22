/**
 * POST /api/registrations/sync-sheets
 * Manual full backup to Google Sheets (Admin only)
 */
import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { fullBackupToSheets, isConfigured } from '../../../lib/googleSheets';

export const config = {
  runtime: 'nodejs',
  maxDuration: 10,
};

export const POST: APIRoute = async () => {
  const startTime = Date.now();

  try {
    if (!isConfigured()) {
      return new Response(
        JSON.stringify({
          error: 'Google Sheets backup not configured',
          message: 'Missing credentials in environment variables',
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[sync-sheets] Starting manual backup...');

    // Initialize Supabase
    const supabase = createClient(
      import.meta.env.SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.SUPABASE_ANON_KEY
    );

    // Perform full backup
    const result = await fullBackupToSheets(supabase);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: 'Backup failed',
          message: result.error,
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const duration = Date.now() - startTime;
    console.log(`[sync-sheets] ✓ Backup complete in ${duration}ms`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Full backup completed',
        stats: result.stats,
        duration: `${duration}ms`,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error: any) {
    console.error('[sync-sheets] Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Backup failed',
        message: error.message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
