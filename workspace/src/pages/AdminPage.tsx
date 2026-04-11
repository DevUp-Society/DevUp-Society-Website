import { useMemo, useState } from 'react';
import { collection, limit, orderBy, query } from 'firebase/firestore';
import { ShieldCheck, Users, Workflow } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLiveCollection } from '../lib/firestore';
import { db } from '../lib/firebase';
import type { TaskItem, Team, UserProfile } from '../types';
import { assignRole, createTeam } from '../lib/actions';
import { Badge, EmptyState, Panel, StatCard } from '../components/UI';
import { buildTeamPerformance, computeWorkspaceStats } from '../lib/metrics';

export function AdminPage() {
  const { profile } = useAuth();
  const [teamForm, setTeamForm] = useState({ name: '', slug: '', leadId: '', leadName: '', color: '#ccff00', description: '' });
  const [roleForm, setRoleForm] = useState({ userId: '', role: 'Team Lead' as const, teamId: '', teamName: '' });

  const usersQuery = useMemo(() => (firestore: NonNullable<typeof db>) => query(collection(firestore, 'users'), orderBy('updatedAt', 'desc'), limit(50)), []);
  const teamsQuery = useMemo(() => (firestore: NonNullable<typeof db>) => query(collection(firestore, 'teams'), orderBy('createdAt', 'desc'), limit(20)), []);
  const tasksQuery = useMemo(() => (firestore: NonNullable<typeof db>) => query(collection(firestore, 'tasks'), orderBy('updatedAt', 'desc'), limit(100)), []);

  const { data: users = [] } = useLiveCollection<UserProfile>(usersQuery, []);
  const { data: teams = [] } = useLiveCollection<Team>(teamsQuery, []);
  const { data: tasks = [] } = useLiveCollection<TaskItem>(tasksQuery, []);

  const isLead = profile?.role === 'Admin' || profile?.role === 'Team Lead';
  const stats = computeWorkspaceStats(tasks, [], users);
  const teamPerformance = buildTeamPerformance(teams, tasks);

  if (!isLead) {
    return <EmptyState title="Access restricted" description="The admin area is available to Admin and Team Lead roles only." />;
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Tasks" value={stats.totalTasks} helper="Total tracked tasks" />
        <StatCard label="Completion rate" value={`${stats.completionRate}%`} helper="Approved and completed work" tone="white" />
        <StatCard label="Members" value={users.length} helper="Users stored in Firestore" tone="zinc" />
        <StatCard label="Teams" value={teams.length} helper="Team records" />
      </section>

      <section className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-6">
          <Panel title="Create Team" subtitle="Admin only" action={<ShieldCheck className="h-4 w-4 text-signal" />}>
            <div className="space-y-3">
              <input value={teamForm.name} onChange={(event) => setTeamForm((current) => ({ ...current, name: event.target.value }))} placeholder="Team name" className="w-full rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-signal focus:outline-none" />
              <input value={teamForm.slug} onChange={(event) => setTeamForm((current) => ({ ...current, slug: event.target.value }))} placeholder="team-slug" className="w-full rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-signal focus:outline-none" />
              <input value={teamForm.leadId} onChange={(event) => setTeamForm((current) => ({ ...current, leadId: event.target.value }))} placeholder="Lead user ID" className="w-full rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-signal focus:outline-none" />
              <input value={teamForm.leadName} onChange={(event) => setTeamForm((current) => ({ ...current, leadName: event.target.value }))} placeholder="Lead name" className="w-full rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-signal focus:outline-none" />
              <input value={teamForm.color} onChange={(event) => setTeamForm((current) => ({ ...current, color: event.target.value }))} placeholder="#ccff00" className="w-full rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-signal focus:outline-none" />
              <textarea value={teamForm.description} onChange={(event) => setTeamForm((current) => ({ ...current, description: event.target.value }))} placeholder="Team mission and scope" className="min-h-24 w-full rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-signal focus:outline-none" />
              <button type="button" onClick={async () => { await createTeam(teamForm); setTeamForm({ name: '', slug: '', leadId: '', leadName: '', color: '#ccff00', description: '' }); }} className="w-full rounded-xl bg-signal px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-black btn-glitch">
                Create team
              </button>
            </div>
          </Panel>

          <Panel title="Assign Role" subtitle="User permissions and team binding" action={<Users className="h-4 w-4 text-signal" />}>
            <div className="space-y-3">
              <select value={roleForm.userId} onChange={(event) => setRoleForm((current) => ({ ...current, userId: event.target.value }))} className="w-full rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white focus:border-signal focus:outline-none">
                <option value="">Select member</option>
                {users.map((member) => <option key={member.id} value={member.id}>{member.name} • {member.email}</option>)}
              </select>
              <select value={roleForm.role} onChange={(event) => setRoleForm((current) => ({ ...current, role: event.target.value as typeof roleForm.role }))} className="w-full rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white focus:border-signal focus:outline-none">
                <option>Member</option>
                <option>Team Lead</option>
                <option>Admin</option>
              </select>
              <select value={roleForm.teamId} onChange={(event) => {
                const selected = teams.find((team) => team.id === event.target.value);
                setRoleForm((current) => ({ ...current, teamId: event.target.value, teamName: selected?.name ?? '' }));
              }} className="w-full rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white focus:border-signal focus:outline-none">
                <option value="">Select team</option>
                {teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
              </select>
              <button type="button" disabled={!roleForm.userId || !roleForm.teamId} onClick={async () => assignRole(roleForm.userId, roleForm.role, roleForm.teamId, roleForm.teamName)} className="w-full rounded-xl border border-zinc-800 bg-black/30 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-300 transition-colors hover:border-signal hover:text-signal disabled:cursor-not-allowed disabled:opacity-50">
                Save assignment
              </button>
            </div>
          </Panel>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <Panel title="Workspace Health" subtitle="Analytics and team performance" action={<Workflow className="h-4 w-4 text-signal" />}>
            <div className="space-y-3">
              {teamPerformance.length ? teamPerformance.map((team) => (
                <div key={team.id} className="rounded-2xl border border-zinc-800 bg-black/30 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-white">{team.name}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{team.totalTasks} tasks • {team.completed} completed</p>
                    </div>
                    <Badge tone="signal">{team.completionRate}%</Badge>
                  </div>
                </div>
              )) : <EmptyState title="No teams yet" description="Create the first team to unlock performance analytics." />}
            </div>
          </Panel>

          <Panel title="Members" subtitle="Current Firestore user documents" action={<Users className="h-4 w-4 text-signal" />}>
            <div className="overflow-hidden rounded-2xl border border-zinc-800">
              <table className="w-full text-left">
                <thead className="bg-black/40">
                  <tr className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Team</th>
                    <th className="px-4 py-3 text-right">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((member) => (
                    <tr key={member.id} className="border-t border-zinc-900">
                      <td className="px-4 py-3 font-display text-white">{member.name}</td>
                      <td className="px-4 py-3"><Badge tone={member.role === 'Admin' ? 'signal' : 'neutral'}>{member.role}</Badge></td>
                      <td className="px-4 py-3 font-mono text-sm text-zinc-300">{member.teamName || 'Unassigned'}</td>
                      <td className="px-4 py-3 text-right font-display text-2xl text-signal">{member.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </section>
    </div>
  );
}
