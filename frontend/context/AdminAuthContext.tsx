'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, firebaseConfigurationMessage, isFirebaseConfigured } from '../lib/firebase/client';

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

  useEffect(() => {
    if (!auth || !db) return;

    const firebaseAuth = auth;
    const firestore = db;

    return onAuthStateChanged(firebaseAuth, async (nextUser) => {
      setUser(nextUser);
      setIsAdmin(false);
      if (!nextUser) {
        setLoading(false);
        return;
      }

      try {
        const adminSnapshot = await getDoc(doc(firestore, 'adminUsers', nextUser.uid));
        const admin = adminSnapshot.data();
        setIsAdmin(adminSnapshot.exists() && admin?.role === 'admin' && admin?.active === true);
      } catch {
        setError('We could not verify your admin access. Please try again.');
      } finally {
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
      if (!auth) throw new Error(firebaseConfigurationMessage());
      setError('');
      await signInWithEmailAndPassword(auth, email, password);
    },
    signOutAdmin: async () => {
      if (auth) await signOut(auth);
    },
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export const useAdminAuth = () => useContext(AdminAuthContext);
