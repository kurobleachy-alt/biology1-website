import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SectionShell } from '@/components/SectionShell';
import { SlideViewer, type Slide } from '@/components/SlideViewer';
import { lessonSlidePaths } from '@/data/course';
import { useApp } from '@/context/AppContext';

export function LessonPage() {
  const params = useParams();
  const n = Number(params.week) || 1;
  const { getWeekProgress, setLastSlide } = useApp();
  const lastSlide = getWeekProgress(n).lastSlide;

  const slides = useMemo<Slide[]>(
    () =>
      lessonSlidePaths(n).map((src, i) => ({
        id: src,
        imageSrc: src,
        caption: `Lesson slide ${i + 1}`,
      })),
    [n],
  );

  return (
    <SectionShell weekNumber={n} section="lesson">
      <SlideViewer
        weekNumber={n}
        slides={slides}
        initialSlide={lastSlide}
        onSlideChange={(idx) => setLastSlide(n, idx)}
      />
    </SectionShell>
  );
}
