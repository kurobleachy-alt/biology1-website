import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, Dna, Download, FlaskConical, HelpCircle, Microscope } from 'lucide-react';
import { WEEKS } from '@/data/course';
import { useApp } from '@/context/AppContext';
import { activitiesCompleted, lessonsCompleted, quizzesCompleted, weekPercent } from '@/hooks/useProgress';
import { WeekButton } from '@/components/WeekButton';
import { ProgressBar } from '@/components/ProgressBar';

export function HomePage() {
  const { progress, online, isDownloaded } = useApp();
  const lessons = lessonsCompleted(progress);
  const activities = activitiesCompleted(progress);
  const quizzes = quizzesCompleted(progress);
  const totalWeeks = WEEKS.length;

  return (
    <div className="space-y-6">
      <section className="card relative overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-brand-600 to-brand-800 text-white border-0">
        <div className="bio-pattern absolute inset-0 opacity-20 pointer-events-none" aria-hidden />
        <div className="relative flex items-start gap-4">
          <span className="hidden sm:flex w-14 h-14 rounded-2xl bg-white/15 items-center justify-center shrink-0 animate-float">
            <Dna className="w-8 h-8" />
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Biology 1 E-Learning
            </h1>
            <p className="mt-1 text-brand-100 max-w-xl">
              Work through each week from Pre-Test to Post-Test. Your progress is saved on your
              device so you can pick up right where you left off.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="card p-5">
        <h2 className="font-bold heading-dark mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-brand-600" />
          Your Progress
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <DashboardBar icon={<BookOpen className="w-4 h-4" />} label="Lessons" done={lessons} total={totalWeeks} />
          <DashboardBar icon={<CheckCircle2 className="w-4 h-4" />} label="Activities" done={activities} total={totalWeeks} />
          <DashboardBar icon={<HelpCircle className="w-4 h-4" />} label="Quizzes" done={quizzes} total={totalWeeks} />
        </div>
      </section>

      {/* Quick actions */}
      <section className="grid sm:grid-cols-2 gap-3">
        <BigAction
          to="/quizzes"
          title="Quizzes"
          desc="Browse quizzes for all weeks"
          icon={<HelpCircle className="w-6 h-6" />}
          disabled={!online}
          disabledReason="Download this while online to use offline."
        />
        <BigAction
          to="/offline"
          title="Offline"
          desc="Download lessons & activities"
          icon={<Download className="w-6 h-6" />}
          accent
        />
      </section>

      {/* Weeks */}
      <section>
        <div className="flex items-end justify-between mb-3">
          <div>
            <h2 className="font-bold heading-dark flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-brand-600" />
              Course Weeks
            </h2>
            <p className="text-xs text-brand-600 mt-0.5">{WEEKS.length} weeks of Biology 1</p>
          </div>
          <Microscope className="w-6 h-6 text-brand-300 hidden sm:block" aria-hidden />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {WEEKS.map((w) => {
            const percent = weekPercent(progress, w.number);
            const lessonReady = online || isDownloaded(w.number, 'lesson');
            const disabled = !online && !lessonReady;
            return (
              <WeekButton
                key={w.number}
                weekNumber={w.number}
                percent={percent}
                disabled={disabled}
                disabledReason={disabled ? 'Download this week while online to use offline.' : undefined}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

function DashboardBar({
  icon,
  label,
  done,
  total,
}: {
  icon: React.ReactNode;
  label: string;
  done: number;
  total: number;
}) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-4">
      <div className="flex items-center gap-2 text-brand-800 font-medium">
        {icon}
        <span>{label}</span>
      </div>
      <p className="text-xs text-brand-600 mt-0.5">
        {done} of {total} {label.toLowerCase()} completed
      </p>
      <div className="mt-2">
        <ProgressBar value={pct} size="sm" />
      </div>
    </div>
  );
}

function BigAction({
  to,
  title,
  desc,
  icon,
  accent,
  disabled,
  disabledReason,
}: {
  to: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  accent?: boolean;
  disabled?: boolean;
  disabledReason?: string;
}) {
  if (disabled) {
    return (
      <div className="card p-5 opacity-60 cursor-not-allowed">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-xl bg-gray-200 text-gray-500 flex items-center justify-center">
            {icon}
          </span>
          <div>
            <p className="font-bold text-gray-500">{title}</p>
            <p className="text-sm text-gray-400">{desc}</p>
          </div>
        </div>
        {disabledReason && <p className="mt-2 text-xs text-amber-600">{disabledReason}</p>}
      </div>
    );
  }
  return (
    <Link to={to} className="block">
      <div
        className={`card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all ${
          accent ? 'border-brand-300 bg-gradient-to-br from-white to-brand-50' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              accent ? 'bg-brand-600 text-white' : 'bg-brand-100 text-brand-700'
            }`}
          >
            {icon}
          </span>
          <div>
            <p className="font-bold heading-dark">{title}</p>
            <p className="text-sm text-brand-600">{desc}</p>
          </div>
        </div>
        {disabledReason && <p className="mt-2 text-xs text-amber-600">{disabledReason}</p>}
      </div>
    </Link>
  );
}
