'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import api from '@/lib/api';
import Image from 'next/image';

interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
  product?: {
    label: string;
    photo?: string;
  };
}

interface Order {
  id: number;
  status: string;
  total_amount: number;
  created_at: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/b2b/orders');
        setOrders(response.data);
      } catch (err: any) {
        console.error('Failed to fetch orders:', err);
        setError('Impossible de charger l\'historique de vos commandes.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'commande':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold whitespace-nowrap">En attente</span>;
      case 'en_preparation':
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold whitespace-nowrap">En préparation</span>;
      case 'expediee':
        return <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold whitespace-nowrap">Expédiée</span>;
      case 'livree':
        return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold whitespace-nowrap">Livrée</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold whitespace-nowrap">{status}</span>;
    }
  };

  const toggleExpand = (id: number) => {
    if (expandedOrder === id) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(id);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-teal-deep">Historique des Commandes</h1>
        <p className="text-anthracite-soft/60 mt-1">Consultez et suivez l'état de vos commandes B2B.</p>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-4 border-sage-light border-t-teal-deep rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
          {error}
        </div>
      ) : orders.length === 0 ? (
        <Card>
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-sage-light rounded-full flex items-center justify-center text-2xl mb-4">
              📦
            </div>
            <h3 className="text-lg font-bold text-teal-deep mb-2">Aucune commande</h3>
            <p className="text-anthracite-soft/60 mb-6">Vous n'avez pas encore passé de commande sur le portail.</p>
            <a href="/portal/catalog" className="px-6 py-2 bg-teal-deep text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors">
              Découvrir le catalogue
            </a>
          </div>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-anthracite-soft/60 uppercase bg-sage-light">
                <tr>
                  <th className="px-6 py-4">N° Commande</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-center">Articles</th>
                  <th className="px-6 py-4">Montant Total</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  const isExpanded = expandedOrder === order.id;
                  const totalItems = order.items.reduce((sum, item) => sum + Number(item.quantity), 0);
                  
                  return (
                    <React.Fragment key={order.id}>
                      <tr 
                        className={`border-b border-sage-light hover:bg-sage-light/30 transition-colors cursor-pointer ${isExpanded ? 'bg-sage-light/30' : ''}`}
                        onClick={() => toggleExpand(order.id)}
                      >
                        <td className="px-6 py-4 font-bold text-teal-deep">
                          CMD-{order.id.toString().padStart(4, '0')}
                        </td>
                        <td className="px-6 py-4 text-anthracite-soft">
                          {new Date(order.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-ivory-soft text-xs font-bold text-teal-deep border border-sage-light">
                            {totalItems}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-teal-deep">
                          {Number(order.total_amount).toFixed(2)} MAD
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(order.status)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 text-anthracite-soft hover:text-teal-deep hover:bg-sage-light rounded-full transition-colors">
                            <svg 
                              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
                              className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            >
                              <path d="M6 9l6 6 6-6"/>
                            </svg>
                          </button>
                        </td>
                      </tr>
                      {/* Expanded Details Row */}
                      {isExpanded && (
                        <tr className="bg-ivory-soft/50 border-b border-sage-light">
                          <td colSpan={6} className="p-0">
                            <div className="p-6">
                              <h4 className="font-bold text-teal-deep mb-4 text-sm uppercase tracking-wider">Détails des articles</h4>
                              <div className="space-y-4">
                                {order.items.map((item) => (
                                  <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-sage-light">
                                    <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 bg-ivory-soft rounded-lg overflow-hidden border border-sage-light flex items-center justify-center shrink-0">
                                        {/* Mock image fallback if missing from DB */}
                                        <span className="text-2xl">💊</span>
                                      </div>
                                      <div>
                                        <p className="font-bold text-teal-deep text-sm">{item.product?.label || 'Produit inconnu'}</p>
                                        <p className="text-xs text-anthracite-soft/60 mt-1">{Number(item.unit_price).toFixed(2)} MAD x {item.quantity}</p>
                                      </div>
                                    </div>
                                    <div className="font-bold text-teal-deep">
                                      {Number(item.subtotal).toFixed(2)} MAD
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
