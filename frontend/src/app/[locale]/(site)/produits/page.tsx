'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '@/components/ui/ProductCard';
import { products, PRODUCT_CATEGORIES, PRODUCT_BRANDS } from '@/lib/products';
import { Link } from '@/navigation';

const BRAND_LOGOS: Record<string, string> = {
  'SOTYA':           '/gammelogo/sotyaaa.jpg',
  'NATURAMINS KIDS': '/gammelogo/naturamins.jpeg',
  'COLAGENOVA':      '/gammelogo/colagenova.jpg',
};

// Brand-specific accent colors for the filter buttons
const BRAND_COLORS: Record<string, { text: string; border: string; shadow: string; dot: string; shimmer: string; }> = {
  'SOTYA': {
    text: 'text-[#E52E2E]',
    border: 'border-[#E52E2E]',
    shadow: 'shadow-[#E52E2E]/20',
    dot: 'bg-[#E52E2E]',
    shimmer: 'rgba(229, 46, 46, 0.15)' // #E52E2E
  },
  'NATURAMINS KIDS': {
    text: 'text-[#5FB4D9]',
    border: 'border-[#5FB4D9]',
    shadow: 'shadow-[#5FB4D9]/20',
    dot: 'bg-[#5FB4D9]',
    shimmer: 'rgba(95, 180, 217, 0.15)' // #5FB4D9
  },
  'COLAGENOVA': {
    text: 'text-gold-soft',
    border: 'border-gold-soft',
    shadow: 'shadow-gold-soft/20',
    dot: 'bg-gold-soft',
    shimmer: 'rgba(217, 160, 91, 0.15)'
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};



// Maps URL slug → exact brand name used in product data
const SLUG_TO_BRAND: Record<string, string> = {
  'sotya':           'SOTYA',
  'naturamins-kids': 'NATURAMINS KIDS',
  'colagenova':      'COLAGENOVA',
};

export default function ProduitsPage() {
  const searchParams = useSearchParams();
  const brandParam = searchParams.get('brand') ?? 'all';
  const initialBrand = SLUG_TO_BRAND[brandParam] ?? 'all';

  const [activeBrand, setActiveBrand] = useState(initialBrand);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMobileBrandFilterOpen, setIsMobileBrandFilterOpen] = useState(false);

  // Sync filter if URL param changes (e.g. back/forward navigation)
  useEffect(() => {
    const slug = searchParams.get('brand') ?? 'all';
    setActiveBrand(SLUG_TO_BRAND[slug] ?? 'all');
  }, [searchParams]);



  const filtered = products.filter((p) => {
    const matchBrand = activeBrand === 'all' || p.brand === activeBrand;
    const matchCategory = activeCategory === 'all' || p.categories.includes(activeCategory);
    return matchBrand && matchCategory;
  });

  return (
    <div className="min-h-screen bg-ivory-soft pt-8 pb-0 flex flex-col">
      <div className="container mx-auto px-4 max-w-7xl flex-grow mb-12">


        {/* Layout: Sidebar + Main Content */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Sidebar: Brands */}
          <div className="w-full lg:w-72 flex-shrink-0">
            
            {/* Mobile Filter Toggle */}
            <div className="flex lg:hidden items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-teal-deep">
                {activeBrand === 'all' ? 'Toutes les marques' : activeBrand}
              </h2>
              <button
                onClick={() => setIsMobileBrandFilterOpen(!isMobileBrandFilterOpen)}
                className="flex items-center gap-2 text-sm font-bold text-anthracite-deep bg-white border border-sage-light px-4 py-2 rounded-xl shadow-sm hover:bg-ivory-soft transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="21" x2="4" y2="14"></line>
                  <line x1="4" y1="10" x2="4" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="3"></line>
                  <line x1="20" y1="21" x2="20" y2="16"></line>
                  <line x1="20" y1="12" x2="20" y2="3"></line>
                  <line x1="1" y1="14" x2="7" y2="14"></line>
                  <line x1="9" y1="8" x2="15" y2="8"></line>
                  <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
                Choisissez la marque
              </button>
            </div>

            <div className={`${isMobileBrandFilterOpen ? 'block mb-8' : 'hidden'} lg:block lg:sticky lg:top-32 space-y-6`}>
              <div className="hidden lg:flex items-center gap-3 mb-2">
                <span className="w-8 h-px bg-gold-soft" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-anthracite-soft">
                  Les Gammes
                </h2>
              </div>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { setActiveBrand('all'); setIsMobileBrandFilterOpen(false); }}
                  className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center justify-between group ${
                    activeBrand === 'all'
                      ? 'bg-white text-teal-deep border border-sage-light/50 shadow-sm'
                      : 'bg-white text-anthracite-soft hover:bg-sage-light/30 border border-sage-light/50 hover:border-sage-light hover:shadow-sm'
                  }`}
                >
                  <span className="relative z-10">Toutes les marques</span>
                </button>
                {PRODUCT_BRANDS.map((brand) => {
                  return (
                    <button
                      key={brand}
                      onClick={() => { setActiveBrand(brand); setIsMobileBrandFilterOpen(false); }}
                      className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center justify-between group ${
                        activeBrand === brand
                          ? 'bg-white text-teal-deep border border-sage-light/50 shadow-sm'
                          : 'bg-white text-anthracite-soft hover:bg-ivory-soft border border-sage-light/50 hover:border-gold-soft/30 hover:shadow-sm'
                      }`}
                    >
                      <span className="relative z-10 flex-1 leading-tight">{brand}</span>
                    </button>
                  );
                })}


              </div>
            </div>
          </div>

          {/* Right Main Content: Category Filter & Grid */}
          <div className="flex-1 min-w-0 flex flex-col">
            
            {/* Horizontal Needs/Univers Filter */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4 lg:hidden">
                <span className="w-8 h-px bg-teal-deep/30" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-anthracite-soft">
                  Les Besoins
                </h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-4 py-2 text-xs font-bold tracking-wide ${ activeCategory === 'all' ? 'bg-teal-deep text-white' : 'bg-white text-anthracite-soft/80 border border-sage-light/50' } rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect`}
                >
                  Toutes les catégories
                </button>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-xs font-bold tracking-wide ${ activeCategory === cat ? 'bg-teal-deep text-white' : 'bg-white text-anthracite-soft/80 border border-sage-light/50' } rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
              {filtered.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
                >
                  {filtered.map((product) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      key={product.id}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-sage-light/30 shadow-sm text-center px-4"
                >
                  <div className="w-16 h-16 mb-4 rounded-full bg-ivory-soft flex items-center justify-center text-3xl">
                    🔍
                  </div>
                  <h3 className="text-xl font-bold text-teal-deep mb-2">Aucun produit trouvé</h3>
                  <p className="text-anthracite-soft/80 ">
                    Essayez de modifier vos filtres pour voir d'autres références.
                  </p>
                  <button 
                    onClick={() => { setActiveBrand('all'); setActiveCategory('all'); }}
                    className="mt-6 text-sm font-bold text-gold-soft hover:text-gold-deep border-b border-transparent hover:border-gold-deep transition-all"
                  >
                    Réinitialiser les filtres
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>

      {/* 6. ESPACE PROFESSIONNEL CTA */}
      <div className="w-full bg-white py-16 border-t border-sage-light mt-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(11,75,81,0.03),transparent_50%)] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-teal-deep mb-4 tracking-tight">
            VOUS ÊTES PROFESSIONNEL DE SANTÉ ?
          </h2>
          <p className="text-anthracite-soft/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Accédez à notre espace professionnel pour découvrir notre offre, consulter vos conditions commerciales et passer vos commandes en toute simplicité.
          </p>
          <Link 
            href="/portal/login" 
            className="inline-flex items-center gap-3 bg-gold-soft hover:bg-gold-deep text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg group"
          >
            Accéder à l'espace professionnel 
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
