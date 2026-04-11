import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, ensureWorkspaceUser, isFirebaseReady, signInWithGoogle, signOutWorkspace } from '../lib/firebase';
import type { UserProfile } from '../types';

interface AuthContextValue {
  firebaseReady: boolean;
  loading: boolean;
  user: User | null;
  profile: UserProfile | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      if (nextUser && db) {
        await ensureWorkspaceUser(nextUser);
        await setDoc(doc(db, 'users', nextUser.uid), { lastActiveAt: serverTimestamp(), updatedAt: serverTimestamp() }, { merge: true });
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user || !db) {
      setProfile(null);
      return;
    }

    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
      if (!snapshot.exists()) {
        setProfile(null);
        return;
      }

      setProfile({ id: snapshot.id, ...(snapshot.data() as Omit<UserProfile, 'id'>) });
    });

    return unsubscribe;
  }, [user?.uid]);

  const value = useMemo<AuthContextValue>(() => ({
    firebaseReady: isFirebaseReady(),
    loading,
    user,
    profile,
    signIn: async () => {
      await signInWithGoogle();
    },
    signOut: async () => {
      await signOutWorkspace();
    },
  }), [loading, user, profile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
