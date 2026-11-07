import { useParams } from 'react-router-dom';
import { Hourglass } from 'lucide-react';
import { SectionShell } from '@/components/SectionShell';

export function WaitPage({ section, title }: { section: 'pretest' | 'activities' | 'quizzes' | 'posttest'; title: string }) {
  const params = useParams();
  const n = Number(params.week) || 1;
  return (
    <SectionShell weekNumber={n} section={section}>
      <div className="card p-8 sm:p-12 text-center">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600 mb-4">
          <Hourglass className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold heading-dark">{title}</h1>
        <p className="mt-2 text-brand-600">Wait for now</p>
        <p className="mt-1 text-sm text-brand-500 max-w-md mx-auto">
          This section will be available soon. You can still use Next and Back to move through the flow.
        </p>
      </div>
    </SectionShell>
  );
}
