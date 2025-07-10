"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { produitService } from "../lib/services/api";

interface ProduitDisplay {
  id_produit: number;
  Nom: string;
  Etat: string;
  Modele?: {
    prix_neuf: number;
    prix_occasion: number;
  };
}

export default function Catalogue() {
  const [produits, setProduits] = useState<ProduitDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const data = await produitService.getAll();
        setProduits(data);
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Header />

      <main className="flex-grow px-6 py-8 pt-24 pb-32">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Tous nos produits</h1>

          {loading ? (
            <p>Chargement...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {produits.map((produit) => (
                <Link
                  href={`/produit/${produit.id_produit}`}
                  key={produit.id_produit}
                  className="border p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <h2 className="text-xl font-semibold">{produit.Nom}</h2>
                  <p>État : {produit.Etat}</p>
                  {produit.Modele && (
                    <>
                      <p>Prix neuf : {produit.Modele.prix_neuf}€</p>
                      <p>Prix occasion : {produit.Modele.prix_occasion}€</p>
                    </>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
