'use client';

import React from 'react';
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

  return (
    <div className="min-h-screen bg-white pb-24 overflow-hidden">
      
      {/* SECTION 1 — EN-TÊTE */}
      <section className="relative w-full h-[70vh] lg:h-[80vh] flex items-end pb-24">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80" 
            alt="Hero Background" 
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
              {t('heroSurtitre')}
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-tight">
              {t('heroTitle')}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-white/90 font-serif leading-relaxed max-w-2xl">
              {t('heroSubtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Hero Text content below image */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl space-y-8 text-lg text-anthracite-soft/80 leading-relaxed font-serif text-center">
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            {t('heroText1')}
          </motion.p>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            {t('heroText2')}
          </motion.p>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-teal-deep font-bold text-2xl italic">
            {t('heroHighlight')}
          </motion.p>
        </div>
      </section>

      {/* NOTRE MISSION */}
      <section className="py-24 relative bg-ivory-soft">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-teal-deep leading-tight">
                {t('missionTitle')}
              </h2>
              <p className="text-2xl text-gold-soft font-serif italic">
                {t('missionSubtitle')}
              </p>
              <div className="space-y-6 text-lg text-anthracite-soft/80 leading-relaxed font-serif">
                <p>{t('missionText1')}</p>
                <p>{t('missionText2')}</p>
              </div>

              {/* Chaîne de valeur */}
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-sage-light mt-8">
                <h3 className="text-sm font-bold text-teal-deep uppercase tracking-widest mb-6">{t('chainTitle')}</h3>
                <div className="space-y-4 font-serif text-anthracite-soft">
                  <div className="flex items-center gap-3"><span className="text-gold-soft">↓</span> {t('chain1')}</div>
                  <div className="flex items-center gap-3"><span className="text-gold-soft">↓</span> <strong>{t('chain2')}</strong></div>
                  <div className="flex items-center gap-3"><span className="text-gold-soft">↓</span> {t('chain3')}</div>
                  <div className="flex items-center gap-3"><span className="text-gold-soft">↓</span> {t('chain4')}</div>
                  <div className="flex items-center gap-3"><span className="text-gold-soft">↓</span> {t('chain5')}</div>
                </div>
              </div>

              {/* Accompagnement */}
              <div className="space-y-4 mt-8">
                <h3 className="text-sm font-bold text-teal-deep uppercase tracking-widest">{t('accompagnementTitle')}</h3>
                <ul className="space-y-2 text-anthracite-soft font-serif">
                  <li>{t('accompagnement1')}</li>
                  <li>{t('accompagnement2')}</li>
                  <li className="italic text-sm text-anthracite-soft/60 mt-2">{t('accompagnement3')}</li>
                </ul>
              </div>

              <div className="pt-6 border-t border-sage-light mt-8">
                <p className="text-teal-deep font-bold text-xl italic font-serif">
                  {t('missionClosing')}
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
              className="relative h-[800px] w-full rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <Image 
                src="/images/unsplash/science/colabb.jpg" 
                alt="Mission" 
                fill 
                className="object-cover" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* NOTRE POSITIONNEMENT & NOTRE EXPERTISE */}
      <section className="py-24 relative bg-white">
        <div className="container mx-auto px-4 max-w-7xl space-y-16">
          
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <p className="text-sm font-bold text-gold-soft uppercase tracking-widest">
              {t('expertiseSurtitre')}
            </p>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-teal-deep leading-tight">
              {t('expertiseTitle')}
            </h2>
            <div className="space-y-4 text-lg text-anthracite-soft/80 leading-relaxed font-serif">
              <p>{t('expertiseText1')}</p>
              <p>{t('expertiseText2')}</p>
              <p className="font-bold text-teal-deep">{t('expertiseText3')}</p>
            </div>
          </div>

          <div className="relative w-full h-[400px] rounded-[2rem] overflow-hidden shadow-2xl mb-16">
             <Image src="/images/unsplash/science/microscope.jpg" alt="Expertise" fill className="object-cover" />
             <div className="absolute inset-0 bg-teal-deep/60" />
             <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-3xl lg:text-4xl font-heading font-bold text-white text-center px-4">
                  {t('expertiseSubtitle')}
                </h3>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map((num) => (
              <motion.div 
                key={num} 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-ivory-soft p-8 rounded-[2rem] hover:shadow-lg transition-all"
              >
                <h4 className="text-lg font-bold text-teal-deep mb-4">{t(`exp${num}Title` as any)}</h4>
                <p className="text-anthracite-soft/80 font-serif leading-relaxed">{t(`exp${num}Desc` as any)}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* NOTRE RÉSEAU */}
      <section className="py-24 relative bg-teal-deep text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
              className="relative h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl order-2 lg:order-1"
            >
              <Image src="/images/unsplash/science/scientist_microscope.png" alt="Réseau" fill className="object-cover" />
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="space-y-8 order-1 lg:order-2"
            >
              <p className="text-sm font-bold text-gold-soft uppercase tracking-widest">
                {t('reseauSurtitre')}
              </p>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
                {t('reseauTitle')}
              </h2>
              <p className="text-xl text-white/90 italic font-serif">
                {t('reseauSubtitle')}
              </p>
              <p className="text-lg text-white/80 font-serif leading-relaxed">
                {t('reseauText')}
              </p>
              
              <div className="space-y-6 mt-8">
                {[1,2,3,4].map((num) => (
                  <div key={num} className="border-l-2 border-gold-soft pl-6">
                    <h4 className="text-lg font-bold mb-2">{t(`net${num}Title` as any)}</h4>
                    <p className="text-white/70 font-serif">{t(`net${num}Desc` as any)}</p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/20 mt-8">
                <p className="text-gold-soft font-bold text-xl italic font-serif">
                  {t('reseauClosing')}
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* NOS ENGAGEMENTS */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
            <p className="text-sm font-bold text-gold-soft uppercase tracking-widest">
              {t('engagementsSurtitre')}
            </p>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-teal-deep leading-tight">
              {t('engagementsTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1,2,3,4].map((num) => (
              <motion.div 
                key={num} 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-ivory-soft p-8 rounded-[2rem] hover:shadow-lg transition-all text-center border border-sage-light/30"
              >
                <h3 className="text-xl font-bold text-teal-deep mb-4">{t(`eng${num}Title` as any)}</h3>
                <p className="text-anthracite-soft/80 font-serif leading-relaxed">{t(`eng${num}Desc` as any)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTRE PORTEFEUILLE */}
      <section className="py-24 relative bg-ivory-soft">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
            <p className="text-sm font-bold text-gold-soft uppercase tracking-widest">
              {t('portefeuilleSurtitre')}
            </p>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-teal-deep leading-tight">
              {t('portefeuilleTitle')}
            </h2>
            <p className="text-lg text-anthracite-soft/80 font-serif leading-relaxed">
              {t('portefeuilleSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map((num) => (
              <div key={num} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-sage-light flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-gold-soft uppercase tracking-widest mb-4">
                    {t(`brand${num}Status` as any)}
                  </div>
                  <h3 className="text-2xl font-bold text-teal-deep mb-4">{t(`brand${num}Title` as any)}</h3>
                  <p className="text-anthracite-soft/80 font-serif leading-relaxed mb-8">
                    {t(`brand${num}Desc` as any)}
                  </p>
                </div>
                <Link href="/produits" className="text-teal-deep font-bold hover:text-gold-soft transition-colors flex items-center gap-2">
                  {t(`brand${num}Link` as any)} <span>→</span>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link
              href="/marques"
              className="inline-block bg-teal-deep text-white font-bold px-8 py-4 rounded-xl hover:bg-gold-soft hover:shadow-lg transition-all"
            >
              {t('allBrandsBtn')} →
            </Link>
          </div>
        </div>
      </section>

      {/* NOTRE AMBITION */}
      <section className="py-24 relative bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="space-y-8"
            >
              <p className="text-sm font-bold text-gold-soft uppercase tracking-widest">
                {t('ambitionSurtitre')}
              </p>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-teal-deep leading-tight">
                {t('ambitionTitle')}
              </h2>
              <div className="space-y-6 text-lg text-anthracite-soft/80 leading-relaxed font-serif">
                <p>{t('ambitionText1')}</p>
                <p>{t('ambitionText2')}</p>
                <p>{t('ambitionText3')}</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
              className="relative h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl flex items-center justify-center p-12 text-center"
            >
              <Image 
                src="/images/unsplash/science/atibba.jpg" 
                alt="Ambition" 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-teal-deep/80" />
              <p className="relative z-10 text-white font-bold text-2xl lg:text-3xl italic font-serif leading-relaxed">
                "{t('ambitionHighlight')}"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
