import React from 'react';

interface StealthVaultLogoProps {
  size?: number;
  className?: string;
}

export const StealthVaultLogo: React.FC<StealthVaultLogoProps> = ({ size = 32, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0a1329" />
        <stop offset="100%" stopColor="#030712" />
      </radialGradient>
      <linearGradient id="shieldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <linearGradient id="lockGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0ea5e9" />
      </linearGradient>
      <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Background Circle */}
    <circle cx="100" cy="100" r="95" fill="url(#bgGrad)" stroke="#1e293b" strokeWidth="2" />

    {/* Outer Shield Outline */}
    <path
      d="M100 30 L155 52 C155 110 135 152 100 170 C65 152 45 110 45 52 L100 30 Z"
      fill="#030712"
      stroke="url(#shieldBorder)"
      strokeWidth="6"
      strokeLinejoin="round"
      filter="url(#glowEffect)"
    />

    {/* Inner Lock + 'S' Glyph */}
    <g filter="url(#glowEffect)">
      {/* Lock Shackle */}
      <path
        d="M82 72 V58 C82 48 90 42 100 42 C110 42 118 48 118 58 V72"
        fill="none"
        stroke="url(#lockGlow)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* S-Shaped Body */}
      <path
        d="M122 78 C122 72 108 70 96 76 C84 82 82 96 98 102 C114 108 120 120 106 128 C92 136 78 130 78 122"
        fill="none"
        stroke="url(#lockGlow)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>

    {/* Lens Flare Sparkle */}
    <circle cx="155" cy="52" r="3" fill="#e0f2fe" filter="url(#glowEffect)" />
  </svg>
);

