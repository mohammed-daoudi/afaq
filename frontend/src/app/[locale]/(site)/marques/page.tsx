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
    logo: '/gammelogo/sotyaaa.jpg',
    cardBg: '#FFFFFF',
    logoClass: 'object-cover scale-[0.75]',
    subtitle: 'COMPLÉMENTS ALIMENTAIRES',
    status: 'MARQUE ESPAGNOLE · DISPONIBLE AU MAROC',
    description: 'SOTYA propose une gamme diversifiée de produits dédiés au bien-être et à la qualité de vie au quotidien.',
  },
  {
    slug: 'naturamins-kids',
    name: 'Naturamins Kids',
    logo: '/gammelogo/naturamins.jpeg',
    cardBg: '#FFFFFF',
    logoClass: 'object-cover',
    subtitle: 'NUTRITION PÉDIATRIQUE',
    status: 'MARQUE ESPAGNOLE · PROCHAIN LANCEMENT — JANVIER 2027',
    description: 'Naturamins Kids propose une gamme dédiée aux besoins nutritionnels de l’enfant, conçue pour accompagner les familles au quotidien.',
  },
  {
    slug: 'colagenova',
    name: 'Colagenova',
    logo: '/gammelogo/colagenova.jpg',
    cardBg: '#FFFFFF',
    logoClass: 'object-contain scale-90',
    subtitle: 'BEAUTÉ & NUTRITION',
    status: 'MARQUE ESPAGNOLE · PROCHAINEMENT AU MAROC',
    description: "COLAGENOVA propose une gamme spécialisée à base de collagène, développée pour accompagner la beauté et le confort articulaire.",
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function MarquesPage() {
  return (
    <div className="min-h-screen bg-sage-light/20 pt-8 pb-24 overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Page Header */}
        <motion.div 
          initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
          className="max-w-4xl mx-auto text-center mb-20 space-y-6"
        >
          <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-gold-soft bg-white border border-gold-soft/20 rounded-full uppercase">
            NOS MARQUES
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-teal-deep">
            Notre portefeuille de marques
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-anthracite-soft/80 max-w-3xl mx-auto leading-relaxed">
            AFAQ HEALTH construit un portefeuille de marques européennes sélectionnées pour leur qualité, leur savoir-faire et leur capacité à répondre durablement aux besoins en matière de santé et de bien-être.
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
                <Card className="group cursor-pointer overflow-hidden border-none shadow hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col">
                  <div className="p-4 md:p-6 flex flex-col flex-1">
                    <div
                      className="relative w-full aspect-[4/3] mb-2 flex items-center justify-center overflow-hidden rounded-xl"
                      style={{ backgroundColor: brand.cardBg }}
                    >
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className={`object-contain transition-transform duration-500 group-hover:scale-105 p-4 mix-blend-multiply ${brand.logoClass.replace('object-contain', '').replace('object-cover', '')}`}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    <div className="flex flex-col flex-1 text-left">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-soft mb-1 line-clamp-1">
                        {brand.subtitle}
                      </span>
                      
                      <h3 className="font-bold text-base md:text-lg text-anthracite-deep leading-snug group-hover:text-teal-deep transition-colors line-clamp-2 mb-2">
                        {brand.name}
                      </h3>
                      
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1.5 rounded text-xs font-bold bg-sage-light/50 text-teal-deep uppercase tracking-wider">
                          {brand.status}
                        </span>
                      </div>
                      
                      <p className="text-sm md:text-[15px] text-anthracite-soft mt-1.5 line-clamp-3 flex-grow leading-relaxed">
                        {brand.description}
                      </p>

                      <div className="mt-4 flex items-center text-teal-deep text-sm font-bold group-hover:text-gold-soft transition-colors border-t border-gray-100 pt-3">
                        <Link
                          href={`/produits?brand=${brand.slug}`}
                          className="w-full flex items-center"
                        >
                          Découvrir {brand.name} <span className="ml-1">→</span>
                        </Link>
                      </div>
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
