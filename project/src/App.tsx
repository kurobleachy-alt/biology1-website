import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppProvider } from '@/context/AppContext';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { WeekPage } from '@/pages/WeekPage';
import { LessonPage } from '@/pages/LessonPage';
import { ActivitiesPage } from '@/pages/ActivitiesPage';
import { WaitPage } from '@/pages/WaitPage';
import { FinishPage } from '@/pages/FinishPage';
import { QuizzesPage } from '@/pages/QuizzesPage';
import { OfflinePage } from '@/pages/OfflinePage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="/offline" element={<OfflinePage />} />
            <Route path="/week/:week" element={<WeekPage />} />
            <Route path="/week/:week/pretest" element={<WaitPage section="pretest" title="Pre-Test" />} />
            <Route path="/week/:week/lesson" element={<LessonPage />} />
            <Route path="/week/:week/activities" element={<ActivitiesPage />} />
            <Route path="/week/:week/quizzes" element={<WaitPage section="quizzes" title="Quizzes" />} />
            <Route path="/week/:week/posttest" element={<WaitPage section="posttest" title="Post-Test" />} />
            <Route path="/week/:week/finish" element={<FinishPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
}
