'use client';

import React from 'react';
import { Link } from '@/navigation';

export function Footer() {

  return (
    <footer className="bg-teal-deep text-white pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-heading font-bold text-2xl text-white">AFAQ HEALTH</h3>
          </div>
          <p className="text-sm text-sage-light/80 max-w-xs leading-relaxed">
            Partenaire du développement des marques de santé européennes sur le marché marocain.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-gold-soft uppercase tracking-wider text-sm">NAVIGATION</h4>
          <ul className="space-y-2 text-sm text-sage-light/80">
            <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
            <li><Link href="/a-propos" className="hover:text-white transition-colors">Qui sommes-nous ?</Link></li>
            <li><Link href="/marques" className="hover:text-white transition-colors">Nos marques</Link></li>
            <li><Link href="/produits" className="hover:text-white transition-colors">Nos produits</Link></li>
            <li><Link href="/conseils" className="hover:text-white transition-colors">Nos conseils</Link></li>
            <li><Link href="/pharmacies" className="hover:text-white transition-colors">Où acheter ?</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-gold-soft uppercase tracking-wider text-sm">INFORMATIONS LÉGALES</h4>
          <ul className="space-y-2 text-sm text-sage-light/80">
            <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
            <li><Link href="/confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6 border-t border-white/10 text-xs text-sage-light/60 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} AFAQ HEALTH — Kénitra, Maroc. Tous droits réservés.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
          <span>·</span>
          <Link href="/confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
