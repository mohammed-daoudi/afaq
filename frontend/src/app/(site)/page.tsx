'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { products, FAMILY_COLORS, type TherapeuticFamily } from "@/lib/products";

// Fetch the 3 featured products for Hero
const featuredIds = ['collagene', 'melatonine', 'complexe-vitamine-c'];
const featuredProducts = featuredIds.map(id => {
  const p = products.find(p => p.id === id);
  if (!p) {
    console.error(`[AFAQ] Product not found for id: ${id}`);
    return {
      id,
      name: 'Produit non trouvé',
      brand: 'SOTYA',
      category: 'Santé Spécifique' as TherapeuticFamily,
      imagePath: '/placeholder.png',
      description: 'Produit introuvable.',
      benefits: [],
      dosage: '',
      duration: '',
      format: '',
      certifications: [],
      headline: 'Erreur de chargement'
    };
  }
  return {
    ...p,
    headline: p.id === 'collagene' ? "Pour la beauté de votre peau et de vos cheveux." :
              p.id === 'melatonine' ? "Retrouvez un sommeil réparateur et naturel." :
              "Boostez votre immunité au quotidien."
  };
});

// Reusable animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      
      {/* 1. Product-Centric Hero Carousel */}
      <section className="relative h-screen bg-sage-light overflow-hidden flex items-center pt-20">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-deep/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-soft/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-6 md:space-y-8 order-2 lg:order-1 text-center lg:text-left">
                <div 
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm bg-white"
                  style={{ 
                    color: FAMILY_COLORS[featuredProducts[currentSlide].category as TherapeuticFamily].accent,
                    borderColor: `${FAMILY_COLORS[featuredProducts[currentSlide].category as TherapeuticFamily].accent}40`
                  }}
                >
                  {featuredProducts[currentSlide].category}
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-extrabold text-teal-deep leading-[1.1] tracking-tight">
                  {featuredProducts[currentSlide].headline}
                </h1>
                <p className="text-xl text-anthracite-soft/80 font-medium max-w-xl mx-auto lg:mx-0">
                  {featuredProducts[currentSlide].name} — {featuredProducts[currentSlide].description}
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href={`/produits/${featuredProducts[currentSlide].id}`}
                    className="shimmer-effect px-8 py-4 bg-teal-deep text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:bg-opacity-95 transition-all transform hover:-translate-y-1"
                  >
                    Découvrir le produit
                  </Link>
                </div>
              </div>
              <div className="order-1 lg:order-2 flex justify-center relative">
                <div 
                  className="absolute inset-0 rounded-full blur-2xl opacity-20 transform scale-75"
                  style={{ backgroundColor: FAMILY_COLORS[featuredProducts[currentSlide].category as TherapeuticFamily].accent }}
                />
                <Image 
                  src={featuredProducts[currentSlide].imagePath}
                  alt={featuredProducts[currentSlide].name}
                  width={600}
                  height={600}
                  priority
                  className="relative z-10 object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 80vw, 50vw"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 z-20">
          {featuredProducts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'bg-teal-deep w-10' : 'bg-teal-deep/30 hover:bg-teal-deep/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Introduction: La santé par la nutrition */}
      <section className="py-24 bg-white relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="space-y-8"
            >
              <div>
                <p className="text-sm font-bold text-gold-soft uppercase tracking-widest mb-4">
                  Laboratoire importateur • Maroc & Afrique de l'Ouest
                </p>
                <h2 className="text-5xl md:text-6xl font-heading font-extrabold text-teal-deep leading-tight">
                  La santé par la <span className="text-gold-soft italic font-serif">nutrition</span>, distribuée avec exigence.
                </h2>
              </div>
              <p className="text-xl text-anthracite-soft/80 leading-relaxed">
                AFAQ Health importe et distribue en exclusivité des marques internationales de compléments alimentaires premium — au service des pharmacies, des grossistes et des distributeurs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/portal/login" className="bg-teal-deep text-white font-bold px-8 py-4 rounded-xl text-center hover:bg-opacity-95 transition-all shadow-md hover:shadow-lg">
                  Accéder au portail B2B →
                </Link>
                <Link href="/marques" className="bg-white border-2 border-teal-deep/20 text-teal-deep font-bold px-8 py-4 rounded-xl text-center hover:bg-sage-light transition-all">
                  Découvrir nos marques
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-sage-light">
                <div>
                  <div className="text-4xl font-heading font-extrabold text-teal-deep mb-2">3</div>
                  <p className="text-sm font-semibold text-anthracite-soft/70">Marques exclusives</p>
                </div>
                <div>
                  <div className="text-4xl font-heading font-extrabold text-teal-deep mb-2">9</div>
                  <p className="text-sm font-semibold text-anthracite-soft/70">Pays couverts</p>
                </div>
                <div>
                  <div className="text-4xl font-heading font-extrabold text-teal-deep mb-2">100%</div>
                  <p className="text-sm font-semibold text-anthracite-soft/70">Références enregistrées AMMPS</p>
                </div>
              </div>
            </motion.div>

            {/* Diagram */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="relative hidden md:flex flex-col gap-6 pl-12 border-l-2 border-sage-light/50"
            >
              {[
                { title: "Fabricant international", active: false },
                { title: "AFAQ Health • Importation", active: true },
                { title: "Distributeurs & grossistes", active: false },
                { title: "Pharmacies & officines", active: false },
                { title: "Patient • Conseil officinal", active: true },
              ].map((step, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeUpVariant}
                  className={`relative p-5 rounded-xl shadow-sm border ${step.active ? 'bg-white border-gold-soft' : 'bg-sage-light/30 border-white'} ml-${i % 2 === 0 ? '0' : '12'}`}
                  style={{ marginLeft: i * 20 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${step.active ? 'bg-gold-soft' : 'bg-teal-deep'}`} />
                    <span className="font-bold text-teal-deep">{step.title}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Portefeuille: Nos Marques */}
      <section className="py-24 bg-sage-light/30 relative z-20 border-y border-sage-light">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="mb-16"
          >
            <p className="text-sm font-bold text-gold-soft uppercase tracking-widest mb-4">
              Portefeuille
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep mb-6 max-w-2xl">
              Des marques choisies pour leur rigueur scientifique.
            </h2>
            <p className="text-lg text-anthracite-soft/80 max-w-3xl">
              AFAQ Health représente en exclusivité des laboratoires européens reconnus, sélectionnés pour la qualité de leurs formulations et leur conformité réglementaire.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* SOTYA */}
            <motion.div variants={fadeUpVariant}>
              <Card className="h-full border-none shadow-md hover:shadow-xl transition-all bg-white flex flex-col p-8">
                <h3 className="text-3xl font-heading font-bold text-teal-deep mb-2">SOTYA</h3>
                <p className="text-xs font-bold text-anthracite-soft/50 uppercase tracking-wider mb-6">Espagne • Bescorp Health</p>
                <p className="text-anthracite-soft/80 mb-8 flex-grow">
                  Gamme complète de compléments alimentaires — stress, sommeil, immunité, vitalité et santé spécifique. 19 références enregistrées AMMPS.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-xs font-bold bg-sage-light px-3 py-1.5 rounded-full text-teal-deep">Immunité</span>
                  <span className="text-xs font-bold bg-sage-light px-3 py-1.5 rounded-full text-teal-deep">Sommeil</span>
                  <span className="text-xs font-bold bg-sage-light px-3 py-1.5 rounded-full text-teal-deep">Vitalité</span>
                </div>
                <Link href="/produits" className="font-bold text-teal-deep hover:text-gold-soft transition-colors flex items-center gap-2">
                  Voir la gamme →
                </Link>
              </Card>
            </motion.div>

            {/* Colagenova */}
            <motion.div variants={fadeUpVariant}>
              <Card className="h-full border-none shadow-md hover:shadow-xl transition-all bg-white flex flex-col p-8">
                <h3 className="text-3xl font-heading font-bold text-gold-soft mb-2">Colagenova</h3>
                <p className="text-xs font-bold text-anthracite-soft/50 uppercase tracking-wider mb-6">Espagne • Vaminter</p>
                <p className="text-anthracite-soft/80 mb-8 flex-grow">
                  Gamme experte de collagène marin et de solutions beauté-mobilité, structurée par indication. Lancement Maroc prévu en 2027.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-xs font-bold bg-gold-soft/10 px-3 py-1.5 rounded-full text-gold-soft">Collagène marin</span>
                  <span className="text-xs font-bold bg-gold-soft/10 px-3 py-1.5 rounded-full text-gold-soft">Beauté</span>
                  <span className="text-xs font-bold bg-gold-soft/10 px-3 py-1.5 rounded-full text-gold-soft">Mobilité</span>
                </div>
                <Link href="#" className="font-bold text-gold-soft hover:text-teal-deep transition-colors flex items-center gap-2">
                  Découvrir →
                </Link>
              </Card>
            </motion.div>

            {/* Naturamins */}
            <motion.div variants={fadeUpVariant}>
              <Card className="h-full border-none shadow-md hover:shadow-xl transition-all bg-white flex flex-col p-8">
                <h3 className="text-3xl font-heading font-bold text-teal-deep/70 mb-2">Naturamins</h3>
                <p className="text-xs font-bold text-anthracite-soft/50 uppercase tracking-wider mb-6">Europe • À venir</p>
                <p className="text-anthracite-soft/80 mb-8 flex-grow">
                  Nouvelle marque du portefeuille AFAQ Health, en cours de préparation réglementaire et commerciale pour le marché marocain.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-xs font-bold bg-gray-100 px-3 py-1.5 rounded-full text-gray-500">Prochainement</span>
                </div>
                <Link href="#" className="font-bold text-teal-deep/70 hover:text-teal-deep transition-colors flex items-center gap-2">
                  En savoir plus →
                </Link>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Pourquoi AFAQ Health */}
      <section className="py-24 bg-white relative z-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="mb-16"
          >
            <p className="text-sm font-bold text-gold-soft uppercase tracking-widest mb-4">
              Pourquoi AFAQ Health
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep mb-6 max-w-2xl">
              Un partenaire pensé pour la performance et la conformité.
            </h2>
            <p className="text-lg text-anthracite-soft/80 max-w-3xl">
              Plus qu'un distributeur, AFAQ Health est une plateforme complète de développement de marques — de l'homologation réglementaire jusqu'au conseil officinal.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {[
              { icon: "✓", title: "20+", subtitle: "Références homologuées", desc: "Plus de 20 références enregistrées AMMPS, prêtes pour le marché marocain." },
              { icon: "🌍", title: "9", subtitle: "Pays en exclusivité", desc: "Droits exclusifs sur le Maroc et l'Afrique de l'Ouest francophone." },
              { icon: "🇪🇺", title: "100%", subtitle: "Fabrication européenne", desc: "Laboratoires partenaires certifiés, formulations conçues en Europe." },
              { icon: "📄", title: "A → Z", subtitle: "Conformité réglementaire", desc: "Dossiers, monographies et déclarations gérés de bout en bout." },
              { icon: "🎯", title: "360°", subtitle: "Support scientifique & marketing", desc: "Accompagnement des officines : PLV, formations, conseil produit." }
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeUpVariant}>
                <Card className="h-full border border-sage-light bg-white p-6 hover:shadow-lg transition-all">
                  <div className="text-gold-soft mb-6 text-2xl">{stat.icon}</div>
                  <div className="text-4xl font-heading font-extrabold text-teal-deep mb-2">{stat.title}</div>
                  <h3 className="text-sm font-bold text-teal-deep mb-3">{stat.subtitle}</h3>
                  <p className="text-xs text-anthracite-soft/70 leading-relaxed">{stat.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Présentation / Qui Sommes-Nous */}
      <section className="py-24 bg-sage-light/40 relative z-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="mb-16"
          >
            <p className="text-sm font-bold text-gold-soft uppercase tracking-widest mb-4">
              Présentation & Qui sommes-nous
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep max-w-4xl leading-tight">
              AFAQ Health, l'écosystème des marques de santé. Le partenaire stratégique des laboratoires internationaux.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="space-y-6 text-anthracite-soft/80 leading-relaxed text-lg"
            >
              <p>
                Basée à Kénitra, AFAQ Health est une plateforme de développement de marques internationales spécialisée dans la nutrition, les compléments alimentaires et les solutions de santé naturelle. Nous accompagnons les laboratoires européens dans leur implantation et leur croissance au Maroc et en Afrique de l'Ouest francophone.
              </p>
              <p>
                Notre mission dépasse largement la distribution. Nous créons un véritable écosystème permettant aux fabricants internationaux de développer leur présence régionale grâce à une organisation locale solide, conforme aux exigences réglementaires et orientée vers la performance commerciale.
              </p>
              <p>
                Notre expertise ne se limite pas à la mise à disposition des produits : nous construisons des partenariats durables entre fabricants, distributeurs, grossistes, pharmaciens et professionnels de santé, pour un développement pérenne des marques que nous représentons.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="bg-white p-8 rounded-2xl shadow-sm border border-sage-light"
            >
              <h3 className="text-2xl font-heading font-bold text-teal-deep mb-8">Notre chaîne de valeur</h3>
              <div className="space-y-6">
                {[
                  { title: "Stratégie d'accès au marché", desc: "Étude, positionnement, pricing régional." },
                  { title: "Conformité & homologation", desc: "Dossiers AMMPS, monographies, déclarations." },
                  { title: "Développement commercial", desc: "Réseaux de distribution structurés." },
                  { title: "Accompagnement scientifique", desc: "Support continu aux professionnels de santé." },
                  { title: "Valorisation des marques", desc: "Marketing, PLV, notoriété régionale." }
                ].map((item, idx) => (
                  <motion.div key={idx} variants={fadeUpVariant} className="flex gap-4">
                    <div className="mt-1 text-gold-soft">→</div>
                    <div>
                      <h4 className="font-bold text-teal-deep">{item.title}</h4>
                      <p className="text-sm text-anthracite-soft/70">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: "✓", title: "Conformité réglementaire", desc: "Chaque référence est enregistrée AMMPS avant commercialisation. Dossiers, monographies et déclarations tenus à jour." },
              { icon: "⏱", title: "Exclusivité territoriale", desc: "Droits de distribution exclusifs sur le Maroc et huit pays d'Afrique de l'Ouest francophone." },
              { icon: "🏢", title: "Partenaires reconnus", desc: "Laboratoires européens certifiés (ISO 9001), sélectionnés pour la robustesse de leurs formulations." },
              { icon: "📊", title: "Vision multi-pays", desc: "Une plateforme et une organisation pensées pour accompagner l'expansion régionale, pays par pays." }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeUpVariant} className="h-full">
                <Card className="h-full border-none shadow-sm bg-white p-8">
                  <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center text-teal-deep text-xl mb-6">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-bold text-teal-deep mb-3">{feature.title}</h4>
                  <p className="text-sm text-anthracite-soft/70 leading-relaxed">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. Notre Réseau */}
      <section className="py-24 bg-teal-deep relative z-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="mb-16 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <p className="text-sm font-bold text-gold-soft uppercase tracking-widest mb-4">
              Notre Réseau
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-6 max-w-2xl">
              De la formulation à l'officine, une chaîne maîtrisée.
            </h2>
            <p className="text-lg text-white/80 max-w-3xl">
              AFAQ Health ne vend pas au consommateur final. Notre rôle est d'importer, d'homologuer et d'approvisionner un réseau professionnel qui délivre le bon produit, au bon endroit, avec le bon conseil.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto lg:mx-0"
          >
            {[
              { num: "01", title: "Fabricant", desc: "Laboratoires européens partenaires, formulations certifiées." },
              { num: "02", title: "AFAQ Health", desc: "Importation, homologation AMMPS, stockage, pilotage commercial." },
              { num: "03", title: "Distributeurs", desc: "Distributeurs nationaux et grossistes régionaux, tarifs dédiés." },
              { num: "04", title: "Pharmacies", desc: "Officines approvisionnées, conseil professionnel au patient." }
            ].map((step, idx) => (
              <motion.div key={idx} variants={fadeUpVariant} className="h-full">
                <div className="border border-white/20 bg-white/5 hover:bg-white/10 transition-colors rounded-xl relative overflow-hidden group h-full flex flex-col p-8">
                  <div className="text-gold-soft font-bold text-lg mb-6">{step.num}</div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <div className="text-gold-soft opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300">→</div>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed flex-grow">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="py-24 bg-white relative z-20 overflow-hidden border-t border-sage-light">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-soft rounded-full opacity-10 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h2 className="text-4xl font-heading font-bold text-teal-deep mb-6">
            Vous êtes un professionnel de santé ?
          </h2>
          <p className="text-anthracite-soft/80 max-w-2xl mx-auto mb-10 text-lg">
            Pharmaciens, grossistes et distributeurs : accédez à vos tarifs négociés, passez commande et suivez vos livraisons depuis votre espace dédié.
          </p>
          <Link
            href="/portal/login"
            className="shimmer-effect inline-block bg-teal-deep text-white font-bold px-10 py-5 rounded-xl text-lg hover:bg-opacity-95 hover:shadow-lg transition-all"
          >
            Accéder à l'Espace Professionnel
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
