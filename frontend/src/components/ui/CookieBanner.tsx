'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/navigation';
import { useCookiePreferences } from '@/context/CookiePreferencesContext';

export function CookieBanner() {
  const { ready, hasDecision, isOpen, openPreferences, savePreferences } = useCookiePreferences();
  const show = ready && !hasDecision && !isOpen;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-5xl mx-auto bg-white border border-sage-light shadow-2xl rounded-xl p-5 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-5">
            <div className="text-anthracite-soft text-sm md:text-base flex-1">
              <h3 className="text-teal-deep font-bold mb-2 uppercase tracking-wide">
                Gérer vos cookies
              </h3>
              <p>
                Les cookies nécessaires assurent le fonctionnement du site. Avec votre accord, des fonctionnalités comme la carte et les vidéos peuvent être activées. Vous pouvez aussi choisir vos préférences de mesure d'audience. Consultez notre{' '}
                <Link href="/cookies" className="text-gold-soft hover:text-gold-deep font-semibold underline underline-offset-2 transition-colors">
                  Politique des cookies
                </Link>.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full lg:w-auto shrink-0">
              <button
                type="button"
                onClick={() => savePreferences({ analytics: true, functional: true })}
                className="px-4 py-3 text-sm font-bold text-teal-deep border-2 border-teal-deep hover:bg-teal-deep hover:text-white rounded-lg transition-colors text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-soft"
              >
                Accepter
              </button>
              <button
                type="button"
                onClick={() => savePreferences({ analytics: false, functional: false })}
                className="px-4 py-3 text-sm font-bold text-teal-deep border-2 border-teal-deep hover:bg-teal-deep hover:text-white rounded-lg transition-colors text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-soft"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={openPreferences}
                id="afaq-cookie-customize"
                aria-haspopup="dialog"
                className="col-span-2 sm:col-span-1 px-4 py-3 text-sm font-bold text-teal-deep bg-ivory-soft border-2 border-gold-soft hover:bg-gold-soft/20 rounded-lg transition-colors text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-deep"
              >
                Personnaliser
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
