// Client-side Supabase configuration
// This file is bundled with the app and env vars are embedded at build time
import { createClient } from '@supabase/supabase-js';

// These will be replaced with actual values during build
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.error('PUBLIC_SUPABASE_URL:', supabaseUrl);
  console.error('PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'present' : 'missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'devup-admin-auth',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});
