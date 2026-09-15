import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, AlertTriangle, Lightbulb } from 'lucide-react';
import { MOCK_ARTICLES } from '@/data/conseils';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = MOCK_ARTICLES.find(a => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-ivory-soft pt-12 pb-24">
      {/* Article Header */}
      <div className="container mx-auto px-4 max-w-4xl mb-12">
        <Link 
          href="/conseils"
          className="inline-flex items-center gap-2 text-teal-deep font-semibold hover:text-gold-soft transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Retour aux conseils</span>
        </Link>
        
        <div className="space-y-6">
          <div className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-teal-deep bg-sage-light rounded-full uppercase">
            {article.category}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep leading-tight">
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

      {/* Featured Image */}
      <div className="container mx-auto px-4 max-w-5xl mb-16">
        <div className="relative h-[400px] md:h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-lg">
          <Image 
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-xl md:text-2xl text-teal-deep font-heading font-medium leading-relaxed mb-12 italic border-l-4 border-gold-soft pl-6">
          {article.intro}
        </div>

        {/* Prose Content */}
        <div 
          className="prose prose-xl md:prose-2xl prose-headings:font-heading prose-headings:text-teal-deep prose-headings:font-extrabold prose-headings:italic prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-p:text-anthracite-soft/90 prose-p:font-serif prose-p:leading-loose prose-a:text-gold-soft hover:prose-a:text-teal-deep prose-strong:text-gold-soft mb-20 max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Takeaway Box */}
        {article.takeaway && (
          <div className="bg-sage-light/30 border border-sage-light rounded-3xl p-8 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Lightbulb size={120} />
            </div>
            <div className="relative z-10 flex items-start gap-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm text-gold-soft">
                <Lightbulb size={24} />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-teal-deep mb-2">À retenir</h3>
                <p className="text-anthracite-soft/90 font-medium leading-relaxed">
                  {article.takeaway}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-white rounded-3xl p-6 border border-teal-light/20 shadow-sm flex items-start gap-4">
          <AlertTriangle className="text-gold-soft flex-shrink-0 mt-1" size={24} />
          <div>
            <h4 className="font-bold text-teal-deep text-sm uppercase tracking-wider mb-1">Information importante</h4>
            <p className="text-sm text-anthracite-soft/70 leading-relaxed italic">
              Les informations publiées sur ce site sont destinées à des fins informatives et éducatives. Elles ne remplacent pas l'avis d'un professionnel de santé. En cas de doute, consultez toujours votre médecin ou votre pharmacien.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
