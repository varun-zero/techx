'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';

interface LeaderboardEntry {
  name: string;
  department: string;
  totalFeedback: number;
  averageRating: number;
  isCompleted: boolean;
  rank: number;
}

interface ProductStatsEntry {
  productId: string;
  productName: string;
  labName: string;
  totalRatings: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  totalComments: number;
  lastRated: string | null;
}

export default function PublicLeaderboardPage() {
  const { user, logout } = useUser();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [productStats, setProductStats] = useState<ProductStatsEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'users' | 'products'>('users');

  useEffect(() => {
    fetchLeaderboard();
    fetchProductStats();
    const interval = setInterval(() => {
      fetchLeaderboard();
      fetchProductStats();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/admin/leaderboard');
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      const data = await response.json();
      
      const publicData = data.map((entry: LeaderboardEntry & { email: string; completedFeedback: string[] }, index: number) => ({
        name: entry.name,
        department: entry.department,
        totalFeedback: entry.completedFeedback?.length || 0,
        averageRating: entry.averageRating || 0,
        isCompleted: entry.isCompleted || false,
        rank: index + 1
      }));
      
      setLeaderboard(publicData);
      setError('');
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Failed to load leaderboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductStats = async () => {
    try {
      const response = await fetch('/api/admin/product-stats');
      if (!response.ok) throw new Error('Failed to fetch product stats');
      const data = await response.json();
      setProductStats(data);
    } catch (err) {
      console.error('Error fetching product stats:', err);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  if (isLoading) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '3rem 1rem', textAlign: 'center', color: '#0f172a' }}>
        <div style={{ fontSize: '1rem', fontWeight: '600' }}>
          Loading Leaderboard Data...
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem 1rem' }}>
      <div
        className="simple-card"
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '1.75rem',
          backgroundColor: '#ffffff',
        }}
      >
        {/* Navigation & User Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => window.history.back()}
              style={{
                backgroundColor: '#ffffff',
                color: '#0f172a',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              ← Back
            </button>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                backgroundColor: '#ffffff',
                color: '#0f172a',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              🏠 Home
            </button>
          </div>

          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Evaluator: <strong>{user.name}</strong> ({user.department})
              </span>
              <button
                onClick={logout}
                style={{
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Title Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
            TechX Feedback Leaderboard
          </div>
          <h1 style={{ fontSize: '2rem', color: 'var(--foreground)', margin: '0.2rem 0 0.5rem', fontWeight: '700' }}>
            Leaderboard & Ratings
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>
            {viewMode === 'users' ? 'Top participating evaluators across research labs' : 'Most evaluated products across research labs'}
          </p>

          {/* Mode Toggle */}
          <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <button
              onClick={() => setViewMode('users')}
              className={viewMode === 'users' ? 'simple-btn-primary' : ''}
              style={{
                padding: '0.5rem 1.25rem',
                backgroundColor: viewMode === 'users' ? undefined : '#f1f5f9',
                color: viewMode === 'users' ? undefined : '#0f172a',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              👥 Evaluators
            </button>
            <button
              onClick={() => setViewMode('products')}
              className={viewMode === 'products' ? 'simple-btn-primary' : ''}
              style={{
                padding: '0.5rem 1.25rem',
                backgroundColor: viewMode === 'products' ? undefined : '#f1f5f9',
                color: viewMode === 'products' ? undefined : '#0f172a',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              📦 Product Ratings
            </button>
          </div>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '0.75rem', borderRadius: '6px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        {/* Data Tables */}
        {viewMode === 'users' ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--foreground)' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '0.85rem', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>RANK</th>
                  <th style={{ padding: '0.85rem', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>NAME</th>
                  <th style={{ padding: '0.85rem', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>DEPARTMENT</th>
                  <th style={{ padding: '0.85rem', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>FEEDBACK COUNT</th>
                  <th style={{ padding: '0.85rem', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>AVG RATING</th>
                  <th style={{ padding: '0.85rem', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => {
                  const isCurrentUser = user && entry.name === user.name;
                  const isTopThree = index < 3;

                  return (
                    <tr
                      key={`${entry.name}-${entry.department}`}
                      style={{
                        backgroundColor: isCurrentUser
                          ? '#eff6ff'
                          : isTopThree
                          ? '#f8fafc'
                          : 'transparent',
                        borderBottom: '1px solid var(--border-color)',
                      }}
                    >
                      <td style={{ padding: '0.85rem', fontSize: '1rem', fontWeight: '700' }}>
                        {getRankIcon(entry.rank)}
                      </td>
                      <td style={{ padding: '0.85rem', fontWeight: isCurrentUser ? '700' : '500', color: isCurrentUser ? 'var(--primary)' : 'var(--foreground)' }}>
                        {entry.name} {isCurrentUser && '(You)'}
                      </td>
                      <td style={{ padding: '0.85rem', color: 'var(--text-muted)' }}>
                        {entry.department}
                      </td>
                      <td style={{ padding: '0.85rem', fontWeight: '700' }}>
                        {entry.totalFeedback} / 25
                      </td>
                      <td style={{ padding: '0.85rem', color: '#eab308', fontWeight: '700' }}>
                        {entry.averageRating.toFixed(2)} ★
                      </td>
                      <td style={{ padding: '0.85rem' }}>
                        {entry.isCompleted ? (
                          <span style={{ color: '#16a34a', fontWeight: '700', fontSize: '0.8rem' }}>
                            Completed ✓
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                            In Progress
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--foreground)' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '0.85rem', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>RANK</th>
                  <th style={{ padding: '0.85rem', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>PRODUCT</th>
                  <th style={{ padding: '0.85rem', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>LAB</th>
                  <th style={{ padding: '0.85rem', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>TOTAL REVIEWS</th>
                  <th style={{ padding: '0.85rem', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>AVG SCORE</th>
                </tr>
              </thead>
              <tbody>
                {productStats.map((entry, index) => (
                  <tr
                    key={entry.productId}
                    style={{
                      backgroundColor: index < 3 ? '#f8fafc' : 'transparent',
                      borderBottom: '1px solid var(--border-color)',
                    }}
                  >
                    <td style={{ padding: '0.85rem', fontWeight: '700' }}>
                      {getRankIcon(index + 1)}
                    </td>
                    <td style={{ padding: '0.85rem', fontWeight: '700', color: 'var(--foreground)' }}>
                      {entry.productName}
                    </td>
                    <td style={{ padding: '0.85rem', color: 'var(--text-muted)' }}>
                      {entry.labName}
                    </td>
                    <td style={{ padding: '0.85rem', fontWeight: '700' }}>
                      {entry.totalRatings}
                    </td>
                    <td style={{ padding: '0.85rem', fontWeight: '700', color: '#eab308' }}>
                      {entry.averageRating.toFixed(2)} ★
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

