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
        className="simple-card vintage-border"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          padding: '1rem 1.25rem',
        }}
      >
        <div>
          <div style={{ fontSize: '0.7rem', color: '#652B19', textTransform: 'uppercase', fontWeight: '700', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
            📜 Explorer Logged In
          </div>
          <div style={{ fontSize: '1.15rem', color: '#2C1E14', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
            {user?.name || 'Evaluator'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => router.push('/leaderboard')}
            style={{
              padding: '8px 14px',
              fontSize: '0.8rem',
              backgroundColor: '#F7EEDC',
              color: '#2C1E14',
              border: '1px solid #A88448',
              borderRadius: '4px',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              cursor: 'pointer',
            }}
          >
            🏆 Leaderboard
          </button>
          <button
            onClick={logout}
            style={{
              backgroundColor: '#652B19',
              color: '#FFFDF7',
              border: '1px solid #8B1A1A',
              borderRadius: '4px',
              padding: '8px 14px',
              fontSize: '0.8rem',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              cursor: 'pointer',
            }}
          >
            Exit
          </button>
        </div>
      </div>

      {/* Main Title & Progress */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', color: '#D4AF37', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2.5px', fontFamily: 'var(--font-mono)' }}>
          ✦ ANCIENT EXPEDITION SECTORS ✦
        </div>
        <h1 style={{ fontSize: '2rem', margin: '0.25rem 0 0.5rem', color: '#F8F1E1', fontFamily: 'var(--font-title)', letterSpacing: '1.5px' }}>
          Chart Your Next Lab Sector
        </h1>
        <p style={{ fontSize: '1rem', color: '#BCA888', fontFamily: 'var(--font-serif)', fontStyle: 'italic', margin: 0 }}>
          Select a research lab below to uncover relics & record your observations.
        </p>

        {/* Progress Card */}
        <div
          className="simple-card"
          style={{
            marginTop: '1.25rem',
            padding: '1.1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.7rem', color: '#652B19', fontWeight: '700', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
              Expedition Completion Rate
            </div>
            <div style={{ fontSize: '1.1rem', color: '#2C1E14', fontWeight: '800', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
              {completedCount} of {totalLabs} Sectors Discovered
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {Object.keys(expeditionLabs).map((labId) => {
              const done = isLabCompleted(labId, userEmail);
              return (
                <span
                  key={labId}
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: done ? '#2E5D43' : '#C4B496',
                    border: done ? '1.5px solid #1F3A2B' : '1px solid #8C785B',
                    boxShadow: done ? '0 0 8px rgba(46,93,67,0.6)' : 'none',
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
            className="simple-btn-primary gold-pulse"
            style={{
              marginTop: '1.25rem',
              width: '100%',
              padding: '1.1rem',
              fontSize: '1rem',
              backgroundColor: '#2E5D43',
            }}
          >
            🏆 Unearth Master Certificate & Claim Relics
          </button>
        )}
      </div>

      {/* Lab Selection Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        {Object.values(expeditionLabs).map((lab) => {
          const progress = getLabDiscoveryProgress(lab.sourceLab, userEmail);
          const finished = isLabCompleted(lab.sourceLab, userEmail);

          return (
            <div
              key={lab.labId}
              onClick={() => handleLabClick(lab.labId)}
              className="simple-card"
              style={{
                borderColor: finished ? '#2E5D43' : '#A88448',
                padding: '1.25rem 1.4rem',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              <div>
                <div style={{ fontSize: '0.7rem', color: '#652B19', fontWeight: '800', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
                  {lab.name}
                </div>
                <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#2C1E14', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
                  {lab.title}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#523D24', fontFamily: 'var(--font-serif)', fontStyle: 'italic', marginTop: '0.25rem' }}>
                  {lab.description}
                </div>
              </div>

              <div style={{ textAlign: 'right', minWidth: '115px' }}>
                <div style={{ fontSize: '0.7rem', color: '#6B553B', fontWeight: '700', textTransform: 'uppercase' }}>
                  Evaluated
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: '800', color: finished ? '#1F3A2B' : '#2C1E14', fontFamily: 'var(--font-display)' }}>
                  {progress.completed} / {progress.total}
                </div>
                <button
                  className="simple-btn-primary"
                  style={{
                    marginTop: '0.5rem',
                    padding: '7px 14px',
                    fontSize: '0.75rem',
                  }}
                >
                  {finished ? 'Inspect Map' : 'Enter Lab →'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

