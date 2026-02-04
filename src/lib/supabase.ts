
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

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
