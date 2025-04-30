"use client";

import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { useAuthContext } from "../context/AuthContext";
import { Produit } from "../lib/services/api";

interface Commande {
  id_commande: number;
  date_commande: string;
  status_commande: string;
  adresse_livraison: string;
  id_compte: number;
  prix_total: number;
  Produits?: Produit[];
}

export default function Commandes() {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCommande, setSelectedCommande] = useState<number | null>(null);
  const { isLoggedIn, user } = useAuthContext();

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchCommandes = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        console.log(
          "URL de l'API:",
          `${process.env.NEXT_PUBLIC_API_URL}/api/Commandes`
        );

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Commandes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Statut de la réponse:", response.status);
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Réponse d'erreur:", errorText);
          throw new Error("Erreur lors de la récupération des commandes");
        }

        const data = await response.json();
        console.log("Données reçues:", data);
        setCommandes(data);
      } catch (error) {
        console.error("Erreur détaillée:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommandes();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="px-6 py-8 pt-24 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Accès non autorisé</h1>
            <p className="text-gray-600 mb-4">
              Veuillez vous connecter pour voir vos commandes
            </p>
            <a
              href="/connexion"
              className="inline-block bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
            >
              Se connecter
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold mb-8">Mes commandes</h1>

          {commandes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Vous n'avez pas encore passé de commande
              </p>
              <a
                href="/produits"
                className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
              >
                Voir les produits
              </a>
            </div>
          ) : (
            <div className="space-y-8">
              {commandes.map((commande) => (
                <div
                  key={commande.id_commande}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">
                        Commande #{commande.id_commande}
                      </h2>
                      <p className="text-gray-600">
                        Passée le{" "}
                        {new Date(commande.date_commande).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          commande.status_commande === "En cours"
                            ? "bg-yellow-100 text-yellow-800"
                            : commande.status_commande === "Livrée"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {commande.status_commande}
                      </span>
                      <button
                        onClick={() =>
                          setSelectedCommande(
                            selectedCommande === commande.id_commande
                              ? null
                              : commande.id_commande
                          )
                        }
                        className="text-sm text-green-700 hover:text-green-800 font-medium"
                      >
                        {selectedCommande === commande.id_commande
                          ? "Masquer le résumé"
                          : "Voir le résumé"}
                      </button>
                    </div>
                  </div>

                  {selectedCommande === commande.id_commande && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">
                        Résumé de la commande
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-600">Date de commande:</div>
                        <div>
                          {new Date(
                            commande.date_commande
                          ).toLocaleDateString()}
                        </div>

                        <div className="text-gray-600">Statut:</div>
                        <div>{commande.status_commande}</div>

                        <div className="text-gray-600">
                          Adresse de livraison:
                        </div>
                        <div>{commande.adresse_livraison}</div>

                        <div className="text-gray-600">Nombre d'articles:</div>
                        <div>{commande.Produits?.length}</div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold text-green-700">
                      {commande.prix_total.toFixed(2)}€
                    </span>
                  </div>

                  <div className="space-y-4">
                    {commande.Produits?.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border-b pb-2"
                      >
                        <div>
                          <h3 className="font-medium">{item.nom_produit}</h3>
                          <p className="text-sm text-gray-600">
                            {item.nom_marque} {item.nom_modele} - {item.Etat}
                          </p>
                        </div>
                        <p className="text-green-700 font-semibold">
                          {(item.Etat === "Neuf"
                            ? item.prix_neuf
                            : item.prix_occasion
                          ).toFixed(2)}
                          €
                        </p>
                      </div>
                    ))}
                  </div>
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
