'use client';

import React from 'react';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

const brands = [
  {
    slug: 'sotya',
    name: 'SOTYA',
    subtitle: 'Compléments alimentaires',
    origin: 'Espagne',
    description: 'Une marque européenne proposant une gamme diversifiée de solutions nutritionnelles pour accompagner le bien-être et la santé au quotidien.',
    color: 'from-[#007B5F] to-[#004D3B]',
    status: 'ACTUELLEMENT DISPONIBLE',
    statusColor: 'bg-green-100 text-green-800'
  },
  {
    slug: 'naturamins-kids',
    name: 'Naturamins Kids',
    subtitle: 'Nutrition pédiatrique',
    origin: 'Europe',
    description: 'Une gamme dédiée aux besoins nutritionnels des enfants, conçue pour accompagner les familles au quotidien.',
    color: 'from-[#2A9D8F] to-[#1A6B60]',
    status: 'PROCHAIN LANCEMENT',
    statusColor: 'bg-teal-100 text-teal-800'
  },
  {
    slug: 'colagenova',
    name: 'Colagenova',
    subtitle: 'Beauté & nutrition',
    origin: 'Espagne',
    description: 'Une gamme spécialisée autour du collagène et de la nutrition beauté, destinée à rejoindre progressivement le portefeuille commercial d\'AFAQ Health.',
    color: 'from-[#D4A373] to-[#A67C52]',
    status: 'PROCHAINEMENT',
    statusColor: 'bg-gold-soft/20 text-gold-soft'
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
          className="max-w-4xl mx-auto text-center mb-20 space-y-8"
        >
          <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-gold-soft bg-white border border-gold-soft/20 rounded-full uppercase">
            Portefeuille
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-teal-deep">
            Nos marques exclusives
          </motion.h1>
          <motion.p variants={fadeUp} className="text-xl text-anthracite-soft/80 font-medium max-w-3xl mx-auto leading-relaxed">
            AFAQ Health développe un portefeuille de marques internationales bénéficiant de droits de distribution exclusifs au Maroc et en Afrique de l'Ouest.
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
                  {/* Brand Visual Area */}
                  <div className={`bg-gradient-to-br ${brand.color} p-10 flex flex-col items-center justify-center relative overflow-hidden h-64 shrink-0`}>
                    <div className="absolute inset-0 shimmer-loop opacity-10" />
                    <h2 className="text-4xl font-heading font-black text-white relative z-10 text-center">
                      {brand.name}
                    </h2>
                    <p className="text-white/80 uppercase tracking-widest text-xs mt-3 font-bold relative z-10 text-center">
                      {brand.subtitle}
                    </p>
                  </div>

                  {/* Brand Info Area */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-sage-light text-teal-deep uppercase tracking-wider">
                        Fabrication: {brand.origin}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${brand.statusColor}`}>
                        {brand.status}
                      </span>
                    </div>

                    <h3 className="text-[11px] font-bold text-gold-soft uppercase tracking-widest mb-3">
                      Distribution exclusive AFAQ Health — Maroc & Afrique de l'Ouest
                    </h3>
                    
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
