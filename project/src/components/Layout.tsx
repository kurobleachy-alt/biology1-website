import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Microscope, WifiOff } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function Layout({ children }: { children: ReactNode }) {
  const { online } = useApp();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 bg-brand-700 text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
              <Microscope className="w-5 h-5" />
            </span>
            <div className="leading-tight">
              <p className="font-extrabold tracking-tight">Biology 1</p>
              <p className="text-[11px] text-brand-100 -mt-0.5">E-Learning</p>
            </div>
          </Link>
          <nav className="ml-auto flex items-center gap-1 text-sm">
            <HeaderLink to="/" label="Home" />
            <HeaderLink to="/quizzes" label="Quizzes" />
            <HeaderLink to="/offline" label="Offline" />
          </nav>
        </div>
      </header>

      {!online && (
        <div className="bg-brand-600 text-white text-center text-sm py-2 px-4 flex items-center justify-center gap-2">
          <WifiOff className="w-4 h-4" />
          You are offline — only downloaded content is available.
        </div>
      )}

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 fade-enter">{children}</div>
      </main>

      <footer className="border-t border-brand-100 bg-white/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 text-xs text-brand-700 text-center">
          Biology 1 E-Learning · Progress saved on this device
        </div>
      </footer>
    </div>
  );
}

function HeaderLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="px-3 py-1.5 rounded-lg hover:bg-white/15 transition-colors font-medium"
    >
      {label}
    </Link>
  );
}
