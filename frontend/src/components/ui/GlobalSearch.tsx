'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '@/navigation';
import { products } from '@/lib/products';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('Header');

  const filteredProducts = products.filter(p => {
    const q = query.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
  }).slice(0, 5);

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
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={t('searchPlaceholder')}
          className="w-full pl-10 pr-10 py-2.5 bg-ivory-soft border border-sage-light/50 rounded-xl text-sm focus:outline-none focus:border-teal-deep/50 transition-colors placeholder:text-anthracite-soft/50 text-anthracite-soft font-medium shadow-inner"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-anthracite-soft/50">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        {query && (
          <button 
            onClick={() => { setQuery(''); setIsOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-anthracite-soft/50 hover:text-teal-deep transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && query.length > 0 && (
        <div className="absolute top-full mt-2 w-[320px] right-0 bg-white border border-sage-light/30 rounded-2xl shadow-xl overflow-hidden z-50">
          {filteredProducts.length > 0 ? (
            <ul className="py-2">
              {filteredProducts.map(p => (
                <li key={p.id}>
                  <button
                    onClick={() => {
                      router.push(`/produits/${p.id}`);
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-sage-light/20 flex items-center gap-4 transition-colors"
                  >
                    {p.imagePath && (
                      <div className="relative w-12 h-12 flex-shrink-0 bg-ivory-soft rounded-lg overflow-hidden p-1 border border-sage-light/30 flex items-center justify-center">
                        <Image src={p.imagePath} alt={p.name} width={40} height={40} className="object-contain mix-blend-multiply" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-teal-deep line-clamp-1">{p.name}</p>
                      <p className="text-xs text-anthracite-soft/70 line-clamp-1">{p.brand}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
             <div className="p-6 text-center">
               <p className="text-sm text-anthracite-soft/70">{t('noResultsFor')}</p>
               <p className="text-sm font-bold text-teal-deep line-clamp-1 break-all mt-1">"{query}"</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
}
