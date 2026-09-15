'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import Image from 'next/image';
import { motion } from 'framer-motion';

const values = [
  {
    title: 'Exigence Scientifique',
    description: 'Chaque produit distribué fait l\'objet d\'un examen minutieux de sa formulation et de son efficacité clinique.',
    icon: '🔬',
  },
  {
    title: 'Transparence & Conformité',
    description: 'Nous garantissons un respect absolu des normes réglementaires et des standards pharmaceutiques marocains.',
    icon: '📄',
  },
  {
    title: 'Soutien Continu',
    description: 'De la formation des pharmaciens au conseil patient, nous assurons une présence constante sur le terrain.',
    icon: '🤝',
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-white pb-24 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] lg:h-[80vh] flex items-end pb-24">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80" 
            alt="Recherche et exigence médicale" 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-deep via-teal-deep/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
            className="max-w-4xl space-y-6"
          >
            <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-gold-soft bg-white/10 backdrop-blur-md rounded-full uppercase border border-white/20">
              Notre Manifeste
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-tight">
              Rehausser les standards de <span className="text-gold-soft italic font-serif font-light">santé</span>.
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Chapitre 1: Notre Histoire */}
      <section className="py-24 relative bg-ivory-soft">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-teal-deep leading-tight">
                Une vision née d'une conviction profonde
              </h2>
              <div className="space-y-6 text-lg text-anthracite-soft/80 leading-relaxed font-serif">
                <p>
                  Créée avec l'ambition de rapprocher les consommateurs marocains des meilleurs standards européens, AFAQ Health n'est pas un simple distributeur, c'est un créateur de ponts entre l'innovation scientifique et le besoin patient.
                </p>
                <p>
                  Nous avons constaté un fossé entre les solutions de santé naturelles disponibles à l'international et celles accessibles localement. Notre mission est devenue évidente : identifier des marques d'exception, certifiées, et les implanter durablement sur le marché marocain et ouest-africain.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
              className="relative h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80" 
                alt="Équipe professionnelle" 
                fill 
                className="object-cover" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chapitre 2: Le Patient au Centre */}
      <section className="py-24 relative bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
              className="relative h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl order-2 lg:order-1"
            >
              <Image 
                src="https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=800&q=80" 
                alt="Satisfaction patient" 
                fill 
                className="object-cover" 
              />
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="space-y-8 order-1 lg:order-2"
            >
              <p className="text-sm font-bold text-gold-soft uppercase tracking-widest">
                L'humain avant tout
              </p>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-teal-deep leading-tight">
                Chaque produit est une promesse de qualité
              </h2>
              <div className="space-y-6 text-lg text-anthracite-soft/80 leading-relaxed font-serif">
                <p>
                  L'écosystème que nous avons construit repose sur un engagement sans faille envers la santé publique. Chaque référence importée passe par un filtre rigoureux d'approbations (AMMPS), garantissant ainsi au pharmacien de délivrer un conseil sûr et au patient de consommer un produit efficace.
                </p>
                <p>
                  AFAQ Health s'engage à accompagner les professionnels de la santé dans leur quotidien, avec des formations, des fiches techniques détaillées et un support constant.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-24 bg-teal-deep text-white relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">Nos piliers d'excellence</h2>
            <p className="text-xl text-white/80 font-serif">Les fondations sur lesquelles nous bâtissons notre réseau de distribution.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}
                className="bg-white/5 border border-white/10 p-10 rounded-[2rem] backdrop-blur-sm"
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gold-soft mb-4">{item.title}</h3>
                <p className="text-white/70 leading-relaxed font-serif">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
