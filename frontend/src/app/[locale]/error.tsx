'use client';

import { Link } from '@/navigation';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen bg-ivory-soft px-4 py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-gold-soft">Erreur</p>
        <h1 className="mt-3 text-4xl font-bold text-teal-deep">Une erreur est survenue</h1>
        <p className="mt-4 text-anthracite-soft/70">
          Nous n'avons pas pu afficher cette page. Vous pouvez réessayer ou revenir à l'accueil.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-teal-deep px-6 py-3 text-sm font-bold text-white transition-all hover:bg-gold-soft hover:text-teal-deep"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="rounded-xl border border-teal-deep px-6 py-3 text-sm font-bold text-teal-deep transition-colors hover:bg-white"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
