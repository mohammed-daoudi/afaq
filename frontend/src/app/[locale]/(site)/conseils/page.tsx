'use client';

import React, { useState } from 'react';
import { Link } from '@/navigation';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { CATEGORIES, MOCK_ARTICLES } from '@/data/conseils';
import { useTranslations } from 'next-intl';

const faqs = [
  {
    category: 'Professionnels (Pharmacies & Grossistes)',
    questions: [
      {
        q: 'Comment passer commande auprès d\'AFAQ Health ?',
        a: 'Toutes les commandes s\'effectuent exclusivement via notre portail B2B. Pour y accéder, vous devez créer un compte professionnel qui sera validé par notre équipe. Une fois validé, vous aurez accès à vos tarifs personnalisés et pourrez commander directement en ligne.'
      },
      {
        q: 'Quels sont les délais de livraison ?',
        a: 'Pour le Maroc, les commandes validées avant 12h sont généralement expédiées le jour même. La livraison prend 24h à 48h selon votre région. Pour l\'Afrique de l\'Ouest, les délais varient selon le pays de destination et les procédures douanières.'
      },
      {
        q: 'Les produits sont-ils conformes à la réglementation marocaine ?',
        a: 'Oui, absolument. 100% de nos références sont enregistrées auprès de la Direction du Médicament et de la Pharmacie (AMMPS) avant toute commercialisation sur le territoire marocain.'
      },
      {
        q: 'Proposez-vous des supports d\'aide à la vente (PLV) ?',
        a: 'Oui, nous accompagnons nos pharmacies partenaires avec du matériel de PLV, des formations sur les produits, et un support scientifique complet.'
      }
    ]
  },
  {
    category: 'Laboratoires & Fabricants',
    questions: [
      {
        q: 'Quels territoires couvrez-vous ?',
        a: 'Nous détenons des accords d\'exclusivité pour le Maroc ainsi que pour 8 pays d\'Afrique de l\'Ouest francophone.'
      },
      {
        q: 'Gérez-vous le processus d\'enregistrement AMMPS ?',
        a: 'Oui, notre équipe réglementaire prend en charge l\'intégralité du processus d\'homologation auprès des autorités sanitaires, de la constitution du dossier jusqu\'à l\'obtention du certificat.'
      }
    ]
  },
  {
    category: 'Grand Public & Patients',
    questions: [
      {
        q: 'Puis-je acheter vos produits directement sur ce site ?',
        a: 'Non, AFAQ Health est un distributeur exclusif aux professionnels de santé. Nos produits sont disponibles uniquement en pharmacie.'
      },
      {
        q: 'Où puis-je trouver vos produits ?',
        a: 'Vous pouvez consulter la page "Localiser" sur notre site pour trouver la pharmacie partenaire la plus proche de chez vous.'
      }
    ]
  }
];

export default function ConseilsPage() {
  const [activeCategory, setActiveCategory] = useState('Toutes');
  const [openIndex, setOpenIndex] = useState<string>('0-0');
  const t = useTranslations('ConseilsPage');

  const toggleAccordion = (index: string) => {
    setOpenIndex(openIndex === index ? '' : index);
  };

  
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
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-teal-deep">
            {t('title')} <span className="text-gold-soft text-5xl md:text-7xl font-light italic ml-2">{t('titleHighlight')}</span>
          </h1>
          <p className="text-lg md:text-xl text-anthracite-soft/80 font-sans max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-teal-deep text-white shadow-md transform -translate-y-0.5'
                  : 'bg-white text-teal-deep border border-sage-light hover:border-teal-deep/30 hover:bg-teal-deep/5'
              }`}
            >
              {category === 'Toutes' ? t('allCategories') : category}
            </button>
          ))}
        </div>

        {activeCategory === 'Actualités AFAQ' ? (
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl font-heading font-bold text-teal-deep text-center mb-8">{t('faqTitle')}</h2>
            {faqs.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-6">
                <h3 className="text-2xl font-heading font-bold text-teal-deep border-b-2 border-sage-light pb-2">
                  {group.category}
                </h3>
                <div className="space-y-4">
                  {group.questions.map((faq, faqIdx) => {
                    const currentIndex = `${groupIdx}-${faqIdx}`;
                    const isOpen = openIndex === currentIndex;
                    return (
                      <div 
                        key={faqIdx} 
                        className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                          isOpen ? 'border-gold-soft shadow-md' : 'border-sage-light shadow-sm hover:border-gold-soft/50'
                        }`}
                      >
                        <button
                          onClick={() => toggleAccordion(currentIndex)}
                          className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                        >
                          <span className={`font-bold pr-8 transition-colors ${isOpen ? 'text-gold-soft' : 'text-teal-deep'}`}>{faq.q}</span>
                          <span className={`text-gold-soft transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                            ▼
                          </span>
                        </button>
                        <div 
                          className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                            isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <p className="text-anthracite-soft/80 text-sm leading-relaxed border-t border-sage-light/30 pt-4">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
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
                  
                  <h3 className="text-2xl font-heading font-bold text-teal-deep leading-snug mb-4 group-hover:text-gold-soft transition-colors duration-300">
                    {article.title}
                  </h3>
                  
                  <p className="text-anthracite-soft/80 font-sans leading-relaxed mb-8 flex-grow">
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
        )}
        
        {filteredArticles.length === 0 && activeCategory !== 'Actualités AFAQ' && (
          <div className="text-center py-24 text-anthracite-soft/60">
            <p className="text-xl font-heading">{t('noArticles')}</p>
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
