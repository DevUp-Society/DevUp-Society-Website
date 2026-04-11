import { getApp, getApps, initializeApp } from 'firebase/app';
import type { FirebaseOptions } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, type User } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getFirestore, increment, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY ?? import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN ?? import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID ?? import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET ?? import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID ?? import.meta.env.VITE_FIREBASE_APP_ID,
};

const adminEmails = (import.meta.env.PUBLIC_ADMIN_EMAILS ?? import.meta.env.VITE_ADMIN_EMAILS ?? '')
  .split(',')
  .map((email: string) => email.trim().toLowerCase())
  .filter(Boolean);

const firebaseReady = Object.values(firebaseConfig).every(Boolean);
const app = firebaseReady ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;
export const googleProvider = app ? new GoogleAuthProvider() : null;

if (googleProvider) {
  googleProvider.setCustomParameters({ prompt: 'select_account' });
}

export function isFirebaseReady() {
  // Core app features only require Auth + Firestore. Storage is optional.
  return Boolean(app && auth && db && googleProvider);
}

export async function signInWithGoogle() {
  if (!auth || !googleProvider) {
    throw new Error('Firebase is not configured. Set PUBLIC_FIREBASE_* or VITE_FIREBASE_* environment variables first.');
  }

  return signInWithPopup(auth, googleProvider);
}

export async function signOutWorkspace() {
  if (!auth) {
    throw new Error('Firebase is not configured.');
  }

  await signOut(auth);
}

export async function ensureWorkspaceUser(user: User) {
  if (!db) {
    return;
  }

  const userRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(userRef);
  const normalizedEmail = (user.email ?? '').toLowerCase();
  const shouldBeAdmin = adminEmails.includes(normalizedEmail);
  const existingRole = snapshot.exists() ? snapshot.data().role : null;
  const defaultRole = shouldBeAdmin ? 'Admin' : 'Member';
  const payload = {
    id: user.uid,
    name: user.displayName ?? user.email?.split('@')[0] ?? 'Member',
    email: user.email ?? '',
    photoURL: user.photoURL ?? '',
    // If the email is configured as admin, always promote to Admin at sign-in.
    role: shouldBeAdmin ? 'Admin' : (existingRole ?? defaultRole),
    teamId: snapshot.exists() ? snapshot.data().teamId ?? '' : '',
    teamName: snapshot.exists() ? snapshot.data().teamName ?? '' : '',
    points: snapshot.exists() ? snapshot.data().points ?? 0 : 0,
    completedCount: snapshot.exists() ? snapshot.data().completedCount ?? 0 : 0,
    createdAt: snapshot.exists() ? snapshot.data().createdAt ?? serverTimestamp() : serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastActiveAt: serverTimestamp(),
  };

  await setDoc(userRef, payload, { merge: true });
}

export async function bumpUserActivity(userId: string, points = 0, completedCount = 0) {
  if (!db) {
    return;
  }

  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    points: increment(points),
    completedCount: increment(completedCount),
    lastActiveAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function createNotification(recipientId: string, payload: { title: string; body: string; type: 'assigned' | 'update' | 'deadline' | 'comment' | 'system'; taskId?: string; }) {
  if (!db) {
    return;
  }

  await addDoc(collection(db, 'notifications'), {
    recipientId,
    title: payload.title,
    body: payload.body,
    type: payload.type,
    taskId: payload.taskId ?? '',
    read: false,
    createdAt: serverTimestamp(),
  });
}
