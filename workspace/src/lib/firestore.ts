import { useEffect, useMemo, useState } from 'react';
import { collection, doc, limit, onSnapshot, orderBy, query, type DocumentData, type Firestore, type Query, type QueryConstraint, where } from 'firebase/firestore';
import { db, isFirebaseReady } from './firebase';

export function timestampToDate(value: unknown) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  if (typeof value === 'object' && value && 'seconds' in value) {
    const seconds = Number((value as { seconds: number }).seconds);
    return new Date(seconds * 1000);
  }

  return null;
}

export function formatRelativeTime(value: unknown) {
  const date = timestampToDate(value);
  if (!date) {
    return 'just now';
  }

  const delta = Date.now() - date.getTime();
  const minutes = Math.round(delta / 60000);
  const hours = Math.round(delta / 3600000);
  const days = Math.round(delta / 86400000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

type QueryBuilder = (firestore: Firestore) => Query<DocumentData> | null;

export function useLiveCollection<T>(buildQuery: QueryBuilder, fallback: T[] = []) {
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const queryResult = useMemo(() => (db ? buildQuery(db) : null), [buildQuery]);

  useEffect(() => {
    if (!isFirebaseReady() || !db || !queryResult) {
      setData(fallback);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      queryResult,
      (snapshot) => {
        setData(snapshot.docs.map((snapshotDoc) => ({ id: snapshotDoc.id, ...snapshotDoc.data() } as T)));
        setLoading(false);
        setError(null);
      },
      (snapshotError) => {
        setError(snapshotError.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [queryResult]);

  return { data, loading, error };
}

export function useLiveDocument<T>(collectionName: string, id: string | undefined, fallback: T | null = null) {
  const [data, setData] = useState<T | null>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseReady() || !db || !id) {
      setData(fallback);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, collectionName, id),
      (snapshot) => {
        setData(snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as T) : fallback);
        setLoading(false);
        setError(null);
      },
      (snapshotError) => {
        setError(snapshotError.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [collectionName, id]);

  return { data, loading, error };
}

export function buildQueryFilters(collectionName: string, constraints: QueryConstraint[]) {
  if (!db) {
    return null;
  }

  return query(collection(db, collectionName), ...constraints);
}

export function recentCollection(collectionName: string, count = 20) {
  return buildQueryFilters(collectionName, [orderBy('createdAt', 'desc'), limit(count)]);
}

export function byField(collectionName: string, field: string, value: string, count = 20) {
  return buildQueryFilters(collectionName, [where(field, '==', value), orderBy('createdAt', 'desc'), limit(count)]);
}

export function singleDocCollection(collectionName: string, id: string) {
  if (!db) {
    return null;
  }

  return doc(db, collectionName, id);
}
