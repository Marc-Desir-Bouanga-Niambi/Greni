"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import { Produit, produitService } from "./lib/services/api";

const decorImages = [
  { src: "/images/forêt.jpg", alt: "Paysage de forêt luxuriante" },
  { src: "/images/montagne.jpg", alt: "Vue panoramique de montagnes" },
  { src: "/images/océan.jpg", alt: "Vue sur l'océan" },
];

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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700 mx-auto"></div>
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-green-100">

      <Header />

      <main className="flex-grow px-6 py-8 pt-24 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Première image décorative */}
            <div className="col-span-full">
              <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-md">
                <Image
                  src={decorImages[0].src}
                  alt={decorImages[0].alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Produits avec insertion conditionnelle d’images décoratives */}
            {produits.map((produit, index) => (
              <React.Fragment key={produit.id_produit}>
                <div className="bg-white border rounded-xl shadow-sm p-4 transform hover:scale-105 hover:shadow-lg transition duration-300">
                  <div className="relative w-full h-48 rounded-md mb-3 overflow-hidden">
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">Pas d'image</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-semibold">
                      {produit.nom_produit}
                    </div>
                    <div className="text-gray-700 font-medium">
                      {produit.Etat === "Neuf"
                        ? `${produit.prix_neuf.toFixed(2)}€`
                        : `${produit.prix_occasion.toFixed(2)}€`}
                    </div>
                    <div className="text-sm text-gray-500">
                      {produit.nom_marque} - {produit.nom_modele}
                    </div>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className={`w-5 h-5 ${
                            star <= 4 ? "text-yellow-400" : "text-gray-300"
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
                  </div>

                  <Link
                    href={`/produit/${produit.id_produit}`}
                    className="inline-block w-full text-center mt-4 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Voir le produit
                  </Link>
                </div>

                {/* Deuxième image décorative après 3 produits */}
                {index === 2 && (
                  <div className="col-span-full">
                    <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-md">
                      <Image
                        src={decorImages[1].src}
                        alt={decorImages[1].alt}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                )}

                {/* Troisième image décorative après 6 produits */}
                {index === 5 && (
                  <div className="col-span-full">
                    <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-md">
                      <Image
                        src={decorImages[2].src}
                        alt={decorImages[2].alt}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
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
