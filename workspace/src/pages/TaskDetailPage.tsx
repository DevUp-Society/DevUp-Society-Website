import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, limit, orderBy, query, where } from 'firebase/firestore';
import { Paperclip, Send, PlayCircle, ShieldAlert, CheckCircle2, Clock3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLiveCollection, useLiveDocument } from '../lib/firestore';
import { db } from '../lib/firebase';
import type { CommentItem, TaskItem, UpdateItem } from '../types';
import { Badge, EmptyState, Panel, LineItem } from '../components/UI';
import { approveTask, claimTask, markBlocked, postComment, postUpdate, startTask, submitTaskForReview, updateTaskStatus } from '../lib/actions';
import { formatRelativeTime, timestampToDate } from '../lib/firestore';

function formatDate(value: unknown) {
  const date = timestampToDate(value);
  if (!date) return 'n/a';
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

export function TaskDetailPage() {
  const { id } = useParams();
  const { profile } = useAuth();
  const [updateText, setUpdateText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [blockedReason, setBlockedReason] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);

  const task = useLiveDocument<TaskItem>('tasks', id, null);
  const updatesQuery = useMemo(() => {
    if (!id) return null;
    return (firestore: NonNullable<typeof db>) => query(collection(firestore, 'updates'), where('taskId', '==', id), orderBy('createdAt', 'desc'), limit(20));
  }, [id]);
  const commentsQuery = useMemo(() => {
    if (!id) return null;
    return (firestore: NonNullable<typeof db>) => query(collection(firestore, 'comments'), where('taskId', '==', id), orderBy('createdAt', 'desc'), limit(20));
  }, [id]);

  const { data: updates = [] } = useLiveCollection<UpdateItem>(updatesQuery ?? (() => null), []);
  const { data: comments = [] } = useLiveCollection<CommentItem>(commentsQuery ?? (() => null), []);

  const isLead = profile?.role === 'Admin' || profile?.role === 'Team Lead';
  const isOwner = task.data?.assigneeId === profile?.id;
  const canAct = isLead || isOwner;

  if (task.loading) {
    return <div className="glass-panel clip-corner border border-zinc-800 px-6 py-8 font-mono text-sm uppercase tracking-[0.25em] text-zinc-400">Loading task...</div>;
  }

  if (!task.data) {
    return <EmptyState title="Task not found" description="The requested task may have been removed or you may not have access to it." />;
  }

  const currentTask = task.data;

  const timeline = [
    ...updates.map((entry) => ({ id: entry.id, label: 'Update', text: entry.text, author: entry.userName, time: entry.createdAt })),
    ...comments.map((entry) => ({ id: entry.id, label: 'Comment', text: entry.text, author: entry.userName, time: entry.createdAt })),
  ].sort((left, right) => {
    const leftTime = timestampToDate(left.time)?.getTime() ?? 0;
    const rightTime = timestampToDate(right.time)?.getTime() ?? 0;
    return rightTime - leftTime;
  });

  async function handleComplete() {
    if (!profile) return;
    if (isLead) {
      await approveTask(currentTask.id, currentTask.points, currentTask.assigneeId || profile.id);
      return;
    }

    if (currentTask.reviewRequired) {
      await submitTaskForReview(currentTask.id);
    } else {
      await updateTaskStatus(currentTask.id, 'Completed');
    }
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <section className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <Panel title={currentTask.title} subtitle={`${currentTask.teamName} • ${currentTask.type}`} action={<Badge tone={currentTask.status === 'Completed' ? 'success' : currentTask.status === 'Blocked' ? 'danger' : currentTask.status === 'Review' ? 'warning' : 'neutral'}>{currentTask.status}</Badge>}>
            <p className="max-w-4xl font-mono text-sm leading-relaxed text-zinc-400">{currentTask.description}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <LineItem label="Assignee" value={currentTask.assigneeName || 'Unassigned'} />
              <LineItem label="Priority" value={currentTask.priority} />
              <LineItem label="Deadline" value={formatDate(currentTask.deadline)} />
              <LineItem label="Points" value={`${currentTask.points}`} />
            </div>
          </Panel>

          <Panel title="Timeline" subtitle="Activity and comments">
            <div className="space-y-3">
              {timeline.length ? timeline.map((entry) => (
                <div key={entry.id} className="rounded-2xl border border-zinc-800 bg-black/30 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Badge tone={entry.label === 'Update' ? 'signal' : 'neutral'}>{entry.label}</Badge>
                      <span className="font-display text-white">{entry.author}</span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">{formatRelativeTime(entry.time)}</span>
                  </div>
                  <p className="mt-2 font-mono text-sm leading-relaxed text-zinc-400">{entry.text}</p>
                </div>
              )) : <EmptyState title="No activity yet" description="Post an update or comment to create the first timeline entry." />}
            </div>
          </Panel>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Panel title="Actions" subtitle="Workflow controls" action={<Clock3 className="h-4 w-4 text-signal" />}>
            <div className="space-y-3">
              <button type="button" disabled={!canAct} onClick={() => startTask(currentTask.id)} className="w-full rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-300 transition-colors hover:border-signal hover:text-signal disabled:cursor-not-allowed disabled:opacity-50">Start task</button>
              <button type="button" disabled={!canAct} onClick={() => markBlocked(currentTask.id, blockedReason || 'Blocked by dependency')} className="w-full rounded-xl border border-red-900/50 bg-red-950/20 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-red-300 transition-colors hover:border-red-700 disabled:cursor-not-allowed disabled:opacity-50">Mark blocked</button>
              <button type="button" disabled={!canAct} onClick={handleComplete} className="w-full rounded-xl bg-signal px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-black btn-glitch disabled:cursor-not-allowed disabled:opacity-50">{currentTask.reviewRequired && !isLead ? 'Submit for review' : 'Complete task'}</button>
              <button type="button" disabled={!canAct || !profile} onClick={async () => { if (!profile) return; await claimTask(currentTask.id, profile.id, profile.name, profile.teamId, profile.teamName); }} className="w-full rounded-xl border border-signal/40 bg-signal/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-signal transition-colors hover:bg-signal/20 disabled:cursor-not-allowed disabled:opacity-50">Pick task</button>
            </div>
          </Panel>

          <Panel title="Task Meta" subtitle="Operational details">
            <div className="space-y-2 font-mono text-sm text-zinc-400">
              <LineItem label="Created by" value={currentTask.createdByName} />
              <LineItem label="Mode" value={currentTask.mode} />
              <LineItem label="Review required" value={currentTask.reviewRequired ? 'Yes' : 'No'} />
              <LineItem label="Updated" value={formatRelativeTime(currentTask.updatedAt)} />
            </div>
          </Panel>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Panel title="Post Update" subtitle="Progress note with optional attachment">
          <div className="space-y-4">
            <textarea value={updateText} onChange={(event) => setUpdateText(event.target.value)} placeholder="What changed? Link context, blockers, or progress summary." className="min-h-32 w-full rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-signal focus:outline-none" />
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
              <Paperclip className="h-4 w-4 text-signal" />
              <input type="file" onChange={(event) => setAttachment(event.target.files?.[0] ?? null)} className="hidden" />
              {attachment ? attachment.name : 'Attach image or file'}
            </label>
            <button type="button" disabled={!updateText || !profile} onClick={async () => { if (!profile) return; await postUpdate(currentTask.id, profile.id, profile.name, updateText, attachment); setUpdateText(''); setAttachment(null); }} className="rounded-xl bg-signal px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-black btn-glitch disabled:cursor-not-allowed disabled:opacity-50">
              Add update
            </button>
          </div>
        </Panel>

        <Panel title="Comments" subtitle="Threaded task discussion">
          <div className="space-y-4">
            <textarea value={commentText} onChange={(event) => setCommentText(event.target.value)} placeholder="Write a comment and mention teammates with @name." className="min-h-32 w-full rounded-xl border border-zinc-800 bg-black/30 px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-signal focus:outline-none" />
            <button type="button" disabled={!commentText || !profile} onClick={async () => { if (!profile) return; await postComment(currentTask.id, profile.id, profile.name, commentText); setCommentText(''); }} className="rounded-xl border border-zinc-800 bg-black/30 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-300 transition-colors hover:border-signal hover:text-signal disabled:cursor-not-allowed disabled:opacity-50">
              Add comment
            </button>
          </div>
        </Panel>
      </section>

      {!timeline.length && <EmptyState title="Timeline pending" description="Use updates, comments, and task transitions to build a visible execution history." />}
    </div>
  );
}
