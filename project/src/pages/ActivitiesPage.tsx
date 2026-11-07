import { useParams } from 'react-router-dom';
import { SectionShell } from '@/components/SectionShell';

export function ActivitiesPage() {
  const params = useParams();
  const n = Number(params.week) || 1;
  return (
    <SectionShell weekNumber={n} section="activities">
      <div className="card p-8 sm:p-12 text-center">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600 mb-4">
          <span className="text-2xl font-bold">A</span>
        </div>
        <h1 className="text-xl font-bold heading-dark">Activities – Week {n}</h1>
        <p className="mt-2 text-brand-600">Wait for now</p>
        <p className="mt-1 text-sm text-brand-500 max-w-md mx-auto">
          Activities will appear here. Next and Back still work to test the full flow.
        </p>
      </div>
    </SectionShell>
  );
}
