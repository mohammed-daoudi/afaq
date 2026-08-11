import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ImageMagnifier } from '@/components/ui/ImageMagnifier';
import { products, FAMILY_COLORS, type TherapeuticFamily } from '@/lib/products';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  const colors = FAMILY_COLORS[product.category as TherapeuticFamily];

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
            
            {/* Left: Interactive Image */}
            <div className="h-[400px] md:h-[600px] w-full relative rounded-3xl overflow-hidden">
               <ImageMagnifier 
                 src={product.imagePath} 
                 alt={product.name}
                 zoomLevel={2}
               />
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

              <p className="text-anthracite-soft/90 leading-relaxed text-lg">
                {product.description}
              </p>

              {/* Benefits */}
              <div className="bg-sage-light/30 rounded-2xl p-6 border border-sage-light">
                <h3 className="font-bold text-teal-deep mb-4 font-heading text-lg">Bénéfices clés</h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1" style={{ color: colors.accent }}>✦</span>
                      <span className="text-anthracite-soft font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Format & Certifications */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-sage-light rounded-xl p-4 shadow-sm">
                  <div className="text-xs text-anthracite-soft/60 uppercase font-bold tracking-wider mb-1">Format</div>
                  <div className="font-semibold text-teal-deep">{product.format}</div>
                </div>
                {(product.dosage || product.duration) && (
                  <div className="bg-white border border-sage-light rounded-xl p-4 shadow-sm">
                     <div className="text-xs text-anthracite-soft/60 uppercase font-bold tracking-wider mb-1">Dosage</div>
                     <div className="font-semibold text-teal-deep">{product.dosage}</div>
                  </div>
                )}
              </div>

              {product.certifications && product.certifications.length > 0 && (
                <div className="flex gap-2 pt-2">
                  {product.certifications.includes('Vegan') && (
                    <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1.5 rounded-full">🌿 Vegan</span>
                  )}
                  {product.certifications.includes('Sans gluten') && (
                    <span className="text-xs font-bold bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full">🌾 Sans gluten</span>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="pt-6">
                <Link
                  href="/localiser"
                  className="block w-full text-center bg-teal-deep text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-opacity-95 transition-all transform hover:-translate-y-1 shimmer-effect"
                >
                  Trouver en pharmacie
                </Link>
                <p className="text-center text-xs text-anthracite-soft/60 mt-3 font-medium">
                  Disponible exclusivement en pharmacie et parapharmacie
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scientific Explanation Section */}
        <div className="max-w-5xl mx-auto space-y-16 mt-24">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-teal-deep">
               L'approche scientifique
             </h2>
             <p className="text-anthracite-soft/70 mt-4 max-w-2xl mx-auto text-lg">
               Une formulation experte conçue pour répondre précisément à vos besoins physiologiques.
             </p>
          </div>

          {/* Block 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 space-y-6">
              <h3 className="text-2xl font-bold text-teal-deep font-heading">
                Synergie d'actifs purs
              </h3>
              <p className="text-anthracite-soft/80 leading-relaxed text-lg">
                La formulation de <strong>{product.name}</strong> a été développée pour maximiser la biodisponibilité. Les ingrédients agissent en synergie pour garantir une absorption optimale par l'organisme sans irriter le système digestif.
              </p>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sage-light">
                 <h4 className="font-bold text-teal-deep mb-2">Focus biodisponibilité</h4>
                 <p className="text-sm text-anthracite-soft/70">
                   Chaque actif est sélectionné sous sa forme la plus assimilable pour garantir des résultats rapides et durables, tout en respectant les doses physiologiques journalières.
                 </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-sage-light relative shadow-lg">
                {/* Abstract science representation */}
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-deep to-[#1a7fa8] opacity-10"></div>
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">🧬</div>
              </div>
            </div>
          </div>

          {/* Block 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="order-1">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-sage-light relative shadow-lg">
                 <div className="absolute inset-0 bg-gradient-to-br from-gold-soft to-teal-deep opacity-10"></div>
                 <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">🔬</div>
              </div>
            </div>
            <div className="order-2 space-y-6">
              <h3 className="text-2xl font-bold text-teal-deep font-heading">
                Efficacité cliniquement prouvée
              </h3>
              <p className="text-anthracite-soft/80 leading-relaxed text-lg">
                Les actifs utilisés dans cette formule font l'objet de nombreuses études cliniques démontrant leur efficacité. En soutenant le métabolisme naturel de l'organisme, ils offrent une réponse physiologique profonde et non superficielle.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center flex-shrink-0 text-teal-deep font-bold">1</div>
                  <p className="text-sm text-anthracite-soft font-medium pt-2">Agit au cœur des cellules pour une action ciblée.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center flex-shrink-0 text-teal-deep font-bold">2</div>
                  <p className="text-sm text-anthracite-soft font-medium pt-2">Protège contre le stress oxydatif et cellulaire.</p>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
