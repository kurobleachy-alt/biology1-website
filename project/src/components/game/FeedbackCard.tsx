import { ArrowRight, CheckCircle2, Lightbulb } from 'lucide-react';
import { Button } from '@/components/Button';
import { cn } from '@/utils/cn';

interface FeedbackCardProps {
  correct: boolean;
  correctAnswer: string;
  hint: string;
  explanation: string;
  isLast: boolean;
  onContinue: () => void;
}

export function FeedbackCard({ correct, correctAnswer, hint, explanation, isLast, onContinue }: FeedbackCardProps) {
  return (
    <div
      role="status"
      className={cn(
        'anim-fade-up rounded-2xl border p-4 sm:p-5',
        correct ? 'bg-brand-50 border-brand-200' : 'bg-orange-50 border-orange-200',
      )}
    >
      <div className="flex gap-3">
        <span
          className={cn(
            'w-9 h-9 rounded-xl flex items-center justify-center shrink-0',
            correct ? 'bg-brand-600 text-white' : 'bg-orange-400 text-orange-950',
          )}
        >
          {correct ? <CheckCircle2 className="w-5 h-5" /> : <Lightbulb className="w-5 h-5" />}
        </span>
        <div className="min-w-0 flex-1">
          <p className={cn('font-bold', correct ? 'text-brand-800' : 'text-orange-900')}>
            {correct ? 'Nice work, that is right!' : 'Not quite yet, but you are learning.'}
          </p>
          {!correct && (
            <>
              <p className="mt-1 text-sm text-orange-900">Hint: {hint}</p>
              <p className="mt-1 text-sm text-orange-900">
                The correct answer is <span className="font-semibold">{correctAnswer}</span>.
              </p>
            </>
          )}
          <p className={cn('mt-1 text-sm', correct ? 'text-brand-900' : 'text-orange-900')}>{explanation}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          variant="primary"
          size="md"
          onClick={onContinue}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          {isLast ? 'See results' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
