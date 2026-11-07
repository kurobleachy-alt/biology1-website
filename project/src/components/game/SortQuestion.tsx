import { useState, type PointerEvent as ReactPointerEvent } from 'react';
import { Hand } from 'lucide-react';
import type { Question } from '@/game/types';
import type { AnswerState } from '@/components/game/ChoiceQuestion';
import { cn } from '@/utils/cn';

interface SortQuestionProps {
  question: Question;
  answered: AnswerState | null;
  onAnswer: (zone: number) => void;
}

interface DragState {
  x: number;
  y: number;
  startX: number;
  startY: number;
  moved: boolean;
}

const DRAG_THRESHOLD_PX = 8;

function zoneAt(x: number, y: number): number | null {
  const el = document.elementFromPoint(x, y);
  const zone = el?.closest<HTMLElement>('[data-zone]');
  return zone ? Number(zone.dataset.zone) : null;
}

export function SortQuestion({ question, answered, onAnswer }: SortQuestionProps) {
  const [drag, setDrag] = useState<DragState | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [armed, setArmed] = useState(false);

  const handleDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (answered) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrag({ x: e.clientX, y: e.clientY, startX: e.clientX, startY: e.clientY, moved: false });
  };

  const handleMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!drag) return;
    const moved =
      drag.moved || Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > DRAG_THRESHOLD_PX;
    setDrag({ ...drag, x: e.clientX, y: e.clientY, moved });
    setHover(moved ? zoneAt(e.clientX, e.clientY) : null);
  };

  const handleUp = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!drag) return;
    const dropZone = drag.moved ? zoneAt(e.clientX, e.clientY) : null;
    const wasTap = !drag.moved;
    setDrag(null);
    setHover(null);
    if (wasTap) {
      setArmed((a) => !a);
      return;
    }
    if (dropZone !== null) {
      setArmed(false);
      onAnswer(dropZone);
    }
  };

  const handleZoneClick = (index: number) => {
    if (answered || !armed) return;
    setArmed(false);
    onAnswer(index);
  };

  const cancelDrag = () => {
    setDrag(null);
    setHover(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-sm text-brand-700">
        <Hand className="w-4 h-4" />
        <span>Drag the part to its job, or tap it and then tap the matching box.</span>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          disabled={!!answered}
          onPointerDown={handleDown}
          onPointerMove={handleMove}
          onPointerUp={handleUp}
          onPointerCancel={cancelDrag}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !answered) {
              e.preventDefault();
              setArmed((a) => !a);
            }
          }}
          aria-pressed={armed}
          className={cn(
            'touch-none select-none rounded-2xl px-6 py-4 min-h-[64px] text-lg font-extrabold shadow-md',
            'focus-ring transition-transform',
            answered ? 'bg-gray-200 text-gray-600 cursor-default' : 'bg-brand-600 text-white cursor-grab active:cursor-grabbing',
            armed && !answered && 'ring-4 ring-amber-300',
            drag?.moved && 'opacity-40',
          )}
        >
          {question.prompt}
        </button>
      </div>

      {drag?.moved && (
        <div
          className="pointer-events-none fixed left-0 top-0 z-50 rounded-2xl bg-brand-700 px-6 py-4 text-lg font-extrabold text-white shadow-xl"
          style={{ transform: `translate(${drag.x}px, ${drag.y}px) translate(-50%, -50%)` }}
        >
          {question.prompt}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {question.options.map((option, i) => {
          const isAnswer = i === question.answer;
          const isPicked = answered?.choice === i;
          const isHover = hover === i;
          return (
            <button
              key={option}
              type="button"
              data-zone={i}
              disabled={!!answered}
              onClick={() => handleZoneClick(i)}
              className={cn(
                'min-h-[72px] rounded-2xl border-2 p-4 text-left font-semibold transition-all',
                'focus-ring disabled:cursor-default',
                !answered && !isHover && 'bg-white border-dashed border-brand-300 text-brand-900',
                !answered && armed && !isHover && 'border-amber-400 bg-amber-50',
                !answered && isHover && 'bg-brand-100 border-brand-500 scale-[1.02] text-brand-900',
                answered && isAnswer && 'bg-brand-100 border-brand-500 border-solid text-brand-900',
                answered && isPicked && !isAnswer && 'bg-orange-50 border-orange-300 border-solid text-orange-900',
                answered && !isPicked && !isAnswer && 'bg-white border-gray-200 border-solid text-gray-500',
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
