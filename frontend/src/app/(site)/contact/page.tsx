'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [formType, setFormType] = useState('commercial');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only - no backend integration yet
    alert('Votre message a été envoyé avec succès. Notre équipe vous contactera dans les plus brefs délais.');
  };

  return (
    <div className="min-h-screen bg-ivory-soft pt-12 pb-24">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-teal-deep bg-sage-light rounded-full uppercase">
            Contact
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep">
            Parlons de votre <span className="text-gold-soft">Projet</span>
          </h1>
          <p className="text-lg text-anthracite-soft/80 font-sans">
            Notre équipe est à votre disposition pour toute demande de partenariat, d'information commerciale ou de support.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          
          {/* Contact Info Sidebar */}
          <div className="md:col-span-1 space-y-8">
            <div className="bg-teal-deep text-white p-8 rounded-3xl shadow-lg">
              <h3 className="text-xl font-bold mb-6 font-heading">Coordonnées</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-gold-soft">📍</div>
                  <div>
                    <p className="font-semibold">Siège Social</p>
                    <p className="text-sm text-sage-light mt-1">
                      Bir Rami Ouest<br />
                      14000 Kénitra — Maroc
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 text-gold-soft">📞</div>
                  <div>
                    <p className="font-semibold">Téléphone</p>
                    <p className="text-sm text-sage-light mt-1">+212 6 17 20 11 29</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 text-gold-soft">✉️</div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm text-sage-light mt-1">contact@afaqhealth.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-sage-light">
              <h3 className="text-lg font-bold text-teal-deep mb-2">Espace Pro</h3>
              <p className="text-sm text-anthracite-soft/80 mb-4">
                Vous êtes déjà partenaire ? Accédez directement à votre portail B2B pour passer commande.
              </p>
              <a href="/portal/login" className="text-teal-deep font-semibold text-sm underline hover:text-gold-soft transition-colors">
                Connexion B2B →
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-sage-light">
            
            {/* Form Type Selector */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { id: 'commercial', label: 'Service Commercial' },
                { id: 'partenariat', label: 'Demande de Partenariat (Fabricant)' },
                { id: 'support', label: 'Support / Autre' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFormType(type.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    formType === type.id 
                      ? 'bg-teal-deep text-white shadow-md' 
                      : 'bg-sage-light/50 text-anthracite-soft hover:bg-sage-light'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-teal-deep">Nom complet *</label>
                  <input type="text" id="name" required className="w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-ivory-soft/30 transition-all" placeholder="Dr. Ahmed..." />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-semibold text-teal-deep">Établissement / Société *</label>
                  <input type="text" id="company" required className="w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-ivory-soft/30 transition-all" placeholder="Pharmacie Centrale..." />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-teal-deep">Email professionnel *</label>
                  <input type="email" id="email" required className="w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-ivory-soft/30 transition-all" placeholder="contact@..." />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-teal-deep">Téléphone</label>
                  <input type="tel" id="phone" className="w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-ivory-soft/30 transition-all" placeholder="+212..." />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-teal-deep">Votre message *</label>
                <textarea id="message" required rows={5} className="w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-ivory-soft/30 transition-all resize-none" placeholder="Comment pouvons-nous vous aider ?"></textarea>
              </div>

              <button type="submit" className="w-full md:w-auto px-8 py-4 bg-gold-soft text-teal-deep font-bold rounded-xl hover:bg-teal-deep hover:text-white transition-all shadow-md shimmer-effect">
                Envoyer le message
              </button>
              
              <p className="text-xs text-anthracite-soft/60 mt-4">
                En soumettant ce formulaire, vous acceptez que vos données soient traitées conformément à notre politique de confidentialité (Loi 09-08).
              </p>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
