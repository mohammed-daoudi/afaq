'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';
import { motion, type Variants } from 'framer-motion';
import {
  TrendingUp, ShieldCheck, Truck, BarChart, Stethoscope, Target,
  Factory, Map as MapIcon, Users,
  Star, CheckCircle, Handshake, Heart,
} from 'lucide-react';
import { BrandCarousel } from '@/components/ui/BrandCarousel';
import { PartnersMarquee } from '@/components/ui/PartnersMarquee';



const RESEAU_ITEMS = [
  { icon: Factory, title: 'Fabricants européens', desc: 'Des partenaires sélectionnés pour leur savoir-faire, leur exigence et la qualité de leurs produits.' },
  { icon: MapIcon, title: 'Distribution nationale', desc: "Un établissement pharmaceutique partenaire pour assurer la distribution et la disponibilité de nos produits au Maroc." },
  { icon: Users, title: 'Pharmacies & professionnels de santé', desc: "Un réseau de proximité favorisant le conseil, la connaissance des gammes et leur accès." },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};



const RESEAU_IMAGES = [
  "/images/unsplash/science/Gemini_Generated_Image_3luov43luov43luo.jpg",
  "/images/unsplash/science/prooo.jpg"
];

const ReseauSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % RESEAU_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {RESEAU_IMAGES.map((src, index) => (
        <motion.div
          key={src}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: current === index ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={src}
            alt="Réseau AFAQ Health"
            fill
            className="object-cover object-center"
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      ))}
    </>
  );
};

const VISION_IMAGES = [
  "/images/unsplash/welness/family-supplements-table-naturamins-sotya-antiox.png",
  "/images/unsplash/welness/family-walking-away-green-meadow-professional-8k.png"
];

const VisionSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % VISION_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Image
        src={VISION_IMAGES[0]}
        alt="Spacer"
        width={800}
        height={800}
        className="w-full h-auto opacity-0 pointer-events-none block"
      />
      {VISION_IMAGES.map((src, index) => (
        <motion.div
          key={src}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: current === index ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={src}
            alt="Notre Vision AFAQ Health"
            fill
            className="object-contain object-center"
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      ))}
    </>
  );
};

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">


      {/* ═══════════════════════════════════════════════════════════════
          1. HERO — Text left, full-bleed image right (like reference)
         ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#f6f4ef] overflow-hidden" style={{ minHeight: '600px' }}>



        {/* Text column */}
        <div className="relative z-10 flex flex-col justify-center h-full min-h-[600px] w-full lg:w-[55%] px-8 md:px-16 lg:px-24 py-20 lg:py-28">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-xl">
            <motion.div variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-gold-soft mb-6">
              QUI SOMMES-NOUS ?
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-teal-deep leading-tight mb-6">
              AFAQ HEALTH
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl font-bold text-anthracite-deep leading-relaxed mb-4">
              De l’Europe au marché marocain, nous construisons les conditions d’une implantation durable.
            </motion.p>
            <motion.p variants={fadeUp} className="text-base text-anthracite-soft/75 leading-relaxed">
              AFAQ HEALTH est une société marocaine spécialisée dans l’importation, le développement et la commercialisation de marques européennes dans les domaines de la santé, de la nutrition et du bien-être.
            </motion.p>
          </motion.div>
        </div>

        {/* Full-bleed right image */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[50%] h-full hidden lg:block">
          <Image
            src="/images/unsplash/welness/welness.jpg"
            alt="AFAQ Health Expertise"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f6f4ef] to-transparent" />
        </div>

        {/* Mobile image strip */}
        <div className="lg:hidden relative w-full h-72 mt-8">
          <Image
            src="/images/unsplash/welness/welness.jpg"
            alt="AFAQ Health Expertise"
            fill
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. NOTRE MISSION — Full-width dark banner (like reference ISO banner)
         ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-teal-deep py-20 md:py-24">
        <div className="container mx-auto px-8 md:px-16 max-w-5xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-gold-soft mb-6">
              NOTRE MISSION
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Sélectionner.{' '}
              <span className="font-light text-gold-soft">Développer.</span>{' '}
              Commercialiser.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/75 leading-relaxed max-w-3xl mx-auto mt-6">
              Notre mission est de construire au Maroc une présence solide et durable pour des marques sélectionnées pour la qualité de leurs produits, leur savoir-faire et la pertinence de leurs gammes.
            </motion.p>
            <motion.p variants={fadeUp} className="text-base text-white/60 leading-relaxed max-w-2xl mx-auto mt-4">
              De la conformité réglementaire au développement commercial, nous coordonnons les différentes étapes nécessaires à leur implantation et à leur développement.
            </motion.p>
          </motion.div>
        </div>
      </section>



      {/* ═══════════════════════════════════════════════════════════════
          3. NOS PARTENAIRES — Marquee slider
         ═══════════════════════════════════════════════════════════════ */}
      <PartnersMarquee />

      {/* ═══════════════════════════════════════════════════════════════
          4. NOTRE RÉSEAU — HERO style layout (Text left, Slider right)
         ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#f6f4ef] overflow-hidden lg:block flex flex-col" style={{ minHeight: '600px' }}>

        {/* Mobile image strip slider — order-1 so it appears FIRST on mobile */}
        <div className="lg:hidden relative w-full h-[400px] order-1">
          <ReseauSlider />
        </div>

        {/* Text column — order-2 on mobile (after image), normal on desktop */}
        <div className="relative z-10 flex flex-col justify-center h-full min-h-[600px] w-full lg:w-[55%] px-8 md:px-16 lg:px-24 py-12 lg:py-28 order-2">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-xl">
            <motion.div variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-gold-soft mb-6">
              NOTRE RÉSEAU
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-teal-deep leading-tight mb-6">
              Un réseau au service de nos marques
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-anthracite-soft/80 leading-relaxed mb-12">
              AFAQ HEALTH s’appuie sur un réseau de partenaires sélectionnés pour accompagner le développement de ses marques et assurer leur présence durable sur le marché marocain.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {RESEAU_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 border border-sage-light rounded-xl flex items-center justify-center mb-4 bg-white shadow-sm">
                    <item.icon className="w-6 h-6 text-teal-deep" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-base font-bold text-anthracite-deep mb-2">{item.title}</h4>
                  <p className="text-anthracite-soft/80 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Full-bleed right image slider — desktop only */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[50%] h-full hidden lg:block">
          <ReseauSlider />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f6f4ef] to-transparent z-10" />
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════════════
          5. NOTRE VISION — 2-column: slider left / text right
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white border-b border-sage-light/40">
        <div className="container mx-auto px-8 md:px-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Slider left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full lg:w-[120%] lg:-ml-[20%] max-w-none"
            >
              <VisionSlider />
            </motion.div>

            {/* Text right */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6 lg:pl-10"
            >
              <motion.div variants={fadeUp} className="text-sm font-bold uppercase tracking-widest text-gold-soft">
                NOTRE VISION
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-teal-deep leading-tight">
                Construire et développer un portefeuille de marques complémentaires et exigeantes.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base lg:text-lg text-anthracite-soft/75 leading-relaxed">
                Notre ambition est de développer progressivement notre portefeuille avec des marques sélectionnées pour leur qualité, leur savoir-faire et leur capacité à répondre durablement aux besoins du marché.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
}
