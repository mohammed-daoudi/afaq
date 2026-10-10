import React from 'react';
import { Metadata } from 'next';
import { Link } from '@/navigation';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/products';

type TherapeuticFamily = string;
const FAMILY_COLORS: Record<string, { primary: string, accent: string, light: string }> = {
  'Énergie & Vitalité': { primary: '#1B4D3E', accent: '#D4AF37', light: '#E8F3F1' },
  'Stress & Sommeil': { primary: '#2C3E50', accent: '#8E44AD', light: '#F4F6F7' },
  'Santé Spécifique': { primary: '#7A4E2D', accent: '#B7791F', light: '#FFF7ED' },
  'Cardio-vasculaire': { primary: '#8B1E3F', accent: '#C0392B', light: '#FDECEF' },
  'Digestion': { primary: '#2F6F4E', accent: '#4A8F61', light: '#EAF6EF' },
  'Articulation': { primary: '#2980B9', accent: '#3498DB', light: '#EAF2F8' },
  'Beauté': { primary: '#D4AF37', accent: '#C0392B', light: '#FDF2E9' },
  'Immunité': { primary: '#E67E22', accent: '#D35400', light: '#FDEDEC' },
  'Nutrition pédiatrique': { primary: '#16A085', accent: '#1ABC9C', light: '#E8F8F5' },
};
import { ProductGallery, ProductTabs, RelatedProducts } from './ProductClient';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find(p => p.id === id);

  if (!product) {
    return {
      title: 'Produit introuvable | AFAQ Health'
    };
  }

  // Use the first sentence or truncate for description
  const shortDesc = product.description.split('.')[0] + '.';

  return {
    title: `${product.name} | Pharmacie & Parapharmacie Maroc - AFAQ Health`,
    description: shortDesc,
    openGraph: {
      title: `${product.name} | AFAQ Health`,
      description: shortDesc,
      images: [{ url: product.imagePath }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | AFAQ Health`,
      description: shortDesc,
      images: [product.imagePath],
    }
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  const colors = FAMILY_COLORS[product.categories[0] as TherapeuticFamily] || { primary: '#1B4D3E', accent: '#D4AF37', light: '#E8F3F1' };
  const t = await getTranslations('ProductDetail');

  // Schema.org JSON-LD for the product
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.imagePath,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    category: product.categories.join(', ')
  };

  return (
    <div className="min-h-screen bg-ivory-soft pt-24 pb-24">
      {/* Inject JSON-LD structured data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center text-sm text-anthracite-soft/60 font-medium">
          <Link href="/produits" className="hover:text-teal-deep transition-colors">Produits</Link>
          <span className="mx-2">›</span>
          <span style={{ color: colors.accent }}>{product.categories[0]}</span>
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
                  {product.categories.join(' · ')}
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-teal-deep leading-tight mb-2">
                  {product.name}
                </h1>
                <div className="text-lg font-semibold text-gold-soft mt-2 whitespace-pre-line">
                  {product.format}
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-base text-anthracite-soft/80 leading-relaxed space-y-2">
                  {product.description.split('. ').map((sentence, idx, arr) => (
                    <p key={idx}>{sentence}{idx < arr.length - 1 ? '.' : ''}</p>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-6">
                <Link
                  href={`/pharmacies?product_id=${product.id}`}
                  className="block w-full text-center bg-teal-deep text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect"
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



        {/* Related Products */}
        <RelatedProducts currentProductId={product.id} products={products} />

      </div>
    </div>
  );
}
