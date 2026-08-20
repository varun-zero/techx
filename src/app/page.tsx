'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import ExpeditionDossier from '@/components/ExpeditionDossier';

export default function WelcomePage() {
  const router = useRouter();
  const { user, logout, isLoading } = useUser();

  // Auto-redirect if user is already logged in
  useEffect(() => {
    if (!isLoading && user) {
      const userFeedbackKey = `submittedFeedback_${user.email}`;
      const submittedFeedback = JSON.parse(localStorage.getItem(userFeedbackKey) || '[]');
      const hasCompleted = submittedFeedback.length >= 25;

      if (hasCompleted) {
        router.push('/finish');
      } else {
        router.push('/labs');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <main style={{ padding: '2rem', textAlign: 'center', color: '#f4ecd8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'var(--font-minecraft)', fontSize: '1.25rem' }}>
          <p>LOADING EXPEDITION DOSSIER...</p>
        </div>
      </main>
    );
  }

  // Show welcome back card if user is already logged in
  if (user) {
    return (
      <main className="p-4 max-w-md mx-auto text-center min-h-screen flex flex-col justify-center select-none font-serif">
        <div
          style={{
            backgroundImage: `url('/assets/images/torn-card-bg.png')`,
            backgroundSize: '100% 100%',
          }}
          className="relative w-full p-8 sm:p-10 drop-shadow-[0_12px_30px_rgba(0,0,0,0.9)] text-[#2b1704]"
        >
          <div className="text-[10px] tracking-[3px] text-[#7a481c] font-bold font-mono uppercase mb-1">
            ACTIVE EXPEDITION SESSION
          </div>
          <h1 className="text-2xl sm:text-3xl text-[#241308] font-bold font-['Cinzel',_serif] my-1">
            WELCOME BACK
          </h1>
          <p className="text-xs text-[#543d2b] font-serif italic mb-6">
            Explorer: <strong>{user.name}</strong> ({user.email})<br />
            Guild Sector: <strong>{user.department}</strong>
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                const userFeedbackKey = `submittedFeedback_${user.email}`;
                const submittedFeedback = JSON.parse(localStorage.getItem(userFeedbackKey) || '[]');
                const hasCompleted = submittedFeedback.length >= 25;
                if (hasCompleted) {
                  router.push('/finish');
                } else {
                  router.push('/labs');
                }
              }}
              style={{
                clipPath:
                  'polygon(6px 0%, calc(100% - 6px) 0%, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0% calc(100% - 6px), 0% 6px)',
              }}
              className="w-full py-3 px-4 bg-gradient-to-b from-[#d4af37] via-[#b38920] to-[#7a5214] text-[#140802] font-bold text-xs uppercase tracking-widest shadow-md transition hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2 font-['Cinzel',_serif] cursor-pointer"
            >
              <span>CONTINUE EXPEDITION</span>
              <span>➔</span>
            </button>

            <button
              onClick={() => router.push('/leaderboard')}
              style={{
                clipPath:
                  'polygon(6px 0%, calc(100% - 6px) 0%, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0% calc(100% - 6px), 0% 6px)',
              }}
              className="w-full py-2.5 px-4 bg-[#2b1b11] border border-[#8b6943]/60 text-[#f2dfbe] font-bold text-xs uppercase tracking-widest shadow transition hover:bg-[#3d2719] active:scale-[0.98] font-['Cinzel',_serif] cursor-pointer"
            >
              EXPLORER ROSTER
            </button>

            <button
              onClick={logout}
              className="w-full py-2 text-[10px] text-[#8b261d] font-mono font-bold tracking-wider uppercase hover:underline cursor-pointer"
            >
              [ LOGOUT ALIAS ]
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <ExpeditionDossier onSuccess={() => router.push('/labs')} />
  );
}
