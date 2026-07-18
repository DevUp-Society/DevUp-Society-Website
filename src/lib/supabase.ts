
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL || 'https://xdxkmxzkbpwbukfkxphw.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGtteHprYnB3YnVrZmt4cGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NjA0MzAsImV4cCI6MjA4NTQzNjQzMH0.8Ao-iZPA5mIpTKlXlTMtDs0Yg_YAWwhQT8MCX4n7QrY';

// Client for browser (uses localStorage)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'devup-admin-auth',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

// Server-side client helper - accepts cookies for SSR
export function createServerClient(cookieHeader?: string | null) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      flowType: 'pkce',
    },
    global: {
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
    },
  });
}
