'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const [formType, setFormType] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const t = useTranslations('ContactPage');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('successAlert'));
  };

  return (
    <div className="min-h-screen bg-ivory-soft pt-12 pb-24">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-teal-deep bg-sage-light rounded-full uppercase">
            {t('badge')}
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep">
            {t('title')} <span className="text-gold-soft">{t('titleHighlight')}</span>
          </h1>
          <p className="text-lg text-anthracite-soft/80 font-sans">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          
          {/* Contact Info Sidebar */}
          <div className="md:col-span-1 space-y-8">
            <div className="bg-teal-deep text-white p-8 rounded-3xl shadow-lg">
              <h3 className="text-xl font-bold mb-6 font-heading">{t('coordinates')}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-gold-soft">📍</div>
                  <div>
                    <p className="font-semibold">{t('headquarters')}</p>
                    <p className="text-sm text-sage-light mt-1">
                      Bir Rami Ouest<br />
                      14000 Kénitra — Maroc
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 text-gold-soft">📞</div>
                  <div className="flex-1">
                    <p className="font-semibold">{t('phone')}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-sage-light">+212 6 17 20 11 29</p>
                      <button 
                        onClick={() => handleCopy('+212617201129', 'phone')}
                        className="text-sage-light hover:text-gold-soft transition-colors"
                      >
                        {copied === 'phone' ? (
                          <span className="text-xs text-green-400">{t('copied')}</span>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 text-gold-soft">✉️</div>
                  <div className="flex-1">
                    <p className="font-semibold">{t('email')}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-sage-light">contact@afaqhealth.com</p>
                      <button 
                        onClick={() => handleCopy('contact@afaqhealth.com', 'email')}
                        className="text-sage-light hover:text-gold-soft transition-colors"
                      >
                        {copied === 'email' ? (
                          <span className="text-xs text-green-400">{t('copied')}</span>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-sage-light">
              <h3 className="text-lg font-bold text-teal-deep mb-2">{t('proSpace')}</h3>
              <p className="text-sm text-anthracite-soft/80 mb-4">
                {t('proSpaceDesc')}
              </p>
              <a href="/portal/login" className="text-teal-deep font-semibold text-sm underline hover:text-gold-soft transition-colors">
                {t('b2bLogin')}
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-sage-light">
            
            {/* Form Type Selector */}
            <div className="mb-6 space-y-2">
              <label htmlFor="formType" className="text-sm font-semibold text-teal-deep">{t('requestType')}</label>
              <select 
                id="formType" 
                required
                value={formType}
                onChange={(e) => setFormType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-ivory-soft/30 transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>{t('selectType')}</option>
                <option value="Consommateur">{t('consumer')}</option>
                <option value="Produit">{t('product')}</option>
                <option value="Pharmacie">{t('pharmacy')}</option>
                <option value="Professionnel">{t('professional')}</option>
                <option value="Grossiste / distributeur">{t('wholesaler')}</option>
                <option value="Partenariat">{t('partnership')}</option>
                <option value="Laboratoire / marque">{t('laboratory')}</option>
                <option value="Presse">{t('press')}</option>
                <option value="Autre">{t('other')}</option>
              </select>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-teal-deep">{t('fullName')}</label>
                  <input type="text" id="name" required className="w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-ivory-soft/30 transition-all" placeholder={t('fullNamePlaceholder')} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-semibold text-teal-deep">{t('company')}</label>
                  <input type="text" id="company" required className="w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-ivory-soft/30 transition-all" placeholder={t('companyPlaceholder')} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-teal-deep">{t('proEmail')}</label>
                  <input type="email" id="email" required className="w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-ivory-soft/30 transition-all" placeholder="contact@..." />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-teal-deep">{t('phone')}</label>
                  <input type="tel" id="phone" className="w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-ivory-soft/30 transition-all" placeholder={t('phonePlaceholder')} />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-teal-deep">{t('yourMessage')}</label>
                <textarea id="message" required rows={5} className="w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-ivory-soft/30 transition-all resize-none" placeholder={t('messagePlaceholder')}></textarea>
              </div>

              <button type="submit" className="w-full md:w-auto px-8 py-4 bg-gold-soft text-teal-deep font-bold rounded-xl hover:bg-teal-deep hover:text-white transition-all shadow-md shimmer-effect">
                {t('send')}
              </button>
              
              <p className="text-xs text-anthracite-soft/60 mt-4">
                {t('privacyNotice')}
              </p>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
