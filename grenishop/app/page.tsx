"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import { Produit, produitService } from "./lib/services/api";

const decorImages = [
  "/images/forêt.jpg",
  "/images/montagne.jpg",
  "/images/océan.jpg",
];

const renderStars = (rating, productId) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <Link
      href={`/produit/${productId}`}
      className="flex items-center space-x-1 group cursor-pointer"
    >
      {stars.map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`w-5 h-5 group-hover:text-yellow-500 ${
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
    </Link>
  );
};

export default function Accueil() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const chargerProduits = async () => {
      try {
        const data = await produitService.getAll();
        setProduits(data);
      } catch (err) {
        setError("Erreur lors du chargement des produits");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    chargerProduits();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        <Header />
        <main className="flex-grow px-6 py-8 pt-24 pb-32">
          <div className="max-w-6xl mx-auto text-center">
            <p>Chargement des produits...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        <Header />
        <main className="flex-grow px-6 py-8 pt-24 pb-32">
          <div className="max-w-6xl mx-auto text-center text-red-500">
            <p>{error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="flex-grow px-6 py-8 pt-24 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {produits.map((produit, index) => (
              <React.Fragment key={produit.id_produit}>
                {index === 0 && (
                  <div className="col-span-full">
                    <img
                      src={decorImages[0]}
                      alt="Décoration"
                      className="rounded-xl shadow-md w-full h-64 object-cover"
                    />
                  </div>
                )}

                <div className="bg-white border rounded-xl shadow-sm p-4 transform hover:scale-105 hover:shadow-lg transition duration-300">
                  <div
                    className="w-full h-48 bg-gray-300 rounded-md mb-3"
                    style={{
                      backgroundImage: `url(${
                        produit.Modele?.Tag || "/images/default-product.jpg"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="text-lg font-semibold mb-3">
                    {produit.Nom}
                  </div>
                  <div className="text-gray-700 font-medium mb-3">
                    {produit.Etat === "Neuf"
                      ? `${produit.Modele?.prix_neuf}€`
                      : `${produit.Modele?.prix_occasion}€`}
                  </div>

                  <div className="mb-3 flex justify-between items-center">
                    {renderStars(4, produit.id_produit)}
                    <Link
                      href={`/produit/${produit.id_produit}`}
                      className="text-black text-sm hover:underline"
                    >
                      Voir les détails
                    </Link>
                  </div>

                  <Link
                    href={`/produit/${produit.id_produit}`}
                    className="inline-block mt-auto px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Voir le produit
                  </Link>
                </div>
              </React.Fragment>
            ))}

            {/* Deuxième image décorative */}
            <div className="col-span-full">
              <img
                src={decorImages[1]}
                alt="Décoration"
                className="rounded-xl shadow-md w-full h-64 object-cover"
              />
            </div>

            {/* Troisième image décorative */}
            <div className="col-span-full">
              <img
                src={decorImages[2]}
                alt="Décoration"
                className="rounded-xl shadow-md w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
