'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import api from '@/lib/api';

interface Document {
  id: number;
  title: string;
  file_url: string;
  type: string;
  created_at: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get('/b2b/documents');
        setDocuments(response.data);
      } catch (err: any) {
        console.error('Failed to fetch documents:', err);
        setError('Impossible de charger vos documents.');
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'facture':
        return '💰';
      case 'bon_livraison':
        return '🚚';
      case 'certificat':
        return '🏅';
      case 'fiche_technique':
        return '📑';
      default:
        return '📄';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'facture':
        return 'Facture';
      case 'bon_livraison':
        return 'Bon de Livraison';
      case 'certificat':
        return 'Certificat';
      case 'fiche_technique':
        return 'Fiche Technique';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-teal-deep">Mes Documents</h1>
        <p className="text-anthracite-soft/60 mt-1">Consultez et téléchargez vos factures, bons de livraison et fiches techniques.</p>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-4 border-sage-light border-t-teal-deep rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
          {error}
        </div>
      ) : documents.length === 0 ? (
        <Card>
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-sage-light rounded-full flex items-center justify-center text-2xl mb-4">
              📭
            </div>
            <h3 className="text-lg font-bold text-teal-deep mb-2">Aucun document</h3>
            <p className="text-anthracite-soft/60">Vous n'avez pas encore de documents associés à votre compte.</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-ivory-soft rounded-xl flex items-center justify-center text-2xl border border-sage-light group-hover:border-teal-deep/30 transition-colors">
                    {getTypeIcon(doc.type)}
                  </div>
                  <span className="text-xs font-bold text-teal-deep bg-sage-light px-2 py-1 rounded-full uppercase tracking-wider">
                    {getTypeName(doc.type)}
                  </span>
                </div>
                
                <h3 className="font-bold text-teal-deep mt-4 text-lg line-clamp-2">{doc.title}</h3>
                <p className="text-xs text-anthracite-soft/60 mt-1">
                  Ajouté le {new Date(doc.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
                
                <a 
                  href={doc.file_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-sage-light/50 text-teal-deep font-bold rounded-lg hover:bg-teal-deep hover:text-white transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Télécharger
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
