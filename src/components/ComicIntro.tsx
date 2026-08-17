'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageWithFallback from './ImageWithFallback';
import { comicAssets } from '@/lib/expeditionData';

interface ComicIntroProps {
  onComplete: () => void;
}

type Step = 'sky' | 'plane' | 'jump' | 'fall';

export default function ComicIntro({ onComplete }: ComicIntroProps) {
  const [step, setStep] = useState<Step>('sky');

  const nextStep = () => {
    if (step === 'sky') setStep('plane');
    else if (step === 'plane') setStep('jump');
    else if (step === 'jump') setStep('fall');
    else if (step === 'fall') onComplete();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#0c0e10',
        color: '#F4ECD8',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Navigation Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 'max(12px, env(safe-area-inset-top))',
          left: '16px',
          right: '16px',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'auto',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '3px',
            color: '#C5A059',
            fontWeight: '700',
            textShadow: '0 2px 4px #000',
          }}
        >
          EXPEDITION RECON // LOG 001
        </div>
        <button
          onClick={onComplete}
          style={{
            backgroundColor: 'rgba(28, 21, 16, 0.85)',
            color: '#C5A059',
            border: '1px solid #A07A28',
            borderRadius: '4px',
            padding: '6px 14px',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-sans)',
            fontWeight: '700',
            letterSpacing: '1px',
            cursor: 'pointer',
            minHeight: '36px',
          }}
        >
          SKIP RECON ⏩
        </button>
      </div>

      {/* Main Panel Animation Container */}
      <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
        <AnimatePresence mode="wait">
          {/* PANEL 01: SKY */}
          {step === 'sky' && (
            <motion.div
              key="sky"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              <ImageWithFallback
                src={comicAssets.sky}
                alt="Sky Opening"
                fallbackTitle="PANEL 01: HIGH ALTITUDE DISCOVERY"
                fallbackIcon="☁️"
              />

              <motion.div
                animate={{ x: [-20, 20, -20] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: 'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.06) 0%, transparent 60%)',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: 'max(2rem, env(safe-area-inset-bottom))',
                  left: '1rem',
                  right: '1rem',
                  textAlign: 'center',
                  background: 'linear-gradient(to top, rgba(12,14,16,0.95) 0%, rgba(12,14,16,0.7) 80%, transparent 100%)',
                  padding: '2rem 1.25rem 1.25rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                }}
              >
                <h1 style={{ fontSize: '1.75rem', color: '#C5A059', marginBottom: '0.25rem', fontFamily: 'var(--font-title)', letterSpacing: '3px' }}>
                  UNCHARTED EXPEDITION
                </h1>
                <p style={{ fontSize: '1rem', color: '#D8C3A5', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)' }}>
                  A high-altitude aerial drop over forgotten product research territories.
                </p>
                <button
                  onClick={nextStep}
                  className="uncharted-btn-gold"
                  style={{
                    width: '100%',
                    maxWidth: '340px',
                    padding: '0.9rem 1.5rem',
                    fontSize: '1rem',
                  }}
                >
                  ENTER EXPEDITION ✈️
                </button>
              </div>
            </motion.div>
          )}

          {/* PANEL 02: PLANE */}
          {step === 'plane' && (
            <motion.div
              key="plane"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              <ImageWithFallback
                src={comicAssets.plane}
                alt="Inside Plane"
                fallbackTitle="PANEL 02: CARGO HOLD OVERFLIGHT"
                fallbackIcon="🛩️"
              />

              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 0.25, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  border: '3px solid rgba(197, 160, 89, 0.25)',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: 'max(2rem, env(safe-area-inset-bottom))',
                  left: '1rem',
                  right: '1rem',
                  textAlign: 'center',
                  background: 'linear-gradient(to top, rgba(12,14,16,0.95) 0%, rgba(12,14,16,0.7) 80%, transparent 100%)',
                  padding: '2rem 1.25rem 1.25rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                }}
              >
                <h2 style={{ fontSize: '1.5rem', color: '#C5A059', marginBottom: '0.25rem', fontFamily: 'var(--font-title)', letterSpacing: '2px' }}>
                  CARGO HOLD 04
                </h2>
                <p style={{ fontSize: '1rem', color: '#F4ECD8', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)' }}>
                  Aged map fragments have scattered over the research coordinates below!
                </p>
                <button
                  onClick={nextStep}
                  style={{
                    width: '100%',
                    maxWidth: '340px',
                    padding: '0.9rem 1.5rem',
                    backgroundColor: '#A04A2C',
                    color: '#ffffff',
                    border: '1px solid #E07A5F',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: '700',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
                  }}
                >
                  PREPARE TO DROP 🪂
                </button>
              </div>
            </motion.div>
          )}

          {/* PANEL 03: JUMP */}
          {step === 'jump' && (
            <motion.div
              key="jump"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1.05 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.6 }}
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              <ImageWithFallback
                src={comicAssets.jump}
                alt="Character Jump"
                fallbackTitle="PANEL 03: AIRBORNE DESCENT"
                fallbackIcon="💥"
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: 'max(2rem, env(safe-area-inset-bottom))',
                  left: '1rem',
                  right: '1rem',
                  textAlign: 'center',
                  background: 'linear-gradient(to top, rgba(12,14,16,0.95) 0%, rgba(12,14,16,0.7) 80%, transparent 100%)',
                  padding: '2rem 1.25rem 1.25rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                }}
              >
                <h2 style={{ fontSize: '1.5rem', color: '#C5A059', marginBottom: '0.25rem', fontFamily: 'var(--font-title)', letterSpacing: '2px' }}>
                  FREE FALL DESCENT
                </h2>
                <p style={{ fontSize: '1rem', color: '#F4ECD8', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)' }}>
                  Plunging directly toward the uncharted research territory...
                </p>
                <button
                  onClick={nextStep}
                  className="uncharted-btn-gold"
                  style={{
                    width: '100%',
                    maxWidth: '340px',
                    padding: '0.9rem 1.5rem',
                    fontSize: '1rem',
                  }}
                >
                  RECOVER FRAGMENTS 🧭
                </button>
              </div>
            </motion.div>
          )}

          {/* PANEL 04: FALL & FRAGMENTS */}
          {step === 'fall' && (
            <motion.div
              key="fall"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 2 }}
              transition={{ duration: 0.6 }}
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              <ImageWithFallback
                src={comicAssets.fall}
                alt="Falling Map Fragments"
                fallbackTitle="PANEL 04: RECOVERING MAP SEALS"
                fallbackIcon="🗺️"
              />

              <motion.div
                animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '25%',
                  left: '15%',
                  width: '64px',
                  height: '64px',
                  pointerEvents: 'none',
                }}
              >
                <ImageWithFallback
                  src={comicAssets.compass}
                  alt="Compass"
                  fallbackTitle="COMPASS"
                  fallbackIcon="🧭"
                  aspectRatio="1/1"
                />
              </motion.div>

              <motion.div
                animate={{ y: [15, -15, 15], rotate: [8, -8, 8] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '40%',
                  right: '15%',
                  width: '72px',
                  height: '72px',
                  pointerEvents: 'none',
                }}
              >
                <ImageWithFallback
                  src={comicAssets.mapFragment}
                  alt="Fragment"
                  fallbackTitle="MAP"
                  fallbackIcon="📜"
                  aspectRatio="1/1"
                />
              </motion.div>

              <div
                style={{
                  position: 'absolute',
                  bottom: 'max(2rem, env(safe-area-inset-bottom))',
                  left: '1rem',
                  right: '1rem',
                  textAlign: 'center',
                  background: 'linear-gradient(to top, rgba(12,14,16,0.95) 0%, rgba(12,14,16,0.7) 80%, transparent 100%)',
                  padding: '2rem 1.25rem 1.25rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                }}
              >
                <h2 style={{ fontSize: '1.5rem', color: '#C5A059', marginBottom: '0.25rem', fontFamily: 'var(--font-title)', letterSpacing: '2px' }}>
                  SECTOR MAP RETRIEVED
                </h2>
                <p style={{ fontSize: '1rem', color: '#F4ECD8', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)' }}>
                  Initialize your field dossier to unlock the expedition sectors!
                </p>
                <button
                  onClick={onComplete}
                  className="uncharted-btn-gold"
                  style={{
                    width: '100%',
                    maxWidth: '340px',
                    padding: '0.9rem 1.5rem',
                    fontSize: '1rem',
                  }}
                >
                  OPEN FIELD DOSSIER 📂
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
