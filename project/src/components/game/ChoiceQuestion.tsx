import type { Question } from '@/game/types';
import { cn } from '@/utils/cn';

export interface AnswerState {
  choice: number;
  correct: boolean;
}

interface ChoiceQuestionProps {
  question: Question;
  answered: AnswerState | null;
  onAnswer: (choice: number) => void;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export function ChoiceQuestion({ question, answered, onAnswer }: ChoiceQuestionProps) {
  return (
    <div className="space-y-4">
      <p className="text-lg sm:text-xl font-bold heading-dark pr-2">{question.prompt}</p>
      <div className="grid gap-3">
        {question.options.map((option, i) => {
          const isAnswer = i === question.answer;
          const isPicked = answered?.choice === i;
          return (
            <button
              key={option}
              type="button"
              disabled={!!answered}
              onClick={() => onAnswer(i)}
              className={cn(
                'min-h-[56px] rounded-xl border-2 px-4 py-3 text-left font-semibold flex items-center gap-3 transition-all',
                'focus-ring disabled:cursor-default',
                !answered && 'bg-white border-brand-200 text-brand-900 hover:border-brand-400 hover:bg-brand-50 active:scale-[0.99]',
                answered && isAnswer && 'bg-brand-100 border-brand-500 text-brand-900',
                answered && isPicked && !isAnswer && 'bg-orange-50 border-orange-300 text-orange-900',
                answered && !isPicked && !isAnswer && 'bg-white border-gray-200 text-gray-500',
              )}
            >
              <span
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0',
                  answered && isAnswer ? 'bg-brand-600 text-white' : 'bg-brand-100 text-brand-800',
                )}
              >
                {LETTERS[i] ?? i + 1}
              </span>
              <span className="min-w-0">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
