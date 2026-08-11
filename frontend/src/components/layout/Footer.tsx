import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-teal-deep text-white pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-heading font-bold text-2xl text-white">AFAQ Health</h3>
          </div>
          <p className="text-sm text-sage-light/80 max-w-xs">
            Importation et distribution exclusive de compléments alimentaires premium au Maroc et en Afrique de l'Ouest francophone.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gold-soft uppercase tracking-wider text-sm">Marques</h4>
          <ul className="space-y-2 text-sm text-sage-light/80">
            <li><Link href="/marques/sotya" className="hover:text-white transition-colors">SOTYA</Link></li>
            <li><Link href="/marques/colagenova" className="hover:text-white transition-colors">Colagenova</Link></li>
            <li><Link href="/marques/naturamins" className="hover:text-white transition-colors">Naturamins</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gold-soft uppercase tracking-wider text-sm">Société</h4>
          <ul className="space-y-2 text-sm text-sage-light/80">
            <li><Link href="/a-propos" className="hover:text-white transition-colors">À propos</Link></li>
            <li><Link href="/pourquoi-nous" className="hover:text-white transition-colors">Pourquoi nous</Link></li>
            <li><Link href="/notre-reseau" className="hover:text-white transition-colors">Notre réseau</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gold-soft uppercase tracking-wider text-sm">Professionnels</h4>
          <ul className="space-y-2 text-sm text-sage-light/80">
            <li><Link href="/portal/login" className="hover:text-white transition-colors">Portail B2B</Link></li>
            <li><Link href="/devenir-partenaire" className="hover:text-white transition-colors">Devenir partenaire</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact commercial</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6 border-t border-white/10 text-xs text-sage-light/60 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} AFAQ Health — Kénitra, Maroc. Tous droits réservés.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
          <span>·</span>
          <Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
          <span>·</span>
          <span>Conforme loi 09-08</span>
        </div>
      </div>
    </footer>
  );
}
