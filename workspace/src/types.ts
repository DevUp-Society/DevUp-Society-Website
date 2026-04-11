export type Role = 'Admin' | 'Team Lead' | 'Member';
export type TaskStatus = 'Todo' | 'In Progress' | 'Blocked' | 'Review' | 'Completed';
export type TaskMode = 'Assigned' | 'Open';
export type TaskType = 'feature' | 'bug' | 'research' | 'content';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  role: Role;
  teamId: string;
  teamName: string;
  points: number;
  completedCount: number;
  createdAt?: unknown;
  updatedAt?: unknown;
  lastActiveAt?: unknown;
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  leadId: string;
  leadName: string;
  memberCount: number;
  color: string;
  description: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface TaskItem {
  id: string;
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
  blockedReason: string;
  completedAt?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface UpdateItem {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  text: string;
  attachmentUrl: string;
  attachmentName: string;
  pointsAwarded: number;
  createdAt?: unknown;
}

export interface CommentItem {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  text: string;
  mentions: string[];
  createdAt?: unknown;
}

export interface NotificationItem {
  id: string;
  recipientId: string;
  title: string;
  body: string;
  type: 'assigned' | 'update' | 'deadline' | 'comment' | 'system';
  taskId?: string;
  read: boolean;
  createdAt?: unknown;
}
