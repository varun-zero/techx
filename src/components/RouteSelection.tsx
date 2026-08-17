'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { expeditionLabs, getLabDiscoveryProgress, isLabCompleted, getCompletedLabCount } from '@/lib/expeditionData';

export default function RouteSelection() {
  const router = useRouter();
  const { user, logout } = useUser();

  const userEmail = user?.email || '';
  const completedCount = getCompletedLabCount(userEmail);
  const totalLabs = 3;
  const allLabsFinished = completedCount >= totalLabs;

  const handleLabClick = (labId: string) => {
    router.push(`/labs/${labId}`);
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '1.5rem 1rem',
        paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header Bar */}
      <div
        className="simple-card"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          padding: '1rem 1.25rem',
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
            Logged in as
          </div>
          <div style={{ fontSize: '1.05rem', color: 'var(--foreground)', fontWeight: '700' }}>
            {user?.name || 'Evaluator'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => router.push('/leaderboard')}
            style={{
              padding: '8px 14px',
              fontSize: '0.85rem',
              backgroundColor: '#f1f5f9',
              color: '#0f172a',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Leaderboard
          </button>
          <button
            onClick={logout}
            style={{
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 14px',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Title & Progress */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
          TechX Research Labs
        </div>
        <h1 style={{ fontSize: '1.75rem', margin: '0.2rem 0 0.5rem', color: 'var(--foreground)' }}>
          Select a Research Lab
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>
          Choose a lab below to submit your product evaluation feedback.
        </p>

        {/* Progress Card */}
        <div
          className="simple-card"
          style={{
            marginTop: '1.25rem',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
              Lab Completion Progress
            </div>
            <div style={{ fontSize: '1rem', color: 'var(--foreground)', fontWeight: '700', marginTop: '2px' }}>
              {completedCount} of {totalLabs} Labs Completed
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {Object.keys(expeditionLabs).map((labId) => {
              const done = isLabCompleted(labId, userEmail);
              return (
                <span
                  key={labId}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: done ? '#22c55e' : '#cbd5e1',
                    display: 'inline-block',
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Final Certificate Claim Button */}
        {allLabsFinished && (
          <button
            onClick={() => router.push('/finish')}
            className="simple-btn-primary"
            style={{
              marginTop: '1.25rem',
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              backgroundColor: '#16a34a',
            }}
          >
            ✓ Complete Evaluation & View Certificate
          </button>
        )}
      </div>

      {/* Lab Selection Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {Object.values(expeditionLabs).map((lab) => {
          const progress = getLabDiscoveryProgress(lab.sourceLab, userEmail);
          const finished = isLabCompleted(lab.sourceLab, userEmail);

          return (
            <div
              key={lab.labId}
              onClick={() => handleLabClick(lab.labId)}
              className="simple-card"
              style={{
                borderColor: finished ? '#22c55e' : 'var(--border-color)',
                padding: '1.25rem',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase' }}>
                  {lab.name}
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--foreground)', marginTop: '2px' }}>
                  {lab.title}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {lab.description}
                </div>
              </div>

              <div style={{ textAlign: 'right', minWidth: '110px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                  Evaluated
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: finished ? '#22c55e' : 'var(--foreground)' }}>
                  {progress.completed} / {progress.total}
                </div>
                <button
                  className="simple-btn-primary"
                  style={{
                    marginTop: '0.5rem',
                    padding: '6px 14px',
                    fontSize: '0.8rem',
                  }}
                >
                  {finished ? 'View Lab' : 'Enter Lab →'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

