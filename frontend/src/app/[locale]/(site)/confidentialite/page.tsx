'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-ivory-soft pt-32 pb-24 overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-6"
        >
          <div className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-teal-deep bg-white border border-teal-deep/20 rounded-full uppercase shadow-sm">
            Politique de Protection
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black text-teal-deep">
            Politique de Confidentialité
          </h1>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white p-8 md:p-12 shadow-xl border border-sage-light rounded-[2rem] prose prose-teal max-w-none">
            
            <p className="lead">
              La présente Politique de Confidentialité a pour but de vous informer sur la manière dont AFAQ HEALTH collecte, utilise et protège vos données personnelles dans le respect de la loi n°09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel au Maroc.
            </p>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">1. Données collectées</h2>
            <p>Nous sommes susceptibles de collecter les données personnelles suivantes lorsque vous utilisez notre site :</p>
            <ul>
              <li><strong>Données d'identification :</strong> nom, prénom.</li>
              <li><strong>Coordonnées :</strong> adresse e-mail, numéro de téléphone, société.</li>
              <li><strong>Données de connexion :</strong> adresse IP, logs de connexion, type de navigateur (via les cookies).</li>
              <li><strong>Contenu des messages :</strong> toute information que vous nous transmettez via le formulaire de contact.</li>
            </ul>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">2. Finalités du traitement</h2>
            <p>Vos données personnelles sont collectées pour les finalités suivantes :</p>
            <ul>
              <li>Traiter et répondre à vos demandes de contact et demandes de partenariat.</li>
              <li>Assurer le fonctionnement et la sécurité du site web.</li>
              <li>Établir des statistiques de fréquentation (via des outils d'analyse anonymisés).</li>
              <li>Gérer la relation commerciale pour les professionnels de santé et partenaires.</li>
            </ul>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">3. Durée de conservation</h2>
            <p>
              AFAQ HEALTH conserve vos données personnelles uniquement pour la durée nécessaire aux finalités pour lesquelles elles ont été collectées, conformément aux obligations légales et réglementaires applicables au Maroc.
            </p>
            <ul>
              <li><strong>Demandes de contact :</strong> 3 ans après le dernier contact.</li>
              <li><strong>Données de connexion (Cookies) :</strong> 13 mois maximum.</li>
            </ul>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">4. Partage des données</h2>
            <p>
              Vos données personnelles sont strictement confidentielles. Elles sont exclusivement destinées aux services internes d'AFAQ HEALTH. Elles ne sont en aucun cas vendues, louées ou cédées à des tiers à des fins de prospection commerciale.
            </p>
            <p>
              Nous pouvons toutefois être amenés à partager certaines données avec des prestataires techniques de confiance (hébergeur, agence web) dans le seul but d'assurer le bon fonctionnement du site.
            </p>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">5. Vos droits</h2>
            <p>
              Conformément à la loi n°09-08, vous disposez des droits suivants concernant vos données personnelles :
            </p>
            <ul>
              <li>Droit d'accès et d'information.</li>
              <li>Droit de rectification si vos données sont inexactes ou incomplètes.</li>
              <li>Droit d'opposition au traitement pour des motifs légitimes.</li>
            </ul>
            <p>
              Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante :<br />
              <strong>Email :</strong> contact@afaqhealth.ma<br />
              <strong>Courrier :</strong> [Adresse postale d'AFAQ HEALTH, Casablanca, Maroc]
            </p>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">6. Cookies</h2>
            <p>
              La gestion de vos préférences en matière de traceurs et cookies est détaillée dans notre page dédiée à la Politique des Cookies.
            </p>

            <div className="mt-12 pt-8 border-t border-sage-light text-sm text-anthracite-soft/60">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </div>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
