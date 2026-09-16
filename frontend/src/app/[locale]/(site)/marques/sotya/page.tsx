'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';

const universes = [
  "Bien-être",
  "Sommeil",
  "Vitalité",
  "Immunité",
  "Beauté",
  "Santé spécifique"
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function SotyaPage() {
  return (
    <div className="min-h-screen bg-sage-light/20 pt-32 pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Hero */}
        <motion.div 
          initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
          className="max-w-4xl mx-auto text-center mb-24 space-y-8"
        >
          <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-teal-deep bg-white border border-teal-deep/20 rounded-full uppercase mb-4 shadow-sm">
            Distribution exclusive AFAQ Health — Maroc & Afrique de l'Ouest
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-teal-deep leading-tight">
            SOTYA
          </motion.h1>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-heading font-bold text-gold-soft">
            Des solutions nutritionnelles pour accompagner le quotidien.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-anthracite-soft/80 font-medium max-w-3xl mx-auto leading-relaxed">
            SOTYA est une marque européenne de compléments alimentaires proposant une gamme diversifiée destinée à accompagner différents besoins liés au bien-être, à la vitalité, à la beauté et à la santé au quotidien.
          </motion.p>
        </motion.div>

        {/* La marque */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-lg border border-sage-light/50 mb-24 text-center"
        >
          <h3 className="text-3xl font-heading font-bold text-teal-deep mb-6">À propos de la marque</h3>
          <p className="text-lg text-anthracite-soft/80 leading-relaxed italic">
            "Fondée en Espagne, SOTYA (Laboratoires Bescorp) a plus de 40 ans d'expérience dans la fabrication de compléments alimentaires. Notre mission est d'offrir des compléments nutritionnels efficaces avec un engagement strict envers la qualité et la traçabilité de nos matières premières. Tous nos produits sont fabriqués selon les normes européennes les plus exigeantes."
          </p>
        </motion.div>

        {/* Les univers SOTYA */}
        <div className="max-w-6xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-heading font-extrabold text-teal-deep mb-4">Les univers SOTYA</h2>
            <p className="text-xl text-anthracite-soft/80">Des gammes structurées pour répondre à chaque besoin.</p>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {universes.map((universe, index) => (
              <motion.div variants={fadeUp} key={index}>
                <Card className="border border-sage-light shadow-sm hover:shadow-md transition-all bg-white p-8 text-center group cursor-pointer h-full flex items-center justify-center">
                  <h3 className="text-xl font-bold text-teal-deep group-hover:text-gold-soft transition-colors">{universe}</h3>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* La gamme / CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          >
            <Card className="h-full bg-teal-deep text-white p-12 rounded-[2rem] border-none shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-3xl font-heading font-bold mb-4">Découvrez la gamme</h3>
              <p className="text-white/80 mb-8">
                Parcourez l'ensemble des références SOTYA homologuées au Maroc et disponibles dans notre catalogue exclusif.
              </p>
              <Link
                href="/produits"
                className="shimmer-effect bg-white text-teal-deep font-bold px-8 py-4 rounded-xl hover:bg-sage-light transition-all shadow-md"
              >
                Voir les produits
              </Link>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          >
            <Card className="h-full bg-white p-12 rounded-[2rem] border border-sage-light shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-3xl font-heading font-bold text-teal-deep mb-4">Où trouver SOTYA ?</h3>
              <p className="text-anthracite-soft/80 mb-8">
                Retrouvez les produits SOTYA auprès des pharmacies partenaires AFAQ Health à travers le Maroc.
              </p>
              <Link
                href="/pharmacies"
                className="inline-block bg-teal-deep text-white font-bold px-8 py-4 rounded-xl hover:bg-opacity-95 transition-all shadow-md"
              >
                Trouver une pharmacie
              </Link>
            </Card>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
