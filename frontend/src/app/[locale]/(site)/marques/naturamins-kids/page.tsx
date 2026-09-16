'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

const approaches = [
  {
    title: "Pour les enfants",
    desc: "Produits conçus autour des besoins nutritionnels correspondant aux différentes étapes de l'enfance, selon les références de la gamme."
  },
  {
    title: "Pour les parents",
    desc: "Des informations claires sur les produits, leur composition, leur utilisation et les précautions à respecter."
  },
  {
    title: "Pour les professionnels",
    desc: "Une gamme destinée à être développée avec l'accompagnement du réseau pharmaceutique."
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function NaturaminsKidsPage() {
  return (
    <div className="min-h-screen bg-sage-light/20 pt-32 pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Hero */}
        <motion.div 
          initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
          className="max-w-4xl mx-auto text-center mb-24 space-y-8"
        >
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-teal-deep bg-white border border-teal-deep/20 rounded-full uppercase shadow-sm">
              Exclusivité AFAQ Health
            </motion.div>
            <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-gold-soft bg-gold-soft/10 rounded-full uppercase shadow-sm">
              Prochain lancement au Maroc
            </motion.div>
          </div>
          
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-teal-deep leading-tight">
            Naturamins Kids
          </motion.h1>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-heading font-bold text-teal-deep/70">
            Une gamme dédiée à la nutrition des enfants.
          </motion.h2>
          <div className="space-y-4">
            <motion.p variants={fadeUp} className="text-xl text-anthracite-soft/80 font-medium max-w-3xl mx-auto leading-relaxed">
              Naturamins Kids rejoint le portefeuille exclusif d'AFAQ Health au Maroc et en Afrique de l'Ouest.
            </motion.p>
            <motion.p variants={fadeUp} className="text-lg text-anthracite-soft/80 max-w-3xl mx-auto leading-relaxed">
              Cette gamme pédiatrique a été sélectionnée pour répondre à des besoins nutritionnels spécifiques des enfants et accompagner les familles dans leur quotidien.
            </motion.p>
          </div>
        </motion.div>

        {/* Notre approche */}
        <div className="max-w-6xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-heading font-extrabold text-teal-deep mb-4">Notre approche</h2>
            <p className="text-xl text-anthracite-soft/80">Une vision globale pour la santé de demain.</p>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {approaches.map((approach, index) => (
              <motion.div variants={fadeUp} key={index}>
                <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white p-10 h-full">
                  <h3 className="text-2xl font-bold text-teal-deep mb-4">{approach.title}</h3>
                  <p className="text-anthracite-soft/80 leading-relaxed">
                    {approach.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* La gamme (Coming Soon) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-sage-light text-center p-12 md:p-16 rounded-[3rem] shadow-sm border border-teal-deep/10">
            <h2 className="text-3xl font-heading font-bold text-teal-deep mb-4">
              La gamme est en cours de préparation.
            </h2>
            <p className="text-lg text-anthracite-soft/80">
              Restez à l'écoute, les fiches produits seront bientôt disponibles.
            </p>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
