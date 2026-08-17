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
      <main style={{ padding: '2rem 1rem', maxWidth: '480px', margin: '0 auto', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            backgroundColor: '#201a15',
            border: '2px solid #8b7355',
            borderRadius: '8px',
            padding: '2rem 1.5rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
          }}
        >
          <div style={{ fontSize: '0.75rem', letterSpacing: '2px', color: '#FFD700', fontWeight: 'bold' }}>
            ACTIVE EXPEDITION SESSION
          </div>
          <h1 style={{ fontSize: '1.6rem', color: '#f4ecd8', margin: '0.5rem 0' }}>WELCOME BACK</h1>
          <p style={{ color: '#c6c6c6', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Explorer: <strong>{user.name}</strong> ({user.email})<br />
            Department: <strong>{user.department}</strong>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
                width: '100%',
                padding: '0.9rem',
                backgroundColor: '#5E8D4A',
                color: '#fff',
                border: '2px solid #95c781',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
              }}
            >
              CONTINUE EXPEDITION 🗺️
            </button>

            <button
              onClick={() => router.push('/leaderboard')}
              style={{
                width: '100%',
                padding: '0.8rem',
                backgroundColor: '#FFD700',
                color: '#000',
                border: '2px solid #fff',
                borderRadius: '4px',
                fontSize: '0.95rem',
                fontWeight: 'bold',
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
              }}
            >
              🏆 LEADERBOARD
            </button>

            <button
              onClick={logout}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#8B0000',
                color: '#fff',
                border: '1px solid #d45555',
                borderRadius: '4px',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
              }}
            >
              LOGOUT
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
