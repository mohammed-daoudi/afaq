'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageMagnifier } from '@/components/ui/ImageMagnifier';
import { ProductCard } from '@/components/ui/ProductCard';
import type { Product } from '@/lib/products';
import { useTranslations } from 'next-intl';

export function ProductGallery({ product }: { product: Product }) {
  const images = [
    product.imagePath,
    product.labelImagePath
  ].filter(Boolean) as string[];

  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const nextImage = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="space-y-6">
      {/* Main Image with Outside Arrows */}
      <div className="flex items-center justify-between w-full">
        {/* Prev Arrow */}
        {images.length > 1 ? (
          <button 
            onClick={prevImage}
            className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 hover:shadow transition-all text-gray-700 flex-shrink-0 z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        ) : <div className="w-12 h-12 flex-shrink-0" />}

        {/* Main Image */}
        <div className="flex-1 max-w-[350px] md:max-w-[450px] aspect-[4/5] mx-auto relative rounded-xl overflow-hidden group">
          <ImageMagnifier 
            src={images[activeIndex]} 
            alt={product.name}
            zoomLevel={2}
            onClick={() => setFullscreenImage(images[activeIndex])}
          />
        </div>

        {/* Next Arrow */}
        {images.length > 1 ? (
          <button 
            onClick={nextImage}
            className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 hover:shadow transition-all text-gray-700 flex-shrink-0 z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        ) : <div className="w-12 h-12 flex-shrink-0" />}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-24 h-24 overflow-hidden border-2 transition-all p-1 bg-white ${
                activeIndex === idx ? 'border-[#8dc63f]' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
            </button>
          ))}
        </div>
      )}

      <FullscreenModal src={fullscreenImage} onClose={() => setFullscreenImage(null)} />
    </div>
  );
}

export function ProductTabs({ product, colors }: { product: Product, colors: any }) {
  const [activeTab, setActiveTab] = useState<'description' | 'fiche'>('description');
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const t = useTranslations('ProductDetail');

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto">
      {/* Tab headers */}
      <div className="flex justify-center border-b border-sage-light mb-8 relative">
        <button
          onClick={() => setActiveTab('description')}
          className={`px-8 py-4 text-lg font-heading font-bold transition-all relative ${
            activeTab === 'description' ? 'text-teal-deep' : 'text-anthracite-soft/60 hover:text-teal-deep/80'
          }`}
        >
          {t('description')}
          {activeTab === 'description' && (
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gold-soft rounded-t-md" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('fiche')}
          className={`px-8 py-4 text-lg font-heading font-bold transition-all relative ${
            activeTab === 'fiche' ? 'text-teal-deep' : 'text-anthracite-soft/60 hover:text-teal-deep/80'
          }`}
        >
          {t('technicalSheet')}
          {activeTab === 'fiche' && (
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gold-soft rounded-t-md" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-sage-light/50 transition-all duration-500">
        {activeTab === 'description' ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section>
              <h3 className="text-xl font-bold text-teal-deep font-heading flex items-center gap-2 mb-4">
                <span style={{ color: colors.accent }}>✧</span> {t('presentation')}
              </h3>
              <p className="text-anthracite-soft/80 leading-relaxed text-lg">
                {product.description}
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-teal-deep font-heading flex items-center gap-2 mb-4">
                <span style={{ color: colors.accent }}>✧</span> {t('composition')}
              </h3>
              <p className="text-anthracite-soft/80 leading-relaxed text-lg">
                {t('expertFormula')}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-teal-deep font-heading flex items-center gap-2 mb-4">
                <span style={{ color: colors.accent }}>✧</span> {t('howToUse')}
              </h3>
              <p className="text-anthracite-soft/80 leading-relaxed text-lg">
                <span className="font-semibold text-teal-deep">{product.dosage}</span>. 
                {t('doNotExceed')}
              </p>
            </section>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* Etiquette Image */}
             {product.labelImagePath && (
               <div className="mb-8 border-b border-sage-light/50 pb-8">
                 <h4 className="text-lg font-bold text-teal-deep mb-6 text-center">{t('nutritionalInfo')}</h4>
                 <div 
                   className="bg-white rounded-xl shadow-sm border border-sage-light overflow-hidden flex justify-center group hover:border-teal-deep/30 transition-colors"
                 >
                   <ImageMagnifier 
                     src={product.labelImagePath}
                     alt="Étiquette du produit"
                     zoomLevel={2}
                     onClick={() => setFullscreenImage(product.labelImagePath!)}
                     containerClassName="w-full relative h-[400px] sm:h-[600px] cursor-pointer"
                     imageClassName="object-contain mix-blend-multiply p-4 max-w-full max-h-full transition-transform duration-300 group-hover:scale-[1.01]"
                   />
                 </div>
               </div>
             )}

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-sage-light/20 p-6 rounded-2xl border border-sage-light/50">
                  <h4 className="text-sm font-bold text-anthracite-soft/60 uppercase tracking-wider mb-2">Format</h4>
                  <p className="text-xl font-semibold text-teal-deep">{product.format}</p>
               </div>
               {product.dosage && (
                 <div className="bg-sage-light/20 p-6 rounded-2xl border border-sage-light/50">
                    <h4 className="text-sm font-bold text-anthracite-soft/60 uppercase tracking-wider mb-2">Dosage</h4>
                    <p className="text-xl font-semibold text-teal-deep">{product.dosage}</p>
                 </div>
               )}
               {product.duration && (
                 <div className="bg-sage-light/20 p-6 rounded-2xl border border-sage-light/50">
                    <h4 className="text-sm font-bold text-anthracite-soft/60 uppercase tracking-wider mb-2">Durée</h4>
                    <p className="text-xl font-semibold text-teal-deep">{product.duration}</p>
                 </div>
               )}
               {product.certifications && product.certifications.length > 0 && (
                 <div className="bg-sage-light/20 p-6 rounded-2xl border border-sage-light/50">
                    <h4 className="text-sm font-bold text-anthracite-soft/60 uppercase tracking-wider mb-3">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.certifications.map(c => (
                        <span key={c} className="bg-white text-teal-deep border border-sage-light px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                          {c}
                        </span>
                      ))}
                    </div>
                 </div>
               )}
             </div>
          </div>
        )}
      </div>

      <FullscreenModal src={fullscreenImage} onClose={() => setFullscreenImage(null)} />
    </div>
  );
}

export function RelatedProducts({ currentProductId, products }: { currentProductId: string, products: Product[] }) {
  const current = products.find(p => p.id === currentProductId);
  const t = useTranslations('ProductDetail');

  if (!current) return null;

  const related = products
    .filter(p => p.categories.some(c => current.categories.includes(c)) && p.id !== current.id)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mt-24 max-w-6xl mx-auto">
      <h2 className="text-3xl font-heading font-extrabold text-teal-deep text-center mb-12">
        {t('relatedProducts')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function FullscreenModal({ src, onClose }: { src: string | null, onClose: () => void }) {
  useEffect(() => {
    if (!src) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[210] bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageMagnifier 
              src={src} 
              alt="Fullscreen view" 
              zoomLevel={2.5}
              containerClassName="w-full h-full"
              imageClassName="object-contain drop-shadow-2xl bg-white/5 rounded-2xl p-2"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
