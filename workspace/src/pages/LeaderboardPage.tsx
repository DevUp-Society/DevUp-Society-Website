import { useMemo } from 'react';
import { collection, limit, orderBy, query } from 'firebase/firestore';
import { Crown, Medal, Trophy } from 'lucide-react';
import { useLiveCollection } from '../lib/firestore';
import { buildLeaderboard, buildTeamPerformance } from '../lib/metrics';
import type { TaskItem, Team, UpdateItem, UserProfile } from '../types';
import { db } from '../lib/firebase';
import { Badge, EmptyState, Panel, StatCard } from '../components/UI';

export function LeaderboardPage() {
  const usersQuery = useMemo(() => (firestore: NonNullable<typeof db>) => query(collection(firestore, 'users'), orderBy('points', 'desc'), limit(25)), []);
  const teamsQuery = useMemo(() => (firestore: NonNullable<typeof db>) => query(collection(firestore, 'teams'), orderBy('createdAt', 'desc'), limit(20)), []);
  const tasksQuery = useMemo(() => (firestore: NonNullable<typeof db>) => query(collection(firestore, 'tasks'), orderBy('updatedAt', 'desc'), limit(100)), []);
  const updatesQuery = useMemo(() => (firestore: NonNullable<typeof db>) => query(collection(firestore, 'updates'), orderBy('createdAt', 'desc'), limit(50)), []);

  const { data: users = [] } = useLiveCollection<UserProfile>(usersQuery, []);
  const { data: teams = [] } = useLiveCollection<Team>(teamsQuery, []);
  const { data: tasks = [] } = useLiveCollection<TaskItem>(tasksQuery, []);
  const { data: updates = [] } = useLiveCollection<UpdateItem>(updatesQuery, []);

  const leaderboard = buildLeaderboard(users);
  const teamPerformance = buildTeamPerformance(teams, tasks);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Top scorer" value={leaderboard[0]?.points ?? 0} helper={leaderboard[0]?.name ?? 'No data'} />
        <StatCard label="Teams tracked" value={teams.length} helper="Performance rolls up by team" tone="white" />
        <StatCard label="Recent updates" value={updates.length} helper="Activity contributes to engagement" tone="zinc" />
      </section>

      <section className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Panel title="All-Time Leaderboard" subtitle="Points from tasks and updates" action={<Crown className="h-4 w-4 text-signal" />}>
            {leaderboard.length ? (
              <div className="overflow-hidden rounded-2xl border border-zinc-800">
                <table className="w-full text-left">
                  <thead className="bg-black/40">
                    <tr className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                      <th className="px-4 py-3">Rank</th>
                      <th className="px-4 py-3">Member</th>
                      <th className="px-4 py-3">Team</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3 text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((member) => (
                      <tr key={member.id} className="border-t border-zinc-900">
                        <td className="px-4 py-4 font-display text-lg text-signal">#{member.rank}</td>
                        <td className="px-4 py-4">
                          <div className="font-display text-white">{member.name}</div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{member.email}</div>
                        </td>
                        <td className="px-4 py-4 font-mono text-sm text-zinc-300">{member.teamName || 'Unassigned'}</td>
                        <td className="px-4 py-4"><Badge tone={member.role === 'Admin' ? 'signal' : 'neutral'}>{member.role}</Badge></td>
                        <td className="px-4 py-4 text-right font-display text-2xl text-white">{member.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState title="No leaderboard data" description="Points will appear after tasks and updates start flowing." />
            )}
          </Panel>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Panel title="Top 3" subtitle="Podium view" action={<Trophy className="h-4 w-4 text-signal" />}>
            <div className="space-y-3">
              {leaderboard.slice(0, 3).map((member, index) => (
                <div key={member.id} className="rounded-2xl border border-zinc-800 bg-black/30 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-white">#{member.rank} {member.name}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{member.teamName || 'Unassigned'}</p>
                    </div>
                    <Medal className="h-5 w-5 text-signal" />
                  </div>
                  <p className="mt-2 font-display text-3xl text-signal">{member.points}</p>
                </div>
              ))}
              {!leaderboard.length && <EmptyState title="Empty podium" description="Team members will populate here as they accumulate points." />}
            </div>
          </Panel>

          <Panel title="Team Performance" subtitle="Completion rate by team">
            <div className="space-y-3">
              {teamPerformance.length ? teamPerformance.map((team) => (
                <div key={team.id} className="rounded-2xl border border-zinc-800 bg-black/30 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-white">{team.name}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{team.totalTasks} tasks</p>
                    </div>
                    <span className="font-display text-2xl text-signal">{team.completionRate}%</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-zinc-900">
                    <div className="h-2 rounded-full bg-signal" style={{ width: `${team.completionRate}%` }} />
                  </div>
                </div>
              )) : <EmptyState title="No team data" description="Create teams and assign tasks to generate team performance metrics." />}
            </div>
          </Panel>
        </div>
      </section>
    </div>
  );
}
