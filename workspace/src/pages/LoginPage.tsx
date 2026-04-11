import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Chrome, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Badge, Panel } from '../components/UI';

export function LoginPage() {
  const { signIn, user, loading, firebaseReady } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } } | undefined)?.from?.pathname ?? '/dashboard';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, user]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-void text-white">
      <div className="noise" />
      <div className="scanlines" />
      <div className="grid-floor opacity-40" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 lg:pt-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-black/40 px-4 py-2 clip-corner">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">Workspace access</span>
            </div>

            <h1 className="font-display text-5xl font-bold leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
              DEVUP
              <span className="block text-stroke-white">WORKSPACE</span>
            </h1>

            <p className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-zinc-400 sm:text-base">
              Internal task, update, and engagement tracking for DevUp members. The interface follows the same visual system as the public site so the workspace feels like part of the same product family.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Badge tone="signal">Google Sign-In</Badge>
              <Badge tone="neutral">Firestore realtime</Badge>
              <Badge tone="neutral">Storage attachments</Badge>
              <Badge tone="neutral">Role-based access</Badge>
            </div>

            {!firebaseReady && (
              <div className="mt-8 max-w-2xl rounded-2xl border border-yellow-900/50 bg-yellow-950/30 p-4 font-mono text-sm text-yellow-300">
                Firebase is not configured yet. Add the <span className="text-white">VITE_FIREBASE_*</span> environment variables to enable sign-in and live data.
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <Panel title="Sign In" subtitle="Google OAuth via Firebase Auth" className="relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal to-transparent opacity-60" />

              <div className="space-y-5">
                <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-signal/30 bg-signal/10 text-signal">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-display text-lg text-white">One account, full workspace access</p>
                      <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">Create profile doc on first login</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={loading || !firebaseReady}
                  onClick={signIn}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-signal px-5 py-4 font-mono text-xs font-bold uppercase tracking-[0.28em] text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 btn-glitch"
                >
                  <Chrome className="h-4 w-4" />
                  Continue with Google
                </button>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Roles</p>
                    <p className="mt-2 font-display text-xl text-white">Admin, Team Lead, Member</p>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Realtime</p>
                    <p className="mt-2 font-display text-xl text-white">Tasks, comments, notifications</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-zinc-900 pt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                  <Sparkles className="h-4 w-4 text-signal" />
                  workspace.devupvjit.in
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}
