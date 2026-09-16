'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function AProposPage() {
  const t = useTranslations('AboutPage');

  const values = [
    { title: t('value1Title'), description: t('value1Desc'), icon: '🔬' },
    { title: t('value2Title'), description: t('value2Desc'), icon: '📄' },
    { title: t('value3Title'), description: t('value3Desc'), icon: '🤝' },
  ];

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
              {t('ourManifesto')}
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-tight">
              {t('heroTitle')} <span className="text-gold-soft italic font-serif font-light">{t('heroHighlight')}</span>.
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
                {t('historyTitle')}
              </h2>
              <div className="space-y-6 text-lg text-anthracite-soft/80 leading-relaxed font-serif">
                <p>{t('historyP1')}</p>
                <p>{t('historyP2')}</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
              className="relative h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <Image 
                src="/images/unsplash/science/colabb.jpg" 
                alt="Notre engagement" 
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
              className="relative h-[600px] w-full order-2 lg:order-1"
            >
              <div className="absolute top-0 left-0 w-[75%] h-[75%] rounded-[2rem] overflow-hidden shadow-2xl z-10">
                <Image src="/images/unsplash/comp/sick_man.png" alt="Satisfaction patient" fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-[65%] h-[60%] rounded-[2rem] overflow-hidden shadow-2xl z-20 border-4 border-white">
                <Image src="/images/unsplash/comp/sick_child.jpg" alt="Soins et famille" fill className="object-cover" />
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="space-y-8 order-1 lg:order-2"
            >
              <p className="text-sm font-bold text-gold-soft uppercase tracking-widest">
                {t('humanFirst')}
              </p>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-teal-deep leading-tight">
                {t('qualityPromise')}
              </h2>
              <div className="space-y-6 text-lg text-anthracite-soft/80 leading-relaxed font-serif">
                <p>{t('qualityP1')}</p>
                <p>{t('qualityP2')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs - Hero Style Image */}
      <section className="relative w-full h-[60vh] lg:h-[70vh] flex items-end pb-24 mt-24">
        <div className="absolute inset-0">
          <Image src="/images/unsplash/science/atibba.jpg" alt="Équipe professionnelle" fill className="object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-deep via-teal-deep/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
            className="max-w-4xl space-y-6"
          >
            <motion.h2 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-tight">
              {t('pillarsTitle')} <span className="text-gold-soft italic font-serif font-light">{t('pillarsHighlight')}</span>.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-white/90 font-serif leading-relaxed max-w-2xl">
              {t('pillarsSubtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-24 bg-teal-deep text-white relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}
                className="bg-white/5 border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 transition-colors relative overflow-hidden group"
              >
                <div className="text-7xl font-serif italic font-light text-gold-soft/20 absolute -top-4 -right-2 group-hover:text-gold-soft/40 transition-colors duration-500">
                  0{index + 1}
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 mt-4">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed font-serif">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION NOTRE EXPERTISE --- */}
      <section className="relative w-full h-[60vh] lg:h-[70vh] flex items-end pb-24 mt-24">
        <div className="absolute inset-0">
          <Image src="/images/unsplash/science/microscope.jpg" alt="Approche scientifique et recherche" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-deep via-teal-deep/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
            className="max-w-4xl space-y-6"
          >
            <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-gold-soft bg-white/10 backdrop-blur-md rounded-full uppercase border border-white/20">
              {t('ourExpertise')}
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-tight">
              {t('scientificApproach')} <span className="text-gold-soft italic font-serif font-light">{t('scientificHighlight')}</span>.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-white/90 font-serif leading-relaxed max-w-2xl">
              {t('scientificSubtitle')}
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
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-teal-deep leading-tight">
                {t('researchToFormulation')}
              </h2>
              <div className="space-y-6 text-lg text-anthracite-soft/80 leading-relaxed font-serif">
                <p>{t('researchP1')}</p>
                <p>{t('researchP2')}</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="space-y-6">
                <Card className="p-8 border-none shadow-md bg-white rounded-3xl">
                  <div className="w-12 h-12 bg-sage-light text-teal-deep flex items-center justify-center rounded-2xl mb-6 text-2xl">🔬</div>
                  <h3 className="text-xl font-bold text-teal-deep mb-3">{t('clinicalResearch')}</h3>
                  <p className="text-anthracite-soft/70">{t('clinicalResearchDesc')}</p>
                </Card>
                <Card className="p-8 border-none shadow-md bg-white rounded-3xl">
                  <div className="w-12 h-12 bg-sage-light text-teal-deep flex items-center justify-center rounded-2xl mb-6 text-2xl">🌱</div>
                  <h3 className="text-xl font-bold text-teal-deep mb-3">{t('extractPurity')}</h3>
                  <p className="text-anthracite-soft/70">{t('extractPurityDesc')}</p>
                </Card>
              </div>
              <div className="space-y-6 mt-12">
                <Card className="p-8 border-none shadow-md bg-white rounded-3xl">
                  <div className="w-12 h-12 bg-sage-light text-teal-deep flex items-center justify-center rounded-2xl mb-6 text-2xl">💊</div>
                  <h3 className="text-xl font-bold text-teal-deep mb-3">{t('bioavailability')}</h3>
                  <p className="text-anthracite-soft/70">{t('bioavailabilityDesc')}</p>
                </Card>
                <Card className="p-8 border-none shadow-md bg-white rounded-3xl bg-teal-deep text-white">
                  <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-2xl mb-6 text-2xl text-gold-soft">🛡️</div>
                  <h3 className="text-xl font-bold mb-3">{t('tolerance')}</h3>
                  <p className="text-white/70">{t('toleranceDesc')}</p>
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
              <Image src="/images/unsplash/formulations/formulation_4.jpg" alt="Laboratoire de conformité" fill className="object-cover" />
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="space-y-8 order-1 lg:order-2"
            >
              <p className="text-sm font-bold text-gold-soft uppercase tracking-widest">
                {t('uncompromising')}
              </p>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-teal-deep leading-tight">
                {t('safetyTitle')}
              </h2>
              <div className="space-y-6 text-lg text-anthracite-soft/80 leading-relaxed font-serif">
                <p>{t('safetyP1')}</p>
                <p>{t('safetyP2')}</p>
              </div>
              <div className="pt-6 border-t border-sage-light mt-8">
                <p className="text-teal-deep font-bold text-xl italic font-serif">
                  {t('safetyQuote')}
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              {t('ctaTitle')}
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto font-serif leading-relaxed">
              {t('ctaSubtitle')}
            </p>
            <Link
              href="/produits"
              className="shimmer-effect inline-block bg-white text-teal-deep font-bold px-12 py-6 rounded-full text-lg hover:bg-gold-soft hover:text-white hover:shadow-2xl transition-all duration-300"
            >
              {t('ctaButton')}
            </Link>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
