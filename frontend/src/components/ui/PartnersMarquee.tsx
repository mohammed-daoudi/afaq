'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const PARTNERS = [
  '/images/partners/33119370-7ef2-48a3-86b3-b91a27a972a6.jpg',
  '/images/partners/Gemini_Generated_Image_7imhdx7imhdx7imh.jpg',
  '/images/partners/Gemini_Generated_Image_jphtsrjphtsrjpht.jpg',
  '/images/partners/Gemini_Generated_Image_u6jqv2u6jqv2u6jq.jpg',
];

export function PartnersMarquee() {
  return (
    <section className="bg-white py-16 border-t border-sage-light/30">
      <div className="container mx-auto px-8 md:px-16 text-center mb-12 max-w-3xl">
        <h2 className="text-base font-bold uppercase tracking-widest text-gold-soft mb-4">
          NOS PARTENAIRES
        </h2>
        <h3 className="text-3xl md:text-4xl font-extrabold text-teal-deep mb-6 leading-tight">
          Des partenaires sélectionnés avec exigence.
        </h3>
        <p className="text-lg text-anthracite-soft/80 leading-relaxed">
          AFAQ HEALTH s’appuie sur des partenaires sélectionnés pour leur savoir-faire, leur expertise et leur capacité à accompagner durablement le développement de nos marques.
        </p>
      </div>

      <div className="relative w-full overflow-hidden whitespace-nowrap bg-white py-8">
        {/* We use two containers with identical content for a seamless loop */}
        <div className="inline-flex animate-marquee items-center gap-16 md:gap-24 px-8">
          {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((logo, index) => (
            <div key={index} className="relative w-40 h-24 md:w-56 md:h-32 shrink-0 transition-transform duration-500 hover:scale-105">
              <Image 
                src={logo} 
                alt={`Partner ${index + 1}`} 
                fill 
                className="object-contain" 
              />
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </section>
  );
}
