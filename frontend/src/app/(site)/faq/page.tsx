'use client';

import React, { useState } from 'react';

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

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<string>('0-0');

  const toggleAccordion = (index: string) => {
    setOpenIndex(openIndex === index ? '' : index);
  };

  return (
    <div className="min-h-screen bg-ivory-soft pt-12 pb-24">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-teal-deep bg-sage-light rounded-full uppercase">
            Centre d'Aide
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep">
            Questions <span className="text-gold-soft">Fréquentes</span>
          </h1>
          <p className="text-lg text-anthracite-soft/80 font-sans">
            Retrouvez les réponses aux questions les plus posées par nos partenaires professionnels et le grand public.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="max-w-4xl mx-auto space-y-12">
          {faqs.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-6">
              <h2 className="text-2xl font-heading font-bold text-teal-deep border-b-2 border-sage-light pb-2">
                {group.category}
              </h2>
              
              <div className="space-y-4">
                {group.questions.map((faq, faqIdx) => {
                  const currentIndex = `${groupIdx}-${faqIdx}`;
                  const isOpen = openIndex === currentIndex;
                  
                  return (
                    <div 
                      key={faqIdx} 
                      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isOpen ? 'border-gold-soft shadow-md' : 'border-sage-light shadow-sm'
                      }`}
                    >
                      <button
                        onClick={() => toggleAccordion(currentIndex)}
                        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                      >
                        <span className="font-bold text-teal-deep pr-8">{faq.q}</span>
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

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto mt-20 text-center bg-teal-deep text-white p-10 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-soft rounded-full opacity-10 blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <h3 className="text-2xl font-heading font-bold mb-4 relative z-10">Vous n'avez pas trouvé votre réponse ?</h3>
          <p className="text-sage-light mb-8 relative z-10 max-w-lg mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions complémentaires.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-gold-soft text-teal-deep font-bold px-8 py-3 rounded-xl hover:bg-white transition-colors relative z-10"
          >
            Contactez-nous
          </a>
        </div>

      </div>
    </div>
  );
}
