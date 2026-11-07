import { Download, Trash2, CheckCircle2, Loader2, DownloadCloud } from 'lucide-react';
import { useState } from 'react';
import { OFFLINE_ITEMS } from '@/data/course';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/Button';
import { cn } from '@/utils/cn';

export function OfflinePage() {
  const { getDownloadStatus, download, removeDownload, downloadAll } = useApp();
  const [error, setError] = useState<string | null>(null);

  const run = (action: () => Promise<void>) => {
    setError(null);
    action().catch((err: unknown) =>
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.'),
    );
  };

  const allDownloaded = OFFLINE_ITEMS.every(
    (i) => getDownloadStatus(i.week, i.kind) === 'downloaded',
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <Button as="back" variant="ghost" size="sm" fallback="/">
          Back
        </Button>
      </div>

      <section className="card p-6 bg-gradient-to-br from-white to-brand-50 border-brand-200">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-xl bg-brand-600 text-white flex items-center justify-center">
            <Download className="w-6 h-6" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold heading-dark">Offline Content</h1>
            <p className="text-sm text-brand-600">
              Download lessons &amp; activities to use without internet.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Button
            variant={allDownloaded ? 'secondary' : 'primary'}
            size="md"
            leftIcon={<DownloadCloud className="w-4 h-4" />}
            onClick={() => run(downloadAll)}
            disabled={allDownloaded}
          >
            {allDownloaded ? 'All downloaded' : 'Download All'}
          </Button>
        </div>
      </section>

      {error && (
        <p role="alert" className="card p-4 text-sm text-red-700 border-red-200 bg-red-50">
          {error}
        </p>
      )}

      <section className="space-y-3">
        {OFFLINE_ITEMS.map((item) => {
          const status = getDownloadStatus(item.week, item.kind);
          return (
            <div key={`${item.week}-${item.kind}`} className="card p-4">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center font-bold',
                    item.kind === 'lesson'
                      ? 'bg-brand-100 text-brand-700'
                      : 'bg-amber-100 text-amber-700',
                  )}
                >
                  {item.kind === 'lesson' ? 'L' : 'A'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold heading-dark truncate">{item.label}</p>
                  <StatusBadge status={status} />
                </div>
                <div className="flex items-center gap-2">
                  {status === 'idle' && (
                    <Button
                      size="sm"
                      variant="primary"
                      leftIcon={<Download className="w-4 h-4" />}
                      onClick={() => run(() => download(item.week, item.kind))}
                    >
                      Download
                    </Button>
                  )}
                  {status === 'downloading' && (
                    <span className="inline-flex items-center gap-1.5 text-brand-600 text-sm font-medium">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Downloading
                    </span>
                  )}
                  {status === 'downloaded' && (
                    <>
                      <Button
                        as="link"
                        to={item.href}
                        size="sm"
                        variant="secondary"
                      >
                        Open
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        leftIcon={<Trash2 className="w-4 h-4" />}
                        onClick={() => run(() => removeDownload(item.week, item.kind))}
                      >
                        Remove
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

function StatusBadge({ status }: { status: 'idle' | 'downloading' | 'downloaded' }) {
  if (status === 'downloaded') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-700">
        <CheckCircle2 className="w-3.5 h-3.5" /> Downloaded
      </span>
    );
  }
  if (status === 'downloading') {
    return <span className="text-xs font-medium text-brand-600">Downloading…</span>;
  }
  return <span className="text-xs font-medium text-gray-500">Not downloaded</span>;
}
