'use client';
import { useText } from '@/lib/useText';


import React from 'react';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

export function PrivacyPageClient({ lastUpdated }: { lastUpdated: string }) {
  const tx = useText();
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
          <div className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-teal-deep bg-white border border-teal-deep/20 rounded-full uppercase shadow-sm">{tx("Politique de Protection")}</div>
          <h1 className="text-4xl md:text-5xl font-black text-teal-deep">{tx("Politique de Confidentialité")}</h1>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white p-8 md:p-12 shadow-xl border border-sage-light rounded-[2rem] prose prose-teal max-w-none">
            
            <p className="lead">{tx("La présente Politique de Confidentialité a pour but de vous informer sur la manière dont AFAQ HEALTH collecte, utilise et protège vos données personnelles dans le respect de la loi n°09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel au Maroc.")}</p>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">{tx("1. Données collectées")}</h2>
            <p>{tx("Nous sommes susceptibles de collecter les données personnelles suivantes lorsque vous utilisez notre site :")}</p>
            <ul>
              <li><strong>{tx("Données d'identification :")}</strong>{tx(" nom, prénom.")}</li>
              <li><strong>{tx("Coordonnées :")}</strong>{tx(" adresse e-mail, numéro de téléphone, société.")}</li>
              <li><strong>{tx("Données de connexion :")}</strong>{tx(" adresse IP, logs de connexion, type de navigateur (via les cookies).")}</li>
              <li><strong>{tx("Contenu des messages :")}</strong>{tx(" toute information que vous nous transmettez via le formulaire de contact.")}</li>
            </ul>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">{tx("2. Finalités du traitement")}</h2>
            <p>{tx("Vos données personnelles sont collectées pour les finalités suivantes :")}</p>
            <ul>
              <li>{tx("Traiter et répondre à vos demandes de contact et demandes de partenariat.")}</li>
              <li>{tx("Assurer le fonctionnement et la sécurité du site web.")}</li>
              <li>{tx("Établir des statistiques de fréquentation (via des outils d'analyse anonymisés).")}</li>
              <li>{tx("Gérer la relation commerciale pour les professionnels de santé et partenaires.")}</li>
            </ul>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">{tx("3. Durée de conservation")}</h2>
            <p>{tx("AFAQ HEALTH conserve vos données personnelles uniquement pour la durée nécessaire aux finalités pour lesquelles elles ont été collectées, conformément aux obligations légales et réglementaires applicables au Maroc.")}</p>
            <ul>
              <li><strong>{tx("Demandes de contact :")}</strong>{tx(" 3 ans après le dernier contact.")}</li>
              <li><strong>{tx("Données de connexion (Cookies) :")}</strong>{tx(" 13 mois maximum.")}</li>
            </ul>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">{tx("4. Partage des données")}</h2>
            <p>{tx("Vos données personnelles sont strictement confidentielles. Elles sont exclusivement destinées aux services internes d'AFAQ HEALTH. Elles ne sont en aucun cas vendues, louées ou cédées à des tiers à des fins de prospection commerciale.")}</p>
            <p>{tx("Nous pouvons toutefois être amenés à partager certaines données avec des prestataires techniques de confiance (hébergeur, agence web) dans le seul but d'assurer le bon fonctionnement du site.")}</p>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">{tx("5. Vos droits")}</h2>
            <p>{tx("Conformément à la loi n°09-08, vous disposez des droits suivants concernant vos données personnelles :")}</p>
            <ul>
              <li>{tx("Droit d'accès et d'information.")}</li>
              <li>{tx("Droit de rectification si vos données sont inexactes ou incomplètes.")}</li>
              <li>{tx("Droit d'opposition au traitement pour des motifs légitimes.")}</li>
            </ul>
            <p>{tx("Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante :")}<br />
              <strong>{tx("Email :")}</strong>{tx(" contact@afaqhealth.com")}<br />
              <strong>{tx("Courrier :")}</strong>{tx(" Bir Rami Ouest, 14000 Kénitra — Maroc")}</p>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">{tx("6. Cookies")}</h2>
            <p>{tx("La gestion de vos préférences en matière de traceurs et cookies est détaillée dans notre page dédiée à la Politique des Cookies.")}</p>

            <div className="mt-12 pt-8 border-t border-sage-light text-sm text-anthracite-soft/60">{tx("Dernière mise à jour : ")}{lastUpdated}
            </div>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
