'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

const navLinks = [
  { href: '/produits', label: 'Nos produits' },
  { href: '/marques', label: 'Nos marques' },
  { href: '/pourquoi-nous', label: 'Pourquoi nous' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/notre-reseau', label: 'Notre réseau' },
  { href: '/localiser', label: 'Localiser' },
  { href: '/faq', label: 'FAQ' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sage-light bg-ivory-soft/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-anthracite-soft hover:text-teal-deep transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/portal/login"
            className="hidden sm:inline-block text-sm font-medium text-teal-deep border border-teal-deep rounded-full px-4 py-2 hover:bg-sage-light transition-colors"
          >
            Espace Pro
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-teal-deep hover:bg-sage-light rounded-lg transition-colors"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-ivory-soft border-t border-sage-light px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-base font-medium text-anthracite-soft hover:text-teal-deep transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/portal/login"
            onClick={() => setIsMenuOpen(false)}
            className="block text-center text-base font-semibold text-teal-deep border border-teal-deep rounded-xl px-4 py-3 hover:bg-sage-light transition-colors mt-4"
          >
            Espace Professionnel
          </Link>
        </div>
      )}
    </header>
  );
}
