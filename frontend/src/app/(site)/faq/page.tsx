'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<string>('0-0');

  const toggleAccordion = (index: string) => {
    setOpenIndex(openIndex === index ? '' : index);
  };

  return (
    <div className="min-h-screen bg-ivory-soft pt-12 pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div 
          initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
          className="max-w-3xl mx-auto text-center mb-16 space-y-6"
        >
          <motion.div variants={fadeUp} className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-teal-deep bg-sage-light rounded-full uppercase">
            Centre d'Aide
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep">
            Questions <span className="text-gold-soft">Fréquentes</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-anthracite-soft/80 font-sans">
            Retrouvez les réponses aux questions les plus posées par nos partenaires professionnels et le grand public.
          </motion.p>
        </motion.div>

        {/* Content with Image and Accordions */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Animated Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
            className="lg:col-span-5 relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl sticky top-24"
          >
            <Image 
              src="/tsawrsotya/faq_support.png" 
              alt="Support Client AFAQ Health" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-1000" 
            />
            <div className="absolute inset-0 bg-teal-deep/5 pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-teal-deep text-lg mb-2">Besoin d'assistance directe ?</h3>
              <p className="text-anthracite-soft/80 text-sm mb-4">Notre équipe de pharmaciens est à votre écoute.</p>
              <a href="/contact" className="inline-block w-full text-center bg-gold-soft text-teal-deep font-bold px-4 py-2 rounded-xl hover:bg-teal-deep hover:text-white transition-colors">
                Nous contacter
              </a>
            </div>
          </motion.div>

          {/* Right Side: FAQ Accordions */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
            className="lg:col-span-7 space-y-12"
          >
            {faqs.map((group, groupIdx) => (
              <motion.div variants={fadeUp} key={groupIdx} className="space-y-6">
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
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
