'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ColagenovaPage() {
  return (
    <div className="min-h-screen bg-ivory-soft pt-32 pb-24 overflow-hidden flex flex-col items-center justify-center">
      <div className="container mx-auto px-4">
        
        {/* Hero */}
        <motion.div 
          initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-gold-soft bg-white border border-gold-soft/20 rounded-full uppercase shadow-sm">
              Prochainement
            </motion.div>
            <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-teal-deep bg-sage-light rounded-full uppercase shadow-sm">
              Exclusivité AFAQ HEALTH — Maroc & Afrique de l'Ouest
            </motion.div>
          </div>
          
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black text-teal-deep leading-tight">
            Colagenova
          </motion.h1>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-gold-soft">
            La nutrition beauté au cœur de la gamme.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-anthracite-soft/80 font-medium max-w-3xl mx-auto leading-relaxed">
            Colagenova est une marque spécialisée dans l'univers du collagène et de la nutrition beauté, qui rejoindra prochainement le portefeuille AFAQ HEALTH.
          </motion.p>
        </motion.div>

        {/* Message / Disclaimer */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-24"
        >
          <Card className="bg-white border border-sage-light text-center p-12 rounded-[2rem] shadow-lg">
            <h3 className="text-2xl font-bold text-teal-deep mb-4">Lancement en préparation</h3>
            <p className="text-lg text-anthracite-soft/80 mb-8">
              Nous finalisons actuellement les étapes nécessaires pour vous proposer cette gamme de qualité. Plus d'informations seront disponibles lors du lancement officiel.
            </p>
            <button className="bg-sage-light text-teal-deep font-bold px-8 py-4 rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect">
              Découvrir la marque
            </button>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
