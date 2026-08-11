'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import api from '@/lib/api';
import Link from 'next/link';

interface Order {
  id: number;
  status: string;
  total_amount: number;
  created_at: string;
}

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState("Partenaire");

  useEffect(() => {
    try {
      const b2bUser = localStorage.getItem('afaq_b2b_user');
      if (b2bUser) {
        setUserName(JSON.parse(b2bUser).name || "Partenaire");
      }
    } catch (e) {
      // ignore
    }

    const fetchOrders = async () => {
      try {
        const response = await api.get('/b2b/orders');
        setOrders(response.data);
      } catch (err: any) {
        console.error('Failed to fetch orders:', err);
        setError('Impossible de charger vos données.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const activeOrders = orders.filter(o => ['commande', 'en_preparation', 'expediee'].includes(o.status));
  const recentOrders = orders.slice(0, 3); // Take top 3

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'commande':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">En attente</span>;
      case 'en_preparation':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">En préparation</span>;
      case 'expediee':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">Expédiée</span>;
      case 'livree':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Livrée</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">{status}</span>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-heading font-bold text-teal-deep">Tableau de Bord</h1>
          <p className="text-anthracite-soft/60 mt-1">Bienvenue sur votre espace partenaire, <span className="font-bold text-teal-deep">{userName}</span>.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-4 border-sage-light border-t-teal-deep rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
          {error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-anthracite-soft/60 mb-2 uppercase tracking-wider">Commandes en cours</h3>
                <p className="text-4xl font-heading font-bold text-teal-deep">{activeOrders.length}</p>
                <Link href="/portal/orders" className="text-sm text-gold-soft font-medium mt-2 hover:underline inline-block">Voir le suivi →</Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-anthracite-soft/60 mb-2 uppercase tracking-wider">Total Historique</h3>
                <p className="text-4xl font-heading font-bold text-teal-deep">
                  {orders.reduce((sum, o) => sum + Number(o.total_amount), 0).toFixed(2)} <span className="text-2xl">MAD</span>
                </p>
                <p className="text-sm text-teal-deep/60 mt-2">{orders.length} commandes au total</p>
              </CardContent>
            </Card>
            <Card className="bg-teal-deep text-white">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-sage-light/60 mb-2 uppercase tracking-wider">Accès Rapide</h3>
                <p className="text-2xl font-heading font-bold text-gold-soft mb-2">Catalogue B2B</p>
                <p className="text-sm text-ivory-soft/80 mb-4">Commandez directement aux prix professionnels (PPH).</p>
                <Link href="/portal/catalog" className="px-4 py-2 bg-gold-soft text-white font-bold rounded-lg text-sm hover:bg-white hover:text-teal-deep transition-colors">
                  Voir le catalogue
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center pt-4">
            <h2 className="text-2xl font-heading font-bold text-teal-deep">Dernières Commandes</h2>
            {orders.length > 0 && (
              <Link href="/portal/orders" className="text-sm font-bold text-gold-soft hover:underline">Voir tout →</Link>
            )}
          </div>
          
          <Card>
            {recentOrders.length === 0 ? (
              <div className="p-8 text-center text-anthracite-soft/60">
                Vous n'avez passé aucune commande pour le moment.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-anthracite-soft/60 uppercase bg-sage-light">
                    <tr>
                      <th className="px-6 py-4">N° Commande</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Montant</th>
                      <th className="px-6 py-4">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id} className="border-b border-sage-light last:border-0">
                        <td className="px-6 py-4 font-medium text-teal-deep">CMD-{order.id.toString().padStart(4, '0')}</td>
                        <td className="px-6 py-4">
                          {new Date(order.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-4 font-bold">{Number(order.total_amount).toFixed(2)} MAD</td>
                        <td className="px-6 py-4">
                          {getStatusBadge(order.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
