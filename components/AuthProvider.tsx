'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured, signOutUser } from '@/lib/supabase';
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

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Single initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes cleanly
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin', action?: () => void) => {
    setModalMode(mode);
    if (action) {
      setPendingAction(() => action);
    } else {
      setPendingAction(() => () => router.push('/generate'));
    }
    setIsAuthModalOpen(true);
  };

  const requireAuth = (onSuccessAction?: () => void) => {
    if (session || user) {
      // User is already authenticated: execute action immediately
      if (onSuccessAction) {
        onSuccessAction();
      } else {
        router.push('/generate');
      }
    } else {
      // User is unauthenticated: open AuthModal action gate
      openAuthModal('signin', onSuccessAction);
    }
  };

  const handleModalSuccess = () => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    } else {
      router.push('/generate');
    }
  };

  const logout = async () => {
    setLoading(true);
    await signOutUser();
    setUser(null);
    setSession(null);
    setLoading(false);
    // Redirect to PUBLIC homepage / upon logout
    router.replace('/');
  };

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
