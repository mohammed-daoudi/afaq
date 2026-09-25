'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/navigation';

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if the user has already answered the cookie consent
    const consent = localStorage.getItem('afaq-cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('afaq-cookie-consent', 'accepted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('afaq-cookie-consent', 'declined');
    setShow(false);
  };

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
          <div className="max-w-5xl mx-auto bg-white border border-sage-light shadow-2xl rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-anthracite-soft text-sm md:text-base flex-1">
              <h3 className="text-teal-deep font-bold mb-2 uppercase tracking-wide">
                Gérer vos cookies
              </h3>
              <p>
                AFAQ HEALTH utilise des cookies pour améliorer votre expérience utilisateur et réaliser des statistiques d'audience. Vous pouvez accepter ou refuser ces cookies. Pour en savoir plus, consultez notre{' '}
                <Link href="/cookies" className="text-gold-soft hover:text-gold-deep font-semibold underline underline-offset-2 transition-colors">
                  Politique des cookies
                </Link>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={handleDecline}
                className="px-6 py-2.5 text-sm font-bold tracking-wider uppercase text-teal-deep border-2 border-teal-deep hover:bg-teal-deep hover:text-white rounded transition-colors w-full sm:w-auto text-center"
              >
                Refuser
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 text-sm font-bold tracking-wider uppercase bg-gold-soft text-white hover:bg-gold-deep shadow-md rounded transition-all w-full sm:w-auto text-center"
              >
                Accepter
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
