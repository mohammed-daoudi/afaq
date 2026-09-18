'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

export default function CookiesPage() {
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
            Gestion des données
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black text-teal-deep">
            Politique des Cookies
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
              Lors de votre navigation sur le site AFAQ HEALTH, des cookies ou autres traceurs peuvent être déposés sur votre terminal (ordinateur, tablette ou smartphone), sous réserve des choix que vous avez exprimés.
            </p>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">1. Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte enregistré par le navigateur de votre ordinateur, tablette ou smartphone, lors de la visite d'un site web. Les cookies permettent au site de mémoriser vos actions et préférences (comme la langue, la taille de la police ou vos paramètres de consentement) pendant une période donnée.
            </p>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">2. Les cookies que nous utilisons</h2>
            
            <h3 className="text-xl font-bold text-anthracite-soft mb-3">Cookies strictement nécessaires</h3>
            <p>
              Ces cookies sont indispensables au bon fonctionnement du site web et ne peuvent pas être désactivés dans nos systèmes. Ils ne stockent aucune information d'identification personnelle. Ils nous permettent notamment de :
            </p>
            <ul>
              <li>Mémoriser votre choix concernant le dépôt de cookies (bannière de consentement).</li>
              <li>Sécuriser la navigation sur le site.</li>
            </ul>

            <h3 className="text-xl font-bold text-anthracite-soft mt-8 mb-3">Cookies analytiques (mesure d'audience)</h3>
            <p>
              Ces cookies nous permettent de déterminer le nombre de visites et les sources du trafic sur notre site web, afin d'en mesurer et d'en améliorer les performances. Ils nous aident à savoir quelles pages sont les plus ou les moins consultées et comment les visiteurs naviguent sur le site.
            </p>
            <p>
              Toutes les informations collectées par ces cookies sont agrégées et donc anonymisées. Si vous n'acceptez pas ces cookies, nous ne serons pas informés de votre visite sur notre site.
            </p>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">3. Gérer vos préférences</h2>
            <p>
              Lors de votre première visite sur le site, une bannière vous a informé de la présence de cookies et vous a invité à faire un choix. 
            </p>
            <p>
              Vous pouvez à tout moment modifier vos préférences ou retirer votre consentement concernant les cookies non essentiels en utilisant le bouton ci-dessous :
            </p>
            
            <div className="mt-8 mb-12">
              <button 
                className="bg-teal-deep text-white font-bold py-3 px-6 rounded-xl hover:bg-gold-soft transition-all"
                onClick={() => alert('Ouverture du panneau de configuration des cookies (Bientôt disponible)')}
              >
                Gérer mes préférences cookies
              </button>
            </div>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">4. Paramétrage depuis votre navigateur</h2>
            <p>
              Vous pouvez également configurer votre navigateur pour qu'il refuse systématiquement les cookies ou qu'il vous demande votre autorisation avant chaque dépôt. Les modalités de configuration varient selon les navigateurs (Chrome, Firefox, Safari, Edge, etc.).
            </p>
            <p>
              Veuillez noter que la désactivation des cookies nécessaires peut altérer ou bloquer votre navigation sur le site.
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
