import React from 'react';
import { Link } from '@/navigation';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products, FAMILY_COLORS, type TherapeuticFamily } from '@/lib/products';
import { ProductGallery, ProductTabs, RelatedProducts } from './ProductClient';
import { useTranslations } from 'next-intl';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  const colors = FAMILY_COLORS[product.category as TherapeuticFamily];
  const t = useTranslations('ProductDetail');

  return (
    <div className="min-h-screen bg-ivory-soft pt-24 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center text-sm text-anthracite-soft/60 font-medium">
          <Link href="/produits" className="hover:text-teal-deep transition-colors">Produits</Link>
          <span className="mx-2">›</span>
          <span style={{ color: colors.accent }}>{product.category}</span>
          <span className="mx-2">›</span>
          <span className="text-teal-deep font-bold">{product.name}</span>
        </div>

        {/* Top Section: Image & Summary */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-sage-light p-6 md:p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left: Interactive Image Gallery */}
            <div className="w-full relative rounded-3xl overflow-hidden">
               <ProductGallery product={product} />
            </div>

            {/* Right: Product Details */}
            <div className="space-y-8">
              <div>
                <div 
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border"
                  style={{ backgroundColor: `${colors.accent}15`, color: colors.accent, borderColor: `${colors.accent}30` }}
                >
                  {product.category}
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep leading-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-anthracite-soft/80 font-medium">
                  {product.brand}
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-sage-light/30 rounded-2xl p-6 border border-sage-light">
                <h3 className="font-bold text-teal-deep mb-4 font-heading text-lg">{t('keyBenefits')}</h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1" style={{ color: colors.accent }}>✦</span>
                      <span className="text-anthracite-soft font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="pt-6">
                <Link
                  href={`/pharmacies?product_id=${product.id}`}
                  className="block w-full text-center bg-teal-deep text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-opacity-95 transition-all transform hover:-translate-y-1 shimmer-effect"
                >
                  {t('findPharmacy')}
                </Link>
                <p className="text-center text-xs text-anthracite-soft/60 mt-3 font-medium">
                  {t('exclusiveAvailability')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Tabs: Description / Fiche Technique */}
        <ProductTabs product={product} colors={colors} />

        {/* Scientific Explanation Section */}
        <div className="max-w-5xl mx-auto space-y-16 mt-24">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-teal-deep">
               {t('scientificApproach')}
             </h2>
             <p className="text-anthracite-soft/70 mt-4 max-w-2xl mx-auto text-lg">
               {t('expertFormulation')}
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 space-y-8">
              <h3 className="text-3xl font-bold text-teal-deep font-heading">
                {t('synergy')}
              </h3>
              <div className="text-anthracite-soft/80 leading-relaxed text-lg space-y-4">
                <p>
                  {t('formulationOf')} <strong>{product.name}</strong> {t('developedInLabs')}
                </p>
                <p>
                  {t('nothingToChance')}
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-sage-light/50">
                 <div className="flex items-center gap-3 mb-4">
                   <span className="text-2xl">🔬</span>
                   <h4 className="font-bold text-xl text-teal-deep">{t('focusBio')}</h4>
                 </div>
                 <p className="text-base text-anthracite-soft/80 leading-relaxed">
                   {t('eachActive')}
                 </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl mt-8">
                  <Image 
                    src="/images/unsplash/science/microscope.jpg" 
                    alt="Recherche scientifique" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-deep to-transparent opacity-20 mix-blend-multiply"></div>
                </div>
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl mb-8">
                  <Image 
                    src="/images/unsplash/formulations/formulation_4.jpg" 
                    alt="Formulation de suppléments" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-deep to-transparent opacity-20 mix-blend-multiply"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts currentProductId={product.id} products={products} />

      </div>
    </div>
  );
}
