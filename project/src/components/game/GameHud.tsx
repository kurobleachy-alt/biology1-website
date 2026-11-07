import { Flame, Trophy } from 'lucide-react';
import { ProgressBar } from '@/components/ProgressBar';
import { rankFor } from '@/game/scoring';
import { cn } from '@/utils/cn';

export function GameHud({ xp, streak }: { xp: number; streak: number }) {
  const rank = rankFor(xp);
  const pct = rank.nextXp === null ? 100 : ((xp - rank.floorXp) / (rank.nextXp - rank.floorXp)) * 100;

  return (
    <div className="card p-4 flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0">
          <Trophy className="w-5 h-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{rank.title}</p>
          <p key={xp} className="anim-pop inline-block font-extrabold text-brand-900 tabular-nums">
            {xp} XP
          </p>
          <div className="mt-1 w-full max-w-[200px]">
            <ProgressBar value={pct} size="sm" />
          </div>
        </div>
      </div>
      <div
        className={cn(
          'flex items-center gap-2 rounded-xl px-3 py-2',
          streak > 0 ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600',
        )}
        aria-label={`Current streak ${streak}`}
      >
        <Flame className={cn('w-5 h-5', streak > 0 && 'anim-flame text-amber-500')} />
        <span className="font-bold tabular-nums">{streak}</span>
        <span className="text-xs font-medium">streak</span>
      </div>
    </div>
  );
}
