import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { cn } from '@/utils/cn';

interface WeekButtonProps {
  weekNumber: number;
  percent: number;
  disabled?: boolean;
  disabledReason?: string;
}

export function WeekButton({ weekNumber, percent, disabled, disabledReason }: WeekButtonProps) {
  const content = (
    <div
      className={cn(
        'group relative w-full text-left p-4 rounded-2xl border transition-all',
        disabled
          ? 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
          : 'bg-white border-brand-100 shadow-sm hover:shadow-md hover:border-brand-300 hover:-translate-y-0.5',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex items-center justify-center w-11 h-11 rounded-xl font-bold text-lg',
              disabled ? 'bg-gray-200 text-gray-500' : 'bg-brand-600 text-white',
            )}
          >
            {weekNumber}
          </div>
          <div>
            <p className={cn('font-semibold', disabled ? 'text-gray-500' : 'text-brand-900')}>
              Week {weekNumber}
            </p>
            <p className={cn('text-xs', disabled ? 'text-gray-400' : 'text-brand-600')}>
              {percent}% complete
            </p>
          </div>
        </div>
        {!disabled && (
          <ChevronRight className="w-5 h-5 text-brand-400 group-hover:translate-x-0.5 transition-transform" />
        )}
      </div>
      <div className="mt-3">
        <ProgressBar value={percent} size="sm" />
      </div>
      {disabled && disabledReason && (
        <p className="mt-2 text-xs text-amber-700">{disabledReason}</p>
      )}
    </div>
  );

  if (disabled) return <div aria-disabled>{content}</div>;
  return <Link to={`/week/${weekNumber}`} className="block">{content}</Link>;
}
