import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { SECTION_ORDER, WEEKS } from '@/data/course';
import { useApp } from '@/context/AppContext';
import { weekPercent } from '@/hooks/useProgress';
import { Button } from '@/components/Button';
import { ProgressBar } from '@/components/ProgressBar';
import { cn } from '@/utils/cn';

export function WeekPage() {
  const params = useParams();
  const n = Number(params.week);
  const week = WEEKS.find((w) => w.number === n);
  const { progress, getWeekCompleted, isUnlocked, online, isDownloaded } = useApp();

  if (!week) {
    return (
      <div className="card p-6 text-center">
        <p className="heading-dark font-bold">Week not found</p>
        <div className="mt-4">
          <Button as="link" to="/" variant="primary">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const percent = weekPercent(progress, n);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <Button as="back" variant="ghost" size="sm" fallback="/" leftIcon={<span aria-hidden>←</span>}>
            Back
          </Button>
        </div>
      </div>

      <section className="card p-6">
        <h1 className="text-2xl font-extrabold heading-dark">{week.title}</h1>
        <p className="text-brand-600 mt-1">{week.subtitle}</p>
        <div className="mt-4">
          <ProgressBar
            value={percent}
            label="Week progress"
            sublabel={`${percent}%`}
          />
        </div>
      </section>

      <section>
        <h2 className="font-bold heading-dark mb-3">Sections</h2>
        <p className="text-sm text-brand-600 mb-3">
          Complete each section in order. Pressing <span className="font-semibold">Next</span> at the
          end of a section marks it complete and unlocks the next one.
        </p>
        <div className="space-y-3">
          {SECTION_ORDER.map((s) => {
            const done = getWeekCompleted(n, s.id);
            const unlocked = isUnlocked(n, s.id);
            // Offline rules: lesson & activities available if downloaded; others disabled when offline.
            const sectionNeedsDownload =
              !online &&
              (s.id === 'lesson' || s.id === 'activities') &&
              !isDownloaded(n, s.id as 'lesson' | 'activities');
            const disabled = !unlocked || (!online && (s.id !== 'lesson' && s.id !== 'activities')) || sectionNeedsDownload;
            return (
              <SectionCard
                key={s.id}
                to={`/week/${n}/${s.path}`}
                label={s.label}
                completed={done}
                unlocked={unlocked}
                disabled={disabled}
                offlineBlocked={!online && s.id !== 'lesson' && s.id !== 'activities'}
                downloadBlocked={sectionNeedsDownload}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

interface SectionCardProps {
  to: string;
  label: string;
  completed: boolean;
  unlocked: boolean;
  disabled: boolean;
  offlineBlocked?: boolean;
  downloadBlocked?: boolean;
}

function SectionCard({
  to,
  label,
  completed,
  unlocked,
  disabled,
  offlineBlocked,
  downloadBlocked,
}: SectionCardProps) {
  const reason = downloadBlocked
    ? 'Download this while online to use offline.'
    : offlineBlocked
      ? 'Not available offline.'
      : !unlocked
        ? 'Complete the previous section to unlock.'
        : undefined;

  if (disabled) {
    return (
      <div className="card p-4 opacity-70">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center',
              completed ? 'bg-brand-100 text-brand-600' : 'bg-gray-100 text-gray-400',
            )}
          >
            {completed ? <CheckCircle2 className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
          </span>
          <div className="flex-1">
            <p className="font-semibold text-gray-500">{label}</p>
            {reason && <p className="text-xs text-amber-600 mt-0.5">{reason}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link to={to} className="block">
      <div className="card p-4 hover:shadow-md hover:border-brand-300 transition-all">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center',
              completed ? 'bg-brand-100 text-brand-600' : 'bg-brand-50 text-brand-700',
            )}
          >
            {completed ? <CheckCircle2 className="w-5 h-5" /> : <span className="font-bold">{label[0]}</span>}
          </span>
          <div className="flex-1">
            <p className="font-semibold heading-dark">{label}</p>
            <p className="text-xs text-brand-600">
              {completed ? 'Completed' : unlocked ? 'Tap to start' : 'Locked'}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-brand-400" />
        </div>
      </div>
    </Link>
  );
}
