import { ArrowRight, Calendar, CircleDotDashed, Gauge, Tag } from 'lucide-react';
import type { ReactNode } from 'react';
import type { TaskItem } from '../types';
import { Badge } from './UI';
import { formatRelativeTime } from '../lib/firestore';

export function TaskCard({ task, children }: { task: TaskItem; children?: ReactNode; }) {
  return (
    <article className="group glass-panel clip-corner border border-zinc-800 bg-black/35 p-5 transition-transform duration-300 hover:-translate-y-0.5 hover:border-signal/40">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge tone={task.status === 'Completed' ? 'success' : task.status === 'Blocked' ? 'danger' : task.status === 'Review' ? 'warning' : 'neutral'}>
              {task.status}
            </Badge>
            <Badge tone={task.mode === 'Open' ? 'signal' : 'neutral'}>{task.mode}</Badge>
          </div>
          <h3 className="font-display text-2xl text-white transition-colors group-hover:text-signal">{task.title}</h3>
          <p className="mt-2 max-w-2xl font-mono text-sm leading-relaxed text-zinc-400">{task.description}</p>
        </div>
        <a href={`/tasks/${task.id}`} className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-300 transition-colors hover:border-signal hover:text-signal">
          Open
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-zinc-900 bg-black/30 p-3">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500"><Gauge className="h-3.5 w-3.5 text-signal" /> Priority</div>
          <p className="mt-2 font-display text-lg text-white">{task.priority}</p>
        </div>
        <div className="rounded-xl border border-zinc-900 bg-black/30 p-3">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500"><Calendar className="h-3.5 w-3.5 text-signal" /> Deadline</div>
          <p className="mt-2 font-display text-lg text-white">{task.deadline}</p>
        </div>
        <div className="rounded-xl border border-zinc-900 bg-black/30 p-3">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500"><Tag className="h-3.5 w-3.5 text-signal" /> Team</div>
          <p className="mt-2 font-display text-lg text-white">{task.teamName}</p>
        </div>
        <div className="rounded-xl border border-zinc-900 bg-black/30 p-3">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500"><CircleDotDashed className="h-3.5 w-3.5 text-signal" /> Points</div>
          <p className="mt-2 font-display text-lg text-white">{task.points}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-900 pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
        <span>Assigned to {task.assigneeName || 'Unassigned'}</span>
        <span>Updated {formatRelativeTime(task.updatedAt)}</span>
      </div>

      {children && <div className="mt-4">{children}</div>}
    </article>
  );
}
