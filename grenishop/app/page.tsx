import Link from 'next/link';
import React from 'react';
import Footer from './components/footer';
import Header from './components/header';

const products = [
  { id: 1, name: 'Produit 1', imageUrl: '/image1.jpg', price: '29,99€', reviews: 10, rating: 4 },
  { id: 2, name: 'Produit 2', imageUrl: '/image2.jpg', price: '49,99€', reviews: 0, rating: 0 },
  { id: 3, name: 'Produit 3', imageUrl: '/image1.jpg', price: '29,99€', reviews: 8, rating: 3 },
  { id: 4, name: 'Produit 4', imageUrl: '/image2.jpg', price: '49,99€', reviews: 12, rating: 5 },
  { id: 5, name: 'Produit 5', imageUrl: '/image1.jpg', price: '29,99€', reviews: 3, rating: 2 },
  { id: 6, name: 'Produit 6', imageUrl: '/image2.jpg', price: '49,99€', reviews: 15, rating: 5 },
  { id: 7, name: 'Produit 7', imageUrl: '/image1.jpg', price: '39,99€', reviews: 7, rating: 4 },
  { id: 8, name: 'Produit 8', imageUrl: '/image2.jpg', price: '59,99€', reviews: 9, rating: 3 },
  { id: 9, name: 'Produit 9', imageUrl: '/image1.jpg', price: '19,99€', reviews: 4, rating: 4 },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="text-yellow-500">
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star} className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Accueil() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow px-6 py-8 pt-24 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="border rounded-xl shadow-sm p-4 transform hover:scale-105 hover:shadow-lg transition duration-300">
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
                
                {/* Star Rating and Reviews */}
                <div className="flex items-center mb-3">
                  <StarRating rating={product.rating} />
                  <Link href={`/produit/${product.id}`} className="ml-3 text-blue-500 hover:underline">
                    ({product.reviews > 0 ? product.reviews : 0} avis)
                  </Link>
                </div>
                
                <Link
                  href={`/produit/${product.id}`}
                  className="inline-block mt-auto px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600 transition"
                >
                  Voir le produit
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
