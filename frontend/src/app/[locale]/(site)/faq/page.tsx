'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/navigation';

const faqs = [
  {
    q: 'À partir de quel âge peut-on donner des compléments alimentaires ou vitamines à un enfant ?',
    a: 'Pour les jeunes enfants, notamment dès 3 ans, il est indispensable de choisir des formules pédiatriques spécialement dosées. La gamme espagnole Naturamins Kids (conçue pour la croissance, l’appétit, la vitalité et l’immunité) est élaborée spécifiquement pour les enfants dès 3 ans, avec des nutriments hautement assimilables et des arômes naturels agréables. Demandez conseil à votre médecin pédiatre ou pharmacien au Maroc.',
  },
  {
    q: 'Pourquoi privilégier le Bisglycinate de Magnésium par rapport au magnésium classique ?',
    a: 'Le bisglycinate de magnésium est la forme la plus biodisponible et la mieux tolérée par l’organisme. Contrairement au magnésium marin ou à l’oxyde de magnésium qui provoquent fréquemment des effets laxatifs et des troubles intestinaux, le bisglycinate est chélaté à un acide aminé pour une assimilation maximale sans inconfort. La formule Sotya Bisglycinate de Magnésium, enrichie en zinc et vitamine D3, est la référence contre le stress, la fatigue et les crampes musculaires.',
  },
  {
    q: 'La mélatonine présente-t-elle un risque d’accoutumance ou d’effet secondaire pour dormir ?',
    a: 'Non, la mélatonine est une molécule physiologique naturelle qui régule l’horloge biologique sans créer d’accoutumance ni de somnolence résiduelle au réveil. Le Complexe Mélatonine Sotya (associant mélatonine, mélisse, passiflore et tilleul) favorise un endormissement rapide et un sommeil profond réparateur. Une prise de 1 gélule 30 minutes avant le coucher suffit.',
  },
  {
    q: 'Quel est le meilleur collagène pour les articulations et la beauté de la peau au Maroc ?',
    a: 'Pour une efficacité prouvée, il faut privilégier le collagène hydrolysé sous forme de peptides courts de bas poids moléculaire. La gamme Colagenova offre une formule concentrée de collagène hautement biodisponible associée à l’acide hyaluronique et à la vitamine C. Elle agit simultanément pour redonner fermeté à la peau, lisser les rides et soulager durablement les raideurs articulaires.',
  },
  {
    q: 'Où peut-on acheter les compléments alimentaires Sotya, Colagenova et Naturamins Kids au Maroc ?',
    a: 'Toutes nos marques sont disponibles exclusivement en pharmacie et parapharmacie à travers tout le Maroc (Casablanca, Rabat, Marrakech, Tanger, Fès, Kénitra, Agadir, Oujda, etc.). Vous pouvez localiser l’officine partenaire la plus proche de chez vous via notre page Où acheter.',
  },
  {
    q: 'Peut-on associer plusieurs compléments alimentaires au quotidien ?',
    a: 'Oui, de nombreuses associations sont recommandées pour une action synergique. Par exemple, prendre le Bisglycinate de Magnésium le matin pour l’énergie nerveuse et la Mélatonine le soir pour le sommeil, ou combiner le Collagène Colagenova avec des Oméga 3 pour la souplesse articulaire et vasculaire. Respectez toujours les doses indiquées et demandez l’avis de votre pharmacien.',
  },
  {
    q: 'Quels sont les signes d’un manque de magnésium et quand faire une cure ?',
    a: 'Les signes révélateurs d’un déficit en magnésium sont la fatigue chronique au réveil, l’irritabilité, les paupières qui tremblent, les crampes nocturnes dans les mollets et les tensions musculaires. Une cure de 1 à 3 mois de Bisglycinate de Magnésium Sotya permet de restaurer rapidement les réserves de l’organisme.',
  },
  {
    q: 'Comment être sûr de la sécurité et de la conformité des produits au Maroc ?',
    a: 'Tous les produits représentés par AFAQ HEALTH sont fabriqués en Espagne dans le respect des normes européennes les plus strictes (GMP, ISO) et sont officiellement homologués et enregistrés auprès de la Direction du Médicament et de la Pharmacie (AMMPS) au Maroc. Ils répondent aux critères d’innocuité et de traçabilité pharmaceutique.',
  },
  {
    q: 'Quelle est la durée conseillée pour une cure de compléments alimentaires ?',
    a: 'La durée optimale d’une cure efficace est généralement de 1 à 3 mois consécutifs. Ce délai permet aux cellules de reconstituer leurs réserves et d’obtenir des résultats durables sur l’énergie, le sommeil ou la beauté de la peau. Les cures peuvent être renouvelées 2 à 3 fois par an selon les besoins saisonniers.',
  },
  {
    q: 'À quel moment précis de la journée prendre ses vitamines et minéraux ?',
    a: 'Les vitamines énergisantes (Complexe Vitamines B, Vitamine C, Vitamine D3) et le magnésium se prennent idéalement le matin avec un grand verre d’eau au cours du petit-déjeuner. Les formules d’acides gras essentiels (Oméga 3, Huile d’onagre) s’assimilent mieux pendant un repas, tandis que la mélatonine se prend toujours le soir avant le coucher.',
  },
  {
    q: 'Pourquoi les Oméga 3 sont-ils indispensables pour le cœur et la concentration ?',
    a: 'Les acides gras polyinsaturés EPA et DHA présents dans les capsules d’Oméga 3 Sotya sont essentiels : l’organisme ne sait pas les fabriquer. Ils participent activement au maintien d’une bonne tension artérielle, à la santé des artères coronaires et au bon fonctionnement des membranes neuronales, favorisant la mémoire et la vivacité d’esprit.',
  },
  {
    q: 'Quel complément choisir en cas de surmenage, stress ou fatigue intellectuelle ?',
    a: 'L’association du Bisglycinate de Magnésium et du Complexe de Vitamines B Sotya est la synergie de référence conseillée en officine. Elle soutient le système nerveux central, améliore la résistance au stress et redonne du tonus sans provoquer d’effet excitant indésirable.',
  },
  {
    q: 'Comment soulager les gênes urinaires chez l’homme de plus de 50 ans ?',
    a: 'Dès la cinquantaine, l’inconfort urinaire (envies nocturnes fréquentes, jet faible) est courant. La formule Prostal de Sotya, associant des extraits de plantes reconnues (Palmier nain Sabal serrulata, pépin de courge) et du zinc, cible le fonctionnement normal de la prostate et favorise un débit urinaire serein.',
  },
  {
    q: 'Quels sont les bienfaits de l’huile d’onagre pour les femmes ?',
    a: 'Riche en acides gras essentiels GLA et en vitamine E naturelle, l’Huile d’Onagre Sotya contribue au confort hormonal féminin lors du syndrome prémenstruel (sensibilité des seins, sautes d’humeur, tiraillements abdominaux) et aide à préserver l’hydratation et la souplesse de la peau.',
  },
  {
    q: 'Comment préparer son système immunitaire face aux changements de saison ?',
    a: 'Pour stimuler les défenses naturelles, une cure ciblée combinant Vitamine D3, Zinc et Vitamine C est idéale. Les formules complètes Sotya apportent les doses journalières de référence pour aider l’organisme à résister aux coups de froid et aux baisses de forme.',
  },
  {
    q: 'Les compléments alimentaires Sotya conviennent-ils aux régimes végétariens ?',
    a: 'Oui, une large majorité des produits de notre catalogue (dont le Bisglycinate de Magnésium, les Vitamines B, etc.) sont conditionnés dans des gélules 100 % végétales certifiées sans gélatine animale, sans gluten et sans OGM.',
  },
  {
    q: 'Que prendre en pharmacie pour soulager les ballonnements et gaz intestinaux ?',
    a: 'Le Charbon Végétal Actif Sotya est reconnu pour son très fort pouvoir d’adsorption des gaz intestinaux. Pris après le repas, il permet de réduire rapidement les sensations de ventre gonflé et d’inconfort digestif pour retrouver un ventre plat.',
  },
  {
    q: 'Peut-on prendre du collagène en continu tous les jours ?',
    a: 'Oui, le collagène est une protéine structurelle naturellement produite par le corps. Une supplémentation quotidienne avec Colagenova ne présente aucun danger et compense la perte naturelle de collagène liée à l’âge (1 % par an dès 25 ans) pour maintenir la fermeté de la peau et la mobilité des articulations.',
  },
  {
    q: 'Une femme enceinte ou allaitante peut-elle prendre ces compléments alimentaires ?',
    a: 'Durant la grossesse et l’allaitement, les besoins micronutritionnels sont particuliers. Bien que nos produits soient sûrs et formulés à partir d’ingrédients de haute qualité, nous vous invitons à consulter systématiquement votre médecin gynécologue ou votre pharmacien avant d’entamer toute cure.',
  },
  {
    q: 'Les compléments alimentaires sont-ils disponibles sans ordonnance en pharmacie au Maroc ?',
    a: 'Oui, l’ensemble de nos gammes (Sotya, Colagenova, Naturamins Kids) est disponible en vente libre sans ordonnance dans les pharmacies et parapharmacies au Maroc. Votre pharmacien est à votre disposition pour vous orienter vers la formule exacte répondant à votre profil de santé.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
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
      <div className="container mx-auto px-4 max-w-6xl">
        
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
            Trouvez les réponses d’experts sur le sommeil, le magnésium, le collagène, les vitamines pour enfants et la disponibilité de nos marques en pharmacie au Maroc.
          </motion.p>
        </motion.div>

        {/* Content with Image and Accordions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: 5 Visual CTA Cards */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Card 1: Pharmacy Finder */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative h-[480px] w-full rounded-3xl overflow-hidden shadow-xl border border-sage-light/50 group"
            >
              <Image 
                src="/uploaded/faq_support.png" 
                alt="Compléments alimentaires certifiés en pharmacie au Maroc - AFAQ HEALTH" 
                fill 
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

            {/* Card 2: Pharmacists & Health Professionals */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative h-[480px] w-full rounded-3xl overflow-hidden shadow-xl border border-sage-light/50 group"
            >
              <Image 
                src="/images/unsplash/science/esp-pro.jpg" 
                alt="Pharmacien au Maroc conseillant des compléments alimentaires certifiés AFAQ HEALTH" 
                fill 
                className="object-cover object-[center_38%] group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-teal-deep/20 pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-sage-light/50">
                <span className="text-xs font-bold text-gold-soft uppercase tracking-wider block mb-1">
                  Espace Professionnels de Santé
                </span>
                <h3 className="font-extrabold text-teal-deep text-lg mb-1.5">
                  Vous êtes un pharmacien au Maroc ?
                </h3>
                <p className="text-anthracite-soft/80 text-xs sm:text-sm mb-4 leading-relaxed">
                  Proposez nos gammes certifiées (Sotya, Colagenova, Naturamins Kids) à votre patientèle. Approvisionnement et livraison officine assurés par notre distributeur partenaire Dawa Maghreb.
                </p>
                <Link 
                  href="/contact" 
                  className="block w-full text-center bg-teal-deep text-white font-bold px-4 py-3 rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect text-sm"
                >
                  Demander les conditions officines →
                </Link>
              </div>
            </motion.div>

            {/* Card 3: SEO & Conversion Booster (Family / All Brands) */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[480px] w-full rounded-3xl overflow-hidden shadow-xl border border-sage-light/50 group"
            >
              <Image 
                src="/images/unsplash/formulations/formulation_4.jpg" 
                alt="Compléments alimentaires naturels certifiés au Maroc - Sommeil, Magnésium, Collagène, Enfants" 
                fill 
                className="object-cover object-[center_24%] group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-teal-deep/15 pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-sage-light/50">
                <span className="text-xs font-bold text-gold-soft uppercase tracking-wider block mb-1">
                  Conseils Santé & Produits Certifiés
                </span>
                <h3 className="font-extrabold text-teal-deep text-lg mb-1.5">
                  Trouvez le complément idéal
                </h3>
                <p className="text-anthracite-soft/80 text-xs sm:text-sm mb-4 leading-relaxed">
                  Magnésium anti-stress, sommeil sans accoutumance, collagène marin ou vitamines pour enfants dès 3 ans : explorez notre catalogue complet de micronutrition.
                </p>
                <Link 
                  href="/produits" 
                  className="block w-full text-center bg-teal-deep text-white font-bold px-4 py-3 rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect text-sm"
                >
                  Explorer notre catalogue →
                </Link>
              </div>
            </motion.div>

            {/* Card 4: Men's Health Article */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative h-[480px] w-full rounded-3xl overflow-hidden shadow-xl border border-sage-light/50 group"
            >
              <Image 
                src="/images/unsplash/welness/prostal-man-taking-pill-expanded-top-final.png" 
                alt="Conseil santé masculine et confort urinaire avec Prostal Sotya au Maroc" 
                fill 
                className="object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-teal-deep/15 pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-sage-light/50">
                <span className="text-xs font-bold text-gold-soft uppercase tracking-wider block mb-1">
                  Santé masculine
                </span>
                <h3 className="font-extrabold text-teal-deep text-lg mb-1.5">
                  Comprendre la prostate
                </h3>
                <p className="text-anthracite-soft/80 text-xs sm:text-sm mb-4 leading-relaxed">
                  Un guide clair pour mieux comprendre le confort urinaire, le rôle du zinc et les extraits végétaux utilisés dans les formules dédiées aux hommes.
                </p>
                <Link 
                  href="/conseils/sante-masculine-comprendre-prostate" 
                  className="block w-full text-center bg-teal-deep text-white font-bold px-4 py-3 rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect text-sm"
                >
                  Lire le conseil santé →
                </Link>
              </div>
            </motion.div>

            {/* Card 5: Sleep Article */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative h-[480px] w-full rounded-3xl overflow-hidden shadow-xl border border-sage-light/50 group"
            >
              <Image 
                src="/images/unsplash/welness/melatonine-bedside-ad-v2.png" 
                alt="Conseil sommeil et mélatonine Sotya pour une routine du soir naturelle" 
                fill 
                className="object-cover object-[35%_25%] group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-teal-deep/15 pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-sage-light/50">
                <span className="text-xs font-bold text-gold-soft uppercase tracking-wider block mb-1">
                  Sommeil & relaxation
                </span>
                <h3 className="font-extrabold text-teal-deep text-lg mb-1.5">
                  Choisir sa formule mélatonine
                </h3>
                <p className="text-anthracite-soft/80 text-xs sm:text-sm mb-4 leading-relaxed">
                  Découvrez comment la mélatonine, la mélisse, la passiflore et le tilleul peuvent accompagner une routine du soir simple et régulière.
                </p>
                <Link 
                  href="/conseils/sommeil-quelle-formule-melatonine-choisir" 
                  className="block w-full text-center bg-teal-deep text-white font-bold px-4 py-3 rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect text-sm"
                >
                  Voir le guide sommeil →
                </Link>
              </div>
            </motion.div>

          </div>

          {/* Right Side: FAQ Accordions (Direct List, No B2B, No category headings) */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
            className="lg:col-span-7 space-y-4"
          >
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              
              return (
                <motion.div 
                  variants={fadeUp} 
                  key={idx} 
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-gold-soft shadow-md' : 'border-sage-light shadow-sm hover:border-gold-soft/50'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
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
                    <p className="text-anthracite-soft/85 text-sm leading-relaxed border-t border-sage-light/30 pt-4">
                      {faq.a}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
