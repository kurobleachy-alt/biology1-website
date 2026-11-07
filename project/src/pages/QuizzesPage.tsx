import { Link } from 'react-router-dom';
import { ChevronRight, HelpCircle, Lock } from 'lucide-react';
import { WEEKS } from '@/data/course';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/Button';

export function QuizzesPage() {
  const { online } = useApp();
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <Button as="back" variant="ghost" size="sm" fallback="/">
          Back
        </Button>
      </div>

      <section className="card p-6">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-xl bg-brand-600 text-white flex items-center justify-center">
            <HelpCircle className="w-6 h-6" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold heading-dark">Quizzes</h1>
            <p className="text-sm text-brand-600">Choose a week to open its quiz.</p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        {WEEKS.map((w) => {
          const disabled = !online; // quizzes not available offline
          return <QuizRow key={w.number} weekNumber={w.number} disabled={disabled} />;
        })}
      </section>
    </div>
  );
}

function QuizRow({ weekNumber, disabled }: { weekNumber: number; disabled: boolean }) {
  if (disabled) {
    return (
      <div className="card p-4 opacity-70">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </span>
          <div className="flex-1">
            <p className="font-semibold text-gray-500">Week {weekNumber} Quiz</p>
            <p className="text-xs text-amber-600 mt-0.5">Download this while online to use offline.</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Link to={`/week/${weekNumber}/quizzes`} className="block">
      <div className="card p-4 hover:shadow-md hover:border-brand-300 transition-all">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
            {weekNumber}
          </span>
          <div className="flex-1">
            <p className="font-semibold heading-dark">Week {weekNumber} Quiz</p>
            <p className="text-xs text-brand-600">Tap to open</p>
          </div>
          <ChevronRight className="w-5 h-5 text-brand-400" />
        </div>
      </div>
    </Link>
  );
}
