'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().trim().email('Email professionnel invalide.'),
  password: z.string().min(1, 'Mot de passe requis.'),
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message || 'Veuillez vérifier vos informations.');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await api.post('/login', parsed.data);
      
      if (response.data.access_token) {
        const secureCookie = window.location.protocol === 'https:' ? '; Secure' : '';
        document.cookie = `auth_token=${encodeURIComponent(response.data.access_token)}; Path=/; Max-Age=28800; SameSite=Lax${secureCookie}`;
        localStorage.setItem('afaq_b2b_user', JSON.stringify(response.data.user));
        router.push('/portal/dashboard');
        router.refresh(); 
      }
    } catch (error: any) {
      const status = error?.response?.status;
      setFormError(status === 401 || status === 422 ? 'Identifiants invalides.' : 'Erreur de connexion au serveur.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory-soft flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-sage-light">
        <div className="flex flex-col items-center mb-8">
          <Logo className="mb-6 scale-110" />
          <h1 className="text-2xl font-bold text-teal-deep">Espace Professionnel</h1>
          <p className="text-sm text-anthracite-soft/60 mt-1">Connectez-vous à votre compte partenaire</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <Input 
            label="Email Professionnel" 
            type="email" 
            placeholder="contact@pharmacie.ma"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Input 
            label="Mot de passe" 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {formError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {formError}
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-sage-light text-teal-deep focus:ring-teal-deep" />
              <span className="text-anthracite-soft/80">Se souvenir de moi</span>
            </label>
            <a href="#" className="text-gold-soft hover:underline font-medium">Mot de passe oublié ?</a>
          </div>

          <Button type="submit" className="w-full" size="lg" withShimmer disabled={isLoading}>
            {isLoading ? 'Connexion en cours...' : 'Se Connecter'}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-anthracite-soft/60 border-t border-sage-light pt-6">
          Vous souhaitez devenir partenaire ? <br />
          <a href="/contact" className="text-teal-deep font-semibold hover:underline">Contactez notre service commercial</a>
        </div>
      </div>
    </div>
  );
}
