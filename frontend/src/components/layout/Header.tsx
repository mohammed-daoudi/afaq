'use client';

import React, { useState } from 'react';
import { Link } from '@/navigation';
import { Logo } from '@/components/ui/Logo';
import { GlobalSearch } from '@/components/ui/GlobalSearch';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useTranslations } from 'next-intl';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('Header');

  const navLinks = [
    { href: '/a-propos', label: t('about') },
    { href: '/marques', label: t('brands') },
    { href: '/produits', label: t('products') },
    { href: '/conseils', label: t('advice') },
    { href: '/pharmacies', label: t('pharmacies') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col">
      {/* Top Section (Solid White) */}
      <div className="bg-white">
        {/* Top Row: Logo, Search, Actions */}
        <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4 lg:gap-8">

        {/* Logo */}
        <Logo />

        {/* Desktop Search Bar */}
        <div className="hidden lg:block flex-1 max-w-2xl mx-8">
          <GlobalSearch />
        </div>

        {/* Actions (Language, Pro Space, Hamburger) */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <LanguageSwitcher />
          <Link
            href="/portal/login"
            className="hidden sm:inline-block text-sm font-bold bg-teal-deep text-white px-5 md:px-6 py-2.5 rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect whitespace-nowrap"
          >
            {t('proSpace')}
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-teal-deep hover:bg-sage-light rounded-lg transition-colors"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar (visible only on mobile) */}
      <div className="lg:hidden px-4 pb-4">
        <GlobalSearch />
        </div>
      </div>

      {/* Desktop Navigation Row */}
      <div className="hidden lg:block border-t border-b border-sage-light/50 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center gap-10 h-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-anthracite-soft hover:text-teal-deep transition-colors whitespace-nowrap uppercase tracking-wider relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-soft transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-ivory-soft border-t border-sage-light px-4 py-6 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-base font-medium text-anthracite-soft hover:text-teal-deep transition-colors py-2 border-b border-sage-light/30"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/portal/login"
            onClick={() => setIsMenuOpen(false)}
            className="block text-center text-base font-semibold text-teal-deep border border-teal-deep rounded-xl px-4 py-3 hover:bg-sage-light transition-colors mt-6"
          >
            {t('proSpaceMobile')}
          </Link>
        </div>
      )}
    </header>
  );
}
