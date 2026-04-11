import { useMemo } from 'react';
import { collection, limit, orderBy, query, where } from 'firebase/firestore';
import { Activity, Award, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLiveCollection } from '../lib/firestore';
import { db } from '../lib/firebase';
import type { TaskItem, UpdateItem } from '../types';
import { Badge, EmptyState, Panel, StatCard } from '../components/UI';

export function ProfilePage() {
  const { profile } = useAuth();

  const tasksQuery = useMemo(() => {
    if (!profile?.id) return null;
    return (firestore: NonNullable<typeof db>) => query(collection(firestore, 'tasks'), where('assigneeId', '==', profile.id), orderBy('updatedAt', 'desc'), limit(25));
  }, [profile?.id]);
  const updatesQuery = useMemo(() => {
    if (!profile?.id) return null;
    return (firestore: NonNullable<typeof db>) => query(collection(firestore, 'updates'), where('userId', '==', profile.id), orderBy('createdAt', 'desc'), limit(25));
  }, [profile?.id]);

  const { data: tasks = [] } = useLiveCollection<TaskItem>(tasksQuery ?? (() => null), []);
  const { data: updates = [] } = useLiveCollection<UpdateItem>(updatesQuery ?? (() => null), []);

  const completedTasks = tasks.filter((task) => task.status === 'Completed');
  const activeTasks = tasks.filter((task) => task.status !== 'Completed');

  if (!profile) {
    return <EmptyState title="Profile unavailable" description="Wait for authentication to finish or sign in again." />;
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total points" value={profile.points} helper="Points accumulated across the workspace" />
        <StatCard label="Completed tasks" value={profile.completedCount || completedTasks.length} helper="Tasks marked completed or approved" tone="white" />
        <StatCard label="Active tasks" value={activeTasks.length} helper="Open assignments in progress" tone="zinc" />
      </section>

      <section className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Panel title="Profile" subtitle="Workspace identity" action={<User className="h-4 w-4 text-signal" />}>
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 overflow-hidden rounded-full border border-zinc-800 bg-zinc-900">
                {profile.photoURL ? <img src={profile.photoURL} alt={profile.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center font-mono text-xl text-zinc-500">{profile.name.slice(0, 2).toUpperCase()}</div>}
              </div>
              <h2 className="mt-4 font-display text-3xl text-white">{profile.name}</h2>
              <p className="font-mono text-sm text-zinc-400">{profile.email}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Badge tone="signal">{profile.role}</Badge>
                <Badge tone="neutral">{profile.teamName || 'No team'}</Badge>
              </div>
            </div>
          </Panel>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <Panel title="Activity History" subtitle="Recent work and updates" action={<Activity className="h-4 w-4 text-signal" />}>
            <div className="space-y-3">
              {updates.length ? updates.map((update) => (
                <div key={update.id} className="rounded-2xl border border-zinc-800 bg-black/30 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-display text-white">{update.text}</p>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">+{update.pointsAwarded} pts</span>
                  </div>
                </div>
              )) : <EmptyState title="No updates" description="Your activity history will appear here after posting updates." />}
            </div>
          </Panel>

          <Panel title="Completed Tasks" subtitle="Recent finished work" action={<Award className="h-4 w-4 text-signal" />}>
            <div className="space-y-3">
              {completedTasks.length ? completedTasks.map((task) => (
                <div key={task.id} className="rounded-2xl border border-zinc-800 bg-black/30 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-white">{task.title}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{task.teamName}</p>
                    </div>
                    <Badge tone="success">{task.points} pts</Badge>
                  </div>
                </div>
              )) : <EmptyState title="No completed tasks yet" description="Completed assignments will show up here once they are approved or closed." />}
            </div>
          </Panel>
        </div>
      </section>
    </div>
  );
}
