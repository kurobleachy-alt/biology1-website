import { cn } from '@/utils/cn';

interface ProgressBarProps {
  value: number; // 0..100
  label?: string;
  sublabel?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function ProgressBar({ value, label, sublabel, size = 'md', className }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={cn('w-full', className)}>
      {(label || sublabel) && (
        <div className="flex items-center justify-between mb-1">
          {label && <span className="text-sm font-medium text-brand-800">{label}</span>}
          {sublabel && <span className="text-xs text-brand-600">{sublabel}</span>}
        </div>
      )}
      <div
        className={cn(
          'w-full bg-brand-100 rounded-full overflow-hidden',
          size === 'sm' ? 'h-1.5' : 'h-2.5',
        )}
      >
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-brand-700 rounded-full transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
