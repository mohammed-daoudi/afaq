'use client';

import React from 'react';
import { Link } from '@/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

const brands = [
  {
    slug: 'sotya',
    name: 'SOTYA',
    logo: '/gammelogo/sotya.jfif',
    cardBg: '#E52E2E',
    logoClass: 'object-cover scale-90',
    subtitle: 'COMPLÉMENTS ALIMENTAIRES',
    status: 'MARQUE ESPAGNOLE · DISPONIBLE AU MAROC',
    description: 'SOTYA propose une gamme diversifiée de compléments alimentaires dédiés à la nutrition et au bien-être au quotidien.',
  },
  {
    slug: 'naturamins-kids',
    name: 'Naturamins Kids',
    logo: '/gammelogo/nutramins.png',
    cardBg: '#D6EFFF',
    logoClass: 'object-cover',
    subtitle: 'NUTRITION PÉDIATRIQUE',
    status: 'MARQUE ESPAGNOLE · PROCHAIN LANCEMENT — JANVIER 2027',
    description: 'Naturamins Kids propose une gamme dédiée aux besoins nutritionnels de l’enfant, conçue pour accompagner les familles au quotidien.',
  },
  {
    slug: 'colagenova',
    name: 'Colagenova',
    logo: '/gammelogo/colagenova.png',
    cardBg: '#FFFFFF',
    logoClass: 'object-cover',
    subtitle: 'BEAUTÉ & NUTRITION',
    status: 'MARQUE ESPAGNOLE · PROCHAINEMENT AU MAROC',
    description: "Colagenova propose une gamme spécialisée dans la nutrition beauté à base de collagène, développée autour de solutions dédiées notamment à la beauté et au bien-être articulaire.",
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function MarquesPage() {
  return (
    <div className="min-h-screen bg-sage-light/20 pt-32 pb-24 overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Page Header */}
        <motion.div 
          initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
          className="max-w-4xl mx-auto text-center mb-20 space-y-6"
        >
          <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-gold-soft bg-white border border-gold-soft/20 rounded-full uppercase">
            NOS MARQUES
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-teal-deep">
            Notre portefeuille de marques
          </motion.h1>
          <motion.h2 variants={fadeUp} className="text-2xl font-medium text-teal-deep/80">
            Des marques espagnoles sélectionnées avec exigence
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-anthracite-soft/80 max-w-3xl mx-auto leading-relaxed">
            AFAQ HEALTH développe un portefeuille de marques espagnoles sélectionnées pour la qualité de leurs produits, leur savoir-faire et la pertinence de leurs gammes.
            <br/><br/>
            Notre portefeuille couvre plusieurs univers complémentaires, de la nutrition et des compléments alimentaires à la nutrition pédiatrique et à la beauté.
          </motion.p>
        </motion.div>

        {/* Brands List */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brands.map((brand, idx) => (
              <motion.div 
                key={brand.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="h-full"
              >
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-white h-full flex flex-col">
                  {/* Brand Visual Area — logo fills entire card */}
                  <div
                    className="relative overflow-hidden h-64 shrink-0"
                    style={{ backgroundColor: brand.cardBg }}
                  >
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className={brand.logoClass}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Brand Info Area */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-[11px] font-bold text-gold-soft uppercase tracking-widest mb-3">
                      {brand.subtitle}
                    </h3>
                    
                    <div className="mb-6">
                      <span className="inline-block px-2 py-1 rounded text-[10px] font-bold bg-sage-light/50 text-teal-deep uppercase tracking-wider">
                        {brand.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-anthracite-soft/80 leading-relaxed mb-8 flex-grow">
                      {brand.description}
                    </p>

                    <div className="pt-4 border-t border-gray-100">
                      <Link
                        href={`/produits?brand=${brand.slug}`}
                        className="inline-flex items-center gap-2 font-bold text-teal-deep hover:text-gold-soft transition-colors text-sm"
                      >
                        Découvrir {brand.name} <span>→</span>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
