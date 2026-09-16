'use client';
import React from "react";
import { Link } from '@/navigation';
import Image from "next/image";
import { BrandSlider } from "@/components/ui/BrandSlider";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/lib/products";
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);
  const t = useTranslations('HomePage');

  return (
    <div className="min-h-screen bg-white">

      {/* 1. SLIDER MARQUES */}
      <BrandSlider />

      {/* 2. NOS MARQUES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep uppercase tracking-wide">{t('ourBrands')}</h2>
            <div className="w-24 h-1 bg-gold-soft mx-auto mt-6" />
          </div>
          <div 
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <Link href="/produits?brand=sotya" className="min-w-[85vw] sm:min-w-[60vw] lg:min-w-0 shrink-0 snap-center group block relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-xl">
              <Image src="/images/unsplash/welness/laura-ohlman-sW6TRpgZLMw-unsplash.jpg" alt="Sotya" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-5xl md:text-6xl font-extrabold text-white tracking-widest uppercase drop-shadow-lg">SOTYA</h3>
              </div>
            </Link>
            <Link href="/produits?brand=naturamins-kids" className="min-w-[85vw] sm:min-w-[60vw] lg:min-w-0 shrink-0 snap-center group block relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-xl">
              <Image src="/images/unsplash/comp/Gemini_Generated_Image_1tkniv1tkniv1tkn.jfif" alt="Naturamins Kids" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-widest text-center uppercase drop-shadow-lg leading-tight">
                  NATURAMINS<br />KIDS
                </h3>
              </div>
            </Link>
            <Link href="/produits?brand=colagenova" className="min-w-[85vw] sm:min-w-[60vw] lg:min-w-0 shrink-0 snap-center group block relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-xl">
              <Image src="/images/unsplash/welness/capture_welness_2.png" alt="Colagenova" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-widest uppercase drop-shadow-lg">COLAGENOVA</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. NOS PRODUITS À LA UNE */}
      <section className="py-24 bg-sage-light/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep uppercase tracking-wide">{t('featuredProducts')}</h2>
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
        </div>
      </section>

      {/* 4. SANTÉ MAGAZINE */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep uppercase tracking-wide">{t('healthMagazine')}</h2>
            <div className="w-24 h-1 bg-gold-soft mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Link href="/conseils/magnesium-bisglycinate" className="group block bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
              <div className="relative h-64 w-full shrink-0 overflow-hidden">
                <Image src="/images/unsplash/comp/kayla-maurais-EZWTMjwAWls-unsplash.jpg" alt="Article 1" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-gold-soft text-xs font-bold uppercase tracking-widest mb-3 block">{t('specialReport')}</span>
                <h4 className="text-2xl font-bold text-teal-deep mb-4 group-hover:text-gold-soft transition-colors leading-snug">{t('article1Title')}</h4>
                <p className="text-anthracite-soft/80 line-clamp-3 mt-auto">{t('article1Desc')}</p>
              </div>
            </Link>

            <Link href="/conseils/collagene-marin-vs-bovin" className="group block bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
              <div className="relative h-64 w-full shrink-0 overflow-hidden">
                <Image src="/images/unsplash/welness/jared-rice-NTyBbu66_SI-unsplash.jpg" alt="Article 2" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-gold-soft text-xs font-bold uppercase tracking-widest mb-3 block">{t('beautySkin')}</span>
                <h4 className="text-2xl font-bold text-teal-deep mb-4 group-hover:text-gold-soft transition-colors leading-snug">{t('article2Title')}</h4>
                <p className="text-anthracite-soft/80 line-clamp-3 mt-auto">{t('article2Desc')}</p>
              </div>
            </Link>

            <Link href="/conseils/immunite-enfants-hiver" className="group block bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
              <div className="relative h-64 w-full shrink-0 overflow-hidden">
                <Image src="/images/unsplash/comp/Gemini_Generated_Image_1tkniv1tkniv1tkn.jfif" alt="Article 3" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-gold-soft text-xs font-bold uppercase tracking-widest mb-3 block">{t('pediatrics')}</span>
                <h4 className="text-2xl font-bold text-teal-deep mb-4 group-hover:text-gold-soft transition-colors leading-snug">{t('article3Title')}</h4>
                <p className="text-anthracite-soft/80 line-clamp-3 mt-auto">{t('article3Desc')}</p>
              </div>
            </Link>
          </div>

          <div className="mt-16 text-center">
            <Link href="/conseils" className="inline-block px-10 py-5 bg-teal-deep text-white font-bold rounded-full hover:bg-gold-soft transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 transform duration-300">
              {t('allArticles')}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
