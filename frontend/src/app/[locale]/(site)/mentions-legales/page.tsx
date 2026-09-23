'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

export default function MentionsLegalesPage() {
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
            Informations juridiques
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-teal-deep">
            Mentions Légales
          </h1>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white p-8 md:p-12 shadow-xl border border-sage-light rounded-[2rem] prose prose-teal max-w-none">
            <h2 className="text-3xl font-bold text-teal-deep mb-8">Mentions légales</h2>
            
            <h3 className="text-xl font-bold text-teal-deep mt-8 mb-4">1. ÉDITEUR DU SITE</h3>
            <p>
              <strong>AFAQ HEALTH</strong><br />
              <strong>Siège social :</strong> Bir Rami Ouest, Kénitra — Maroc<br />
              <strong>Registre du Commerce (RC) :</strong> 75281<br />
              <strong>Identifiant Fiscal (IF) :</strong> 66112419
            </p>

            <h3 className="text-xl font-bold text-teal-deep mt-8 mb-4">2. CONTACT</h3>
            <p>
              <strong>Téléphone :</strong> +212 6 17 20 11 29<br />
              <strong>Email :</strong> contact@afaqhealth.com
            </p>

            <h3 className="text-xl font-bold text-teal-deep mt-8 mb-4">3. HÉBERGEMENT</h3>
            <p>
              <strong>Hostinger International Limited</strong><br />
              61 Lordou Vironos Street, 6023 Larnaca, Chypre
            </p>

            <hr className="my-12 border-sage-light" />

            <h2 className="text-3xl font-bold text-teal-deep mb-8 uppercase">Politique de confidentialité</h2>
            <p>
              AFAQ HEALTH accorde une importance particulière à la protection de vos données personnelles. La présente politique explique de manière simple comment vos données peuvent être collectées et utilisées lorsque vous utilisez notre site.
            </p>

            <h3 className="text-xl font-bold text-teal-deep mt-8 mb-4">1. DONNÉES COLLECTÉES</h3>
            <p>Selon votre utilisation du site, nous pouvons être amenés à collecter notamment :</p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>Nom et prénom</li>
              <li>Adresse e-mail</li>
              <li>Numéro de téléphone</li>
              <li>Société ou établissement</li>
              <li>Contenu des messages transmis via nos formulaires</li>
              <li>Données techniques nécessaires au fonctionnement et à la sécurité du site</li>
            </ul>

            <h3 className="text-xl font-bold text-teal-deep mt-8 mb-4">2. UTILISATION DES DONNÉES</h3>
            <p>Ces données peuvent être utilisées afin de :</p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>Répondre à vos demandes et messages ;</li>
              <li>Traiter les demandes de partenariat ou de collaboration ;</li>
              <li>Assurer le fonctionnement et la sécurité du site ;</li>
              <li>Améliorer nos services et l'expérience utilisateur.</li>
            </ul>

            <h3 className="text-xl font-bold text-teal-deep mt-8 mb-4">3. CONFIDENTIALITÉ DES DONNÉES</h3>
            <p>
              AFAQ HEALTH ne vend ni ne loue vos données personnelles.<br /><br />
              Lorsque cela est nécessaire au fonctionnement du site, certaines données peuvent être accessibles à des prestataires techniques intervenant pour notre compte, notamment pour l'hébergement ou la maintenance du site.
            </p>

            <h3 className="text-xl font-bold text-teal-deep mt-8 mb-4">4. VOS DROITS</h3>
            <p>
              Conformément à la réglementation marocaine applicable, notamment la loi n° 09-08, vous disposez de droits concernant vos données personnelles, notamment un droit d'accès, de rectification et d'opposition dans les conditions prévues par la réglementation.
            </p>
            <p className="mt-4">
              Pour toute demande relative à vos données personnelles :<br />
              <strong>Email :</strong> contact@afaqhealth.com<br />
              <strong>Adresse :</strong> Bir Rami Ouest, Kénitra — Maroc
            </p>

            <h3 className="text-xl font-bold text-teal-deep mt-8 mb-4">5. COOKIES</h3>
            <p>
              Le site peut utiliser des cookies ou technologies similaires nécessaires à son fonctionnement et, le cas échéant, à la mesure de son audience.<br /><br />
              Vous pouvez gérer vos préférences en matière de cookies selon les options proposées sur le site.
            </p>

            <div className="mt-12 pt-8 border-t border-sage-light text-sm text-anthracite-soft/60">
              Dernière mise à jour : 23 septembre 2026
            </div>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
