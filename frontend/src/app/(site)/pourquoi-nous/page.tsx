'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import Image from 'next/image';
import { motion } from 'framer-motion';

const pillars = [
  {
    title: 'Références Homologuées',
    description: 'Toutes nos références sont systématiquement enregistrées auprès de la Direction du Médicament et de la Pharmacie (AMMPS) avant toute commercialisation.',
    icon: '📜',
    highlight: '20+ références',
  },
  {
    title: 'Exclusivité Territoriale',
    description: 'Nous détenons les droits exclusifs de représentation et de distribution sur l\'ensemble de nos territoires d\'implantation.',
    icon: '🌍',
    highlight: '9 pays',
  },
  {
    title: 'Fabrication Européenne',
    description: 'Nos laboratoires partenaires sont exclusivement basés en Europe et certifiés ISO 9001 et GMP pour garantir la plus haute qualité.',
    icon: '🇪🇺',
    highlight: '100% Européen',
  },
  {
    title: 'Conformité Réglementaire',
    description: 'Une maîtrise totale du cycle de vie du produit, de l\'importation à la distribution, dans le strict respect des réglementations locales.',
    icon: '🛡️',
    highlight: 'De bout en bout',
  },
  {
    title: 'Support Scientifique & Marketing',
    description: 'Un accompagnement quotidien des officines : formation continue, matériel de PLV, et conseil produit pour assurer le meilleur service au patient.',
    icon: '🤝',
    highlight: 'Accompagnement 360°',
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function PourquoiNousPage() {
  return (
    <div className="min-h-screen bg-ivory-soft pt-12 pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="space-y-6"
          >
            <motion.div variants={fadeUp} className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-teal-deep bg-sage-light rounded-full uppercase">
              Nos Engagements
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep">
              Pourquoi <span className="text-gold-soft">AFAQ Health ?</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-anthracite-soft/80 font-sans max-w-lg">
              L'excellence de la nutrition européenne, distribuée avec la plus grande rigueur réglementaire et commerciale. Nous sommes le lien de confiance entre les laboratoires et les professionnels de santé.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="relative h-[400px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50"
          >
            <Image 
              src="/tsawrsotya/pourquoi_nous_hero.png" 
              alt="Qualité et contrôle" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-teal-deep/10 pointer-events-none" />
          </motion.div>
        </div>

        {/* Pillars Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {pillars.map((pillar, index) => (
            <motion.div variants={fadeUp} key={index} className="h-full">
              <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white relative overflow-hidden group h-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-gold-soft transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">{pillar.icon}</div>
                    <div className="bg-sage-light text-teal-deep text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {pillar.highlight}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-teal-deep mb-4">{pillar.title}</h3>
                  <p className="text-anthracite-soft/80 leading-relaxed flex-grow">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
