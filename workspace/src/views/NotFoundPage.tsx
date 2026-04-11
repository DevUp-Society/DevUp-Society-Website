import { ArrowLeft } from 'lucide-react';
import { EmptyState } from '../components/UI';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <EmptyState
        title="Route not found"
        description="The workspace route does not exist. Return to the dashboard to continue."
        action={
          <a href="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-signal px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-black btn-glitch">
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </a>
        }
      />
    </div>
  );
}
