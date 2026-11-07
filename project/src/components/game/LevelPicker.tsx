import { DIFFICULTY_META, DIFFICULTIES, type Difficulty } from '@/game/types';
import { DIFFICULTY_XP } from '@/game/scoring';
import type { LevelRecord } from '@/hooks/useGameStore';
import { Dna, Leaf, Microscope } from 'lucide-react';
import { cn } from '@/utils/cn';

const ICONS: Record<Difficulty, typeof Leaf> = { easy: Leaf, medium: Microscope, hard: Dna };

interface LevelPickerProps {
  records: Partial<Record<Difficulty, LevelRecord>>;
  counts: Record<Difficulty, number>;
  onPick: (difficulty: Difficulty) => void;
}

export function LevelPicker({ records, counts, onPick }: LevelPickerProps) {
  return (
    <section className="space-y-3">
      <h2 className="font-bold heading-dark">Choose your level</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {DIFFICULTIES.map((d) => {
          const Icon = ICONS[d];
          const record = records[d];
          return (
            <button
              key={d}
              type="button"
              onClick={() => onPick(d)}
              className={cn(
                'card text-left p-5 min-h-[150px] flex flex-col gap-3 transition-all duration-200',
                'hover:-translate-y-0.5 hover:shadow-md hover:border-brand-300 active:scale-[0.98]',
                'focus-ring',
              )}
            >
              <div className="flex items-center justify-between">
                <span className="w-11 h-11 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </span>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
                  +{DIFFICULTY_XP[d]} XP each
                </span>
              </div>
              <div>
                <p className="font-bold text-lg heading-dark">{DIFFICULTY_META[d].label}</p>
                <p className="text-sm text-brand-700">{DIFFICULTY_META[d].blurb}</p>
              </div>
              <p className="mt-auto text-xs font-medium text-brand-600">
                {record
                  ? `Best: ${record.bestCorrect} of ${record.total} correct`
                  : `${counts[d]} questions, not tried yet`}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
