"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import { Produit, produitService } from "./lib/services/api";

const decorImages = [
  "/images/arbre.jpg",
  "/images/éléphant.jpg",
  "/images/papillon.jpg",
];

export default function Accueil() {
  const [products, setProducts] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await produitService.getAll();
        setProducts(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des produits:", err);
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
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
          {loading && <div className="text-center">Chargement...</div>}
          {error && <div className="text-center text-red-500">{error}</div>}
          {!loading && !error && (
            <>
              {/* Première image décorative */}
              <div className="mb-8">
                <img
                  src={decorImages[0]}
                  alt="Décoration"
                  className="rounded-xl shadow-md w-full h-64 object-cover"
                />
              </div>

              {/* Grille de produits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
                {products.map((product) => (
                  <div
                    key={product.produitID}
                    className="border rounded-xl shadow-sm p-4 transform hover:scale-105 hover:shadow-lg transition duration-300"
                  >
                    <div
                      className="w-full h-48 bg-gray-300 rounded-md mb-3"
                      style={{
                        backgroundImage: `url('/image1.jpg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <div className="text-lg font-semibold mb-3">
                      {product.nom}
                    </div>
                    <div className="text-gray-700 font-medium mb-3">
                      {product.prix_Neuf}€
                    </div>

                    <div className="mb-3 flex justify-between items-center">
                      {renderStars(4)}
                      <Link
                        href={`/produit/${product.produitID}`}
                        className="text-black text-sm hover:underline"
                      >
                        Voir les avis
                      </Link>
                    </div>

                    <Link
                      href={`/produit/${product.produitID}`}
                      className="inline-block mt-auto px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600 transition"
                    >
                      Voir le produit
                    </Link>
                  </div>
                ))}
              </div>

              {/* Deuxième image décorative */}
              <div className="mb-8">
                <img
                  src={decorImages[1]}
                  alt="Décoration"
                  className="rounded-xl shadow-md w-full h-64 object-cover"
                />
              </div>

              {/* Troisième image décorative */}
              <div className="mb-8">
                <img
                  src={decorImages[2]}
                  alt="Décoration"
                  className="rounded-xl shadow-md w-full h-64 object-cover"
                />
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
