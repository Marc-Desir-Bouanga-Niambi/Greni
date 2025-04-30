"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { useAuthContext } from "../context/AuthContext";

export default function Profil() {
  const { user, isLoggedIn } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    console.log("État du profil:", { user, isLoggedIn });
    if (!isLoggedIn) {
      router.push("/connexion");
    }
  }, [isLoggedIn, router, user]);

  if (!isLoggedIn || !user) {
    console.log("Utilisateur non connecté ou données manquantes");
    return null;
  }

  console.log("Données utilisateur à afficher:", user);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow px-6 py-8 pt-24 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* En-tête du profil */}
            <div className="bg-green-700 p-6 text-white">
              <h1 className="text-3xl font-semibold">
                Bonjour, {user.Prenom} {user.Nom}
              </h1>
              <p className="text-green-100 mt-2">
                Membre depuis{" "}
                {new Date(user.date_inscription).toLocaleDateString("fr-FR")}
              </p>
            </div>

            {/* Informations du compte */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Informations personnelles
                  </h2>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Nom:</span> {user.Nom}
                    </p>
                    <p>
                      <span className="font-medium">Prénom:</span> {user.Prenom}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {user.Email}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Actions rapides
                  </h2>
                  <div className="space-y-2">
                    <Link
                      href="/commandes"
                      className="block text-green-700 hover:text-green-600"
                    >
                      Voir mes commandes
                    </Link>
                    <Link
                      href="/liste-souhaits"
                      className="block text-green-700 hover:text-green-600"
                    >
                      Ma liste de souhaits
                    </Link>
                    <Link
                      href="/deconnexion"
                      className="block text-red-600 hover:text-red-500"
                    >
                      Se déconnecter
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
