import { Sparkles } from 'lucide-react';

export interface XpPop {
  id: number;
  amount: number;
  bonus: number;
}

export function XpPopup({ pop }: { pop: XpPop | null }) {
  if (!pop) return null;
  return (
    <div className="pointer-events-none absolute inset-x-0 top-3 flex flex-col items-center gap-1" aria-live="polite">
      <span key={`xp-${pop.id}`} className="anim-xp-rise font-extrabold text-lg text-brand-700">
        +{pop.amount} XP
      </span>
      {pop.bonus > 0 && (
        <span
          key={`bonus-${pop.id}`}
          className="anim-bonus inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-sm font-bold text-amber-950 shadow"
        >
          <Sparkles className="w-4 h-4" />
          Streak bonus +{pop.bonus} XP!
        </span>
      )}
    </div>
  );
}
