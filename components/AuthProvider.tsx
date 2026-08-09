'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured, signOutUser, syncAuthCookie } from '@/lib/supabase';
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
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Initialize and listen to Supabase session state
  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      if (!supabase || !isSupabaseConfigured) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        if (isMounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
          syncAuthCookie(initialSession);
          setLoading(false);
        }
      } catch (err) {
        console.warn('Initial session check notice:', err);
        if (isMounted) setLoading(false);
      }
    }

    initAuth();

    if (!supabase) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (isMounted) {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        syncAuthCookie(currentSession);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Handle URL auth query parameters (auth=signin or auth=signup) cleanly AFTER auth loading finishes
  useEffect(() => {
    if (loading) return;

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const authParam = params.get('auth');
      const redirectParam = params.get('redirect');

      if (authParam === 'signin' || authParam === 'signup') {
        if (session || user) {
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
            setPendingAction(() => () => router.push(redirectParam));
          } else {
            setPendingAction(() => () => router.push('/generate'));
          }
          setIsAuthModalOpen(true);
        }
      }
    }
  }, [loading, session, user, router]);

  const openAuthModal = useCallback((mode: 'signin' | 'signup' = 'signin', action?: () => void) => {
    setModalMode(mode);
    if (action) {
      setPendingAction(() => action);
    } else {
      setPendingAction(() => () => router.push('/generate'));
    }
    setIsAuthModalOpen(true);
  }, [router]);

  const requireAuth = useCallback((onSuccessAction?: () => void) => {
    if (loading) return; // Ignore while initial auth is loading

    if (session || user) {
      // User is already authenticated: execute requested action immediately
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

  const handleModalSuccess = useCallback(() => {
    setIsAuthModalOpen(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    } else {
      router.push('/generate');
    }
  }, [pendingAction, router]);

  const logout = useCallback(async () => {
    setLoading(true);
    await signOutUser();
    setUser(null);
    setSession(null);
    syncAuthCookie(null);
    setIsAuthModalOpen(false);
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

