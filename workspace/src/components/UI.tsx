import type { ReactNode } from 'react';
import { cn } from './utils';

export function Panel({ title, subtitle, action, children, className = '' }: { title?: string; subtitle?: string; action?: ReactNode; children: ReactNode; className?: string; }) {
  return (
    <section className={cn('glass-panel clip-corner border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6', className)}>
      {(title || subtitle || action) && (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {title && <h2 className="font-display text-xl text-white">{title}</h2>}
            {subtitle && <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatCard({ label, value, helper, tone = 'signal' }: { label: string; value: string | number; helper?: string; tone?: 'signal' | 'white' | 'zinc'; }) {
  const toneClass = tone === 'signal' ? 'text-signal' : tone === 'white' ? 'text-white' : 'text-zinc-400';

  return (
    <div className="glass-panel clip-corner border border-zinc-800 bg-black/35 p-4 sm:p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">{label}</p>
      <div className={`mt-3 font-display text-3xl font-bold ${toneClass}`}>{value}</div>
      {helper && <p className="mt-2 font-mono text-xs text-zinc-400">{helper}</p>}
    </div>
  );
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'signal' | 'danger' | 'success' | 'warning'; }) {
  const palette = {
    neutral: 'border-zinc-800 bg-black/40 text-zinc-300',
    signal: 'border-signal/40 bg-signal/10 text-signal',
    danger: 'border-red-900/50 bg-red-950/30 text-red-400',
    success: 'border-green-900/50 bg-green-950/30 text-green-400',
    warning: 'border-yellow-900/50 bg-yellow-950/30 text-yellow-400',
  }[tone];

  return <span className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] ${palette}`}>{children}</span>;
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode; }) {
  return (
    <div className="glass-panel clip-corner border border-zinc-800 bg-black/30 p-8 text-center">
      <h3 className="font-display text-2xl text-white">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl font-mono text-sm leading-relaxed text-zinc-400">{description}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}

export function LineItem({ label, value }: { label: string; value: string; }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-zinc-900 py-3 last:border-0">
      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">{label}</span>
      <span className="font-mono text-sm text-white">{value}</span>
    </div>
  );
}
