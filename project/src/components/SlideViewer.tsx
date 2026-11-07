import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/utils/cn';

export interface Slide {
  id: string;
  // Later: image URL or PDF page URL. Rendered into the placeholder area.
  imageSrc?: string;
  caption?: string;
}

interface SlideViewerProps {
  weekNumber: number;
  slides?: Slide[];
  initialSlide?: number;
  onSlideChange?: (index: number) => void;
}

export function SlideViewer({
  weekNumber,
  slides = [],
  initialSlide = 0,
  onSlideChange,
}: SlideViewerProps) {
  const [current, setCurrent] = useState(initialSlide);

  // For now there are no slides uploaded yet — show the placeholder.
  const hasSlides = slides.length > 0;
  const total = hasSlides ? slides.length : 0;
  const index = hasSlides ? Math.min(current, total - 1) : 0;

  function go(delta: number) {
    if (!hasSlides) return;
    const next = Math.max(0, Math.min(total - 1, index + delta));
    setCurrent(next);
    onSlideChange?.(next);
  }

  return (
    <div className="card p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold heading-dark">
          Lesson – Week {weekNumber}
        </h2>
        {hasSlides && (
          <span className="text-sm font-medium text-brand-700">
            Slide {index + 1} / {total}
          </span>
        )}
      </div>

      <div
        className={cn(
          'relative w-full rounded-xl border-2 border-dashed border-brand-200 bg-brand-50 flex items-center justify-center',
          hasSlides ? 'min-h-[260px] sm:min-h-[360px]' : 'min-h-[260px] sm:min-h-[360px]',
        )}
      >
        {hasSlides ? (
          slides[index].imageSrc ? (
            <img
              src={slides[index].imageSrc}
              alt={slides[index].caption ?? `Slide ${index + 1}`}
              className="w-full max-h-[70vh] object-contain rounded-xl"
            />
          ) : (
            <div className="text-center px-6">
              <p className="text-brand-700 font-medium">
                Slide {index + 1} placeholder
              </p>
              {slides[index].caption && (
                <p className="text-sm text-brand-600 mt-1">{slides[index].caption}</p>
              )}
            </div>
          )
        ) : (
          <div className="text-center px-6 py-10">
            <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold">
              ◇
            </div>
            <p className="font-semibold text-brand-800">No slides uploaded yet</p>
            <p className="text-sm text-brand-600 mt-1 max-w-sm mx-auto">
              Slides will appear here once uploaded. Use Previous / Next to move between slides.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 mt-4">
        <Button
          variant="outline"
          size="md"
          leftIcon={<ChevronLeft className="w-4 h-4" />}
          disabled={!hasSlides || index === 0}
          onClick={() => go(-1)}
        >
          Previous
        </Button>
        <span className="text-sm text-brand-600 font-medium">
          {hasSlides ? `${index + 1} / ${total}` : '0 / 0'}
        </span>
        <Button
          variant="outline"
          size="md"
          rightIcon={<ChevronRight className="w-4 h-4" />}
          disabled={!hasSlides || index === total - 1}
          onClick={() => go(1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
