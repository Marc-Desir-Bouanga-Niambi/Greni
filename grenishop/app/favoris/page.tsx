"use client";

import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { Produit } from "../lib/services/api";

export default function Favoris() {
  const [favoris, setFavoris] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Récupérer les favoris depuis le localStorage ou un état global
    const favorisLocal = localStorage.getItem("favoris");
    if (favorisLocal) {
      setFavoris(JSON.parse(favorisLocal));
    }
    setLoading(false);
  }, []);

  const retirerDesFavoris = (id: number) => {
    const nouveauxFavoris = favoris.filter((p) => p.id_produit !== id);
    setFavoris(nouveauxFavoris);
    localStorage.setItem("favoris", JSON.stringify(nouveauxFavoris));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="px-6 py-8 pt-24 pb-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700 mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-green-100">

      <Header />
      <main className="px-6 py-8 pt-24 pb-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Mes favoris</h1>

          {favoris.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Vous n'avez pas encore de favoris
              </p>
              <a
                href="/produits"
                className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
              >
                Voir les produits
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favoris.map((produit) => (
                <div
                  key={produit.id_produit}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {produit.nom_produit}
                      </h3>
                      <p className="text-gray-600">
                        {produit.Etat} - {produit.nom_marque}{" "}
                        {produit.nom_modele}
                      </p>
                      <p className="text-green-700 font-semibold mt-2">
                        {produit.Etat === "Neuf"
                          ? `${produit.prix_neuf.toFixed(2)}€`
                          : `${produit.prix_occasion.toFixed(2)}€`}
                      </p>
                    </div>
                    <button
                      onClick={() => retirerDesFavoris(produit.id_produit)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <a
                    href={`/produit/${produit.id_produit}`}
                    className="mt-4 inline-block bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                  >
                    Voir le produit
                  </a>
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
