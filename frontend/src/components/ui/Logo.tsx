'use client';

import React from 'react';
import { Link } from '@/navigation';
import Image from 'next/image';

export function Logo({ className = '', size = 'default' }: { className?: string; size?: 'default' | 'large' }) {
  const isLarge = size === 'large';

  return (
    <Link href="/" className={`flex items-center justify-center h-full py-1 ${className}`}>
      <div className={`relative ${isLarge ? 'w-72 h-36' : 'w-[210px] h-[76px] lg:w-[346px] lg:h-[110px]'} flex items-center justify-center`}>
        <Image
          src="/images/design/lg.jpeg"
          alt="AFAQ HEALTH Logo"
          fill
          className="object-contain mix-blend-multiply"
          priority
        />
      </div>
    </Link>
  );
}
