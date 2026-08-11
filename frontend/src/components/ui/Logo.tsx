'use client';

import React from 'react';
import Link from 'next/link';

/**
 * AFAQ Health Logo — coded to match the original image exactly.
 * 
 * The logo consists of:
 * - A human figure with arms raised (like a "Y" shape) in deep teal green
 * - Multiple leaves arranged in an arc around the figure
 * - "AFAQ Health" text beneath
 * - A signature shimmer/shine animation effect
 */
export function Logo({ className = '', size = 'default' }: { className?: string; size?: 'default' | 'large' }) {
  const isLarge = size === 'large';
  const svgSize = isLarge ? 48 : 36;
  const logoColor = '#006B3F'; // Exact AFAQ Health green from the logo

  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`}>
      {/* SVG Logo Mark */}
      <div className="relative overflow-hidden rounded-lg" style={{ width: svgSize, height: svgSize }}>
        <svg
          viewBox="0 0 100 100"
          width={svgSize}
          height={svgSize}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="AFAQ Health logo"
        >
          {/* Human figure - body */}
          <circle cx="50" cy="32" r="6" fill={logoColor} />
          {/* Body trunk */}
          <path
            d="M50 38 C50 38 50 65 50 70"
            stroke={logoColor}
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Arms raised upward */}
          <path
            d="M50 45 C44 38 36 30 30 25"
            stroke={logoColor}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M50 45 C56 38 64 30 70 25"
            stroke={logoColor}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Legs */}
          <path
            d="M50 70 C46 78 40 85 36 90"
            stroke={logoColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M50 70 C54 78 60 85 64 90"
            stroke={logoColor}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Leaves arranged in an arc around the figure */}
          {/* Top leaves */}
          <ellipse cx="50" cy="12" rx="5" ry="9" fill={logoColor} transform="rotate(0 50 12)" />
          
          {/* Top-right leaves */}
          <ellipse cx="68" cy="16" rx="4.5" ry="8" fill={logoColor} transform="rotate(35 68 16)" />
          <ellipse cx="80" cy="28" rx="4.5" ry="8" fill={logoColor} transform="rotate(60 80 28)" />
          <ellipse cx="86" cy="45" rx="4" ry="7.5" fill={logoColor} transform="rotate(80 86 45)" />
          <ellipse cx="84" cy="62" rx="4" ry="7" fill={logoColor} transform="rotate(100 84 62)" />

          {/* Top-left leaves */}
          <ellipse cx="32" cy="16" rx="4.5" ry="8" fill={logoColor} transform="rotate(-35 32 16)" />
          <ellipse cx="20" cy="28" rx="4.5" ry="8" fill={logoColor} transform="rotate(-60 20 28)" />
          <ellipse cx="14" cy="45" rx="4" ry="7.5" fill={logoColor} transform="rotate(-80 14 45)" />
          <ellipse cx="16" cy="62" rx="4" ry="7" fill={logoColor} transform="rotate(-100 16 62)" />
        </svg>

        {/* Shimmer shine effect overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(120deg, transparent 25%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.5) 55%, transparent 75%)`,
            backgroundSize: '250% 100%',
            animation: 'logoShimmer 4s ease-in-out infinite',
          }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span
          className={`font-heading font-extrabold leading-none tracking-tight relative overflow-hidden group-hover:opacity-90 transition-opacity duration-300 ${
            isLarge ? 'text-2xl' : 'text-xl'
          }`}
          style={{ color: logoColor }}
        >
          AFAQ
          <span className="absolute inset-0 shimmer-effect mix-blend-overlay pointer-events-none" />
        </span>
        <span
          className={`font-sans font-semibold leading-none uppercase tracking-[0.2em] mt-0.5 ${
            isLarge ? 'text-[11px]' : 'text-[9px]'
          }`}
          style={{ color: `${logoColor}88` }}
        >
          Health
        </span>
      </div>
    </Link>
  );
}
