'use client';
import React, { useState } from 'react';
import { ProductCard } from '@/components/ui/ProductCard';
import {
  products,
  THERAPEUTIC_FAMILIES,
  FAMILY_COLORS,
  FAMILY_DESCRIPTIONS,
  FAMILY_COUNTS,
  type TherapeuticFamily,
} from '@/lib/products';

export default function ProduitsPage() {
  const [activeFamily, setActiveFamily] = useState<TherapeuticFamily | 'all'>('all');

  const filtered = activeFamily === 'all'
    ? products
    : products.filter((p) => p.category === activeFamily);

  return (
    <div className="min-h-screen bg-ivory-soft pt-12 pb-24">
      <div className="container mx-auto px-4">

        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-6">
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-teal-deep bg-sage-light rounded-full uppercase">
            Catalogue SOTYA 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep">
            14 Références <span className="text-gold-soft">Homologuées</span>
          </h1>
          <p className="text-lg text-anthracite-soft/80 font-sans">
            Organisées en 4 familles thérapeutiques. Certifiées AMMPS, GMP, EU et ISO.
            <br className="hidden sm:block" /> Fabriquées en Espagne — le naturel au service de votre bien-être au quotidien.
          </p>
        </div>

        {/* Family Filter Tabs */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveFamily('all')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFamily === 'all'
                  ? 'bg-teal-deep text-white shadow-lg scale-105'
                  : 'bg-white text-anthracite-soft hover:bg-sage-light border border-sage-light'
              }`}
            >
              Toutes ({products.length})
            </button>
            {THERAPEUTIC_FAMILIES.map((family) => {
              const colors = FAMILY_COLORS[family];
              const isActive = activeFamily === family;
              return (
                <button
                  key={family}
                  onClick={() => setActiveFamily(family)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? `text-white shadow-lg scale-105`
                      : `${colors.bg} ${colors.text} hover:opacity-80 border ${colors.border}`
                  }`}
                  style={isActive ? { backgroundColor: colors.accent } : undefined}
                >
                  {family} ({FAMILY_COUNTS[family]})
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Family Description */}
        {activeFamily !== 'all' && (
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div
              className="inline-block px-4 py-2 rounded-xl text-sm font-medium mb-3"
              style={{ backgroundColor: `${FAMILY_COLORS[activeFamily].accent}15`, color: FAMILY_COLORS[activeFamily].accent }}
            >
              {FAMILY_COUNTS[activeFamily]} référence{FAMILY_COUNTS[activeFamily] > 1 ? 's' : ''}
            </div>
            <p className="text-anthracite-soft/70 text-sm max-w-2xl mx-auto">
              {FAMILY_DESCRIPTIONS[activeFamily]}
            </p>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Professional CTA */}
        <div className="mt-24 max-w-4xl mx-auto bg-teal-deep rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-soft rounded-full opacity-10 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-ivory-soft rounded-full opacity-5 blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>

          <h2 className="text-3xl font-heading font-bold mb-4 relative z-10">Vous êtes un professionnel de santé ?</h2>
          <p className="text-sage-light mb-8 max-w-2xl mx-auto relative z-10">
            Pharmaciens, grossistes et distributeurs : accédez à vos tarifs négociés, passez commande et suivez vos livraisons depuis votre espace dédié.
          </p>
          <a
            href="/portal/login"
            className="shimmer-effect inline-block bg-gold-soft text-teal-deep font-bold px-8 py-4 rounded-xl hover:bg-white hover:shadow-lg transition-all relative z-10"
          >
            Accéder à l'Espace Professionnel
          </a>
        </div>

      </div>
    </div>
  );
}
