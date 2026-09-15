'use client';

import React, { useState } from 'react';
import { ImageMagnifier } from '@/components/ui/ImageMagnifier';
import { ProductCard } from '@/components/ui/ProductCard';
import type { Product } from '@/lib/products';

export function ProductGallery({ product }: { product: Product }) {
  const images = [
    product.imagePath,
    product.labelImagePath
  ].filter(Boolean) as string[];

  const [activeIndex, setActiveIndex] = useState(0);

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
    </div>
  );
}

export function ProductTabs({ product, colors }: { product: Product, colors: any }) {
  const [activeTab, setActiveTab] = useState<'description' | 'fiche'>('description');

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
          Description
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
          Fiche Technique
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
                <span style={{ color: colors.accent }}>✧</span> Présentation
              </h3>
              <p className="text-anthracite-soft/80 leading-relaxed text-lg">
                {product.description}
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-teal-deep font-heading flex items-center gap-2 mb-4">
                <span style={{ color: colors.accent }}>✧</span> Composition
              </h3>
              <p className="text-anthracite-soft/80 leading-relaxed text-lg">
                Formule experte conçue pour garantir une efficacité optimale et une excellente biodisponibilité. Les ingrédients sont sélectionnés pour leur pureté et leur action synergique.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-teal-deep font-heading flex items-center gap-2 mb-4">
                <span style={{ color: colors.accent }}>✧</span> Mode d'emploi
              </h3>
              <p className="text-anthracite-soft/80 leading-relaxed text-lg">
                <span className="font-semibold text-teal-deep">{product.dosage}</span>. 
                Il est recommandé de ne pas dépasser la dose journalière indiquée. 
                À consommer dans le cadre d'une alimentation variée et équilibrée et d'un mode de vie sain.
              </p>
            </section>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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

             {/* Etiquette Image */}
             {product.labelImagePath && (
               <div className="mt-8 border-t border-sage-light/50 pt-8">
                 <h4 className="text-lg font-bold text-teal-deep mb-6 text-center">Étiquette & Informations Nutritionnelles</h4>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-sage-light overflow-hidden flex justify-center">
                   <img 
                     src={product.labelImagePath}
                     alt="Étiquette du produit" 
                     className="max-w-full h-auto object-contain max-h-[600px]" 
                   />
                 </div>
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}

export function RelatedProducts({ currentProductId, products }: { currentProductId: string, products: Product[] }) {
  const current = products.find(p => p.id === currentProductId);
  if (!current) return null;

  const related = products
    .filter(p => p.category === current.category && p.id !== current.id)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mt-24 max-w-6xl mx-auto">
      <h2 className="text-3xl font-heading font-extrabold text-teal-deep text-center mb-12">
        Cela pourrait vous intéresser
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
