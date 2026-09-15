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
          <h4 className="font-semibold mb-4 text-gold-soft uppercase tracking-wider text-sm">AFAQ HEALTH</h4>
          <ul className="space-y-2 text-sm text-sage-light/80">
            <li><Link href="/a-propos" className="hover:text-white transition-colors">À propos</Link></li>
            <li><Link href="/expertise" className="hover:text-white transition-colors">Notre expertise</Link></li>
            <li><Link href="/marques" className="hover:text-white transition-colors">Nos marques</Link></li>
            <li><Link href="/produits" className="hover:text-white transition-colors">Nos produits</Link></li>
            <li><Link href="/conseils" className="hover:text-white transition-colors">Conseils</Link></li>
            <li><Link href="/pharmacies" className="hover:text-white transition-colors">Trouver une pharmacie</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-gold-soft uppercase tracking-wider text-sm">PROFESSIONNELS</h4>
          <ul className="space-y-2 text-sm text-sage-light/80">

            <li><Link href="/contact" className="hover:text-white transition-colors">Devenir partenaire</Link></li>
            <li><Link href="/portal/login" className="hover:text-white transition-colors">Espace professionnel</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-gold-soft uppercase tracking-wider text-sm">INFORMATIONS</h4>
          <ul className="space-y-2 text-sm text-sage-light/80">
            <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
            <li><Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link></li>
            <li><Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
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
          <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
