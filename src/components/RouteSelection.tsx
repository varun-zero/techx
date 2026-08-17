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
        maxWidth: '560px',
        margin: '0 auto',
        padding: '1.25rem 0.85rem',
        paddingBottom: 'calc(100px + env(safe-area-inset-bottom))',
        boxSizing: 'border-box',
      }}
    >
      {/* Handcrafted Notebook Header Container */}
      <div
        className="simple-card vintage-border"
        style={{
          padding: '1.5rem 1.25rem',
          marginBottom: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top Explorer Status Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px dashed #A88448',
            paddingBottom: '0.85rem',
            marginBottom: '1rem',
          }}
        >
          <div>
            <div style={{ fontSize: '0.68rem', color: '#652B19', textTransform: 'uppercase', fontWeight: '800', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
              📜 FIELD EXPEDITION LOG
            </div>
            <div style={{ fontSize: '1.15rem', color: '#2C1E14', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
              {user?.name || 'Evaluator'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              onClick={() => router.push('/leaderboard')}
              style={{
                padding: '6px 12px',
                fontSize: '0.75rem',
                backgroundColor: '#F7EEDC',
                color: '#2C1E14',
                border: '1px solid #A88448',
                borderRadius: '4px',
                fontWeight: '700',
                fontFamily: 'var(--font-display)',
                cursor: 'pointer',
              }}
            >
              🏆 Ranks
            </button>
            <button
              onClick={logout}
              style={{
                backgroundColor: '#652B19',
                color: '#FFFDF7',
                border: '1px solid #8B1A1A',
                borderRadius: '4px',
                padding: '6px 12px',
                fontSize: '0.75rem',
                fontWeight: '700',
                fontFamily: 'var(--font-display)',
                cursor: 'pointer',
              }}
            >
              Exit
            </button>
          </div>
        </div>

        {/* Main Title & Progress with Uncharted Distressed Typography */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '1.8rem',
              color: '#2C1E14',
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              fontFamily: 'var(--font-title)',
              textShadow: '0 1px 0 rgba(255,255,255,0.7)',
              lineHeight: '1.1',
            }}
          >
            EXPEDITION STATUS
          </div>

          <div
            style={{
              fontSize: '1.05rem',
              color: '#652B19',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontFamily: 'var(--font-mono)',
              marginTop: '0.4rem',
            }}
          >
            {completedCount} OF {totalLabs} DESTINATIONS DISCOVERED
          </div>

          {/* Progress Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '0.8rem' }}>
            {Object.keys(expeditionLabs).map((labId) => {
              const done = isLabCompleted(labId, userEmail);
              return (
                <span
                  key={labId}
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: done ? '#1F3A2B' : '#C4B496',
                    border: done ? '2px solid #D4AF37' : '1.5px solid #8C785B',
                    boxShadow: done ? '0 0 10px rgba(74,222,128,0.7)' : 'inset 0 1px 3px rgba(0,0,0,0.3)',
                    display: 'inline-block',
                  }}
                />
              );
            })}
          </div>

          {/* Final Certificate Claim Button */}
          {allLabsFinished && (
            <button
              onClick={() => router.push('/finish')}
              className="simple-btn-primary gold-pulse"
              style={{
                marginTop: '1.25rem',
                width: '100%',
                padding: '1rem',
                fontSize: '0.95rem',
                backgroundColor: '#1F3A2B',
              }}
            >
              🏆 Unearth Master Certificate & Claim Relics
            </button>
          )}
        </div>
      </div>

      {/* Lab Selection Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {Object.values(expeditionLabs).map((lab, index) => {
          const progress = getLabDiscoveryProgress(lab.sourceLab, userEmail);
          const finished = isLabCompleted(lab.sourceLab, userEmail);
          const numStr = String(index + 1).padStart(2, '0');

          return (
            <div
              key={lab.labId}
              onClick={() => handleLabClick(lab.labId)}
              className="simple-card vintage-border"
              style={{
                borderColor: finished ? '#1F3A2B' : '#A88448',
                padding: '1.25rem 1.2rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                <div>
                  <div style={{ fontSize: '1rem', color: '#D4AF37', fontWeight: '900', fontFamily: 'var(--font-mono)', letterSpacing: '2px' }}>
                    {numStr}
                  </div>
                  <div
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: '900',
                      color: '#2C1E14',
                      fontFamily: 'var(--font-title)',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      marginTop: '2px',
                    }}
                  >
                    {lab.title}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.68rem', color: '#6B553B', fontWeight: '700', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                    EVALUATED
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: finished ? '#1F3A2B' : '#2C1E14', fontFamily: 'var(--font-display)' }}>
                    {progress.completed} / {progress.total}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.92rem', color: '#422F1B', fontFamily: 'var(--font-serif)', fontStyle: 'italic', lineHeight: '1.45', marginBottom: '1rem' }}>
                {lab.description}
              </div>

              <button
                className="simple-btn-primary"
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  fontSize: '0.85rem',
                }}
              >
                {finished ? `Inspect ${lab.title} Records →` : `Enter ${lab.title} →`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
