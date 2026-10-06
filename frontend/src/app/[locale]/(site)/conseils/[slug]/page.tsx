import React from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, AlertTriangle, Lightbulb } from 'lucide-react';
import { MOCK_ARTICLES } from '@/data/conseils';
import { useTranslations } from 'next-intl';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = MOCK_ARTICLES.find(a => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = MOCK_ARTICLES.filter(a => a.slug !== article.slug).slice(0, 3);
  const t = useTranslations('ConseilsPage');

  return (
    <div className="min-h-screen bg-ivory-soft pt-12 pb-24">
      {/* Article Header */}
      <div className="container mx-auto px-4 max-w-7xl mb-12">
        <Link
          href="/conseils"
          className="inline-flex items-center gap-2 text-teal-deep font-semibold hover:text-gold-soft transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>{t('back')}</span>
        </Link>

        <div className="space-y-6 lg:w-2/3">
          <div className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-teal-deep bg-sage-light rounded-full uppercase">
            {article.category}
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-teal-deep leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-anthracite-soft/70 font-semibold uppercase tracking-wider border-y border-sage-light/50 py-4">
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-gold-soft" />
              {article.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-gold-soft" />
              {article.readTime}
            </span>
          </div>
        </div>
      </div>
      {/* Article Content & Sidebar */}
      <div className="container mx-auto px-4 max-w-7xl flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

        {/* Left Column: Content */}
        <div className="lg:w-2/3 flex flex-col">
          <div className="text-xl md:text-2xl text-teal-deep font-medium leading-relaxed mb-12 border-l-4 border-gold-soft pl-6">
            {article.intro}
          </div>

          {/* Prose Content */}
          <div
            className="mb-16 max-w-none [&_h2]:text-3xl md:[&_h2]:text-4xl [&_h2]:text-black [&_h2]:font-semibold [&_h2]:mt-12 [&_h2]:mb-6 [&_p]:text-lg md:[&_p]:text-xl [&_p]:text-anthracite-soft/90 [&_p]:leading-loose [&_p]:mb-6 [&_ul]:list-disc [&_ul]:pl-8 [&_ul]:mb-6 [&_ul]:text-lg md:[&_ul]:text-xl [&_ul]:text-anthracite-soft/90 [&_ul]:space-y-2 [&_a]:text-gold-soft hover:[&_a]:text-teal-deep [&_strong]:text-gold-soft [&_strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Featured Media (Mobile Only) */}
          <div className="lg:hidden relative h-[300px] sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-xl mb-8 bg-black">
            {(article as any).video ? (
              <video
                src={(article as any).video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          {/* CTA Box (Mobile Only) */}
          {article.slug === 'magnesium-comment-choisir-bonne-formule' && (
            <div className="lg:hidden bg-white border border-sage-light rounded-2xl p-6 mb-12 shadow-md text-center">
              <h3 className="text-xl font-bold text-teal-deep mb-3">Envie d'aller plus loin ?</h3>
              <p className="text-anthracite-soft/80 mb-6 font-medium">Découvrez notre formule synergique associant Magnésium, Zinc et Vitamine D3.</p>
              <Link href="/produits/bisglycinate-magnesium" className="inline-block text-sm font-bold bg-teal-deep text-white px-6 py-3 whitespace-nowrap rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect uppercase tracking-wider">
                DÉCOUVRIR LE BISGLYCINATE DE MAGNÉSIUM
              </Link>
            </div>
          )}
          {article.slug === 'sante-masculine-comprendre-prostate' && (
            <div className="lg:hidden bg-white border border-sage-light rounded-2xl p-6 mb-12 shadow-md text-center">
              <h3 className="text-xl font-bold text-teal-deep mb-3">Envie d'aller plus loin ?</h3>
              <p className="text-anthracite-soft/80 mb-6 font-medium">Découvrez notre formule synergique associant plusieurs extraits végétaux et du zinc pour la santé masculine.</p>
              <Link href="/produits/prostal" className="inline-block text-sm font-bold bg-teal-deep text-white px-6 py-3 whitespace-nowrap rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect uppercase tracking-wider">
                DÉCOUVRIR PROSTAL
              </Link>
            </div>
          )}

          {/* Takeaway Box */}
          {article.takeaway && (
            <div className="bg-sage-light/30 border border-sage-light rounded-3xl p-8 mb-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Lightbulb size={120} />
              </div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="bg-white p-3 rounded-2xl shadow-sm text-gold-soft flex-shrink-0">
                  <Lightbulb size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-teal-deep mb-2">{t('takeaway')}</h3>
                  <p className="text-anthracite-soft/90 font-medium leading-relaxed">
                    {article.takeaway}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sidebar (Image & Disclaimer) */}
        <div className="lg:w-1/3 sticky top-[160px] flex flex-col gap-8">
            {/* Featured Media (Desktop Only) */}
            <div className="hidden lg:block relative h-[450px] w-full rounded-3xl overflow-hidden shadow-xl bg-black">
              {(article as any).video ? (
                <video
                  src={(article as any).video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>

            {/* Disclaimer */}
            <div className="bg-white rounded-3xl p-6 border border-teal-light/20 shadow-sm flex items-start gap-4">
              <AlertTriangle className="text-gold-soft flex-shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-teal-deep text-sm uppercase tracking-wider mb-1">{t('importantInfo')}</h4>
                <p className="text-sm text-anthracite-soft/70 leading-relaxed ">
                  {t('disclaimer')}
                </p>
              </div>
            </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="container mx-auto px-4 mt-24 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-teal-deep text-center mb-12">
            {t('relatedArticles')}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {relatedArticles.map(related => (
              <Link
                key={related.slug}
                href={`/conseils/${related.slug}`}
                className="group block bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
              >
                <div className="relative h-64 w-full shrink-0 overflow-hidden">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="text-xs font-bold text-gold-soft uppercase tracking-widest mb-4">
                    {related.category}
                  </div>
                  <h3 className="text-xl font-bold text-teal-deep mb-4 line-clamp-2 group-hover:text-gold-soft transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-sm text-anthracite-soft/80 leading-relaxed line-clamp-3 mb-6 flex-1">
                    {related.intro}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
