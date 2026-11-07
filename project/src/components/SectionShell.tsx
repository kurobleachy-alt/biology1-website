import type { ReactNode } from 'react';
import { Button } from './Button';
import { sectionMeta, nextSection, type SectionId } from '@/data/course';
import { useApp } from '@/context/AppContext';

interface SectionShellProps {
  weekNumber: number;
  section: SectionId;
  children: ReactNode;
  /** Override Next behavior (e.g., lesson slides save). When false, Next still completes+advances. */
  onNext?: () => void;
  /** Final section button label */
  finishLabel?: string;
}

export function SectionShell({ weekNumber, section, children, onNext, finishLabel }: SectionShellProps) {
  const { completeSection } = useApp();
  const meta = sectionMeta(section);
  const next = nextSection(section);
  const isLast = !next;

  const handleNext = () => {
    completeSection(weekNumber, section);
    onNext?.();
  };

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-3">
        <Button as="back" variant="ghost" size="sm" fallback={`/week/${weekNumber}`}>
          Back
        </Button>
        <span className="text-sm font-medium text-brand-700">
          Week {weekNumber} · {meta.label}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <SectionPip id="pretest" week={weekNumber} />
        <SectionPip id="lesson" week={weekNumber} />
        <SectionPip id="activities" week={weekNumber} />
        <SectionPip id="quizzes" week={weekNumber} />
        <SectionPip id="posttest" week={weekNumber} />
      </div>

      {children}

      <div className="flex items-center justify-between gap-3 pt-2">
        <Button as="back" variant="outline" fallback={`/week/${weekNumber}`}>
          Back
        </Button>
        {isLast ? (
          <Button
            as="link"
            to={`/week/${weekNumber}/finish`}
            variant="primary"
            size="lg"
            rightIcon={<span aria-hidden>✓</span>}
            onClick={handleNext}
          >
            {finishLabel ?? 'Finish Week'}
          </Button>
        ) : (
          <Button
            as="link"
            to={`/week/${weekNumber}/${next!.path}`}
            variant="primary"
            size="lg"
            rightIcon={<span aria-hidden>→</span>}
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

function SectionPip({ id, week }: { id: SectionId; week: number }) {
  const { getWeekCompleted, isUnlocked } = useApp();
  const done = getWeekCompleted(week, id);
  const unlocked = isUnlocked(week, id);
  return (
    <div
      className={`h-1.5 flex-1 rounded-full ${
        done ? 'bg-brand-500' : unlocked ? 'bg-brand-200' : 'bg-gray-200'
      }`}
      title={sectionMeta(id).label}
    />
  );
}
