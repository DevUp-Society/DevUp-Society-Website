import { useMemo, useState } from 'react';
import { collection, limit, orderBy, query } from 'firebase/firestore';
import { Plus, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLiveCollection } from '../lib/firestore';
import { db } from '../lib/firebase';
import { claimTask, createTask } from '../lib/actions';
import type { TaskItem, Team } from '../types';
import { Badge, EmptyState, Panel } from '../components/UI';
import { TaskCard } from '../components/TaskCard';

const taskTypes = ['feature', 'bug', 'research', 'content'] as const;
const priorities = ['Low', 'Medium', 'High', 'Critical'] as const;
const taskStatuses = ['All', 'Todo', 'In Progress', 'Blocked', 'Review', 'Completed'] as const;

export function TasksPage() {
  const { profile } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<(typeof taskStatuses)[number]>('All');
  const [teamFilter, setTeamFilter] = useState('All');
  const [submitting, setSubmitting] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    teamId: '',
    teamName: '',
    assigneeId: '',
    assigneeName: '',
    priority: 'Medium' as const,
    deadline: '',
    points: 10,
    type: 'feature' as const,
    mode: 'Open' as const,
    reviewRequired: true,
  });

  const tasksQuery = useMemo(() => (firestore: NonNullable<typeof db>) => query(collection(firestore, 'tasks'), orderBy('updatedAt', 'desc'), limit(100)), []);
  const teamsQuery = useMemo(() => (firestore: NonNullable<typeof db>) => query(collection(firestore, 'teams'), orderBy('createdAt', 'desc'), limit(20)), []);
  const usersQuery = useMemo(() => (firestore: NonNullable<typeof db>) => query(collection(firestore, 'users'), orderBy('points', 'desc'), limit(40)), []);

  const { data: tasks = [] } = useLiveCollection<TaskItem>(tasksQuery, []);
  const { data: teams = [] } = useLiveCollection<Team>(teamsQuery, []);
  const { data: members = [] } = useLiveCollection<any>(usersQuery, []);

  const isLead = profile?.role === 'Admin' || profile?.role === 'Team Lead';
  const visibleTeams = ['All', ...new Set(tasks.map((task) => task.teamName).filter(Boolean))];

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = `${task.title} ${task.description} ${task.assigneeName} ${task.teamName}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    const matchesTeam = teamFilter === 'All' || task.teamName === teamFilter;
    return matchesSearch && matchesStatus && matchesTeam;
  });

  async function handleCreateTask() {
    if (!profile) return;
    setSubmitting(true);
    try {
      const team = teams.find((entry) => entry.id === taskForm.teamId);
      const assignee = members.find((entry: Team) => entry.id === taskForm.assigneeId);
      const taskId = await createTask({
        ...taskForm,
        teamName: team?.name ?? taskForm.teamName,
        assigneeName: assignee?.name ?? taskForm.assigneeName ?? '',
        createdById: profile.id,
        createdByName: profile.name,
        status: 'Todo',
      });
      setTaskForm({ title: '', description: '', teamId: '', teamName: '', assigneeId: '', assigneeName: '', priority: 'Medium', deadline: '', points: 10, type: 'feature', mode: 'Open', reviewRequired: true });
      window.location.assign(`/tasks/${taskId}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <section className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Panel title="Task Management" subtitle="Create, assign, and track work">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Search</label>
                <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-black/30 px-4 py-3">
                  <Search className="h-4 w-4 text-signal" />
                  <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full bg-transparent font-mono text-sm text-white placeholder:text-zinc-600 focus:outline-none" placeholder="Search title, team, assignee" />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Status</label>
                  <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)} className="w-full rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white focus:border-signal focus:outline-none">
                    {taskStatuses.map((status) => <option key={status}>{status}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Team</label>
                  <select value={teamFilter} onChange={(event) => setTeamFilter(event.target.value)} className="w-full rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white focus:border-signal focus:outline-none">
                    {visibleTeams.map((team) => <option key={team}>{team}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge tone="signal">{filteredTasks.length} visible</Badge>
                <Badge tone="neutral">{teams.length} teams</Badge>
                <Badge tone="neutral">{members.length} members</Badge>
              </div>
            </div>
          </Panel>
        </div>

        <div className="lg:col-span-7">
          <Panel title="Create Task" subtitle="Admin / Team Lead only" action={<Plus className="h-4 w-4 text-signal" />}>
            {isLead ? (
              <div className="grid gap-4 md:grid-cols-2">
                <input value={taskForm.title} onChange={(event) => setTaskForm((current) => ({ ...current, title: event.target.value }))} placeholder="Task title" className="rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-signal focus:outline-none md:col-span-2" />
                <textarea value={taskForm.description} onChange={(event) => setTaskForm((current) => ({ ...current, description: event.target.value }))} placeholder="Task description" className="min-h-28 rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-signal focus:outline-none md:col-span-2" />
                <select value={taskForm.teamId} onChange={(event) => {
                  const team = teams.find((entry) => entry.id === event.target.value);
                  setTaskForm((current) => ({ ...current, teamId: event.target.value, teamName: team?.name ?? '' }));
                }} className="rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white focus:border-signal focus:outline-none">
                  <option value="">Select team</option>
                  {teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
                </select>
                <select value={taskForm.assigneeId} onChange={(event) => {
                  const member = members.find((entry: any) => entry.id === event.target.value);
                  setTaskForm((current) => ({ ...current, assigneeId: event.target.value, assigneeName: member?.name ?? '' }));
                }} className="rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white focus:border-signal focus:outline-none">
                  <option value="">Assign member</option>
                  {members.map((member: any) => <option key={member.id} value={member.id}>{member.name}</option>)}
                </select>
                <select value={taskForm.priority} onChange={(event) => setTaskForm((current) => ({ ...current, priority: event.target.value as typeof taskForm.priority }))} className="rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white focus:border-signal focus:outline-none">
                  {priorities.map((priority) => <option key={priority}>{priority}</option>)}
                </select>
                <select value={taskForm.type} onChange={(event) => setTaskForm((current) => ({ ...current, type: event.target.value as typeof taskForm.type }))} className="rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white focus:border-signal focus:outline-none">
                  {taskTypes.map((type) => <option key={type}>{type}</option>)}
                </select>
                <input type="date" value={taskForm.deadline} onChange={(event) => setTaskForm((current) => ({ ...current, deadline: event.target.value }))} className="rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white focus:border-signal focus:outline-none" />
                <input type="number" value={taskForm.points} onChange={(event) => setTaskForm((current) => ({ ...current, points: Number(event.target.value) }))} className="rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white focus:border-signal focus:outline-none" />
                <select value={taskForm.mode} onChange={(event) => setTaskForm((current) => ({ ...current, mode: event.target.value as typeof taskForm.mode }))} className="rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white focus:border-signal focus:outline-none">
                  <option value="Open">Open</option>
                  <option value="Assigned">Assigned</option>
                </select>
                <label className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-xs uppercase tracking-[0.22em] text-zinc-400 md:col-span-2">
                  <input type="checkbox" checked={taskForm.reviewRequired} onChange={(event) => setTaskForm((current) => ({ ...current, reviewRequired: event.target.checked }))} className="h-4 w-4 accent-[#ccff00]" />
                  Review required before completion
                </label>
                <button type="button" onClick={handleCreateTask} disabled={submitting || !taskForm.title || !taskForm.description || !taskForm.teamId} className="rounded-xl bg-signal px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 btn-glitch md:col-span-2">
                  {submitting ? 'Creating...' : 'Create task'}
                </button>
              </div>
            ) : (
              <EmptyState title="Read only" description="Only Admin and Team Lead roles can create new tasks." />
            )}
          </Panel>
        </div>
      </section>

      <section className="grid gap-4">
        {filteredTasks.length ? filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task}>
            <div className="flex flex-wrap gap-3">
              {task.mode === 'Open' && profile && task.status !== 'Completed' && (
                <button type="button" onClick={async () => {
                  await claimTask(task.id, profile.id, profile.name, profile.teamId, profile.teamName);
                }} className="rounded-xl border border-signal/40 bg-signal/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-signal">
                  Pick task
                </button>
              )}
            </div>
          </TaskCard>
        )) : (
          <EmptyState title="No matching tasks" description="Try a different search or filter, or create a new task if you have lead access." />
        )}
      </section>
    </div>
  );
}
