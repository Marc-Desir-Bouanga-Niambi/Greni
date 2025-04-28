import Link from 'next/link';
import React from 'react';
import Footer from './components/footer';
import Header from './components/header';

const products = [
  { id: 1, name: 'Produit 1', imageUrl: '/image1.jpg', price: '29,99€', rating: 4, numReviews: 25 },
  { id: 2, name: 'Produit 2', imageUrl: '/image2.jpg', price: '49,99€', rating: 3, numReviews: 10 },
  { id: 3, name: 'Produit 3', imageUrl: '/image1.jpg', price: '29,99€', rating: 5, numReviews: 35 },
  { id: 4, name: 'Produit 4', imageUrl: '/image2.jpg', price: '49,99€', rating: 2, numReviews: 5 },
  { id: 5, name: 'Produit 5', imageUrl: '/image1.jpg', price: '29,99€', rating: 4, numReviews: 12 },
  { id: 6, name: 'Produit 6', imageUrl: '/image2.jpg', price: '49,99€', rating: 3, numReviews: 8 },
  { id: 7, name: 'Produit 7', imageUrl: '/image1.jpg', price: '39,99€', rating: 4, numReviews: 16 },
  { id: 8, name: 'Produit 8', imageUrl: '/image2.jpg', price: '59,99€', rating: 3, numReviews: 14 },
  { id: 9, name: 'Produit 9', imageUrl: '/image1.jpg', price: '19,99€', rating: 2, numReviews: 4 },
];

const decorImages = ['/images/arbre.jpg', '/images/éléphant.jpg', '/images/papillon.jpg'];

export default function Accueil() {
  const renderStars = (rating) => {
    const stars = [1, 2, 3, 4, 5]; // 5 étoiles
    return (
      <div className="flex items-center space-x-1">
        {stars.map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 17.27l4.18 2.18-1.64-5.11L20 9.24l-5.19-.42L12 3 9.19 8.82 4 9.24l3.46 4.1-1.64 5.11L12 17.27z"
            />
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
                  
                  {/* Afficher les étoiles et Avis */}
                  <div className="mb-3 flex justify-between items-center">
                    {renderStars(product.rating)}
                    <Link
                      href={`/produit/${product.id}`}
                      className="text-black text-sm hover:underline"
                    >
                      {product.numReviews} Avis
                    </Link>
                  </div>

                  <Link
                    href={`/produit/${product.id}`}
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
