'use client';
import React from "react";
import { Link } from '@/navigation';
import Image from "next/image";
import { BrandSlider } from "@/components/ui/BrandSlider";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/lib/products";
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { motion, type Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const brands = [
  {
    slug: 'sotya',
    name: 'SOTYA',
    logo: '/gammelogo/sotyaaa.jpg',
    cardBg: '#FFFFFF',
    logoClass: 'object-cover scale-90',
    subtitle: 'COMPLÉMENTS ALIMENTAIRES',
    status: 'MARQUE ESPAGNOLE · DISPONIBLE AU MAROC',
    description: 'SOTYA propose une gamme diversifiée de compléments alimentaires dédiés à la nutrition et au bien-être au quotidien.',
  },
  {
    slug: 'naturamins-kids',
    name: 'Naturamins Kids',
    logo: '/gammelogo/nutramins.png',
    cardBg: '#FFFFFF',
    logoClass: 'object-cover',
    subtitle: 'NUTRITION PÉDIATRIQUE',
    status: 'MARQUE ESPAGNOLE · PROCHAIN LANCEMENT — JANVIER 2027',
    description: 'Naturamins Kids propose une gamme dédiée aux besoins nutritionnels de l’enfant, conçue pour accompagner les familles au quotidien.',
  },
  {
    slug: 'colagenova',
    name: 'Colagenova',
    logo: '/gammelogo/colagenova.jpg',
    cardBg: '#FFFFFF',
    logoClass: 'object-contain scale-90',
    subtitle: 'BEAUTÉ & NUTRITION',
    status: 'MARQUE ESPAGNOLE · PROCHAINEMENT AU MAROC',
    description: "Colagenova propose une gamme spécialisée dans la nutrition beauté à base de collagène, développée autour de solutions dédiées notamment à la beauté et au bien-être articulaire.",
  }
];

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);
  const t = useTranslations('HomePage');

  return (
    <div className="min-h-screen bg-white">

      {/* 1. SLIDER MARQUES */}
      <BrandSlider />

      {/* MARQUEE — scrolls with page, equal gap above and below */}
      <div className="mt-8 mb-12 border-y border-gray-100">
        <div className="w-full bg-transparent overflow-hidden py-4 flex-shrink-0">
        <style>{`
          @keyframes marquee-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee-scroll 45s linear infinite;
          }
        `}</style>
        <div className="marquee-track select-none" aria-hidden="true">
          {[0, 1].map((i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              {['ISO 9001 / 22000', 'Marques Européennes', 'Expertise Nutrition & Bien-Être'].map((item, j) => (
                <span key={j} className="flex items-center mx-10">
                  <span className="text-black font-normal text-xl md:text-2xl tracking-widest">
                    {item}
                  </span>
                  <span className="ml-10 text-gray-300 text-lg">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
        </div>
      </div>

      {/* PRÉSENTATION AFAQ HEALTH */}
      <section className="relative w-full bg-[#f6f4ef] py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Text Content */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={staggerContainer} 
            className="w-full lg:w-1/2 max-w-xl"
          >
            <motion.div variants={fadeUp} className="text-sm md:text-base font-bold uppercase tracking-widest text-gold-soft mb-6">
              L&apos;expertise derrière AFAQ Health
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-teal-deep leading-tight mb-6">
              AFAQ HEALTH
            </motion.h1>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-light text-anthracite-soft/80 leading-snug mb-8">
              Un portefeuille de marques européennes sélectionnées avec exigence
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-anthracite-soft/75 leading-relaxed mb-4">
              AFAQ HEALTH développe et distribue au Maroc un portefeuille de marques européennes sélectionnées pour leur qualité, leur savoir-faire et la pertinence de leurs gammes.
            </motion.p>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-anthracite-soft/75 leading-relaxed mb-8">
              Notre portefeuille couvre plusieurs univers complémentaires, de la nutrition et des compléments alimentaires à la nutrition pédiatrique et à la beauté.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/a-propos"
                className="inline-block px-8 py-4 bg-teal-deep text-white font-bold text-base tracking-wide uppercase rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect"
              >
                Découvrir → Qui sommes-nous ?
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Content */}
          <div className="w-full lg:w-[45%] h-[400px] lg:h-[500px] relative overflow-hidden shadow-2xl">
            <Image
              src="/images/unsplash/science/colabb.jpg"
              alt="Présentation"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

        </div>
      </section>

      {/* 2. NOS MARQUES */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-teal-deep uppercase tracking-wide">NOS MARQUES</h2>
            <div className="w-24 h-1 bg-gold-soft mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <div 
                key={brand.slug}
                className="h-full"
              >
                <Card className="overflow-hidden border-none shadow hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col">
                  <div
                    className="relative overflow-hidden h-64 shrink-0"
                    style={{ backgroundColor: brand.cardBg }}
                  >
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className={brand.logoClass}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-[11px] font-bold text-gold-soft uppercase tracking-widest mb-3">
                      {brand.subtitle}
                    </h3>
                    
                    <div className="mb-6">
                      <span className="inline-block px-2 py-1 rounded text-[10px] font-bold bg-sage-light/50 text-teal-deep uppercase tracking-wider">
                        {brand.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-anthracite-soft/80 leading-relaxed mb-8 flex-grow">
                      {brand.description}
                    </p>

                    <div className="pt-4 border-t border-gray-100">
                      <Link
                        href={`/produits?brand=${brand.slug}`}
                        className="inline-flex items-center gap-2 font-bold text-teal-deep hover:text-gold-soft transition-colors text-sm"
                      >
                        Découvrir {brand.name} <span>→</span>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NOS PRODUITS À LA UNE */}
      <section className="py-12 bg-sage-light/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-teal-deep uppercase tracking-wide">{t('featuredProducts')}</h2>
            <div className="w-24 h-1 bg-gold-soft mx-auto mt-6" />
          </div>
          <div 
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 lg:grid lg:grid-cols-2 xl:grid-cols-4 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredProducts.map((product) => (
              <div key={product.id} className="min-w-[85vw] sm:min-w-[45vw] lg:min-w-0 shrink-0 snap-center">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/produits"
              className="inline-block px-8 py-4 bg-teal-deep text-white font-bold text-base tracking-wide uppercase rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect"
            >
              tous les produits 
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SANTÉ MAGAZINE */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-teal-deep uppercase tracking-wide">{t('healthMagazine')}</h2>
            <div className="w-24 h-1 bg-gold-soft mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Link href="/conseils/pourquoi-se-supplementer-en-magnesium" className="group block bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
              <div className="relative h-64 w-full shrink-0 overflow-hidden">
                <Image src="/images/unsplash/comp/kayla-maurais-EZWTMjwAWls-unsplash.jpg" alt="Article 1" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-gold-soft text-xs font-bold uppercase tracking-widest mb-3 block">{t('specialReport')}</span>
                <h4 className="text-2xl font-bold text-teal-deep mb-4 group-hover:text-gold-soft transition-colors leading-snug">{t('article1Title')}</h4>
                <p className="text-anthracite-soft/80 line-clamp-3 mt-auto">{t('article1Desc')}</p>
              </div>
            </Link>

            <Link href="/conseils/comprendre-le-collagene" className="group block bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
              <div className="relative h-64 w-full shrink-0 overflow-hidden">
                <Image src="/images/unsplash/welness/jared-rice-NTyBbu66_SI-unsplash.jpg" alt="Article 2" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-gold-soft text-xs font-bold uppercase tracking-widest mb-3 block">{t('beautySkin')}</span>
                <h4 className="text-2xl font-bold text-teal-deep mb-4 group-hover:text-gold-soft transition-colors leading-snug">{t('article2Title')}</h4>
                <p className="text-anthracite-soft/80 line-clamp-3 mt-auto">{t('article2Desc')}</p>
              </div>
            </Link>

            <Link href="/conseils/les-besoins-nutritionnels-des-enfants" className="group block bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
              <div className="relative h-64 w-full shrink-0 overflow-hidden">
                <Image src="/images/unsplash/comp/Gemini_Generated_Image_1tkniv1tkniv1tkn.jpg" alt="Article 3" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-gold-soft text-xs font-bold uppercase tracking-widest mb-3 block">{t('pediatrics')}</span>
                <h4 className="text-2xl font-bold text-teal-deep mb-4 group-hover:text-gold-soft transition-colors leading-snug">{t('article3Title')}</h4>
                <p className="text-anthracite-soft/80 line-clamp-3 mt-auto">{t('article3Desc')}</p>
              </div>
            </Link>
          </div>

          <div className="mt-16 text-center">
            <Link href="/conseils" className="inline-block px-10 py-5 bg-teal-deep text-white font-bold rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect">
              {t('allArticles')}
            </Link>
          </div>
        </div>
      </section>

      {/* 5. ESPACE PROFESSIONNEL */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        {/* Image de fond en fullscreen */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/unsplash/science/Gemini_Generated_Image_54h96b54h96b54h9.jpg"
            alt="Espace Professionnel"
            fill
            className="object-cover object-center"
            quality={90}
          />
          {/* Calques d'assombrissement pour garantir la lisibilité du texte */}
          <div className="absolute inset-0 bg-teal-deep/80 md:bg-teal-deep/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/90 via-teal-deep/40 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-8 md:px-16 max-w-5xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-sm md:text-base font-extrabold uppercase tracking-[0.2em] text-gold-soft mb-6 drop-shadow-md">
              ESPACE PROFESSIONNEL
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-md">
              Vous êtes un professionnel de santé ?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mt-6 drop-shadow-md">
              Découvrez nos conditions dédiées, notre accompagnement et accédez à l&apos;ensemble de notre catalogue.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10">
              <Link
                href="/portal/login"
                className="inline-block px-8 md:px-10 py-4 bg-teal-deep text-white font-bold text-sm tracking-wide uppercase rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect"
              >
                Accéder à l&apos;espace pro →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
