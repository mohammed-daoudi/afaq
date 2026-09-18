'use client';

import React from 'react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-teal-deep text-white pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-heading font-bold text-2xl text-white">AFAQ HEALTH</h3>
          </div>
          <p className="text-sm text-sage-light/80 max-w-xs">
            {t('description')}
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-gold-soft uppercase tracking-wider text-sm">{t('company')}</h4>
          <ul className="space-y-2 text-sm text-sage-light/80">
            <li><Link href="/a-propos" className="hover:text-white transition-colors">{t('about')}</Link></li>
            <li><Link href="/marques" className="hover:text-white transition-colors">{t('brands')}</Link></li>
            <li><Link href="/produits" className="hover:text-white transition-colors">{t('products')}</Link></li>
            <li><Link href="/conseils" className="hover:text-white transition-colors">{t('advice')}</Link></li>
            <li><Link href="/pharmacies" className="hover:text-white transition-colors">{t('findPharmacy')}</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">{t('contact')}</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-gold-soft uppercase tracking-wider text-sm">{t('professionals')}</h4>
          <ul className="space-y-2 text-sm text-sage-light/80">

            <li><Link href="/contact" className="hover:text-white transition-colors">{t('partner')}</Link></li>
            <li><Link href="/portal/login" className="hover:text-white transition-colors">{t('proSpace')}</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-gold-soft uppercase tracking-wider text-sm">{t('informations')}</h4>
          <ul className="space-y-2 text-sm text-sage-light/80">
            <li><Link href="/mentions-legales" className="hover:text-white transition-colors">{t('legal')}</Link></li>
            <li><Link href="/confidentialite" className="hover:text-white transition-colors">{t('privacy')}</Link></li>
            <li><Link href="/cookies" className="hover:text-white transition-colors">{t('cookies')}</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6 border-t border-white/10 text-xs text-sage-light/60 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} AFAQ HEALTH — Kénitra, Maroc. {t('rights')}</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/mentions-legales" className="hover:text-white transition-colors">{t('legal')}</Link>
          <span>·</span>
          <Link href="/confidentialite" className="hover:text-white transition-colors">{t('privacy')}</Link>
          <span>·</span>
          <Link href="/cookies" className="hover:text-white transition-colors">{t('cookies')}</Link>
        </div>
      </div>
    </footer>
  );
}
