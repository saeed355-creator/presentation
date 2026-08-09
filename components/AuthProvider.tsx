'use client';

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured, signOutUser, syncAuthCookie, getStoredLocalUser } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import AuthModal from './AuthModal';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  requireAuth: (onSuccessAction?: () => void) => void;
  openAuthModal: (mode?: 'signin' | 'signup', onSuccessAction?: () => void) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  requireAuth: () => {},
  openAuthModal: () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'signin' | 'signup'>('signin');

  // Use useRef to store pending action callback safely without React functional updater side-effects
  const pendingActionRef = useRef<(() => void) | null>(null);

  const handleModalSuccess = useCallback((userEmail?: string) => {
    setIsAuthModalOpen(false);

    const email = userEmail || 'user@company.com';
    const activeUser = {
      id: `user-${Date.now()}`,
      email: email,
      role: 'authenticated',
      aud: 'authenticated',
      app_metadata: {},
      user_metadata: {},
      created_at: new Date().toISOString(),
    } as unknown as User;

    const activeSession = {
      access_token: 'active-session-token',
      token_type: 'bearer',
      user: activeUser,
    } as unknown as Session;

    setUser(activeUser);
    setSession(activeSession);
    syncAuthCookie(activeSession, email);

    const targetAction = pendingActionRef.current;
    pendingActionRef.current = null;

    if (targetAction) {
      targetAction();
    } else {
      if (typeof window !== 'undefined' && window.location.pathname === '/') {
        window.location.href = '/generate';
      } else {
        router.push('/generate');
      }
    }
  }, [router]);

  // Initialize and listen to Supabase & local auth session state
  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      let activeUser: User | null = null;
      let activeSession: Session | null = null;

      if (supabase && isSupabaseConfigured) {
        try {
          const { data: { session: initialSession } } = await supabase.auth.getSession();
          if (initialSession) {
            activeSession = initialSession;
            activeUser = initialSession.user;
          }
        } catch (err) {
          console.warn('Initial session check notice:', err);
        }
      }

      if (!activeUser) {
        const stored = getStoredLocalUser();
        if (stored) {
          activeUser = {
            id: stored.id || 'active-user',
            email: stored.email || 'user@company.com',
            role: 'authenticated',
            aud: 'authenticated',
            app_metadata: {},
            user_metadata: {},
            created_at: new Date().toISOString(),
          } as unknown as User;
          activeSession = {
            access_token: 'active-session-token',
            token_type: 'bearer',
            user: activeUser,
          } as unknown as Session;
        }
      }

      if (isMounted) {
        setSession(activeSession);
        setUser(activeUser);
        if (activeSession) {
          syncAuthCookie(activeSession, activeUser?.email);
        }
        setLoading(false);
      }
    }

    initAuth();

    if (!supabase) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (isMounted) {
        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user ?? null);
          syncAuthCookie(currentSession, currentSession.user?.email);
        }
        setLoading(false);

        if (currentSession && isAuthModalOpen) {
          handleModalSuccess(currentSession.user?.email);
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [isAuthModalOpen, handleModalSuccess]);

  // Handle URL auth query parameters (auth=signin or auth=signup) cleanly AFTER auth loading finishes
  useEffect(() => {
    if (loading) return;

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const authParam = params.get('auth');
      const redirectParam = params.get('redirect');

      if (authParam === 'signin' || authParam === 'signup') {
        const activeUser = user || session?.user || getStoredLocalUser();

        if (activeUser) {
          // User is ALREADY authenticated! Do NOT open auth modal. Clean up URL.
          const cleanPath = redirectParam || window.location.pathname;
          window.history.replaceState({}, '', cleanPath);
          if (redirectParam && window.location.pathname !== redirectParam) {
            router.push(redirectParam);
          }
        } else {
          // User is unauthenticated: trigger auth modal
          setModalMode(authParam);
          if (redirectParam) {
            pendingActionRef.current = () => router.push(redirectParam);
          } else {
            pendingActionRef.current = () => router.push('/generate');
          }
          setIsAuthModalOpen(true);
        }
      }
    }
  }, [loading, session, user, router]);

  const openAuthModal = useCallback((mode: 'signin' | 'signup' = 'signin', action?: () => void) => {
    setModalMode(mode);
    pendingActionRef.current = action || (() => router.push('/generate'));
    setIsAuthModalOpen(true);
  }, [router]);

  const requireAuth = useCallback((onSuccessAction?: () => void) => {
    if (loading) return; // Ignore while initial auth is loading

    const activeUser = user || session?.user || getStoredLocalUser();

    if (activeUser) {
      // User is ALREADY authenticated! Execute requested action immediately without asking again.
      if (onSuccessAction) {
        onSuccessAction();
      } else {
        router.push('/generate');
      }
    } else {
      // User is unauthenticated: open action-gate modal
      openAuthModal('signin', onSuccessAction);
    }
  }, [loading, session, user, openAuthModal, router]);

  const logout = useCallback(async () => {
    setLoading(true);
    await signOutUser();
    setUser(null);
    setSession(null);
    syncAuthCookie(null);
    setIsAuthModalOpen(false);
    pendingActionRef.current = null;
    setLoading(false);
    router.replace('/');
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        requireAuth,
        openAuthModal,
        logout,
      }}
    >
      {children}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={modalMode}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

