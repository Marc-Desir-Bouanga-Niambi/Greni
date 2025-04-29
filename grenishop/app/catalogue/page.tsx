'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../components/header';
import Footer from '../components/footer';

interface Produit {
  id: number;
  nom: string;
  prix_Neuf: number;
  prix_Occasion: number;
}

export default function Catalogue() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const res = await fetch('/api/produits'); // À adapter selon le backend
        const data = await res.json();
        setProduits(data);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-grow px-6 py-8 pt-24 pb-32">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Tous nos produits</h1>

          {loading ? (
            <p>Chargement...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {produits.map(produit => (
                <Link
                  href={`/produits/${produit.id}`}
                  key={produit.id}
                  className="border p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <h2 className="text-xl font-semibold">{produit.nom}</h2>
                  <p>Neuf : {produit.prix_Neuf}€</p>
                  <p>Occasion : {produit.prix_Occasion}€</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
