'use client';

import { motion } from 'framer-motion';
import ImageWithFallback from './ImageWithFallback';
import { ExpeditionLabConfig } from '@/lib/expeditionData';

interface CertificateFragmentModalProps {
  lab: ExpeditionLabConfig;
  onClose: () => void;
}

export default function CertificateFragmentModal({ lab, onClose }: CertificateFragmentModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(10, 8, 6, 0.92)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 30 }}
        transition={{ type: 'spring', damping: 20 }}
        className="uncharted-card"
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '1.75rem',
          textAlign: 'center',
          borderColor: '#C5A059',
          boxShadow: '0 0 35px rgba(197, 160, 89, 0.7)',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            fontSize: '0.75rem',
            letterSpacing: '3px',
            color: '#C5A059',
            fontFamily: 'var(--font-sans)',
            fontWeight: '700',
          }}
        >
          EXPEDITION SECTOR SURVEYED!
        </div>

        <h2 style={{ fontSize: '1.75rem', color: '#F4ECD8', margin: '0.4rem 0 1.25rem', fontFamily: 'var(--font-title)', letterSpacing: '2px' }}>
          {lab.title}
        </h2>

        {/* Fragment Seal Artwork */}
        <div
          style={{
            position: 'relative',
            width: '160px',
            height: '160px',
            margin: '0 auto 1.25rem',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #C5A059',
            boxShadow: '0 0 20px rgba(197, 160, 89, 0.8)',
          }}
        >
          <ImageWithFallback
            src={lab.fragmentImage}
            alt={lab.fragmentName}
            fallbackTitle={`SEAL ${lab.fragmentId}`}
            fallbackIcon="🗝️"
            aspectRatio="1/1"
          />
        </div>

        <div style={{ fontSize: '1.1rem', color: '#C5A059', fontWeight: 'bold', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>
          {lab.fragmentName}
        </div>

        <p style={{ fontSize: '0.95rem', color: '#D8C3A5', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
          You have successfully surveyed all checkpoints in this sector and recovered an official certificate seal.
        </p>

        <button
          onClick={onClose}
          className="uncharted-btn-gold"
          style={{
            width: '100%',
            padding: '0.9rem',
            fontSize: '1rem',
          }}
        >
          RETURN TO ROUTE MAP 🗺️
        </button>
      </motion.div>
    </motion.div>
  );
}
