'use client';

import { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackTitle?: string;
  fallbackIcon?: string;
  aspectRatio?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackTitle,
  fallbackIcon = '📜',
  aspectRatio,
  className = '',
  style = {},
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`expedition-image-fallback ${className}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#201a15',
          backgroundImage: 'radial-gradient(circle, #2b221a 0%, #15110d 100%)',
          border: '2px dashed #8b7355',
          borderRadius: '8px',
          color: '#d4af37',
          padding: '1rem',
          textAlign: 'center',
          fontFamily: 'monospace',
          aspectRatio: aspectRatio || '16 / 9',
          boxShadow: 'inset 0 0 15px rgba(0,0,0,0.8)',
          width: '100%',
          boxSizing: 'border-box',
          ...style,
        }}
      >
        <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{fallbackIcon}</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '1px', color: '#e6c875' }}>
          {fallbackTitle || alt || 'ASSET PENDING'}
        </span>
        <span style={{ fontSize: '0.65rem', color: '#8b7355', marginTop: '0.25rem' }}>
          [{src ? src.split('/').pop() : 'NO PATH'}]
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        ...style,
      }}
      {...props}
    />
  );
}
