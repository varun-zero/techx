'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useCompletion } from '@/context/CompletionContext';
import { useRouter, usePathname } from 'next/navigation';

const TOTAL_PRODUCTS = 26;

export default function XpBar() {
  const { user } = useUser();
  const { isCompleted } = useCompletion();
  const router = useRouter();
  const pathname = usePathname();
  const [feedbackCount, setFeedbackCount] = useState(0);

  useEffect(() => {
    if (user) {
      const updateCount = () => {
        const userStorageKey = `submittedFeedback_${user.email}`;
        const storedSubmissions = JSON.parse(localStorage.getItem(userStorageKey) || '[]');
        const count = storedSubmissions.length;
        setFeedbackCount(count);

        if (count >= TOTAL_PRODUCTS) {
          setTimeout(() => {
            router.push('/finish');
          }, 500);
        }
      };

      updateCount();
      window.addEventListener('feedbackSubmitted', updateCount);
      return () => {
        window.removeEventListener('feedbackSubmitted', updateCount);
      };
    }
  }, [user, router, isCompleted]);

  // Hide on pages with dedicated bottom navigation (e.g. /labs/[labId], /finish, or when not logged in)
  if (!user || pathname?.startsWith('/labs/') || pathname === '/finish') {
    return null;
  }

  const percentage = Math.min(100, Math.round((feedbackCount / TOTAL_PRODUCTS) * 100));

  return (
    <div
      className="simple-card"
      style={{
        position: 'fixed',
        bottom: 'max(16px, env(safe-area-inset-bottom))',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        width: '90%',
        maxWidth: '440px',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: '1px solid var(--border-color)',
        backgroundColor: '#ffffff',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
          Overall Progress
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--foreground)', fontWeight: '700' }}>
          {feedbackCount} / {TOTAL_PRODUCTS} Evaluated
        </div>
      </div>

      {/* Progress Track */}
      <div
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#f1f5f9',
          borderRadius: '4px',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: '#2563eb',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  );
}