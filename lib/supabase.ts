import { createClient } from '@supabase/supabase-js';
import { Presentation } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Singleton Supabase Client instance for browser environment
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// Cookie sync helper to ensure Next.js Middleware and browser session state stay 100% in sync
export function syncAuthCookie(session: any) {
  if (typeof document === 'undefined') return;
  if (session && (session.access_token || session.user)) {
    document.cookie = `sb-auth-token=active; path=/; max-age=604800; SameSite=Lax`;
    if (session.access_token) {
      document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=604800; SameSite=Lax`;
    }
  } else {
    document.cookie = `sb-auth-token=; path=/; max-age=0; SameSite=Lax`;
    document.cookie = `sb-access-token=; path=/; max-age=0; SameSite=Lax`;
  }
}

export async function getCurrentSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getCurrentUser() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function signOutUser() {
  if (supabase) {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Supabase signout notice:', err);
    }
  }
  syncAuthCookie(null);
  if (typeof window !== 'undefined') {
    // Clear local storage auth session tokens
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('sb-') || key.includes('auth-token') || key.includes('supabase')) {
        localStorage.removeItem(key);
      }
    });
  }
}

// Database Helper: Save Presentation to Supabase Table "presentations" (secured with user_id)
export async function savePresentationToSupabase(presentation: Presentation): Promise<boolean> {
  if (!supabase || !isSupabaseConfigured) return false;
  try {
    const user = await getCurrentUser();
    const { error } = await supabase.from('presentations').upsert(
      {
        id: presentation.id,
        user_id: user?.id || null,
        title: presentation.title,
        subtitle: presentation.subtitle,
        topic: presentation.topic,
        audience: presentation.audience,
        purpose: presentation.purpose,
        tone: presentation.tone,
        slide_count: presentation.slideCount,
        theme: presentation.theme,
        slides: presentation.slides,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );

    if (error) {
      console.warn('Supabase DB Notice (using local cache fallback):', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase DB save error:', err);
    return false;
  }
}

// Database Helper: Fetch Presentations from Supabase (Row Level Security enforced)
export async function fetchPresentationsFromSupabase(): Promise<Presentation[]> {
  if (!supabase || !isSupabaseConfigured) return [];
  try {
    const user = await getCurrentUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('presentations')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error || !data) {
      console.warn('Supabase DB fetch notice:', error?.message);
      return [];
    }

    return data.map((row: any) => ({
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      topic: row.topic,
      audience: row.audience || 'professional',
      purpose: row.purpose || 'meeting',
      tone: row.tone || 'professional',
      slideCount: row.slide_count || row.slides?.length || 8,
      theme: row.theme,
      createdAt: row.created_at || new Date().toISOString(),
      updatedAt: row.updated_at || new Date().toISOString(),
      slides: row.slides || [],
    }));
  } catch (err) {
    console.warn('Supabase DB fetch error:', err);
    return [];
  }
}
