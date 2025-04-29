'use client';

import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: string;
  rating: number;
  numReviews: number;
}

export default function Favoris() {
  const [favoris, setFavoris] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favoris');
    if (stored) {
      setFavoris(JSON.parse(stored));
    }
  }, []);

  const removeFromFavoris = (id: number) => {
    const updated = favoris.filter((item) => item.id !== id);
    setFavoris(updated);
    localStorage.setItem('favoris', JSON.stringify(updated));
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={star <= rating ? '#facc15' : '#d1d5db'}
            className="w-5 h-5"
          >
            <path d="M12 17.27L18.18 21l-1.64-7L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.76L5.82 21z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow px-6 py-8 pt-24 pb-32">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-green-900">Mes Favoris ❤️</h1>
          {favoris.length === 0 ? (
            <p className="text-gray-600">Aucun produit ajouté aux favoris.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {favoris.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-xl shadow-sm p-4 transform hover:scale-105 hover:shadow-lg transition duration-300"
                >
                  <div
                    className="w-full h-48 bg-gray-300 rounded-md mb-3"
                    style={{
                      backgroundImage: `url(${product.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                  <div className="text-lg font-semibold mb-1">{product.name}</div>
                  <div className="text-gray-700 font-medium mb-2">{product.price}</div>
                  <div className="mb-2 flex justify-between items-center">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-500">{product.numReviews} avis</span>
                  </div>
                  <button
                    onClick={() => removeFromFavoris(product.id)}
                    className="mt-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Retirer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
