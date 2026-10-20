import React from 'react';

/**
 * High-elegance minimalist vector silhouettes of Sunflowers (Girasoles) and Lilies (Lirios)
 */
export const SunflowerSilhouette: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-16 h-16 text-amber-500/30',
  size = 64,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Sunflower center disc */}
    <circle cx="50" cy="50" r="16" fill="currentColor" fillOpacity="0.8" />
    <circle cx="50" cy="50" r="12" fill="currentColor" fillOpacity="0.4" />
    <circle cx="50" cy="50" r="8" fill="currentColor" fillOpacity="0.7" />

    {/* Radiating Sunflower Petals */}
    {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map(
      (deg, i) => (
        <path
          key={i}
          d="M 48 34 C 45 20, 50 10, 50 8 C 50 10, 55 20, 52 34 Z"
          transform={`rotate(${deg} 50 50)`}
          fill="currentColor"
          fillOpacity={i % 2 === 0 ? 0.65 : 0.85}
        />
      )
    )}
    {/* Secondary inner petal layer */}
    {[11.25, 33.75, 56.25, 78.75, 101.25, 123.75, 146.25, 168.75, 191.25, 213.75, 236.25, 258.75, 281.25, 303.75, 326.25, 348.75].map(
      (deg, i) => (
        <path
          key={`sub-${i}`}
          d="M 48.5 35 C 46 25, 50 16, 50 15 C 50 16, 54 25, 51.5 35 Z"
          transform={`rotate(${deg} 50 50)`}
          fill="currentColor"
          fillOpacity="0.5"
        />
      )
    )}
  </svg>
);

export const LilySilhouette: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-16 h-16 text-amber-500/30',
  size = 64,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Lily long graceful curving petals */}
    {/* Center stem & pistils */}
    <path d="M 50 90 Q 50 60 50 48" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M 50 50 Q 42 35 38 25" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <circle cx="37" cy="24" r="2" fill="currentColor" />
    <path d="M 50 50 Q 50 32 50 22" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <circle cx="50" cy="21" r="2" fill="currentColor" />
    <path d="M 50 50 Q 58 35 62 25" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <circle cx="63" cy="24" r="2" fill="currentColor" />

    {/* Top Petal */}
    <path
      d="M 50 50 C 44 38, 43 20, 50 8 C 57 20, 56 38, 50 50 Z"
      fill="currentColor"
      fillOpacity="0.75"
    />
    {/* Top Right Petal */}
    <path
      d="M 50 50 C 58 42, 75 35, 86 28 C 80 42, 68 52, 50 50 Z"
      fill="currentColor"
      fillOpacity="0.65"
    />
    {/* Top Left Petal */}
    <path
      d="M 50 50 C 42 42, 25 35, 14 28 C 20 42, 32 52, 50 50 Z"
      fill="currentColor"
      fillOpacity="0.65"
    />
    {/* Lower Right Petal */}
    <path
      d="M 50 50 C 62 55, 78 62, 85 75 C 70 73, 56 62, 50 50 Z"
      fill="currentColor"
      fillOpacity="0.8"
    />
    {/* Lower Left Petal */}
    <path
      d="M 50 50 C 38 55, 22 62, 15 75 C 30 73, 44 62, 50 50 Z"
      fill="currentColor"
      fillOpacity="0.8"
    />
  </svg>
);

export const FloralCornerDecoration: React.FC<{ position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({
  position = 'top-left',
}) => {
  const getTransforms = () => {
    switch (position) {
      case 'top-right':
        return 'top-0 right-0 rotate-90';
      case 'bottom-right':
        return 'bottom-0 right-0 rotate-180';
      case 'bottom-left':
        return 'bottom-0 left-0 -rotate-90';
      case 'top-left':
      default:
        return 'top-0 left-0';
    }
  };

  return (
    <div className={`absolute pointer-events-none opacity-30 select-none z-0 ${getTransforms()}`}>
      <div className="relative w-48 h-48 overflow-hidden">
        <SunflowerSilhouette className="absolute -top-6 -left-6 w-32 h-32 text-amber-400/40" />
        <LilySilhouette className="absolute top-12 left-16 w-24 h-24 text-amber-500/30" />
      </div>
    </div>
  );
};
