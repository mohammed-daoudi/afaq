'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
// Public access key (safe to expose by design); env var overrides it if set
const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '2ff09186-67a8-4fbc-a2f4-7d86e1181d9b';

const contactFormSchema = z.object({
  formType: z.enum(['Demande commerciale', 'Devenir partenaire', 'Autre demande']),
  name: z.string().trim().min(2, 'Indiquez votre nom complet.').max(120, 'Le nom est trop long.'),
  company: z.string().trim().min(2, 'Indiquez votre société.').max(120, 'Le nom de société est trop long.'),
  email: z.string().trim().email('Indiquez une adresse email valide.').max(160, 'L’email est trop long.'),
  phone: z.string().trim().max(40, 'Le téléphone est trop long.').optional(),
  message: z.string().trim().min(10, 'Votre message doit contenir au moins 10 caractères.').max(2000, 'Le message est trop long.'),
  website: z.string().max(0, 'Demande refusée.'),
});

type Status = 'idle' | 'sending' | 'success';

export default function ContactPage() {
  const [formType, setFormType] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lastSubmittedAt, setLastSubmittedAt] = useState(0);
  const [status, setStatus] = useState<Status>('idle');
  // Bots submit instantly: reject sends made within 3s of the page loading
  const [loadedAt] = useState(() => Date.now());
  const t = useTranslations('ContactPage');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const now = Date.now();
    if (now - lastSubmittedAt < 10_000) {
      setErrors({ form: 'Veuillez patienter quelques secondes avant un nouvel envoi.' });
      return;
    }

    if (now - loadedAt < 3_000) {
      setErrors({ form: 'Veuillez patienter quelques secondes avant d’envoyer.' });
      return;
    }

    const raw = Object.fromEntries(new FormData(form));
    const result = contactFormSchema.safeParse(raw);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (typeof field === 'string' && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      setStatus('idle');
      return;
    }

    const accessKey = WEB3FORMS_KEY;
    if (!accessKey) {
      setErrors({ form: 'Le formulaire est temporairement indisponible. Veuillez nous écrire par email.' });
      return;
    }

    const d = result.data;
    const payload = {
      access_key: accessKey,
      subject: `Site AFAQ HEALTH — ${d.formType} — ${d.name}`,
      from_name: 'Site AFAQ HEALTH',
      formType: d.formType,
      name: d.name,
      company: d.company,
      email: d.email,
      phone: d.phone || '-',
      message: d.message,
      botcheck: raw.botcheck ? true : undefined,
    };

    setErrors({});
    setStatus('sending');
    setLastSubmittedAt(now);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15_000);

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const json = await res.json();

      if (res.ok && json.success) {
        form.reset();
        setFormType('');
        setStatus('success');
      } else {
        throw new Error('submit_failed');
      }
    } catch {
      setStatus('idle');
      setErrors({ form: 'L’envoi a échoué. Veuillez réessayer ou nous écrire directement par email.' });
    } finally {
      clearTimeout(timer);
    }
  };

  return (
    <div className="min-h-screen bg-ivory-soft pt-12 pb-24">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-teal-deep bg-sage-light rounded-full uppercase">
            {t('badge')}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-teal-deep">
            {t('title')} <span className="text-gold-soft">{t('titleHighlight')}</span>
          </h1>
          <p className="text-lg text-anthracite-soft/80 ">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          
          {/* Contact Info Sidebar */}
          <div className="md:col-span-1 space-y-8">
            <div className="bg-teal-deep text-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-6 ">{t('coordinates')}</h3>
              
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
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="formType" className="text-sm font-semibold text-teal-deep">{t('requestType')}</label>
                <select
                  id="formType"
                  name="formType"
                  required
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-ivory-soft/30 transition-all appearance-none cursor-pointer"
                  aria-invalid={Boolean(errors.formType)}
                >
                  <option value="" disabled>{t('selectType')}</option>
                  <option value="Demande commerciale">{t('commercialRequest')}</option>
                  <option value="Devenir partenaire">{t('becomePartner')}</option>
                  <option value="Autre demande">{t('otherRequest')}</option>
                </select>
                {errors.formType && <p className="text-xs text-red-600">{errors.formType}</p>}
              </div>

              {/* Honeypots (hidden from humans) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-teal-deep">{t('fullName')}</label>
                  <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-ivory-soft/30 transition-all" placeholder={t('fullNamePlaceholder')} aria-invalid={Boolean(errors.name)} />
                  {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-semibold text-teal-deep">{t('company')}</label>
                  <input type="text" id="company" name="company" required className="w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-ivory-soft/30 transition-all" placeholder={t('companyPlaceholder')} aria-invalid={Boolean(errors.company)} />
                  {errors.company && <p className="text-xs text-red-600">{errors.company}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-teal-deep">{t('proEmail')}</label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-ivory-soft/30 transition-all" placeholder="contact@..." aria-invalid={Boolean(errors.email)} />
                  {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-teal-deep">{t('phone')}</label>
                  <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-ivory-soft/30 transition-all" placeholder={t('phonePlaceholder')} aria-invalid={Boolean(errors.phone)} />
                  {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-teal-deep">{t('yourMessage')}</label>
                <textarea id="message" name="message" required rows={5} className="w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-ivory-soft/30 transition-all resize-none" placeholder={t('messagePlaceholder')} aria-invalid={Boolean(errors.message)}></textarea>
                {errors.message && <p className="text-xs text-red-600">{errors.message}</p>}
              </div>

              {errors.form && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                  {errors.form}
                </div>
              )}

              {status === 'success' && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800" role="status">
                  {t('successAlert')}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full md:w-auto px-8 py-4 bg-teal-deep text-white font-bold rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Envoi en cours…' : t('send')}
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