import Link from 'next/link';
import React from 'react';
import Footer from './components/footer';
import Header from './components/header';

const products = [
  { id: 1, name: 'Produit 1', imageUrl: '/image1.jpg', price: '29,99€' },
  { id: 2, name: 'Produit 2', imageUrl: '/image2.jpg', price: '49,99€' },
  { id: 3, name: 'Produit 3', imageUrl: '/image1.jpg', price: '29,99€' },
  { id: 4, name: 'Produit 4', imageUrl: '/image2.jpg', price: '49,99€' },
  { id: 5, name: 'Produit 5', imageUrl: '/image1.jpg', price: '29,99€' },
  { id: 6, name: 'Produit 6', imageUrl: '/image2.jpg', price: '49,99€' },
  { id: 7, name: 'Produit 7', imageUrl: '/image1.jpg', price: '39,99€' },
  { id: 8, name: 'Produit 8', imageUrl: '/image2.jpg', price: '59,99€' },
  { id: 9, name: 'Produit 9', imageUrl: '/image1.jpg', price: '19,99€' },
];

const decorImages = ['/arbre.jpg', '/éléphant.jpg', '/papillon.jpg'];

export default function Accueil() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="px-6 py-8 pt-24 pb-32">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Découvrez nos articles en vedette
        </h1>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <React.Fragment key={product.id}>
                {index === 0 && (
                  <div className="col-span-full">
                    <img
                      src={decorImages[0]}
                      alt="Décoration"
                      className="rounded-xl shadow-md w-full h-64 object-cover"
                    />
                  </div>
                )}

                <div className="border rounded-xl shadow-sm p-4 transform hover:scale-105 hover:shadow-lg transition duration-300">
                  <div
                    className="w-full h-48 bg-gray-300 rounded-md mb-3"
                    style={{
                      backgroundImage: `url(${product.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                  <div className="text-lg font-semibold mb-3">{product.name}</div>
                  <div className="text-gray-700 font-medium mb-3">{product.price}</div>
                  <Link
                    href={`./produit`}
                    className="inline-block mt-auto px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Voir le produit
                  </Link>
                </div>

                {index === 2 && (
                  <div className="col-span-full">
                    <img
                      src={decorImages[1]}
                      alt="Décoration"
                      className="rounded-xl shadow-md w-full h-64 object-cover"
                    />
                  </div>
                )}

                {index === 5 && (
                  <div className="col-span-full">
                    <img
                      src={decorImages[2]}
                      alt="Décoration"
                      className="rounded-xl shadow-md w-full h-64 object-cover"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
