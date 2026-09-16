'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from '@/navigation';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectLang = (l: string) => { 
    setIsOpen(false); 
    const targetLocale = l.toLowerCase();
    if (targetLocale === currentLocale) return;

    router.replace(pathname, {locale: targetLocale});
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <button 
        onClick={toggleDropdown}
        className="flex items-center gap-1 text-sm font-medium text-anthracite-soft hover:text-teal-deep transition-colors bg-sage-light/20 px-3 py-2 rounded-lg"
      >
        {currentLocale.toUpperCase()}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-16 bg-white border border-sage-light/50 rounded-lg shadow-lg overflow-hidden z-50 text-center">
          {['FR', 'EN', 'AR'].map((l) => (
            <button
              key={l}
              onClick={() => selectLang(l)}
              className="block w-full px-2 py-2 text-sm text-anthracite-soft hover:bg-sage-light/30 hover:text-teal-deep transition-colors"
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
