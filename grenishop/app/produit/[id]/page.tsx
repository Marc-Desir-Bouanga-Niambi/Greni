"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { Produit, produitService } from "../../lib/services/api";

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<Produit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await produitService.getById(Number(params.id));
        setProduct(data);
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

  if (loading)
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="px-6 py-8 pt-24 pb-32">
          <div className="text-center">Chargement...</div>
        </main>
        <Footer />
      </div>
    );

  if (error || !product)
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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="px-6 py-8 pt-24 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full h-96 bg-gray-300 rounded-xl">
              {/* Placeholder pour l'image du produit */}
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{product.nom}</h1>
              <p className="text-gray-600">
                Vendu par: {product.entreprise?.nom_Entreprise}
              </p>

              <div className="border-t border-b py-4 my-4">
                <h2 className="text-xl font-semibold mb-2">Disponibilité</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Neuf:</span>
                    <span>{product.nombre_Neuf} disponibles</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Occasion:</span>
                    <span>{product.nombre_Occasion} disponibles</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Prix</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium">Neuf</h3>
                    <p className="text-2xl font-bold text-green-700">
                      {product.prix_Neuf}€
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium">Occasion</h3>
                    <p className="text-2xl font-bold text-green-700">
                      {product.prix_Occasion}€
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-600 transition">
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
