import type { TaskItem, Team, UpdateItem, UserProfile } from '../types';
import { timestampToDate } from './firestore';

export function computeWorkspaceStats(tasks: TaskItem[], updates: UpdateItem[], users: UserProfile[]) {
  const completed = tasks.filter((task) => task.status === 'Completed');
  const active = tasks.filter((task) => task.status !== 'Completed');
  const blocked = tasks.filter((task) => task.status === 'Blocked');
  const completionRate = tasks.length ? Math.round((completed.length / tasks.length) * 100) : 0;
  const activeMembers = users.filter((user) => user.points > 0).length;

  const recentActivity = updates.filter((update) => {
    const date = timestampToDate(update.createdAt);
    if (!date) return false;
    return Date.now() - date.getTime() < 7 * 24 * 60 * 60 * 1000;
  }).length;

  return {
    totalTasks: tasks.length,
    activeTasks: active.length,
    completedTasks: completed.length,
    blockedTasks: blocked.length,
    completionRate,
    activeMembers,
    recentActivity,
  };
}

export function buildLeaderboard(users: UserProfile[]) {
  return [...users].sort((left, right) => right.points - left.points).map((user, index) => ({
    ...user,
    rank: index + 1,
  }));
}

export function buildTeamPerformance(teams: Team[], tasks: TaskItem[]) {
  return teams.map((team) => {
    const teamTasks = tasks.filter((task) => task.teamId === team.id);
    const completed = teamTasks.filter((task) => task.status === 'Completed').length;
    const completionRate = teamTasks.length ? Math.round((completed / teamTasks.length) * 100) : 0;

    return {
      ...team,
      totalTasks: teamTasks.length,
      completed,
      completionRate,
    };
  });
}

export function topActivityMembers(users: UserProfile[], updates: UpdateItem[]) {
  const updateCounts = updates.reduce<Record<string, number>>((accumulator, update) => {
    accumulator[update.userId] = (accumulator[update.userId] ?? 0) + 1;
    return accumulator;
  }, {});

  return [...users]
    .map((user) => ({ ...user, updates: updateCounts[user.id] ?? 0 }))
    .sort((left, right) => right.updates - left.updates)
    .slice(0, 5);
}
