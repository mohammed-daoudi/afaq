'use client';
import { useText } from '@/lib/useText';


import React from 'react';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { useCookiePreferences } from '@/context/CookiePreferencesContext';

export default function CookiesPage() {
  const tx = useText();
  const { openPreferences } = useCookiePreferences();

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
          <div className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-teal-deep bg-white border border-teal-deep/20 rounded-full uppercase shadow-sm">{tx("Gestion des données")}</div>
          <h1 className="text-4xl md:text-5xl font-black text-teal-deep">{tx("Politique des Cookies")}</h1>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white p-8 md:p-12 shadow-xl border border-sage-light rounded-[2rem] prose prose-teal max-w-none">
            
            <p className="lead">{tx("Lors de votre navigation sur le site AFAQ HEALTH, des cookies ou autres traceurs peuvent être déposés sur votre terminal (ordinateur, tablette ou smartphone), sous réserve des choix que vous avez exprimés.")}</p>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">{tx("1. Qu'est-ce qu'un cookie ?")}</h2>
            <p>{tx("Un cookie est un petit fichier texte enregistré par le navigateur de votre ordinateur, tablette ou smartphone, lors de la visite d'un site web. Les cookies permettent au site de mémoriser vos actions et préférences (comme la langue, la taille de la police ou vos paramètres de consentement) pendant une période donnée.")}</p>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">{tx("2. Les cookies que nous utilisons")}</h2>
            
            <h3 className="text-xl font-bold text-anthracite-soft mb-3">{tx("Cookies strictement nécessaires")}</h3>
            <p>{tx("Ces cookies et stockages sont nécessaires au fonctionnement du site et restent actifs. Ils permettent notamment de :")}</p>
            <ul>
              <li>{tx("Mémoriser votre langue avec le cookie NEXT_LOCALE.")}</li>
              <li>{tx("Assurer la sécurité et la gestion des sessions.")}</li>
              <li>{tx("Conserver vos préférences dans le stockage local de votre navigateur (localStorage), sous la clé afaq-cookie-preferences. Ce stockage local est distinct d'un cookie.")}</li>
            </ul>

            <h3 className="text-xl font-bold text-anthracite-soft mt-8 mb-3">{tx("Mesure d'audience & Statistiques")}</h3>
            <p>{tx("Cette catégorie facultative est désactivée par défaut. Elle concerne les statistiques anonymes de fréquentation et ne peut être activée qu'avec votre accord. Aucun service de mesure d'audience n'est actuellement actif sur le site.")}</p>

            <h3 className="text-xl font-bold text-anthracite-soft mt-8 mb-3">{tx("Fonctionnalités & Médias enrichis")}</h3>
            <p>{tx("Cette catégorie facultative, désactivée par défaut, contrôle la carte interactive des pharmacies et les lecteurs vidéo. La carte Google Maps se charge uniquement après votre accord ; son fournisseur reçoit alors votre adresse IP et les paramètres de la requête de carte. La lecture des vidéos du site attend également cet accord.")}</p>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">{tx("3. Gérer vos préférences")}</h2>
            <p>{tx("Lors de votre première visite, une bannière vous permet de tout accepter, de tout refuser ou de personnaliser votre choix. Les catégories facultatives restent désactivées tant que vous n'avez pas donné votre accord. Fermer le panneau ne vaut pas consentement et ne modifie pas vos préférences enregistrées.")}</p>
            <p>{tx("Vous pouvez à tout moment modifier vos préférences ou retirer votre consentement concernant les catégories facultatives avec le bouton ci-dessous ou le bouton « Cookies » en bas de chaque page. Vos choix et leur date sont conservés dans votre navigateur pendant six mois, puis votre choix vous est à nouveau demandé.")}</p>
            
            <div className="mt-8 mb-12">
              <button 
                type="button"
                aria-haspopup="dialog"
                className="bg-teal-deep text-white font-bold py-3 px-6 rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect"
                onClick={openPreferences}
              >{tx("Gérer mes préférences cookies")}</button>
            </div>

            <h2 className="text-2xl font-bold text-teal-deep mt-10 mb-6">{tx("4. Paramétrage depuis votre navigateur")}</h2>
            <p>{tx("Vous pouvez également configurer votre navigateur pour qu'il refuse systématiquement les cookies ou qu'il vous demande votre autorisation avant chaque dépôt. Les modalités de configuration varient selon les navigateurs (Chrome, Firefox, Safari, Edge, etc.).")}</p>
            <p>{tx("Veuillez noter que la désactivation des cookies nécessaires peut altérer ou bloquer votre navigation sur le site.")}</p>

            <div className="mt-12 pt-8 border-t border-sage-light text-sm text-anthracite-soft/60">{tx("Dernière mise à jour : 15 octobre 2026")}</div>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
