"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useAuthContext } from "../../context/AuthContext";
import { Produit, produitService } from "../../lib/services/api";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Produit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [etatSelectionne, setEtatSelectionne] = useState<"Neuf" | "Occasion">(
    "Neuf"
  );
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await produitService.getById(Number(params.id));
        setProduct(data);
        // Vérifier si le produit est dans les favoris
        const favoris = JSON.parse(localStorage.getItem("favoris") || "[]");
        setIsFavorite(
          favoris.some((p: Produit) => p.id_produit === data.id_produit)
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      router.push("/connexion");
      return;
    }

    if (!product) return;

    const panier = JSON.parse(localStorage.getItem("panier") || "[]");
    const nouveauPanier = [...panier, { ...product, etatSelectionne }];
    localStorage.setItem("panier", JSON.stringify(nouveauPanier));

    // Mettre à jour le compteur du panier dans le header
    const event = new CustomEvent("panierUpdated", {
      detail: nouveauPanier.length,
    });
    window.dispatchEvent(event);

    setNotification({
      message: "Produit ajouté au panier",
      type: "success",
    });
  };

  const handleAddToFavorites = () => {
    if (!isLoggedIn) {
      router.push("/connexion");
      return;
    }

    if (!product) return;

    const favoris = JSON.parse(localStorage.getItem("favoris") || "[]");
    if (isFavorite) {
      const nouveauxFavoris = favoris.filter(
        (p: Produit) => p.id_produit !== product.id_produit
      );
      localStorage.setItem("favoris", JSON.stringify(nouveauxFavoris));
      setNotification({
        message: "Produit retiré des favoris",
        type: "success",
      });
    } else {
      localStorage.setItem("favoris", JSON.stringify([...favoris, product]));
      setNotification({
        message: "Produit ajouté aux favoris",
        type: "success",
      });
    }
    setIsFavorite(!isFavorite);
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

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="px-6 py-8 pt-24 pb-32">
          <div className="text-center text-red-600">
            Erreur: {error || "Produit non trouvé"}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {notification && (
        <div
          className={`fixed top-20 right-4 p-4 rounded-md shadow-lg z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {notification.message}
        </div>
      )}
      <main className="px-6 py-8 pt-24 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-4">{product.nom_produit}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Informations du produit
                </h2>
                <p className="mb-2">
                  <span className="font-semibold">Marque :</span>{" "}
                  {product.nom_marque}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Modèle :</span>{" "}
                  {product.nom_modele}
                </p>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">État :</label>
                  <select
                    value={etatSelectionne}
                    onChange={(e) =>
                      setEtatSelectionne(e.target.value as "Neuf" | "Occasion")
                    }
                    className="border rounded-md px-3 py-2 w-full"
                  >
                    <option value="Neuf">
                      Neuf - {product.prix_neuf.toFixed(2)}€
                    </option>
                    <option value="Occasion">
                      Occasion - {product.prix_occasion.toFixed(2)}€
                    </option>
                  </select>
                </div>
                <p className="text-2xl font-bold text-green-700 mb-4">
                  {etatSelectionne === "Neuf"
                    ? `${product.prix_neuf.toFixed(2)}€`
                    : `${product.prix_occasion.toFixed(2)}€`}
                </p>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 transition flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Ajouter au panier
              </button>
              {isLoggedIn && (
                <button
                  onClick={handleAddToFavorites}
                  className={`flex-1 px-4 py-2 rounded-md transition flex items-center justify-center ${
                    isFavorite
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 mr-2 transition-transform ${
                      isFavorite ? "scale-110" : ""
                    }`}
                    fill={isFavorite ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
