'use client';
import { useText } from '@/lib/useText';


import React from 'react';
import { Link } from '@/navigation';
import { useCookiePreferences } from '@/context/CookiePreferencesContext';

export function Footer() {
  const tx = useText();
  const { openPreferences } = useCookiePreferences();

  return (
    <footer className="bg-teal-deep text-white pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <h3 className="font-bold text-2xl text-white"><bdi dir="ltr">{tx("AFAQ HEALTH")}</bdi></h3>
            </Link>
          </div>
          <p className="text-sm text-sage-light/80 max-w-xs leading-relaxed">{tx("Partenaire du développement des marques de santé européennes sur le marché marocain.")}</p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-gold-soft uppercase tracking-wider text-sm">{tx("NAVIGATION")}</h4>
          <ul className="space-y-2 text-sm text-sage-light/80">
            <li><Link href="/" className="hover:text-white transition-colors">{tx("Accueil")}</Link></li>
            <li><Link href="/a-propos" className="hover:text-white transition-colors">{tx("Qui sommes-nous ?")}</Link></li>
            <li><Link href="/marques" className="hover:text-white transition-colors">{tx("Nos marques")}</Link></li>
            <li><Link href="/produits" className="hover:text-white transition-colors">{tx("Nos produits")}</Link></li>
            <li><Link href="/conseils" className="hover:text-white transition-colors">{tx("Nos conseils")}</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">{tx("FAQ")}</Link></li>
            <li><Link href="/pharmacies" className="hover:text-white transition-colors">{tx("Où acheter ?")}</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">{tx("Contact")}</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-gold-soft uppercase tracking-wider text-sm">{tx("INFORMATIONS LÉGALES")}</h4>
          <ul className="space-y-2 text-sm text-sage-light/80">
            <li><Link href="/mentions-legales" className="hover:text-white transition-colors">{tx("Mentions légales")}</Link></li>
            <li><Link href="/confidentialite" className="hover:text-white transition-colors">{tx("Politique de confidentialité")}</Link></li>
            <li><Link href="/cookies" className="hover:text-white transition-colors">{tx("Politique des cookies")}</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6 border-t border-white/10 text-xs text-sage-light/60 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {tx(new Date().getFullYear())}{tx(" AFAQ HEALTH — Kénitra, Maroc. Tous droits réservés.")}</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 md:mt-0">
          <Link href="/mentions-legales" className="hover:text-white transition-colors">{tx("Mentions légales")}</Link>
          <span>·</span>
          <Link href="/confidentialite" className="hover:text-white transition-colors">{tx("Politique de confidentialité")}</Link>
          <span>·</span>
          <button id="afaq-cookie-settings" type="button" onClick={openPreferences} aria-haspopup="dialog" className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-soft">{tx("Cookies")}</button>
        </div>
      </div>
    </footer>
  );
}
