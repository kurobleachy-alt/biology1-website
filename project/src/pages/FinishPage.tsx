import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { PartyPopper } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/Button';

export function FinishPage() {
  const params = useParams();
  const n = Number(params.week) || 1;
  const { completeSection, resetWeek } = useApp();
  const navigate = useNavigate();

  // Mark post-test complete on entry; we already complete on Next press too,
  // but this route is reached after the Post-Test's "Finish Week" button.
  useEffect(() => {
    completeSection(n, 'posttest');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-xl mx-auto card p-8 text-center">
      <div className="mx-auto w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600 mb-4">
        <PartyPopper className="w-8 h-8" />
      </div>
      <h1 className="text-2xl font-extrabold heading-dark">Week {n} Complete!</h1>
      <p className="mt-2 text-brand-600">
        Great job finishing all sections. You can revisit this week anytime from the home page.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Button as="link" to={`/week/${n}`} variant="outline" size="lg">
          Back to Week
        </Button>
        <Button
          as="link"
          to="/"
          variant="primary"
          size="lg"
          onClick={() => {
            /* heading home */
          }}
        >
          Back to Home
        </Button>
      </div>
      <div className="mt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (confirm('Reset all progress for this week?')) {
              resetWeek(n);
              navigate(`/week/${n}`);
            }
          }}
        >
          Reset week progress
        </Button>
      </div>
    </div>
  );
}
