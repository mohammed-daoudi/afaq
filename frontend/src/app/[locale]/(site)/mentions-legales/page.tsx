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



            <div className="mt-12 pt-8 border-t border-sage-light text-sm text-anthracite-soft/60">
              Dernière mise à jour : 23 septembre 2026
            </div>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
