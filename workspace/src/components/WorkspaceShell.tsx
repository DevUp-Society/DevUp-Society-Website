import { useState, type ReactNode } from 'react';
import { Bell, LogOut, Menu, PanelLeftClose, Target } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TeamOnboardingGate } from './TeamOnboardingGate';

const links = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Tasks', to: '/tasks' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Profile', to: '/profile' },
  { label: 'Admin', to: '/admin' },
];

export function WorkspaceShell({ currentPath, children }: { currentPath: string; children: ReactNode; }) {
  const { profile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-void text-white">
      <TeamOnboardingGate />
      <div className="noise" />
      <div className="scanlines" />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-24 left-8 h-72 w-72 rounded-full bg-signal/5 blur-[120px]" />
        <div className="absolute bottom-16 right-8 h-96 w-96 rounded-full bg-white/5 blur-[140px]" />
      </div>

      <header className="fixed left-1/2 top-6 z-50 w-[95%] max-w-7xl -translate-x-1/2 rounded-2xl border border-white/5 bg-[#0a0a0a]/90 px-4 py-3 shadow-xl shadow-black/50 backdrop-blur-md sm:px-5">
        <div className="flex flex-wrap items-center gap-3">
          <a href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center border border-zinc-800 bg-zinc-900/50 p-1.5 clip-corner">
              <div className="flex h-full w-full items-center justify-center border border-signal/30 text-signal">
                <Target className="h-5 w-5" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold tracking-tight text-white">
                DEVUP WORKSPACE <span className="font-mono text-[0.55em] text-signal">VJIT</span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-500">
                Internal Operations Platform
              </span>
            </div>
          </a>

          <button
            type="button"
            className="ml-auto inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-300 transition-colors hover:border-signal/40 hover:text-signal md:hidden"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <PanelLeftClose className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            Menu
          </button>

          <nav className={`w-full ${menuOpen ? 'flex' : 'hidden'} flex-col gap-2 md:ml-4 md:flex md:w-auto md:flex-row md:items-center md:gap-2`}>
            {links.map((link) => {
              const isActive = currentPath === link.to || (link.to === '/tasks' && currentPath.startsWith('/tasks/'));

              return (
              <a
                key={link.to}
                href={link.to}
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-xl border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors ${
                  isActive
                    ? 'border-signal bg-signal/10 text-signal'
                    : 'border-zinc-800 bg-black/30 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {link.label}
              </a>
              );
            })}
          </nav>

          <div className="flex w-full items-center justify-between gap-3 md:ml-auto md:w-auto">
            <div className="hidden items-center gap-2 rounded-xl border border-zinc-800 bg-black/35 px-3 py-2 md:flex">
              <Bell className="h-4 w-4 text-signal" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                Live listeners active
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-black/35 px-3 py-2">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-zinc-800 bg-zinc-900">
                {profile?.photoURL ? (
                  <img src={profile.photoURL} alt={profile.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="font-mono text-[10px] text-zinc-500">{profile?.name?.slice(0, 2).toUpperCase() ?? 'DU'}</span>
                )}
              </div>
              <div className="hidden flex-col leading-none sm:flex">
                <span className="font-display text-sm text-white">{profile?.name ?? 'Workspace Member'}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{profile?.role ?? 'Member'}</span>
              </div>
              <button
                type="button"
                onClick={signOut}
                className="inline-flex h-9 items-center gap-2 rounded-xl border border-zinc-800 bg-black/40 px-3 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400 transition-colors hover:border-signal/40 hover:text-signal"
              >
                <LogOut className="h-4 w-4" />
                Exit
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="relative z-10 border-t border-zinc-900 bg-[#030303]/95 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-l border-zinc-800 pl-4">
          <p className="font-display text-lg text-white">DevUp Workspace</p>
          <p className="max-w-3xl font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Internal tracking for club work, updates, and engagement metrics on workspace.devupvjit.in.
          </p>
        </div>
      </footer>
    </div>
  );
}
