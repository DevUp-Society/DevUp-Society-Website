import { supabase } from './supabase';

// Whitelisted admin emails
const ADMIN_EMAILS = [
  'devupsociety@gmail.com',
  // Add more admin emails here
];

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function isAdmin(email: string | undefined): Promise<boolean> {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function checkAdminAuth() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Session error:', error);
      return { authenticated: false, isAdmin: false };
    }
    
    if (!session?.user?.email) {
      return { authenticated: false, isAdmin: false };
    }
    
    const adminStatus = await isAdmin(session.user.email);
    console.log('Admin check:', { email: session.user.email, isAdmin: adminStatus });
    
    return { 
      authenticated: true, 
      isAdmin: adminStatus,
      email: session.user.email 
    };
  } catch (err) {
    console.error('checkAdminAuth error:', err);
    return { authenticated: false, isAdmin: false };
  }
}
