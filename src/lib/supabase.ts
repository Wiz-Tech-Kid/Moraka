/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Vite requires env vars to be prefixed with VITE_ for client bundles.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Supabase keys are not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase: SupabaseClient = createClient(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '');

// Updated signUp helper to handle email confirmation
export async function signUp(opts: {
  email: string;
  password: string;
  name?: string;
  username?: string;
  phone?: string;
  city?: string;
}) {
  const { email, password, name, username, phone, city } = opts;

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
    { email, password },
    { data: { name, username, phone, city } }
  );

  if (signUpError) return { error: signUpError };

  const user = signUpData.user;

  if (user && !user.confirmed_at) {
    // User needs to confirm their email
    return { message: 'Confirmation email sent. Please verify your email to complete registration.' };
  }

  try {
    if (user) {
      // Upsert a profile row keyed by auth user id. Adjust column names as needed in your DB.
      await supabase.from('profiles').upsert(
        {
          id: user.id,
          full_name: name ?? null,
          username: username ?? null,
          phone: phone ?? null,
          city: city ?? null,
          email,
        },
        { returning: 'minimal' }
      );
    }
  } catch (err) {
    // Don't block sign-up success if profile insert fails, but surface warning.
    console.warn('profile upsert failed', err);
  }

  return { user: signUpData.user, session: signUpData.session };
}

// Try to resolve an identifier (username | phone | email) into an email address stored in profiles.
export async function findEmailByIdentifier(identifier: string) {
  if (identifier.includes('@')) return identifier;

  // Try exact match on username or phone
  const { data, error } = await supabase.from('profiles').select('email').or(`username.eq.${identifier},phone.eq.${identifier}`).limit(1).maybeSingle();
  if (error) {
    console.warn('findEmailByIdentifier error', error);
    return null;
  }
  if (data && (data as any).email) return (data as any).email;
  return null;
}

// Sign in using identifier (email or username or phone) + password. Returns Supabase auth result.
export async function signInWithIdentifier(identifier: string, password: string) {
  let email = identifier;
  if (!identifier.includes('@')) {
    const found = await findEmailByIdentifier(identifier);
    if (found) email = found;
  }

  const result = await supabase.auth.signInWithPassword({ email, password });
  return result;
}

export async function getProfileById(id: string) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', id).maybeSingle();
  return { data, error };
}

export default supabase;
