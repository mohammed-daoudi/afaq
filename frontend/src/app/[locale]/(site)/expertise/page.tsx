'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/navigation';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function ExpertisePage() {
  return (
    <div className="min-h-screen bg-white pb-24 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] lg:h-[70vh] flex items-end pb-24">
        <div className="absolute inset-0">
          <Image 
            src="/images/unsplash/science/microscope.jpg" 
            alt="Approche scientifique et recherche" 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-deep via-teal-deep/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
            className="max-w-4xl space-y-6"
          >
            <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-gold-soft bg-white/10 backdrop-blur-md rounded-full uppercase border border-white/20">
              Notre Expertise
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
              L'approche <span className="text-gold-soft font-light">scientifique</span>.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Au cœur de notre métier se trouve une exigence absolue : celle de la science. Découvrez comment nous sélectionnons et formulons des produits d'exception.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Chapitre 1: Sélection Rigoureuse */}
      <section className="py-24 relative bg-ivory-soft">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-teal-deep leading-tight">
                De la recherche à la formulation
              </h2>
              <div className="space-y-6 text-lg text-anthracite-soft/80 leading-relaxed ">
                <p>
                  Chaque complément alimentaire que nous introduisons sur le marché marocain est le fruit d'une sélection drastique. Notre équipe scientifique évalue les laboratoires partenaires sur des critères stricts : qualité des matières premières, biodisponibilité des actifs et stabilité des formulations.
                </p>
                <p>
                  Nous ne nous contentons pas de distribuer des produits ; nous décryptons la science qui les compose. Qu'il s'agisse de vitamines essentielles ou de complexes de plantes innovants, nous nous assurons que chaque dosage correspond aux réels besoins métaboliques.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="space-y-6">
                <Card className="p-8 border-none shadow-md bg-white rounded-3xl">
                  <div className="w-12 h-12 bg-sage-light text-teal-deep flex items-center justify-center rounded-2xl mb-6 text-2xl">🔬</div>
                  <h3 className="text-xl font-bold text-teal-deep mb-3">Recherche Clinique</h3>
                  <p className="text-anthracite-soft/70">Analyse des études validant l'efficacité des ingrédients actifs.</p>
                </Card>
                <Card className="p-8 border-none shadow-md bg-white rounded-3xl">
                  <div className="w-12 h-12 bg-sage-light text-teal-deep flex items-center justify-center rounded-2xl mb-6 text-2xl">🌱</div>
                  <h3 className="text-xl font-bold text-teal-deep mb-3">Pureté des Extraits</h3>
                  <p className="text-anthracite-soft/70">Contrôle de l'origine et de la traçabilité des matières premières.</p>
                </Card>
              </div>
              <div className="space-y-6 mt-12">
                <Card className="p-8 border-none shadow-md bg-white rounded-3xl">
                  <div className="w-12 h-12 bg-sage-light text-teal-deep flex items-center justify-center rounded-2xl mb-6 text-2xl">💊</div>
                  <h3 className="text-xl font-bold text-teal-deep mb-3">Biodisponibilité</h3>
                  <p className="text-anthracite-soft/70">Choix des formes galéniques offrant la meilleure absorption par l'organisme.</p>
                </Card>
                <Card className="p-8 border-none bg-white bg-teal-deep text-white rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect">
                  <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-2xl mb-6 text-2xl text-gold-soft">🛡️</div>
                  <h3 className="text-xl font-bold mb-3">Tolérance</h3>
                  <p className="text-white/70">Garantie d'absence d'effets secondaires grâce à des dosages optimisés.</p>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chapitre 2: Conformité et Sécurité */}
      <section className="py-24 relative bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
              className="relative h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl order-2 lg:order-1"
            >
              <Image 
                src="/images/unsplash/formulations/formulation_4.jpg" 
                alt="Laboratoire de conformité" 
                fill 
                className="object-cover" 
              />
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="space-y-8 order-1 lg:order-2"
            >
              <p className="text-sm font-bold text-gold-soft uppercase tracking-widest">
                Qualité Intransigeante
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-teal-deep leading-tight">
                La sécurité du patient, notre priorité absolue
              </h2>
              <div className="space-y-6 text-lg text-anthracite-soft/80 leading-relaxed ">
                <p>
                  Dans un marché de la santé de plus en plus complexe, la sécurité est non négociable. Avant d'atteindre les rayons de votre pharmacie, nos produits franchissent des étapes réglementaires exhaustives en accord avec les standards européens et marocains.
                </p>
                <p>
                  L'obtention du visa de commercialisation par le Ministère de la Santé (AMMPS) est pour nous le minimum requis. Nous allons plus loin en formant nos pharmaciens partenaires aux spécificités pharmacologiques de chaque produit.
                </p>
              </div>
              <div className="pt-6 border-t border-sage-light mt-8">
                <p className="text-teal-deep font-bold text-xl ">
                  "L'innovation n'a de sens que si elle est délivrée avec la garantie d'une sécurité totale."
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA Pro */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full mt-24"
      >
        <div className="relative text-center py-24 md:py-32 shadow-2xl overflow-hidden group">
          <Image src="/images/unsplash/formulations/formulation_3.jpg" alt="Nos standards de qualité" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-teal-deep/85 mix-blend-multiply" />
          <div className="relative z-10 px-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Explorez nos standards de qualité
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos gammes de produits, toutes validées par notre pôle scientifique pour vous offrir le meilleur de la nature.
            </p>
            <Link
              href="/produits"
              className="shimmer-effect inline-block bg-white text-teal-deep font-bold px-12 py-6 rounded-full text-lg hover:bg-gold-soft hover:text-white hover:shadow-2xl transition-all duration-300"
            >
              Découvrir le catalogue
            </Link>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
