'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ui/ProductCard';
import {
  products,
  THERAPEUTIC_FAMILIES,
  FAMILY_COLORS,
  FAMILY_DESCRIPTIONS,
  type TherapeuticFamily,
} from '@/lib/products';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ProduitsPage() {
  const [activeFamily, setActiveFamily] = useState<TherapeuticFamily | 'all'>('all');

  const filtered = activeFamily === 'all'
    ? products
    : products.filter((p) => p.category === activeFamily);

  return (
    <div className="min-h-screen bg-ivory-soft pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div 
            initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
            className="space-y-6"
          >
            <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-gold-soft bg-white border border-gold-soft/20 rounded-full uppercase">
              Nos Solutions
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-heading font-extrabold text-teal-deep leading-tight">
              La science au service <br/><span className="text-gold-soft italic font-serif font-light">de votre quotidien.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-anthracite-soft/80 font-serif leading-relaxed max-w-xl">
              Découvrez notre sélection rigoureuse de compléments alimentaires. Chaque formule est pensée pour répondre à un besoin spécifique avec la plus haute biodisponibilité.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="relative h-[400px] w-full rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <Image 
              src="/images/unsplash/formulations/plants_1.png" 
              alt="Plantes et formulations" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-teal-deep/10 mix-blend-multiply" />
          </motion.div>
        </div>

        {/* Family Filter Tabs */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveFamily('all')}
              className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                activeFamily === 'all'
                  ? 'bg-teal-deep text-white shadow-xl scale-105'
                  : 'bg-white text-anthracite-soft hover:bg-sage-light border border-sage-light'
              }`}
            >
              TOUTES LES SOLUTIONS
            </button>
            {THERAPEUTIC_FAMILIES.map((family) => {
              const colors = FAMILY_COLORS[family];
              const isActive = activeFamily === family;
              return (
                <button
                  key={family}
                  onClick={() => setActiveFamily(family)}
                  className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                    isActive
                      ? `text-white shadow-xl scale-105`
                      : `bg-white ${colors.text} hover:opacity-80 border border-gray-200`
                  }`}
                  style={isActive ? { backgroundColor: colors.accent } : undefined}
                >
                  {family.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Family Description */}
        {activeFamily !== 'all' && (
          <motion.div 
            key={activeFamily}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center mb-16 bg-white p-8 rounded-3xl shadow-sm border border-sage-light"
          >
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: FAMILY_COLORS[activeFamily].bg, color: FAMILY_COLORS[activeFamily].accent }}>
              <span className="text-2xl">✨</span>
            </div>
            <h2 className="text-2xl font-bold text-teal-deep mb-3" style={{ color: FAMILY_COLORS[activeFamily].accent }}>
              Gamme {activeFamily}
            </h2>
            <p className="text-anthracite-soft/80 text-lg font-serif">
              {FAMILY_DESCRIPTIONS[activeFamily]}
            </p>
          </motion.div>
        )}

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filtered.map((product) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={product.id}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
