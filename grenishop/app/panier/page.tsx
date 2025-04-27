'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from '../components/footer';
import Header from '../components/header';

interface Article {
  id: number;
  name: string;
  price: number;
}

export default function Panier() {
  const [panier, setPanier] = useState<Article[]>([]);

  // Charger les articles du panier depuis localStorage
  useEffect(() => {
    const storedPanier = localStorage.getItem('panier');
    if (storedPanier) {
      setPanier(JSON.parse(storedPanier));
    }
  }, []);

  // Supprimer un article
  const supprimerArticle = (id: number) => {
    const nouveauPanier = panier.filter(article => article.id !== id);
    setPanier(nouveauPanier);
    localStorage.setItem('panier', JSON.stringify(nouveauPanier));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header existant */}
      <Header />

      {/* Contenu du panier */}
      <main className="flex-grow px-6 py-8 pt-24 pb-32">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Votre Panier</h1>

          {panier.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Votre panier est vide</h2>
              <p className="text-gray-500 mb-6">Ajoutez des articles à votre panier pour commencer votre commande.</p>
              <Link
                href="/"
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition"
              >
                Continuer mes achats
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {panier.map((article) => (
                <div
                  key={article.id}
                  className="flex justify-between items-center bg-white p-4 rounded-md shadow-md"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{article.name}</h2>
                    <p className="text-gray-600">{article.price} €</p>
                  </div>
                  <button
                    onClick={() => supprimerArticle(article.id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer existant */}
      <Footer />
    </div>
  );
}
