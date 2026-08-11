import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const brands = [
  {
    slug: 'sotya',
    name: 'SOTYA',
    subtitle: 'HEALTH SUPPLEMENTS',
    origin: 'Espagne (Bescorp Health)',
    description: 'Laboratoire de référence en compléments alimentaires. 14 références homologuées AMMPS pour le lancement Maroc 2026 — stress, sommeil, immunité, vitalité, santé spécifique et beauté.',
    color: 'from-[#007B5F] to-[#004D3B]',
    status: 'active',
    productCount: 14,
    certifications: ['AMMPS', 'GMP', 'EU', 'ISO'],
  },
  {
    slug: 'colagenova',
    name: 'Colagenova',
    subtitle: 'Expert Collagène',
    origin: 'Espagne (Vaminter)',
    description: 'Gamme experte de collagène marin et de solutions beauté-mobilité, structurée par indication. Préparation réglementaire en cours.',
    color: 'from-[#D4A373] to-[#A67C52]',
    status: 'coming-2027',
    productCount: null,
    certifications: [],
  },
  {
    slug: 'naturamins',
    name: 'Naturamins',
    subtitle: 'Premium Nutrition',
    origin: 'Europe',
    description: 'Nouvelle marque du portefeuille, en cours de préparation réglementaire et commerciale pour le marché marocain.',
    color: 'from-[#2A9D8F] to-[#1A6B60]',
    status: 'preparation',
    productCount: null,
    certifications: [],
  }
];

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'active':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Disponible — 14 références
        </span>
      );
    case 'coming-2027':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
          Lancement Maroc prévu 2027
        </span>
      );
    case 'preparation':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
          En préparation réglementaire
        </span>
      );
    default:
      return null;
  }
}

export default function MarquesPage() {
  return (
    <div className="min-h-screen bg-ivory-soft pt-12 pb-24">
      <div className="container mx-auto px-4">

        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-6">
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-teal-deep bg-sage-light rounded-full uppercase">
            Nos Partenaires
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep">
            Laboratoires <span className="text-gold-soft">Européens</span>
          </h1>
          <p className="text-lg text-anthracite-soft/80 font-sans">
            Nous distribuons en exclusivité au Maroc et en Afrique de l'Ouest des marques de nutrition
            certifiées ISO 9001, fabriquées en Europe.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {brands.map((brand) => (
            <div key={brand.slug} className="group">
              <div className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-sage-light h-full flex flex-col ${brand.status !== 'active' ? 'opacity-80' : ''}`}>
                {/* Brand Header */}
                <div className={`h-44 w-full bg-gradient-to-br ${brand.color} relative overflow-hidden flex flex-col items-center justify-center p-6`}>
                  <div className="absolute inset-0 shimmer-loop opacity-20"></div>
                  <h2 className="text-4xl font-heading font-extrabold text-white relative z-10">{brand.name}</h2>
                  <span className="text-white/60 text-xs uppercase tracking-widest mt-2 relative z-10">{brand.subtitle}</span>
                </div>

                {/* Brand Content */}
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs font-bold text-gold-soft uppercase tracking-wider">
                      Fabrication: {brand.origin}
                    </div>
                  </div>

                  <StatusBadge status={brand.status} />

                  <p className="text-anthracite-soft/80 flex-grow my-5 text-sm leading-relaxed">
                    {brand.description}
                  </p>

                  {/* Certifications */}
                  {brand.certifications.length > 0 && (
                    <div className="flex gap-2 mb-5">
                      {brand.certifications.map((cert) => (
                        <span key={cert} className="text-[10px] font-bold text-teal-deep bg-sage-light px-2 py-1 rounded">
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}

                  {brand.status === 'active' ? (
                    <Link
                      href="/produits"
                      className="shimmer-effect text-center text-teal-deep font-semibold bg-sage-light rounded-xl py-3 px-4 hover:bg-teal-deep hover:text-white transition-all duration-300"
                    >
                      Voir les 14 références →
                    </Link>
                  ) : (
                    <div className="text-center text-anthracite-soft/40 font-medium py-3 text-sm">
                      Bientôt disponible
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
