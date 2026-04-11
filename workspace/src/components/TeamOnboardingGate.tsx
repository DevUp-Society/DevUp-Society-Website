import { useMemo, useState } from 'react';
import { collection, limit, orderBy, query } from 'firebase/firestore';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLiveCollection } from '../lib/firestore';
import { db } from '../lib/firebase';
import type { Team } from '../types';
import { assignRole } from '../lib/actions';

export function TeamOnboardingGate() {
  const { profile } = useAuth();
  const [teamId, setTeamId] = useState('');
  const [saving, setSaving] = useState(false);

  const teamsQuery = useMemo(
    () => (firestore: NonNullable<typeof db>) => query(collection(firestore, 'teams'), orderBy('createdAt', 'desc'), limit(50)),
    [],
  );
  const { data: teams = [] } = useLiveCollection<Team>(teamsQuery, []);

  const shouldShow = Boolean(profile && profile.role === 'Member' && !profile.teamId);
  if (!shouldShow) {
    return null;
  }

  const selectedTeam = teams.find((team) => team.id === teamId);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 px-4 py-8 backdrop-blur-sm">
      <div className="glass-panel clip-corner w-full max-w-xl border border-zinc-800 bg-zinc-950/95 p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-signal/40 bg-signal/10 text-signal">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-2xl text-white">Choose Your Team</h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">First-time setup</p>
          </div>
        </div>

        <p className="mb-5 font-mono text-sm leading-relaxed text-zinc-400">
          Select the team you are part of. Your account will be assigned the Member role for that team.
        </p>

        {teams.length ? (
          <>
            <select
              value={teamId}
              onChange={(event) => setTeamId(event.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-black/40 px-4 py-3 font-mono text-sm text-white focus:border-signal focus:outline-none"
            >
              <option value="">Select your team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              disabled={!selectedTeam || saving || !profile}
              onClick={async () => {
                if (!profile || !selectedTeam) return;
                setSaving(true);
                try {
                  await assignRole(profile.id, 'Member', selectedTeam.id, selectedTeam.name);
                } finally {
                  setSaving(false);
                }
              }}
              className="mt-5 w-full rounded-xl bg-signal px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-black btn-glitch disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Continue to Workspace'}
            </button>
          </>
        ) : (
          <div className="rounded-xl border border-yellow-900/50 bg-yellow-950/25 px-4 py-3 font-mono text-sm text-yellow-300">
            No teams are available yet. Ask an Admin to create teams first.
          </div>
        )}
      </div>
    </div>
  );
}