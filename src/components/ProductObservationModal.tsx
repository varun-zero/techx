'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useAchievement } from '@/context/AchievementContext';
import { motion } from 'framer-motion';

interface ProductObservationModalProps {
  product: {
    id: string;
    name: string;
    icon: string;
    description?: string;
  };
  isSubmitted: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProductObservationModal({
  product,
  isSubmitted,
  onClose,
  onSuccess,
}: ProductObservationModalProps) {
  const { user } = useUser();
  const { addAchievement } = useAchievement();

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('User information not found. Please log in again.');
      return;
    }

    if (rating === 0) {
      alert('A star rating is required to record field observation!');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: user.name,
          studentEmail: user.email,
          studentDepartment: user.department,
          rating,
          comment,
          tableId: product.id,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit field observation');
      }

      const userStorageKey = `submittedFeedback_${user.email}`;
      const submitted = JSON.parse(localStorage.getItem(userStorageKey) || '[]');

      if (!submitted.includes(product.id)) {
        submitted.push(product.id);
        localStorage.setItem(userStorageKey, JSON.stringify(submitted));

        if (submitted.length >= 25) {
          localStorage.setItem(`completion_${user.email}`, 'true');
          localStorage.setItem('completion_state', 'true');
        }

        window.dispatchEvent(
          new CustomEvent('feedbackSubmitted', {
            detail: { completed: submitted.length >= 25 },
          })
        );
      }

      try {
        const sound = new Audio('/sounds/achievement.mp3');
        sound.play().catch(() => {});
      } catch {}

      addAchievement({
        title: 'Discovery Recorded!',
        subtitle: product.name,
        imageUrl: '/images/image.png',
      });

      onSuccess();
    } catch (err) {
      console.error('Submission Error:', err);
      alert('🔥 Submission error! Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        backgroundColor: 'rgba(10, 8, 6, 0.88)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '0',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="simple-card"
        style={{
          width: '100%',
          maxWidth: '540px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          padding: '1.5rem',
          paddingBottom: 'max(1.75rem, env(safe-area-inset-bottom))',
          boxSizing: 'border-box',
        }}
      >
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase' }}>
              Product Feedback Evaluation
            </span>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--foreground)', margin: 0, fontWeight: '700' }}>
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#f1f5f9',
              color: '#0f172a',
              border: '1px solid var(--border-color)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* Product Details Banner */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            color: 'var(--foreground)',
            padding: '0.9rem 1rem',
            borderRadius: '8px',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            border: '1px solid var(--border-color)',
          }}
        >
          <span style={{ fontSize: '2rem' }}>{product.icon}</span>
          <div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {product.description || 'TechX product evaluation checkpoint.'}
            </div>
            {isSubmitted && (
              <span
                style={{
                  display: 'inline-block',
                  marginTop: '0.25rem',
                  fontSize: '0.75rem',
                  color: '#166534',
                  fontWeight: '600',
                }}
              >
                Feedback Previously Submitted ✓
              </span>
            )}
          </div>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--foreground)', marginBottom: '0.4rem' }}>
              Star Rating (Required):
            </label>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', padding: '0.25rem 0' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  style={{
                    fontSize: '2rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transform: rating >= star ? 'scale(1.15)' : 'scale(1)',
                    transition: 'transform 0.15s',
                    padding: '2px',
                    color: rating >= star ? '#eab308' : '#cbd5e1',
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--foreground)', marginBottom: '0.3rem' }}>
              Comments / Detailed Feedback:
            </label>
            <textarea
              rows={3}
              placeholder="Share your thoughts, suggestions, or impressions..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--foreground)',
                fontSize: '0.95rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="simple-btn-primary"
            style={{
              width: '100%',
              padding: '0.85rem',
              fontSize: '1rem',
            }}
          >
            {isSubmitting ? 'Submitting Feedback...' : 'Submit Feedback'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

