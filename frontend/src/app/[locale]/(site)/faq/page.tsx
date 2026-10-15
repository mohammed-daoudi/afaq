'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/navigation';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

const faqCategories: FaqCategory[] = [
  {
    title: 'CATÉGORIE 1 — Nos marques et leur disponibilité',
    items: [
      {
        q: '1. Quelles marques sont distribuées par AFAQ Health ?',
        a: "AFAQ Health développe un portefeuille de marques européennes dans les domaines de la santé, de la nutrition et du bien-être.\n\nNotre portefeuille comprend notamment SOTYA, spécialisée dans les compléments alimentaires, Naturamins Kids, dédiée à la nutrition pédiatrique, et COLAGENOVA®, orientée vers les solutions nutritionnelles à base de collagène.\n\nLa disponibilité de chaque marque dépend de son calendrier de lancement et des autorisations applicables au Maroc.",
      },
      {
        q: '2. Où trouver les produits SOTYA au Maroc ?',
        a: "Les produits SOTYA commercialisés au Maroc peuvent être recherchés auprès de nos points de vente partenaires.\n\nPour vérifier la disponibilité d'une référence dans votre ville, consultez notre rubrique « Où acheter ? » ou contactez directement AFAQ Health.",
      },
      {
        q: '3. Les marques Naturamins Kids et COLAGENOVA® sont-elles disponibles au Maroc ?',
        a: "Ces deux marques font partie du portefeuille en développement d'AFAQ Health.\n\nLeur commercialisation au Maroc dépend de l'aboutissement des démarches réglementaires applicables et de la disponibilité effective des produits. Les informations relatives à leur lancement seront communiquées sur notre site.",
      },
      {
        q: '4. Comment savoir si un produit est commercialisable au Maroc ?',
        a: "La disponibilité d'un produit sur notre site ne signifie pas nécessairement qu'il est déjà commercialisable au Maroc.\n\nNous communiquons sur les références effectivement autorisées et disponibles. Pour obtenir une confirmation concernant un produit précis, nous vous invitons à contacter AFAQ Health.",
      },
      {
        q: '5. Comment contacter AFAQ Health pour obtenir des informations sur un produit ?',
        a: "Vous pouvez nous contacter à travers le formulaire disponible sur notre page « Contact ».\n\nMerci de préciser le nom du produit ou de la marque concernée afin que nous puissions vous orienter vers les informations appropriées.",
      },
    ],
  },
  {
    title: 'CATÉGORIE 2 — Bien choisir ses compléments alimentaires',
    items: [
      {
        q: '6. Comment choisir un complément alimentaire adapté à ses besoins ?',
        a: "Le choix dépend de vos besoins nutritionnels, de votre alimentation, de votre âge et de votre situation personnelle.\n\nNous vous recommandons de lire attentivement la composition, les dosages, les indications et les précautions figurant sur l'étiquetage. En cas de doute, demandez conseil à un pharmacien ou à un professionnel de santé.",
      },
      {
        q: '7. Quelle est la différence entre les différentes formes de magnésium ?',
        a: "Les compléments alimentaires peuvent contenir différentes formes de magnésium, qui se distinguent notamment par leur composition et leur teneur en magnésium élémentaire.\n\nPour comparer deux produits, examinez la forme utilisée, la quantité de magnésium élémentaire apportée par la dose journalière et les recommandations d'utilisation.\n\nLe choix ne doit pas reposer uniquement sur le nom de la forme ou sur une affirmation générale de supériorité.",
      },
      {
        q: '8. Comment choisir une formule de mélatonine ?',
        a: "Le choix dépend de la composition du produit et de son usage prévu.\n\nCertaines formules contiennent de la mélatonine seule, tandis que d'autres l'associent à des extraits végétaux. Il convient de vérifier la composition, le dosage et les précautions d'emploi de chaque référence.\n\nSi les difficultés de sommeil persistent, demandez conseil à un professionnel de santé.",
      },
      {
        q: '9. Quels critères prendre en compte pour choisir un complément à base de collagène ?',
        a: "Il est utile d'examiner l'origine du collagène, sa forme, sa quantité par dose journalière et les autres ingrédients de la formule.\n\nLes caractéristiques et les usages prévus peuvent varier d'un produit à l'autre. Il est donc important de consulter la fiche du produit concerné plutôt que de considérer toutes les formules comme équivalentes.",
      },
      {
        q: '10. Les compléments alimentaires remplacent-ils une alimentation équilibrée ?',
        a: "Non. Les compléments alimentaires sont destinés à compléter l'alimentation et ne remplacent ni une alimentation variée et équilibrée ni un mode de vie sain.\n\nIls doivent être utilisés conformément aux recommandations propres à chaque produit.",
      },
    ],
  },
  {
    title: "CATÉGORIE 3 — Conseils d'utilisation et précautions",
    items: [
      {
        q: '11. À quel moment de la journée faut-il prendre ses compléments alimentaires ?',
        a: "Le moment de prise dépend de la composition et des recommandations du produit.\n\nCertains compléments sont à prendre pendant un repas, tandis que d'autres peuvent avoir des consignes différentes. Respectez toujours la dose journalière et le mode d'emploi indiqués sur l'étiquetage.",
      },
      {
        q: '12. Quelle est la durée recommandée pour une cure ?',
        a: "Il n'existe pas de durée universelle applicable à tous les compléments alimentaires.\n\nLa durée d'utilisation dépend du produit, de sa composition et des recommandations qui lui sont propres. Consultez son étiquetage et demandez conseil à un professionnel de santé si nécessaire.",
      },
      {
        q: '13. Peut-on associer plusieurs compléments alimentaires ?',
        a: "Cela dépend de leur composition, des dosages et de votre situation personnelle.\n\nPlusieurs produits peuvent apporter les mêmes nutriments ou contenir des ingrédients susceptibles d'interagir entre eux ou avec certains médicaments.\n\nAvant d'associer plusieurs compléments, vérifiez leurs compositions et demandez conseil à un pharmacien ou à un médecin, particulièrement si vous suivez un traitement.",
      },
      {
        q: '14. Peut-on prendre des compléments alimentaires pendant la grossesse ou l\'allaitement ?',
        a: "La grossesse et l'allaitement nécessitent des précautions particulières.\n\nTous les compléments alimentaires ne sont pas adaptés à ces situations. Avant d'en utiliser un, demandez conseil à un médecin ou à un pharmacien et vérifiez les précautions propres au produit.",
      },
      {
        q: '15. Que faire si l\'on prend déjà un traitement médical ?',
        a: "Informez votre médecin ou votre pharmacien avant de commencer un complément alimentaire.\n\nCertains ingrédients peuvent interagir avec des médicaments ou nécessiter des précautions particulières selon votre état de santé.\n\nNe modifiez jamais un traitement médical pour le remplacer par un complément alimentaire.",
      },
    ],
  },
  {
    title: 'CATÉGORIE 4 — Questions sur des besoins spécifiques',
    items: [
      {
        q: '16. Quels nutriments contribuent au fonctionnement normal du système immunitaire ?',
        a: "Certains nutriments, comme les vitamines C et D et le zinc, contribuent au fonctionnement normal du système immunitaire.\n\nLeurs rôles et les conditions d'utilisation des produits qui en contiennent dépendent de leur composition et de leurs dosages.\n\nUn complément alimentaire ne remplace pas une alimentation équilibrée et ne garantit pas de prévenir les infections.",
      },
      {
        q: '17. Que faut-il savoir avant d\'utiliser un complément destiné au sommeil ?',
        a: "Les compléments destinés au sommeil peuvent contenir différents ingrédients, notamment de la mélatonine ou des extraits végétaux.\n\nIl est important de vérifier leur composition, leurs dosages et leurs précautions d'emploi. En cas de difficultés persistantes, demandez conseil à un professionnel de santé afin d'en rechercher la cause.",
      },
      {
        q: '18. Quels critères examiner pour choisir un complément destiné au confort urinaire masculin ?',
        a: "Examinez les ingrédients, leurs quantités, les recommandations d'utilisation et les précautions figurant sur l'étiquetage.\n\nLes compléments alimentaires ne remplacent pas une évaluation médicale. En cas de troubles urinaires persistants, de douleurs ou de présence de sang dans les urines, consultez rapidement un professionnel de santé.",
      },
      {
        q: '19. À quoi faut-il faire attention lors du choix d\'un complément à base d\'huile d\'onagre ?',
        a: "Vérifiez la composition du produit, la quantité d'huile d'onagre apportée par la dose journalière et les recommandations d'utilisation.\n\nLes précautions peuvent varier selon la situation personnelle et les autres produits utilisés. En cas de traitement médical, de grossesse ou d'allaitement, demandez conseil à un professionnel de santé avant toute utilisation.",
      },
      {
        q: '20. À partir de quel âge un enfant peut-il prendre un complément alimentaire ?',
        a: "L'âge minimum d'utilisation dépend de la formulation et des recommandations propres à chaque produit.\n\nAvant de donner un complément alimentaire à un enfant, vérifiez l'âge indiqué sur l'étiquetage, la dose recommandée et les précautions d'emploi. En cas de doute, demandez conseil à un pédiatre ou à un pharmacien.\n\nPour Naturamins Kids, les indications précises devront être communiquées produit par produit lorsque les références concernées seront autorisées et disponibles au Maroc.",
      },
    ],
  },
  {
    title: 'CATÉGORIE 5 — Qualité, sécurité et informations produits',
    items: [
      {
        q: '21. Où trouver la composition et les dosages d\'un produit ?',
        a: "La composition, les quantités des ingrédients, la dose journalière recommandée et les précautions d'emploi figurent sur l'étiquetage et, selon les produits, sur leur fiche détaillée.\n\nNous vous recommandons de consulter ces informations avant toute utilisation.",
      },
      {
        q: '22. Les compléments alimentaires sont-ils des médicaments ?',
        a: "Non. Les compléments alimentaires sont destinés à compléter l'alimentation. Ils ne sont pas destinés à diagnostiquer, traiter ou guérir une maladie et ne doivent pas se substituer à un traitement médical.\n\nEn cas de problème de santé, demandez conseil à un professionnel de santé.",
      },
      {
        q: '23. Comment AFAQ Health veille-t-elle à la qualité des produits distribués ?',
        a: "AFAQ Health sélectionne et développe son portefeuille de marques en tenant compte des exigences applicables au marché marocain et des informations qualité fournies par ses partenaires fabricants.\n\nLes caractéristiques, certifications et éléments de conformité doivent être appréciés au regard de chaque fabricant et de chaque référence.",
      },
      {
        q: '24. Comment obtenir des informations complémentaires sur une référence ?',
        a: "Si vous ne trouvez pas la réponse à votre question, contactez-nous à travers la page « Contact ».\n\nIndiquez le nom de la marque et la référence concernée afin de faciliter le traitement de votre demande.",
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FaqPage() {
  const [openKey, setOpenKey] = useState<string | null>('0-0');

  const toggleAccordion = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  const allFaqs = faqCategories.flatMap((c) => c.items);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-ivory-soft pt-12 pb-24 overflow-hidden">
      {/* Schema.org FAQPage JSON-LD pour Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <motion.div 
          initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
          className="max-w-3xl mx-auto text-center mb-16 space-y-6"
        >
          <motion.div variants={fadeUp} className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-teal-deep bg-sage-light rounded-full uppercase">
            Guide & Conseils Santé
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-teal-deep">
            Questions Fréquentes sur nos <span className="text-gold-soft">Compléments Alimentaires</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-anthracite-soft/80 leading-relaxed">
            Trouvez les réponses sur nos marques, la disponibilité au Maroc, le choix de vos compléments alimentaires, leurs modes d’utilisation et les précautions à observer.
          </motion.p>
        </motion.div>

        {/* Content with Visual Card and Categorized Accordions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Side: Visual Showcase Cards (Desktop only) */}
          <div className="hidden lg:block lg:col-span-4 space-y-14">
            {/* Card 1: Pharmacy Finder */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative h-[480px] w-full rounded-3xl overflow-hidden shadow-xl border border-sage-light/50 group"
            >
              <Image 
                src="/uploaded/faq_support.png" 
                alt="Compléments alimentaires certifiés en pharmacie au Maroc - AFAQ HEALTH" 
                fill 
                sizes="33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-teal-deep/15 pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-sage-light/50">
                <span className="text-xs font-bold text-gold-soft uppercase tracking-wider block mb-1">
                  Disponibilité Immédiate
                </span>
                <h3 className="font-extrabold text-teal-deep text-lg mb-1.5">
                  Où trouver nos produits ?
                </h3>
                <p className="text-anthracite-soft/80 text-xs sm:text-sm mb-4 leading-relaxed">
                  Retrouvez nos marques européennes dans les pharmacies et parapharmacies partenaires partout au Maroc.
                </p>
                <Link 
                  href="/pharmacies" 
                  className="block w-full text-center bg-teal-deep text-white font-bold px-4 py-3 rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect text-sm"
                >
                  Localiser une pharmacie →
                </Link>
              </div>
            </motion.div>

            {/* Card 2: Colagenova Marine Antiox+ (Raw photo) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-xl border border-sage-light/50 group"
            >
              <Image 
                src="/images/unsplash/marinee.png" 
                alt="COLAGENOVA® Antiox+ Collagène marin au Maroc - AFAQ HEALTH" 
                fill 
                sizes="33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </motion.div>

            {/* Card 3: Sotya Micronutrition (Raw photo) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-xl border border-sage-light/50 group"
            >
              <Image 
                src="/images/unsplash/comp/Gemini_Generated_Image_x71gg6x71gg6x71g.jpg" 
                alt="Gamme de compléments alimentaires Sotya au Maroc" 
                fill 
                sizes="33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </motion.div>

            {/* Card 4: Naturamins Kids Gummies (Raw photo) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-xl border border-sage-light/50 group"
            >
              <Image 
                src="/images/unsplash/babies/Gemini_Generated_Image_lxoactlxoactlxoa.jpg" 
                alt="Naturamins Kids Gummies Défenses et Vitamines au Maroc" 
                fill 
                sizes="33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </motion.div>

            {/* Card 5: Naturamins Kids Sirop (Raw photo) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-xl border border-sage-light/50 group"
            >
              <Image 
                src="/images/unsplash/babies/725a1dc0-a8ce-49c6-b1ff-e99adc2d9dbf.png" 
                alt="Naturamins Kids Sirop Sommeil et Relaxation pour enfants au Maroc" 
                fill 
                sizes="33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </motion.div>
          </div>

          {/* Right Side: Categorized FAQ Accordions (Expanded) */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
            className="lg:col-span-8 space-y-10"
          >
            {faqCategories.map((category, catIdx) => (
              <React.Fragment key={catIdx}>
                <div className="space-y-4">
                  <div className="inline-block px-3.5 py-1 text-xs font-bold tracking-wider text-teal-deep bg-sage-light rounded-full uppercase">
                    {category.title}
                  </div>

                  <div className="space-y-3.5">
                    {category.items.map((faq, itemIdx) => {
                      const key = `${catIdx}-${itemIdx}`;
                      const isOpen = openKey === key;
                      
                      return (
                        <motion.div 
                          variants={fadeUp} 
                          key={key} 
                          className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                            isOpen ? 'border-gold-soft shadow-md' : 'border-sage-light shadow-sm hover:border-gold-soft/50'
                          }`}
                        >
                          <button
                            onClick={() => toggleAccordion(key)}
                            className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                          >
                            <span className={`font-bold pr-6 text-[15px] sm:text-base transition-colors leading-snug ${isOpen ? 'text-teal-deep' : 'text-anthracite-deep'}`}>
                              {faq.q}
                            </span>
                            <span className={`text-gold-soft text-sm flex-shrink-0 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                              ▼
                            </span>
                          </button>
                          
                          <div 
                            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                              isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            <p className="text-anthracite-soft/85 text-sm leading-relaxed border-t border-sage-light/30 pt-4 whitespace-pre-line">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Only: Insert Card 1 (Pharmacy Finder) in the middle of FAQ */}
                {catIdx === 1 && (
                  <div className="lg:hidden my-8">
                    <div className="relative h-[480px] w-full rounded-3xl overflow-hidden shadow-xl border border-sage-light/50 group">
                      <Image 
                        src="/uploaded/faq_support.png" 
                        alt="Compléments alimentaires certifiés en pharmacie au Maroc - AFAQ HEALTH" 
                        fill 
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-teal-deep/15 pointer-events-none" />
                      <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-sage-light/50">
                        <span className="text-xs font-bold text-gold-soft uppercase tracking-wider block mb-1">
                          Disponibilité Immédiate
                        </span>
                        <h3 className="font-extrabold text-teal-deep text-lg mb-1.5">
                          Où trouver nos produits ?
                        </h3>
                        <p className="text-anthracite-soft/80 text-xs sm:text-sm mb-4 leading-relaxed">
                          Retrouvez nos marques européennes dans les pharmacies et parapharmacies partenaires partout au Maroc.
                        </p>
                        <Link 
                          href="/pharmacies" 
                          className="block w-full text-center bg-teal-deep text-white font-bold px-4 py-3 rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect text-sm"
                        >
                          Localiser une pharmacie →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
