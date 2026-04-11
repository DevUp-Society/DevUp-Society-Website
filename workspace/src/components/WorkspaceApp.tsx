import type { ReactNode } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { AdminPage } from '../views/AdminPage';
import { DashboardPage } from '../views/DashboardPage';
import { LeaderboardPage } from '../views/LeaderboardPage';
import { LoginPage } from '../views/LoginPage';
import { NotFoundPage } from '../views/NotFoundPage';
import { ProfilePage } from '../views/ProfilePage';
import { TaskDetailPage } from '../views/TaskDetailPage';
import { TasksPage } from '../views/TasksPage';
import { WorkspaceShell } from './WorkspaceShell';
import { useAuth } from '../context/AuthContext';

export type WorkspaceRoute = 'login' | 'dashboard' | 'tasks' | 'task-detail' | 'leaderboard' | 'profile' | 'admin' | 'not-found';

export interface WorkspaceAppProps {
  route: WorkspaceRoute;
  taskId?: string;
  redirectTo?: string;
}

function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-void text-white">
      <div className="glass-panel clip-corner border border-zinc-800 px-8 py-6 font-mono text-sm uppercase tracking-[0.25em] text-zinc-400">
        Syncing workspace...
      </div>
    </div>
  );
}

function ProtectedRoute({ children, redirectTo }: { children: ReactNode; redirectTo: string; }) {
  const { loading, user } = useAuth();

  if (loading) {
    return <LoadingState />;
  }

  if (!user) {
    return <LoginPage redirectTo={redirectTo} />;
  }

  return children;
}

export function WorkspaceApp({ route, taskId, redirectTo = '/dashboard' }: WorkspaceAppProps) {
  return (
    <AuthProvider>
      {route === 'login' ? (
        <LoginPage redirectTo={redirectTo} />
      ) : route === 'not-found' ? (
        <NotFoundPage />
      ) : (
        <ProtectedRoute redirectTo={redirectTo}>
          <WorkspaceShell currentPath={route === 'task-detail' ? `/tasks/${taskId ?? ''}` : route === 'dashboard' ? '/dashboard' : `/${route}`}>
            {route === 'dashboard' ? (
              <DashboardPage />
            ) : route === 'tasks' ? (
              <TasksPage />
            ) : route === 'task-detail' ? (
              <TaskDetailPage taskId={taskId ?? ''} />
            ) : route === 'leaderboard' ? (
              <LeaderboardPage />
            ) : route === 'profile' ? (
              <ProfilePage />
            ) : route === 'admin' ? (
              <AdminPage />
            ) : (
              <LoadingState />
            )}
          </WorkspaceShell>
        </ProtectedRoute>
      )}
    </AuthProvider>
  );
}