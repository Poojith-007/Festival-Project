'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { auth, firebaseConfigurationMessage, isFirebaseConfigured } from '../lib/firebase/client';
import { isApiConfigured, verifyAdminSession } from '../lib/services/api';

interface AdminAuthContextValue {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  configured: boolean;
  error: string;
  signIn: (email: string, password: string) => Promise<void>;
  signOutAdmin: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue>({
  user: null,
  isAdmin: false,
  loading: true,
  configured: isFirebaseConfigured,
  error: '',
  signIn: async () => {},
  signOutAdmin: async () => {},
});

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState('');
  const verifiedAdminUid = useRef<string | null>(null);

  useEffect(() => {
    if (!auth || !isApiConfigured) return;

    const firebaseAuth = auth;

    return onAuthStateChanged(firebaseAuth, async (nextUser) => {
      setLoading(true);
      setUser(nextUser);
      setIsAdmin(false);
      if (!nextUser) {
        verifiedAdminUid.current = null;
        setLoading(false);
        return;
      }

      if (verifiedAdminUid.current === nextUser.uid) {
        setIsAdmin(true);
        setLoading(false);
        return;
      }

      try {
        await verifyAdminSession(nextUser);
        setIsAdmin(true);
        verifiedAdminUid.current = nextUser.uid;
      } catch (verificationError) {
        setError(verificationError instanceof Error ? verificationError.message : 'We could not verify your admin access. Please try again.');
        verifiedAdminUid.current = null;
      }
      finally {
        setLoading(false);
      }
    });
  }, []);

  const value: AdminAuthContextValue = {
    user,
    isAdmin,
    loading,
    configured: isFirebaseConfigured,
    error: error || firebaseConfigurationMessage(),
    signIn: async (email, password) => {
      if (!auth || !isApiConfigured) throw new Error(firebaseConfigurationMessage() || 'The admin verification service is not configured.');
      setError('');
      setLoading(true);

      try {
        const firebaseAuth = auth;
        const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const authenticatedUser = credential.user;
        await authenticatedUser.getIdToken();
        await verifyAdminSession(authenticatedUser);
        setUser(authenticatedUser);
        setIsAdmin(true);
        verifiedAdminUid.current = authenticatedUser.uid;
      } catch (signInError) {
        setUser(null);
        setIsAdmin(false);
        verifiedAdminUid.current = null;
        throw signInError;
      } finally {
        setLoading(false);
      }
    },
    signOutAdmin: async () => {
      if (auth) await signOut(auth);
    },
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export const useAdminAuth = () => useContext(AdminAuthContext);
