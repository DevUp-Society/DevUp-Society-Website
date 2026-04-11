import { useMemo } from 'react';
import { BarChart3, Bell, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLiveCollection } from '../lib/firestore';
import { buildLeaderboard, computeWorkspaceStats, topActivityMembers } from '../lib/metrics';
import { Badge, EmptyState, Panel, StatCard } from '../components/UI';
import { TaskCard } from '../components/TaskCard';
import type { NotificationItem, TaskItem, Team, UpdateItem, UserProfile } from '../types';
import { collection, limit, orderBy, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function DashboardPage() {
  const { profile } = useAuth();

  const tasksQuery = useMemo(() => (firestore: NonNullable<typeof db>) => query(collection(firestore, 'tasks'), orderBy('updatedAt', 'desc'), limit(40)), []);
  const updatesQuery = useMemo(() => (firestore: NonNullable<typeof db>) => query(collection(firestore, 'updates'), orderBy('createdAt', 'desc'), limit(20)), []);
  const usersQuery = useMemo(() => (firestore: NonNullable<typeof db>) => query(collection(firestore, 'users'), orderBy('points', 'desc'), limit(20)), []);
  const teamsQuery = useMemo(() => (firestore: NonNullable<typeof db>) => query(collection(firestore, 'teams'), orderBy('createdAt', 'desc'), limit(10)), []);
  const notificationsQuery = useMemo(() => {
    if (!profile?.id) return null;
    return (firestore: NonNullable<typeof db>) => query(collection(firestore, 'notifications'), where('recipientId', '==', profile.id), orderBy('createdAt', 'desc'), limit(8));
  }, [profile?.id]);

  const { data: tasks = [] } = useLiveCollection<TaskItem>(tasksQuery, []);
  const { data: updates = [] } = useLiveCollection<UpdateItem>(updatesQuery, []);
  const { data: users = [] } = useLiveCollection<UserProfile>(usersQuery, []);
  const { data: teams = [] } = useLiveCollection<Team>(teamsQuery, []);
  const { data: notifications = [] } = useLiveCollection<NotificationItem>(notificationsQuery ?? (() => null), []);

  const stats = computeWorkspaceStats(tasks, updates, users);
  const leaderboard = buildLeaderboard(users).slice(0, 5);
  const activeMembers = topActivityMembers(users, updates);
  const assignedTasks = tasks.filter((task) => task.assigneeId === profile?.id || (task.mode === 'Open' && profile?.teamId && task.teamId === profile.teamId)).slice(0, 4);
  const unreadNotifications = notifications.filter((notification) => !notification.read).length;

  return (
    <div className="space-y-8 animate-fade-in-up">
      <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-black/80 via-zinc-950/90 to-zinc-900/80 p-6 lg:p-8">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f22_1px,transparent_1px),linear-gradient(to_bottom,#1f1f22_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15" />
        <div className="relative z-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-black/40 px-4 py-2 clip-corner">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">Workspace live</span>
            </div>
            <h1 className="font-display text-4xl font-bold leading-[0.92] tracking-tight text-white sm:text-6xl">
              Hello, {profile?.name ?? 'Member'}.
              <span className="block text-stroke-white">Work queue summary</span>
            </h1>
            <p className="mt-5 max-w-3xl font-mono text-sm leading-relaxed text-zinc-400 sm:text-base">
              Track assigned work, open tasks, and team activity in real time. The dashboard is deliberately dense: one screen for execution, status, and momentum.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge tone="signal">{stats.completionRate}% completion rate</Badge>
              <Badge tone="neutral">{stats.activeTasks} active tasks</Badge>
              <Badge tone="neutral">{stats.recentActivity} updates this week</Badge>
              <Badge tone="neutral">{unreadNotifications} unread notifications</Badge>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="glass-panel clip-corner border border-signal/20 bg-signal/5 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">Current Team</p>
              <p className="mt-2 font-display text-3xl text-white">{profile?.teamName || 'Unassigned'}</p>
              <p className="mt-3 font-mono text-sm leading-relaxed text-zinc-400">
                {profile?.role === 'Admin'
                  ? 'Admin access enabled. You can create teams, assign roles, and review analytics.'
                  : profile?.role === 'Team Lead'
                    ? 'Team Lead access enabled. You can create tasks and manage your team’s queue.'
                    : 'Member access enabled. Pick open tasks, post updates, and complete assigned work.'}
              </p>
              <div className="mt-4 flex gap-3">
                <a href="/tasks" className="rounded-xl bg-signal px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-black btn-glitch">Browse tasks</a>
                <a href="/profile" className="rounded-xl border border-zinc-800 bg-black/40 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-300">View profile</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total tasks" value={stats.totalTasks} helper="Entire workspace task set" />
        <StatCard label="Completed" value={stats.completedTasks} helper="Marked as done or approved" tone="white" />
        <StatCard label="Blocked" value={stats.blockedTasks} helper="Needs intervention" tone="zinc" />
        <StatCard label="Active members" value={stats.activeMembers} helper="Members with points activity" />
      </section>

      <section className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <Panel title="Assigned Tasks" subtitle="Your queue and open work" action={<a href="/tasks" className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">View all</a>}>
            {assignedTasks.length ? (
              <div className="space-y-4">
                {assignedTasks.map((task) => <TaskCard key={task.id} task={task} />)}
              </div>
            ) : (
                <EmptyState title="No assigned tasks" description="When work is assigned to you, it appears here immediately." action={<a href="/tasks" className="rounded-xl bg-signal px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-black">Pick an open task</a>} />
            )}
          </Panel>

          <Panel title="Activity Feed" subtitle="Recent updates from the team" action={<Badge tone="signal">{updates.length} updates</Badge>}>
            <div className="space-y-3">
              {updates.length ? updates.slice(0, 5).map((update) => (
                <div key={update.id} className="rounded-2xl border border-zinc-800 bg-black/30 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-display text-lg text-white">{update.userName}</p>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">{update.pointsAwarded} pts</span>
                  </div>
                  <p className="mt-2 font-mono text-sm leading-relaxed text-zinc-400">{update.text}</p>
                </div>
              )) : (
                <EmptyState title="No updates yet" description="Task progress updates appear here in GitHub-style chronology." />
              )}
            </div>
          </Panel>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Panel title="Leaderboard Preview" subtitle="All-time points race" action={<BarChart3 className="h-4 w-4 text-signal" />}>
            <div className="space-y-3">
              {leaderboard.length ? leaderboard.map((member) => (
                <div key={member.id} className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-black/30 px-4 py-3">
                  <div>
                    <p className="font-display text-white">#{member.rank} {member.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{member.role} • {member.teamName || 'No team'}</p>
                  </div>
                  <span className="font-display text-2xl text-signal">{member.points}</span>
                </div>
              )) : <EmptyState title="Leaderboard empty" description="Points will surface as members complete tasks and post updates." />}
            </div>
          </Panel>

          <Panel title="Notifications" subtitle="Realtime Firestore listener" action={<Bell className="h-4 w-4 text-signal" />}>
            <div className="space-y-3">
              {notifications.length ? notifications.slice(0, 4).map((notification) => (
                <div key={notification.id} className="rounded-2xl border border-zinc-800 bg-black/30 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-white">{notification.title}</p>
                    <Badge tone={notification.read ? 'neutral' : 'signal'}>{notification.read ? 'Read' : 'New'}</Badge>
                  </div>
                  <p className="mt-2 font-mono text-sm text-zinc-400">{notification.body}</p>
                </div>
              )) : <EmptyState title="No notifications" description="Assignment and comment alerts will show up here automatically." />}
            </div>
          </Panel>

          <Panel title="Team Pulse" subtitle="Most active members this week" action={<Users className="h-4 w-4 text-signal" />}>
            <div className="space-y-3">
              {activeMembers.length ? activeMembers.map((member) => (
                <div key={member.id} className="rounded-2xl border border-zinc-800 bg-black/30 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-white">{member.name}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{member.teamName || 'Unassigned'}</p>
                    </div>
                    <span className="font-display text-2xl text-signal">{member.updates}</span>
                  </div>
                </div>
              )) : <EmptyState title="No activity yet" description="Updates drive the activity rank and engagement pulse." />}
            </div>
          </Panel>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Open tasks" value={stats.activeTasks} helper="Todo, In Progress, Review, and Blocked" />
        <StatCard label="Recent activity" value={stats.recentActivity} helper="Updates created in the last 7 days" />
        <StatCard label="Teams tracked" value={teams.length} helper="Organization units in workspace" />
      </section>
    </div>
  );
}
