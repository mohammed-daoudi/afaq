'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/lib/products';
import { useTranslations } from 'next-intl';

interface ProductCardProps {
  product: Product;
}

const PRODUCT_CARD_IMAGE_ADJUSTMENTS: Record<string, { scale: number; translateX: string; bottom: string }> = {
  'bisglycinate-magnesium': { scale: 0.95, translateX: '0.1%', bottom: '0%' },
  'complexe-vitamines-b': { scale: 1.03, translateX: '-0.4%', bottom: '-3.9%' },
  'complexe-melatonine': { scale: 1.05, translateX: '0.2%', bottom: '-2.3%' },
  'melatonine': { scale: 1.05, translateX: '0.2%', bottom: '-2.3%' },
  'ashwagandha': { scale: 1.04, translateX: '0%', bottom: '-2.3%' },
  'complexe-vitamine-c': { scale: 1.01, translateX: '0%', bottom: '-0.5%' },
  'complexe-propolis-forte': { scale: 1.08, translateX: '-0.3%', bottom: '-1%' },
  'complexe-omega-369': { scale: 0.96, translateX: '0.1%', bottom: '-0.1%' },
  'prostal': { scale: 1.55, translateX: '1.4%', bottom: '-25%' },
  'huile-onagre': { scale: 1, translateX: '0%', bottom: '0%' },
  'charbon-actif-probiotiques': { scale: 1.04, translateX: '0.4%', bottom: '0.8%' },
  'collagene': { scale: 1.04, translateX: '0%', bottom: '0%' },
  'peau-cheveux-ongles': { scale: 0.92, translateX: '-0.3%', bottom: '0%' },
  'multivitamines-mineraux': { scale: 0.94, translateX: '-0.1%', bottom: '-0.4%' },
};

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations('ProductCard');
  const imageAdjustment = PRODUCT_CARD_IMAGE_ADJUSTMENTS[product.id] ?? {
    scale: 1,
    translateX: '0%',
    bottom: '0%',
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <>
      {/* Simple Product Item */}
      <div 
        className="group cursor-pointer flex flex-col h-full"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image Container */}
        <div className="relative w-full aspect-square mb-4 overflow-hidden">
          <div
            className="absolute left-0 right-0 h-full w-full"
            style={{
              bottom: imageAdjustment.bottom,
              transform: `translateX(${imageAdjustment.translateX}) scale(${imageAdjustment.scale})`,
              transformOrigin: 'bottom center',
            }}
          >
            <Image
              src={product.imagePath}
              alt={product.name}
              fill
              className="object-contain mix-blend-multiply opacity-90 transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          {/* Optional Badges (like Vegan/Gluten Free) */}
          {product.certifications && product.certifications.length > 0 && (
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              {product.certifications.includes('Vegan') && (
                <span className="text-xs font-bold bg-green-100/90 text-green-700 px-2 py-1 rounded-full shadow-sm">🌿</span>
              )}
              {product.certifications.includes('Sans gluten') && (
                <span className="text-xs font-bold bg-amber-100/90 text-amber-700 px-2 py-1 rounded-full shadow-sm">SG</span>
              )}
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="flex flex-col flex-1 text-left mt-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gold-soft mb-1 line-clamp-1">
            {product.categories.join(' · ')}
          </span>
          <h3 className="font-bold text-sm md:text-base text-anthracite-deep leading-snug group-hover:text-teal-deep transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-anthracite-soft mt-1.5 line-clamp-2">
            {product.format || product.description}
          </p>
          <div className="mt-4 flex items-center text-teal-deep text-xs font-bold group-hover:text-gold-soft transition-colors">
            Découvrir le produit <span className="ml-1">→</span>
          </div>
        </div>
      </div>

      {/* Quick-View Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-anthracite-deep/60 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur hover:bg-ivory-soft text-anthracite-soft px-3 py-1.5 rounded-full text-xs font-bold transition-colors shadow-sm flex items-center gap-1 border border-sage-light"
              >
                Quitter <span className="text-base leading-none">&times;</span>
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 bg-ivory-soft/50 p-6 relative flex items-center justify-center min-h-[280px] md:min-h-[400px]">
                <div className="relative w-full h-full min-h-[250px]">
                  <Image
                    src={product.imagePath}
                    alt={`${product.name}`}
                    fill
                    className="object-contain mix-blend-multiply opacity-90 p-4"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center overflow-y-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-deep/60 mb-2">
                  {product.categories.join(' · ')}
                </span>
                <h2 className="text-3xl font-extrabold text-teal-deep mb-2">
                  {product.name}
                </h2>
                <div className="text-sm font-semibold text-gold-soft mb-4 whitespace-pre-line">
                  {product.format}
                </div>
                <div className="text-sm text-anthracite-soft/80 mb-6 leading-relaxed space-y-2">
                  {product.description.split('. ').map((sentence, idx, arr) => (
                    <p key={idx}>{sentence}{idx < arr.length - 1 ? '.' : ''}</p>
                  ))}
                </div>



                <div className="mt-auto">
                  <button
                    onClick={() => router.push(`/produits/${product.id}`)}
                    className="w-full bg-teal-deep text-white py-3.5 font-bold rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect"
                  >
                    {t('viewDetails')}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
