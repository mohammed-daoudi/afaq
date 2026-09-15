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
          <h1 className="text-4xl md:text-5xl font-heading font-black text-teal-deep">
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
            <h2 className="text-2xl font-bold text-teal-deep mb-6">1. Éditeur du site</h2>
            <p>
              Le présent site est édité par :<br />
              <strong>AFAQ Health</strong><br />
              [Forme juridique : ex: S.A.R.L au capital de X MAD]<br />
              <strong>Siège social :</strong> [Adresse complète, Casablanca, Maroc]<br />
              <strong>Registre du Commerce (RC) :</strong> [Numéro de RC]<br />
              <strong>Identifiant Commun de l'Entreprise (ICE) :</strong> [Numéro ICE]<br />
              <strong>Identifiant Fiscal (IF) :</strong> [Numéro IF]<br />
              <strong>Taxe Professionnelle (TP) :</strong> [Numéro TP]
            </p>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">2. Nous contacter</h2>
            <p>
              <strong>Téléphone :</strong> [Numéro de téléphone]<br />
              <strong>Email :</strong> contact@afaqhealth.ma
            </p>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">3. Responsable de la publication</h2>
            <p>
              <strong>Directeur de la publication :</strong> [Nom du représentant légal ou responsable de la publication]
            </p>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">4. Hébergement</h2>
            <p>
              Le site est hébergé par :<br />
              <strong>[Nom de l'hébergeur]</strong><br />
              [Forme juridique de l'hébergeur]<br />
              <strong>Siège social de l'hébergeur :</strong> [Adresse complète de l'hébergeur]<br />
              <strong>Contact de l'hébergeur :</strong> [Téléphone / Email]
            </p>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">5. Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu présent sur ce site (textes, images, logos, vidéos, éléments graphiques, architecture, etc.) est la propriété exclusive d'AFAQ Health, de ses marques partenaires ou fait l'objet d'une autorisation d'utilisation. 
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable d'AFAQ Health.
            </p>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">6. Responsabilité</h2>
            <p>
              AFAQ Health s'efforce de fournir sur ce site des informations aussi précises que possible. Toutefois, l'entreprise ne pourra être tenue responsable des oublis, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
            </p>
            <p>
              Les informations publiées sur ce site sont destinées à des fins informatives et éducatives. Elles ne remplacent en aucun cas l'avis d'un professionnel de santé.
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
