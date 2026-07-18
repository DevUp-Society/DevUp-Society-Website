import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL || 'https://xdxkmxzkbpwbukfkxphw.supabase.co';
const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy-service-role-key-for-build-purposes-only';

if (!import.meta.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('Missing SUPABASE_SERVICE_ROLE_KEY in environment. Database admin functions will fail.');
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
