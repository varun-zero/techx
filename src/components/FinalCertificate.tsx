'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { expeditionLabs } from '@/lib/expeditionData';
import ImageWithFallback from './ImageWithFallback';
import { motion } from 'framer-motion';

export default function FinalCertificate() {
  const router = useRouter();
  const { user } = useUser();
  const [fused, setFused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFused(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      style={{
        maxWidth: '540px',
        margin: '0 auto',
        padding: '1rem',
        paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      {!fused ? (
        /* Fragment Fusion Animation */
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', padding: '2rem 1rem' }}
        >
          <div style={{ fontSize: '0.85rem', letterSpacing: '3px', color: '#C5A059', fontFamily: 'var(--font-sans)', fontWeight: '700', marginBottom: '1.25rem' }}>
            UNITING CERTIFICATE SEALS...
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '2rem' }}>
            {Object.values(expeditionLabs).map((lab, i) => (
              <motion.div
                key={lab.labId}
                animate={{ rotate: [0, 10, -10, 0], y: [0, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #C5A059',
                  boxShadow: '0 0 18px rgba(197, 160, 89, 0.8)',
                }}
              >
                <ImageWithFallback
                  src={lab.fragmentImage}
                  alt={lab.fragmentName}
                  fallbackTitle={`SEAL ${i + 1}`}
                  fallbackIcon="📜"
                  aspectRatio="1/1"
                />
              </motion.div>
            ))}
          </div>
          <p style={{ fontSize: '1rem', color: '#D8C3A5', fontFamily: 'var(--font-serif)' }}>
            Forging official TechX Expedition Certificate of Discovery...
          </p>
        </motion.div>
      ) : (
        /* Official Uncharted Certificate Display */
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="uncharted-parchment-sheet"
          style={{
            padding: '2.25rem 1.75rem',
            borderRadius: '12px',
            position: 'relative',
            textAlign: 'center',
          }}
        >
          {/* Top Stamp Header */}
          <div
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              border: '2px solid #2D4A3E',
              color: '#2D4A3E',
              fontSize: '0.65rem',
              fontFamily: 'var(--font-sans)',
              fontWeight: '700',
              padding: '3px 8px',
              transform: 'rotate(-5deg)',
              letterSpacing: '1px',
            }}
          >
            VERIFIED // TECHX 2025
          </div>

          <div style={{ fontSize: '0.75rem', letterSpacing: '3px', color: '#705637', fontFamily: 'var(--font-sans)', fontWeight: '700' }}>
            TECHX RESEARCH EXPEDITION
          </div>
          <h1
            style={{
              fontSize: '2.1rem',
              color: '#2A2017',
              margin: '0.3rem 0 1.25rem',
              textShadow: 'none',
              fontFamily: 'var(--font-title)',
              letterSpacing: '3px',
            }}
          >
            CERTIFICATE OF DISCOVERY
          </h1>

          <p style={{ fontSize: '1rem', color: '#584937', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)' }}>
            This certifies that field explorer
          </p>

          {/* Explorer Name Display */}
          <div
            style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              color: '#A04A2C',
              fontFamily: 'var(--font-title)',
              borderBottom: '2px solid #A07A28',
              paddingBottom: '0.5rem',
              marginBottom: '1rem',
              letterSpacing: '2px',
            }}
          >
            {user?.name || 'Valued Explorer'}
          </div>

          <div style={{ fontSize: '1rem', color: '#584937', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)' }}>
            Department: <strong>{user?.department || 'Research'}</strong> ({user?.email || 'Field Agent'})
          </div>

          <p style={{ fontSize: '0.95rem', color: '#584937', marginBottom: '1.5rem', lineHeight: '1.4', fontFamily: 'var(--font-serif)' }}>
            has successfully surveyed all 3 uncharted research sectors (The Archive, The Forge, and The Vault) and contributed field observations across all showcased product innovations.
          </p>

          {/* Completed Lab Seals */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              marginBottom: '1.75rem',
              backgroundColor: '#E6D8B8',
              padding: '0.85rem',
              borderRadius: '6px',
              border: '1px solid #A07A28',
            }}
          >
            {Object.values(expeditionLabs).map((lab) => (
              <div key={lab.labId} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem' }}>📜</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#2A2017', marginTop: '2px', fontFamily: 'var(--font-sans)' }}>
                  {lab.title}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#2D4A3E', fontWeight: '700', fontFamily: 'var(--font-sans)' }}>SEALED ✓</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '0.8rem', color: '#705637', marginBottom: '1.5rem', fontFamily: 'var(--font-sans)' }}>
            DATE OF ISSUE: {currentDate}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <button
              onClick={() => router.push('/leaderboard')}
              className="uncharted-btn-gold"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.05rem',
              }}
            >
              🏆 VIEW EXPEDITION LEADERBOARD
            </button>

            <button
              onClick={() => router.push('/labs')}
              style={{
                width: '100%',
                padding: '0.85rem',
                backgroundColor: '#1C1510',
                color: '#F4ECD8',
                border: '1px solid #C5A059',
                borderRadius: '4px',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: '700',
                letterSpacing: '1px',
                cursor: 'pointer',
              }}
            >
              RETURN TO ROUTE MAP 🗺️
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
