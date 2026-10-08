import { Link } from '@/navigation';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ivory-soft px-4 py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-gold-soft">404</p>
        <h1 className="mt-3 text-4xl font-bold text-teal-deep">Page introuvable</h1>
        <p className="mt-4 text-anthracite-soft/70">
          La page demandée n'existe pas ou n'est plus disponible.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-teal-deep px-6 py-3 text-sm font-bold text-white transition-all hover:bg-gold-soft hover:text-teal-deep"
        >
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
