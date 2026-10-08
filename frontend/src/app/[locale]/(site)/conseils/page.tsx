'use client';

import React, { useState } from 'react';
import { Link } from '@/navigation';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { CATEGORIES, MOCK_ARTICLES } from '@/data/conseils';
import { useTranslations } from 'next-intl';

export default function ConseilsPage() {
  const [activeCategory, setActiveCategory] = useState('Toutes');
  const t = useTranslations('ConseilsPage');

  const filteredArticles = activeCategory === 'Toutes' 
    ? MOCK_ARTICLES 
    : MOCK_ARTICLES.filter(article => article.category === activeCategory);

  return (
    <div className="min-h-screen bg-ivory-soft pt-12 pb-24 flex flex-col">
      <div className="container mx-auto px-4">
        
        {/* Page Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
          <div className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-teal-deep bg-sage-light rounded-full uppercase">
            {t('tag')}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-teal-deep">
            {t('title')} <span className="text-gold-soft text-5xl md:text-7xl font-light ml-2">{t('titleHighlight')}</span>
          </h1>
          <p className="text-lg md:text-xl text-anthracite-soft/80 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 text-sm font-semibold ${ activeCategory === category ? 'bg-teal-deep text-white -translate-y-0.5' : 'bg-white text-teal-deep border border-sage-light' } rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect`}
            >
              {category === 'Toutes' ? t('allCategories') : category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredArticles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/conseils/${article.slug}`}
              className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm border border-sage-light/50 hover:shadow-xl hover:border-teal-light/30 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
                {/* Image Container */}
                <div className="relative h-64 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-teal-deep/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <Image 
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-teal-deep text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow p-8 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-anthracite-soft/60 font-semibold uppercase tracking-wider mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-teal-deep leading-snug mb-4 group-hover:text-gold-soft transition-colors duration-300">
                    {article.title}
                  </h3>
                  
                  <p className="text-anthracite-soft/80 leading-relaxed mb-8 flex-grow">
                    {article.intro}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-sage-light/30 flex items-center justify-between text-teal-deep font-bold group-hover:text-gold-soft transition-colors duration-300">
                    <span className="text-sm tracking-wide">{t('readArticle')}</span>
                    <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
            </Link>
          ))}
        </div>
        
        {filteredArticles.length === 0 && (
          <div className="text-center py-24 text-anthracite-soft/60">
            <p className="text-xl ">{t('noArticles')}</p>
            <button 
              onClick={() => setActiveCategory('Toutes')}
              className="mt-4 text-teal-deep font-semibold underline underline-offset-4 hover:text-gold-soft transition-colors"
            >
              {t('viewAll')}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
