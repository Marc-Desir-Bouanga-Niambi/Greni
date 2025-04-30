"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CommandeForm from "../components/CommandeForm";
import Footer from "../components/footer";
import Header from "../components/header";
import { useAuthContext } from "../context/AuthContext";
import { Produit, produitService } from "../lib/services/api";

interface ProduitPanier extends Produit {
  quantite: number;
  etatSelectionne: "Neuf" | "Occasion";
}

export default function Panier() {
  const router = useRouter();
  const [panier, setPanier] = useState<ProduitPanier[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, user } = useAuthContext();
  const [showCommandeForm, setShowCommandeForm] = useState(false);

  useEffect(() => {
    const panierLocal = localStorage.getItem("panier");
    if (panierLocal) {
      const produitsGroupes = JSON.parse(panierLocal).reduce(
        (acc: ProduitPanier[], produit: ProduitPanier) => {
          const index = acc.findIndex(
            (p) =>
              p.id_produit === produit.id_produit &&
              p.etatSelectionne === produit.etatSelectionne
          );
          if (index === -1) {
            acc.push({ ...produit, quantite: 1 });
          } else {
            acc[index].quantite += 1;
          }
          return acc;
        },
        []
      );
      setPanier(produitsGroupes);
    }
    setLoading(false);
  }, []);

  const calculerTotal = () => {
    return panier.reduce((total, produit) => {
      const prix =
        produit.etatSelectionne === "Neuf"
          ? produit.prix_neuf
          : produit.prix_occasion;
      return total + prix * produit.quantite;
    }, 0);
  };

  const modifierQuantite = (
    id: number,
    etat: "Neuf" | "Occasion",
    nouvelleQuantite: number
  ) => {
    if (nouvelleQuantite < 1) return;

    const nouveauPanier = panier.map((p) =>
      p.id_produit === id && p.etatSelectionne === etat
        ? { ...p, quantite: nouvelleQuantite }
        : p
    );
    setPanier(nouveauPanier);

    const panierComplet = nouveauPanier.flatMap((p) =>
      Array(p.quantite).fill({ ...p, quantite: 1 })
    );
    localStorage.setItem("panier", JSON.stringify(panierComplet));

    const event = new CustomEvent("panierUpdated", {
      detail: panierComplet.length,
    });
    window.dispatchEvent(event);
  };

  const retirerDuPanier = (id: number, etat: "Neuf" | "Occasion") => {
    const nouveauPanier = panier.filter(
      (p) => !(p.id_produit === id && p.etatSelectionne === etat)
    );
    setPanier(nouveauPanier);

    const panierComplet = nouveauPanier.flatMap((p) =>
      Array(p.quantite).fill({ ...p, quantite: 1 })
    );
    localStorage.setItem("panier", JSON.stringify(panierComplet));

    const event = new CustomEvent("panierUpdated", {
      detail: panierComplet.length,
    });
    window.dispatchEvent(event);
  };

  const handleCommandeSubmit = async (data: {
    adresse_livraison: string;
    ville: string;
    code_postal: string;
    pays: string;
    telephone: string;
    email: string;
  }) => {
    if (!isLoggedIn) {
      router.push("/connexion");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const adresseComplete = `${data.adresse_livraison}, ${data.code_postal} ${data.ville}, ${data.pays}`;

      for (const item of panier) {
        const stock = await produitService.getStock(
          item.id_produit,
          item.etatSelectionne
        );
        if (stock < item.quantite) {
          alert(
            `Stock insuffisant pour ${item.nom_produit} (${stock} disponible(s))`
          );
          return;
        }
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Commandes`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_compte: user?.id_compte,
            adresse_livraison: adresseComplete,
            produits: panier.map((item) => ({
              id_produit: item.id_produit,
              quantite: item.quantite,
              etat: item.etatSelectionne,
            })),
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Erreur lors de la création de la commande: ${errorText}`
        );
      }

      localStorage.removeItem("panier");
      setPanier([]);

      const event = new CustomEvent("panierUpdated", { detail: 0 });
      window.dispatchEvent(event);

      router.push("/commandes");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de la création de la commande"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow px-6 py-8 pt-24 pb-32">
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
      <main className="flex-grow px-6 py-8 pt-24 pb-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Mon panier</h1>

          {panier.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Votre panier est vide</p>
              <a
                href="/produits"
                className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
              >
                Voir les produits
              </a>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {panier.map((item) => (
                  <div
                    key={`${item.id_produit}-${item.etatSelectionne}`}
                    className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">
                        {item.nom_produit}
                      </h3>
                      <p className="text-gray-600">
                        {item.nom_marque} {item.nom_modele}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        État: {item.etatSelectionne}
                      </p>
                      <p className="text-green-700 font-semibold mt-2">
                        {item.etatSelectionne === "Neuf"
                          ? `${item.prix_neuf.toFixed(2)}€`
                          : `${item.prix_occasion.toFixed(2)}€`}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() =>
                            modifierQuantite(
                              item.id_produit,
                              item.etatSelectionne,
                              item.quantite - 1
                            )
                          }
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x">
                          {item.quantite}
                        </span>
                        <button
                          onClick={() =>
                            modifierQuantite(
                              item.id_produit,
                              item.etatSelectionne,
                              item.quantite + 1
                            )
                          }
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          retirerDuPanier(item.id_produit, item.etatSelectionne)
                        }
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-green-700">
                    {calculerTotal().toFixed(2)}€
                  </span>
                </div>

                <button
                  onClick={() => setShowCommandeForm(true)}
                  className="w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-600 transition"
                >
                  Passer la commande
                </button>
              </div>

              {showCommandeForm && (
                <div className="mt-8">
                  <CommandeForm
                    onSubmit={handleCommandeSubmit}
                    total={calculerTotal()}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
