'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import api from '@/lib/api';

const STATIC_BRANDS = [
  {
    name: 'SOTYA',
    tagline: 'Compléments alimentaires naturels depuis 1978',
    bg: '#f4eedb',
    accentColor: '#009b4d',
    heroImage: '/images/unsplash/welness/laura-ohlman-sW6TRpgZLMw-unsplash.jpg',
    link: '/marques/sotya',
  },
  {
    name: 'NATURAMINS KIDS',
    tagline: 'Nutrition adaptée et sûre pour les enfants',
    bg: '#eaf4ec',
    accentColor: '#0f4c3a',
    heroImage: '/images/unsplash/comp/Gemini_Generated_Image_1tkniv1tkniv1tkn.jfif',
    link: '/marques/naturamins-kids',
  },
  {
    name: 'COLAGENOVA',
    tagline: 'La beauté et la vitalité au naturel',
    bg: '#fcf5f5',
    accentColor: '#db2777',
    heroImage: '/images/unsplash/welness/capture_welness_2.png',
    link: '/marques/colagenova',
  },
];

export function BrandCarousel() {
  const [brands, setBrands] = useState<any[]>(STATIC_BRANDS);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    api.get('/public/brands').then(res => {
      if (res.data && res.data.length > 0) setBrands(res.data);
    }).catch(() => { /* fallback to static data */ });
  }, []);

  useEffect(() => {
    if (!brands || brands.length === 0) return;
    const t = setInterval(() => setCurrent(p => (p + 1) % brands.length), 5500);
    return () => clearInterval(t);
  }, [brands]);

  const brand = brands[current];

  return (
    <div
      className="relative w-full overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: brand.bg || (brand.colors && brand.colors.bg) || '#f6f4ef', minHeight: '500px' }}
    >
      {/* Left: text column */}
      <div className="relative z-10 flex flex-col justify-center h-full min-h-[500px] w-full lg:w-1/2 px-8 md:px-16 lg:px-20 py-16 lg:py-20">
        <motion.div
          key={`brand-text-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md"
        >
          <span
            className="text-xs font-bold uppercase tracking-widest mb-4 block"
            style={{ color: brand.accentColor || (brand.colors && brand.colors.accent) || '#009b4d' }}
          >
            NOS MARQUES
          </span>
          <h3 className="text-4xl md:text-5xl font-extrabold text-anthracite-deep leading-tight mb-4">
            {brand.name}
          </h3>
          <p className="text-lg text-anthracite-soft/70 leading-relaxed mb-8">
            {brand.tagline || brand.description}
          </p>
          <Link
            href={brand.link || `/produits?brand=${brand.name.toLowerCase()}`}
            className="inline-block px-8 py-4 text-white font-bold text-sm tracking-wide uppercase transition-transform hover:scale-105 shadow-md"
            style={{ backgroundColor: brand.accentColor || (brand.colors && brand.colors.accent) || '#009b4d' }}
          >
            Découvrir nos marques →
          </Link>
        </motion.div>

        {/* Dots */}
        <div className="flex gap-3 mt-12">
          {brands.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{ backgroundColor: i === current ? (brand.accentColor || (brand.colors && brand.colors.accent) || '#009b4d') : '#ccc' }}
            />
          ))}
        </div>
      </div>

      {/* Right: full-bleed image */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 h-full hidden lg:block">
        <motion.div
          key={`brand-img-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-full"
        >
          {(brand.heroImage || brand.logo) && (
            <Image
              src={brand.heroImage || brand.logo}
              alt={brand.name}
              fill
              className="object-cover object-center"
            />
          )}
          {/* Fade to bg color on left edge */}
          <div
            className="absolute inset-y-0 left-0 w-24"
            style={{ background: `linear-gradient(to right, ${brand.bg || (brand.colors && brand.colors.bg) || '#f6f4ef'}, transparent)` }}
          />
        </motion.div>
      </div>

      {/* Arrow buttons */}
      <button
        onClick={() => setCurrent(p => (p - 1 + brands.length) % brands.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
      >
        <ChevronLeft size={20} className="text-anthracite-deep" />
      </button>
      <button
        onClick={() => setCurrent(p => (p + 1) % brands.length)}
        className="absolute right-4 lg:right-[calc(50%+1rem)] top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
      >
        <ChevronRight size={20} className="text-anthracite-deep" />
      </button>
    </div>
  );
}
