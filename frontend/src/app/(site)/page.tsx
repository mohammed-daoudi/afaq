'use client';
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { HistorySlider } from "@/components/ui/HistorySlider";
import { products, FAMILY_COLORS, type TherapeuticFamily } from "@/lib/products";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function HomePage() {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. Hero Video / Lifestyle */}
      <section className="relative w-full h-[100dvh] lg:h-screen overflow-hidden flex items-center justify-center">
        {/* Fallback image if video fails or is loading */}
        <div className="absolute inset-0 bg-teal-deep z-0">
          <Image 
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1920&q=80" 
            alt="Lifestyle santé" 
            fill 
            className="object-cover opacity-60" 
            priority
          />
        </div>

        {/* Video Background */}
        {!videoError && (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 mix-blend-overlay"
          >
            {/* Using a placeholder generic video URL. Replace with actual AFAQ video URL */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-on-a-mat-in-the-middle-of-42790-large.mp4" type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-teal-deep/80 via-teal-deep/40 to-teal-deep/90 z-0" />

        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6 max-w-4xl"
          >
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-gold-soft/50 text-gold-soft bg-teal-deep/50 backdrop-blur-md mb-4">
              Santé & Bien-être Premium
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white leading-[1.1] tracking-tight">
              L'exigence de la santé, <br/>
              <span className="text-gold-soft italic font-serif font-light">accessible à tous.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto pt-4 leading-relaxed">
              Découvrez nos gammes de compléments alimentaires européens, conçues pour vous accompagner à chaque étape de votre vie.
            </p>
            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/produits"
                className="px-8 py-4 bg-gold-soft text-teal-deep font-bold text-lg rounded-full hover:bg-white transition-all transform hover:-translate-y-1 shadow-xl"
              >
                Découvrir nos solutions
              </Link>
              <Link
                href="/a-propos"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all"
              >
                Notre manifeste
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-xs uppercase tracking-widest font-bold">Découvrir</span>
          <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
            <div className="w-full h-full bg-white absolute top-0 left-0 animate-[scroll_2s_ease-in-out_infinite]" />
          </div>
        </motion.div>
      </section>

      {/* 2. Notre Histoire (History Slider) */}
      <HistorySlider />

      {/* 3. Blog / Conseils (Magazine Style) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-sage-light pb-8"
          >
            <div className="max-w-2xl">
              <p className="text-sm font-bold text-gold-soft uppercase tracking-widest mb-3">Magazine Santé</p>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep">S'informer pour mieux vivre</h2>
            </div>
            <Link href="/conseils" className="px-6 py-3 rounded-full border border-teal-deep text-teal-deep font-bold hover:bg-teal-deep hover:text-white transition-all whitespace-nowrap">
              Tous nos articles
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Article (Large) */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="lg:col-span-2 group cursor-pointer">
              <Link href="/conseils/magnesium-bisglycinate" className="block h-full">
                <div className="relative h-[400px] rounded-3xl overflow-hidden mb-6">
                  <Image src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80" alt="Nutrition" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="bg-white text-teal-deep text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4 inline-block">Dossier Spécial</span>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 leading-tight group-hover:text-gold-soft transition-colors">
                      Pourquoi le magnésium bisglycinate est-il le plus assimilable ?
                    </h3>
                  </div>
                </div>
                <p className="text-anthracite-soft/80 text-lg line-clamp-2 pr-8">
                  Fatigue persistante, crampes nocturnes, stress... Le magnésium est la solution, mais encore faut-il choisir la bonne forme. Plongée au cœur de la biodisponibilité.
                </p>
              </Link>
            </motion.div>

            <div className="space-y-8 flex flex-col justify-between">
              {/* Secondary Article 1 */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="group cursor-pointer flex flex-col sm:flex-row gap-6 items-start">
                <Link href="/conseils/collagene-marin-vs-bovin" className="flex flex-col sm:flex-row gap-6 w-full">
                  <div className="relative w-full sm:w-48 h-48 sm:h-auto sm:aspect-square rounded-2xl overflow-hidden shrink-0 shadow-md">
                    <Image src="/images/unsplash/beauty/beauty_3.jpg" alt="Beauté et Peau" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-gold-soft text-xs font-bold uppercase tracking-widest block mb-2">Beauté & Peau</span>
                    <h4 className="text-2xl font-bold text-teal-deep group-hover:text-teal-deep/70 transition-colors leading-snug mb-3">
                      Collagène marin : le secret d'une peau éclatante
                    </h4>
                    <p className="text-base text-anthracite-soft/70 leading-relaxed line-clamp-3">
                      Avec l'âge, la production naturelle de collagène diminue, entraînant l'apparition de rides et une perte de fermeté. Le collagène marin hydrolysé se distingue par sa structure très proche de celle du collagène humain, offrant une biodisponibilité maximale. Découvrez comment l'intégrer à votre routine pour restaurer l'élasticité de votre peau de l'intérieur.
                    </p>
                  </div>
                </Link>
              </motion.div>
              <div className="w-full h-px bg-sage-light" />
              {/* Secondary Article 2 */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="group cursor-pointer flex flex-col sm:flex-row gap-6 items-start">
                <Link href="/conseils/immunite-enfants-hiver" className="flex flex-col sm:flex-row gap-6 w-full">
                  <div className="relative w-full sm:w-48 h-48 sm:h-auto sm:aspect-square rounded-2xl overflow-hidden shrink-0 shadow-md">
                    <Image src="/images/unsplash/babies/baby_3.jpg" alt="Enfants et Immunité" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-gold-soft text-xs font-bold uppercase tracking-widest block mb-2">Pédiatrie</span>
                    <h4 className="text-2xl font-bold text-teal-deep group-hover:text-teal-deep/70 transition-colors leading-snug mb-3">
                      Protéger l'immunité des enfants à l'approche de l'hiver
                    </h4>
                    <p className="text-base text-anthracite-soft/70 leading-relaxed line-clamp-3">
                      Les changements de saison mettent le système immunitaire des plus petits à rude épreuve. Entre l'école et les activités, ils sont constamment exposés. Une supplémentation ciblée en vitamines et minéraux essentiels permet de soutenir leurs défenses naturelles de manière douce et efficace, pour un hiver serein et plein de vitalité.
                    </p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contextualized Products */}
      <section className="py-24 lg:py-32 bg-sage-light/20 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-deep/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep mb-6">Des solutions expertes pour chaque besoin</h2>
            <p className="text-xl text-anthracite-soft/70">Des formulations précises, adaptées à votre rythme de vie.</p>
          </div>

          <div className="space-y-24">
            
            {/* Feature 1 : Sommeil */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
                <div className="w-16 h-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                </div>
                <h3 className="text-4xl font-heading font-bold text-teal-deep">Retrouvez des nuits paisibles</h3>
                <p className="text-lg text-anthracite-soft/80 leading-relaxed">
                  Le stress quotidien et la lumière des écrans perturbent notre cycle naturel. Notre solution à base de Mélatonine et de plantes relaxantes vous aide à trouver le sommeil plus rapidement, sans accoutumance.
                </p>
                <div className="pt-4">
                  <Link href="/produits/melatonine" className="inline-flex items-center gap-3 bg-teal-deep text-white px-6 py-3 rounded-full font-bold hover:bg-gold-soft transition-colors">
                    Découvrir SOTYA Mélatonine <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 relative h-[500px] rounded-[3rem] overflow-hidden bg-blue-50">
                <Image src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80" alt="Sommeil paisible" fill className="object-cover opacity-90 mix-blend-multiply" />
                {/* Floating Product Image */}
                <div className="absolute -bottom-10 -right-10 w-96 h-96 transform -rotate-12 drop-shadow-2xl hover:rotate-0 transition-transform duration-500">
                  <Image src="/tsawrsotya/sotya_girl.png" alt="Produit Sommeil" fill className="object-contain" />
                </div>
              </div>
            </div>

            {/* Feature 2 : Immunité */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 relative h-[500px] rounded-[3rem] overflow-hidden bg-orange-50">
                <Image src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80" alt="Femme active courant" fill className="object-cover opacity-90 mix-blend-multiply" />
                <div className="absolute -bottom-10 -left-10 w-96 h-96 transform rotate-12 drop-shadow-2xl hover:rotate-0 transition-transform duration-500">
                  <Image src="/tsawrsotya/sotya_smile.png" alt="Produit Immunité" fill className="object-contain" />
                </div>
              </div>
              <div className="lg:col-span-5 space-y-6 lg:pl-8">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-4xl font-heading font-bold text-teal-deep">Une énergie qui dure toute la journée</h3>
                <p className="text-lg text-anthracite-soft/80 leading-relaxed">
                  Votre système immunitaire est votre bouclier. Avec notre Complexe Vitamine C hautement dosé, offrez à votre corps l'énergie nécessaire pour faire face aux changements de saison et à la fatigue passagère.
                </p>
                <div className="pt-4">
                  <Link href="/produits/complexe-vitamine-c" className="inline-flex items-center gap-3 bg-teal-deep text-white px-6 py-3 rounded-full font-bold hover:bg-gold-soft transition-colors">
                    Découvrir SOTYA Vitamine C <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
          
          <div className="text-center mt-20">
            <Link href="/produits" className="text-teal-deep font-bold text-xl hover:text-gold-soft transition-colors underline decoration-2 underline-offset-8">
              Voir tout le catalogue produits
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Réseau & Call to action pro */}
      <section className="py-24 bg-teal-deep text-white text-center px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold">Vous êtes un professionnel de santé ?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            AFAQ Health met à votre disposition un portail B2B exclusif pour gérer vos commandes, consulter nos fiches techniques et suivre vos livraisons.
          </p>
          <div className="pt-8">
            <Link href="/portal/login" className="px-8 py-4 bg-white text-teal-deep font-bold text-lg rounded-full hover:bg-gold-soft hover:text-white transition-all shadow-xl">
              Accéder à l'Espace Professionnel
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
