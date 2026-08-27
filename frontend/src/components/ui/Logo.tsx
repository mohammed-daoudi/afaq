'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Logo({ className = '', size = 'default' }: { className?: string; size?: 'default' | 'large' }) {
  const isLarge = size === 'large';

  return (
    <Link href="/" className={`flex items-center justify-center ${className}`}>
      <div className={`relative ${isLarge ? 'w-48 h-32' : 'w-32 h-16'}`}>
        <Image
          src="/images/logo.png"
          alt="AFAQ Health Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}
