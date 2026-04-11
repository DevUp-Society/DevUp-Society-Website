import { addDoc, collection, doc, increment, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage, bumpUserActivity, createNotification } from './firebase';
import type { Priority, Role, TaskMode, TaskStatus, TaskType } from '../types';

export interface TaskPayload {
  title: string;
  description: string;
  teamId: string;
  teamName: string;
  assigneeId: string;
  assigneeName: string;
  createdById: string;
  createdByName: string;
  priority: Priority;
  deadline: string;
  points: number;
  type: TaskType;
  mode: TaskMode;
  status: TaskStatus;
  reviewRequired: boolean;
}

export async function createTeam(payload: { name: string; slug: string; leadId: string; leadName: string; color: string; description: string; }) {
  if (!db) throw new Error('Firebase is not configured.');

  await addDoc(collection(db, 'teams'), {
    ...payload,
    memberCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function createTask(payload: TaskPayload) {
  if (!db) throw new Error('Firebase is not configured.');

  const docRef = await addDoc(collection(db, 'tasks'), {
    ...payload,
    blockedReason: '',
    completedAt: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  if (payload.assigneeId) {
    await createNotification(payload.assigneeId, {
      title: `Task assigned: ${payload.title}`,
      body: `${payload.teamName} assigned a new task to you.`,
      type: 'assigned',
      taskId: docRef.id,
    });
  }

  return docRef.id;
}

export async function assignRole(userId: string, role: Role, teamId: string, teamName: string) {
  if (!db) throw new Error('Firebase is not configured.');

  await updateDoc(doc(db, 'users', userId), {
    role,
    teamId,
    teamName,
    updatedAt: serverTimestamp(),
  });
}

export async function claimTask(taskId: string, userId: string, userName: string, teamId: string, teamName: string) {
  if (!db) throw new Error('Firebase is not configured.');

  await updateDoc(doc(db, 'tasks', taskId), {
    assigneeId: userId,
    assigneeName: userName,
    teamId,
    teamName,
    status: 'In Progress',
    updatedAt: serverTimestamp(),
  });
}

export async function updateTaskStatus(taskId: string, status: TaskStatus, note = '') {
  if (!db) throw new Error('Firebase is not configured.');

  await updateDoc(doc(db, 'tasks', taskId), {
    status,
    blockedReason: status === 'Blocked' ? note : '',
    completedAt: status === 'Completed' ? serverTimestamp() : null,
    updatedAt: serverTimestamp(),
  });
}

export async function approveTask(taskId: string, points: number, assigneeId: string) {
  if (!db) throw new Error('Firebase is not configured.');

  await updateDoc(doc(db, 'tasks', taskId), {
    status: 'Completed',
    completedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  await updateDoc(doc(db, 'users', assigneeId), {
    points: increment(points),
    completedCount: increment(1),
    updatedAt: serverTimestamp(),
    lastActiveAt: serverTimestamp(),
  });
}

export async function submitTaskForReview(taskId: string) {
  return updateTaskStatus(taskId, 'Review');
}

export async function startTask(taskId: string) {
  return updateTaskStatus(taskId, 'In Progress');
}

export async function markBlocked(taskId: string, reason: string) {
  return updateTaskStatus(taskId, 'Blocked', reason);
}

export async function postUpdate(taskId: string, userId: string, userName: string, text: string, file?: File | null) {
  if (!db) throw new Error('Firebase is not configured.');

  let attachmentUrl = '';
  let attachmentName = '';

  if (file && storage) {
    try {
      const storageRef = ref(storage, `attachments/${userId}/${Date.now()}-${file.name}`);
      const uploadResult = await uploadBytes(storageRef, file);
      attachmentUrl = await getDownloadURL(uploadResult.ref);
      attachmentName = file.name;
    } catch {
      // Keep updates flowing even when Storage isn't enabled on the Firebase plan.
      attachmentUrl = '';
      attachmentName = '';
    }
  }

  const updateRef = await addDoc(collection(db, 'updates'), {
    taskId,
    userId,
    userName,
    text,
    attachmentUrl,
    attachmentName,
    pointsAwarded: 2,
    createdAt: serverTimestamp(),
  });

  await bumpUserActivity(userId, 2, 0);
  return updateRef.id;
}

export async function postComment(taskId: string, userId: string, userName: string, text: string) {
  if (!db) throw new Error('Firebase is not configured.');

  const mentions = Array.from(new Set((text.match(/@([\w.-]+)/g) ?? []).map((mention) => mention.slice(1))));

  const commentRef = await addDoc(collection(db, 'comments'), {
    taskId,
    userId,
    userName,
    text,
    mentions,
    createdAt: serverTimestamp(),
  });

  return { id: commentRef.id, mentions };
}

export async function createWorkspaceNotification(recipientId: string, title: string, body: string, taskId = '', type: 'assigned' | 'update' | 'deadline' | 'comment' | 'system' = 'system') {
  return createNotification(recipientId, { title, body, type, taskId });
}
